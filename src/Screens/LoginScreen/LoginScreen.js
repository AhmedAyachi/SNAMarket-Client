import {View} from "vritra";
import css from "./LoginScreen.module.css";
import {InputField,ButtonView} from "components";
import {appicon0,loginillustration0} from "assets";
import {User} from "resources";
import {setUser} from "actions";
import * as H from "./Hooks";


export default function LoginScreen(props){
    const {parent}=props;
    const loginscreen=View({parent,tag:"main",className:css.loginscreen}),state={
        input:{},
    },{input}=state;

    loginscreen.innateHTML=`
        <div class="${css.row0}" style="background-image:url(${loginillustration0})">
            <div class="${css.greeting}">
                <img class="${css.appicon}" src="${appicon0(minorColor)}"/>
                <p class="${css.welomemsg}">${language.welcometo} SNAMarket</p>
            </div>
        </div>
        <div class="${css.row1}" ref="row1">
            <div class="${css.loginsection}" ref="loginsection"></div>
            <div class="${css.other}">
                <span ref="signupbtn">${language.signup}</span>
                <span ref="passbtn">${language.pass}</span>
            </div>
        </div>
    `;

    const {loginsection}=loginscreen;
    ["email","password"].forEach(id=>{
        InputField({
            parent:loginsection,
            type:id,label:language[id]||id,
            labelStyle:"color:var(--mainColor)",
            style:"border-color:var(--mainColor)",
            onChange:(value)=>{input[id]=value},
        });
    });
    ButtonView({
        parent:loginsection,
        label:language.login,
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
        setUser(User.Guest,()=>{
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
