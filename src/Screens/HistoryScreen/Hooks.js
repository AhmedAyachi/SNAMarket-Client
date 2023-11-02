import {Complaint,Order,LazyData,sendRequest} from "resources";
import * as localdb from "localdb";


export const fetchComplaints=(options)=>{
    const {pageindex=0,query}=options;
    const properties="id,date,time,subject,body";
    return new Promise(resolve=>{
        if(isDevEnv){
            setTimeout(()=>{resolve(localdb.complaints)},300);
        }
        else{
            resolve(sendRequest("/graphql",{body:`{
                ${query?`
                    findComplaint(query:"${query}"){${properties}}
                `:`
                    complaints(pageindex:${pageindex}){
                        pageindex,pagecount,
                        items{${properties}}
                    }
                `}
            }`}).
            then(({data})=>data.complaints||data.findComplaint));
        }
    }).
    then(data=>data&&(query?data.map($=>new Complaint($)):new LazyData(data,Complaint)));
}

export const fetchOrders=(options)=>{
    const {pageindex=0,query}=options||{};
    const properties="id,date,time,status";
    return new Promise(resolve=>{
        if(isDevEnv){
            setTimeout(()=>{resolve(localdb.orders)},300);
        }
        else{
            resolve(sendRequest("/graphql",{body:`{
                ${query?`
                    findOrder(query:"${query}"){${properties}}
                `:`
                    orders(pageindex:${pageindex}){
                        pageindex,pagecount,
                        items{${properties}}
                    }
                `}
            }`}).
            then(({data})=>data.orders||data.findOrder));
        }
    }).
    then(data=>data&&(query?data.map($=>new Order($)):new LazyData(data,Order)));
}
