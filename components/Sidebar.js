import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@material-ui/core'
import {  ChatBubbleOutlineRounded, MoreVertRounded, SearchRounded } from '@material-ui/icons'
import * as EmailValidator from "email-validator"
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from './Chat'


function Sidebar() {
    const [user] = useAuthState(auth)
    const userChat = db.collection('chats').where('users', "array-contains", user.email)
    const [chatSnapshot] = useCollection(userChat)

    const createChat = () => {
        const input = prompt(' Please enter an email of the person you wish to chat with');
        if(!input) return null;

        if (EmailValidator.validate(input) && !chatExists(input) && input !==user.email) {
            db.collection("chats").add({
                users: [user.email, input],

            })
        }
    }

    const chatExists = (recipientEmail) => {
        !!chatSnapshot?.docs.find(
            (chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0)
    }
    return (
        <Container>
            <Header>
                <User src={user.photoURL}
                    onClick={() => auth.signOut()} 
                    />
                <IconContainer>
                    <IconButton>
                    <ChatBubbleOutlineRounded/>
                    </IconButton>
                    <IconButton>
                    <MoreVertRounded/>
                    </IconButton>
                </IconContainer>
            </Header>
            <Search>
                <SearchInput placeholder="Search in chat"/>
                <SearchRounded/>
            </Search>
            <SidebarButton
                onClick={createChat}
            >Start a new chat</SidebarButton>
                {chatSnapshot?.docs.map(chat => (
                    <Chat 
                        key={chat.id}
                        id={chat.id}
                        users={chat.data().users}
                    />
                ))}

        </Container>
    )
}

export default Sidebar

const Container = styled.div `
    flex:0.45;
    border-right: 1px solid whitesmoke;
    height:100vh;
    min-width:300px;
    max-width:350px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display:none;
    }
    -ms-overflow-style: none;
    scrollbar-width:none;
`

const Header = styled.div `
    display:flex;
    justify:space-between;
    position: sticky;
    top:0;
    z-index:10;
    align-items: center;
    height:80px;
    padding:12px;
    border-bottom: 1px solid whitesmoke;
`

const User = styled(Avatar) `
    cursor: pointer;
    :hover {
        opacity:0.8;
    }
`
const IconContainer = styled.div``

const Search = styled.div`
    display:flex;
    align-items: center;
    padding:15px;
    border-radius:3px;
`
const SearchInput = styled.input`
    outline-width:0;
    border:none;
    flex:1;
`
const SidebarButton = styled(Button)`
    width:100%;
    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
    
` 