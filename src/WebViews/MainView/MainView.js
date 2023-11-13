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
    try{
        let {user}=store;
        if(user){
            user=await H.fetchCurrentUser(user.id);
            HomeNavigator({
                parent:mainview,
                initialId:"productcatalog",
                routes:statics.routes.filter(({loginRequired})=>!(loginRequired&&user.isGuest)).map(route=>({
                    ...route,
                    component:({parent})=>route.component({parent,user}),
                })),
            })
        }
        else{
            throw new Error();
        }
    }
    catch(error){
        new Promise(resolve=>{
            error?.message?AlertView({
                message:language.sessionexpired,
                onConfirm:resolve,
            }):resolve();
        }).
        then(()=>{
            fadeIn(LoginScreen({parent:mainview}),550);
        });
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