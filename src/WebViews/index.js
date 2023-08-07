import "./index.css";
import * as localdb from "localdb";


function onDeviceReady(){
    const {language}=localdb;
    document.documentElement.setAttribute("lang",language.$id);
    window.language=Object.freeze(language);
    if(cordova.platformId==="ios"){
        window.addEventListener("touchstart",()=>{
            const {activeElement}=document;
            if((activeElement===document.body)){
                Keyboard&&Keyboard.isVisible&&Keyboard.hide();
                activeElement.click();
            }
        });
    }
};

document.addEventListener("deviceready",onDeviceReady,false);

!function globalizeCssVars(){
    const style=getComputedStyle(document.documentElement);
    Object.defineProperty(window,"rem",{
        value:parseFloat(style.getPropertyValue("font-size")),
    });
    [
        "mainFont","majorFont","minorFont",
        "mainColor","majorColor","minorColor",
        "textColor","accentColor","backgroundColor",
    ].forEach(name=>{
        Object.defineProperty(window,name,{
            value:style.getPropertyValue(`--${name}`),
        });
    });
}();
