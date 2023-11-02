import {AccordionView} from "vritra";
import css from "./BrandAcd.module.css";
import Header from "./Header/Header";
import ProductList from "./ProductList/ProductList"; 


export default function BrandAcd(props){
    const {parent,brand,type,onCartChange}=props;
    const brandacd=AccordionView({
        parent,className:css.brandacd,
        headerClassName:css.headercontainer,
        renderHeader:({parent})=>Header({parent,brand}),
        renderContent:({parent})=>ProductList({parent,brand,type,onCartChange}),
        separate:false,
        onOpen:()=>{
            const {header}=brandacd;
            header.toggleIndicator(true);
        },
        onClose:()=>{
            const {header}=brandacd;
            header.toggleIndicator(false);
        },
    });

    brandacd.beforeEndHTML=`
    `;
    

    return brandacd;
}
