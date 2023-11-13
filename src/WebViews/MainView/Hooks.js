import {User,sendRequest} from "resources";
import {setUser} from "actions";
import * as localdb from "localdb";


export const fetchCurrentUser=(userId)=>new Promise((resolve,reject)=>{
    if(userId===User.Guest.id){resolve(User.Guest)}
    else if(isDevEnv){
        WebView.useStore(({user:{id}})=>{
            const user=localdb.users.find(user=>user.id===id);
            if(user){resolve(user)}
            else{reject({expiredSession:true})}
        });
    }
    else{
        resolve(sendRequest("/graphql",{
            body:`{user{name}}`,
        }).then(({data})=>data.user));
    }
}).
then(async (data)=>{
    const user=await new Promise(resolve=>{setUser(data,resolve)});
    return user;
}).
catch(error=>{
    const {expiredSession}=error;
    if(expiredSession){setUser(null)};
    return Promise.reject(error);
});
