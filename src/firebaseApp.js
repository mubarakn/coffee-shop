// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAobhShhHZ9Rh1yt6V4Dm64sID5O9dGPe0",
    authDomain: "restaurant-demo-9e8b4.firebaseapp.com",
    projectId: "restaurant-demo-9e8b4",
    storageBucket: "restaurant-demo-9e8b4.appspot.com",
    messagingSenderId: "651613135133",
    appId: "1:651613135133:web:0fa1e5f7ea585ccdfc81f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
