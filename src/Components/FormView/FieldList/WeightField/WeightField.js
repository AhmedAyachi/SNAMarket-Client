import {View} from "corella";
import css from "./WeightField.module.css";
import {DropList,FieldView} from "components";
import InputField from "../InputField/InputField";


export default function WeightField(props){
    const {parent,label,unitIndicatorColor,onChange}=props;
    const weightfield=FieldView({parent,label,className:css.weightfield}),state={
        value:getValue(props.value),
    },{value}=state;

    weightfield.beforeEndHTML=`
        <div class="${css.container}" ref="container"></div>
    `;
    InputField({
        parent:weightfield.container,
        className:css.quantityfield,
        type:"number",min:1,
        value:value.quantity,
        onChange:(quantity)=>{
            value.quantity=quantity;
            onChange&&onChange(value);
        },
    });
    DropList({
        parent:weightfield.container,
        className:css.unitselector,
        value:value.unit,
        options:statics.units.map(id=>({id})),
        indicatorColor:unitIndicatorColor||"black",
        onChange:(option)=>{
            value.unit=option.id;
            onChange&&onChange(value);
        },
    });

    return weightfield;
}

const statics={
    units:["kg","ton"],
}

const getValue=(value)=>({
    quantity:value?.quantity||1,
    unit:(value&&statics.units.find(unit=>value.unit===unit))||statics.units[0],
});
