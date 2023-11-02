import {View,parseJSON} from "vritra";
import css from "./CartScreen.module.css";
import {ButtonView,CartView,HeaderView} from "components";
import * as H from "./Hooks";


export default function CartScreen(props){
    const {parent}=props;
    const cartscreen=View({parent,tag:"main",className:css.cartscreen});

    cartscreen.innateHTML=`
        <main ref="mainEl"></main>
    `;
    HeaderView({
        parent:cartscreen,
        className:css.header,
        title:language.cart,
    });
    WebView.useStore(({cart})=>{
        CartView({
            parent:cartscreen.mainEl,cart,
            className:css.cartview,
        });
        const orderbtn=ButtonView({
            parent:cartscreen.mainEl,
            label:language.toorder,
            onClick:()=>{
                orderbtn.load(true);
                H.sendCheckRequest().then(orderitems=>{
                    WebView.show({
                        id:"servicesite",
                        message:{name:"checkout",orderitems},
                        onClose:({message})=>{
                            const successful=parseJSON(message);
                            if(successful){
                                WebView.setStore("cart",{items:[]});
                                WebView.close();
                            }
                        },
                    });
                }).finally(()=>{
                    orderbtn.load(false);
                });
            },
        });
    });
    
    return cartscreen;
}
