import {User,sendRequest} from "resources";
import {setUser} from "actions";

export const sendLogoutRequest=()=>new Promise(async (resolve)=>{
    const {user}=await new Promise(WebView.useStore);
    if(isDevEnv||(user.id===User.Guest.id)){
        resolve();
    }
    else{
        resolve(sendRequest("/logout",{
            method:"POST",
        }));
    }
}).
then(()=>new Promise(resolve=>{setUser(null,resolve)}));
