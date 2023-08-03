import {View,FlatList} from "cherries";
import css from "./HomeScreen.module.css";
import {SupplierView,DropList,SearchField,LoadingView} from "components";
import {ProductType} from "resources";
import * as H from "./Hooks";


export default function HomeScreen(props){
    const {parent}=props;
    const homescreen=View({parent,className:css.homescreen});

    homescreen.innateHTML=`
        <header ref="header"></header>
        <main ref="mainEl"></main>
    `;
    SearchField({
        parent:homescreen.header,
        className:css.searchfield,
        placeholder:language.finditem,
    });
    
    const loadingview=LoadingView();
    H.fetchProductTypes().then(producttypes=>{
        DropList({
            parent:homescreen.header,
            labelHidden:true,
            iconColor:"white",
            options:producttypes?.map(type=>({
                id:type.id,
                //label:language[type.name],
                icon:ProductType.icon[type.id],
            })),
            onChange:({id})=>{
                const {suppliers}=producttypes.find(type=>type.id===id);
                FlatList({
                    parent:homescreen.mainEl,
                    containerClassName:css.listcontainer,
                    data:suppliers,
                    renderItem:({parent,item})=>SupplierView({parent,supplier:item}),
                });
            },
        });
        console.log(producttypes);
        loadingview.unmount();
    });

    return homescreen;
}
