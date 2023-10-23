import {User,sendRequest} from "resources";
import {setUser} from "actions";
import * as localdb from "localdb";


export const fetchLangs=()=>new Promise(resolve=>{
    if(isDevEnv){resolve(localdb.langs)}
    else{
        resolve(sendRequest("/graphql",{body:`{langs{id,name}}`}).
        then(({data})=>data.langs));
    }
}).
then(data=>data?.map(item=>({id:item.id,name:item.name})));

export const sendLogoutRequest=()=>new Promise(async (resolve)=>{
    const {user}=await new Promise(WebView.useStore);
    if(isDevEnv||(user.id===User.Guest.id)){
        resolve();
    }
    else{
        resolve(sendRequest("/logout",{method:"POST"}));
    }
}).
then(()=>new Promise(resolve=>{setUser(null,resolve)}));
