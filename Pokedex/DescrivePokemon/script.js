let upgrade = [];
let staredd = []
if(localStorage.getItem("stared")){
  staredd = JSON.parse(localStorage.getItem("stared"));
}

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
let backpoknum =  document.querySelector(".backpoknum")
let backpokname = document.querySelector(".backpokname");
let forpokname = document.querySelector(".forpokname")
let forpoknum = document.querySelector(".forpoknum")
let stars = document.querySelector(".stars");

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
// img.src = pokeimg;

async function pokemon(){
    evolution.style.display = "none";
    pokename.style.display = "none"
    loading.style.display = "flex";
    main.style.display = "none";
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${a}`);
    let data2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${a}`);
    let detail = await data2.json();
    let pokemon = await data.json();
    let filledstar = "none";
    let star = "flex";
      for(let m = 0; m < staredd.length; m++){
      if(staredd[m] == a){
            filledstar = "flex";
            star = "none"
          }
    }
    stars.innerHTML = `
        <i class="fa-regular fa-star" id="${detail.id}" style="display: ${star};"></i>
        <i class="fa-solid fa-star" id="${detail.id}" style="display: ${filledstar};"></i>
        `

    img.src = detail.sprites.other["official-artwork"].front_default

    if(a>1){
    let firstpok = await fetch(`https://pokeapi.co/api/v2/pokemon/${a-1}`);
    let firstdetail = await firstpok.json();
    backpoknum.textContent = "#"+firstdetail.id.toString().padStart(4, "0");
    backpokname.textContent = firstdetail.name;
}
  if(a < 1010){
    let secondpok = await fetch(`https://pokeapi.co/api/v2/pokemon/${a+1}`);
    let seconddetail = await secondpok.json();
    forpoknum.textContent = "#"+seconddetail.id.toString().padStart(4, "0");
    forpokname.textContent = seconddetail.name;
}

    let types = detail.types.map(type => type.type.name);

    pokename.textContent = pokemon.name;
    id.textContent = '#'+pokemon.id.toString().padStart(4, "0");

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
        let a = document.createElement("p");
        a.innerHTML = `<p class="weak" style="background-color: ${typeColors[el]}">${el}</p>`
        weakness.appendChild(a)
    });

    let typesHTML = types.map(type => `<p class="power" style="background-color: ${typeColors[type]}">${type}</p>`).join('');

    stats.innerHTML = typesHTML;
    
    let hpval = Math.round(detail.stats[0].base_stat/10);
    let attckval = Math.round(detail.stats[1].base_stat/10);
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
    for(let i = 0; i < upgrade.length; i++){
      let a = document.createElement("div");
      a.classList = "circlecard";
      let pokedata = await fetch(`https://pokeapi.co/api/v2/pokemon/${upgrade[i]}`);
      let respoke = await pokedata.json();
      let poketypes = respoke.types.map(type => type.type.name);
      let poketypesHTML = poketypes.map(type => `<p class="pokepower" style="background-color: ${typeColors[type]}">${type}</p>`).join('')
      a.innerHTML = `<img src="${respoke.sprites.other["official-artwork"].front_default}" alt="" class="circleimg" id=${respoke.id.toString().padStart(4, "0")}>
      <p class="pookname">${upgrade[i]}<span class="chainpokeid">#${respoke.id.toString().padStart(4, "0")}</span></p><div class="poketypes">${poketypesHTML}</div>`
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
  

let back = document.getElementById("backword")

back.addEventListener("click", ()=>{
  let value = backpoknum.textContent;
  if(parseInt(value.slice(1)) > 0){
  localStorage.setItem('dtaKy', value);
  window.location.reload();
  }
})

let forword = document.getElementById("forword")

forword.addEventListener("click", ()=>{
  let value = forpoknum.textContent;
  if(parseInt(value.slice(1)) < 1011){
  localStorage.setItem('dtaKy', value);
  window.location.reload()}
})

let circleimg = document.querySelector("#circleimg")

document.addEventListener("click", (e)=>{
  if (e.target.classList.contains("circleimg")){
    let value = e.target.id;
    localStorage.setItem('dtaKy', value);
    window.location.reload()
  }
})
pokemon()

function showStar(star, filledstar) {
  if (star && filledstar) {
    star.style.display = "none";
    filledstar.style.display = "flex";
  }
}

function showFilledStar(star, filledstar) {
  if (star && filledstar) {
    star.style.display = "flex";
    filledstar.style.display = "none";
  }
}

document.addEventListener("click", (e) => {
  let star = e.target.classList.contains("fa-regular");
  let filledstar = e.target.classList.contains("fa-solid");
  if (star) {
    let filledStarElement = e.target.nextElementSibling; // Assuming the filled star follows the regular star
    showStar(e.target, filledStarElement);
    let value = e.target.id;
      staredd.push(value)
  } else if (filledstar) {
    let starElement = e.target.previousElementSibling; // Assuming the regular star comes before the filled star
    showFilledStar(starElement, e.target);
    let value = e.target.id;
    for(let i = 0; i < staredd.length; i++){
      if(value == staredd[i]){
        staredd.splice(i, 1)
      }
    }
  }
    localStorage.setItem("stared", JSON.stringify(staredd))
});