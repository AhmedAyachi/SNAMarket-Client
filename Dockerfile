from node
#Prepare Image
run npm i -g cordova
run mkdir -p /home/app
copy ./src /home/app/src
copy ./config.xml /home/app
copy ./package.json /home/app
copy ./vritra.config.js /home/app
run mkdir /home/app/www


#Prepare Container
cmd cd /home/app && npm i && cordova platform add browser@7 && npm start -- -t
