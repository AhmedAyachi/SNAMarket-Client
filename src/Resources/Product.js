

export default class Product {
    constructor(props={}){
        Object.assign(this,{
            id:props.id,
            name:props.name,
            image:props.image,
            description:props.description,
            granularities:props.granularities,
        });
    }
}
