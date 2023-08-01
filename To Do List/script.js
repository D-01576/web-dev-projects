let texts = [];
if(localStorage.getItem("texts")){
    texts = JSON.parse(localStorage.getItem("texts"))
}

let save = document.querySelector(".save")
let savebtn = document.querySelector(".savebtn")
let markarea = document.querySelector(".markarea")

for(let i = 0; i < texts.length;i++){
    let hi = document.createElement("div")
        hi.className = "areasaved";
        hi.innerHTML = `
        <h3 class="savedtext">${texts[i]}</h3>
        <p class="cancel">X</p>
        `
    markarea.appendChild(hi);
}

function add(){
    if(save.value === ""){
        alert("input box in khalli")
    }
    else{
        localStorage.clear()
        texts.push(save.value)
        let hi = document.createElement("div")
        hi.className = "areasaved";
        hi.innerHTML = `
        <h3 class="savedtext">${save.value}</h3>
        <p class="cancel">X</p>
        `
        markarea.appendChild(hi);
        localStorage.setItem("texts", JSON.stringify(texts))
    }
    save.value = "";
}

save.addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
        add()
    }
})

savebtn.addEventListener("click", ()=>{
    add()
})

document.addEventListener("click",(e)=>{
    let can = e.target.classList.contains("cancel")
    if(can){
        let b = e.target.closest(".areasaved")
        let text = b.querySelector(".savedtext").textContent;
        console.log(text)
        if(b){
            b.remove();
        }
        for(let i = 0;i < texts.length;i++){
            if(texts[i] === text){
                texts.splice(i,1);
                console.log("yes")
            }
        }
    }
    localStorage.setItem("texts", JSON.stringify(texts))
})