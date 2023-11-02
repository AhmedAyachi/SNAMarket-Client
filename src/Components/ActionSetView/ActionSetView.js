import {ActionSetView as NativeComponent} from "vritra";
import css from "./ActionSetView.module.css";
import {speechballoon0} from "assets";


export default function ActionSetView(props){
    const {color=minorColor}=props;
    const actionsetview=NativeComponent({
        ...props,color,
        className:`${css.actionsetview} ${props.className||""}`,
        definitions:statics.actions,
    });

    actionsetview.beforeEndHTML=`
    `;

    return actionsetview;
}

const statics={
    actions:[
        {
            id:"complain",
            icon:speechballoon0,
            orderId:null,
            onTrigger:({orderId})=>{
                WebView.show({
                    id:"formsite",
                    message:{type:"complaint",orderId},
                });
            },
        }
    ],
}
