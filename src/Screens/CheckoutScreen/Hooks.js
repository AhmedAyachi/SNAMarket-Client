import * as localdb from "localdb";


export const sendConfirmRequest=()=>new Promise(resolve=>{
    if(isDevEnv){
        setTimeout(()=>{resolve(Math.random()>0.5)},1000);
    }
    else{
        resolve();
    }
});

export const sendOrderRequest=()=>new Promise(async (resolve)=>{
    if(isDevEnv){
        setTimeout(()=>{
            const order=localdb.orders[0];
            delete order.id;
            delete order.amount;
            resolve(order);
        },500);
    }
    else{
        //const {cart}=await new Promise(WebView.useStore);
        resolve({});
    }
});
