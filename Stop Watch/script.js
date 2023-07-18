let scrreen = document.getElementById("screen");
let play = document.getElementById("play");
let pause = document.getElementById("pause");
let mark = document.getElementById("mark");
let reset = document.getElementById("reset");
let listt = document.getElementById("storagearea");
let isrun;
let milisecond = 0;
let second = 0;
let minute = 0;
let total;

function showonscreen(){
    if(milisecond === 100){
        milisecond = 0;
        second++;
    }
    else if(second === 60){
        second = 0;
        minute++;
    }
    total = `${minute.toString().padStart(2, "0")} : ${second.toString().padStart(2, "0")} : ${milisecond.toString().padStart(2, "0")}`;
    scrreen.textContent = total;

        if(!isrun){
        milisecond++;
        setTimeout(function(){showonscreen()}, 10);
        }
}

play.addEventListener("click", function() {
    isrun = false;
    showonscreen();
    play.style.display = "none";
    pause.style.display = "inline";
})

pause.addEventListener("click", function(){
    play.style.display = "inline";
    pause.style.display = "none";
    isrun = true;
})

reset.addEventListener("click" ,function(){
    milisecond = 0;
    second = 0;
    minute = 0;
    if(isrun){
        showonscreen();
    }
})

mark.addEventListener("click" ,function(){
    if(milisecond > 0 || second > 0 || minute > 0){
    let marked = document.createElement("p");
    marked.innerHTML = '<p class="text">' + total + '</p>';
    listt.appendChild(marked)
    console.log(total);
    }
})
  