import {View,fadeIn,fadeOut} from "vritra";
import css from "./DropList.module.css";
import ValueView from "./ValueView/ValueView";
import ListView from "./ListView/ListView";


export default function DropList(props){
    const {parent,options,iconColor="black",indicatorColor,labelHidden,onChange}=props;
    const droplist=View({parent,className:`${css.droplist} ${props.className||""}`}),state={
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
                labelHidden,iconColor,indicatorColor,
            });
            onChange&&onChange(option);
        }
    }
    droplist.setOption(props.value||options[0].id);
    

    return droplist;
}
