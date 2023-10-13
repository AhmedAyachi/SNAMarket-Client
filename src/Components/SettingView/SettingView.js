import {View} from "corella";
import css from "./SettingView.module.css";
import GeneralSection from "./GeneralSection/GeneralSection";


export default function SettingView(props){
    const {parent}=props;
    const settingview=View({parent,className:`${css.settingview} ${props.className||""}`});

    settingview.beforeEndHTML=`
    `;
    GeneralSection({parent:settingview});

    return settingview;
}
