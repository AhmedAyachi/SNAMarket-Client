import {useId,map,CherryMap} from "cherries";
import css from "./RadioField.module.css";
import {FieldView} from "components";


export default function RadioField(props){
    const {parent,id=useId("radiofield"),at,label,options,readonly,multiple=true,clearable=true,onChange}=props;
    const radiofield=FieldView({
        parent,id,at,label,
        className:`${css.radiofield} ${props.className||""}`
    }),state={
        checkmap:new CherryMap(),
    },{checkmap}=state;

    radiofield.beforeEndHTML=`
        <div class="${css.options}">
            ${map(options,({id,label})=>`
                <button id="${id}" class="${css.option}">${label||id||"--"}</button>
            `)}
        </div>
    `;

    const optionEls=radiofield.querySelectorAll(`.${css.option}`);
    optionEls.forEach(optionEl=>{
        const {id}=optionEl,option=options.find(option=>option.id===id);
        optionEl.onclick=({trigger=true})=>{
            const many=checkmap.size>1;
            const active=checkmap.has(option);
            if(active){
                if(clearable||(checkmap.size>1)){
                    checkmap.delete(option);
                    optionEl.removeAttribute("active");
                }
            }
            else{
                checkmap.set(option,optionEl);
                optionEl.setAttribute("active","");
            }
            if(trigger){
                if(!multiple){
                    const element=checkmap.at(0,true);
                    element&&(element!==optionEl)&&element.onclick({trigger:false});
                }
                if(clearable||(multiple?(many||(checkmap.size>1)):!active)){
                    (!readonly)&&onChange&&onChange(radiofield.getValue());
                }
            }
        }
    });


    radiofield.getValue=()=>structuredClone(multiple?[...checkmap.keys()]:checkmap.at(0));
    radiofield.hasDecentInput=()=>{
        let decent=options.length<2;
        if(!decent){
            decent=clearable||checkmap.size;
        }
        return Boolean(decent);
    }
    
    setSelected({radiofield,options,multiple,clearable});
    readonly&&optionEls.forEach(optionEl=>{optionEl.onclick=null});
    return radiofield;
}

const setSelected=({radiofield,options,multiple,clearable})=>{
    let selected=options.filter(({selected})=>selected);
    if((!multiple)&&(selected.length>1)){
        selected=[selected[0]];
    }
    if(!(clearable||selected.length)){
        selected=[options[0]];
    }
    selected.length&&selected.forEach(option=>{
        const element=radiofield.querySelector(`#${option.id}.${css.option}`);
        element&&element.onclick({trigger:true});
    });
}
