let searchinput = document.getElementById("search");
let searchBTN = document.getElementById("searchBTN");
let temp = document.getElementById("temperature");
let tempcast = document.getElementById("namecast");
let humidity = document.querySelector("#hu");
let windspeed = document.getElementById("windspeed");
let image = document.getElementById("im");
let whole = document.querySelector(".whole");
let notfound = document.querySelector(".notfound")
let key = "1e87029128da3143c433bdce8c1925fa";

function check(){
    let city = searchinput.value;
    console.log(city);
    let p = fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+key+'');

    p.then(response => response.json()).then(data => {
        whole.style.display = "inline";
        notfound.style.display = "none";
        temp.innerHTML = Math.round((data.main.temp-273.15)*10)/10 + '°C';
        tempcast.innerHTML = data.weather[0].description;
        humidity.innerHTML = data.main.humidity + '%';
        windspeed.innerHTML= Math.round((data.wind.speed*3600/1000)*10)/10 + 'km/H'

        if(data.weather[0].main === "Clouds"){
            image.src = "img/cloud.png"
        }
        else if(data.weather[0].main === "Clear"){
            image.src = "img/clear.png"
        }
        else if(data.weather[0].main === "Rain"){
            image.src = "img/rain.png"
        }
        else if(data.weather[0].main === "Mist"){
            image.src = "img/mist.png"

        }
        else if(data.weather[0].main === "Snow"){
            image.src = "img/snow.png"
        }
    }).catch(error => {
    whole.style.display = "none";
    notfound.style.display = "flex";
    });

    searchinput.value = "";
}

search.addEventListener("keypress", (value) =>{
    if(value.key === "Enter"){
        check();
    }
})

searchBTN.addEventListener("click", check);