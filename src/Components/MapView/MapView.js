import {View} from "cherries";
import css from "./MapView.module.css";
import {LoadingView} from "components";


export default function MapView(props){
    const {parent,url,onLoaded}=props;
    const mapview=View({parent,className:css.mapview});

    mapview.beforeEndHTML=`
        <!--<div class="${css.foreground}"></div>-->
    `;
    const loadingview=LoadingView({parent:mapview});
    const iframe=View({parent:mapview,tag:"iframe"});
    iframe.setAttribute("frameborder","0");
    iframe.referrerPolicy="no-referrer-when-downgrade";
    iframe.src=url;
    iframe.allowFullscreen=true;
    iframe.onload=()=>{loadingview.unmount(onLoaded)};

    return mapview;
}
