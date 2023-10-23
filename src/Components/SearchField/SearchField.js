import {View,capitalize,useSwipeGesture} from "vritra";
import css from "./SearchField.module.css";
import {magnifier0} from "assets";


export default function SearchField(props){
    const {parent,tintColor=backgroundColor,noicon,onChange}=props;
    const searchfield=View({
        parent,style:{color:tintColor},
        className:`${css.searchfield} ${props.className||""}`,
    });

    searchfield.innateHTML=`
        <div class="${css.field}">
            <input
                ref="inputEl"
                type="text"
                placeholder="${capitalize(props.placeholder||language.finditem,1)}"
            />
        </div>
        ${noicon?"":`<img 
            class="button ${css.searchbtn}" 
            ref="searchbtn" 
            src="${magnifier0(tintColor)}"
        />`}
    `;
    const {inputEl,searchbtn}=searchfield;
    if(searchbtn){
        searchbtn.onclick=onChange&&(()=>onChange(inputEl.value?.trim()));
    }
    else{
        inputEl.onchange=onChange&&(()=>onChange(inputEl.value?.trim()));
    }
    onChange&&useSwipeGesture({
        element:searchfield,
        onSwipe:({direction})=>{
            if(direction==="left"){
                inputEl.value="";
                onChange("");
            };
        },
    });

    searchfield.setValue=(value,triggerOnChange=true)=>{
        inputEl.value=value;
        triggerOnChange&&onChange&&onChange(inputEl.value);
    }

    return searchfield;
}
