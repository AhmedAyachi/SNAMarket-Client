import {ProductType,sendRequest} from "resources";
import * as localdb from "localdb";


export const fetchProductTypes=()=>new Promise(resolve=>{
    if(isDevEnv){
        setTimeout(()=>{
            resolve(localdb.producttypes);
        },300);
    }
    else{
        resolve(sendRequest("/producttypes"));
    }
}).
then(data=>data?.map($=>new ProductType($)));
