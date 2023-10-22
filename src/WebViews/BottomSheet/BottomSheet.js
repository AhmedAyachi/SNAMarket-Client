import {NativeView} from "vritra";
import css from "./BottomSheet.module.css";
import {SettingView,ProductOrderForm,HeaderView,OrderSheet,LoadingView} from "components";
import {cross0} from "assets";
import * as H from "./Hooks";


export default function BottomSheet(props){
    const {parent,data}=props,{contentId}=data;
    const bottomsheet=window.webview=NativeView({parent,className:css.bottomsheet}),state={
        ...statics[contentId],
    },{component,actions}=state;

    bottomsheet.innateHTML=`
        <main class="${css.main}" ref="mainEl"></main>
    `;
    
    HeaderView({
        parent:bottomsheet,
        className:css.header,
        title:data.title||language[contentId],
        actions:typeof(actions)==="function"?actions(data):actions,
        backIcon:cross0,
    });
    component&&component({...data,parent:bottomsheet.mainEl});

    return bottomsheet;
}

const statics={
    order:{
        component:(props)=>{
            const loadingview=LoadingView();
            H.fetchDetailedOrder(props.orderId).then(order=>{
                console.log("order",order);
                props.order=order;
                OrderSheet(props);
            }).
            finally(loadingview.unmount);
        },
        actions:({orderId})=>[{ref:"complain",orderId}],
    },
    settings:{component:SettingView},
    productorder:{component:ProductOrderForm},
}
