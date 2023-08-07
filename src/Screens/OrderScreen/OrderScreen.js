import {View} from "cherries";
import css from "./OrderScreen.module.css";
import {FormView} from "components";
import {reset0,cross0} from "assets";


export default function OrderScreen(props){
    const {parent,product}=props,{granularities}=product;
    const orderscreen=View({parent,className:css.orderscreen});

    orderscreen.innateHTML=`
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
    FormView({
        parent:orderscreen,
        className:css.form,
        fields:[
            {
                id:"quantity",
                label:language.quantity,
                type:"number",
            },
            {
                id:"granularity",
                label:language.granularity,
                type:"radio",
                multiple:false,
                options:granularities.map(id=>({id,label:id})),
            }
        ],
        submitter:{label:language.toorder},
        onSubmit:(input)=>{
            input.granularity=input.granularity?.id;
            console.log(input);
        },
    });

    const {closebtn}=orderscreen;
    closebtn.onclick=()=>{
        WebView.close();
    }


    console.log(product);

    return orderscreen;
}
