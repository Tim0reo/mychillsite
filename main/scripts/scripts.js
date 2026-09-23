if (!window.__CHILL_SITE_BOOTSTRAPPED__) {
    window.__CHILL_SITE_BOOTSTRAPPED__ = true;

    document.addEventListener("DOMContentLoaded", function() {
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
            effectsLabel: "Эффекты погоды",
            effectsHint: "Дождь и снег за окном зависят от выбранного города. Звук включается отдельно.",
            effectsReduced: "Анимация отключена настройкой уменьшения движения на устройстве.",

            quoteShakespeare: "Мы знаем, кто мы, но не знаем, кем можем стать.",
            authorShakespeare: "Уильям Шекспир",
            quoteChekhov: "Краткость — сестра таланта.",
            authorChekhov: "Антон Чехов",
            quoteBasho: "Старый пруд. Лягушка прыгает в воду — слышен всплеск.",
            authorBasho: "Мацуо Басё",

            motivationStep: "Маленький шаг — тоже движение вперёд.",
            motivationToday: "Не обязательно успеть всё сегодня.",
            motivationRest: "Отдых — тоже часть пути.",
            motivationStart: "Сейчас достаточно просто начать.",

            sceneLabel: "Время суток",
            sceneAuto: "Авто · по часам",
            sceneMorning: "Утро",
            sceneDay: "День",
            sceneEvening: "Вечер",
            sceneNight: "Ночь",
            sceneLoading: "Загружаем сцену…",
            sceneError: "Не удалось загрузить фон. Попробуйте выбрать его ещё раз.",
            sceneSchedule: "Авто: утро 06–11 · день 11–17 · вечер 17–21 · ночь 21–06. По времени устройства.",

            navSounds: "♫ Звуки",
            soundHint: "Нажми ▶ возле звука, затем настрой громкость.",
            soundPlay: "Включить",
            soundStop: "Выключить",

            soundTitle: "Звуки для настроения",
            soundRain: "Дождь",
            rainVolume: "Громкость дождя",
            soundError: "Не удалось включить звук. Попробуйте ещё раз.",

            nightMode: "Ночной режим",
            lofiEyebrow: "ТВОЙ ТИХИЙ УГОЛОК",
            lofiTitle: "Побудь здесь. Выдохни.",
            lofiSubtitle: "Немного музыки, немного мечтаний. И время только для себя.",

            // Погода
            searchCity: "Найти город",
            weatherPlaceholder: "Введите город",
            ok: "OK",
            cityNotFound: "Город не найден",
            weatherRateLimit: "Превышен лимит запросов. Попробуйте позже.",
            weatherUnavailable: "Погода временно недоступна. Попробуйте позже.",
            humidity: "Влажность",
            wind: "Ветер",
            weatherLoading: "Загрузка погоды...",
            // Навигация
            navPomo: "⏱️ Помодоро",
            navGame: "🎮 2048",
            navWeather: "🌤️ Погода",
            navAriaLabel: "Разделы сайта",
            // Помодоро
            modeLabel: "Режим:",
            modeWork: "Фокус",
            modeShort: "Короткий перерыв",
            modeLong: "Длинный перерыв",
            btnStart: "Старт",
            btnPause: "Пауза",
            btnReset: "Сброс",
            modeWorkBtn: "Фокус 25",
            modeShortBtn: "Короткий 5",
            modeLongBtn: "Длинный 15",
            notifTitle: "Chill Time",
            notifBreak: "Время отдохнуть!",
            notifWork: "Время работать!",
            // 2048
            scoreLabel: "Счёт",
            newGame: "🔄 Новая игра",
            newGameBtn: "Новая игра",
            gameOverSimple: "Игра окончена!",
            gameOverScore: "Игра окончена! Счёт: ",
            winText: "🎉 Победа! 2048!",
            hint: "Свайпайте по полю или жмите стрелки",
            // Прочее
            fallingBtn: "❄️ Посыпать 😈",
            fallingBtnTitle: "Нажмите для падающих GIF-ов"
        },
        en: {
            effectsLabel: "Weather effects",
            effectsHint: "Rain and snow outside follow the selected city. Sound is controlled separately.",
            effectsReduced: "Animation is paused by your device’s reduced-motion preference.",

            quoteShakespeare: "We know what we are but know not what we may be.",
            authorShakespeare: "William Shakespeare",
            quoteChekhov: "Brevity is the sister of talent.",
            authorChekhov: "Anton Chekhov",
            quoteBasho: "An old pond. A frog jumps into the water — a splash.",
            authorBasho: "Matsuo Bashō",

            motivationStep: "A small step is still a step forward.",
            motivationToday: "You don’t have to do it all today.",
            motivationRest: "Rest is part of the journey, too.",
            motivationStart: "For now, just beginning is enough.",

            sceneLabel: "Time of day",
            sceneAuto: "Auto · local time",
            sceneMorning: "Morning",
            sceneDay: "Day",
            sceneEvening: "Evening",
            sceneNight: "Night",
            sceneLoading: "Loading scene…",
            sceneError: "Could not load the scene. Please select it again.",
            sceneSchedule: "Auto: morning 06–11 · day 11–17 · evening 17–21 · night 21–06. Device time.",

            navSounds: "♫ Sounds",
            soundHint: "Press ▶ next to a sound, then adjust its volume.",
            soundPlay: "Play",
            soundStop: "Stop",

            soundTitle: "Set the mood",
            soundRain: "Rain",
            rainVolume: "Rain volume",
            soundError: "Could not start audio. Please try again.",

            nightMode: "Night mode",
            lofiEyebrow: "YOUR QUIET CORNER",
            lofiTitle: "Stay a while. Breathe.",
            lofiSubtitle: "A little music, a little daydreaming. Some time just for you.",

            searchCity: "Find City",
            weatherPlaceholder: "Enter city",
            ok: "OK",
            cityNotFound: "City not found",
            weatherRateLimit: "Too many requests. Please try again later.",
            weatherUnavailable: "Weather is unavailable. Please try again later.",
            humidity: "Humidity",
            wind: "Wind",
            weatherLoading: "Loading weather...",
            navPomo: "⏱️ Pomodoro",
            navGame: "🎮 2048",
            navWeather: "🌤️ Weather",
            navAriaLabel: "Site sections",
            modeLabel: "Mode:",
            modeWork: "Focus",
            modeShort: "Short break",
            modeLong: "Long break",
            btnStart: "Start",
            btnPause: "Pause",
            btnReset: "Reset",
            modeWorkBtn: "Focus 25",
            modeShortBtn: "Short 5",
            modeLongBtn: "Long 15",
            notifTitle: "Chill Time",
            notifBreak: "Time to rest!",
            notifWork: "Time to work!",
            scoreLabel: "Score",
            newGame: "🔄 New game",
            newGameBtn: "New game",
            gameOverSimple: "Game over!",
            gameOverScore: "Game over! Score: ",
            winText: "🎉 You won! 2048!",
            hint: "Swipe the board or use arrow keys",
            fallingBtn: "❄️ Sprinkle 😈",
            fallingBtnTitle: "Click for falling GIFs"
        },
        jp: {
            effectsLabel: "天気のエフェクト",
            effectsHint: "選んだ街の天気に合わせて窓の外に雨や雪が降ります。音は別に操作できます。",
            effectsReduced: "端末の視差効果を減らす設定により、アニメーションは停止しています。",

            quoteShakespeare: "自分が何者かはわかっていても、何者になれるかはわからない。",
            authorShakespeare: "ウィリアム・シェイクスピア",
            quoteChekhov: "簡潔さは才能の姉妹である。",
            authorChekhov: "アントン・チェーホフ",
            quoteBasho: "古池や 蛙飛び込む 水の音",
            authorBasho: "松尾芭蕉",

            motivationStep: "小さな一歩も、前進。",
            motivationToday: "今日、全部できなくても大丈夫。",
            motivationRest: "休むことも、歩みのうち。",
            motivationStart: "今は、始めるだけで十分。",

            sceneLabel: "時間帯",
            sceneAuto: "自動・現地時間",
            sceneMorning: "朝",
            sceneDay: "昼",
            sceneEvening: "夕方",
            sceneNight: "夜",
            sceneLoading: "背景を読み込み中…",
            sceneError: "背景を読み込めません。もう一度選択してください。",
            sceneSchedule: "自動：朝6–11時・昼11–17時・夕方17–21時・夜21–6時。端末の時刻。",

            navSounds: "♫ 音",
            soundHint: "▶で再生し、音量を調整してください。",
            soundPlay: "再生",
            soundStop: "停止",

            soundTitle: "くつろぎの音",
            soundRain: "雨",
            rainVolume: "雨の音量",
            soundError: "音声を再生できません。もう一度お試しください。",

            nightMode: "ナイトモード",
            lofiEyebrow: "自分だけの静かな場所",
            lofiTitle: "ひと息ついて、ゆっくり。",
            lofiSubtitle: "音楽を聴いて、少し夢を見て。自分だけの時間。",

            searchCity: "都市を探す",
            weatherPlaceholder: "都市を入力",
            ok: "OK",
            cityNotFound: "都市が見つかりません",
            weatherRateLimit: "リクエストが多すぎます。後でもう一度お試しください。",
            weatherUnavailable: "天気情報を取得できません。後でもう一度お試しください。",
            humidity: "湿度",
            wind: "風",
            weatherLoading: "天気を読み込み中...",
            navPomo: "⏱️ ポモドーロ",
            navGame: "🎮 2048",
            navWeather: "🌤️ 天気",
            navAriaLabel: "サイトのセクション",
            modeLabel: "モード:",
            modeWork: "集中",
            modeShort: "短い休憩",
            modeLong: "長い休憩",
            btnStart: "スタート",
            btnPause: "一時停止",
            btnReset: "リセット",
            modeWorkBtn: "集中 25",
            modeShortBtn: "短い休憩 5",
            modeLongBtn: "長い休憩 15",
            notifTitle: "Chill Time",
            notifBreak: "休憩の時間です!",
            notifWork: "作業の時間です!",
            scoreLabel: "スコア",
            newGame: "🔄 新しいゲーム",
            newGameBtn: "新しいゲーム",
            gameOverSimple: "ゲームオーバー!",
            gameOverScore: "ゲームオーバー! スコア: ",
            winText: "🎉 勝利! 2048!",
            hint: "盤面をスワイプするか矢印キーを使ってください",
            fallingBtn: "❄️ 降らせる 😈",
            fallingBtnTitle: "クリックでGIFが降ります"
        }
    };

    // Делаем переводы доступными для инлайн-скриптов (Pomodoro, 2048) на странице
    window.CHILL_I18N = {
        translations,
        getLang() {
            return localStorage.getItem('selectedLanguage') || 'ru';
        },
        t(key) {
            const lang = this.getLang();
            return (translations[lang] && translations[lang][key]) || (translations.ru && translations.ru[key]) || key;
        }
    };

    // Применяет переводы ко всем статическим элементам страницы по data-атрибутам:
    // data-i18n           -> textContent
    // data-i18n-title      -> title
    // data-i18n-aria-label -> aria-label
    function applyStaticTranslations(lang) {
        const dict = translations[lang] || translations.ru;

        document.documentElement.lang = lang === 'jp' ? 'ja' : lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) el.textContent = dict[key];
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (dict[key] !== undefined) el.title = dict[key];
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria-label');
            if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
        });

        // Сообщаем остальным скриптам (Pomodoro/2048), что язык сменился,
        // чтобы они могли обновить динамический текст (кнопки, лейблы состояния)
        document.dispatchEvent(new CustomEvent('chillLanguageChange', { detail: { lang } }));
    }

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
        applyStaticTranslations(lang);
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
        applyStaticTranslations(savedLang);
    }

    // Функция получения погоды
    let weatherController;
    let weatherRequestId = 0;
    async function getWeather(city = "Khabarovsk") {
        // Очищаем город от возможных доп. данных (температуры и т.д.)
        const requestId = ++weatherRequestId;
        if (weatherController) weatherController.abort();
        weatherController = new AbortController();
        const controller = weatherController;
        const cleanCity = city.split(':')[0].trim();
        const lang = localStorage.getItem('selectedLanguage') || 'ru';
        const url = new URL('/api/weather', window.location.origin);
        url.searchParams.set('q', cleanCity);
        url.searchParams.set('lang', lang);

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

        const timeout = setTimeout(() => controller.abort(), 12000);
        try {
            const response = await fetch(url, {signal: controller.signal});
            if (requestId !== weatherRequestId) return;
            if (!response.ok) {
                const key = response.status === 404 ? 'cityNotFound' : response.status === 429 ? 'weatherRateLimit' : 'weatherUnavailable';
                throw new Error(translations[lang][key]);
            }
            const data = await response.json();
            if (requestId !== weatherRequestId) return;

            if (data.cod === 200) {
                // Сохраняем последний успешно найденный город
                try { localStorage.setItem('lastCity', data.name); } catch (_) {}

                // Cache the successful response
                try {
                    localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), data }));
                } catch (e) {
                    // ignore storage full or disabled
                    console.warn('Failed to store weather cache', e);
                }

                await renderWeather(data, lang);
            } else {
                throw new Error(translations[lang].weatherUnavailable);
            }
        } catch (error) {
            if (requestId !== weatherRequestId) return;
            const errorMessage = [translations[lang].cityNotFound, translations[lang].weatherRateLimit].includes(error.message)
                ? error.message : translations[lang].weatherUnavailable;
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
                            ${errorMessage}
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
        } finally {
            clearTimeout(timeout);
        }
    }

    // Рендер погоды — вынесен, чтобы можно было переиспользовать (и использовать кеш)
    function escapeWeatherText(value) {
        const span = document.createElement('span');
        span.textContent = String(value);
        return span.innerHTML;
    }
    async function renderWeather(data, lang) {
    document.dispatchEvent(new CustomEvent('chillWeatherChange', {detail: {id: data.weather?.[0]?.id}}));
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
                        ${escapeWeatherText(data.name)}: ${Math.round(data.main.temp)}°C
                    </div>
                    <div style="font-size: 1rem; margin-bottom: 8px;">
                        ${escapeWeatherText(data.weather[0].description)}
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
                const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(3000) });
                return res.ok;
            } catch (e) {
                try {
                    const res2 = await fetch(url, {signal: AbortSignal.timeout(3000)});
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

        const mediaContainer = document.getElementById('weather-media');
        let chosen = null;
        for (const c of candidates) {
            if (await resourceExists(c)) { chosen = c; break; }
            const alt = decodeURIComponent(c);
            if (alt !== c && await resourceExists(alt)) { chosen = alt; break; }
        }

        if (!mediaContainer.isConnected) return;
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
        const initialRequestId = weatherRequestId;
        const lastCity = localStorage.getItem('lastCity');
        if (lastCity) {
            await getWeather(lastCity);
        } else {
            // Если нет сохраненного города, пробуем определить по IP
            try {
                const ipResponse = await fetch('https://ipapi.co/json/', {signal: AbortSignal.timeout(4000)});
                const ipData = await ipResponse.json();
                const city = ipData.city || 'Khabarovsk';
                if (weatherRequestId === initialRequestId) await getWeather(city);
            } catch (error) {
                console.error('Ошибка определения по IP:', error);
                if (weatherRequestId === initialRequestId) await getWeather('Khabarovsk');
            }
        }
    }

    initWeather();
    });
}

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

// Falling GIFs animation (triggered by button click) redaction Gif
function initFallingGifsButton() {
    // Keep the smallest existing animations; avoid downloading multi-megabyte GIFs.
    const urls = [1, 4, 5, 11, 13].map(n => `/main/img/falling_${n}.gif`);
    const button = document.getElementById('falling-gifs-btn');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const particles = new Set();
    let interval = null, timeout = null;
    function stop() {
        clearInterval(interval); clearTimeout(timeout); interval = null;
        particles.forEach(node => node.remove()); particles.clear();
        button.disabled = false;
    }
    button.addEventListener('click', () => {
        if (interval || document.hidden) return;
        button.disabled = true;
        const spawn = () => {
            const limit = reducedMotion.matches ? 1 : innerWidth < 600 ? 6 : 10;
            if (particles.size >= limit) return;
            const node = document.createElement('div');
            node.className = 'falling-gif';
            node.style.backgroundImage = `url('${urls[Math.floor(Math.random()*urls.length)]}')`;
            node.style.left = Math.random()*Math.max(0, innerWidth-80)+'px';
            node.style.width = node.style.height = '80px';
            node.style.animationDuration = '6s';
            if (reducedMotion.matches) {
                node.style.animation = 'none';
                node.style.top = '50%';
                node.style.backgroundImage = "url('/main/img/weather-gifs/snow.svg')";
            }
            particles.add(node); document.body.appendChild(node);
            node.addEventListener('animationend', () => {node.remove(); particles.delete(node);}, {once:true});
        };
        spawn(); interval = setInterval(spawn, 700);
        timeout = setTimeout(stop, reducedMotion.matches ? 1500 : 12000);
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
    window.addEventListener('pagehide', stop);
}

// Start button listener when page loads
document.addEventListener("DOMContentLoaded", function() {
    initFallingGifsButton();
});
