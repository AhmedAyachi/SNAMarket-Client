

export default class Order {
    constructor(props={}){
        const {status}=props;
        Object.assign(this,{
            id:props.id,
            date:props.id,
            time:props.time,
            status:status&&Order.statuses.find(({id})=>status===id)?.id,
        });
    }

    static statuses=[
        {id:"pending",color:"#1ABC9C"},
        {id:"shipped",color:"#389E0D"},
        {id:"cancelled",color:"#FF4660"},
    ];
}
