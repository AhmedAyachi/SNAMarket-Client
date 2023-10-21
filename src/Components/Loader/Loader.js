import {Fragment} from "vritra";
import css from "./Loader.module.css";
import {loading0} from "assets";


export default function Loader(props){
    const {parent,color}=props;
    const loader=Fragment({parent,className:`${css.loader} ${props.className||""}`});

    loader.innateHTML=`
        <img 
            class="${css.icon}" 
            style="${parent.clientWidth>parent.clientHeight?"height":"width"}:40%"
            src="${loading0(color)}"
        />
    `;

    return loader;
}
