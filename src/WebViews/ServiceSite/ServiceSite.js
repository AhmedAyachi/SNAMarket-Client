import {NativeView,parseJSON} from "vritra";
import css from "./ServiceSite.module.css";
import {SignupScreen,CheckoutScreen,CartScreen} from "screens";


export default function ServiceSite(props){
    const {parent}=props;
    const servicesite=window.webview=NativeView({parent,id:"webview",className:css.servicesite});

    servicesite.innateHTML=`
    `;

    WebView.useMessage(message=>{
        const data=message&&parseJSON(message);
        if(data){
            const {name}=data;
            const component=statics[name];
            component&&component({...data,parent:servicesite});
        }
    });

    return servicesite;
}

const statics={
    signup:SignupScreen,
    checkout:CheckoutScreen,
    cart:CartScreen,
}
