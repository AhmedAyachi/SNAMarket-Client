import {NativeView} from "vritra";
import css from "./FormSite.module.css";
import {SingupForm,ComplaintForm,HeaderView} from "components";


export default function FormSite(props){
    const {parent,data}=props;
    const formsite=NativeView({parent,id:"webview",className:css.formsite}),state={
        ...statics[data.type],
    },{component}=state;

    formsite.innateHTML=`
    `;
    HeaderView({
        parent:formsite,
        className:css.header,
        title:data.title||language[data.type],
    });
    component&&component({...data,parent:formsite});
    
    return formsite;
}

const statics={
    complaint:{component:ComplaintForm},
    signup:{component:SingupForm},
}
