import {View} from "corella";
import css from "./CartView.module.css";


export default function CartView(props){
    const {parent,cart}=props;
    const cartview=View({parent,className:`${css.cartview} ${props.className||""}`});

    cartview.innateHTML=`
    `;

    console.log("cart",cart);

    return cartview;
}
