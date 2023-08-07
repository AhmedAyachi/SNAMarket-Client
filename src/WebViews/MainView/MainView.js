import {View,DrawerNavigator,fadeIn} from "cherries";
import css from "./MainView.module.css";
import {CompanyScreen,HomeScreen,LoginScreen} from "screens";


export default function MainView(props){
    const {parent,store}=props,{user}=store;
    const mainview=View({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
    `;

    if(user){
        DrawerNavigator({
            parent:mainview,
            headerClassName:css.header,
            tintColor:mainColor,
            initialId:"orders",
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
        {id:"news"},
        {id:"events"},
        {id:"recipes"},
        {id:"thecompany",component:CompanyScreen},
        {id:"commitment"},
        {id:"orders"},
    ],
}