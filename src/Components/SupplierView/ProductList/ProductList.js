import {FlatList} from "cherries";
import css from "./ProductList.module.css";
import ItemView from "./ItemView/ItemView";
import {LoadingView} from "components";
import * as H from "./Hooks";


export default function ProductList(props){
    const {parent,supplier}=props;
    const productlist=FlatList({
        parent,className:css.productlist,
        emptymessage:"",
        renderItem:({parent,item})=>ItemView({parent,product:item}),
    });

    productlist.beforeEndHTML=`
    `;
    const loadingview=LoadingView({parent:productlist});
    H.fetchProducts(supplier).then(products=>{
        productlist.addItems(products);
        loadingview.unmount();
    });

    return productlist;
}
