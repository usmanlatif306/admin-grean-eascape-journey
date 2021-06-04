import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDd5jHr5ytC1VbbUCY6UQtFvtxmuJPuDlo",
  authDomain: "fypgej.firebaseapp.com",
  projectId: "fypgej",
  storageBucket: "fypgej.appspot.com",
  messagingSenderId: "672046099218",
  appId: "1:672046099218:web:39504c8679d2d03b9121cb",
  measurementId: "G-L7YL97BW3Q",
});

export const auth = app.auth();
export const db = app.firestore();
export const storage = app.storage();
export default app;
