import "../index";
import FormSite from "./FormSite";
import {parseJSON} from "vritra";


function onDeviceReady(){
    StatusBar.styleDefault();
    WebView.useMessage(message=>{
        const data=parseJSON(message);
        FormSite({parent:document.body,data});
    });
    
};

document.addEventListener("deviceready",onDeviceReady,false);
