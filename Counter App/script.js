let btnIncrease = document.getElementById("increase");
let btndecrease = document.getElementById("decrease");
let btnzero = document.getElementById("setzero");
let display = document.getElementById("countshow");
let count = 0;

function increase(){
    count++;
    display.innerHTML = count;
}

function decrease(){
    if(count > 0){
        count--;
        console.log(count);
        display.innerHTML = count;
    }
    else{
        alert("Negatice Number Are Not Allowed");
    }
}

function zero(){
    count = 0;
    display.innerHTML = count;
}

btnIncrease.addEventListener("click", increase);
btndecrease.addEventListener("click" , decrease);
btnzero.addEventListener("click" , zero);