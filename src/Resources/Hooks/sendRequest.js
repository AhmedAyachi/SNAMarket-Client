

export default (endpoint,options)=>{
    const {headers,body}=options||{};
    const toGraphQL=endpoint==="/graphql";
    return send(IP_ADDRESS+endpoint,{
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


function send(url,options){return new Promise((resolve,reject)=>{
    //fetch("",{})
    const {method,headers,body,timeout=3000}=options;
    const request=new XMLHttpRequest();
    request.open(method,url);
    for(const key in headers){request.setRequestHeader(key,headers[key])};
    request.onreadystatechange=async ()=>{
        if(request.readyState===XMLHttpRequest.DONE){
            const response=new Response(request.responseText);
            resolve(response);
        }
    };
    request.timeout=timeout;
    request.ontimeout=()=>{reject({message:"request timeout",timeout:true})};
    request.send(typeof(body)==="string"?body:JSON.stringify(body));
})}
