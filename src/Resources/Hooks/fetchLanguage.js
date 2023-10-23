import {sendRequest} from "resources";
import {setLanguage} from "actions";
import * as localdb from "localdb";


export default (langId=localStorage.getItem("langId"))=>new Promise(async (resolve)=>{
    const {language}=await new Promise(WebView.useStore);
    if(language){resolve(language)}
    else{
        resolve(new Promise(resolve=>{
            if(isDevEnv){resolve(localdb.language)}
            else{
                resolve(sendRequest("/language",{
                    method:"POST",
                    body:{langId:langId||"fr"},
                }));
            }
        }).
        then(async (language)=>new Promise(resolve=>{
            setLanguage(language,resolve);
        })));
    }
});
