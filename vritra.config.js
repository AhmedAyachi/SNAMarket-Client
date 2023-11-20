

module.exports=({env:{id}})=>({
    definitions:{
        "IP_ADDRESS":id==="dev"?"null":`"http://192.168.1.21:4000"`,
    },
    ignore:["graphql"],
});
