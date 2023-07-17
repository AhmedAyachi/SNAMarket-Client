import {useId,View} from "cherries";
import css from "./ButtonView.module.css";


export default function ButtonView(props){
    const {parent,id=useId("buttonview"),styleId,label,icon,onClick}=props;
    const buttonview=View({
        parent,id,
        style:`${styles.buttonview(styleId)};${props.style||""}`,
        className:`button ${css.buttonview} ${props.className||""}`
    });
    
    buttonview.innateHTML=`
        ${icon?`
            <img 
                class="${css.icon}" 
                style="${styles.icon(styleId)}"
                src="${typeof(icon)==="function"?icon(styleId?mainColor:"white"):icon}"
            />
        `:""}
        <label style="${styles.label(styleId)}">${label||""}</label>
    `;

    buttonview.onclick=onClick;

    return buttonview;
}

const styles={
    buttonview:(styleId)=>`
        background-color:${styleId?"white":mainColor};
        ${styleId?`
            border:1px solid ${mainColor};
        `:""}
    `,
    icon:(styleId)=>`
        width:${styleId?4.8:6.4}em;
    `,
    label:(styleId)=>`
        color:${styleId?mainColor:"white"};
    `,
    
}
