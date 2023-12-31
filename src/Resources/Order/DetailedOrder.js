import {} from "resources";
import Order from "./Order";
import OrderItem from "./OrderItem";


export default class DetailedOrder extends Order {
    constructor(props={}){
        super(props);
        Object.assign(this,{
            items:props.items?.map($=>new OrderItem($)),
            //amount:props.amount,
        });
    }
}
