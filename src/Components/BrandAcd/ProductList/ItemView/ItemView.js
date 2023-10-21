import {View} from "vritra";
import css from "./ItemView.module.css";


export default function ItemView(props){
    const {parent,product,onCartChange}=props;
    const itemview=View({
        parent,
        className:`button ${css.itemview}`,
    });

    itemview.innateHTML=`
        <text as="h3" class="${css.name}">${product.name||""}</text>
        <text class="${css.description}">${product.description||""}</text>
    `;

    itemview.onclick=onCartChange&&(()=>{
        WebView.show({
            id:"bottomsheet",
            message:{
                title:product.name,
                contentId:"productorder",
                product,
            },
            onClose:({store})=>{
                const {cart}=store;
                onCartChange(cart);
            },
        });
    });

    return itemview;
}
