let options = [];
let container = document.querySelector(".container")
let main = document.querySelector(".main")
let load = document.querySelector(".load")
let correctvoice = new Audio("/Pokedex/audio/correct.wav")
let wrongvoice =  new Audio("/Pokedex/audio/wrong.mp3")
let tap = new Audio("/Pokedex/audio/tap.mp3")
let start = document.querySelector(".start")
let timer = document.querySelector(".timer")
let op1 = document.querySelector(".option1")
let op2 = document.querySelector(".option2")
let op3 = document.querySelector(".option3")
let op4 = document.querySelector(".option4")
let img  = document.querySelector(".img")
let score = document.querySelector(".score")
let life1 = document.querySelector("#life1")
let life2 = document.querySelector("#life2")
let life3 = document.querySelector("#life3")
let next = document.querySelector(".next")
let portionout = document.querySelector(".portionout")
let playagain = document.querySelector(".playagain")
let scoreout = document.querySelector(".out");
let countscore = 0;
let lifes = 3;
let selectedname;
let isOptionClicked = false;
let time = 15;

function createoption(){
    next.style.display = "none"
    main.style.display = "none";
    load.style.display = "block";
    let option1;
    let option2;
    let option3;
    let option4;
    option1 = Math.floor(Math.random() * 1010) + 1;
    options.push(option1);
    do {
        option2 = Math.floor(Math.random() * 1010) + 1;
    }
    while (options.includes(option2));
    options.push(option2);
    do {
        option3 = Math.floor(Math.random() * 1010) + 1;
    }
    while (options.includes(option3));
    options.push(option3);
    do {
        option4 = Math.floor(Math.random() * 1010) + 1;
    }
    while (options.includes(option4));
    options.push(option4);
}

async function game(){
    createoption()
    let selected = Math.floor(Math.random() * 4) + 1;
    container.style.display = "flex"
    start.style.display ="none"
    let data1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${options[0]}`)
    let name1 = await data1.json();
    let data2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${options[1]}`)
    let name2 = await data2.json();
    let data3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${options[2]}`)
    let name3 = await data3.json();
    let data4 = await fetch(`https://pokeapi.co/api/v2/pokemon/${options[3]}`)
    let name4 = await data4.json();
    img.src = eval(`name${selected}`).sprites.other["official-artwork"].front_default;
    selectedname = eval(`name${selected}`).name;
    op1.textContent = name1.name;
    op2.textContent = name2.name;
    op3.textContent = name3.name;
    op4.textContent = name4.name

    function tr(){
        setTimeout(()=>{
            if (time > 0 && isOptionClicked === false){
                time--;
                timer.textContent = time;
                tr();
            }
            else if(time === 0 && isOptionClicked === false){
                next.style.display = "inline";
                wrongvoice.play();
                lifes--;
                isOptionClicked = true;
                img.style.filter = "brightness(1)"
                gameout()
            }
            else if(time === 1 && isOptionClicked === false){
                isOptionClicked = true;
            }
            else{
                isOptionClicked = true;
                img.style.filter = "brightness(1)"
            }
            showcorrectoption();
            showlife();
        }, 1000)
    }
    tr();
    main.style.display = "flex";
    load.style.display = "none";
    console.log(selectedname)
}

start.addEventListener("click", ()=>{
    tap.play();
    game();
    showlife()
})

function detectcorrect(col, yourop, selected) {
    if (!isOptionClicked) {
        isOptionClicked = true;
        if (yourop === selected) {
            correctvoice.play();
            countscore++;
            score.textContent = "Score : " + countscore
            col.style.background = "green";
        } else {
            wrongvoice.play();
            lifes--;
            col.style.background = "red";
        }
        next.style.display = "inline";
    }
    gameout()
}
op1.addEventListener("click", () => {
    detectcorrect(op1, op1.textContent, selectedname);
});
op2.addEventListener("click", () => {
    detectcorrect(op2, op2.textContent, selectedname);
});
op3.addEventListener("click", () => {
    detectcorrect(op3, op3.textContent, selectedname);
});
op4.addEventListener("click", () => {
    detectcorrect(op4, op4.textContent, selectedname);
});

next.addEventListener("click", ()=>{
    if(lifes > 0){
    time = 15;
    tap.play();
    op1.style.background = "orange";
    op2.style.background = "orange";
    op3.style.background = "orange";
    op4.style.background = "orange";
    img.style.filter = "brightness(0)"
    isOptionClicked = false;
    options = [];
    createoption();
    game();
    }
})

function gameout(){
    if(lifes === 0){
        setTimeout(() => {
            scoreout.textContent = `Your score is ${countscore}` 
            portionout.style.display = "flex";
            container.style.display = "none"
        }, 2000);
    }
}

playagain.addEventListener("click", ()=>{
    time = 15;
    tap.play();
    portionout.style.display = "none"
    countscore = 0;
    score.textContent = "Score : "+countscore;
    img.style.filter = "brightness(0)"
    lifes = 3;
    isOptionClicked = false;
    options = [];
    createoption();
    game()
    op1.style.background = "orange";
    op2.style.background = "orange";
    op3.style.background = "orange";
    op4.style.background = "orange";
})

function showcorrectoption(){
if(isOptionClicked === true){
    if(op1.textContent === selectedname){
        op1.style.background = "green"
    }
    if(op2.textContent === selectedname){
        op2.style.background = "green"
    }
    if(op3.textContent === selectedname){
        op3.style.background = "green"
    }
    if(op4.textContent === selectedname){
        op4.style.background = "green"
    }
}
}

function showlife(){
    if(lifes === 3){
        life1.style.display = "flex";
        life2.style.display = "flex";
        life3.style.display = "flex";
    }
    else if(lifes === 2){
        life1.style.display = "none";
        life2.style.display = "flex";
        life3.style.display = "flex";
    }
    else if(lifes === 1){
        life1.style.display = "none";
        life2.style.display = "none";
        life3.style.display = "flex";
    }
    else if(lifes === 0){
        life1.style.display = "none";
        life2.style.display = "none";
        life3.style.display = "none";
    }
}