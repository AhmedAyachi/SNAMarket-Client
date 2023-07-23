import {View,map} from "cherries";
import css from "./ListView.module.css";


export default function ListView(props){
    const {parent,options,onChange}=props;
    const listview=View({
        parent,tag:"ul",
        className:css.listview,
    });

    listview.beforeEndHTML=`
        ${map(options,()=>`
            <li>
                <text class="${css.label}">${label}</text>
                ${icon?`
                    <img 
                        class="${css.icon}" 
                        src="${typeof(icon)==="function"?icon():icon}"
                    />
                `:""}
            </li>
        `)}
    `;

    return listview;
}
