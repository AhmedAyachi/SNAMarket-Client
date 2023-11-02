import {} from "vritra";
import {getCookies} from "resources";
import * as localdb from "localdb";


const userId=getCookies().get("userId");
export const store={
    user:userId&&{id:userId},
    cart:isDevEnv?localdb.cart:{items:[]},
};
