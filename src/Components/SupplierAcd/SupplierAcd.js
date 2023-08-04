import {AccordionView} from "cherries";
import css from "./SupplierAcd.module.css";
import Header from "./Header/Header";
import ProductList from "./ProductList/ProductList"; 


export default function SupplierAcd(props){
    const {parent,supplier}=props;
    const supplieracd=AccordionView({
        parent,className:css.supplieracd,
        headerClassName:css.headercontainer,
        renderHeader:(parent)=>Header({parent,supplier}),
        renderContent:(parent)=>ProductList({parent,supplier}),
        separate:false,
        onOpen:()=>{
            const {header}=supplieracd;
            header.toggleIndicator(true);
        },
        onClose:()=>{
            const {header}=supplieracd;
            header.toggleIndicator(false);
        },
    });

    supplieracd.beforeEndHTML=`
    `;
    

    return supplieracd;
}
