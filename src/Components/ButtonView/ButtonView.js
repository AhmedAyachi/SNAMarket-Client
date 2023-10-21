import {View} from "vritra";
import css from "./ButtonView.module.css";
import {LoadingView} from "components";


export default function ButtonView(props){
    const {parent,styleId,label,sublabel,icon,onClick}=props;
    const buttonview=View({
        parent,at:props.at,tag:"button",
        style:`${styles.buttonview(styleId,sublabel)};${props.style||""}`,
        className:`${css.buttonview} ${props.className||""}`,
    }),state={
        loadingview:null,
    };
    
    buttonview.innateHTML=`
        ${icon?`
            <img 
                class="${css.icon}" 
                style="${styles.icon(styleId)}"
                src="${typeof(icon)==="function"?icon(styleId?mainColor:"white"):icon}"
            />
        `:""}
        <label style="${styles.label(styleId)}">${label||""}</label>
        ${sublabel?`
            <label ref="sublabelEl" style="${styles.sublabel(styleId)}">${sublabel||""}</label>
        `:""}
    `;

    buttonview.onclick=onClick;

    buttonview.setSublabel=(value)=>{
        const {sublabelEl}=buttonview;
        if(sublabelEl){sublabelEl.innerText=value}; 
    }

    buttonview.load=(value=!state.loadingview,color=backgroundColor)=>{
        const {loadingview}=state;
        loadingview&&loadingview.unmount();
        state.loadingview=value&&LoadingView({
            parent:buttonview,color,
            style:{backgroundColor:"inherit"},
        });
    }

    return buttonview;
}

const styles={
    buttonview:(styleId,sublabel)=>`
        justify-content:${sublabel?"space-between":"center"};
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
    sublabel:(styleId)=>`
        color:rgba(${styleId?"0,0,0":"255,255,255"},0.65);
    `,
}
