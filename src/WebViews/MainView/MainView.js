import {NativeView,fadeIn} from "vritra";
import css from "./MainView.module.css";
import {HistoryScreen,CompanyScreen,HomeScreen,LoginScreen} from "screens";
import {AlertView,HomeNavigator} from "components";
import {fetchLanguage} from "resources";
import * as H from "./Hooks";


export default async function MainView(props){
    const {parent,store}=props,{user}=store;
    const mainview=window.webview=NativeView({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
    `;

    await fetchLanguage();
    if(user){
        const userdata=await H.fetchCurrentUser(user.id);
        userdata?HomeNavigator({
            parent:mainview,
            initialId:"productcatalog",
            routes:statics.routes.map(route=>({
                ...route,
                component:({parent})=>route.component({parent,user:userdata}),
            })),
        }):AlertView({
            message:language.sessionexpired,
            actions:[{
                id:"confirm",
                label:language.confirm,
                onTrigger:()=>{location.reload()},
            }],
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