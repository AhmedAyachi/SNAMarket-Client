import {sanitize} from "vritra";
import css from "./InputField.module.css";
import {FieldView} from "components";
import {getAdjustedDate} from "resources";
import {clock0,calendar0,eyeoff0,eye0} from "assets";


export default function InputField(props){
    const {parent,layoutId=0,value,min,max,placeholder,type,readonly,multiline,onChange}=props;
    const inputfield=FieldView({
        parent,at:props.at,
        className:`${css.inputfield} ${props.className||""}`,
        label:props.label,
        labelStyle:props.labelStyle,
    }),state={
        datetime:["date","time"].includes(type),
        icon:props.icon||getIcon(type),
        editable:!readonly,
    },{editable,datetime,icon}=state;

    inputfield.beforeEndHTML=`
        <div class="${css.container}" style="${styles.container(layoutId,multiline)};${props.style||""}">
            <div class="${css.wrapper}">
                <${multiline?"textarea":"input"}
                    ref="inputEl"
                    class="${css.input}"
                    type="${datetime?"text":getInputType(type)}" 
                    placeholder="${placeholder||""}"
                    ${typeof(min)==="number"?`min="${min}"`:""}
                    ${max?`max="${max}"`:""}
                    ${(readonly||datetime)?"readonly":""} 
                    ${multiline?`spellcheck="false"`:""}
                ></${multiline?"textarea":"input"}>
            </div>
            ${icon?`
                <img class="icon ${css.icon}" alt="" src="${icon}"/>
            `:""}
            ${editable&&datetime?`
                <input ref="datetimeEl" class="${css.datetime}" type="${type}"/>
            `:""}
        </div>
    `;

    const {inputEl}=inputfield;
    inputEl.onchange=editable&&onChange&&(()=>{
        const value=inputfield.getValue();
        onChange(value);
    });
    
    const {datetimeEl}=inputfield;
    if(datetimeEl){
        datetimeEl.onchange=()=>{
            let {value}=datetimeEl;
            if(type==="date"){
                value=value.split(/\/|-/g).reverse().join("/");
            }
            inputfield.setValue(value);
        }
    }

    const revealbtn=(type==="password")&&inputfield.querySelector(`.${css.icon}`);
    if(revealbtn){
        revealbtn.onclick=()=>{
            const hidden=inputEl.type==="password";
            inputEl.type=hidden?"text":"password";
            revealbtn.src=(hidden?eyeoff0:eye0)(mainColor);
        }
    }
    /* if(type==="tel"){
        inputfield.onclick=()=>{
            startApp.set({
                action:"ACTION_DIAL",
                uri:value,
            }).start();
        }
    } */

    inputfield.setValue=(value,triggerOnChange=true)=>{
        inputEl.value=sanitizeInput(type,value);
        triggerOnChange&&inputEl.onchange?.();
    };
    inputfield.getValue=()=>sanitizeInput(type,inputEl.value.trim());
    inputfield.focus=()=>{inputEl.focus()};
    inputfield.blur=()=>{inputEl.blur()};

    value&&inputfield.setValue(value,false);
    return inputfield;
}

const styles={
    container:(layoutId,multiline)=>`
        height:${multiline?22.4:10.667}em;
        ${layoutId?`
            border-left:none;
            border-right:none;
            border-top:none;
        `:`
            padding:${multiline?"2":"0 2"}em;
        `}
    `,
}

const sanitizeInput=(type,input)=>{
    switch(type){
        case "date": return getAdjustedDate(input);
        case "time": return getTimeValue(input);
        case "email": return sanitize(input,"@._$");
        case "number": return parseFloat(input);
        default: return input;
    }
}

const getTimeValue=(value="")=>{
    value=sanitize(value,":");
    const parts=value.split(":").slice(0,2).map(str=>parseInt(str)||0);
    const hours=parts[0],minutes=parts[1];
    const ishour=(-1<hours)&&(hours<24),areminutes=(-1<minutes)&&(minutes<60);
    return `${ishour?(hours>9?hours:`0${hours}`):"00"}:${areminutes?(minutes>9?minutes:`0${minutes}`):"00"}`;
}

const getIcon=(type)=>{
    let shape=(()=>{
        switch(type){
            case "password": return eye0;
            case "date": return (color)=>calendar0(color,1);
            case "time": return clock0;
            default: return null;
        }
    })();
    return shape&&shape(mainColor);
}

const getInputType=(type)=>{
    if(type==="number") return cordova.platformId==="ios"?"tel":"number";
    else return type||"text";
}
