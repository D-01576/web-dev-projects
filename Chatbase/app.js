let sendbtn = document.querySelector(".send")
let main = document.querySelector(".main")
let entername = document.querySelector(".enternamae")
let username= "jsdf";
let logout = document.querySelector(".logout")
const firebaseConfig = window.env.API_SECRET;
firebase.initializeApp(firebaseConfig);
let database = firebase.database().ref("messages")

function messagese(){
  let message = document.querySelector(".input")
  if(message.value !== ""){
  const userData = {
    name: username,
    message : message.value,
  };

  database.push(userData)

  message.value = ""
}
}

function displayMessage(nawme, message) {
  // logout.textContent = username + "~ logout"

  const chatDiv = document.querySelector('.chatarea');
  const chat = document.createElement("div")
  chat.classList = "chat";
  const messageDiv = document.createElement('p');
  const name  = document.createElement("h2")
  name.className = "name"
  messageDiv.className = "message"
  messageDiv.innerText = message;
  name.innerHTML = nawme
  chat.appendChild(name)
  chat.appendChild(messageDiv)
  chatDiv.appendChild(chat);

  const chatareaElement = document.querySelector('.chatarea');

  chatareaElement.scrollTo({
    top: chatareaElement.scrollHeight,
    behavior: 'smooth'
  });
}

function listenForMessages() {
  const messagesRef = database;

  messagesRef.on('child_added', (snapshot) => {
    const message = snapshot.val().message;
    const name = snapshot.val().name;
    displayMessage(name,message);
  });
}

window.onload = listenForMessages;

sendbtn.addEventListener("click", messagese)

document.querySelector(".input").addEventListener("keypress",(e)=>{
  if(e.key === "Enter"){
    messagese()
  }
})

function reca(){
if(localStorage.getItem("username")){
    username = localStorage.getItem("username")
    main.style.display = "block";
    entername.style.display = "none"
}
else{
  main.style.display = "none";
  entername.style.display = "flex"
}

logout.textContent = username + "~ logout"
}

function setusername(){
  let inputname = document.querySelector(".inputname");
  if(inputname.value.length < 3){
  alert("The minimun character limit is 3")
  }
  else{
    localStorage.setItem("username", inputname.value)
    inputname.value = "";
    document.querySelector(".input").value = ""
  }
}

document.querySelector(".inputname").addEventListener("keypress",(e)=>{
  if(e.key === "Enter"){
    setusername()
    reca()
  }
})

document.querySelector(".enter").addEventListener("click",()=>{
  setusername()
  reca()
})

reca()

logout.addEventListener("click",()=>{
  localStorage.clear();
  reca()
})