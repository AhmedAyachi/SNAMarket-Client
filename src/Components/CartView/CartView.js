import {View,parseJSON,removeItem} from "corella";
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
            onChangeQuantity:()=>{
                WebView.setStore(`cart.items[${items.indexOf(cartitem)}]`,cartitem);
            },
            onRemove:()=>{
                removeItem(items,cartitem);
                WebView.setStore("cart.items",items);
            },
        });
    });
    const orderbtn=ButtonView({
        parent:cartview,
        label:language.toorder,
    });
    orderbtn.onclick=()=>{
        WebView.show({
            id:"servicesite",
            message:{name:"checkout"},
            onClose:({message})=>{
                const successful=parseJSON(message);
                if(successful){
                    WebView.setStore("cart",{items:[]});
                    WebView.close();
                }
            },
        });
    }

    /* cartview.updateAmount=()=>{
        const price=items.reduce((sum,{quantity,product})=>sum+quantity*product.kgprice,0);
        orderbtn.setSublabel(price+" "+language.td);
    };
    cartview.updateAmount(); */

    return cartview;
}
