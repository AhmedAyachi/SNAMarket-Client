import {NativeView} from "corella";
import css from "./BottomSheet.module.css";
import {ProductOrderForm,HeaderView} from "components";
import {cross0} from "assets";


export default function BottomSheet(props){
    const {parent,data}=props;
    const bottomsheet=NativeView({parent,className:css.bottomsheet});

    bottomsheet.innateHTML=`
        <main class="${css.main}" ref="mainEl"></main>
    `;
    HeaderView({
        parent:bottomsheet,
        className:css.header,
        title:data.title,
        backIcon:cross0,
    });
    const component=statics[data.contentId];
    component&&component({...data,parent:bottomsheet.mainEl});

    return bottomsheet;
}

const statics={
    productorder:ProductOrderForm,
}
