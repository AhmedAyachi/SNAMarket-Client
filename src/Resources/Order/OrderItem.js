

export default class OrderItem {
    constructor(props={}){
        Object.assign(this,{
            id:props.id,
            name:props.name,
            quantity:props.quantity,
            granularity:props.granularity,
        });
    }
}
