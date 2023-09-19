import {View,map} from "corella";
import css from "./OrderFeedbackView.module.css";
import {success0,fail0} from "assets";


export default function OrderFeedbackView(props){
    const {parent,successful=true,onSubmit}=props;
    const orderfeedbackview=View({parent,className:css.orderfeedbackview});

    orderfeedbackview.innateHTML=`
        <img class="${css.icon}" src="${successful?success0:fail0}"/>
        <p class="${css.message}">
            ${successful?language.thankyouforyourorder:`
                ${language.sorry}! ${language.yourorderhasfailed}
            `}!
        </p>
        <p class="${css.description}">
            ${map(successful?[language.youcantrackyourorderintheorderssection]:[
                language.somethingwentwrong,
                language.pleasetryagaintoconfirmyourorder,
            ],(text)=>`<span>${text}</span>`)}
        </p>
        <button 
            class="${css.submitbtn}" 
            ref="submitbtn" 
            style="${styles.submitbtn(successful)}"
        >${language[successful?"tocheckout":"tryagain"]}</button>
    `;

    orderfeedbackview.submitbtn.onclick=onSubmit;

    return orderfeedbackview;
}

const styles={
    submitbtn:(successful)=>`
        background-color:var(--${successful?"main":"major"}Color);
    `,
}
