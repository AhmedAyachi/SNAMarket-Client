import {fadeIn} from "corella";
import css from "./ProductOrderForm.module.css";
import {FormView} from "components";
import {cart0} from "assets";
import * as H from "./Hooks";


export default function ProductOrderForm(props){
    const {parent,product}=props,{granularities}=product;
    const productorderform=FormView({
        ...props,parent,
        className:css.productorderform,
        fields:[
            {
                id:"quantity",
                type:"number",
                label:language.quantity,
                placeholder:language.kilograms,
            },
            {
                id:"granularity",
                label:language.granularity,
                type:"radio",
                multiple:false,
                options:granularities.map((id,i)=>({
                    id:"g"+i,
                    ref:id,
                    label:(()=>{
                        const str=parseFloat(id).toString();
                        return id.replace(str,str+" ");
                    })(),
                })),
                className:css.granularityfield,
            }
        ],
        onSubmit:(input)=>{
            input.granularity=input.granularity?.ref;
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
        cartitem&&productorderform.setInput({
            quantity:cartitem.quantity,
            granularity:"g"+granularities.indexOf(cartitem.granularity),
        });
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
        quantity:input.quantity,
        granularity:input.granularity,
        product:{
            id:product.id,
            name:product.name,
            kgprice:product.kgprice,
        },
    }
}
