import {Complaint,Order,LazyData,sendRequest} from "resources";
import * as localdb from "localdb";


export const fetchComplaints=(pageindex=0)=>new Promise(resolve=>{
    if(isDevEnv){
        setTimeout(()=>{resolve(localdb.complaints)},300);
    }
    else{
        resolve(sendRequest("/graphql",{body:`{
            complaints(pageindex:${pageindex}){
                pageindex,pagecount,
                items{id,date,time,subject,body}
            }
        }`}).
        then(({data})=>data.complaints));
    }
}).
then(data=>data&&new LazyData(data,Complaint));

export const fetchOrders=(pageindex=0)=>new Promise(resolve=>{
    if(isDevEnv){
        setTimeout(()=>{resolve(localdb.orders)},300);
    }
    else{
        resolve(sendRequest("/graphql",{body:`{
            orders(pageindex:${pageindex}){
                pageindex,pagecount,
                items{id,date,time,status}
            }
        }`}).
        then(({data})=>data.orders));
    }
}).
then(data=>data&&new LazyData(data,Order));
