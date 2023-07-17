import {View} from "cherries";
import css from "./LoginScreen.module.css";
import {ButtonView,SwitchField,InputField} from "components";
import {userlogin0} from "assets";
import { language } from "localdb";


export default function LoginScreen(props){
    const {parent}=props;
    const loginscreen=View({parent,className:css.loginscreen}),state={
        input:{},
    },{input}=state;

    loginscreen.innateHTML=`
        <div class="${css.container}">
            <img class="${css.image}" src="${userlogin0}"/>
            <div ref="fieldsEl" class="${css.fields}"></div>
            <button class="${css.passbtn}">${language.pass} \></button>
        </div>
        <p class="${css.pwdbymsg}">
            <span>${language.poweredby}</span> 
            Ahmed Ayachi v1.0.0
        </p>
    `;

    const {fieldsEl}=loginscreen;
    ["username","password"].forEach(id=>{
        InputField({
            parent:fieldsEl,
            type:id,
            placeholder:language[id],
            onChange:(value)=>{input[id]=value},
        });
    });
    SwitchField({
        parent:fieldsEl,
        label:language.rememberme,
        onChange:(value)=>{input.rememberme=value},
    });
    ButtonView({
        parent:fieldsEl,
        styleId:1,
        label:language.login,
        onClick:()=>{
            console.log(input);
        },
    });

    return loginscreen;
}
