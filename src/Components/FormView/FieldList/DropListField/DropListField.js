import {FlatList,AccordionView,useId, isEmail} from "vritra";
import css from "./DropListField.module.css";
import FieldHeader from "./FieldHeader/FieldHeader";
import ItemView from "./ItemView/ItemView";
import {LoadingView} from "components";


export default function DropListField(props){
    const {parent,label,value,items,multiple,onChange}=props,state={
        headerEl:null,
    };
    const droplistfield=AccordionView({
        id:useId("droplistfield"),
        parent,className:css.droplistfield,
        containerClassName:css.container,
        renderHeader:({parent})=>{
            //const item=items.find(item=>item.id===value);
            const headerEl=state.headerEl=FieldHeader({parent,label,multiple,onChange});
            value&&headerEl.setSelection([value]);
            return headerEl;
        },
        renderContent:({parent})=>{
            if(typeof(items)==="function"){
                const loadingview=LoadingView({parent,style:{backgroundColor:"transparent"}});
                new Promise(resolve=>{resolve(items())}).
                then(data=>{flatlist.addItems(data)}).
                finally(loadingview.unmount);
            }
            const flatlist=FlatList({
                parent,data:items,
                containerClassName:css.itemcontainer,
                renderItem:(props)=>ItemView({
                    ...props,
                    onClick:(item)=>{
                        state.headerEl.setSelection([item]);
                    },
                }),
                EmptyComponent:"",
            });
            return flatlist;
        },
    });

    droplistfield.beforeEndHTML=`
    `;

    return droplistfield;
}
