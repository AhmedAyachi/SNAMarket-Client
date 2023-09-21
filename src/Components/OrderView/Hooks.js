import * as localdb from "localdb";


export const fetchDetailedOrder=(order)=>new Promise(resolve=>{
    if(isDevEnv){
        const {id}=order,detailed=localdb.orders.find(order=>order.id===id);
        resolve(detailed);
        
    }
    else{
        resolve(order);
    }
});
