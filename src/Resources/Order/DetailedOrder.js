import {} from "resources";
import Order from "./Order";
import OrderItem from "./OrderItem";


export default class DetailedOrder extends Order {
    constructor(props={}){
        Object.assign(this,{
            id:props.id,
            items:props.items?.map($=>new OrderItem($)),
            amount:props.amount,
        });
    }
}
