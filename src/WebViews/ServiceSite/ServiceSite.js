import {NativeView,parseJSON} from "corella";
import css from "./ServiceSite.module.css";
import {CheckoutScreen,CartScreen} from "screens";


export default function ServiceSite(props){
    const {parent}=props;
    const servicesite=NativeView({parent,id:"webview",className:css.servicesite});

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
    checkout:CheckoutScreen,
    cart:CartScreen,
}
