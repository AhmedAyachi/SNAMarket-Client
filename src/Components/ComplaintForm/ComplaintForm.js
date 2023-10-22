import {} from "vritra";
import css from "./ComplaintForm.module.css";
import {FormView} from "components";
import * as H from "./Hooks";


export default function ComplaintForm(props){
    const {parent,orderId}=props;
    const complaintform=FormView({
        parent,
        className:`${css.complaintform} ${props.className||""}`,
        input:{orderId},
        fields:[
            orderId&&{
                id:"orderId",
                label:language.order,
                readonly:true,
            },
            {
                id:"subject",
                type:"droplist",
                label:language.subject,
                items:()=>H.fetchComplaintSubjects().then(subjects=>subjects.map(({id,name})=>({
                    id,label:language[name],
                }))),
            },
            {
                id:"body",
                label:language.description,
                multiline:true,
            },
        ].filter(Boolean),
        onSubmit:(input)=>{
            input.subject=input.subject?.id;
            H.sendComplaint(input).then(data=>{
                if(data){
                    Notifier.toast({text:language.complaintsubmitted});
                    WebView.close();
                }
            });
        },
    });

    complaintform.beforeEndHTML=`
    `;

    return complaintform;
}
