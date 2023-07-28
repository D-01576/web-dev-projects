// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCIDf2PZWsgSJ0mqIvXG6-ygNAjVQS37fk",
    authDomain: "chatbase-5c506.firebaseapp.com",
    projectId: "chatbase-5c506",
    storageBucket: "chatbase-5c506.appspot.com",
    messagingSenderId: "968490273314",
    appId: "1:968490273314:web:20be098c47ada8e938d87b",
    measurementId: "G-MEMGMPBRCB"
  };

  firebase.initializeApp(firebaseConfig);
  function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // User signed in successfully
        var user = result.user;
        console.log("User signed in:", user);
      })
      .catch((error) => {
        // Handle sign-in errors
        console.error("Error signing in:", error);
      });
  }
