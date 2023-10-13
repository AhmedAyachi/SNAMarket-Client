import {View} from "corella";
import css from "./SectionView.module.css";
import FieldView from "./FieldView/FieldView";
import SelectField from "./SelectField/SelectField";


export default function SectionView(props){
    const {parent,title,fields}=props;
    const sectionview=View({parent,className:`${css.sectionview} ${props.className||""}`});

    sectionview.innateHTML=`
        <header class="${css.header}">
            <h3 class="${css.title}">${title||""}</h3>
        </header>
    `;
    fields?.forEach(field=>{
        const component=statics[field.type]||FieldView;
        component({...field,parent:sectionview});
    });

    return sectionview;
}

const statics={
    select:SelectField,
}
