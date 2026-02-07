document.addEventListener("DOMContentLoaded", function() {
    // Фон в зависимости от времени суток
    function changeBackground() {
        let now = new Date();
        let hour = now.getHours();
        let backgrounds = {
            morning: "main/img/morning.jpg",
            day: "main/img/evening.jpg",
            night: "main/img/night.jpg"
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

    // Mapping weather conditions to ordered lists of candidate media files.
    // Priority: MP4 -> WebP -> GIF -> SVG (SVG as lightweight fallback).
    // Load from converted_manifest.json if available, else use hardcoded defaults.
    // To regenerate manifest after adding new GIFs, run: npm run generate-manifest
    let weatherGifs = {
        "clear": [
            "/main/img/converted_mp4/Good Morning Summer GIF.mp4",
            "/main/img/converted_webp/Good Morning Summer GIF.webp",
            "/main/img/weather-gifs/clear.svg"
        ],
        "rain": [
            "/main/img/converted_mp4/Raining Rainy Day GIF by Pudgy Penguins.mp4",
            "/main/img/converted_webp/Raining Rainy Day GIF by Pudgy Penguins.webp",
            "/main/img/weather-gifs/rain.svg"
        ],
        "snow": [
            "/main/img/converted_mp4/Charlie Brown Snow GIF.mp4",
            "/main/img/converted_webp/Charlie Brown Snow GIF.webp",
            "/main/img/weather-gifs/snow.svg"
        ],
        "clouds": [
            "/main/img/converted_mp4/studio ghibli GIF (1).mp4",
            "/main/img/converted_webp/studio ghibli GIF (1).webp",
            "/main/img/weather-gifs/clouds.svg"
        ],
        "thunderstorm": [
            "/main/img/weather-gifs/thunderstorm.svg"
        ],
        "drizzle": [
            "/main/img/weather-gifs/drizzle.svg"
        ],
        "mist": [
            "/main/img/weather-gifs/mist.svg"
        ],
        "fog": [
            "/main/img/weather-gifs/mist.svg"
        ],
        "default": [
            "/main/img/weather-gifs/clouds.svg"
        ]
    };

    // Load manifest from main/img/converted_manifest.json if available
    (async function loadManifest() {
        try {
            const response = await fetch('/main/img/converted_manifest.json');
            if (response.ok) {
                const manifest = await response.json();
                // Merge manifest into weatherGifs (manifest takes precedence)
                for (const key in manifest) {
                    if (manifest[key].length > 0) {
                        weatherGifs[key] = manifest[key];
                    }
                }
                console.log('Loaded weather media manifest');
            }
        } catch (e) {
            console.warn('Could not load converted_manifest.json, using defaults:', e.message);
        }
    })();    // Улучшенная функция для определения GIF погоды
    // Returns the weather condition key (e.g. 'rain', 'clear') that we'll use to pick media candidates
    function getWeatherGif(weatherData) {
        if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
            return "default"; 
        }
        
        const weather = weatherData.weather[0];
        const mainCondition = weather.main.toLowerCase();
        const description = weather.description.toLowerCase();
        const id = weather.id;

        // Сначала проверяем особые случаи по id (кодам погоды OpenWeatherMap)
        if (id >= 200 && id < 300) { // Гроза
            return "thunderstorm";
        } else if (id >= 300 && id < 400) { // Морось
            return "drizzle";
        } else if (id >= 500 && id < 600) { // Дождь
            // Для ливня можно использовать другую GIF, если есть
            if (id === 501 || id === 502 || id === 503 || id === 504) {
                return "rain"; // Сильный дождь
            }
            return "rain";
        } else if (id >= 600 && id < 700) { // Снег
            return "snow";
        } else if (id >= 700 && id < 800) { // Атмосферные явления
            if (mainCondition.includes("fog") || mainCondition.includes("mist")) {
                return "fog";
            }
            return "mist";
        }

        // Затем проверяем по основному состоянию
        for (let key in weatherGifs) {
            if (mainCondition.includes(key)) {
                return key;
            }
        }

        // Затем проверяем по описанию
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
                    return key;
                }
            }
        }

        // Если ничего не найдено, используем default
        return "default";
    }

    // Функция смены языка
    function changeLanguage(lang) {
        // Сохраняем текущий выбранный город перед сменой языка
        const currentCity = localStorage.getItem('lastCity') || "Khabarovsk";
        localStorage.setItem('selectedLanguage', lang);
        getWeather(currentCity);
    }

    // Создаем панель выбора языка
    function createLanguageSelector() {
        const languageSelector = document.createElement('div');
        languageSelector.id = 'language-selector';
        languageSelector.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 10px;
            z-index: 1100;
        `;

        const languages = [
            { code: 'ru', flag: '🇷🇺' },
            { code: 'en', flag: '🇬🇧' },
            { code: 'jp', flag: '🇯🇵' }
        ];

        languages.forEach(lang => {
            const langButton = document.createElement('button');
            langButton.textContent = lang.flag;
            langButton.addEventListener('click', () => changeLanguage(lang.code));
            langButton.style.cssText = `
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                transition: transform 0.2s;
            `;
            langButton.addEventListener('mouseover', (e) => e.target.style.transform = 'scale(1.2)');
            langButton.addEventListener('mouseout', (e) => e.target.style.transform = 'scale(1)');
            
            languageSelector.appendChild(langButton);
        });

        document.body.appendChild(languageSelector);

        // Применяем сохраненный язык при загрузке
        const savedLang = localStorage.getItem('selectedLanguage') || 'ru';
        changeLanguage(savedLang);
    }

    // Функция получения погоды
    async function getWeather(city = "Khabarovsk") {
        // Очищаем город от возможных доп. данных (температуры и т.д.)
        const cleanCity = city.split(':')[0].trim();
    const lang = localStorage.getItem('selectedLanguage') || 'ru';
        // Запрос теперь идёт к локальному прокси-серверу (/api/weather),
        // который использует OPENWEATHER_KEY на сервере. API-ключ не хранится в клиентском коде.
        const url = `/api/weather?q=${encodeURIComponent(cleanCity)}&lang=${encodeURIComponent(lang)}`;

        // Simple client-side cache (localStorage) with TTL to reduce API calls
        const cacheKey = `weather_cache_${cleanCity.toLowerCase()}_${lang}`;
        const TTL = 10 * 60 * 1000; // 10 minutes
        try {
            const cachedRaw = localStorage.getItem(cacheKey);
            if (cachedRaw) {
                try {
                    const cached = JSON.parse(cachedRaw);
                    if (cached && (Date.now() - cached.t) < TTL) {
                        // Use cached data
                        renderWeather(cached.data, lang);
                        return;
                    }
                } catch (e) {
                    // ignore parse errors and continue to fetch
                    console.warn('Failed to parse weather cache', e);
                }
            }
        } catch (e) {
            console.warn('localStorage unavailable', e);
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === 200) {
                // Сохраняем последний успешно найденный город
                localStorage.setItem('lastCity', data.name);

                // Cache the successful response
                try {
                    localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), data }));
                } catch (e) {
                    // ignore storage full or disabled
                    console.warn('Failed to store weather cache', e);
                }

                await renderWeather(data, lang);
            } else {
                throw new Error(translations[lang].cityNotFound);
            }
        } catch (error) {
            // Обработка ошибки с учетом языка
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
                        <img src="${(weatherGifs["default"] || [])[0] || "/main/img/weather-gifs/clouds.svg"}" alt="Weather GIF" style="
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        ">
                    </div>
                    <div class="weather-info" style="flex: 1;">
                        <div style="font-size: 1.2rem; margin-bottom: 10px;">
                            ${error.message}
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
            
            // Реинициализируем обработчики событий
            const searchButton = document.getElementById("show-city-search");
            if (searchButton) {
                searchButton.addEventListener("click", function() {
                    const searchContainer = document.getElementById("city-search-container");
                    searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
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
    }

    // Рендер погоды — вынесен, чтобы можно было переиспользовать (и использовать кеш)
    async function renderWeather(data, lang) {
    const weatherKey = getWeatherGif(data);

    // Build base UI first (without media) to show text while checking media
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
                <div class="weather-gif" id="weather-media" style="
                    width: 80px;
                    height: 80px;
                    border-radius: 8px;
                    overflow: hidden;
                    flex-shrink: 0;
                    background: #222;
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

        // Реинициализируем обработчики событий
        document.getElementById("show-city-search").addEventListener("click", function() {
            const searchContainer = document.getElementById("city-search-container");
            searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
        });

        document.getElementById("weather-form").addEventListener("submit", function(e) {
            e.preventDefault();
            const cityInput = document.getElementById("city-input");
            getWeather(cityInput.value);
        });

        // Try to find best media: MP4 -> WebP -> GIF -> SVG (SVG is last fallback)
        async function resourceExists(url) {
            try {
                const res = await fetch(url, { method: 'HEAD' });
                return res.ok;
            } catch (e) {
                try {
                    const res2 = await fetch(url);
                    return res2.ok;
                } catch (e2) {
                    return false;
                }
            }
        }
        // candidates come from weatherGifs mapping (arrays)
        const candidatesFromMap = weatherGifs[weatherKey] || weatherGifs["default"];
        // normalize: ensure leading slash
        const candidates = candidatesFromMap.map(p => p.startsWith('/') ? p : `/${p}`);

        let chosen = null;
        for (const c of candidates) {
            if (await resourceExists(c)) { chosen = c; break; }
            const alt = decodeURIComponent(c);
            if (alt !== c && await resourceExists(alt)) { chosen = alt; break; }
        }

        const mediaContainer = document.getElementById('weather-media');
        if (!chosen) {
            // As a last resort, try to show the SVG fallback from the mapping (last element)
            const fallbackList = weatherGifs[weatherKey] || weatherGifs["default"];
            const fallback = fallbackList[fallbackList.length - 1];
            const img = document.createElement('img');
            img.src = fallback.startsWith('/') ? fallback : `/${fallback}`;
            img.alt = 'Weather';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            mediaContainer.appendChild(img);
            return;
        }

        if (chosen.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = chosen;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            mediaContainer.appendChild(video);
            video.play().catch(() => {});
        } else {
            const img = document.createElement('img');
            img.src = chosen;
            img.alt = 'Weather';
            img.loading = 'lazy';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            mediaContainer.appendChild(img);
        }
    }

    // Lazy-loading helper: loads images with data-src when they enter viewport
    function initLazyLoad() {
        const lazyImages = [].slice.call(document.querySelectorAll('img.lazy-weather-gif'));
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const dataSrc = img.getAttribute('data-src');
                        if (dataSrc) {
                            img.src = dataSrc;
                            img.removeAttribute('data-src');
                        }
                        img.classList.remove('lazy-weather-gif');
                        lazyImageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(function(img) {
                lazyImageObserver.observe(img);
            });
        } else {
            // Fallback: load immediately
            lazyImages.forEach(function(img) {
                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) img.src = dataSrc;
                img.classList.remove('lazy-weather-gif');
            });
        }
    }

    // Первичная инициализация
    createLanguageSelector();
    
    // Первичный запрос погоды
    async function initWeather() {
        // Пробуем получить последний сохраненный город
        const lastCity = localStorage.getItem('lastCity');
        if (lastCity) {
            await getWeather(lastCity);
        } else {
            // Если нет сохраненного города, пробуем определить по IP
            try {
                const ipResponse = await fetch('https://ipapi.co/json/');
                const ipData = await ipResponse.json();
                const city = ipData.city || 'Khabarovsk';
                await getWeather(city);
            } catch (error) {
                console.error('Ошибка определения по IP:', error);
                await getWeather('Khabarovsk');
            }
        }
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
    const embed = document.getElementById('spotify-embed');
    embed.src = `https://open.spotify.com/embed/playlist/${playlists[playlist]}?utm_source=generator`;
}
  
// Инициализация обработчиков событий для плеера
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('play-lofi')?.addEventListener('click', () => playTrack('lofi'));
    document.getElementById('play-jazz')?.addEventListener('click', () => playTrack('jazz'));
    document.getElementById('play-classical')?.addEventListener('click', () => playTrack('classical'));
    
    document.getElementById('player-toggle')?.addEventListener('click', () => {
        const player = document.querySelector('.player-container');
        if (player) {
            player.style.display = player.style.display === 'block' ? 'none' : 'block';
        }
    });
    
    document.getElementById('player-close')?.addEventListener('click', () => {
        const player = document.querySelector('.player-container');
        if (player) {
            player.style.display = 'none';
        }
    });
});

// Переключение темы
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}
  
// Применяем сохраненную тему при загрузке
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Falling GIFs animation (triggered by button click) redaction Gif
function initFallingGifsButton() {
    // Configuration: customize these settings
    const fallingGifUrls = [
        '/main/img/falling_1.gif',      // Add your GIF URLs here
        '/main/img/falling_2.gif',      // You can add multiple different GIFs
        '/main/img/falling_3.gif',
        '/main/img/falling_4.gif',     
        '/main/img/falling_5.gif',     
        '/main/img/falling_6.gif',
        '/main/img/falling_7.gif',      
        '/main/img/falling_8.gif',      
        '/main/img/falling_9.gif',
        '/main/img/falling_10.gif',     
        '/main/img/falling_11.gif',     
        '/main/img/falling_12.gif',
        '/main/img/falling_13.gif',
        '/main/img/falling_14.gif',
    ];
    
    const durationSeconds = 15;        // How long to spawn GIFs (in seconds)
    const spawnInterval = 150;         // Spawn a new GIF every 300ms during active period
    const minFallDuration = 6;         // Minimum fall duration in seconds
    const maxFallDuration = 12;        // Maximum fall duration in seconds
    const gifSize = 80;                // Size in pixels (width and height)
    
    const button = document.getElementById('falling-gifs-btn');
    let isActive = false;
    let activeTimeout = null;
    let spawnIntervalId = null;
    
    button.addEventListener('click', function() {
        if (isActive) return; // Prevent multiple clicks while active
        
        isActive = true;
        button.disabled = true;
        button.textContent = '✨ Идёт посыпание...';
        
        // Start spawning GIFs
        spawnIntervalId = setInterval(() => {
            // Random GIF from the list
            const gifUrl = fallingGifUrls[Math.floor(Math.random() * fallingGifUrls.length)];
            
            // Random horizontal position
            const randomX = Math.random() * (window.innerWidth - gifSize);
            
            // Random fall duration
            const fallDuration = minFallDuration + Math.random() * (maxFallDuration - minFallDuration);
            
            // Create falling element
            const gif = document.createElement('div');
            gif.className = 'falling-gif';
            gif.style.backgroundImage = `url('${gifUrl}')`;
            gif.style.left = randomX + 'px';
            gif.style.width = gifSize + 'px';
            gif.style.height = gifSize + 'px';
            gif.style.animationDuration = fallDuration + 's';
            
            document.body.appendChild(gif);
            
            // Remove element after animation completes
            setTimeout(() => {
                gif.remove();
            }, fallDuration * 1000);
        }, spawnInterval);
        
        // Stop spawning after duration
        activeTimeout = setTimeout(() => {
            clearInterval(spawnIntervalId);
            isActive = false;
            button.disabled = false;
            button.textContent = '❄️ Посыпать 😈';
        }, durationSeconds * 1000);
    });
}

// Start button listener when page loads
document.addEventListener("DOMContentLoaded", function() {
    initFallingGifsButton();
});
