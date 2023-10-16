import {parseJSON} from "vritra";
import * as localdb from "localdb";


export const store={
    langId:localStorage.getItem("langId")||"english",
    userId:localStorage.getItem("userId"),
    cart:isProdEnv?{items:[]}:localdb.cart,
};
