import "../index";
import MainView from "./MainView";
import {store} from "../../Store";
import WebViews from "../WebViews";


function onDeviceReady(){
    StatusBar.styleLightContent();
    StatusBar.backgroundColorByHexString("#016c34");
    StatusBar.show();
    WebView.defineWebViews(WebViews);
    WebView.initiateStore(store,()=>{
        MainView({parent:document.body,store});
    });
};

document.addEventListener("deviceready",onDeviceReady,false);
document.addEventListener("backbutton",()=>{
    location.hash?history.back():window.plugins.appMinimize.minimize();
},false);