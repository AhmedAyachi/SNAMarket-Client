import {setUser} from "actions";
import * as localdb from "localdb";


export const sendLoginRequest=(credentials)=>new Promise((resolve,reject)=>{
    if(isDevEnv){
        setTimeout(()=>{
            const {users}=localdb,{username}=credentials;
            const user=users.find(user=>user.username===username);
            const canLogin=user&&(user.password===credentials.password);
            canLogin?resolve(user):reject();
        },300);
    }
    else{
        
    }
}).
then(data=>new Promise(resolve=>{
    setUser(data,resolve);
}));
