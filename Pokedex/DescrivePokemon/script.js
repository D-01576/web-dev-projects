let img = document.querySelector(".pokemonimg")
let pokename = document.querySelector(".name")
let flavourText = document.querySelector(".flavourText");
let height = document.querySelector(".height")
let weight = document.querySelector(".weight")
let abilities = document.querySelector(".abilities");
let gender = document.querySelector(".gender");
let stats = document.querySelector(".stats")
let weakness = document.querySelector(".weakness")

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

let a = localStorage.getItem("dtaKy");
let pokeimg = localStorage.getItem("pokeimg");
img.src = pokeimg;

async function pokemon(){
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${a}`);
    let data2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${a}`);
    let detail = await data2.json();
    let pokemon = await data.json();

    let types = detail.types.map(type => type.type.name);

    pokename.textContent = pokemon.name;
    console.log(detail);
    flavourText.textContent = pokemon.flavor_text_entries[0].flavor_text

    let hieghtinmeter = detail.height/10
    let heightinfeet = hieghtinmeter * 3.28084;
    let feets = Math.round(heightinfeet);
    let inches = Math.round((heightinfeet - feets) * 12)
    if(inches < 0){
        inches += 12;
        feets -= 1;
    }
    height.textContent = feets + '`' + inches.toString().padStart(2, "0")
    
    let weightinkg = detail.weight/10;
    let weightinlbs = Math.round(weightinkg * 2.20462);
    weight.textContent = weightinlbs + " lbs"

    abilities.textContent = detail.abilities[0].ability.name

    console.log(pokemon)
    let genderRate = pokemon.gender_rate
    if(genderRate <= 0){
        gender.textContent = "Male"
    }
    else if(genderRate >= 8){
        gender.textContent = "Female"
    }
    else{
        let FemalerRate = genderRate * 12.5;

        gender.textContent = `${FemalerRate}% Female`
    }

    let weak = detectweakness(types)
    weak.forEach(element => {
        let el = element.toLowerCase();
        console.log(el)
        let a = document.createElement("p");
        a.innerHTML = `<p class="weak" style="background-color: ${typeColors[el]}">${el}</p>`
        weakness.appendChild(a)
    });
    // let weakHTML = weak.map(type => `<p class="weak" style="background-color: ${typeColors[type]}">${type}</p>`).join('');
    let typesHTML = types.map(type => `<p class="power" style="background-color: ${typeColors[type]}">${type}</p>`).join('');

    stats.innerHTML = typesHTML;
    // weakness.innerHTML = weakHTML;
}

function detectweakness(types) {
    const weakness = {
      Normal: ['Fighting'],
      Fire: ['Water', 'Rock', 'Ground'],
      Water: ['Electric', 'Grass'],
      Electric: ['Ground'],
      Grass: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'],
      Ice: ['Fire', 'Fighting', 'Rock', 'Steel'],
      Fighting: ['Flying', 'Psychic', 'Fairy'],
      Poison: ['Ground', 'Psychic'],
      Ground: ['Water', 'Ice', 'Grass'],
      Flying: ['Electric', 'Ice', 'Rock'],
      Psychic: ['Bug', 'Ghost', 'Dark'],
      Bug: ['Fire', 'Flying', 'Rock'],
      Rock: ['Water', 'Grass', 'Fighting', 'Ground', 'Steel'],
      Ghost: ['Ghost', 'Dark'],
      Dragon: ['Ice', 'Dragon', 'Fairy'],
      Dark: ['Fighting', 'Bug', 'Fairy'],
      Steel: ['Fighting', 'Ground', 'Fire'],
      Fairy: ['Poison', 'Steel'],
    };
  
    let weaknesses = [];
  
    for (let type of types) {
      const typeName = type.charAt(0).toUpperCase() + type.slice(1);
      if (weakness[typeName]) {
        weaknesses.push(...weakness[typeName]);
      }
    }
    weaknesses = [...new Set(weaknesses)];
  
    return weaknesses;
  }
  

pokemon()
//   console.log("jkasd")