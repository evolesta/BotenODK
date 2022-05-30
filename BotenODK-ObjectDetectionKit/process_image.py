from distutils.command.config import config
from urllib.error import HTTPError
import cv2
import numpy as np
import requests
import datetime
from cfg_authenticate import APIAuthenticate as auth

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
            print("Process feed " + feed["name"])

            capture = cv2.VideoCapture(feed["url"])
            success,image = capture.read()
            timestamp = datetime.datetime.now()
            timestamp = timestamp.strftime("%d%m%Y-%H%M%S")

            if(capture.isOpened()):
                filepath = auth.config["FRAMES_PATH"] + "/frame-" + feed["name"] + "-" + timestamp + ".jpg"
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

# get a list of new queue items to process
accesstoken = auth.GetAccessToken(auth)
headers = {
    "Authorization": "Bearer " + accesstoken 
}

# get a list of new queue items from API to process
try:
    response = requests.get(auth.config["APIURL"] + "/FeedQueues/GetNewQueueItems?limit=" + auth.config["PROCESS_LIMIT"], headers=headers)
except HTTPError as err:
    raise("HTTP Error: " + err)

# create a json object to handle and loop trough results
queueItems = response.json()
for queueItem in queueItems:
    print("Process queueitem " + queueItem["id"])

    

# get frames from livefeeds to analyse at the next run
GetFramesFromStream()