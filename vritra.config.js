

module.exports=({env:{id}})=>({
    definitions:{
        "IP_ADDRESS":id==="dev"?"null":`"http://app-server:4000"`,
    },
    ignore:["graphql"],
});
