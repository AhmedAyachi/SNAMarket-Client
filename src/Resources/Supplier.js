

export default class Supplier {
    constructor(props={}){
        Object.assign(this,{
            id:props.id,
            name:props.name||props.id,
            logo:props.logo,
        });
    }
}
