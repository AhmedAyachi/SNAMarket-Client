FROM node
#Prepare Image
RUN npm i -g cordova
RUN mkdir -p /home/app
COPY ./src /home/app/src
COPY ./config.xml /home/app
COPY ./package.json /home/app
COPY ./vritra.config.js /home/app
RUN mkdir /home/app/www


#Prepare Container
CMD cd /home/app && npm i && cordova platform add browser@7 && npm start -- -t
