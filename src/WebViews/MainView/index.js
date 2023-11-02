import "../index";
import MainView from "./MainView";
import {store} from "../../Store";
import WebViews from "../WebViews";


function onDeviceReady(){
    StatusBar.styleLightContent();
    StatusBar.backgroundColorByHexString(mainColor);
    StatusBar.show();
    WebView.defineWebViews(WebViews);
    WebView.initiateStore(store,()=>{
        MainView({parent:document.body,store});
    });
};

document.addEventListener("deviceready",onDeviceReady,false);
document.addEventListener("backbutton",()=>{
    location.hash?history.back():WebView.close();
},false);