import {View} from "corella";
import css from "./CheckoutScreen.module.css";
import {ButtonView,OrderSheet,LoadingView,HeaderView} from "components";
import * as H from "./Hooks";


export default function CheckoutScreen(props){
    const {parent}=props;
    const checkoutscreen=View({parent,className:css.checkoutscreen});

    checkoutscreen.innateHTML=`
        <main class="${css.main}" ref="mainEl"></main>
    `;
    HeaderView({
        parent:checkoutscreen,
        className:css.header,
        title:language.checkout,
    });
    const loadingview=LoadingView();
    H.sendOrderRequest().then(order=>{
        OrderSheet({parent:checkoutscreen.mainEl,order});
        const confirmbtn=ButtonView({
            parent:checkoutscreen.mainEl,
            label:language.confirm,
            onClick:()=>{
                const loadingview=LoadingView({parent:confirmbtn,style:{backgroundColor:mainColor}});
                H.sendConfirmRequest().then(()=>{
                    
                }).
                finally(loadingview.unmount);
            },
        });
    }).
    finally(loadingview.unmount);

    return checkoutscreen;
}
