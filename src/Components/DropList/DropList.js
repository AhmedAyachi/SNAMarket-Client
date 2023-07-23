import {View} from "cherries";
import css from "./DropList.module.css";
import ValueView from "./ValueView/ValueView";
import ListView from "./ListView/ListView";


export default function DropList(props){
    const {parent,options,onChange}=props;
    const droplist=View({parent,className:css.droplist}),state={
        option:options[0],
        listshown:false,
    };

    droplist.innateHTML=`
    `;
    ValueView({
        parent:droplist,
        value:state.option,
    });
    const listview=ListView({
        parent:droplist,options,
        onChange:(option)=>{
            droplist.labelEl.innerText=option.label;
            onChange&&onChange(option);
        },
    });

    droplist.toggle=(listshown=!state.listshown)=>{
        state.listshown=listshown;
        
        listview.style.display=state.listshown?"block":"none";
    }
    

    return droplist;
}
