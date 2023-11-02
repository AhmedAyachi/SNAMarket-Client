import {Product,sendRequest} from "resources";
import * as localdb from "localdb";


export const fetchProducts=(brand,type)=>new Promise(resolve=>{
    const {id}=brand;
    if(isDevEnv){
        setTimeout(()=>{
            const {products}=localdb.brands.find(item=>item.id===id);
            resolve(products);
        },1000);
    }
    else{
        resolve(sendRequest("/products",{
            method:"POST",
            body:{brandId:id,type},
        }));
    }
}).
then(data=>data&&data?.map($=>new Product($)));
