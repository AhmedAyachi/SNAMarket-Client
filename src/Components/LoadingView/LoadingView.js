import {View,fadeOut} from "vritra";
import css from "./LoadingView.module.css";
import {Loader} from "components";


export default function LoadingView(props={}){
    const {parent=document.getElementById("webview"),color}=props;
    const loadingview=View({
        ...props,parent,
        className:`${css.loadingview} ${props.className||""}`,
    });

    loadingview.innateHTML=`
    `;
    Loader({parent:loadingview,color});

    loadingview.unmount=(callback)=>{
        fadeOut(loadingview,()=>{
            loadingview.remove();
            callback&&callback();
        });
    }

    return loadingview;
}
