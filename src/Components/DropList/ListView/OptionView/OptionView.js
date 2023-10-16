import {View} from "vritra";
import css from "./OptionView.module.css";


export default function OptionView(props){
    const {parent,option,onPick}=props,{id,label,icon}=option;
    const optionview=View({parent,className:css.optionview});

    optionview.innateHTML=`
        <text class="${css.label}">${label||id}</text>
        ${icon?`
            <img 
                class="${css.icon}" 
                src="${typeof(icon)==="function"?icon():icon}"
            />
        `:""}
    `;

    optionview.onclick=()=>{
        onPick&&onPick(option);
    }

    return optionview;
}
