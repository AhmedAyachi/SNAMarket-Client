import {Order,sendRequest} from "resources";
import {Query} from "graphqlutils";
import * as localdb from "localdb";


export const sendOrderRequest=(items)=>new Promise(async (resolve)=>{
    if(isDevEnv){
        setTimeout(()=>{resolve(localdb.orders[0])},1000);
    }
    else{
        resolve(sendRequest("/graphql",{body:`mutation {
            placeOrder(items:${Query.stringify(items)}){
                id,date,time,
            }
        }`}).
        then(({data})=>data.placeOrder));
    }
}).
then(data=>data&&new Order(data));
