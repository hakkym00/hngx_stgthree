// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4vv_tmu84r3KdLmjQ8bn2fNHgcfGdaek",
  authDomain: "hngs-stagethree.firebaseapp.com",
  projectId: "hngs-stagethree",
  storageBucket: "hngs-stagethree.appspot.com",
  messagingSenderId: "834306002829",
  appId: "1:834306002829:web:4ed303f4cb53ba988db7c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
