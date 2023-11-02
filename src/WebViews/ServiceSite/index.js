import "../index";
import ServiceSite from "./ServiceSite";


function onDeviceReady(){
    StatusBar.styleDefault();
    ServiceSite({parent:document.body});
};

document.addEventListener("deviceready",onDeviceReady,false);
