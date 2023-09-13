import {parseJSON} from "corella";
import "../index";
import BottomSheet from "./BottomSheet";


function onDeviceReady(){
    WebView.useMessage(json=>{
        const data=parseJSON(json);
        BottomSheet({parent:document.body,data});
    });
};

document.addEventListener("deviceready",onDeviceReady,false);
