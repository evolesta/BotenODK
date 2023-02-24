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

## MSSQL Database
In order to run the server, you will need a MSSQL database to store all the required data.
If you want to setup a database for testing or developing purposes, follow the instructions below to setup a Docker container. 
For production purposes we strongly recommend you to use a high available and stable database service! 

Download and install Docker desktop. It's available for free.
Run the following commands from a terminal to setup a MSSQL docker container:
```
docker run --name BotenODK-MSSQL -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourpassword" -e "MSSQL_PID=Developer" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

Download and install Microsoft SQL Server Management Studio tool and connect to localhost with sa / yourpassword. Create a new database and modify the appsettings.json file. Alter the database context matching your host, database and user.
Now we need to migrate to the empty database.
CD your terminal to the API sourcecode folder of the project. Run the following commands to migrate the database:
```
dotnet tool restore
dotnet ef database update
```

After that, compile and deploy the API. Use the instructions below (of the API) to deploy a new Docker image.
The migrations also seeds the first user to the Users table, with credentials test / TEST123.

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
You can run the Docker image to a container (just a webserver) to run the compiled Angular application. 
If you want to run the development server, you'll need to install Node JS and the Angular CLI. 
Install the required packages `npm install --force` and run `ng serve` to start the development server.

To deploy a docker container for the Datadash application:
First modify the environment variable files to your API's URL prefix (example: http://localhost:8000/api).

Make sure you installed Node.JS and the Angular CLI tool. Compile the code to a production build and run the Dockerfile to create a container:
```
ng build --prod
docker build -f Dockerfile -t botenodk-dashboard
docker run --name BotenODK-Dashboard -p 443:443 botenodk-dashboard
```

# Troubleshooting
Problems with a dataset
To troubleshoot a dataset, run sample_image.py. Modify the dataset, config and names parameters to your dataset, and provide a sample image to analyse. Run the script with Python and check if it works outside the solution. The script will open a window showing the analysed result, if not, a error will follow in your terminal. 