const apiKey = '53d1da66f8f7838016bdd48fd7c1ca6e';
//uses the OpenWeatherMap API

const searchBtn = document.querySelector("button");
const searchInput = document.querySelector("input");
const locationEl = document.querySelector(".location");
const temperatureEl = document.querySelector(".temperature");
const conditionsEl = document.querySelector(".conditions");
const humidityEl = document.querySelector(".humidity");
const windSpeedEl = document.querySelector(".wind-speed");

searchBtn.onclick = getWeather;

function getWeather() {
  const location = searchInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      locationEl.textContent = `Location: ${data.name}, ${data.sys.country}`;
      temperatureEl.textContent = `Temperature: ${(data.main.temp - 273.15).toFixed(1)}°C`;
      conditionsEl.textContent = `Conditions: ${data.weather[0].description}`;
      humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeedEl.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    })
    .catch(error => console.log(error));
}
