import {View,FlatList} from "vritra";
import css from "./HistoryScreen.module.css";
import {SearchHeader,ComplaintView,OrderView,Loader} from "components";
import {LazyData} from "resources";
import * as H from "./Hooks";
import {plus0} from "assets";



export default function HistoryScreen(props){
    const {parent,type}=props;
    const historyscreen=View({parent,tag:"main",className:css.historyscreen}),state={
        ...statics[type],
        data:new LazyData(),
    },{fetchData,component,data}=state;

    historyscreen.innateHTML=`
    `;
    SearchHeader({
        parent:historyscreen,
        placeholder:language["find"+type],
        actions:(type==="complaint")&&[
            {ref:"complain",icon:plus0},
        ],
        onSearch:(query)=>{
            query?fetchData({query}).then(orders=>{
                flatlist.showItems(orders||[]);
            }):flatlist.showItems();
        },
    });
    
    const flatlist=FlatList({
        parent:historyscreen,
        data:data.items,
        className:css.flatlist,
        containerClassName:css.container,
        renderItem:component,
        EmptyComponent:"",
        onReachEnd:({container})=>{
            const pageindex=data.pageindex+1;
            if(pageindex<data.pagecount){
                const loader=Loader({parent:container});
                fetchData({pageindex}).then(lazydata=>{
                    console.log(`${type} history:`,lazydata);
                    const {items}=lazydata;
                    data.pageindex=lazydata.pageindex;
                    data.pagecount=lazydata.pagecount;
                    data.items.push(...items);
                    flatlist.addItems(items);
                }).
                finally(()=>{loader.remove()});
            }
        },
    });

    return historyscreen;
}

const statics={
    complaint:{
        fetchData:H.fetchComplaints,
        component:({parent,item})=>ComplaintView({parent,complaint:item}),
    },
    order:{
        fetchData:H.fetchOrders,
        component:({parent,item})=>OrderView({parent,order:item}),
    },
}
