# Boten ODK Repo
Repository containing the BotenODK solution for implementing object recognition on camera livefeeds

Processes camera livefeeds to a REST API which temporary stores the frames. The object recognition kit analyses the frames for boats and stores the required data.
Contains a dashboard front-end application which visualises the analysed data to the end users.

# Requirements
The production release of this project is available in Docker images. You can run the complete project solution inside Docker!
This will benefit you without advanced installation and configuring skills. Just run it inside Docker. 

- You will need Docker installed on your system for testing purposes, etc. For a production environment it's highly recommended to run the containers on a high performance cluster, or a Docker supported cloud provider (Azure, Google Cloud, etc.).
- You will also need a MSSQL database in order to run the server API. For testing/acceptance purposes you could also use the MSSQL docker image from Microsoft to host your database. 
- You will also need to get a YOLO trained dataset (weights files) to recognize your desired objects. You can train YOLO yourself, but just search on the internet. There are lots of pre-trained datasets available for free. Because of the filesize, we can't share this on the repo.

# Installation

## Server API
The server is the central heart of the solution. It will be necessary in order to run the object detection kit and the datadash web application.
The server is a REST API written in ASP.NET. You don't need to setup any Windows Server or IIS, you can just run the server as a container. 
You will have to build the image first, then you can run the container. Make sure your in the API folder of the respository.
```
docker build -f Dockerfile -t botenodk-api ..
docker run -d -p 8000:5004 --name BotenODK-API -e "ASPNETCORE_URLS=http://+:5004" botenodk-api
```

## Object Detection Kit
Before you start, make sure you have a valid trained dataset. A dataset usually contains a large weights file (the models), a list of human readable object names and a cfg (config) file. 
By default, the repository already contains the cfg and names files for the COCO dataset. Go to https://pjreddie.com/darknet/yolo/ if you like to download the weights file.
If you would like to use your own dataset or a different one, modify the botenodk.json configuration file.

Open a terminal and go to the directory containing the Python scripts and Dockerfile. 
Hit the following commands to build the image and run the container:

```
docker build -t botenodk-odk .
docker run -it --rm --name BotenODK-ODK botenodk-odk
```

## Datadash webapplication
work in progress

# Troubleshooting
Problems with a dataset
To troubleshoot a dataset, run sample_image.py. Modify the dataset, config and names parameters to your dataset, and provide a sample image to analyse. Run the script with Python and check if it works outside the solution. The script will open a window showing the analysed result, if not, a error will follow in your terminal. 