import * as localdb from "localdb";


export const sendConfirmRequest=()=>new Promise(resolve=>{
    if(isDevEnv){
        setTimeout(resolve,300);
    }
    else{
        resolve();
    }
});

export const sendOrderRequest=()=>new Promise(async (resolve)=>{
    if(isDevEnv){
        setTimeout(()=>{
            resolve(localdb.orders[0]);
        },500);
    }
    else{
        //const {cart}=await new Promise(WebView.useStore);
        resolve({});
    }
});
