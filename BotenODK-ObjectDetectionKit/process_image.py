from urllib.error import HTTPError
import cv2
import numpy as np
import requests
import os
import datetime
from cfg_authenticate import APIAuthenticate as auth
from time import time, sleep

 # download frames from a rtsp stream to a output directory to process and create a queue item
def GetFramesFromStream():
    # get all feeds to process from the API
    try:
        response = requests.get(auth.config["APIURL"] + "/Livefeeds", headers=headers, verify=False)
    except HTTPError as err:
        raise("Error: " + err)

    # convert response to json object and loop trough all active feeds
    feeds = response.json()
    for feed in feeds:
        # only extract a frame when the feed is enabled
        if feed["enabled"]:
            print("Retrieve new frame from feed " + feed["name"])

            capture = cv2.VideoCapture(feed["url"])
            success,image = capture.read()
            timestamp = datetime.datetime.now()
            timestamp = timestamp.strftime("%d%m%Y-%H%M%S")

            if(capture.isOpened()):
                filepath = auth.config["FRAMES_PATH"] + "/" + timestamp + "-" + feed["name"] + "-frame.jpg"
                cv2.imwrite(filepath, image)
                success,image = capture.read()

                # create a new queue item at the API
                body = {
                    "filepath": filepath,
                    "status": 0,
                    "deleted": False,
                    "feed": feed["id"]
                }
                try:
                    requests.post(auth.config["APIURL"] + "/FeedQueues", headers=headers, json=body, verify=False)
                except HTTPError as err:
                    raise("HTTP error: " + err)

def ProcessImage(filepath, id, feedId, dataModels):
    # change queue item into InProgress
    print("Process ODK to frame " + id)
    try:
        requests.post(auth.config["APIURL"] + "/FeedQueues/NextPhase/" + id, headers=headers, verify=False)
    except HTTPError as err:
        print("HTTP Error: " + err)
        exit()

    # Load Yolo
    net = cv2.dnn.readNet(auth.config["YOLO"]["WEIGHTS"], auth.config["YOLO"]["CFG"])
    classes = []
    with open(auth.config["YOLO"]["NAMES"], "r") as f:
        classes = [line.strip() for line in f.readlines()]
    layer_names = net.getLayerNames()
    output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]
    colors = np.random.uniform(0, 255, size=(len(classes), 3))

    # Loading image
    img = cv2.imread(filepath)
    #img = cv2.resize(img, None, fx=0.4, fy=0.4)
    height, width, channels = img.shape

    # Detecting objects
    blob = cv2.dnn.blobFromImage(img, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    # Showing informations on the screen
    class_ids = []
    confidences = []
    boxes = []
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5:
                # Object detected
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                # Rectangle coordinates
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)
                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

    font = cv2.FONT_HERSHEY_PLAIN
    for i in range(len(boxes)):
        if i in indexes:
            # save current label (coco name) from detected object
            label = str(classes[class_ids[i]])
            
            # loop trough list of objects
            for dataModel in dataModels:
                if dataModel["cocoKey"] == label and dataModel["enabled"]:
                    # add box and label to image
                    print("Found object " + label + " in frame")
                    x, y, w, h = boxes[i]
                    color = colors[i]
                    cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
                    cv2.putText(img, label, (x, y + 30), font, 2, color, 3)

                    # add detected data to API
                    try:
                        body = {
                            "description": label,
                            "dataModelId": dataModel["dataModelId"],
                            "feedId": feedId
                        }
                        requests.post(auth.config["APIURL"] + "/DetectedDatas", headers=headers, json=body, verify=False)
                    except HTTPError as err:
                        print("Error: " + err)

    # write processed image with boxes to output directory
    newFilepath = filepath.replace(".jpg", "-processed.jpg")
    if auth.config["DELETE_FRAME_AFTER_PROCESSING"] != "YES":
        cv2.imwrite(newFilepath, img)

    # set queue item to successful
    try:
        requests.post(auth.config["APIURL"] + "/FeedQueues/NextPhase/" + id, headers=headers, verify=False)
    except HTTPError as err:
        print("Error: " + err)

    # delete original frame
    os.remove(filepath)

def Process():
    # get frames from livefeeds to analyse at the next run
    GetFramesFromStream()

    # get a list of new queue items from API to process
    try:
        queueitemsResponse = requests.get(auth.config["APIURL"] + "/FeedQueues/GetNewQueueItems?limit=" + str(auth.config["PROCESS_LIMIT"]), headers=headers, verify=False)
        objectsResponse = requests.get(auth.config["APIURL"] + "/DataModels", headers=headers, verify=False)

    except HTTPError as err:
        raise("HTTP Error: " + err)

    # create a json object to handle and loop trough results
    queueItems = queueitemsResponse.json()
    dataModels = objectsResponse.json()
    for queueItem in queueItems:
        print("Process queueitem " + str(queueItem["id"]))

        # procces image
        ProcessImage(queueItem["filepath"], str(queueItem["id"]), str(queueItem["feed"]), dataModels)

# get a list of new queue items to process
accesstoken = auth.GetAccessToken(auth)
headers = {
    "Authorization": "Bearer " + accesstoken 
}

while True:
    Process()
    print("Processing completed, waiting for " + str(auth.config["INTERVAL_IN_MINUTES"]) + " minutes interval")
    sleep(auth.config["INTERVAL_IN_MINUTES"] * 60)