import {View} from "cherries";
import css from "./OrderingScreen.module.css";
import {FormView} from "components";
import {cart0,reset0,cross0} from "assets";
import * as H from "./Hooks";


export default function OrderingScreen(props){
    const {parent,product}=props,{granularities}=product;
    const orderingscreen=View({parent,className:css.orderingscreen});

    orderingscreen.innateHTML=`
        <header>
            <img 
                ref="closebtn" class="button"
                src="${cross0(textColor)}"
            />
            <h3 class="${css.title}">${product.name}</h3>
            <img 
                ref="resetbtn" class="button"
                src="${reset0(textColor)}"
            />
        </header>
    `;
    WebView.useStore(({cart})=>{
        const {items}=cart,{id}=product;
        let cartitem=items.find(item=>item.product.id===id);
        FormView({
            parent:orderingscreen,
            className:css.form,
            input:cartitem&&{
                quantity:cartitem.quantity,
                granularity:cartitem.granularity,
            },
            fields:[
                {
                    id:"quantity",
                    min:1,
                    label:language.quantity,
                    type:cordova.platformId==="ios"?"tel":"number",
                },
                {
                    id:"granularity",
                    label:language.granularity,
                    type:"radio",
                    multiple:false,
                    options:granularities,
                    className:css.granularityfield,
                }
            ],
            submitter:{
                icon:cart0,
                label:language[(cartitem?"edit":"addto")+"cart"],
            },
            onSubmit:(input)=>{
                input.granularity=input.granularity?.id;
                cartitem=getCartItem(product,input);
                H.saveCartItem(cartitem,items.indexOf(cartitem)).
                then(WebView.close).
                finally(()=>{
                    alert("item added");
                });
                console.log(input);
                
            },
        });
    });
    

    const {closebtn}=orderingscreen;
    closebtn.onclick=()=>{
        WebView.close();
    }


    console.log(product);

    return orderingscreen;
}

const getCartItem=(product,input)=>{
    return {
        quantity:input.quantity,
        granularity:input.granularity,
        product:{
            id:product.id,
            name:product.name,
        },
    }
}
