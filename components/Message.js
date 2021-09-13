import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import { auth } from "../firebase";
import moment from "moment"


function Message({user, message}) {
const [userLoggedIn] = useAuthState(auth);
const TypeOfMessage = user ===userLoggedIn.email ? Sender : Receiver;



    return (
        <Container>
            <TypeOfMessage>
                {message.message}
                <span>{message.timestamp ? moment(message.timestamp).format("LT") : "..."}</span>
            </TypeOfMessage>
        </Container>
    )
}

export default Message



const Container = styled.div `
    
`

const MessageElement = styled.div`
    width: fit-content;
    padding:10px;
    margin:8px;
    font-size:24px;
    font-weight:lighter;
    min-width:60px;
    position:relative;
    text-align:right;

    >span {
        font-size:9px;
        float:right;
        text-aligh: left;
        margin-left:5px;
        font-weight:bold;
    }
` 

const Sender = styled(MessageElement)`
    margin-left:auto;
    background-color: #dcf8c6;
    border-radius: 15px;
`

const Receiver = styled(MessageElement)`
    text-align:left;
    background-color:whitesmoke;
    border-radius: 15px;
`