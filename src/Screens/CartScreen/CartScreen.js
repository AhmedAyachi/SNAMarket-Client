import {View} from "corella";
import css from "./CartScreen.module.css";
import {CartView,HeaderView} from "components";


export default function CartScreen(props){
    const {parent}=props;
    const cartscreen=View({parent,tag:"main",className:css.cartscreen});

    cartscreen.innateHTML=`
    `;
    HeaderView({
        parent:cartscreen,
        className:css.header,
        title:language.cart,
    });
    WebView.useStore(({cart})=>{
        CartView({
            parent:cartscreen,
            className:css.cartview,
            cart,
        });
    });
    
    return cartscreen;
}
