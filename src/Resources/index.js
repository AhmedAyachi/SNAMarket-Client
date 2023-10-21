

export {default as Person} from "./Person";
export {default as User} from "./User";
export {default as ProductType} from "./ProductType";
export {default as Product} from "./Product";
export {default as Complaint} from "./Complaint";
export {default as LazyData} from "./LazyData";
export * from "./Order";
export * from "./Hooks/index";


export const getAdjustedTime=(time)=>{
    let formatted;
    switch(typeof(time)){
        case "string":
            const parts=time.split(":");
            parts.forEach((part,i)=>{
                const timepart=part.trim();
                parts[i]=timepart.length===1?`0${timepart}`:timepart;
            });
            formatted=parts.join(":");
        break;
        case "number":
            const date=new Date(time);
            formatted=getAdjustedTime(date.getHours()+":"+date.getMinutes());
            break;
        default:break;
    }
    return formatted||"";
}

const datelabels=["yesterday","today","tomorrow"];
export const getAdjustedDate=(value,labeled)=>{
    let label="";
    const isNumber=typeof(value)==="number";
    if(labeled){
        let time;
        if(isNumber){time=value}
        else{
            value=sanitize(value,"/-");
            const date=new Date(value.split(/-|\//g).reverse().join("/"));
            time=date.getTime();
        }
        const day=time-(time%86400000)+86400000;
        const now=Date.now(),today=now-(now%86400000);
        const center=datelabels.indexOf("today"),{length}=datelabels;
        let i=0;
        while((!label)&&(i<length)){
            if(day===(today+(i-center)*86400000)){
                label=datelabels[i];
            }
            i++;
        }
    }
    if(!label){
        let day,month,year;
        if(isNumber){
            const date=new Date(value);
            day=date.getDate();
            month=date.getMonth()+1;
            year=date.getFullYear();
        }
        else{
            const parts=value.split(/-|\//g).slice(0,3).map(str=>parseInt(str)||0);
            day=parts[0];month=parts[1];year=parts[2];
        }
        const isday=(0<day)&&(day<32),ismonth=(0<month)&&(month<13),isyear=year>0;
        label=`${isday?(day>9?day:`0${day}`):"01"}/${ismonth?(month>9?month:`0${month}`):"01"}/${isyear?year:"1"}`;
    }
    return label;
}
