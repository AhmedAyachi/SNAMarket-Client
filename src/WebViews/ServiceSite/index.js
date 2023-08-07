import "../index";
import ServiceSite from "./ServiceSite";


function onDeviceReady(){
    ServiceSite({parent:document.body});
};

document.addEventListener("deviceready",onDeviceReady,false);
