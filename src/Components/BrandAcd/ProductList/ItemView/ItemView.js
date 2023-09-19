import {View} from "corella";
import css from "./ItemView.module.css";


export default function ItemView(props){
    const {parent,product,onCartChange}=props;
    const itemview=View({
        parent,
        className:`button ${css.itemview}`,
    });

    itemview.innateHTML=`
        <text as="span" class="${css.name}">${product.name||""}</text>
        <!--<text as="span" class="${css.price}">${product.kgprice} ${language.td}/KG</text>-->
    `;

    itemview.onclick=()=>{
        WebView.show({
            id:"bottomsheet",
            message:{
                title:product.name,
                contentId:"productorder",
                product,
            },
            onClose:({store})=>{
                const {cart}=store;
                onCartChange&&onCartChange(cart);
            },
        });
    }

    return itemview;
}
