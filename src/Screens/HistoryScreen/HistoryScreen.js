import {View,FlatList} from "corella";
import css from "./HistoryScreen.module.css";
import {OrderView,LoadingView} from "components";
import * as H from "./Hooks";


export default function HistoryScreen(props){
    const {parent,type}=props;
    const historyscreen=View({parent,tag:"main",className:css.historyscreen}),state={
        ...statics[type],
    },{fetchData,component}=state;

    historyscreen.innateHTML=`
    `;

    const loadingview=LoadingView();
    fetchData().then(data=>{
        console.log(`${type} history:`,data);
        FlatList({
            parent:historyscreen,data,
            className:css.flatlist,
            containerClassName:css.container,
            renderItem:component,
        });
    }).
    finally(loadingview.unmount);

    return historyscreen;
}

const statics={
    order:{
        fetchData:H.fetchOrders,
        component:({parent,item})=>OrderView({parent,order:item}),
    },
}
