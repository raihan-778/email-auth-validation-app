// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAJQ59VgC100NpDfF7OxOnVvgqxyc2bAM",
  authDomain: "email-auth-validation-app.firebaseapp.com",
  projectId: "email-auth-validation-app",
  storageBucket: "email-auth-validation-app.firebasestorage.app",
  messagingSenderId: "492559485146",
  appId: "1:492559485146:web:90fd99f7dc9e0f52803de3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
