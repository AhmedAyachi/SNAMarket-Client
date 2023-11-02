import {} from "vritra";
import css from "./GeneralSection.module.css";
import SectionView from "../SectionView/SectionView";
import {LoadingView} from "components";
import {exit0} from "assets";
import * as H from "./Hooks";


export default function GeneralSection(props){
    const {parent}=props,state={langId:localStorage.getItem("langId")};
    const generalsection=SectionView({
        parent,title:language.general,
        className:css.generalsection,
        fields:[
            {
                label:language.language,
                type:"select",
                value:state.langId,
                options:()=>H.fetchLangs().then(langs=>langs.map(({id,name})=>({
                    id,label:id+" - "+name,
                }))),
                onPick:({option})=>{
                    const {id}=option;
                    if(state.langId!==id){
                        WebView.close({reload:true,langId:id});
                    }
                },
            },
            {
                label:language.logout,
                icon:exit0(majorColor),
                onClick:(element)=>{
                    const loadingview=LoadingView({parent:element});
                    H.sendLogoutRequest().then(()=>{
                        WebView.close({reload:true});
                    }).
                    catch(loadingview.unmount);
                },
            },
        ],
    });

    generalsection.beforeEndHTML=`
    `;

    return generalsection;
}
