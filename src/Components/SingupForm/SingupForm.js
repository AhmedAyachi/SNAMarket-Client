import {} from "vritra";
import css from "./SingupForm.module.css";
import {FormView} from "components";
import * as H from "./Hooks";


export default function SingupForm(props){
    const {parent}=props;
    const singupform=FormView({
        parent:parent,
        className:css.singupform,
        fields:[
            {id:"name",label:language.name},
            {id:"email",label:"email"},
            {
                id:"password",
                label:language.password,
                type:"password",
            },
            {
                id:"birthdate",
                label:language.birthdate,
                type:"date",
            },
            {
                id:"tel",
                label:"tel",
                type:"number",
            },
        ],
        onSubmit:(input)=>{
            input.countryId="tn";
            H.sendSignupRequest(input).then(()=>{

            });
        },
    });

    singupform.beforeEndHTML=`
    `;

    return singupform;
}
