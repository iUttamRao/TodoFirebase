// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get, child, update, onValue } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxKJ0_eWrFpBdxC2Yl6D6bajv3Ll1cJLw",
  authDomain: "todo-8b40c.firebaseapp.com",
  projectId: "todo-8b40c",
  storageBucket: "todo-8b40c.appspot.com",
  messagingSenderId: "846622512297",
  appId: "1:846622512297:web:03d082bdde8b112e3885b8",
  measurementId: "G-X6R7LC9GES",
  databaseURL: "https://todo-8b40c-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app)
const analytics = getAnalytics(app);

export { auth, provider, analytics, signInWithPopup, signOut, onAuthStateChanged, db, ref, set, get, child, update, onValue };