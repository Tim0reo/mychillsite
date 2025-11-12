#!/usr/bin/env node
/**
 * Генератор манифеста медиа-файлов для weatherGifs
 * Собирает MP4/WebP/GIF и сопоставляет их с погодными состояниями по ключевым словам в названии файла.
 * Результат: main/img/converted_manifest.json
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mp4Dir = path.join(root, 'main', 'img', 'converted_mp4');
const webpDir = path.join(root, 'main', 'img', 'converted_webp');
const gifDir = path.join(root, 'main', 'img'); // search recursively for .gif
const svgDir = path.join(root, 'main', 'img', 'weather-gifs');
const outFile = path.join(root, 'main', 'img', 'converted_manifest.json');

const conditions = {
  clear: ['clear', 'sun', 'sunny', 'morning'],
  rain: ['rain', 'raining', 'rainy', 'shower'],
  snow: ['snow', 'snowy'],
  clouds: ['cloud', 'clouds', 'ghibli', 'overcast', 'пасмурно', 'облачно'],
  thunderstorm: ['thunder', 'storm', 'thunderstorm', 'гроза'],
  drizzle: ['drizzle', 'морос', 'морось'],
  mist: ['mist', 'fog', 'туман', 'misty', 'foggy'],
  fog: ['fog', 'mist', 'туман']
};

function listFiles(dir, exts) {
  try {
    return fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => exts.includes(path.extname(f).toLowerCase())) : [];
  } catch (e) {
    return [];
  }
}

function walkDirForExt(dir, exts) {
  const results = [];
  function walk(d) {
    if (!fs.existsSync(d)) return;
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (exts.includes(path.extname(e.name).toLowerCase())) results.push(full);
    }
  }
  walk(dir);
  return results;
}

function matchCondition(filenameLower) {
  for (const key of Object.keys(conditions)) {
    for (const kw of conditions[key]) {
      if (filenameLower.includes(kw)) return key;
    }
  }
  return null;
}

function ensureLeadingSlash(p) {
  return p.startsWith('/') ? p : '/' + p.replace(/\\\\/g, '/');
}

const manifest = {};
for (const k of Object.keys(conditions).concat(['default'])) manifest[k] = [];

// Process MP4
const mp4Files = listFiles(mp4Dir, ['.mp4']).map(f => path.join(mp4Dir, f));
for (const full of mp4Files) {
  const name = path.basename(full, path.extname(full));
  const key = matchCondition(name.toLowerCase()) || 'default';
  const rel = path.relative(root, full).replace(/\\\\/g, '/');
  manifest[key].push(ensureLeadingSlash(rel));
}

// Process WebP
const webpFiles = listFiles(webpDir, ['.webp']).map(f => path.join(webpDir, f));
for (const full of webpFiles) {
  const name = path.basename(full, path.extname(full));
  const key = matchCondition(name.toLowerCase()) || 'default';
  const rel = path.relative(root, full).replace(/\\\\/g, '/');
  // avoid duplicates
  if (!manifest[key].includes(ensureLeadingSlash(rel))) manifest[key].push(ensureLeadingSlash(rel));
}

// Process GIFs anywhere under main/img
const gifFiles = walkDirForExt(gifDir, ['.gif']);
for (const full of gifFiles) {
  const name = path.basename(full, path.extname(full));
  const key = matchCondition(name.toLowerCase()) || 'default';
  const rel = path.relative(root, full).replace(/\\\\/g, '/');
  if (!manifest[key].includes(ensureLeadingSlash(rel))) manifest[key].push(ensureLeadingSlash(rel));
}

// Finally add SVG fallbacks if exist in svgDir
for (const key of Object.keys(manifest)) {
  const svgPath = path.join(svgDir, `${key}.svg`);
  if (fs.existsSync(svgPath)) {
    const rel = path.relative(root, svgPath).replace(/\\\\/g, '/');
    // ensure svg is last fallback
    if (!manifest[key].includes(ensureLeadingSlash(rel))) manifest[key].push(ensureLeadingSlash(rel));
  }
}

// Save manifest
try {
  fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Media manifest written to', outFile);
} catch (e) {
  console.error('Failed to write manifest', e);
  process.exitCode = 2;
}
