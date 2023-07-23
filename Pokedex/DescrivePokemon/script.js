let upgrade = [];

let main = document.querySelector(".main")
let loading = document.querySelector("#loading")
let img = document.querySelector(".pokemonimg")
let pokename = document.querySelector(".name")
let id = document.querySelector(".id")
let flavourText = document.querySelector(".flavourText");
let height = document.querySelector(".height")
let weight = document.querySelector(".weight")
let abilities = document.querySelector(".abilities");
let gender = document.querySelector(".gender");
let stats = document.querySelector(".stats");
let weakness = document.querySelector(".weakness");
let hp = document.getElementById("forhp");
let attack = document.getElementById("forattack");
let defense = document.getElementById("fordefense");
let specialattack = document.getElementById("forspecialattack");
let specialdefense = document.getElementById("forspecialdefense");
let speed = document.getElementById("forspeed")
let evolution = document.querySelector(".chain")

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

let a = parseInt(localStorage.getItem("dtaKy").slice(1));
let pokeimg = localStorage.getItem("pokeimg");
img.src = pokeimg;

async function pokemon(){
    evolution.style.display = "none";
    pokename.style.display = "none"
    loading.style.display = "flex";
    main.style.display = "none";
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${a}`);
    let data2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${a}`);
    let detail = await data2.json();
    let pokemon = await data.json();
  console.log(detail)
    let types = detail.types.map(type => type.type.name);

    pokename.textContent = pokemon.name;
    id.textContent = '#'+pokemon.id.toString().padStart(4, "0");

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

    let typesHTML = types.map(type => `<p class="power" style="background-color: ${typeColors[type]}">${type}</p>`).join('');

    stats.innerHTML = typesHTML;
    
    let hpval = Math.round(detail.stats[0].base_stat/10);
    let attckval = Math.round(detail.stats[1].base_stat/10);
    console.log(attckval)
    let defenseval = Math.round(detail.stats[2].base_stat/10);
    let specialattackval = Math.round(detail.stats[3].base_stat/10);
    let specialdefenseval = Math.round(detail.stats[4].base_stat/10);
    let speedval = Math.round(detail.stats[5].base_stat/10);

    for(let i = 0; i < hpval;i++){
      let a = document.createElement("p");
      a.innerHTML = `<p class="set" style="grid-column-start: ${i+1}">,</p>`;
      hp.appendChild(a);
    }

    for(let i = 0; i < attckval;i++){
      let a = document.createElement("p");
      a.innerHTML = `<p class="set" style="grid-column-start: ${i+1}">,</p>`
      attack.appendChild(a)
    }

    for(let i = 0; i < defenseval;i++){
      let a = document.createElement("p");
      a.innerHTML = `<p class="set" style="grid-column-start: ${i+1}">,</p>`
      defense.appendChild(a)
    }

    for(let i = 0; i < specialattackval;i++){
      let a = document.createElement("p");
      a.innerHTML = `<p class="set" style="grid-column-start: ${i+1}">,</p>`
      specialattack.appendChild(a)
    }

    for(let i = 0; i < specialdefenseval;i++){
      let a = document.createElement("p");
      a.innerHTML = `<p class="set" style="grid-column-start: ${i+1}">,</p>`
      specialdefense.appendChild(a)
    }

    for(let i = 0; i < speedval;i++){
      let a = document.createElement("p");
      a.innerHTML = `<p class="set" style="grid-column-start: ${i+1}">,</p>`
      speed.appendChild(a)
    }
    if(pokemon.evolves_from_species != null){
    upgrade.push(pokemon.evolves_from_species.name);
    let pokk = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${upgrade[0]}`);
    let pokkdetail = await pokk.json();
    if(pokkdetail.evolves_from_species != null){
    upgrade.push(pokkdetail.evolves_from_species.name);
    }
  }
    if(upgrade.length > 1){
      let temp = upgrade[0]
      upgrade[0] = upgrade[1]
      upgrade[1] = temp;
    }
    upgrade.push(detail.name)
    console.log(upgrade)
    for(let i = 0; i < upgrade.length; i++){
      let a = document.createElement("div");
      a.classList = "circlecard";
      let pokedata = await fetch(`https://pokeapi.co/api/v2/pokemon/${upgrade[i]}`);
      let respoke = await pokedata.json();
      let poketypes = respoke.types.map(type => type.type.name);
      let poketypesHTML = poketypes.map(type => `<p class="pokepower" style="background-color: ${typeColors[type]}">${type}</p>`).join('')
      a.innerHTML = `<img src="${respoke.sprites.other["official-artwork"].front_default}" alt="">
      <p class="pookname">${upgrade[i]}</p><div class="poketypes">${poketypesHTML}</div>`
      evolution.appendChild(a);
      if (i != upgrade.length - 1){
        let arrow = document.createElement("div");
        let txt = document.createElement("h2");
        txt.innerHTML = '<i class="fa-solid fa-arrow-right">';
        arrow.appendChild(txt);
        evolution.appendChild(arrow);
      }
    };
    loading.style.display = "none";
    evolution.style.display = "flex";
    pokename.style.display = "flex"
    main.style.display = "flex";
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