import {View,map} from "corella";
import css from "./CompanyScreen.module.css";
import {MapView} from "components";
import {chevron0} from "assets";


export default function CompanyScreen(props){
    const {parent}=props;
    const companyscreen=View({parent,tag:"main",className:css.companyscreen}),state={
        infoshown:true,
    };

    companyscreen.innateHTML=`
        <section ref="infoEl" class="${css.info}">
            <div class="${css.header}">
                <h3 class="${css.title}">SNA</h3>
                <img ref="togglebtn" class="button" src="${chevron0(backgroundColor)}"/>
            </div>
            <ul ref="infolistEl">
                ${map(Object.keys(statics.info),(key)=>`
                    <li>
                        <span class="${css.key}">${language[key]}</span> : ${statics.info[key]}
                    </li>
                `)}
            </ul>
        </section>
    `;
    MapView({parent:companyscreen,url:statics.url});
    const {togglebtn}=companyscreen;
    togglebtn.onclick=()=>{
        const infoshown=state.infoshown=!state.infoshown;
        const {infoEl,infolistEl}=companyscreen;
        infoEl.style.transform=`translateY(${infoshown?0:102*infolistEl.offsetHeight/window.innerWidth}vw)`;
        togglebtn.style.transform=`rotateZ(${infoshown?"0":"-180"}deg)`;
    }

    return companyscreen;
}

const statics={
    url:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.908879490539!2d10.38230497644955!3d36.70072747329965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd4f6c00000001%3A0xfc01951f9ea97fa3!2sAnimal%20Nutrition%20Society!5e0!3m2!1sen!2stn!4v1691325407838!5m2!1sen!2stn",
    info:{
        phone:"(+216) 70 020 640",
        fax:"(+216) 71 430 607",
        email:"sna.tunis@sna.com.tn",
        address:"z.i borj cédria - ben arous 2055, 2055",
    },
}
