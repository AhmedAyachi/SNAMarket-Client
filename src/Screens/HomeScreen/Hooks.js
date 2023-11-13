import {Product,ProductType,sendRequest} from "resources";
import * as localdb from "localdb";
import {Query} from "qlboost";


export const fetchProducts=({query})=>new Promise(resolve=>{
    if(isDevEnv){
        query=query.trim().toLowerCase();
        const products=localdb.brands.flatMap(brand=>brand.products);
        resolve(products.filter(product=>["id","name","description"].some(key=>product[key]?.toLowerCase().includes(query))));
    }
    else{
        console.log("query",query);
        resolve(sendRequest("/graphql",{body:`{
            findProducts(query:${Query.stringify(query)}){
                id,name,description,granularities,type,
            }
        }`}).
        then(({data})=>data.findProducts));
    }
}).
then(data=>data?.map($=>new Product($)));

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
