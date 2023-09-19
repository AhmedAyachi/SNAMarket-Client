import {View,fadeOut} from "corella";
import css from "./LoadingView.module.css";
import {loading0} from "assets";


export default function LoadingView(props={}){
    const {parent=document.getElementById("webview"),color}=props;
    const loadingview=View({
        ...props,parent,
        className:`${css.loadingview} ${props.className||""}`,
    });

    loadingview.innateHTML=`
        <img 
            class="${css.icon}" 
            style="${loadingview.clientWidth>loadingview.clientHeight?"height":"width"}:40%"
            src="${loading0(color)}"
        />
    `;

    loadingview.unmount=(callback)=>{
        fadeOut(loadingview,()=>{
            loadingview.remove();
            callback&&callback();
        });
    }

    return loadingview;
}
