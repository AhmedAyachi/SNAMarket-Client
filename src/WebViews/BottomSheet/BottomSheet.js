import {NativeView} from "corella";
import css from "./BottomSheet.module.css";
import {OrderingScreen} from "screens";


export default function BottomSheet(props){
    const {parent,data}=props;
    const bottomsheet=NativeView({parent,className:css.bottomsheet});

    bottomsheet.innateHTML=`
    `;
    const component=statics[data.contentId];
    component&&component({...data,parent:bottomsheet});

    return bottomsheet;
}

const statics={
    ordering:OrderingScreen,
}
