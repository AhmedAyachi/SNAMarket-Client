import {View,fadeIn,fadeOut,map} from "corella";
import css from "./ConfirmationView.module.css";
import {cross0,check1} from "assets";


export default function ConfirmationView(props){
    const {parent,onConfirm}=props;
    const confirmationview=View({parent,className:css.confirmationview});

    confirmationview.innateHTML=`
        <p class="${css.message}">${language.removefromcart} ?</p>
        <div class="${css.actions}">
            ${map([check1(mainColor),cross0(majorColor)],(icon,i)=>`
                <img ref="${i?"cancel":"confirm"}btn" src="${icon}"/>
            `)}
        </div>
    `;

    confirmationview.confirmbtn.onclick=onConfirm&&(()=>{
        confirmationview.cancelbtn.click();
        onConfirm();
    });

    confirmationview.cancelbtn.onclick=()=>{
        fadeOut(confirmationview,150,()=>{
            confirmationview.remove();
        });
    }

    fadeIn(confirmationview,150);
    return confirmationview;
}
