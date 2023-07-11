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
let year = current.getFullYear();
let h3Day = document.querySelector("#current-day");
h3Day.innerHTML = `${days[current.getDay()]}, ${day} ${month} ${year}`;

let minute = current.getMinutes();
let hours = current.getHours();
let h3Time = document.querySelector("#current-time");
h3Time.innerHTML = `${hours}:${minute}`;

function getWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let h3Temp = document.querySelector("#current-temp");

  h3Temp.innerHTML = `${currentTemp}°C`;
  console.log(response.data);

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

  let icon = response.data.weather[0].icon;
  const div = document.querySelector("#weather-icon");
  const body = document.querySelector("body");const img = document.createElement("img");
  if (icon == "01d") {
    img.setAttribute("src", "media/icon/sunny.png");
    document.body.style.backgroundImage = "url('media/background/sunnyDay.jpg')";
    
  } else if (icon == "02d") {
    img.setAttribute("src", "media/icon/sunny-cloud.png");
    document.body.style.backgroundImage =
      "url('media/background/cloudyDay.jpg')";
  } else if (icon == "03d") {
    img.setAttribute("src", "media/icon/cloud.png");
    document.body.style.backgroundImage =
      "url('media/background/partlyCloudyDay.jpg')";
  } else if (icon == "04d") {
    img.setAttribute("src", "media/icon/partialy-cloudy.png");
    document.body.style.backgroundImage =
      "url('media/background/partlyCloudyDay.jpg')";
  } else if (icon == "09d") {
    img.setAttribute("src", "media/icon/light-rain.png");
    document.body.style.backgroundImage =
      "url('media/background/rainyDay.jpg')";
  } else if (icon == "10d") {
    img.setAttribute("src", "media/icon/heavy-rain.png");
    document.body.style.backgroundImage =
      "url('media/background/rainyDay.jpg')";
  } else if (icon == "11d") {
    img.setAttribute("src", "media/icon/thunder.png");
    document.body.style.backgroundImage =
      "url('media/background/thunderDay.jpg')";
  } else if (icon == "13d") {
    img.setAttribute("src", "media/icon/snow.png");
    document.body.style.backgroundImage =
      "url('media/background/snowyDay.jpg')";
  } else if (icon == "50d") {
    img.setAttribute("src", "media/icon/mist.png");
    document.body.style.backgroundImage =
      "url('media/background/mistyDay.jpg')";
  }
  div.appendChild(img);
}
function getForecast(response){
    console.log(response.data);
}
let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
let city = "Cape Town"
let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(`${currentUrl}`).then(getWeather);

let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`;
axios.get(forecastUrl).then(getForecast);