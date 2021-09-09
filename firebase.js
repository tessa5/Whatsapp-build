// 
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBlAOIFXSjye5odjgORZcMW4lprW0hfcVA",
    authDomain: "whatsapp-chat-6f405.firebaseapp.com",
    projectId: "whatsapp-chat-6f405",
    storageBucket: "whatsapp-chat-6f405.appspot.com",
    messagingSenderId: "859491540693",
    appId: "1:859491540693:web:a04a9843cadec7ce5f8c5c"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore()
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };