import {View,fadeIn,fadeOut} from "corella";
import css from "./CheckoutScreen.module.css";
import {OrderFeedbackView,ButtonView,OrderSheet,LoadingView,HeaderView} from "components";
import * as H from "./Hooks";


export default function CheckoutScreen(props){
    const {parent}=props;
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
    const loadingview=LoadingView(),{mainEl}=checkoutscreen;
    H.sendOrderRequest().then(order=>{
        OrderSheet({
            parent:mainEl,
            className:css.ordersheet,order,
        });
        const confirmbtn=ButtonView({
            parent:checkoutscreen.mainEl,
            label:language.confirm,
            onClick:()=>{
                const loadingview=LoadingView({
                    parent:confirmbtn,
                    color:minorColor,
                    style:{backgroundColor:mainColor},
                });
                !function confirmOrder(){
                    H.sendConfirmRequest().then(successful=>{
                        state.successful=successful;
                        fadeOut(mainEl,()=>{
                            mainEl.innerHTML="";
                            mainEl.style.justifyContent="center";
                            OrderFeedbackView({
                                parent:mainEl,successful,
                                onSubmit:(event)=>{
                                    if(successful){WebView.close()}
                                    else{
                                        LoadingView({
                                            parent:event.target,
                                            color:minorColor,
                                            style:{backgroundColor:"inherit"},
                                        });
                                        confirmOrder();
                                    }
                                },
                            });
                            fadeIn(mainEl,"flex",500);
                        });
                    }).
                    finally(loadingview.unmount);
                }()
            },
        });
    }).
    finally(loadingview.unmount);

    return checkoutscreen;
}
