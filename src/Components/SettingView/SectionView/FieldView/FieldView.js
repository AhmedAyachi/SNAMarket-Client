import {View} from "vritra";
import css from "./FieldView.module.css";
import {pencil0} from "assets";


export default function FieldView(props){
    const {parent,label,value,icon=pencil0,onClick}=props;
    const fieldview=View({parent,className:`button ${css.fieldview}`});

    fieldview.innateHTML=`
        <h3 class="${css.label}">${label||""}</h3>
        <div class="${css.sideinfo}">
            <span class="${css.value}">${value||""}</span>
            <img class="${css.icon}" src="${typeof(icon)==="function"?icon(textColor):icon}"/>
        </div>
    `;

    fieldview.onclick=onClick&&((event)=>{
        event.stopPropagation();
        onClick(fieldview);
    });

    return fieldview;
}
