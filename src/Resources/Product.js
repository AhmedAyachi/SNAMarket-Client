

export default class Product {
    constructor(props={}){
        Object.assign(this,{
            id:props.id,
            name:props.name,
            type:props.type,
            description:props.description,
            granularities:props.granularities,
        });
    }
}
