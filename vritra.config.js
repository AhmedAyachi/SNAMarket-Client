

module.exports=({env:{id}})=>({
    definitions:{
        "IP_ADDRESS":id==="dev"?"null":`"http://192.168.1.20:4000"`,
    },
    devServer:{
        client:{
            overlay:false,
        },
    },
});
