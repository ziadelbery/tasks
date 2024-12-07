<<<<<<< HEAD
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
=======
var quotes = [
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
];

var quoteElement = document.querySelector('.quote');
var authorElement = document.querySelector('.author');
var likeBtn = document.querySelector('.like-btn');
var saveBtn = document.querySelector('.save-btn');
var newQuoteBtn = document.querySelector('.new-quote-btn');
var shareBtn = document.querySelector('.share-btn');
var translateBtn = document.querySelector('.translate-btn');

var translations = {
    "Happiness is not something ready made. It comes from your own actions.": "السعادة ليست شيئًا جاهزًا. إنها تأتي من أفعالك.",
    "Success usually comes to those who are too busy to be looking for it.": "النجاح عادة ما يأتي لأولئك المشغولين جدًا عن البحث عنه.",
    "Don't be afraid to give up the good to go for the great.": "لا تخف من التخلي عن الجيد للوصول إلى العظيم.",
    "I find that the harder I work, the more luck I seem to have.": "أجد أنه كلما عملت بجد، زاد حظي."
};

var isTranslated = false;

function getNewQuote() {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    var newQuote = quotes[randomIndex];
    quoteElement.textContent = `"${newQuote.text}"`;
    authorElement.textContent = `- ${newQuote.author}`;
    isTranslated = false;
    translateBtn.title = "Translate";
    likeBtn.classList.remove('liked');
    saveBtn.classList.remove('saved');
}

function likeQuote() {
    likeBtn.classList.toggle('liked');
}

function saveQuote() {
    saveBtn.classList.toggle('saved');
}

function shareQuote() {
    console.log("Quote shared!");
}

function translateQuote() {
    var currentQuote = quoteElement.textContent.replace(/"/g, '');
    if (!isTranslated) {
        if (translations[currentQuote]) {
            quoteElement.textContent = `"${translations[currentQuote]}"`;
            translateBtn.title = "Show Original";
            isTranslated = true;
        } else {
            console.log("Translation not available for this quote!");
        }
    } else {
        var originalQuote = Object.keys(translations).find(
            function (key) {
                return translations[key] === currentQuote;
            }
        );
        quoteElement.textContent = `"${originalQuote}"`;
        translateBtn.title = "Translate";
        isTranslated = false;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    newQuoteBtn.addEventListener('click', getNewQuote);
    likeBtn.addEventListener('click', likeQuote);
    saveBtn.addEventListener('click', saveQuote);
    shareBtn.addEventListener('click', shareQuote);
    translateBtn.addEventListener('click', translateQuote);
});
>>>>>>> d2f1bbc71048fbe60ad5f67acd8ee6bbbd7c5999
