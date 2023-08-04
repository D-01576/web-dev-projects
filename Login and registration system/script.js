let text = document.querySelector(".text")
let forgot = document.querySelector(".forgot")
let loginbtn = document.getElementById("button login__submit")
let google = document.getElementById("google")
let facebook = document.getElementById("facebook")
let twitter = document.getElementById("twitter")
const firebaseConfig = window.env.API_SECRET;

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const defaultApp = firebase.app();
defaultApp.automaticDataCollectionEnabled = true;
defaultApp.isDeleted = true;
defaultApp.ignoreUndefinedProperties = true;

loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  console.log(email);
  console.log(password);

  firebase.auth().signInWithEmailAndPassword(email, password).then((data)=>{
        const userId = data.user.uid; 
        const encodedUserId = encodeURIComponent(userId);
        window.location.href = `./getdetail/index.html?userId=${encodedUserId}`;
  }).catch((error)=>{
    if(error.message === "The email address is badly formatted."){
        alert("Email is incorrect")
    }
    else{
        alert("Email OR Password incorrect!")
    }
  })
});

forgot.addEventListener("click",(e)=>{
    e.preventDefault();
    const email = document.querySelector("#email").value;

    firebase.auth().sendPasswordResetEmail(email).then((data)=>{
        text.textContent = "request sent"
    }).catch((error)=>{
        text.textContent = "wrong email"
    })
})

google.addEventListener("click",(e)=>{
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(async (user)=>{
        const userId = user.user.uid; 
        const encodedUserId = encodeURIComponent(userId);
        const db = firebase.firestore();
        console.log(db)
        await db.collection("users").get().then((q) => {
            let check = 0;
            q.forEach((doc) => {
                if(doc.id === userId){
                    console.log("find");
                    check++;
                } 
            });
            if (check == 0){
                db.collection("users").doc(user.user.uid).set({
                    name: user.user.displayName,
                    email: user.user.email,
                })
            }
          }).catch((error) => {
            console.log("Error getting documents:", error);
          });
        setTimeout(() => {
            window.location.href = `./getdetail/index.html?userId=${encodedUserId}`;
        },3000);
    }).catch((error)=>{
        alert("TRY AGAIN: ERROR")
    })
})

facebook.addEventListener("click",(e)=>{
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((user)=>{
        const userId = user.user.uid; 
        const encodedUserId = encodeURIComponent(userId);
        const db = firebase.firestore();
        console.log(db)
        db.collection("users").get().then((q) => {
            let check = 0;
            q.forEach((doc) => {
                if(doc.id === userId){
                    console.log("find");
                    check++;
                } 
            });
            if (check == 0){
                db.collection("users").doc(user.user.uid).set({
                    name: user.user.displayName,
                    email: user.user.email,
                })
            }
          }).catch((error) => {
            console.log("Error getting documents:", error);
          });
        setTimeout(() => {
            window.location.href = `./getdetail/index.html?userId=${encodedUserId}`;
        }, 3000);
    }).catch((error)=>{
        alert("TRY AGAIN: ERROR")
    })
})

twitter.addEventListener("click",(e)=>{
    e.preventDefault();
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then((user)=>{
        const userId = user.user.uid; 
        const encodedUserId = encodeURIComponent(userId);
        const db = firebase.firestore();
        console.log(db)
        db.collection("users").get().then((q) => {
            let check = 0;
            q.forEach((doc) => {
                if(doc.id === userId){
                    console.log("find");
                    check++;
                } 
            });
            if (check == 0){
                db.collection("users").doc(user.user.uid).set({
                    name: user.user.displayName,
                    email: user.user.email,
                })
            }
          }).catch((error) => {
            console.log("Error getting documents:", error);
          });
        setTimeout(() => {
            window.location.href = `./getdetail/index.html?userId=${encodedUserId}`;
        }, 3000);
    }).catch((error)=>{
        alert("TRY AGAIN: ERROR")
    })
})

