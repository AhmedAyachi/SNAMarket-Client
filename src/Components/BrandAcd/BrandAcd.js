import {AccordionView} from "corella";
import css from "./BrandAcd.module.css";
import Header from "./Header/Header";
import ProductList from "./ProductList/ProductList"; 


export default function BrandAcd(props){
    const {parent,brand,onCartChange}=props;
    const brandacd=AccordionView({
        parent,className:css.brandacd,
        headerClassName:css.headercontainer,
        renderHeader:(parent)=>Header({parent,brand}),
        renderContent:(parent)=>ProductList({parent,brand,onCartChange}),
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
