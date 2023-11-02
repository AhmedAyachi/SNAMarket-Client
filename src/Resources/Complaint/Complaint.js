import {getAdjustedTime,getAdjustedDate} from "resources";
import {calendar0,packages0,truck0} from "assets";


export default class Complaint {
    constructor(props){
        const {date,time,subject}=props;
        Object.assign(this,{
            id:props.id,
            date:date&&getAdjustedDate(date),
            time:time&&getAdjustedTime(time),
            subjectId:props.subjectId||props.subject,
            body:props.body,
        });
    }

    static subjects=[
        {id:"product",icon:packages0},
        {id:"customerservice",icon:truck0},
        {id:"delivery",icon:calendar0},
    ]
}
