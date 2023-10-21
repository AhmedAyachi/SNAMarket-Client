import "./index.css";
import {fetchLanguage} from "resources";



async function onDeviceReady(){
    const language=await fetchLanguage();
    document.documentElement.setAttribute("lang",language.$id);
    window.language=Object.freeze(language);
    if(cordova.platformId==="ios"){
        window.addEventListener("touchend",()=>{
            const {activeElement}=document;
            if((activeElement!==document.body)){
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
        "accentColor","textColor","backgroundColor",
    ].forEach(name=>{
        Object.defineProperty(window,name,{
            value:style.getPropertyValue(`--${name}`),
        });
    });
}();
