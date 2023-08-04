import {Product} from "resources";
import * as localdb from "localdb";


export const fetchProducts=(supplier)=>new Promise(resolve=>{
    const {id}=supplier;
    if(isDevEnv){
        setTimeout(()=>{
            const {products}=localdb.suppliers.find(item=>item.id===id);
            resolve(products);
        },1000);
    }
    else{
        resolve([]);
    }
}).
then(data=>data&&data?.map($=>new Product($)));
