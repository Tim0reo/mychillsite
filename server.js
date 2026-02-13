const express = require('express');
const https = require('https');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;

if (!OPENWEATHER_KEY) {
  console.warn('Warning: OPENWEATHER_KEY is not set. API requests will fail until you add it to .env');
}

// Serve static files from project root
app.use(express.static(path.join(__dirname)));

// Simple proxy for OpenWeatherMap to keep the API key server-side
app.get('/api/weather', (req, res) => {
  const q = req.query.q || 'Khabarovsk';
  const lat = req.query.lat;
  const lon = req.query.lon;
  const lang = req.query.lang || 'ru';

  if (!OPENWEATHER_KEY) {
    return res.status(500).json({ error: 'Server: OPENWEATHER_KEY is not configured' });
  }

  const url = lat && lon
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&units=metric&appid=${OPENWEATHER_KEY}&lang=${encodeURIComponent(lang)}`
    : `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${OPENWEATHER_KEY}&lang=${encodeURIComponent(lang)}`;

  https.get(url, (apiRes) => {
    let data = '';
    apiRes.on('data', (chunk) => data += chunk);
    apiRes.on('end', () => {
      res.status(apiRes.statusCode).set({ 'Content-Type': 'application/json' }).send(data);
    });
  }).on('error', (err) => {
    console.error('Error fetching weather:', err);
    res.status(502).json({ error: 'Bad gateway', details: err.message });
  });
});

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
