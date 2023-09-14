import {View, removeItem} from "corella";
import css from "./CartView.module.css";
import CartItemView from "./CartItemView/CartItemView";
import {ButtonView} from "components";


export default function CartView(props){
    const {parent,cart}=props,{items}=cart;
    const cartview=View({parent,className:`${css.cartview} ${props.className||""}`});

    cartview.innateHTML=`
        <div class="${css.items}" ref="itemsEl"></div>
    `;
    items?.forEach(cartitem=>{
        CartItemView({
            parent:cartview.itemsEl,cartitem,
            onChangeQuantity:()=>{cartview.updateAmount()},
            onRemove:()=>{
                removeItem(items,cartitem);
                cartview.updateAmount();
            },
        });
    });
    const orderbtn=ButtonView({
        parent:cartview,
        label:language.toorder,
        sublabel:" ",
    });


    cartview.updateAmount=()=>{
        const price=items.reduce((sum,{quantity,product})=>sum+quantity*product.kgprice,0);
        orderbtn.setSublabel(price+" "+language.td);
    }
    cartview.updateAmount();

    return cartview;
}
