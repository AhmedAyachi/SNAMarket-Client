import {View} from "cherries";
import css from "./ItemView.module.css";


export default function ItemView(props){
    const {parent,product}=props;
    const itemview=View({
        parent,
        className:`button ${css.itemview}`,
    });

    itemview.innateHTML=`
        <text as="span" class="${css.name}">${product.name||""}</text>
        <text as="span" class="${css.price}">${product.price} ${language.td}</text>
    `;

    return itemview;
}
