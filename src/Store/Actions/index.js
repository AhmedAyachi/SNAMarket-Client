import {User} from "resources";


export const setUser=(data,callback)=>{
    const user=new User(data);
    localStorage.setItem("userId",user.id);
    WebView.setStore("user",user,()=>{
        callback&&callback(user);
    });
}
