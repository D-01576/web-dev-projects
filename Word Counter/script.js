let textarea = document.querySelector(".textarea");
let word = document.querySelector(".word");
let letter = document.querySelector(".letter")
let words = 0;

function checkcount(text){
    text = text.trim(" ")

    words = text.split(/\s+/);

    words = words.filter(word => word.length > 0);

    return words.length;
}
textarea.addEventListener("input", ()=>{
        word.innerHTML = checkcount(textarea.value) + " words"
        let letters = textarea.value;
        letters = letters.replace(/\s/g,"");
        letter.innerHTML = letters.length + " letters";
})