// script for the weather app

const form = document.getElementById('weather-form');
const cityInput = document.getElementById('cityInput');
const feedback = document.getElementById('weather-display'); // ❌ FIXED here

const apiKey = '3f8a28d16f38dfc62a9fc07c314a4820';

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const city = cityInput.value.trim();
    if (city === "") {
        alert('You need to enter your city!');
        return;
    }

    fetchWeatherData(city); 
});
function displayWeather(data) {
    feedback.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Condition: ${data.weather[0].description}</p>
    `;
}

async function fetchWeatherData(city) {
    feedback.textContent = 'Loading weather data...';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('City not found'); 
        }

        const data = await response.json();
        displayWeather(data); 

        cityInput.value = '';
        setTimeout(()=>{
            feedback.textContent = ';'
        }, 3000);

    } catch (error) {
        feedback.textContent = 'Failed to load weather data.';
        console.error(error);
    }
}