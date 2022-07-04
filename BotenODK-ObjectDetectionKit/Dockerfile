FROM python:3

WORKDIR /usr/src/app

# install required Python packages
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# copy all script and YOLO files to app dir
COPY . .

# run script in cron
CMD ["python", "process_image.py"]