import {View} from "vritra";
import css from "./SearchHeader.module.css";
import {ActionSetView,SearchField} from "components";


export default function SearchHeader(props){
    const {parent,placeholder,actions,onSearch}=props;
    const searchheader=View({parent,className:css.searchheader});

    searchheader.innateHTML=`
    `;
    SearchField({
        parent:searchheader,
        noicon:Boolean(actions),placeholder,
        onChange:onSearch,
    });
    actions&&ActionSetView({parent:searchheader,actions});

    return searchheader;
}
