let loginbtn = document.getElementById("button login__submit")

const firebaseConfig = window.env.API_SECRET;

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const name = document.querySelector("#name").value;
  console.log(email);
  console.log(password);
  console.log(name)

  firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
    console.log(user.user.uid)
    const userId = user.user.uid; 
    const encodedUserId = encodeURIComponent(userId);
    const db = firebase.firestore();
    db.collection("users").doc(user.user.uid).set({
        name: name,
    })
    setTimeout(() => {
        window.location.href = `../getdetail/index.html?userId=${encodedUserId}`;
    }, 3000);
  }).catch((error)=>{
    if(error.message === "Password should be at least 6 characters"){
        alert("Password must be 6 characters")
    }
    else if(error.message === "The email address is badly formatted."){
        alert("Email is incorrect")
    }
    else{
        alert("User already have a account")
    }
    console.log(error)
  })
});

google.addEventListener("click",(e)=>{
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
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
                })
            }
          }).catch((error) => {
            console.log("Error getting documents:", error);
          });
        setTimeout(() => {
            window.location.href = `../getdetail/index.html?userId=${encodedUserId}`;
        }, 3000);
    }).catch((error)=>{
        console.log("error",error)
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
                })
            }
          }).catch((error) => {
            console.log("Error getting documents:", error);
          });
        setTimeout(() => {
            window.location.href = `../getdetail/index.html?userId=${encodedUserId}`;
        }, 3000);
    }).catch((error)=>{
        console.log("error",error)
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
                })
            }
          }).catch((error) => {
            console.log("Error getting documents:", error);
          });
        setTimeout(() => {
            window.location.href = `../getdetail/index.html?userId=${encodedUserId}`;
        }, 3000);
    }).catch((error)=>{
        console.log("error",error)
    })
})