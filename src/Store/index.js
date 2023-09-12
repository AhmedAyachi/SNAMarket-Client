import {parseJSON} from "corella";


export const store={
    langname:localStorage.getItem("langname")||"english",
    userId:localStorage.getItem("userId"),
    cart:{items:[]},
};
