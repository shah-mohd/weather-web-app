
const API_KEY = "11c9018d58b48111b4d5b026f78ac935";

let btn = document.querySelector("[data-search]");
let searchInput = document.querySelector("[data-searchInput]");

btn.addEventListener("click", ()=>{
    let cityName = searchInput.value;
    console.log("city -- ", cityName);
    fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(cityName){
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        let responseData = await response.json();

        console.log(responseData);
        renderWeatherInfo(responseData);
    } catch(err){
        console.log("ERROR - ", err);
    }
}

function renderWeatherInfo(data){
    //firstly we have to fetch the elements
    let cityName = document.querySelector("[data-cityName]");
    let countryIcon = document.querySelector("[data-countryIcon]");
    let desc = document.querySelector("[data-weatherDesc]");
    let weatherIcon = document.querySelector("[data-weatherIcon]");
    let temp = document.querySelector("[data-temp]");

    //fetch values from weatherInfo object and put it UI elements
    cityName.innerText = data.name;
    // countryIcon.src = `https://flagcdn.com/144x108/${data.sys.country.toLowerCase()}.png`;
    countryIcon.src = `https://flagcdn.com/48x36/${data.sys.country.toLowerCase()}.png`;
    desc.innerText = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    temp.innerText = `${data.main.temp} °C`;
}