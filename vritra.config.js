const webpack=require("webpack");


module.exports=({env:{id}})=>({
    definitions:{
        "IP_ADDRESS":id==="dev"?"null":`"http://192.168.1.21:4000"`,
    },
    plugins:[
	    new webpack.IgnorePlugin({
		    resourceRegExp:/^graphql$/,
		}),
	],
});
