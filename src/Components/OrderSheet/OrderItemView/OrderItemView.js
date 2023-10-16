import {View} from "vritra";
import css from "./OrderItemView.module.css";


export default function OrderItemView(props){
    const {parent,item}=props;
    const orderitemview=View({parent,className:css.orderitemview});

    orderitemview.innateHTML=`
        <text class="${css.name}">${item.name||""}</text>
        <div class="${css.sideinfo}">
            <text>${item.quantity} ${item.unit}</text>
            <text>${item.granularity}</text>
        </div>
    `;

    return orderitemview;
}
