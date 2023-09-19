import {View,usePressGesture} from "corella";
import css from "./CartItemView.module.css";
import {minus0,plus0,trash0} from "assets";


export default function CartItemView(props){
    const {parent,cartitem,onChangeQuantity,onRemove}=props;
    const cartitemview=View({parent,className:css.cartitemview});

    cartitemview.innateHTML=`
        <div class="${css.col0}">
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
        cartitemview.remove();
        onRemove&&onRemove(cartitem);
    }


    return cartitemview;
}
