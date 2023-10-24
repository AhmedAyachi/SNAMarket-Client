

export default class Brand {
    constructor(props={}){
        Object.assign(this,{
            id:props.id,
            name:props.name||props.id,
            logo:IP_ADDRESS+"/public/"+props.logo,
        });
    }
}
