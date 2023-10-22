import {View,getMonths} from "vritra";
import css from "./OrderView.module.css";
import {Order} from "resources";
import {check1,cross0,clock0} from "assets";


export default function OrderView(props){
    const {parent,order}=props,{status}=order;
    const orderview=View({parent,className:css.orderview}),state={
        statusColor:Order.statusColor[status],
    },{statusColor}=state;

    orderview.innateHTML=`
        <h3 class="${css.title}">${order.id}</h3>
        <div class="${css.info}">
            <p class="${css.datetime}">${getDateLabel(order.date)} - ${getTimeLabel(order.time)}</p>
            <div class="${css.status}">
                <span style="color:${statusColor};">
                    ${language["order"+status]?.replace(language.order,"")}
                </span>
                <img src="${getStatusIcon(status)(statusColor,3)}"/>
            </div>
        </div>
    `;

    orderview.onclick=()=>{
        WebView.show({
            id:"bottomsheet",
            message:{contentId:"order",orderId:order.id},
        });
    }

    return orderview;
}

const statics={
    months:getMonths(),
}

const getDateLabel=(date)=>{
    const dateObj=new Date(date.split(/\/|-/g).reverse().join("-"));
    const monthname=statics.months[dateObj.getMonth()].name;
    const day=dateObj.getDate();
    return monthname+" "+day+", "+dateObj.getFullYear();
}

const getTimeLabel=(time)=>{
    let [hour,minutes]=time.split(":").map(str=>parseInt(str)),unit;
    if(hour>12){
        unit="PM";
        hour-=12;
    }
    else{
        unit="AM";
    }
    return hour+":"+minutes+" "+unit;
}

const getStatusIcon=(status)=>{
    switch(status){
        case "shipped": return check1;
        case "cancelled": return cross0;
        case "pending": return clock0;
        default: return ()=>"";
    }
}
