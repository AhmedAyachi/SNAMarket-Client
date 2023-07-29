import {View,fadeIn,fadeOut} from "cherries";
import css from "./DropList.module.css";
import ValueView from "./ValueView/ValueView";
import ListView from "./ListView/ListView";


export default function DropList(props){
    const {parent,options,iconColor="black",labelHidden,onChange}=props;
    const droplist=View({parent,className:css.droplist}),state={
        option:null,
        listshown:false,
        valueview:null,
        listview:null,
    };

    droplist.innateHTML=`
    `;

    droplist.toggle=(listshown=!state.listshown)=>{
        state.listshown=listshown;
        if(!state.listview){
            state.listview=ListView({
                parent:droplist,options,
                onChange:(option)=>{
                    droplist.setOption(option.id);
                    droplist.toggle(false);
                    onChange&&onChange(option);
                },
            });
        }
        const {listview}=state;
        if(listshown){
            listview.style.display="block";
            fadeIn(listview);
        }
        else{
            fadeOut(listview);
        }
    }

    droplist.setOption=(optionId)=>{
        const option=options?.find(option=>option.id===optionId);
        if(option){
            state.option=option;
            const {valueview}=state;
            valueview&&valueview.remove();
            state.valueview=ValueView({
                parent:droplist,value:option,
                labelHidden,iconColor,
            });
        }
    }
    droplist.setOption(options[0].id);
    

    return droplist;
}
