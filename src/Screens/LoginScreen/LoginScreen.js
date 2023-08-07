import {View} from "cherries";
import css from "./LoginScreen.module.css";
import {ButtonView,SwitchField,TextInput} from "components";
import {chick0,userlogin0} from "assets";
import {setUser} from "actions";
import * as H from "./Hooks";


export default function LoginScreen(props){
    const {parent}=props;
    const loginscreen=View({
        parent,tag:"main",
        className:css.loginscreen,
        style:{backgroundImage:`url(${chick0})`},
    }),state={
        input:{},
    },{input}=state;

    loginscreen.innateHTML=`
        <div class="${css.container}">
            <img class="${css.image}" src="${userlogin0}"/>
            <div ref="fieldsEl" class="${css.fields}"></div>
            <button class="${css.passbtn}" ref="passbtn">${language.pass} \></button>
        </div>
        <p class="${css.pwdbymsg}">
            <span>${language.poweredby}</span> 
            Ahmed Ayachi v1.0.0
        </p>
    `;

    const {fieldsEl}=loginscreen;
    ["username","password"].forEach(id=>{
        TextInput({
            parent:fieldsEl,
            type:id,
            placeholder:language[id],
            style:"color:var(--mainColor)",
            onChange:(value)=>{input[id]=value},
        });
    });
    SwitchField({
        parent:fieldsEl,
        label:language.rememberme,
        labelStyle:styles.rememberme,
        onChange:(value)=>{input.rememberme=value},
    });
    ButtonView({
        parent:fieldsEl,
        styleId:1,
        label:language.login,
        style:"margin:auto",
        onClick:()=>{
            console.log(input);
            H.sendLoginRequest(input).
            then(user=>{
                location.reload();
            }).
            catch(error=>{
                console.error(error);
            });
        },
    });

    loginscreen.passbtn.onclick=()=>{
        setUser({},()=>{
            location.reload();
        });
    }

    return loginscreen;
}

const styles={
    rememberme:`
        font-size:3em;
        font-weight:700;
        white-space:normal;
        color:var(--mainColor);
    `,
}
