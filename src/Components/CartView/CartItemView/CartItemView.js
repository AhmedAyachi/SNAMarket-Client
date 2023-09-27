import {View,usePressGesture} from "corella";
import css from "./CartItemView.module.css";
import ConfirmationView from "./ConfirmationView/ConfirmationView";
import {minus0,plus0,trash0} from "assets";


export default function CartItemView(props){
    const {parent,cartitem,onChangeQuantity,onRemove}=props;
    let cartitemview=View({parent,className:css.cartitemview});

    cartitemview.innateHTML=`
        <div class="${css.col0}" ref="col0">
            <text class="${css.name}">${cartitem.product.name}</text>
            <text class="${css.price}">
                ${cartitem.granularity} - ${language[cartitem.unit==="t"?"ton":"kilogram"]}
            </text>
        </div>
        <div class="${css.col1}">
            <div class="${css.counter}">
                <img ref="minusbtn" src="${minus0(textColor,3)}"/>
                <span class="${css.count}" ref="countEl">${cartitem.quantity}</span>
                <img ref="plusbtn" src="${plus0(textColor,3)}"/>
            </div>
            <img ref="removebtn" src="${trash0(majorColor)}"/>
        </div>
    `;

    usePressGesture({
        element:cartitemview.minusbtn,
        timestamp:200,
        onPressing:(event)=>{
            if((cartitem.quantity>1)){
                cartitem.quantity-=1;
                cartitemview.countEl.innerText=cartitem.quantity;
            }
            else{
                event.cancel();
            }
        },
        onEnd:()=>{onChangeQuantity&&onChangeQuantity(cartitem)},
    });
    usePressGesture({
        element:cartitemview.plusbtn,
        timestamp:200,
        onPressing:()=>{
            cartitem.quantity+=1;
            cartitemview.countEl.innerText=cartitem.quantity;
        },
        onEnd:()=>{onChangeQuantity&&onChangeQuantity(cartitem)},
    });

    cartitemview.removebtn.onclick=()=>{
        ConfirmationView({
            parent:cartitemview,
            onConfirm:()=>{
                cartitemview.remove();
                onRemove&&onRemove(cartitem);
            },
        });
    }

    cartitemview.col0.onclick=()=>{
        const {product}=cartitem;
        WebView.show({
            id:"bottomsheet",
            message:{
                title:product.name,product,
                contentId:"productorder",
            },
            onClose:({store})=>{
                const {cart}=store;
                const item=cart.items.find(item=>item.product.id===product.id);
                Object.assign(cartitem,item);
                cartitemview=cartitemview.substitute(CartItemView(props));
            },
        });
    }


    return cartitemview;
}
