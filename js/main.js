const apiKey = "ac47197a9ea94f10b6b81258240612";
const cityInput = document.getElementById("cityInput");
const tempEl = document.getElementById("temp");
const conditionEl = document.getElementById("condition");
const datetimeEl = document.getElementById("datetime");
const timeEl = document.getElementById("time");
const cityEl = document.getElementById("city");
const detailsEl = document.getElementById("details");
const weatherIconEl = document.getElementById("weather-icon");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const errorMessageEl = document.getElementById("error-message");
const toggleUnitBtn = document.getElementById("toggle-unit");

let currentDayIndex = 0;
let weatherData = null;
let isCelsius = true;

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`
    );
    if (!response.ok) {
      throw new Error("City not found or unable to fetch weather data");
    }
    const data = await response.json();
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
  const isDay = hour >= 6 && hour < 18;
  if (isDay) {
    if (condition.toLowerCase().includes("sun")) return "Sunny";
    return "Clear skies";
  } else {
    return "Clear night";
  }
}

function updateUI(data) {
  const today = data.forecast.forecastday[currentDayIndex];
  const currentHour = new Date(data.location.localtime).getHours();
  const isDay = currentHour >= 6 && currentHour < 18;

  const currentTemp = today.hour[currentHour]?.temp_c || today.day.avgtemp_c;
  const displayedTemp = isCelsius
    ? `${currentTemp}°C`
    : `${(currentTemp * 9) / 5 + 32}°F`;
  tempEl.textContent = displayedTemp;

  document.body.style.backgroundColor = isDay ? "#f5f7fa" : "#2c3e50";

  conditionEl.textContent = getConditionBasedOnTime(currentHour, today.day.condition.text);
  datetimeEl.textContent = new Date(today.date).toLocaleDateString();
  timeEl.textContent = `Current Time: ${data.location.localtime.split(" ")[1]}`;
  cityEl.textContent = data.location.name;
  weatherIconEl.src = `https:${isDay ? today.day.condition.icon : today.day.condition.icon.replace("day", "night")}`;
  humidityEl.textContent = `Humidity: ${today.day.avghumidity}%`;
  windEl.textContent = `Wind: ${today.day.maxwind_kph} km/h`;

  detailsEl.innerHTML = "";
  data.forecast.forecastday.forEach((day, index) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const dayTimeIcon = day.day.condition.icon.replace("64x64", "128x128");

    detailsEl.innerHTML += `
      <div class="col-md-4">
        <div class="card text-center ${index === currentDayIndex ? "active" : isDay ? "day-card" : "night-card"}">
          <h6>${dayName}</h6>
          <img src="https:${isDay ? dayTimeIcon : dayTimeIcon.replace("day", "night")}" alt="${day.day.condition.text}" class="my-2" width="50">
          <p class="mb-0">${day.day.avgtemp_c}°C</p>
          <small>${getConditionBasedOnTime(currentHour, day.day.condition.text)}</small>
        </div>
      </div>
    `;
  });
}

function toggleUnit() {
  isCelsius = !isCelsius;
  const unit = isCelsius ? "°C" : "°F";
  toggleUnitBtn.textContent = `Switch to ${isCelsius ? "°F" : "°C"}`;
  updateUI(weatherData);
}

cityInput.addEventListener("change", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});
toggleUnitBtn.addEventListener("click", toggleUnit);
document.getElementById("today-tab").addEventListener("click", () => {
  currentDayIndex = 0;
  updateUI(weatherData);
});
document.getElementById("next-tab").addEventListener("click", () => {
  currentDayIndex = (currentDayIndex + 1) % weatherData.forecast.forecastday.length;
  updateUI(weatherData);
});

fetchWeather(cityInput.value);
