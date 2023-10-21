

export default class OrderItem {
    constructor(props={}){
        Object.assign(this,{
            ref:props.ref,
            name:props.name,
            quantity:props.quantity,
            unit:props.unit,
            granularity:props.granularity,
        });
    }
}
