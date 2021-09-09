import styled from "styled-components"
import Head from 'next/head'
import { Button } from "@material-ui/core"
import { auth, provider } from "../firebase"

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo 
                    src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png"
                />
                <Button 
                    style={{
                        color: '#ffffff'
                    }}
                    onClick={signIn}
                    variant="outline">Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login

const Container = styled.div `
    display: grid;
    place-items: center;
    height:100vh;
    background-color:#25D366;
` 
const LoginContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    border-radius:5px;
    box-shadow:0 3px 10px white;
    background-color:#075E54;
    padding:100px;
`

const Logo = styled.img`
    height:200px;
    width: 200px;
    margin-bottom: 10px;
`