import {View} from "vritra";
import css from "./SignupScreen.module.css";
import {FormView,HeaderView} from "components";


export default function SignupScreen(props){
    const {parent}=props;
    const signupscreen=View({parent,className:css.signupscreen});

    signupscreen.innateHTML=`
    `;
    HeaderView({
        parent:signupscreen,
        className:css.header,
        title:language.signup,
    });
    FormView({
        parent:signupscreen,
        className:css.form,
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
            console.log(IP_ADDRESS);
            input.countryId="tn";
            console.log(input);
        },
    });

    return signupscreen;
}
