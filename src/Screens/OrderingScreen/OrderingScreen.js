import {View} from "cherries";
import css from "./OrderingScreen.module.css";
import {FormView} from "components";
import {reset0,cross0} from "assets";


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
    FormView({
        parent:orderingscreen,
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

    const {closebtn}=orderingscreen;
    closebtn.onclick=()=>{
        WebView.close();
    }


    console.log(product);

    return orderingscreen;
}
