import {barakalogo,brimalogo,dymalogo,sianalogo,snalogo} from "./Images";


export {default as language} from "./Language.json";

export const users=new Array(3).fill().map((_,i)=>({
    id:"user"+i,
    name:"user "+i,
    username:"user"+i,
    password:"1234",
    sessionId:"session"+i,
}));

export const suppliers=[
    {
        id:"dyma",
        logo:dymalogo,
    },
    {
        id:"baraka",
        logo:barakalogo,
    },
    {
        id:"brima",
        logo:brimalogo,
    },
    {
        id:"siana",
        logo:sianalogo,
    },
    {
        id:"sna",
        logo:snalogo,
    },
];

export const producttypes=[
    {
        id:"ruminants",
        name:"ruminants",
        suppliers:suppliers,
    },
    {
        id:"poultry",
        name:"poultry",
    },
    {
        id:"rabbit",
        name:"rabbit",
    },
];

