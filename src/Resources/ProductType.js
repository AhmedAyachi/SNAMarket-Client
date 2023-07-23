import {cow0,chicken0,rabbit0} from "assets";


export default class ProductType {
    constructor(props){
        Object.assign(this,{
            id:props.id,
            name:props.name,
        });
    }

    static icon={
        ruminants:cow0,
        poultry:chicken0,
        rabbit:rabbit0,
    };
}
