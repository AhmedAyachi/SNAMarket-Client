import {View} from "corella";
import css from "./OrderSheet.module.css";
import OrderItemView from "./OrderItemView/OrderItemView";


export default function OrderSheet(props){
    const {parent,order}=props,{items,amount}=order;
    const ordersheet=View({parent,className:`${css.ordersheet} ${props.className||""}`});

    ordersheet.innateHTML=`
        <div class="${css.items}" ref="itemsEl"></div>
        <p class="${css.amount}">
            <span>${language.amount}</span>
            <text as="span">${amount} ${language.td}</text>
        </p>
    `;
    items.forEach(item=>{
        OrderItemView({parent:ordersheet.itemsEl,item});
    });

    return ordersheet;
}
