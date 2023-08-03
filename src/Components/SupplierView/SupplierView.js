import {View} from "cherries";
import css from "./SupplierView.module.css";


export default function SupplierView(props){
    const {parent,supplier}=props;
    const supplierview=View({parent,className:css.supplierview});

    supplierview.innateHTML=`
        <div class="${css.col0}">
            <img class="${css.logo}" src="${supplier.logo}"/>
            <text class="${css.name}">${supplier.name}</text>
        </div>
        <div class="${css.col1}"></div>
    `;

    return supplierview;
}
