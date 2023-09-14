import {View} from "corella";
import css from "./FieldList.module.css";
import RadioField from "./RadioField/RadioField";
import InputField from "./InputField/InputField";
import WeightField from "./WeightField/WeightField";


export default function FieldList(props){
    const {parent,fields,readonly}=props;
    const fieldlist=View({parent,at:"start",className:css.fieldlist}),state={
        input:getInitialInput(fields,props.input),
    },{input}=state;

    fieldlist.innateHTML=`
    `;
    fields&&fields.forEach(field=>{
        const {id,type,label}=field;
        const component=id&&((type&&statics[type])||statics.input);
        field.element=component&&component({
            ...field,id:undefined,
            parent:fieldlist,
            type:field.unit||field.type,
            label:label||((label!==false)&&id),
            value:input[id],readonly,
            onChange:(value)=>{
                input[id]=value;
                const {onChange}=field;
                onChange&&onChange(value);
            },
        });
    });

    fieldlist.getInput=()=>structuredClone(input);

    return fieldlist;
}

const statics={
    weight:WeightField,
    radio:(props)=>{
        const {options,value,multiple}=props;
        value&&options.forEach(option=>{
            option.selected=multiple?value.includes(option.id):value===option.id;
        });
        return RadioField(props);
    },
    input:(props)=>InputField(props),
}

const getInitialInput=(fields,value)=>{
    const input={};
    value&&fields&&fields.forEach(({id})=>{
        input[id]=value[id];
    });
    return input;
}
