import {View} from "cherries";
import css from "./MainView.module.css";


export default function MainView(props){
    const {parent}=props;
    const mainview=View({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
        <p>app created with create-cordova-app command</p>
    `;
    
    return mainview;
}