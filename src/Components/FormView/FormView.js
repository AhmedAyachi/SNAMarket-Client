import {View,fadeOut} from "cherries";
import css from "./FormView.module.css";
import RadioField from "./RadioField/RadioField";
import InputField from "./InputField/InputField";
import {ButtonView} from "components";


export default function FormView(props){
    const {parent,fields,readonly,submitter=true,inputChecker,onSubmit}=props,multiple=(fields?.length>1);
    let formview=View({
        parent,className:`${css.formview} ${props.className||""}`,
        style:styles.formview(multiple),
    }),state={
        input:getInitialInput(fields,props.input),
    },{input}=state;

    formview.innateHTML=`
        <div ref="fieldsEl" class="${css.fields}"></div>
    `;

    const {fieldsEl}=formview;
    fields&&fields.forEach(field=>{
        const {id,type,label}=field;
        const component=id&&((type&&statics[type])||statics.input);
        field.element=component&&component({
            ...field,id:undefined,
            parent:fieldsEl,
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
    (!readonly)&&submitter&&ButtonView({
        label:language.submit,
        ...submitter,
        parent:formview,
        style:styles.submitbtn(multiple),
        className:css.submitbtn,
        onClick:()=>{
            if(inputChecker?inputChecker(input):hasDecentInput(fields,input)){
                onSubmit&&onSubmit(formview.getInput());
            }
            else{
                alert("wrong input");
            }
        },
    });

    formview.getInput=()=>structuredClone(input);
    formview.setInput=(!readonly)&&((input)=>{
        props.input=input;
        formview=formview.substitute(FormView(props));
    });
    formview.unmount=()=>{
        fadeOut(formview,()=>{
            formview.remove();
        });
    }

    return formview;
}

const statics={
    radio:(props)=>{
        const {options,value,multiple}=props;
        value&&options.forEach(option=>{
            option.selected=multiple?value.includes(option.id):value===option.id;
        });
        return RadioField(props);
    },
    input:(props)=>InputField(props),
},styles={
    formview:(multiple)=>`
        flex-direction:${multiple?"column":"row"};
        justify-content:${multiple?"flex-start":"space-between"};
        align-items:${multiple?"stretch":"center"};
    `,
    submitbtn:(multiple)=>`
        align-self:${multiple?"flex-end":"auto"};
    `,
};

const getInitialInput=(fields,value)=>{
    const input={};
    value&&fields&&fields.forEach(({id})=>{
        input[id]=value[id];
    });
    return input;
}

const hasDecentInput=(fields,input)=>{
    let decent=true,i=0;
    const {length}=fields;
    while(decent&&(i<length)){
        const field=fields[i],{hasDecentInput}=field.element;
        decent=hasDecentInput?hasDecentInput():(input[field.id]!==undefined);
        i++;
    }
    return decent;
}
