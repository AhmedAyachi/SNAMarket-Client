import {FlatList} from "cherries";
import css from "./ListView.module.css";
import OptionView from "./OptionView/OptionView";


export default function ListView(props){
    const {parent,options,onChange}=props;
    const listview=FlatList({
        parent,data:options,
        className:css.listview,
        renderItem:({parent,item})=>OptionView({parent,option:item,onPick:onChange}),
    });

    listview.beforeEndHTML=`
    `;

    return listview;
}
