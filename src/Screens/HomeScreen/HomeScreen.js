import {View,FlatList,TabNavigator, fadeIn} from "cherries";
import css from "./HomeScreen.module.css";
import {BrandAcd,SearchField,LoadingView} from "components";
import {ProductType} from "resources";
import * as H from "./Hooks";


export default function HomeScreen(props){
    const {parent}=props;
    const homescreen=View({parent,tag:"main",className:css.homescreen});

    homescreen.innateHTML=`
        <header ref="header"></header>
    `;
    SearchField({
        parent:homescreen.header,
        className:css.searchfield,
        placeholder:language.finditem,
    });
    
    const loadingview=LoadingView();
    H.fetchProductTypes().then(producttypes=>{
        TabNavigator({
            parent:homescreen,
            className:css.tabnavigaotr,
            headerClassName:css.tabnavheader,
            tintColor:mainColor,
            tabs:producttypes?.map(type=>({
                id:type.id,
                //label:language[type.name],
                icon:ProductType.icon[type.id],
                renderContent:({parent})=>{
                    const flatlist=FlatList({
                        parent,
                        className:css.flatlist,
                        containerClassName:css.listcontainer,
                        data:type.brands,
                        renderItem:({parent,item})=>BrandAcd({parent,brand:item}),
                    });
                    fadeIn(flatlist,500);
                    return flatlist;
                },
            })),
        });
        console.log(producttypes);
        loadingview.unmount();
    });

    return homescreen;
}
