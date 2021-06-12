// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseapp = firebase.initializeApp({
    apiKey: "AIzaSyCScmLen6zkZ0XOG8oQ4S6awSsZpD458wY",
    authDomain: "todo-app-cp-b931c.firebaseapp.com",
    projectId: "todo-app-cp-b931c",
    storageBucket: "todo-app-cp-b931c.appspot.com",
    messagingSenderId: "838688098581",
    appId: "1:838688098581:web:9337e52e7af6653bed411c",
    measurementId: "G-NHGJRSC3VN"
});

const db = firebaseapp.firestore();

export default db ;