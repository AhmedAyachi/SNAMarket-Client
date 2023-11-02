

export {default as sendRequest} from "./sendRequest";
export {default as fetchLanguage} from "./fetchLanguage";


export const getCookies=()=>({
    set:(key,value,options)=>{
        let specs="";
        if(options){
            for(const key in options){
                specs+=";"+key+"="+options[key];
            }
        }
        document.cookie=`${key}=${value}${specs};max-age=31536000;path=/`;//;samesite=strict
    },
    get:(key)=>{
        if(key){
            const cookie=document.cookie;
            const keyIndex=cookie.indexOf(key+"=");
            let value=null;
            if(keyIndex>-1){
                const semicolonIndex=cookie.indexOf(";",keyIndex);
                value=cookie.substring(keyIndex+key.length+1,semicolonIndex>-1?semicolonIndex:undefined);
            }
            return value;
        }
        else{
            const cookies={};
            document.cookie.split(";").forEach(cookie=>{
                const [key,value]=cookie.trimStart().split("=");
                cookies[key]=value;
            });
            return cookies;
        }
    },
    remove:function(key){
        document.cookie=`${key}=;max-age=0;path=/`;
    },
});
