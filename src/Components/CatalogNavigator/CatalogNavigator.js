import {fadeIn,FlatList,TabNavigator} from "vritra";
import css from "./CatalogNavigator.module.css";
import {ProductView,BrandAcd} from "components";
import {ProductType} from "resources";


export default function CatalogNavigator(props){
    const {parent,producttypes,onCartChange}=props,state={
        productlist:null,
    };
    const catalognavigator=TabNavigator({
        parent,
        className:`${css.catalognavigator} ${props.className||""}`,
        headerClassName:css.header,
        tintColor:mainColor,
        tabs:producttypes?.map(type=>({
            id:type.id,
            //label:language[type.name],
            icon:ProductType.icon[type.id],
            renderContent:({parent})=>fadeIn(FlatList({
                parent,className:css.brandlist,
                containerClassName:css.brandcontainer,
                data:type.brands,
                renderItem:({parent,item})=>BrandAcd({
                    parent,onCartChange,
                    type:type.id,
                    brand:item,
                }),
            }),500),
        })),
    });

    catalognavigator.beforeEndHTML=`
    `;

    catalognavigator.showProducts=(products)=>{
        const {productlist}=state;
        productlist&&productlist.remove();
        state.productlist=Array.isArray(products)&&FlatList({
            parent:catalognavigator,
            className:css.productlist,
            data:products,
            renderItem:({parent,item})=>ProductView({parent,product:item,onCartChange}),
        });
    }

    return catalognavigator;
}
