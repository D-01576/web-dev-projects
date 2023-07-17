let input = document.getElementById("input");
let output = document.getElementById("output");
let ans = document.getElementById("ans");
let again = document.getElementById("again");
let moves = 0;
let num = Math.floor(Math.random() % 1 *100);
console.log(num)

function againgame(){
    again.style.display = "none";
    num = Math.floor(Math.random() % 1 *100);
    output.innerHTML = "";
    moves = 0;
    console.log(num);
}

function guess(){
    let a = num
    if(input.value === ""){
        alert("input box is khali")
    }
    else if(input.value == a && moves <= 7){
        output.style.color = "darkgreen"
        output.innerHTML = "🏆Wow! you won the game";
        again.style.display = "inline";
        again.addEventListener("click", againgame);
        moves++
    }
    else if(input.value < a && moves < 7){
        output.style.color = "darkred";
        output.innerHTML = "❌The real number is greater than " + input.value;
        moves++
    }
    else if(input.value > a && moves < 7){
        output.style.color = "darkred";
        output.innerHTML = "❌The real number is less than " + input.value;
        moves++
    }
    if(input.value != a && moves == 7){
        output.style.color = "darkred";
        output.innerHTML= "🚫You lose the game the real num is " + num;
        again.style.display = "inline";
        again.addEventListener("click", againgame);
    }

    input.value = "";
}


input.addEventListener("keypress", (e) => {
    if (e.key === "Enter"){
        guess();
    }
})

ans.addEventListener("click" ,guess)
