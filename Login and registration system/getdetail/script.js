let namee = document.querySelector(".name")
let email = document.querySelector(".email")
let img = document.getElementById("uploadPreview")
let loading = document.getElementById("loading")
const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("uploadImage");
let Deleted = document.getElementById("delete")
let signout = document.getElementById("Sign-Out")
let main = document.querySelector(".main")
let permission = document.querySelector(".permission")
let notsignin = document.querySelector(".siign")
main.style.display = "none";
loading.style.display = "flex"

img.src = "../img/profile.png"

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const userId = getQueryParam('userId');
let currentUserid;

const firebaseConfig = window.env.API_SECRET;
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if(firebase.auth().currentUser.uid != userId){
         main.style.display = "none";
         permission.style.display = "flex"
         loading.style.display = "none"
      }
      else{
        permission.style.display = "none"
        main.style.display = "none"
        data.get().then((q) => {
          q.forEach((doc) => {
            if(doc.id === userId){
                document.title = namee.textContent = doc.data().name;
                main.style.display = "flex";
                loading.style.display = "none"
                namee.textContent = doc.data().name
                email.textContent = doc.data().email
                console.log(doc.data())
                if(doc.data().photo){
                    console.log("c")
                    img.src = doc.data().photo;
                }
            }
          });
        }).catch((error) => {
          console.log("Error getting documents:", error);
        });
      }
    } else {
      main.style.display = "none";
      notsignin.style.display = "flex";
      loading.style.display = "none"
    }
  });

const data = db.collection("users");

async function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = async function (oFREvent) {
        let src = oFREvent.target.result
        await data.doc(userId).update({
          photo : src
        })
        img.src = src;
        console.log(src)
    };
};

uploadButton.addEventListener("click", () => {
    fileInput.click();
  });
Deleted.addEventListener("click", async ()=>{
    const res = await db.collection('users').doc(userId).delete()
    firebase.auth().currentUser.delete().then(()=>{
        window.location.href = "../index.html";
    }).catch(()=>{
        alert("cant delete")
    })
})

signout.addEventListener("click",()=>{
    firebase.auth().signOut().then(()=>{
        window.location.href = "../index.html"
    }).catch(()=>{
        alert(" cant sogn oput")
    })
})