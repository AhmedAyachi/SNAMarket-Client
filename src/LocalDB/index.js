import {bedylogo0,barakalogo,brimalogo,dymalogo,sianalogo,snalogo} from "./Images";


export {default as language} from "./Language.json";

export const users=new Array(3).fill().map((_,i)=>({
    id:"user"+i,
    name:"user "+i,
    username:"user"+i,
    password:"1234",
    sessionId:"session"+i,
}));

export const producttypes=["ruminants","poultry","rabbit"].map(id=>({
    id,name:id,
    brands:null,
}));

export const brands=[
    {id:"dyma",logo:dymalogo},
    {id:"baraka",logo:barakalogo},
    {id:"brima",logo:brimalogo,},
    {id:"siana",logo:sianalogo},
    {id:"sna",logo:snalogo},
    {id:"bedy",logo:bedylogo0},
].map((brand,i)=>({
    ...brand,
    products:new Array(5).fill().map((_,j)=>({
        id:brand.id+"pd"+i+j,
        name:"product "+(i+1)+(j+1),
        type:producttypes[(i+j)%producttypes.length].id,
        kgprice:5+Math.floor(20*Math.random()),
        granularities:["0.22mm","0.33mm","0.5mm"],
    })),
}));

producttypes.forEach(producttype=>{
    const {id}=producttype;
    producttype.brands=brands.filter(({products})=>products.some(({type})=>type===id)).sort(()=>Math.random()-0.5);
});

const orderstatuses=["pending","shipped","cancelled"];
export const orders=new Array(5).fill().map((_,i)=>({
    id:"order"+i,
    date:"07/08/2023",
    time:"12:15",
    status:orderstatuses[i%orderstatuses.length],
}));

export const cart={
    items:brands.flatMap(({products})=>products.slice(0,2).map(({granularities,id,name,kgprice},i)=>({
        quantity:1+Math.floor(Math.random()*10),
        granularity:granularities[i%granularities.length],
        product:{id,name,kgprice},
    }))),
}
