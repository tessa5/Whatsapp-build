import React, {useState} from 'react';
import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import { auth, db } from "../firebase"
import { useRouter } from "next/router"
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFileRounded, InsertEmoticonRounded, Mic, MoreVertRounded } from "@material-ui/icons";
import {useCollection} from 'react-firebase-hooks/firestore'
import Message from './Message'
import firebase from 'firebase/compat/app'
import getRecipientEmail from "../utility/getRecipientEmail"
import TimeAgo from 'timeago-react'

function ChatScreen({chat, messages}) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("")

    const router = useRouter();
    const [messageSnapshot] = useCollection(db
        .collection('chats')
        .doc(router.query.id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        );

    const [recipientSnapshot] = useCollection(db
        .collection('users')
        .where('email', "==", getRecipientEmail(chat.users, user))
        );

    const showMessage = () => {
        if (messageSnapshot) {
            return messageSnapshot.docs.map((message) => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        } else {
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.user} message={message}/>
            ))
        }
    }

    const sendMessage =(e) => {
        e.preventDefault();
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, {merge: true});

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user: user.email, 
            photoURL: user.photoURL,
        });

        setInput("")
    }
    
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user);

    return (
        <Container>
            <Header>
                {
                    recipient ? (
                        <Avatar src={recipient?.photoURL} />
                    ) : (
                        <Avatar>{recipientEmail[0]}</Avatar>
                    )
                }
                <HeaderInfo>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Last active: {""}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                            ): "unavailable"}
                        </p>
                    ): (
                        <p>Loading last active</p>
                    )}
                    
                </HeaderInfo>
                <HeaderIcons>
                    <IconButton>
                    <AttachFileRounded/>
                    </IconButton>
                    <IconButton>
                    <MoreVertRounded/>
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessage()}
                <MessageEnd></MessageEnd>
            </MessageContainer>
            <InputContainer>
                <InsertEmoticonRounded/>
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button
                    hidden
                    disabled={!input}
                    type="submit"
                    onClick={sendMessage}
                >Send Message</button>
                <Mic/>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div``

const Header = styled.div `
    position:sticky;
    background-color:white;
    top:0;
    z-index:10;
    padding:3px;
    display:flex;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`

const HeaderInfo = styled.div`
    flex:1;
    margin-left:15px;

    >h3 {
        margin-bottom:-11px;
        color:#25D366;
    }
    >p {
        font-size:14px;
        color:#075E54
    }
`

const HeaderIcons = styled.div``

const MessageContainer = styled.div `
    padding:30px;
    min-height:90vh;
    background-color: #e5ded8;
`

const MessageEnd = styled.div ``

const InputContainer = styled.form `
    display:flex;
    align-items:center;
    padding:10px;
    position:sticky;
    bottom:0;
    z-index:100;
    background-color: white;
`

const Input = styled.input`
    flex:1;
    align-items: center;
    position: sticky;
    bottom:0;
    padding:10px;
    border:none;
    background-color:whitesmoke;
    margin:0 15px;
`