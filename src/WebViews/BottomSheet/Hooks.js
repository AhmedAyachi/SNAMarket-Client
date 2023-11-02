import {DetailedOrder,sendRequest} from "resources";


export const fetchDetailedOrder=(orderId)=>new Promise(resolve=>{
    if(isDevEnv){

    }
    else{
        console.log("orderId",orderId);
        resolve(sendRequest("/graphql",{body:`{
            order(id:"${orderId}"){
                id,items{
                    ref,name,quantity,unit,granularity,
                }
            }
        }`}).
        then(({data})=>data.order));
    }
}).
then(data=>data&&new DetailedOrder(data));
