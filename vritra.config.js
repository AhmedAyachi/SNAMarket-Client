

module.exports=({env:{id}})=>({
    definitions:{
        "IP_ADDRESS":id==="dev"?"null":`"http${id==="prod"?"s":""}://192.168.1.20:4000"`,
    },
});
