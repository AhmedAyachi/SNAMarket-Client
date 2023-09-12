import {View, parseJSON} from "corella";
import css from "./ServiceSite.module.css";
import {CartScreen,OrderingScreen} from "screens";


export default function ServiceSite(props){
    const {parent}=props;
    const servicesite=View({parent,id:"webview",className:css.servicesite});

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
    cart:CartScreen,
    ordering:OrderingScreen,
}
