import {View,fadeOut} from "cherries";
import css from "./LoadingView.module.css";
import {loading0} from "assets";


export default function LoadingView(props={}){
    const {parent=document.body}=props;
    const loadingview=View({
        ...props,parent,
        className:`${css.loadingview} ${props.className||""}`,
    });

    loadingview.innateHTML=`
        <img class="${css.icon}" src="${loading0(mainColor)}"/>
    `;

    loadingview.unmount=(callback)=>{
        fadeOut(loadingview,()=>{
            loadingview.remove();
            callback&&callback();
        });
    }

    return loadingview;
}
