import {View} from "vritra";
import css from "./TelField.module.css";
import {FieldView} from "components";


export default function TelField(props){
    const {parent,value}=props;
    const telfield=FieldView({...props,parent,className:css.telfield});

    telfield.beforeEndHTML=`
        <div class="${css.container}">
            
        </div>
    `;

    return telfield;
}
