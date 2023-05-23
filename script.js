const apiKey = '53d1da66f8f7838016bdd48fd7c1ca6e';
//uses the OpenWeatherMap API

const searchBtn = document.querySelector("#search");
const searchInput = document.querySelector("input");
const weatherIcon = document.querySelector("#weather-icon");
const locationEl = document.querySelector(".location");
const daytimeEl = document.querySelector(".daytime");
const temperatureEl = document.querySelector(".temperature-value");
const minEl = document.querySelector('.min-value');
const maxEl = document.querySelector('.max-value');
const conditionsEl = document.querySelector(".conditions");
const coordinatesEl = document.querySelector("#coordinates");
const humidityEl = document.querySelector("#humidity");
const visibilityEl = document.querySelector("#visibility");
const rainEl = document.querySelector("#rain");
const pressureEl = document.querySelector("#pressure");
const windSpeedEl = document.querySelector("#wind-speed");

searchBtn.onclick = getWeather;

//get day and time in 'Monday 22 May 2023 10:52AM' format from API for daytimeEl

function getDayTime() {
  const now = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[now.getDay()];
  const date = now.getDate();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];

  const month = months[now.getMonth()];
  const year = now.getFullYear();
  let hour = now.getHours();
  let minute = now.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;
  minute = minute < 10 ? '0' + minute : minute;
  let time = `${day} ${date} ${month} ${year} ${hour}:${minute}${ampm}`;
  return time;
}


// get weather function
function getWeather() {
  const location = searchInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  //fetch API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      locationEl.textContent = ` ${data.name}, ${data.sys.country}`;
      daytimeEl.textContent = getDayTime();
      temperatureEl.textContent = ` ${(data.main.temp - 273.15).toFixed(1)}°C`;
      weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      conditionsEl.textContent = ` ${data.weather[0].description}`;
      minEl.textContent = `Min: ${(data.main.temp_min - 273.15).toFixed(1)}°C`;
      maxEl.textContent = `Max: ${(data.main.temp_max - 273.15).toFixed(1)}°C`;
      coordinatesEl.textContent = ` ${data.coord.lat}°, ${data.coord.lon}°`;
      humidityEl.textContent = ` ${data.main.humidity}%`;
      visibilityEl.textContent = ` ${data.visibility / 1000} km`;
      rainEl.textContent = ` ${data.rain ? data.rain['1h'] : 0} mm`;
      windSpeedEl.textContent = ` ${data.wind.speed} m/s`;
      pressureEl.textContent = ` ${data.main.pressure} hPa`;
    })
    .catch(error => console.log(error));
    // error message if not valid location
  if (locationEl.textContent === "") {
    locationEl.textContent = "Please enter a valid location";
  }
}