import {View,fadeOut} from "corella";
import css from "./FormView.module.css";
import FieldList from "./FieldList/FieldList";
import {ButtonView} from "components";


export default function FormView(props){
    const {parent,fields,readonly,submitter=true,inputChecker,onSubmit}=props,multiple=(fields?.length>1);
    const formview=View({
        parent,className:`${css.formview} ${props.className||""}`,
        style:styles.formview(multiple),
    }),state={
        fieldlist:null,
        submitbtn:null,
    };

    formview.innateHTML=`
    `;
    

    formview.setSubmitter=(!readonly)&&((options)=>{
        props.submitter=options;
        const {submitbtn}=state;
        submitbtn&&submitbtn.remove();
        state.submitbtn=options&&ButtonView({
            label:language.submit,
            ...options,
            parent:formview,
            style:styles.submitbtn(multiple),
            className:css.submitbtn,
            onClick:()=>{
                const input=formview.getInput();
                console.log(input);
                if(inputChecker?inputChecker(input):hasDecentInput(fields,input)){
                    onSubmit&&onSubmit(formview.getInput());
                }
                else{
                    alert("wrong input");
                }
            },
        });
    });
    formview.getInput=()=>state.fieldlist?.getInput();
    formview.setInput=(!readonly)&&((input)=>{
        const {fieldlist}=state;
        fieldlist&&fieldlist.remove();
        state.fieldlist=FieldList({...props,parent:formview,input});
    });
    formview.unmount=()=>{
        fadeOut(formview,()=>{
            formview.remove();
        });
    }

    formview.setInput(props.input);
    formview.setSubmitter(submitter);
    return formview;
}

const styles={
    formview:(multiple)=>`
        flex-direction:${multiple?"column":"row"};
        justify-content:${multiple?"flex-start":"space-between"};
        align-items:${multiple?"stretch":"center"};
    `,
    submitbtn:(multiple)=>`
        ${multiple?"":`
            align-self:"auto";
            "margin-left:3.2em;
        `}
    `,
};

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
