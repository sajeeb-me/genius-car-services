// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaPEZYlQe7CmzfNg9SNXz5SzKMEueEc8A",
    authDomain: "genius-car-services-78a0c.firebaseapp.com",
    projectId: "genius-car-services-78a0c",
    storageBucket: "genius-car-services-78a0c.appspot.com",
    messagingSenderId: "918090914027",
    appId: "1:918090914027:web:ab39ba1e8b3a6bc6e1c6ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth;