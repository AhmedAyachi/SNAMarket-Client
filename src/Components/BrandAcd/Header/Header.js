import {View} from "cherries";
import css from "./Header.module.css";
import {chevron0} from "assets";


export default function Header(props){
    const {parent,brand}=props;
    const header=parent.parentNode.header=View({parent,className:css.header});

    header.innateHTML=`
        <div class="${css.col0}">
            <img class="${css.logo}" src="${brand.logo}"/>
            <!--<text class="${css.name}">${brand.name}</text>-->
        </div>
        <div class="${css.col1}">
            <img ref="indicator" class="${css.indicator}" src="${chevron0(textColor)}"/>
        </div>
    `;

    header.toggleIndicator=(open)=>{
        const {indicator}=header;
        indicator.style.rotate=(open?180:0)+"deg";
    }

    return header;
}
