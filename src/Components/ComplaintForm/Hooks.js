import {Query} from "graphqlutils";
import {ComplaintSubject,sendRequest} from "resources";


export const sendComplaint=(input)=>new Promise(resolve=>{
    if(isDevEnv){

    }
    else{
        resolve(sendRequest("/graphql",{body:`mutation{
            fileComplaint(${Query.stringify(input).slice(1,-1)}){
                id,
            }
        }`}).then(({data})=>data.fileComplaint));
    }
});

export const fetchComplaintSubjects=()=>new Promise(resolve=>{
    if(isDevEnv){

    }
    else{
        resolve(sendRequest("/graphql",{body:`{
            complaintSubjects{id,name}
        }`}).
        then(({data})=>data.complaintSubjects));
    }
}).
then(data=>data?.map($=>new ComplaintSubject($)));
