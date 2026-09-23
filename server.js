const express = require('express');
const https = require('https');
const path = require('path');

function createApp({ apiKey = process.env.OPENWEATHER_KEY, get = https.get, timeoutMs = 8000 } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'index.html')));
  app.get('/manifest.json', (_, res) => res.sendFile(path.join(__dirname, 'manifest.json')));
  for (const directory of ['css', 'scripts', 'img', 'audio']) {
    app.use(`/main/${directory}`, express.static(path.join(__dirname, 'main', directory), { dotfiles: 'deny', index: false }));
  }
  app.get('/api/weather', (req, res) => {
    const q = req.query.q === undefined ? 'Khabarovsk' : req.query.q;
    const lang = req.query.lang || 'ru';
    if (typeof q !== 'string' || !q.trim() || q.length > 120 || !['ru', 'en', 'jp', 'ja'].includes(lang)) {
      return res.status(400).json({ error: 'invalid_query' });
    }
    if (!apiKey) return res.status(503).json({ error: 'weather_not_configured' });
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.search = new URLSearchParams({q: q.trim(), units: 'metric', appid: apiKey, lang: lang === 'jp' ? 'ja' : lang});
    let upstream, finished = false;
    function finish(status, body) {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      if (!res.destroyed) res.status(status).json(body);
    }
    const timer = setTimeout(() => {
      finish(504, { error: 'weather_timeout' });
      upstream?.destroy();
    }, timeoutMs);
    res.on('close', () => {
      clearTimeout(timer);
      if (!finished) { finished = true; upstream?.destroy(); }
    });
    try {
      upstream = get(url, apiRes => {
        let data = '', bytes = 0;
        apiRes.on('data', chunk => {
          bytes += Buffer.byteLength(chunk);
          if (bytes > 128 * 1024) {
            finish(502, { error: 'invalid_weather_response' }); upstream.destroy(); return;
          }
          data += chunk;
        });
        apiRes.on('error', () => finish(502, { error: 'weather_unavailable' }));
        apiRes.on('aborted', () => finish(502, { error: 'weather_unavailable' }));
        apiRes.on('end', () => {
          if (apiRes.statusCode !== 200) {
            const status = [404, 429].includes(apiRes.statusCode) ? apiRes.statusCode : 502;
            return finish(status, { error: status === 404 ? 'city_not_found' : 'weather_unavailable' });
          }
          try {
            const body = JSON.parse(data);
            if (Number(body.cod) !== 200 || typeof body.name !== 'string' || !Number.isFinite(body.main?.temp) || !body.weather?.[0]?.description || !body.wind) throw new Error();
            finish(200, body);
          } catch (_) { finish(502, { error: 'invalid_weather_response' }); }
        });
      });
      upstream.on('error', () => finish(502, { error: 'weather_unavailable' }));
    } catch (_) { finish(502, { error: 'weather_unavailable' }); }
  });
  return app;
}
if (require.main === module) {
  require('dotenv').config({path: path.join(__dirname, '.env')});
  const port = process.env.PORT || 3000;
  createApp().listen(port, () => console.log(`Server started: http://localhost:${port}`));
}
module.exports = { createApp };
