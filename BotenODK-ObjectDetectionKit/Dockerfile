FROM python:3

WORKDIR /usr/src/app

# install required Python packages
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN apt-get -y install cron vim 

# copy all script and YOLO files to app dir
COPY . .

# initiate crontab
COPY crontab /etc/cron.d/crontab
RUN chmod 0644 /etc/cron.d/crontab
RUN /usr/bin/crontab /etc/cron.d/crontab

# run script in cron
CMD ["cron", "-f"]