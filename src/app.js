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

function getResponse(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let h3Temp = document.querySelector("#current-temp");

  h3Temp.innerHTML = `${currentTemp}°C`;
  console.log(response.data);
}
let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
let city = "Cape Town"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}`).then(getResponse);