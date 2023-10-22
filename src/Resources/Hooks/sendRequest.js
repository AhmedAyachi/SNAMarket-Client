import {sendRequest} from "cordova-vritra";


export default (endpoint,options)=>{
    const {headers,body}=options||{};
    const toGraphQL=endpoint==="/graphql";
    return sendRequest(IP_ADDRESS+endpoint,{
        method:toGraphQL?"POST":(options?.method||"GET"),
        timeout:isProdEnv?3000:10000,
        headers:{
            ...headers,
            "Content-Type":"application/json",
        },
        body:toGraphQL?JSON.stringify({query:body}):body,
    }).
    then(response=>response.json()).
    then(data=>{
        if(data&&data.errors) return Promise.reject({...data.errors[0],serverside:true});
        else return data;
    }).
    catch(error=>{
        if(cordova.platformId==="browser"){console.error(error)}
        else if(isTestEnv){alert("Error:"+JSON.stringify(error))}
        else if(isProdEnv){Notifier.toast({text:language.requestfailed})};
        return Promise.reject(error);
    });
};
