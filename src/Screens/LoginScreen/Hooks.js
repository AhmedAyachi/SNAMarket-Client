import {sendRequest} from "resources";
import {setUser} from "actions";
import * as localdb from "localdb";


export const sendLoginRequest=(credentials)=>new Promise((resolve,reject)=>{
    if(isDevEnv){
        setTimeout(()=>{
            const {users}=localdb,{email}=credentials;
            const user=users.find(user=>user.email===email);
            const canLogin=user&&(user.password===credentials.password);
            canLogin?resolve({
                userId:user.id,
                sessionId:user.sessionId,
            }):reject({message:"user not found"});
        },300);
    }
    else{
        credentials.deviceId=cordova.platformId==="browser"?navigator.userAgent:(device.model+"_"+device.uuid);
        resolve(sendRequest("/login",{
            method:"POST",
            body:credentials,
        }));
    }
}).
then(data=>new Promise(resolve=>{
    data.id=data.userId;
    setUser(data,resolve);
}));
