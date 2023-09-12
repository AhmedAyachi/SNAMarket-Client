import {View} from "corella";
import css from "./CartScreen.module.css";


export default function CartScreen(props){
    const {parent}=props;
    const cartscreen=View({parent,tag:"main",className:css.cartscreen});

    cartscreen.innateHTML=`
    `;
    
    return cartscreen;
}
