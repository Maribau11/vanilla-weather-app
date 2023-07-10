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