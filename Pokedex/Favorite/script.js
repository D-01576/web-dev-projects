let storedpokemon = []
if(localStorage.getItem("stared")){
    storedpokemon = JSON.parse(localStorage.getItem("stared"))
}

for (let i=0; i<storedpokemon.length; i++){
    storedpokemon[i] = parseInt(storedpokemon[i]); 
}

for (let i = 0; i < storedpokemon.length; i++) {
    for (let j = 0; j < storedpokemon.length - 1 - i; j++) {
        if (storedpokemon[j] > storedpokemon[j + 1]) {
            let temp = storedpokemon[j];
            storedpokemon[j] = storedpokemon[j + 1];
            storedpokemon[j + 1] = temp;
        }
    }
}
let main = document.querySelector(".main")
const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

async function engine(){
    for(let i = 0; i < storedpokemon.length; i++){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${storedpokemon[i]}`);
        const allpokemon = await response.json();
            
        let card = document.createElement("div")
        card.className = "card"
        let types = allpokemon.types.map(type => type.type.name);
        let typesHTML = types.map(type => `<p class="power" style="background-color: ${typeColors[type]}">${type}</p>`).join('');

        card.innerHTML = `<i class="fa fa-remove"></i><img src="${allpokemon.sprites.other["official-artwork"].front_default}" style="background: linear-gradient(180deg, ${typeColors[allpokemon.types[0].type.name]}, #65626200)">
        <p class="pokeid">#${allpokemon.id.toString().padStart(4, "0")}</p>
        <p class="pokemon">${allpokemon.name}</p>
        <div class="powerss">
          ${typesHTML}
        </div>`;
        main.appendChild(card);
        }
    }

    document.addEventListener("click", (event) => {
        const clickedCard = event.target.closest(".card");
        if (clickedCard) {
          const pokeimg = event.target.closest("img");
          const value = clickedCard.querySelector(".pokeid").textContent;
          localStorage.setItem("pokeimg",pokeimg.getAttribute('src'))
          localStorage.setItem('dtaKy', value);
          window.location.href = '/Pokedex/Pokemon/';
        }
      });
      document.addEventListener("click", (e)=>{
        const cancel = e.target.classList.contains("fa-remove")
        if(cancel){
            const card = e.target.closest(".card");
            const id = card.querySelector(".pokeid").textContent;
            if (card) {
               card.remove();
            }
            for(let i = 0; i < storedpokemon.length; i++){
                if(parseInt(id.slice(1)) === storedpokemon[i]){
                    storedpokemon.splice(i, 1);
                }
            }
            localStorage.setItem("stared", JSON.stringify(storedpokemon))
        }
      })
    engine()