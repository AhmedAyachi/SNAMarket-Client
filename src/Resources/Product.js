

export default class Product {
    constructor(props={}){
        Object.assign(this,{
            id:props.id,
            name:props.name,
            image:props.image,
            price:props.price,
        });
    }
}
