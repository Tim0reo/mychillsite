# MyChillSite — Local dev with OpenWeather proxy

This project is a static site that uses OpenWeather API. To avoid exposing the API key in client-side code, a tiny Express server is provided which serves static files and proxies /api/weather requests to OpenWeather using a server-side API key.

Quick start (macOS):

1. Copy `.env.example` to `.env` and set your OpenWeather API key:

```bash
cp .env.example .env
# then edit .env and set OPENWEATHER_KEY
```

2. Install dependencies and run the server:

```bash
npm install
npm start
```

3. Open http://localhost:3000 in your browser.

What changed:
- The front-end no longer contains the OpenWeather API key. It now requests `/api/weather?q=...&lang=...`.
- `server.js` serves static files and proxies requests to OpenWeather using the key from `process.env.OPENWEATHER_KEY`.

Notes:
- If you deploy, use environment variables in your hosting platform (Vercel/Netlify/AWS) to set `OPENWEATHER_KEY`.
- Keep `.env` out of version control.

Performance & asset optimizations
--------------------------------

### 1) Caching
The client caches successful weather responses in localStorage for 10 minutes to reduce API calls.

### 2) Media optimization & automatic manifest generation
Convert heavy GIFs to MP4 or animated WebP for much smaller size and better performance.

**Convert GIFs:** Use the helper script at `tools/convert_gifs.sh` (requires `ffmpeg` and `gif2webp`):

```bash
chmod +x tools/convert_gifs.sh
./tools/convert_gifs.sh
```

This creates MP4 and animated WebP files in `main/img/converted_mp4/` and `main/img/converted_webp/`.

**Generate manifest:** After converting GIFs (or adding new ones), regenerate the media manifest to automatically update the mapping:

```bash
npm run generate-manifest
```

This creates `main/img/converted_manifest.json` with all available media grouped by weather condition (clear, rain, snow, etc.). The client loads this manifest at startup and prioritizes MP4 → WebP → GIF → SVG fallbacks.

**Workflow:**
1. Add/download new GIFs to `main/img/`
2. Run `./tools/convert_gifs.sh`
3. Run `npm run generate-manifest`
4. Reload the page — new media will show automatically (no code changes needed!)

### 3) Lazy-loading
Weather GIFs are lazy-loaded via IntersectionObserver where supported.

### 4) SVG fallback icons
If animated media is not available, SVG weather icons in `main/img/weather-gifs/` serve as lightweight, fast fallbacks.
