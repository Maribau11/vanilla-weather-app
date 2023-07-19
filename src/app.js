let current = new Date();
function getDay() {
  /******* FUNCTION TO GET THE CURRENT DATE ***********************/
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
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
}
function getTime() {
  /******* FUNCTION TO GET THE CURRENT TIME ****************/
  let minute = current.getMinutes();
  let hours = current.getHours();
  let h3Time = document.querySelector("#current-time");
  
  if (hours < 10) {
    if (minute < 10) {
      h3Time.innerHTML = `0${hours}:0${minute}`;
    } else {
      h3Time.innerHTML = `${hours}:0${minute}`;
    }
  } else {
    if (minute < 10) {
      h3Time.innerHTML = `${hours}:0${minute}`;
    } else {
      h3Time.innerHTML = `${hours}:${minute}`;
    }
  }
}
function formatForecastDay(timestamp){
  let date = new Date(timestamp * 1000);
 let days = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
 ]; 
  let day = days[date.getDay()];

  return day;

}
function getCityName(response){
  /******* FUNCTION RETURNS THE NAME OF THE CITY **************/
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name.toUpperCase();
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = '<div class="row">';
  forecast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
            <div class="col">
                <div class="date">${formatForecastDay(forecast[index+1].time)}</div>
                <img src="${forcastDay.condition.icon_url}" alt="" width="42">
                <div class="forecast-temp">
                    <span class="max-temp">${Math.round(
                      forcastDay.temperature.maximum
                    )}°C</span> <span class="min-temp">${Math.round(
          forcastDay.temperature.minimum
        )}°C</span>
                </div>
            </div>`;
    }
  });
   

  forecastHtml = forecastHtml + `</div>`;

  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates){
  let key = "9df4ed10d34b5afafe2b748364cb2t0o";
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${key}`;
  axios.get(forecastUrl).then(displayForecast);
}
function getCurrentTemp(response){
  /******* FUNCTION RETURNS THE CURRENT TEMPERATURE *************/
  let currentTemp = Math.round(response.data.main.temp);
  let h3Temp = document.querySelector("#current-temp");
  h3Temp.innerHTML = `${currentTemp}`;
  getForecast(response.data.coord);
}
function weatherInfo(response){
  /****** FUNCTION RETURNS THE WEATHER INFORMATION ****/
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

}
function changeTextColor(elem){
elem.style.color= "white";
}
function changeIcons(response){
  /**** FUNCTION CHANGES THE ICON AND BACKGROUND ACCORDING TO THE WEATHER *******/
  let icon = response.data.weather[0].icon;
  const image = document.querySelector("#icon");
  const div2 = document.querySelector(".weather-app");
 // const text = document.querySelector("")

  if (icon == "01d") {
    image.src = "src/media/icon/sunny.png";
    div2.style.backgroundImage = "url('src/media/background/sunnyDay.jpg')";
  } else if (icon == "02d") {
    image.src = "src/media/icon/sunny-cloud.png";
    div2.style.backgroundImage =
      "url('src/media/background/scatteredCloudDay.jpg')";
  } else if (icon == "03d") {
    image.src = "src/media/icon/cloudy.png";
    div2.style.backgroundImage =
      "url('src/media/background/partlyCloudyDay.jpg')";
  } else if (icon == "04d") {
    image.src = "src/media/icon/partly-cloudy.png";
    div2.style.backgroundImage =
      "url('src/media/background/partlyCloudyDay.jpg')";
  } else if (icon == "09d") {
    image.src = "src/media/icon/light-rain.png";
    div2.style.backgroundImage = "url('src/media/background/rainyDay.jpg')";
  } else if (icon == "10d") {
    image.src = "src/media/icon/heavy-rain.png";
    div2.style.backgroundImage = "url('src/media/background/rainyDay.jpg')";
  } else if (icon == "11d") {
    image.src = "src/media/icon/thunder.png";
    div2.style.backgroundImage = "url('src/media/background/thunderDay.jpg')";
  } else if (icon == "13d") {
    image.src = "src/media/icon/snow.png";
    div2.style.backgroundImage = "url('src/media/background/snowyDay.jpg')";
  } else if (icon == "50d") {
    image.src = "src/media/icon/mist.png";
    div2.style.backgroundImage = "url('src/media/background/mistyDay.jpg')";
  }
}

function getWeather(response) {
  getCityName(response);
  getCurrentTemp(response);
  weatherInfo(response);
  changeIcons(response);
}
function searchCity(event) {
  let newCity = document.querySelector("#input-city").value;
  let cityName = document.querySelector("#city-name");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}
function clearInput() {
  document.getElementById("#input-city").value = "";
}

function displayFah(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempElement = document.querySelector("#current-temp");
  let tempSymbol = document.querySelector("#symbol");
  let celsiusTemp = tempElement.textContent;
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
  tempSymbol.innerHTML = "°F";
}
function displayCel(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#current-temp");
  let tempSymbol = document.querySelector("#symbol");
  let fahrenheitTemp = tempElement.textContent;
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celsiusTemp);
  tempSymbol.innerHTML = "°C";
}
let btnSearch = document.querySelector("#btn-search");
let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
let city = "Cape Town";
let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//let forecastUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
let fahrenheitLink = document.querySelector("#fah-link");
let celsiusLink = document.querySelector("#cel-link");


getDay();
getTime();
btnSearch.addEventListener("click", searchCity);
document
  .querySelector("#input-city")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchCity();
    }
  });
axios.get(`${currentUrl}`).then(getWeather);
fahrenheitLink.addEventListener("click", displayFah);
celsiusLink.addEventListener("click", displayCel);