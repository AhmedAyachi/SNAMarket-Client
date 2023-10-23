import {View} from "vritra";
import css from "./HomeScreen.module.css";
import {CatalogNavigator,SearchHeader,LoadingView,TextBadge} from "components";
import {User} from "resources";
import {cart0} from "assets";
import * as H from "./Hooks";


export default function HomeScreen(props){
    const {parent,user}=props;
    const homescreen=View({parent,tag:"main",className:css.homescreen}),state={
        cartEl:null,
        cartbadgeEl:null,
        navigator:null,
        loggedIn:user.id!==User.Guest.id,
    },{loggedIn}=state;

    homescreen.innateHTML=`
    `;
    SearchHeader({
        parent:homescreen,
        actions:loggedIn&&[{
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
        onSearch:(query)=>{
            const {navigator}=state;
            query?H.fetchProducts({query}).then(products=>{
                console.log(products);
                navigator.showProducts(products);
            }):navigator.showProducts();
        },
    });
    
    const loadingview=LoadingView();
    H.fetchProductTypes().then(producttypes=>{
        state.navigator=CatalogNavigator({
            parent:homescreen,
            className:css.navigator,
            producttypes,
            onCartChange:loggedIn&&((cart)=>{homescreen.updateCartBadge(cart.items?.length)}),
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
