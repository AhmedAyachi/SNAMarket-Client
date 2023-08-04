import {AccordionView} from "cherries";
import css from "./SupplierView.module.css";
import Header from "./Header/Header";
import ProductList from "./ProductList/ProductList"; 


export default function SupplierView(props){
    const {parent,supplier}=props;
    const supplierview=AccordionView({
        parent,className:css.supplierview,
        renderHeader:(parent)=>Header({parent,supplier}),
        renderContent:(parent)=>ProductList({parent,supplier}),
        onOpen:()=>{
            const {header}=supplierview;
            header.toggleIndicator(true);
        },
        onClose:()=>{
            const {header}=supplierview;
            header.toggleIndicator(false);
        },
    });

    supplierview.beforeEndHTML=`
    `;
    

    return supplierview;
}
