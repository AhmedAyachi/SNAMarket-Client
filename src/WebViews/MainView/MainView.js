import {NativeView,fadeIn} from "vritra";
import css from "./MainView.module.css";
import {HistoryScreen,CompanyScreen,HomeScreen,LoginScreen} from "screens";
import {AlertView,HomeNavigator} from "components";
import {getCookies,fetchLanguage} from "resources";
import * as H from "./Hooks";


export default async function MainView(props){
    const {parent,store}=props;
    const mainview=window.webview=NativeView({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
    `;

    await fetchLanguage();
    if(store.user){
        const user=await H.fetchCurrentUser(store.user.id);
        user?HomeNavigator({
            parent:mainview,
            initialId:"productcatalog",
            routes:statics.routes.filter(({loginRequired})=>!(loginRequired&&user.isGuest)).map(route=>({
                ...route,
                component:({parent})=>route.component({parent,user}),
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
        {
            id:"productcatalog",
            component:HomeScreen,
            refreshable:false,
        },
        {
            id:"thecompany",
            component:CompanyScreen,
            refreshable:false,
        },
        {
            id:"orders",
            component:(props)=>HistoryScreen({...props,type:"order"}),
            loginRequired:true,
        },
        {
            id:"complaints",
            component:(props)=>HistoryScreen({...props,type:"complaint"}),
            loginRequired:true,
        },
    ],
}