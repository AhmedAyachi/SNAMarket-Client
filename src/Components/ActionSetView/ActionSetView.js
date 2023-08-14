import {ActionSetView as Cherry} from "cherries";
import css from "./ActionSetView.module.css";


export default function ActionSetView(props){
    const {}=props;
    const actionsetview=Cherry({
        ...props,className:css.actionsetview,
        color:minorColor,
    });

    actionsetview.beforeEndHTML=`
    `;

    return actionsetview;
}
