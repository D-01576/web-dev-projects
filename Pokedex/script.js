let stared = [];
if(localStorage.getItem("stared")){
stared = JSON.parse(localStorage.getItem("stared"))
}

let main = document.querySelector(".main");
let leadddd = document.querySelector(".leaadmore");
let seach = document.querySelector("#pokemon");
let pokelist = document.querySelector("#pokemon-list");
let searchcard = document.querySelector(".searchcard");
let seachimg = document.querySelector("#seachimg");
let notfound = document.querySelector(".notfound");
let allthe = document.querySelector(".title");
let loading = document.querySelector("#loading");
let searchbtn = document.querySelector(".searchbtn")
let searchbox = document.querySelector(".searchbox")
let second = 23;
let first = 1;
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

async function fetchKantoPokemon() {
  for (let i = first; i <= second; i++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const allpokemon = await response.json();

      let types = allpokemon.types.map(type => type.type.name);

      let imgElement = document.createElement("div");
      imgElement.className = "card";

      let filledstar = "none";
      let star = "flex";
      for(let m = 0; m < stared.length; m++){
       if(stared[m] == i){
            filledstar = "flex";
            star = "none"
          }
      }
      let typesHTML = types.map(type => `<p class="power" style="background-color: ${typeColors[type]}">${type}</p>`).join('');
      imgElement.innerHTML = `
        <img src="${allpokemon.sprites.other["official-artwork"].front_default}" style="background: linear-gradient(180deg, ${typeColors[allpokemon.types[0].type.name]}, #65626200)">
        <p class="pokeid">#${i.toString().padStart(4, "0")}</p>
        <p class="pokemon">${allpokemon.name}</p>
        <div class="powerss">
          ${typesHTML}
        </div>
        <div class="stars">
        <i class="fa-regular fa-star" id="${i}" style="display: ${star};"></i>
        <i class="fa-solid fa-star" id="${i}" style="display: ${filledstar};"></i>
        </div>
      `;

      main.appendChild(imgElement);
    } catch (error) {
    }
  }
  main.appendChild(leadddd);
  leadddd.style.display = "inline";
}



async function searchwarofunction(){
  let value = seach.value;
  if(value != ""){
    allthe.style.display = "flex";
    main.style.display = "none";
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
    const allpokemon = await response.json();

    let types = allpokemon.types.map(type => type.type.name);

    let typesHTML = types.map(type => `<p class="searchpower" style="background-color: ${typeColors[type]}">${type}</p>`).join('');

    let filledstar = "none";
      let star = "flex";
      for(let m = 0; m < stared.length; m++){
       if(stared[m] == allpokemon.id){
            filledstar = "flex";
            star = "none"
          }
      }
    searchcard.innerHTML = `
    <img src="${allpokemon.sprites.other["official-artwork"].front_default}" style="background: linear-gradient(180deg, ${typeColors[allpokemon.types[0].type.name]}, #65626200">
    <p class="searchpokeid">#${allpokemon.id.toString().padStart(4, "0")}</p>
    <p class="searchpokemon">${allpokemon.name}</p>
    <div class="searchpowerss">
          ${typesHTML}
    </div>
    <div class="stars">
        <i class="fa-regular fa-star" id="${allpokemon.id}" style="display: ${star};"></i>
        <i class="fa-solid fa-star" id="${allpokemon.id}" style="display: ${filledstar};"></i>
        </div>`;
    searchcard.style.display = "flex";
    notfound.style.display = "none";
    loading.style.display = "none";
  } catch (error) {
    loading.style.display = "none";
    notfound.style.display = "flex";
    searchbox.style.display = "flex"
    searchcard.style.display = "none";
  }
}
else{
  main.style.display = "flex";
  allthe.style.display = "none";
  searchcard.style.display = "none";
  notfound.style.display = "none";
}
}

async function listthepokemon(){
  for(let i = 1; i < 1262; i++){
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const allpokemon = await response.json();

    let nameof = document.createElement("option")
    nameof.innerHTML = `<option value="${allpokemon.name}">`;
    pokelist.appendChild(nameof);
  } catch (error) {
  }
}
}

leadddd.addEventListener("click", ()=>{
    leadddd.style.display = "none"
    first = second + 1;
    second = second + 24;
    fetchKantoPokemon()
  })

  function just(){
    loading.style.display = "flex";
    if(loading.style.display === "flex"){
      notfound.style.display = "none"
      searchcard.style.display = "none"
    }
    searchwarofunction();
  }
seach.addEventListener("keypress" ,(val)=>{
  if(val.key === "Enter"){
      // val = event || window.event;
      // event.preventDefault();
      // window.history.pushState({},"",event.target.value)
    just();
  }
})

seach.addEventListener("input",()=>{
  if(seach.value === ""){
    // event.preventDefault();
    // window.history.pushState({},"","ad");
    allthe.style.display = "none";
    main.style.display = "flex";
  }
})

searchbtn.addEventListener("click" , just)

fetchKantoPokemon();
listthepokemon();

document.addEventListener("click", (event) => {
  localStorage.clear();
  const clickedCard = event.target.closest(".card");
  const searchevent = event.target.closest(".searchcard");
  if (clickedCard) {
    const pokeimg = event.target.closest("img");
    const value = clickedCard.querySelector(".pokeid").textContent;
    const pokkname = clickedCard.querySelector(".pokemon").textContent;
    localStorage.setItem("pokeimg",pokeimg.getAttribute('src'))
    localStorage.setItem('dtaKy', value);
    localStorage.setItem("pokemonname", pokkname)
    window.location.href = 'DescrivePokemon/index.html';
    // event.preventDefault();
    // window.history.pushState({},"",pokkname);
  }
  else if (searchevent) {
    const pokeimg = event.target.closest("img");
    const value = searchevent.querySelector(".searchpokeid").textContent;
    localStorage.setItem("pokeimg",pokeimg.getAttribute('src'))
    localStorage.setItem('dtaKy', value);
    window.location.href = 'DescrivePokemon/index.html';
  }
});

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
      stared.push(value)
  } else if (filledstar) {
    let starElement = e.target.previousElementSibling; // Assuming the regular star comes before the filled star
    showFilledStar(starElement, e.target);
    let value = e.target.id;
    for(let i = 0; i < stared.length; i++){
      if(value === stared[i]){
        stared.splice(i, 1)
      }
    }
  }
    localStorage.setItem("stared", JSON.stringify(stared))
});
