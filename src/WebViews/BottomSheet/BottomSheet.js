import {NativeView} from "vritra";
import css from "./BottomSheet.module.css";
import {SettingView,ProductOrderForm,HeaderView} from "components";
import {cross0} from "assets";


export default function BottomSheet(props){
    const {parent,data}=props,{contentId}=data;
    const bottomsheet=NativeView({parent,className:css.bottomsheet});

    bottomsheet.innateHTML=`
        <main class="${css.main}" ref="mainEl"></main>
    `;
    
    HeaderView({
        parent:bottomsheet,
        className:css.header,
        title:data.title||language[contentId],
        backIcon:cross0,
    });
    const component=statics[contentId];
    component&&component({...data,parent:bottomsheet.mainEl});

    return bottomsheet;
}

const statics={
    settings:SettingView,
    productorder:ProductOrderForm,
}
