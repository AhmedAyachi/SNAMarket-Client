import {View} from "corella";
import css from "./ComplaintView.module.css";
import {Complaint} from "resources";


export default function ComplaintView(props){
    const {parent,complaint}=props,{subjectId}=complaint;
    const complaintview=View({parent,className:css.complaintview}),state={
        icon:Complaint.subjects.find(({id})=>id===subjectId)?.icon,
    };

    complaintview.innateHTML=`
        <div class="${css.header}">
            <div class="${css.subject}">
                <img src="${state.icon(mainColor)}"/>
                <h3 class="${css.title}">${language[subjectId?.toLowerCase()]||""}</h3>
            </div>
            <span class="${css.datetime}">${complaint.date} ${complaint.time}</span>
        </div>
        <text class="${css.body}">${complaint.body||""}</text>
    `;

    return complaintview;
}
