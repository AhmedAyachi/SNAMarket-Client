import {View,parseJSON,removeItem} from "vritra";
import css from "./CartView.module.css";
import CartItemView from "./CartItemView/CartItemView";
import {ButtonView} from "components";


export default function CartView(props){
    const {parent,cart}=props,{items}=cart;
    const cartview=View({parent,className:`${css.cartview} ${props.className||""}`});

    cartview.innateHTML=`
    `;
    items?.forEach(cartitem=>{
        CartItemView({
            parent:cartview,cartitem,
            onChangeQuantity:()=>{
                WebView.setStore(`cart.items[${items.indexOf(cartitem)}]`,cartitem);
            },
            onRemove:()=>{
                removeItem(items,cartitem);
                WebView.setStore("cart.items",items);
            },
        });
    });

    return cartview;
}
