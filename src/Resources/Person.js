

export default class Person {
    constructor(props={}){
        let {name}=props;
        Object.assign(this,{
            id:props.id,
            name:name&&name.trim(),
            firstname:null,
            lastname:null,
            /* photo:props.photo,
            edress:props.edress,
            tel:props.tel||props.mobile,
            gender:props.gender, */
        });
        Person.setName(this);
    }

    static setName(person,name){
        if(name){person.name=name};
        const fullname=person.name;
        if(fullname&&fullname.includes(" ")){
            const nameparts=fullname.split(" ");
            person.firstname=nameparts[0];
            person.lastname=nameparts[1];
        }
    }
}
