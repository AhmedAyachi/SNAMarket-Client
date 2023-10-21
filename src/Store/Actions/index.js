import {getCookies,User,Person} from "resources";


export const setLanguage=(language,callback)=>{
    localStorage.setItem("langId",language.$id);
    WebView.setStore("language",language,callback);
}

export const setUserProperty=(key,value,callback)=>{
    new Promise(resolve=>{
        if(key==="name"){
            WebView.useStore(({user})=>{
                Person.setName(user,value);
                WebView.setStore("user",user,resolve);
            });
        }
        else{
            WebView.setStore(`user.${key}`,value,resolve);
        }
    }).
    then(({user})=>{
        callback&&callback(user);
    });
}

export const setUser=(data,callback)=>{
    const cookies=getCookies();
    if(data){
        const userId=cookies.get("userId");
        if(userId){data.id=userId}
        else{cookies.set("userId",data.id)};
        const sessionId=cookies.get("sessionId");
        if(sessionId){data.sessionId=sessionId}
        else{cookies.set("sessionId",data.id)}
        WebView.setStore("user",new User(data),({user})=>{
            callback&&callback(user);
        });
    }
    else{
        cookies.remove("userId");
        cookies.remove("sessionId");
        WebView.setStore("user",undefined,()=>{
            callback&&callback();
        });
    }
}
