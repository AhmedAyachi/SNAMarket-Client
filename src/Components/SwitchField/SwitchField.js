import {Switch} from "vritra";
import css from "./SwitchField.module.css";
import {FieldView} from "components";


export default function SwitchField(props){
    const {parent,onChange}=props;
    const switchfield=FieldView({...props,parent,className:css.switchfield});

    switchfield.beforeEndHTML=`
    `;
    Switch({
        parent:switchfield,
        className:css.switch,
        thumbColor:{true:mainColor,false:backgroundColor},
        trackColor:{false:"rgba(0,0,0,0.25)",true:"rgba(0,0,0,0.15)"},
        onChange,
    });

    return switchfield;
}
