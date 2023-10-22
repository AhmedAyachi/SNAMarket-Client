import {View} from "vritra";
import css from "./HeaderView.module.css";
import {ActionSetView} from "components";
import {chevron0} from "assets";


export default function HeaderView(props){
    const {parent,title,backIcon=chevron0,message,actions}=props;
    const headerview=View({
        parent,id:"header",
        at:props.at||"start",
        className:`${css.headerview} ${props.className||""}`,
    });

    headerview.innateHTML=`
        <img 
            ref="backbtn" 
            class="${css.backbtn} button" 
            src="${typeof(backIcon)==="function"?backIcon(textColor,2):backIcon}"
        />
        <text class="${css.title}">${title||""}</text>
    `;
    actions&&ActionSetView({
        parent:headerview,actions,
        className:css.actions,
        color:textColor,
    });

    headerview.backbtn.onclick=()=>{WebView.close(message)};

    return headerview;
}
