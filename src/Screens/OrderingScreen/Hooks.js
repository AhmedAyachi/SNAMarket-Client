

export const saveCartItem=(cartitem,index)=>new Promise(resolve=>{
    if(index>-1){
        WebView.setStore(`cart.items[${index}]`,cartitem,resolve);
    }
    else{
        WebView.setStore("cart.items[unshift]",cartitem,resolve);
    }
});
