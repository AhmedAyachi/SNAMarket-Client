import {NativeView,fadeIn} from "corella";
import css from "./MainView.module.css";
import {HistoryScreen,CompanyScreen,HomeScreen,LoginScreen} from "screens";
import {HomeNavigator} from "components";


export default function MainView(props){
    const {parent,store}=props,{userId}=store;
    const mainview=NativeView({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
    `;

    if(userId){
        HomeNavigator({
            parent:mainview,
            initialId:"productcatalog",
            routes:statics.routes,
        });
    }
    else{
        fadeIn(LoginScreen({parent:mainview}),550);
    }
    
    return mainview;
}

const statics={
    routes:[
        {id:"productcatalog",component:HomeScreen},
        {id:"thecompany",component:CompanyScreen},
        {
            id:"orders",
            component:(props)=>HistoryScreen({...props,type:"order"}),
        },
        {
            id:"complaints",
            component:(props)=>HistoryScreen({...props,type:"complaint"}),
        },
    ],
}