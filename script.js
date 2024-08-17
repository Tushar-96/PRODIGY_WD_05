document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'd66c1abe3d568f55f5990be5a1d8bf89'; // Replace with your OpenWeatherMap API key
    const weatherInfoDiv = document.getElementById('weather-info');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const locationInput = document.getElementById('location-input');

    getWeatherBtn.addEventListener('click', function() {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeatherData(location);
        } else {
            alert('Please enter a location.');
        }
    });

    // Fetch weather data based on user input
    function fetchWeatherData(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again.');
            });
    }

    // Display weather data
    function displayWeatherData(data) {
        if (data.cod === 200) {
            const { name, main, weather, wind } = data;
            weatherInfoDiv.innerHTML = `
                <div><strong>Location:</strong> ${name}</div>
                <div><strong>Temperature:</strong> ${main.temp} °C</div>
                <div><strong>Weather:</strong> ${weather[0].description}</div>
                <div><strong>Humidity:</strong> ${main.humidity} %</div>
                <div><strong>Wind Speed:</strong> ${wind.speed} m/s</div>
            `;
        } else {
            weatherInfoDiv.innerHTML = `<div>Error: ${data.message}</div>`;
        }
    }
});
