import {map,fadeIn,fadeOut,PopupView} from "vritra";
import css from "./AlertView.module.css";


export default function AlertView(props){
    const {parent=window.webview,message,avoidable}=props;
    const alertview=PopupView({
        ...props,avoidable,parent,
        className:`${css.alertview} ${props.className}`,
    }),state={
        actions:props.actions||getDefaultActions(alertview,props),
    },{actions}=state;

    alertview.beforeEndHTML=`
        <div class="${css.container}">
            ${message?`<p class="${css.message}">${message}</p>`:""}
            <div class="${css.actions}">
                ${map(actions,({id,label})=>`
                    <button class="${css.action}" data-id="${id}">
                        <label>${label||id||"--"}</label>
                    </button>
                `)}
            </div>
        </div>
    `;
    
    const container=alertview.querySelector(`.${css.container}`);
    container.onclick=(event)=>{event.stopPropagation()};
    const buttons=alertview.querySelectorAll(`.${css.actions}>button`);
    buttons.forEach(button=>{
        const {id}=button.dataset,action=actions.find(action=>action.id===id);
        action.element=button;
        button.onclick=()=>{
            const {onTrigger}=action;
            onTrigger&&onTrigger(action);
        }
    });

    alertview.onclick=avoidable&&(()=>{alertview.unmount()});

    alertview.unmount=()=>{
        fadeOut(alertview,100,()=>{alertview.remove()});
    };

    fadeIn(alertview);
    return alertview;
}

const getDefaultActions=(alertview,{onConfirm})=>[
    {
        id:"cancel",
        label:language.cancel,
        onTrigger:()=>{alertview.unmount()},
    },
    {
        id:"confirm",
        label:language.confirm,
        onTrigger:()=>{
            alertview.unmount();
            onConfirm&&onConfirm(alertview);
        },
    },
];
