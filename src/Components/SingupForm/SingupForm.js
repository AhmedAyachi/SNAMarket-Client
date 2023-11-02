import {} from "vritra";
import css from "./SingupForm.module.css";
import {FormView, LoadingView} from "components";
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
            const loadingview=LoadingView();
            H.sendSignupRequest(input).then(()=>{
                Notifier.toast({text:language.registrationsuccessful});
                WebView.close();
            }).
            catch(()=>{
                Notifier.toast({text:language.registrationfailed});
            }).
            finally(loadingview.unmount);
        },
    });

    singupform.beforeEndHTML=`
    `;

    return singupform;
}
