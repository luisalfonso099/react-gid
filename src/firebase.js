import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSLGCYvkyHqfqnpjcPAp6YMh4HpbdWMyk",
  authDomain: "todo-list-16941.firebaseapp.com",
  projectId: "todo-list-16941",
  storageBucket: "todo-list-16941.appspot.com",
  messagingSenderId: "141436522351",
  appId: "1:141436522351:web:5f87b5167562bd08fc629a",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
