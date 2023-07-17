import {View,Switch} from "cherries";
import css from "./SwitchField.module.css";


export default function SwitchField(props){
    const {parent,label,onChange}=props;
    const switchfield=View({parent,className:css.switchfield});

    switchfield.innateHTML=`
        <text class="${css.label}">${label||""}</text>
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
