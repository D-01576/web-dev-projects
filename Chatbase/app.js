import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";

let img  = document.querySelector(".img")
const firebaseConfig = {
  apiKey: "AIzaSyCIDf2PZWsgSJ0mqIvXG6-ygNAjVQS37fk",
  authDomain: "chatbase-5c506.firebaseapp.com",
  databaseURL: "https://chatbase-5c506-default-rtdb.firebaseio.com",
  projectId: "chatbase-5c506",
  storageBucket: "chatbase-5c506.appspot.com",
  messagingSenderId: "968490273314",
  appId: "1:968490273314:web:20be098c47ada8e938d87b",
  measurementId: "G-MEMGMPBRCB"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

function signIn() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Logged in user:", user);
      img.src = user.photoURL;
    })
    .catch((error) => {
      console.error("Google Sign-In Error:", error);
    });
}

export function signOutt() {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully.");
      img.src = "jjs";
      img.alt = "signouted"
    })
    .catch((error) => {
      console.error("Sign-Out Error:", error);
      img.alt = "sign outkn"
    });
}
document.getElementById("signInWithGoogle").addEventListener("click", signIn);
document.getElementById("signOutBtn").addEventListener("click", signOutt)
