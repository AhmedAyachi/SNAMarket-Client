import {View,fadeIn,fadeOut} from "vritra";
import css from "./CheckoutScreen.module.css";
import {OrderFeedbackView,ButtonView,OrderSheet,LoadingView,HeaderView} from "components";
import * as H from "./Hooks";


export default async function CheckoutScreen(props){
    const {parent,orderitems}=props;
    const checkoutscreen=View({parent,className:css.checkoutscreen}),state={
        successful:false,
    };

    checkoutscreen.innateHTML=`
        <main class="${css.main}" ref="mainEl"></main>
    `;
    HeaderView({
        parent:checkoutscreen,
        className:css.header,
        title:language.checkout,
        message:state.successful,
    });
    const {mainEl}=checkoutscreen;
    OrderSheet({
        parent:mainEl,order:{items:orderitems},
        className:css.ordersheet,
    });
    const confirmbtn=ButtonView({
        parent:mainEl,
        label:language.confirm,
        onClick:()=>{
            confirmbtn.load(true);
            !function confirmOrder(){
                H.sendOrderRequest(orderitems).then(order=>{
                    console.log("order",order);
                    state.successful=Boolean(order);
                    fadeOut(mainEl,()=>{
                        mainEl.innerHTML="";
                        mainEl.style.justifyContent="center";
                        OrderFeedbackView({
                            parent:mainEl,
                            className:css.feedback,
                            successful:state.successful,
                            onSubmit:(event)=>{
                                if(state.successful){WebView.close()}
                                else{
                                    LoadingView({
                                        parent:event.target,
                                        color:backgroundColor,
                                        style:{backgroundColor:"inherit"},
                                    });
                                    confirmOrder();
                                }
                            },
                        });
                        fadeIn(mainEl,"flex",500);
                    });
                }).
                finally(()=>{confirmbtn.load(false)});
            }()
        },
    });

    return checkoutscreen;
}
