

export const sendLogoutRequest=()=>new Promise(async (resolve)=>{
    const userId=localStorage.getItem("userId");
    if(userId!=="guest"){

    }
    resolve(userId);
}).
then(()=>{
    localStorage.removeItem("userId");
});
