import {View,FlatList,TabNavigator,fadeIn} from "vritra";
import css from "./HomeScreen.module.css";
import {ActionSetView,BrandAcd,SearchField,LoadingView,TextBadge} from "components";
import {ProductType,User} from "resources";
import {cart0} from "assets";
import * as H from "./Hooks";


export default function HomeScreen(props){
    const {parent,user}=props;
    const homescreen=View({parent,tag:"main",className:css.homescreen}),state={
        cartEl:null,
        cartbadgeEl:null,
        loggedIn:user.id!==User.Guest.id,
    },{loggedIn}=state;

    homescreen.innateHTML=`
        <header ref="header"></header>
    `;
    SearchField({
        parent:homescreen.header,
        className:css.searchfield,
        placeholder:language.finditem,
        noicon:true,
    });
    loggedIn&&ActionSetView({
        parent:homescreen.header,
        actions:[{
            id:"cart",icon:cart0,
            onReady:({element})=>{state.cartEl=element},
            onTrigger:()=>{
                state.cartbadgeEl?WebView.show({
                    id:"servicesite",
                    message:{name:"cart"},
                    onClose:({store})=>{
                        const {cart}=store;
                        homescreen.updateCartBadge(cart.items?.length);
                    },
                }):Notifier.toast({text:language.emptycart});
            },
        }],
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
                        renderItem:({parent,item})=>BrandAcd({
                            parent,brand:item,
                            type:type.id,
                            onCartChange:loggedIn&&((cart)=>{homescreen.updateCartBadge(cart.items?.length)}),
                        }),
                    });
                    fadeIn(flatlist,500);
                    return flatlist;
                },
            })),
        });
        console.log(producttypes);
        loadingview.unmount();
    });
    WebView.useStore(({cart})=>{
        homescreen.updateCartBadge(cart.items?.length);
    });

    homescreen.updateCartBadge=(number)=>{
        const {cartbadgeEl}=state;
        cartbadgeEl&&cartbadgeEl.remove();
        state.cartbadgeEl=number&&TextBadge({
            parent:state.cartEl,
            className:css.cartbadge,
            text:number,
        });
    }

    return homescreen;
}
