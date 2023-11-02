import {sendRequest} from "resources";


export const sendSignupRequest=(data)=>sendRequest("/signup",{
    method:"POST",
    body:{userdata:data},
});
