document.addEventListener("DOMContentLoaded", function() {
    // Фон в зависимости от времени суток
    function changeBackground() {
        let now = new Date();
        let hour = now.getHours();
        let backgrounds = {
            morning: "/img/morning.jpg",
            day: "/img/evening.jpg",
            night: "/img/night.jpg"
        };

        let backgroundImage =
            hour >= 6 && hour < 12 ? backgrounds.morning :
            hour >= 12 && hour < 18 ? backgrounds.day :
            backgrounds.night;

        document.body.style.backgroundImage = `url('${backgroundImage}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
    }

    changeBackground();
    setInterval(changeBackground, 60000);

    // Часы...=)
    function digitalClock() {
        let date = new Date();
        let hours = date.getHours().toString().padStart(2, "0");
        let minutes = date.getMinutes().toString().padStart(2, "0");
        let seconds = date.getSeconds().toString().padStart(2, "0");

        document.getElementById("id_clock").innerHTML = `${hours}:${minutes}:${seconds}`;
        setTimeout(digitalClock, 1000);
    }

    digitalClock();

    // Объект с переводами....
    const translations = {
        ru: {
            searchCity: "Найти город",
            weatherPlaceholder: "Введите город",
            ok: "OK",
            cityNotFound: "Город не найден",
            humidity: "Влажность",
            wind: "Ветер"
        },
        en: {
            searchCity: "Find City",
            weatherPlaceholder: "Enter city",
            ok: "OK",
            cityNotFound: "City not found",
            humidity: "Humidity",
            wind: "Wind"
        },
        jp: {
            searchCity: "都市を探す",
            weatherPlaceholder: "都市を入力",
            ok: "OK",
            cityNotFound: "都市が見つかりません",
            humidity: "湿度",
            wind: "風"
        }
    };

    // Словарь GIF для погодных условий
    const weatherGifs = {
        "clear": "/img/weather-gifs/clear.gif",
        "rain": "/img/weather-gifs/rain.gif",
        "snow": "/img/weather-gifs/snow.gif",
        "clouds": "/img/weather-gifs/clouds.gif",
        "thunderstorm": "/img/weather-gifs/thunderstorm.gif",
        "drizzle": "/img/weather-gifs/drizzle.gif",
        "mist": "/img/weather-gifs/mist.gif",
        "fog": "/img/weather-gifs/fog.gif",
        "default": "/img/weather-gifs/default.gif"
    };

    // Улучшенная функция для определения GIF погоды
    function getWeatherGif(weatherData) {
        if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
            return weatherGifs["default"];
        }

        const weather = weatherData.weather[0];
        const mainCondition = weather.main.toLowerCase();
        const description = weather.description.toLowerCase();
        const id = weather.id;

        // Сначала проверяем особые случаи по id (кодам погоды OpenWeatherMap)
        if (id >= 200 && id < 300) {
            return weatherGifs["thunderstorm"];
        } else if (id >= 300 && id < 400) {
            return weatherGifs["drizzle"];
        } else if (id >= 500 && id < 600) {
            if (id === 501 || id === 502 || id === 503 || id === 504) {
                return weatherGifs["rain"];
            }
            return weatherGifs["rain"];
        } else if (id >= 600 && id < 700) {
            return weatherGifs["snow"];
        } else if (id >= 700 && id < 800) {
            if (mainCondition.includes("fog") || mainCondition.includes("mist")) {
                return weatherGifs["fog"];
            }
            return weatherGifs["mist"];
        }

        for (let key in weatherGifs) {
            if (mainCondition.includes(key)) {
                return weatherGifs[key];
            }
        }

        const descriptionMapping = {
            "clear": ["ясно", "clear", "sunny"],
            "rain": ["дождь", "rain", "shower"],
            "drizzle": ["морось", "drizzle"],
            "thunderstorm": ["гроза", "thunderstorm", "storm"],
            "snow": ["снег", "snow"],
            "clouds": ["облачно", "cloud", "пасмурно", "overcast"]
        };

        for (let key in descriptionMapping) {
            for (let term of descriptionMapping[key]) {
                if (description.includes(term)) {
                    return weatherGifs[key];
                }
            }
        }

        return weatherGifs["default"];
    }

    const apiKey = "059d545ad08f37bfc6c677dc44082915";

    function attachWeatherFormHandlers() {
        const searchButton = document.getElementById("show-city-search");
        if (searchButton) {
            searchButton.addEventListener("click", function() {
                const searchContainer = document.getElementById("city-search-container");
                searchContainer.style.display = searchContainer.style.display === "none" ? "block" : "none";
            });
        }

        const weatherForm = document.getElementById("weather-form");
        if (weatherForm) {
            weatherForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const cityInput = document.getElementById("city-input");
                getWeather(cityInput.value);
            });
        }
    }

    function renderWeather(data, lang) {
        localStorage.setItem("lastCity", data.name);
        const weatherGif = getWeatherGif(data);

        document.getElementById("weather").innerHTML = `
            <div class="weather-container" style="
                display: flex;
                align-items: center;
                gap: 20px;
                max-width: 500px;
                margin: 20px auto;
                background: rgba(0, 0, 0, 0.4);
                border-radius: 12px;
                padding: 15px;
                color: white;
                font-family: Arial, sans-serif;
            ">
                <div class="weather-gif" style="
                    width: 80px;
                    height: 80px;
                    border-radius: 8px;
                    overflow: hidden;
                    flex-shrink: 0;
                ">
                    <img src="${weatherGif}" alt="Weather GIF" style="
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    ">
                </div>
                <div class="weather-info" style="flex: 1;">
                    <div style="font-size: 1.4rem; font-weight: bold; margin-bottom: 5px;">
                        ${data.name}: ${Math.round(data.main.temp)}°C
                    </div>
                    <div style="font-size: 1rem; margin-bottom: 8px;">
                        ${data.weather[0].description}
                    </div>
                    <div style="display: flex; gap: 15px; font-size: 0.9rem; color: #e0e0e0;">
                        <div>${translations[lang].humidity}: ${data.main.humidity}%</div>
                        <div>${translations[lang].wind}: ${Math.round(data.wind.speed)} m/s</div>
                    </div>
                    <button id="show-city-search" style="
                        margin-top: 12px;
                        padding: 6px 12px;
                        background: rgba(255, 255, 255, 0.2);
                        border: none;
                        border-radius: 6px;
                        color: white;
                        cursor: pointer;
                        transition: background 0.2s;
                    ">
                        ${translations[lang].searchCity}
                    </button>
                    <div id="city-search-container" style="display:none; margin-top: 10px;">
                        <form id="weather-form" style="display: flex; gap: 8px;">
                            <input type="text" id="city-input" placeholder="${translations[lang].weatherPlaceholder}" style="
                                flex: 1;
                                padding: 6px 10px;
                                border: none;
                                border-radius: 6px;
                                background: rgba(255, 255, 255, 0.2);
                                color: white;
                            ">
                            <button type="submit" style="
                                padding: 6px 12px;
                                background: rgba(255, 255, 255, 0.3);
                                border: none;
                                border-radius: 6px;
                                color: white;
                                cursor: pointer;
                            ">
                                ${translations[lang].ok}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        attachWeatherFormHandlers();
    }

    function renderWeatherError(message, lang) {
        document.getElementById("weather").innerHTML = `
            <div class="weather-container" style="
                display: flex;
                align-items: center;
                gap: 20px;
                max-width: 500px;
                margin: 20px auto;
                background: rgba(0, 0, 0, 0.4);
                border-radius: 12px;
                padding: 15px;
                color: white;
                font-family: Arial, sans-serif;
            ">
                <div class="weather-gif" style="
                    width: 80px;
                    height: 80px;
                    border-radius: 8px;
                    overflow: hidden;
                    flex-shrink: 0;
                ">
                    <img src="${weatherGifs["default"]}" alt="Weather GIF" style="
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    ">
                </div>
                <div class="weather-info" style="flex: 1;">
                    <div style="font-size: 1.2rem; margin-bottom: 10px;">
                        ${message}
                    </div>
                    <button id="show-city-search" style="
                        padding: 6px 12px;
                        background: rgba(255, 255, 255, 0.2);
                        border: none;
                        border-radius: 6px;
                        color: white;
                        cursor: pointer;
                    ">
                        ${translations[lang].searchCity}
                    </button>
                    <div id="city-search-container" style="display:none; margin-top: 10px;">
                        <form id="weather-form" style="display: flex; gap: 8px;">
                            <input type="text" id="city-input" placeholder="${translations[lang].weatherPlaceholder}" style="
                                flex: 1;
                                padding: 6px 10px;
                                border: none;
                                border-radius: 6px;
                                background: rgba(255, 255, 255, 0.2);
                                color: white;
                            ">
                            <button type="submit" style="
                                padding: 6px 12px;
                                background: rgba(255, 255, 255, 0.3);
                                border: none;
                                border-radius: 6px;
                                color: white;
                                cursor: pointer;
                            ">
                                ${translations[lang].ok}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        attachWeatherFormHandlers();
    }

    function getCurrentLanguage() {
        return localStorage.getItem("selectedLanguage") || "ru";
    }

    // Функция получения погоды по городу
    async function getWeather(city = "Khabarovsk") {
        const cleanCity = city.split(":")[0].trim();
        const lang = getCurrentLanguage();
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cleanCity}&units=metric&appid=${apiKey}&lang=${lang}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === 200) {
                renderWeather(data, lang);
            } else {
                throw new Error(translations[lang].cityNotFound);
            }
        } catch (error) {
            renderWeatherError(error.message, lang);
        }
    }

    // Функция получения погоды по координатам
    async function getWeatherByCoords(lat, lon) {
        const lang = getCurrentLanguage();
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=${lang}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === 200) {
                renderWeather(data, lang);
            } else {
                throw new Error(translations[lang].cityNotFound);
            }
        } catch (error) {
            renderWeatherError(error.message, lang);
        }
    }

    function getUserPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation is not supported"));
                return;
            }

            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 600000
            });
        });
    }

    // Функция смены языка
    function changeLanguage(lang) {
        const currentCity = localStorage.getItem("lastCity") || "Khabarovsk";
        localStorage.setItem("selectedLanguage", lang);
        getWeather(currentCity);
    }

    // Создаем панель выбора языка
    function createLanguageSelector() {
        const languageSelector = document.createElement("div");
        languageSelector.id = "language-selector";
        languageSelector.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 10px;
            z-index: 1100;
        `;

        const languages = [
            { code: "ru", flag: "🇷🇺" },
            { code: "en", flag: "🇬🇧" },
            { code: "jp", flag: "🇯🇵" }
        ];

        languages.forEach(lang => {
            const langButton = document.createElement("button");
            langButton.textContent = lang.flag;
            langButton.addEventListener("click", () => changeLanguage(lang.code));
            langButton.style.cssText = `
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                transition: transform 0.2s;
            `;
            langButton.addEventListener("mouseover", (e) => e.target.style.transform = "scale(1.2)");
            langButton.addEventListener("mouseout", (e) => e.target.style.transform = "scale(1)");

            languageSelector.appendChild(langButton);
        });

        document.body.appendChild(languageSelector);

        const savedLang = localStorage.getItem("selectedLanguage") || "ru";
        localStorage.setItem("selectedLanguage", savedLang);
    }

    // Первичная инициализация
    createLanguageSelector();

    // Первичный запрос погоды
    async function initWeather() {
        try {
            const position = await getUserPosition();
            await getWeatherByCoords(position.coords.latitude, position.coords.longitude);
            return;
        } catch (geoError) {
            console.warn("Не удалось получить геолокацию:", geoError);
        }

        const lastCity = localStorage.getItem("lastCity");
        if (lastCity) {
            await getWeather(lastCity);
            return;
        }

        await getWeather("Khabarovsk");
    }

    initWeather();
});

// Музыкальный плеер
const playlists = {
    lofi: "37i9dQZF1DWWQRwui0ExPn",
    jazz: "37i9dQZF1DXbITWG1ZJKYt",
    classical: "37i9dQZF1DWWEJlAGA9gs0"
};

function playTrack(playlist) {
    const embed = document.getElementById("spotify-embed");
    embed.src = `https://open.spotify.com/embed/playlist/${playlists[playlist]}?utm_source=generator`;
}

// Инициализация обработчиков событий для плеера
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("play-lofi")?.addEventListener("click", () => playTrack("lofi"));
    document.getElementById("play-jazz")?.addEventListener("click", () => playTrack("jazz"));
    document.getElementById("play-classical")?.addEventListener("click", () => playTrack("classical"));

    document.getElementById("player-toggle")?.addEventListener("click", () => {
        const player = document.querySelector(".player-container");
        if (player) {
            player.style.display = player.style.display === "block" ? "none" : "block";
        }
    });

    document.getElementById("player-close")?.addEventListener("click", () => {
        const player = document.querySelector(".player-container");
        if (player) {
            player.style.display = "none";
        }
    });
});

// Переключение темы
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
}

// Применяем сохраненную тему при загрузке
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
    }
});
