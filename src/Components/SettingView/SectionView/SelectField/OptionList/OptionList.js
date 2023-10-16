import {View,map} from "vritra";
import css from "./OptionList.module.css";


export default function OptionList(props){
    const {parent,options,onPick}=props;
    const optionlist=View({parent,className:css.optionlist});

    optionlist.innateHTML=`
        ${map(options,({id,label})=>`
            <span id="${id}" class="button ${css.option}">${label||""}</span>
        `)}
    `;

    const optionEls=optionlist.querySelectorAll(`.${css.option}`);
    optionEls.forEach(optionEl=>{
        const {id}=optionEl,option=options.find(option=>option.id===id);
        optionEl.onclick=onPick&&(()=>{
            const selectfield=optionlist.parentNode.parentNode;
            selectfield.toggle();
            onPick(option);
        });
    });

    return optionlist;
}
