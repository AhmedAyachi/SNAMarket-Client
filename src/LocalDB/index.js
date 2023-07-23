

export {default as language} from "./Language.json";

export const users=new Array(3).fill().map((_,i)=>({
    id:"user"+i,
    name:"user "+i,
    username:"user"+i,
    password:"1234",
    sessionId:"session"+i,
}));

export const producttypes=[
    {
        id:"ruminants",
        name:"ruminants",
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
