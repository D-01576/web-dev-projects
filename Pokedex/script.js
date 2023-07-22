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

      let typesHTML = types.map(type => `<p class="power" style="background-color: ${typeColors[type]}">${type}</p>`).join('');
      imgElement.innerHTML = `
      <p class="pokeid">${i}</p>
        <img src="${allpokemon.sprites.other["official-artwork"].front_default}">
        <p class="pokemon">${allpokemon.name}</p>
        <div class="powerss">
          ${typesHTML}
        </div>
      `;

      main.appendChild(imgElement);
      console.log(allpokemon);
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

    searchcard.innerHTML = `
    <p class="searchpokeid">${allpokemon.id}</p><img src="${allpokemon.sprites.other["official-artwork"].front_default}">
    <p class="searchpokemon">${allpokemon.name}</p>
    <div class="searchpowerss">
          ${typesHTML}
    </div>`;
    searchcard.style.display = "flex";
    notfound.style.display = "none";
    loading.style.display = "none";
    console.log(allpokemon)
  } catch (error) {
    loading.style.display = "none";
    notfound.style.display = "flex";
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
    console.log("");
  }
}
}

leadddd.addEventListener("click", ()=>{
    leadddd.style.display = "none"
    first = second + 1;
    second = second + 1010;
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
  const searchevent = event.target.closest(".searchcard")
  if (clickedCard) {
    const pokeimg = event.target.closest("img");
    const value = clickedCard.querySelector(".pokeid").textContent;
    localStorage.setItem("pokeimg",pokeimg.getAttribute('src'))
    localStorage.setItem('dtaKy', value);
    window.location.href = 'DescrivePokemon/index.html';
  }
  else if (searchevent) {
    const pokeimg = event.target.closest("img");
    const value = searchevent.querySelector(".searchpokeid").textContent;
    localStorage.setItem("pokeimg",pokeimg.getAttribute('src'))
    localStorage.setItem('dtaKy', value);
    window.location.href = 'DescrivePokemon/index.html';
  }
});

