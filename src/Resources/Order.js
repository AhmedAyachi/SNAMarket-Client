

export default class Order {
    constructor(props={}){
        Object.assign(this,{
            id:props.id,
            date:props.id,
            time:props.time,
            status:props.status,
        });
    }

    static statusColor={
        pending:"#1ABC9C",
        shipped:"#389E0D",
        cancelled:"#FF4660",
        undefined:"#D5D4D8",
    };
}
