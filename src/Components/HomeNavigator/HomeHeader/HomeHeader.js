import {View} from "corella";
import css from "./HomeHeader.module.css";
import {cog0} from "assets";


export default function HomeHeader(props){
    const {parent,defaultIcon,route}=props;
    const homeheader=View({parent,tag:"header",className:css.homeheader});

    homeheader.innateHTML=`
        <div class="${css.col0}">
            <img ref="showbtn" class="button ${css.showbtn}" src="${defaultIcon(minorColor)}"/>
            <text class="${css.title}">${route.title}</text>
        </div>
        <div class="${css.col1}">
            <img ref="settingbtn" class="${css.settingbtn}" src="${cog0(minorColor)}"/>
        </div>
    `;

    homeheader.showbtn.onclick=()=>{parent.showDrawer()};
    homeheader.settingbtn.onclick=()=>{
        
    }

    return homeheader;
}

