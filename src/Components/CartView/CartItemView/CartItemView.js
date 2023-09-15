import {View,usePressGesture} from "corella";
import css from "./CartItemView.module.css";
import {minus0,plus0,trash0} from "assets";


export default function CartItemView(props){
    const {parent,cartitem,onChangeQuantity,onRemove}=props,{product,quantity,granularity}=cartitem;
    const cartitemview=View({parent,className:css.cartitemview});

    cartitemview.innateHTML=`
        <div>
            <text class="${css.name}">${product.name}</text>
            <text class="${css.price}">
                ${product.kgprice} ${language.td}/kg - ${granularity}
            </text>
        </div>
        <div class="${css.counter}">
            <img ref="minusbtn" src="${minus0(textColor,3)}"/>
            <span class="${css.count}" ref="countEl">${quantity}</span>
            <img ref="plusbtn" src="${plus0(textColor,3)}"/>
            <img ref="removebtn" src="${trash0(mainColor)}"/>
        </div>
    `;

    usePressGesture({
        element:cartitemview.minusbtn,
        timestamp:350,
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
        timestamp:350,
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
