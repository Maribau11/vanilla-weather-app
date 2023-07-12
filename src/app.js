let current = new Date();
let months = ["January","February", "March","April","May","June","July","August",
"September","November","December"];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = current.getDate();
let month = months[current.getMonth()];
let h3Day = document.querySelector("#current-day");
h3Day.innerHTML = `${days[current.getDay()]}, ${day} ${month}`;

let minute = current.getMinutes();
let hours = current.getHours();
let h3Time = document.querySelector("#current-time");
if(minute < 10)
{
  h3Time.innerHTML = `${hours}:0${minute}`;
}
else{
  h3Time.innerHTML = `${hours}:${minute}`;
}


function getWeather(response) {
    //Change the city name
    /************************************************************/
    let cityName = document.querySelector("#city-name");
    cityName.innerHTML = response.data.name;
    // gets current temp and displays it
    /***********************************************************/
    let currentTemp = Math.round(response.data.main.temp);
    let h3Temp = document.querySelector("#current-temp");

    h3Temp.innerHTML = `${currentTemp}`;
    /************************************************************/

    // gets weather info and displays it
    /************************************************************/
    let windspeed = document.querySelector("#wind");
    let humidity = document.querySelector("#hum");
    let highTemp = document.querySelector("#hi");
    let lowTemp = document.querySelector("#low");

    let currentWindspeed = Math.round(response.data.wind.speed);
    let currentHumidity = response.data.main.humidity;
    let currentHighTemp = Math.round(response.data.main.temp_max); 
    let currentLowTemp = Math.round(response.data.main.temp_min);

    windspeed.innerHTML = `<strong>Wind</strong>: ${currentWindspeed}km/hr`;
    humidity.innerHTML = `<strong>Humidy</strong>: ${currentHumidity}%`;
    highTemp.innerHTML = `<strong>High</strong>: ${currentHighTemp}°C`;
    lowTemp.innerHTML = `<strong>Low</strong>: ${currentLowTemp}°C`;
    /*****************************************************************/

    // Changes weather icon according to the weather
    /*****************************************************************/
    let icon = response.data.weather[0].icon;
    const image = document.querySelector("#icon");
    const div2 = document.querySelector(".weather-app");
  
    if (icon == "01d") {
      image.src="media/icon/sunny.png";
      div2.style.backgroundImage = "url('media/background/sunnyDay.jpg')";  
    } else if (icon == "02d") {
      image.src="media/icon/sunny-cloud.png";
      div2.style.backgroundImage = "url('media/background/scatteredCloudDay.jpg')";
    } else if (icon == "03d") {
      image.src="media/icon/cloudy.png";
      div2.style.backgroundImage = "url('media/background/partlyCloudyDay.jpg')";
    } else if (icon == "04d") {
      image.src="media/icon/partly-cloudy.png";
      div2.style.backgroundImage = "url('media/background/partlyCloudyDay.jpg')";
    } else if (icon == "09d") {
      image.src="media/icon/light-rain.png";
      div2.style.backgroundImage = "url('media/background/rainyDay.jpg')";
    } else if (icon == "10d") {
      image.src="media/icon/heavy-rain.png";
      div2.style.backgroundImage = "url('media/background/rainyDay.jpg')";
    } else if (icon == "11d") {
      image.src="media/icon/thunder.png";
      div2.style.backgroundImage = "url('media/background/thunderDay.jpg')";
    } else if (icon == "13d") {
      image.src="media/icon/snow.png";
      div2.style.backgroundImage = "url('media/background/snowyDay.jpg')";
    } else if (icon == "50d") {
      image.src="media/icon/mist.png";
      div2.style.backgroundImage = "url('media/background/mistyDay.jpg')";
    }
    /*****************************************************************/
  }
function searchCity(event){
  
  let newCity = document.querySelector("#input-city").value;
  let cityName = document.querySelector("#city-name");
  
  
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather); 
  
    
}
function clearInput() {
  document.getElementById("#input-city").value = "";
}

function displayFah(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempElement = document.querySelector("#current-temp");
  let tempSymbol= document.querySelector("#symbol");
  let celsiusTemp = tempElement.textContent;
  let fahrenheitTemp = (celsiusTemp*9)/5+32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
  tempSymbol.innerHTML = "°F";

}
function displayCel(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#current-temp");
  let tempSymbol = document.querySelector("#symbol");
  let fahrenheitTemp = tempElement.textContent;
  let celsiusTemp = (fahrenheitTemp -32) * 5 /9;
  tempElement.innerHTML = Math.round(celsiusTemp);
  tempSymbol.innerHTML = "°C";
}
let btnSearch = document.querySelector("#btn-search");
btnSearch.addEventListener("click",searchCity);
let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
let city = "Cape Town"
let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(`${currentUrl}`).then(getWeather);

let fahrenheitLink = document.querySelector("#fah-link");
fahrenheitLink.addEventListener("click", displayFah);

let celsiusLink = document.querySelector("#cel-link");
celsiusLink.addEventListener("click", displayCel);




