import {parseJSON} from "cherries";


export const store={
    langname:localStorage.getItem("langname")||"english",
    user:parseJSON(localStorage.getItem("user")),
};
