import {sendRequest} from "resources";
import {Query} from "graphqlutils";
import * as localdb from "localdb";


export const sendCheckRequest=()=>new Promise(async (resolve)=>{
    if(isDevEnv){
        setTimeout(()=>{
            const order=localdb.orders[0];
            resolve(order.items);
        },500);
    }
    else{
        const {cart}=await new Promise(WebView.useStore);
        resolve(sendRequest("/graphql",{body:`{
            isValidCart(items:${Query.stringify(cart.items.map(item=>({
                ...item,product:undefined,
                ref:item.product.id,
            })))}){
                items{
                    ref,name,quantity,unit,granularity,
                }
            }
        }`}).then(({data})=>{
            const {items}=data.isValidCart;
            return items?Promise.resolve(items):Promise.reject({message:language.invalidcart});
        }));
    }
});
