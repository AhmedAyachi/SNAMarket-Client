import {View} from "corella";
import css from "./TextBadge.module.css";


export default function TextBadge(props){
    const {parent,text}=props;
    const textbadge=View({
        parent,at:props.at,
        className:`${css.textbadge} ${props.className||""}`,
        style:`${styles.textbadge(text)};${props.style||""}`,
    });

    textbadge.innateHTML=`
        <text as="span" class="${css.text}">${text||""}</text>
    `;

    return textbadge;
}

const styles={
    textbadge:(text)=>{
        const diameter=1+0.5*(String(text).length);
        return `
            width:${diameter}em;
            height:${diameter}em;
        `
    },
}
