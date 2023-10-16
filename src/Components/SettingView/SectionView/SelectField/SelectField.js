import {AccordionView} from "vritra";
import css from "./SelectField.module.css";
import FieldView from "../FieldView/FieldView";
import OptionList from "./OptionList/OptionList";
import {chevron0} from "assets";


export default function SelectField(props){
    const {parent}=props;
    const selectfield=AccordionView({
        parent,className:css.selectfield,
        renderHeader:({parent})=>FieldView({
            parent,icon:chevron0,
            label:props.label,
            value:props.value,
        }),
        renderContent:({parent})=>OptionList({...props,parent}),
    });

    selectfield.beforeEndHTML=`
    `;

    return selectfield;
}
