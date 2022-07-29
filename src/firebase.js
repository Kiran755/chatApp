// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAq4zCKdS1n9ui9KfWER6wdd2200erq3Y",
    authDomain: "chatapp-77532.firebaseapp.com",
    databaseURL: "https://chatapp-77532-default-rtdb.firebaseio.com",
    projectId: "chatapp-77532",
    storageBucket: "chatapp-77532.appspot.com",
    messagingSenderId: "884676529712",
    appId: "1:884676529712:web:21832bc4d14b9d7c8fa7f5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);
