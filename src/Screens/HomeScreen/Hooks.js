import {ProductType} from "resources";
import * as localdb from "localdb";


export const fetchProductTypes=()=>new Promise(resolve=>{
    if(isDevEnv){
        setTimeout(()=>{
            resolve(localdb.producttypes);
        },300);
    }
    else{
        resolve([]);
    }
}).
then(data=>data?.map($=>new ProductType($)));
