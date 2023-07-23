import {User} from "resources";


export const setUser=(data,callback)=>{
    const user=new User(data);
    localStorage.setItem("user",JSON.stringify(user));
    WebView.setStore("user",user,()=>{
        callback&&callback(user);
    });
}
