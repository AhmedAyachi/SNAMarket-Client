import {View} from "corella";
import css from "./OrderView.module.css";
import {Order} from "resources";


export default function OrderView(props){
    const {parent,order}=props,{status}=order;
    const orderview=View({parent,className:css.orderview}),state={
        statusColor:Order.statusColor[status],
    },{statusColor}=state;

    orderview.innateHTML=`
        <div class="${css.col0}">
            <h3 class="${css.title}"></h3>
            <p class="${css.datetime}">${order.date} - ${order.time}</p>
        </div>
        <div class="${css.col1}">
            <span class="${css.status}" style="color:${statusColor};">
                ${language["order"+status]?.replace(language.order,"")}
            </span>
            <span class="${css.badge}" style="background-color:${statusColor}"></span>
        </div>
    `;

    return orderview;
}
