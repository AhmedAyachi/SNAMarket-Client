import { fadeIn } from "corella";
import css from "./ProductOrderForm.module.css";
import {FormView} from "components";
import {cart0} from "assets";
import * as H from "./Hooks";


export default async function ProductOrderForm(props){
    const {parent,product}=props;
    const productorderform=FormView({
        ...props,parent,
        className:css.productorderform,
        fields:[
            {
                id:"weight",
                type:"weight",
                label:language.quantity,
            },
            {
                id:"granularity",
                label:language.granularity,
                type:"radio",
                multiple:false,
                options:product.granularities,
                className:css.granularityfield,
            }
        ],
        onSubmit:(input)=>{
            input.granularity=input.granularity?.id;
            const cartitem=getInputCartItem(product,input);
            console.log(input);
            H.saveCartItem(cartitem).
            then(()=>{
                WebView.close();
            });
        },
    });

    productorderform.beforeEndHTML=`
    `;

    WebView.useStore(({cart})=>{
        const {items}=cart,{id}=product;
        const cartitem=items.find(item=>item.product.id===id);
        cartitem&&productorderform.setInput(cartitem);
        productorderform.setSubmitter({
            icon:cart0,
            label:language[(cartitem?"edit":"addto")+"cart"],
        });
        fadeIn(productorderform,"flex",500);
    });

    productorderform.style.display="none";
    return productorderform;
}

const getInputCartItem=(product,input)=>{
    return {
        weight:input.weight,
        granularity:input.granularity,
        product:{
            id:product.id,
            name:product.name,
        },
    }
}
