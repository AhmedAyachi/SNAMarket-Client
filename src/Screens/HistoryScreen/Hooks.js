import {Complaint,Order} from "resources";
import * as localdb from "localdb";


export const fetchComplaints=()=>new Promise(resolve=>{
    if(isDevEnv){
        setTimeout(()=>{resolve(localdb.complaints)},300);
    }
    else{
        resolve();
    }
}).
then(data=>data?.map($=>new Complaint($)));

export const fetchOrders=()=>new Promise(resolve=>{
    if(isDevEnv){
        setTimeout(()=>{resolve(localdb.orders)},300);
    }
    else{
        resolve();
    }
}).
then(data=>data?.map($=>new Order($)));
