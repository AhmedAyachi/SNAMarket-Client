import {View} from "corella";
import css from "./FieldView.module.css";


export default function FieldView(props){
    const {parent,label}=props;
    const fieldview=View({
        ...props,parent,
        className:`${css.fieldview} ${props.className||""}`,
    });

    fieldview.innateHTML=`
        ${label?`
            <h3 
                class="${css.label}" 
                style="${styles.label(isHorizontal(fieldview))};${props.labelStyle||""}"
            >${label}</h3>
        `:""}
    `;

    return fieldview;
}

const styles={
    label:(horizontal)=>`
        ${horizontal?"":"margin-bottom:0.5em;"}
    `,
}

const isHorizontal=(fieldview)=>{
    const style=getComputedStyle(fieldview);
    const display=style.getPropertyValue("display");
    const flexDirection=style.getPropertyValue("flex-direction");
    return (display==="flex")&&((flexDirection==="row")||(flexDirection==="row-reverse"));
}
