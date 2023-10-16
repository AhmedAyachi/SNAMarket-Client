import {View} from "vritra";
import css from "./SearchField.module.css";
import {magnifier0} from "assets";


export default function SearchField(props){
    const {parent,tintColor=backgroundColor,noicon,onSearch}=props;
    const searchfield=View({
        parent,style:{color:tintColor},
        className:`${css.searchfield} ${props.className||""}`,
    });

    searchfield.innateHTML=`
        <div class="${css.field}">
            <input
                ref="inputEl"
                type="text"
                placeholder="${props.placeholder}"
            />
        </div>
        ${noicon?"":`<img 
            class="${css.searchbtn} button" 
            ref="searchbtn" 
            src="${magnifier0(tintColor)}"
        />`}
    `;
    const {inputEl,searchbtn}=searchfield;
    if(searchbtn){
        searchbtn.onclick=()=>{
            const value=inputEl.value?.trim();
            onSearch&&onSearch(value);
        }
    }

    searchfield.setValue=(value)=>{
        inputEl.value=value;
    }

    return searchfield;
}
