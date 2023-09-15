import {parseJSON} from "corella";
import * as localdb from "localdb";


export const store={
    langname:localStorage.getItem("langname")||"english",
    userId:localStorage.getItem("userId"),
    cart:isProdEnv?{items:[]}:localdb.cart,
};
