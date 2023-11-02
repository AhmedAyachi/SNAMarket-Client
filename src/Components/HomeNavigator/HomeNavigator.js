import {DrawerNavigator} from "vritra";
import css from "./HomeNavigator.module.css";
import HomeHeader from "./HomeHeader/HomeHeader";


export default function HomeNavigator(props){
    const {parent,routes}=props;
    const homenavigator=DrawerNavigator({
        ...props,parent,
        className:`${css.homenavigator} ${props.className||""}`,
        tintColor:mainColor,
        renderHeader:HomeHeader,
        routes:routes.map(route=>{
            route.title=language[route.id];
            return route;
        }),
    });

    homenavigator.beforeEndHTML=`
    `;

    return homenavigator;
}
