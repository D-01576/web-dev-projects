let searchword = document.querySelector("#search");
let searchbtn = document.querySelector("#searchBTN")
let resultt = document.querySelector(".result")
let wordar = document.querySelector(".wordiv")
let wordof = document.querySelector(".word");
let nothing = document.querySelector(".notfound")
let phonetics = document.querySelector(".phonetics");

function api(){
    while (resultt.firstChild) {
        resultt.removeChild(resultt.firstChild);
    }
    let word = searchword.value;
    let p = fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word);
 
    p.then(response => response.json()).then(data =>{
        wordar.style.display = "flex";
        resultt.style.display = "inline";
        nothing.style.display= "none";
        console.log(data[0])
        wordof.innerHTML = word;
        if(data[0].phonetic){
        phonetics.innerHTML = data[0].phonetic;
        }
        for(let i = 0 ; i < data[0].meanings.length; i++){
            let synonyms = "";
            let antonyms = "";
            let definition = "";

            for(let j = 0; j < data[0].meanings[i].definitions.length; j++){
                definition += "- "+ data[0].meanings[i].definitions[j].definition + '<br><br>';
            }

            for(let j = 0; j < data[0].meanings[i].antonyms.length; j++){
                antonyms += data[0].meanings[i].antonyms[j] + ", ";
            }

            for(let j = 0; j < data[0].meanings[i].synonyms.length; j++){
                synonyms += data[0].meanings[i].synonyms[j] + ", ";
            }

            let a = document.createElement("div");
            a.innerHTML = `
            <h2 class="pos">${data[0].meanings[i].partOfSpeech}</h2>
            <h3 class="dt">definition</h3>
            <p class="description">${definition}</p>
            <h3 class="st">Synonyms:</h3>
            <p class="synonyms">- ${synonyms}</p>
            <h3 class="at">Antonyms:</h3>
            <p class="antonyms">- ${antonyms}</p>`;
            resultt.appendChild(a);

            synonyms = "";
            antonyms = "";
            definition = "";
        }
        
    }).catch(Error =>{
        wordar.style.display = "none";
        resultt.style.display = "none";
        nothing.style.display= "flex";
    })
    searchword.value = "";
}

search.addEventListener("keypress", (val)=>{
    if(val.key === "Enter"){
        api();
    }
})
searchbtn.addEventListener("click", api);