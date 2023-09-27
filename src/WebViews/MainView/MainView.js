import {NativeView,DrawerNavigator,fadeIn} from "corella";
import css from "./MainView.module.css";
import {HistoryScreen,CompanyScreen,HomeScreen,LoginScreen} from "screens";


export default function MainView(props){
    const {parent,store}=props,{userId}=store;
    const mainview=NativeView({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
    `;

    if(userId){
        DrawerNavigator({
            parent:mainview,
            headerClassName:css.header,
            tintColor:mainColor,
            initialId:"productcatalog",
            routes:statics.routes.map(route=>{
                route.title=language[route.id];
                return route;
            }),
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