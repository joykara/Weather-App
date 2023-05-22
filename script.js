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
// rain element
const rainEl = document.querySelector("#rain");
const pressureEl = document.querySelector("#pressure");
const windSpeedEl = document.querySelector("#wind-speed");

searchBtn.onclick = getWeather;

function getWeather() {
  const location = searchInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  //fetch API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      locationEl.textContent = ` ${data.name}, ${data.sys.country}`;
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