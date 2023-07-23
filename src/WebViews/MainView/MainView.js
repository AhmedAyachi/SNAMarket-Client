import {View,DrawerNavigator} from "cherries";
import css from "./MainView.module.css";
import {HomeScreen,LoginScreen} from "screens";
import {LoadingView} from "components";


export default function MainView(props){
    const {parent,store}=props,{user}=store;
    const mainview=View({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
    `;

    if(user){
        const loadingview=LoadingView();
        DrawerNavigator({
            parent:mainview,
            headerClassName:css.header,
            tintColor:mainColor,
            routes:statics.routes.map(route=>{
                route.title=language[route.id];
                return route;
            }),
            initialId:"productcatalog",
        });
        setTimeout(loadingview.unmount,300);
    }
    else{
        LoginScreen({parent:mainview});
    }
    
    return mainview;
}

const statics={
    routes:[
        {id:"productcatalog",component:HomeScreen},
    ],
}