import {findItem} from "vritra";


export const saveCartItem=(cartitem)=>new Promise(resolve=>{
    WebView.useStore(({cart})=>{
        const {id}=cartitem.product;
        const item=findItem(cart.items,({product})=>product.id===id);
        if(item){
            WebView.setStore(`cart.items[${item.index}]`,cartitem,resolve);
        }
        else{
            WebView.setStore("cart.items[unshift]",cartitem,resolve);
        }
    });
});
