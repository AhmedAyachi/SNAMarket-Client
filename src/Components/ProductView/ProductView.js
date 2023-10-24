import {View} from "vritra";
import css from "./ProductView.module.css";
import {ProductType} from "resources";


export default function ProductView(props){
    const {parent,product,withicon=true,onCartChange}=props;
    const productview=View({
        parent,
        className:`${onCartChange?"button":""} ${css.productview} ${props.className||""}`,
    }),state={icon:withicon&&ProductType.icon[product.type]},{icon}=state;

    productview.innateHTML=`
        <div class="${css.info}">
            <text as="h3" class="${css.name}">${product.name||""}</text>
            <text class="${css.description}">${product.description||""}</text>
        </div>
        ${icon?`
            <img class="${css.icon}" src="${icon(mainColor)}"/>
        `:""}
    `;

    productview.onclick=onCartChange&&(()=>{
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

    return productview;
}
