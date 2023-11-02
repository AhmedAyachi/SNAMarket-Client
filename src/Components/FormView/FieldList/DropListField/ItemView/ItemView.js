import {View} from "vritra";
import css from "./ItemView.module.css";


export default function ItemView(props){
    const {parent,item,onClick}=props;
    const itemview=View({parent,className:`${css.itemview} button`});

    itemview.innateHTML=`
        <text class="${css.label}">${item.label}</text>
    `;

    itemview.onclick=()=>{
        const droplistfield=itemview.closest("*[id^=droplistfield]");
        droplistfield.toggle(false);
        onClick&&onClick(item);
    }

    return itemview;
}
