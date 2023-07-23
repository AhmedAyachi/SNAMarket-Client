import {View} from "cherries";
import css from "./ValueView.module.css";
import {chevron0} from "assets";


export default function ValueView(props){
    const {parent,value,labelHidden}=props,{icon}=value;
    const valueview=View({parent,className:css.valueview});

    valueview.innateHTML=`
        <div class="${css.wrapper}">
            ${labelHidden?"":`
                <text class="${css.label}">${value?.label||value?.id||""}</text>
            `}
            ${icon?`
                <img 
                    class="${css.icon}" 
                    src="${typeof(icon)==="function"?icon():icon}"
                />
            `:""}
        </div>
        <img src="${chevron0(backgroundColor)}"/>
    `;

    valueview.onclick=()=>{
        parent.toggle();
        
    }

    return valueview;
}
