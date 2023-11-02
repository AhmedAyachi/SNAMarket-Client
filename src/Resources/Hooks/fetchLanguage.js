import {setLanguage,sendRequest} from "resources";
import * as localdb from "localdb";


export default (langId=localStorage.getItem("langId"))=>new Promise(async (resolve)=>{
    if(isDevEnv){resolve(localdb.language)}
    else{
        resolve(sendRequest("/language",{
            method:"POST",
            body:{langId},
        }));
    }
}).
then(setLanguage);
