const apiKey = "7e580a25895ffd0b1d24929a081a716f"; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weather-icon");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

        // Display weather info
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Weather: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        // Show icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.style.display = "block";

        // Change background based on weather
        changeBackground(data.weather[0].main);

    } catch (error) {
        alert("Error fetching weather data");
        console.error(error);
    }
}

// Function to change background dynamically
function changeBackground(weather) {
    let body = document.body;
    switch (weather.toLowerCase()) {
        case "clear":
            body.style.background = "linear-gradient(to right, #fbc2eb, #a6c1ee)";
            break;
        case "clouds":
            body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
            break;
        case "rain":
        case "drizzle":
            body.style.background = "linear-gradient(to right, #00c6ff, #0072ff)";
            break;
        case "thunderstorm":
            body.style.background = "linear-gradient(to right, #373b44, #4286f4)";
            break;
        case "snow":
            body.style.background = "linear-gradient(to right, #e6dada, #274046)";
            break;
        
        case "fog":
            body.style.background = "linear-gradient(to right, #616161, #9bc5c3)";
            break;
        default:
            body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
            break;
    }
}
