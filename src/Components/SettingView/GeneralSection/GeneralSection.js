import {} from "corella";
import css from "./GeneralSection.module.css";
import SectionView from "../SectionView/SectionView";
import {exit0} from "assets";
import * as H from "./Hooks";


export default function GeneralSection(props){
    const {parent}=props;
    const generalsection=SectionView({
        parent,title:language.general,
        className:css.generalsection,
        fields:[
            {
                label:language.language,
                type:"select",
                value:"english",
                options:["english","french","arabic"].map(id=>({id,label:id})),
                onPick:(option)=>{
                    console.log(option);
                },
            },
            {
                label:language.logout,
                icon:exit0(majorColor),
                onClick:()=>{
                    H.sendLogoutRequest().then(()=>{
                        WebView.close({reload:true});
                    });
                },
            },
        ],
    });

    generalsection.beforeEndHTML=`
    `;

    return generalsection;
}
