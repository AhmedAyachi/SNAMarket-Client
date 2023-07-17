import {View,capitalize} from "cherries";
import css from "./InputField.module.css";
import {eye0,eyeOff0} from "assets";


export default function InputField(props){
    const {parent,type,placeholder,icon=getTypeIcon(type),onIconClick,onChange}=props;
    const inputfield=View({parent,style:props.style,className:css.inputfield});

    inputfield.innateHTML=`
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
    const {inputEl,iconEl}=inputfield;
    inputEl.onchange=()=>{
        const value=inputEl.value?.trim();
        onChange&&onChange(value);
    }
    if(iconEl){
        iconEl.onclick=type==="password"?((event)=>{
            inputEl.focus();
            const isPassword=inputEl.getAttribute("type")==="password";
            inputEl.type=isPassword?"text":"password";
            iconEl.src=(isPassword?eyeOff0:eye0)(mainColor);
            onIconClick&&onIconClick(event);
        }):onIconClick;
    }

    return inputfield;
}

const getTypeIcon=(type)=>{
    switch(type?.toLowerCase()){
        case "password": return eye0;
        default: return undefined;
    }
}
