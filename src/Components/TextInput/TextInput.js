import {View,capitalize} from "vritra";
import css from "./TextInput.module.css";
import {eye0,eyeoff0} from "assets";


export default function TextInput(props){
    const {parent,type,placeholder,icon=getTypeIcon(type),onIconClick,onChange}=props;
    const textinput=View({parent,style:props.style,className:css.textinput});

    textinput.innateHTML=`
        <div class="${css.wrapper}">
            <input
                ref="inputEl" 
                type="${type||"text"}"
                placeholder="${placeholder?capitalize(placeholder,1):""}"
            />
        </div>
        ${icon?`
            <img 
                ref="iconEl"
                class="${css.icon}" 
                src="${typeof(icon)==="function"?icon(mainColor):icon}"
            />
        `:""}
    `;
    const {inputEl,iconEl}=textinput;
    inputEl.onchange=()=>{
        const value=inputEl.value?.trim();
        onChange&&onChange(value);
    }
    if(iconEl){
        iconEl.onclick=type==="password"?((event)=>{
            inputEl.focus();
            const isPassword=inputEl.getAttribute("type")==="password";
            inputEl.type=isPassword?"text":"password";
            iconEl.src=(isPassword?eyeoff0:eye0)(mainColor);
            onIconClick&&onIconClick(event);
        }):onIconClick;
    }

    return textinput;
}

const getTypeIcon=(type)=>{
    switch(type?.toLowerCase()){
        case "password": return eye0;
        default: return undefined;
    }
}
