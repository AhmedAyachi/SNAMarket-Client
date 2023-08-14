import Person from "./Person";

export default class User extends Person {
    constructor(props={}){
        super(props);
        const {sessionId}=props;
        Object.assign(this,{
            sessionId:props.sessionId,
            username:props.username,
            isGuest:!sessionId,
        });
    }

    static Guest={
        id:"guest",
    }
} 
