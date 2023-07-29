import {View} from "cherries";
import css from "./HomeScreen.module.css";
import {DropList,SearchField} from "components";
import {ProductType} from "resources";
import * as H from "./Hooks";


export default function HomeScreen(props){
    const {parent}=props;
    const homescreen=View({parent,className:css.homescreen});

    homescreen.innateHTML=`
        <div class="${css.header}" ref="header"></div>
    `;
    SearchField({
        parent:homescreen.header,
        className:css.searchfield,
        placeholder:language.finditem,
    });
    H.fetchProductTypes().then(producttypes=>{
        console.log(producttypes);
        DropList({
            parent:homescreen.header,
            labelHidden:true,
            iconColor:"white",
            options:producttypes?.map(type=>({
                id:type.id,
                //label:language[type.name],
                icon:ProductType.icon[type.id],
            })),
        });
    });

    return homescreen;
}
