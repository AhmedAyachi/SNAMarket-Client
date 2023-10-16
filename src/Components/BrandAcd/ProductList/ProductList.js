import {FlatList} from "vritra";
import css from "./ProductList.module.css";
import ItemView from "./ItemView/ItemView";
import {LoadingView} from "components";
import * as H from "./Hooks";


export default function ProductList(props){
    const {parent,brand,onCartChange}=props;
    const productlist=FlatList({
        parent,className:css.productlist,
        emptymessage:"",
        renderItem:({parent,item})=>ItemView({parent,product:item,onCartChange}),
    });

    productlist.beforeEndHTML=`
    `;
    const loadingview=LoadingView({parent:productlist,className:css.loadingview});
    H.fetchProducts(brand).then(products=>{
        productlist.addItems(products); 
    }).
    finally(()=>{
        setTimeout(()=>{
            productlist.style.height="fit-content";
            loadingview.unmount();
        },1000);
    });

    return productlist;
}
