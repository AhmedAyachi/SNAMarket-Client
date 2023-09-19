import {View} from "corella";
import css from "./HeaderView.module.css";
import {chevron0} from "assets";


export default function HeaderView(props){
    const {parent,title,backIcon=chevron0}=props;
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
        <text as="span" class="${css.title}">${title||""}</text>
    `;

    headerview.backbtn.onclick=()=>{WebView.close()};

    return headerview;
}
