import {map} from "vritra";
import css from "./FieldHeader.module.css";
import {FieldView} from "components";
import {pencil0} from "assets";


export default function FieldHeader(props){
    const {parent,label,items,multiple,onChange}=props;
    let fieldheader=FieldView({parent,label,className:css.fieldheader});

    fieldheader.beforeEndHTML=`
        <div class="${css.container}">
            <div class="${css.selection}">
                ${map(items,({id,label})=>`
                    <div>
                        <span class="${css.label}">${label}</span>
                    </div>
                `)}
            </div>
            <img ref="pickbtn" class="${css.pickbtn}" src="${pencil0(textColor)}"/>
        </div>
    `;

    fieldheader.onclick=(event)=>{event.stopPropagation()};
    fieldheader.pickbtn.onclick=()=>{
        fieldheader.parentNode.parentNode.toggle();
    }

    fieldheader.setSelection=(items)=>{
        props.items=items;
        fieldheader=fieldheader.substitute(FieldHeader(props));
        onChange&&onChange(multiple?items:items[0]);
    }

    return fieldheader;
}
