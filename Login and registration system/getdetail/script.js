let namee = document.querySelector(".name")
let img = document.getElementById("uploadPreview")
const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("uploadImage");

img.src = "../img/profile.png"

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const userId = getQueryParam('userId');

const firebaseConfig = window.env.API_SECRET;
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

const data = db.collection("users");

function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = function (oFREvent) {
        img.src = oFREvent.target.result;
        console.log(oFREvent.target.result)
        db.collection("users").doc(userId).update({
        photo : oFREvent.target.result
        });
    };
};

data.get().then((q) => {
  q.forEach((doc) => {
    if(doc.id === userId){
        namee.textContent = doc.data().name
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

uploadButton.addEventListener("click", () => {
    fileInput.click();
  });

  window.addEventListener('beforeunload', function (event) {
    console.log(event.preventDefault())
    event.returnValue = 'Are you sure you want to leave ths page?';
  });