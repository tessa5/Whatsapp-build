import { Avatar } from "@material-ui/core"
import {useRouter} from 'next/router'
import styled from "styled-components"
import getRecipientEmail from "../utility/getRecipientEmail"
import {useAuthState} from 'react-firebase-hooks/auth'
import { useCollection} from 'react-firebase-hooks/firestore'
import { auth, db } from "../firebase"

function Chat({id, users}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(db.collection('users').where("email", "==", "" , getRecipientEmail(users, user)))
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user)

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    return (
        <Container onClick={enterChat}>
            { recipient ? (
                <User src={recipient?.photoURL}/>
            ) : (
                <User>{recipientEmail[0]}</User>
            )}
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat

const Container = styled.div `
    display:flex;
    align-items: center;
    cursor: pointer;
    padding:12px;
    word-break: break-word;

    :hover{
        background:#e9eaeb;
    }
`

const User = styled(Avatar)`
    margin:5px;
    margin-right:15px;
`  
