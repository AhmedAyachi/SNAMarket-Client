import Person from "./Person";


export default class User extends Person {
    constructor(props={}){
        super(props);
        const {id}=props;
        Object.assign(this,{
            sessionId:props.sessionId,
            isGuest:id===User.Guest.id
        });
    }

    static Guest={
        id:"guest",
    }
} 
