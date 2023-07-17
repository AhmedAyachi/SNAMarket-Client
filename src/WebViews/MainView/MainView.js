import {View} from "cherries";
import css from "./MainView.module.css";
import {LoginScreen} from "screens";


export default function MainView(props){
    const {parent}=props;
    const mainview=View({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
    `;
    LoginScreen({parent:mainview});
    
    return mainview;
}