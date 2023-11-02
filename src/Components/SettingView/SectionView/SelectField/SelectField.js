import {AccordionView} from "vritra";
import css from "./SelectField.module.css";
import FieldView from "../FieldView/FieldView";
import OptionList from "./OptionList/OptionList";
import {LoadingView} from "components";
import {chevron0} from "assets";


export default function SelectField(props){
    const {parent}=props,state={options:props.options};
    const selectfield=AccordionView({
        parent,className:css.selectfield,
        renderHeader:({parent})=>FieldView({
            parent,icon:chevron0,
            label:props.label,
            value:props.value,
            onClick:async (element)=>{
                let {options}=state; 
                if(typeof(options)==="function"){
                    options=options();
                    if(options instanceof Promise){
                        const loadingview=LoadingView({parent:element,style:{backgroundColor:"inherit"}});
                        state.options=await options;
                        loadingview.unmount();
                    }
                    else{state.options=options};
                }
                selectfield.toggle();
            },
        }),
        renderContent:({parent})=>OptionList({
            ...props,parent,
            options:state.options,
        }),
    });

    selectfield.beforeEndHTML=`
    `;

    return selectfield;
}
