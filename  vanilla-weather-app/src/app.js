function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

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
  return `${day} ${hours}:${minutes}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forcastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      ` 
        <div class="col-2">
          <div class="weather-forecat-date">${day}</div>
          <img
            src="https://openweathermap.org/img/wn/01d@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max">18°</span>
            <span class="weather-forecast-temp-min"> 12°</span>
          </div>
        </div>
      </div>`;
  });

  forcastHTML = forcastHTML + `</div>`;

  forecastElement.innerHTML = forcastHTML;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celTemperature);
  celTemperature = response.data.main.temp;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
displayForecast();
function search(city) {
  let apiKey = "8020162217ba2a2e835a4a632f881993";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function showFarTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // remove the active class the cel link
  celLink.classList.remove("active");
  farLink.classList.add("active");
  let farTemperature = (celTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(farTemperature);
}
function showCelTemperature(event) {
  event.preventDefault();
  celLink.classList.add("active");
  farLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celTemperature);
}
let celTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let farLink = document.querySelector("#far-link");
farLink.addEventListener("click", showFarTemperature);
let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", showCelTemperature);
search("New York");
