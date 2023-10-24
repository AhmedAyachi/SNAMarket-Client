import {View, parseJSON} from "vritra";
import css from "./HomeHeader.module.css";
import {loop0,cog0} from "assets";


export default function HomeHeader(props){
    const {parent,defaultIcon,route}=props,{refreshable=true}=route;
    const homeheader=View({parent,tag:"header",className:css.homeheader});

    homeheader.innateHTML=`
        <div class="${css.col0}">
            <img ref="showbtn" class="button ${css.showbtn}" src="${defaultIcon(minorColor)}"/>
            <text class="${css.title}">${route.title}</text>
        </div>
        <div class="${css.col1}">
            ${refreshable?`<img ref="refreshbtn" src="${loop0(minorColor)}"/>`:""}
            <img ref="settingbtn" src="${cog0(minorColor)}"/>
        </div>
    `;

    homeheader.showbtn.onclick=()=>{parent.showDrawer()};
    homeheader.settingbtn.onclick=()=>{
        WebView.show({
            id:"bottomsheet",
            message:{contentId:"settings"},
            onClose:({message})=>{
                const data=message&&parseJSON(message);
                if(data){
                    const {langId}=data;
                    if(langId){
                        localStorage.setItem("langId",langId);
                        localStorage.removeItem("language");
                    }
                    if(langId||data.reload){location.reload()};
                }
            },
        });
    }

    const {refreshbtn}=homeheader;
    if(refreshbtn){
        refreshbtn.onclick=()=>{route.render()};
    }

    return homeheader;
}

