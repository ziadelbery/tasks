var apiKey = "ac47197a9ea94f10b6b81258240612";
var cityInput = document.getElementById("cityInput");
var tempEl = document.getElementById("temp");
var conditionEl = document.getElementById("condition");
var datetimeEl = document.getElementById("datetime");
var timeEl = document.getElementById("time");
var cityEl = document.getElementById("city");
var detailsEl = document.getElementById("details");
var weatherIconEl = document.getElementById("weather-icon");
var humidityEl = document.getElementById("humidity");
var windEl = document.getElementById("wind");
var errorMessageEl = document.getElementById("error-message");
var toggleUnitBtn = document.getElementById("toggle-unit");
var searchButton = document.getElementById("searchButton");

var currentDayIndex = 0;
var weatherData = null;
var isCelsius = true;

async function fetchWeather(city) {
  try {
    var response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`
    );
    if (!response.ok) {
      throw new Error("City not found or unable to fetch weather data");
    }
    var data = await response.json();
    weatherData = data;
    updateUI(data);
    errorMessageEl.style.display = "none";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    showError(error.message);
  }
}

function showError(message) {
  errorMessageEl.innerHTML = `
    <strong>Error:</strong> ${message}
    <button type="button" class="btn-close" aria-label="Close" onclick="hideError()"></button>
  `;
  errorMessageEl.style.display = "block";
}

function hideError() {
  errorMessageEl.style.display = "none";
}

function getConditionBasedOnTime(hour, condition) {
  var isDay = hour >= 6 && hour < 18;
  if (isDay) {
    if (condition.toLowerCase().includes("sun")) return "Sunny";
    return "Clear skies";
  } else {
    return "Clear night";
  }
}

function updateTime(cityTime) {
  var now = new Date(cityTime);
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  var timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
  timeEl.innerHTML = `<i class="fas fa-clock"></i> ${timeString}`;
}

function updateUI(data) {
  var today = data.forecast.forecastday[currentDayIndex];
  var currentHour = new Date(data.location.localtime).getHours();
  var isDay = currentHour >= 6 && currentHour < 18;

  var currentTemp = today.hour[currentHour]?.temp_c || today.day.avgtemp_c;
  var displayedTemp = isCelsius
    ? `${currentTemp}°C`
    : `${(currentTemp * 9) / 5 + 32}°F`;
  tempEl.textContent = displayedTemp;

  document.body.style.backgroundColor = isDay ? "#f5f7fa" : "#2c3e50";

  conditionEl.textContent = getConditionBasedOnTime(
    currentHour,
    today.day.condition.text
  );
  datetimeEl.innerHTML = `<i class="fas fa-calendar-alt"></i> ${new Date(
    today.date
  ).toLocaleDateString()}`;
  cityEl.textContent = data.location.name;
  weatherIconEl.src = `https:${
    isDay
      ? today.day.condition.icon
      : today.day.condition.icon.replace("day", "night")
  }`;

  humidityEl.innerHTML = `<i class="fas fa-tint"></i> Humidity: ${today.day.avghumidity}%`;
  windEl.innerHTML = `<i class="fas fa-wind"></i> Wind: ${today.day.maxwind_kph} km/h`;

  detailsEl.innerHTML = "";
  data.forecast.forecastday.forEach(function (day, index) {
    var date = new Date(day.date);
    var dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    var dayTimeIcon = day.day.condition.icon.replace("64x64", "128x128");

    var dayTemp = day.hour[currentHour]?.temp_c || day.day.avgtemp_c;
    var displayedDayTemp = isCelsius
      ? `${dayTemp}°C`
      : `${(dayTemp * 9) / 5 + 32}°F`;

    detailsEl.innerHTML += `
      <div class="col-md-4">
        <div class="card text-center ${
          index === currentDayIndex
            ? "active"
            : isDay
            ? "day-card"
            : "night-card"
        }">
          <h6>${dayName}</h6>
          <img src="https:${
            isDay ? dayTimeIcon : dayTimeIcon.replace("day", "night")
          }" alt="${day.day.condition.text}" class="my-2" width="50">
          <p class="mb-0">${displayedDayTemp}</p>
          <small>${getConditionBasedOnTime(
            currentHour,
            day.day.condition.text
          )}</small>
        </div>
      </div>
    `;
  });
  updateTime(data.location.localtime);
}

function toggleUnit() {
  isCelsius = !isCelsius;
  var unit = isCelsius ? "°C" : "°F";
  toggleUnitBtn.textContent = `Switch to ${isCelsius ? "°F" : "°C"}`;
  updateUI(weatherData);
}

searchButton.addEventListener("click", function () {
  var city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    showError("Please enter a city name before searching.");
  }
});

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

toggleUnitBtn.addEventListener("click", toggleUnit);
document.getElementById("today-tab").addEventListener("click", function () {
  currentDayIndex = 0;
  updateUI(weatherData);
});
document.getElementById("next-tab").addEventListener("click", function () {
  currentDayIndex =
    (currentDayIndex + 1) % weatherData.forecast.forecastday.length;
  updateUI(weatherData);
});

fetchWeather("Cairo");

setInterval(function () {
  if (weatherData) {
    updateTime(weatherData.location.localtime);
  }
}, 1000);
