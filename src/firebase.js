// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmxGvkpEUq9BgLbMpXuoei5Cj8R4k6JXI",
  authDomain: "crud-firestore-ed8b7.firebaseapp.com",
  databaseURL: "https://crud-firestore-ed8b7-default-rtdb.firebaseio.com",
  projectId: "crud-firestore-ed8b7",
  storageBucket: "crud-firestore-ed8b7.appspot.com",
  messagingSenderId: "44407611152",
  appId: "1:44407611152:web:5a920e394eefa8a432cf95",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };