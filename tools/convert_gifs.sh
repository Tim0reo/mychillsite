#!/usr/bin/env bash
# Simple helper to convert GIFs in main/img/weather-gifs to MP4 and animated WebP
# Requires: ffmpeg, cwebp (from libwebp)
# Usage: chmod +x tools/convert_gifs.sh && ./tools/convert_gifs.sh

SRC_PARENT="main/img"
OUT_MP4_DIR="$SRC_PARENT/converted_mp4"
OUT_WEBP_DIR="$SRC_PARENT/converted_webp"

mkdir -p "$OUT_MP4_DIR" "$OUT_WEBP_DIR"

echo "Searching for GIF files under $SRC_PARENT..."

# Use find -print0 for safety and a while read loop to be compatible with zsh/bash
found=false
while IFS= read -r -d '' gif; do
  found=true
  base=$(basename "$gif" .gif)
  mp4_out="$OUT_MP4_DIR/${base}.mp4"
  webp_out="$OUT_WEBP_DIR/${base}.webp"

  echo "Converting $gif -> $mp4_out"
  ffmpeg -y -i "$gif" -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 28 "$mp4_out" || echo "ffmpeg failed for $gif"

    echo "Converting $gif -> $webp_out"
    # Prefer gif2webp for animated WebP (part of libwebp); fall back to cwebp if gif2webp unavailable
    if command -v gif2webp >/dev/null 2>&1; then
      gif2webp -q 80 "$gif" -o "$webp_out" || echo "gif2webp failed for $gif"
    elif command -v cwebp >/dev/null 2>&1; then
      # cwebp usually converts single images; animated conversion may not be supported.
      echo "Warning: gif2webp not found; attempting cwebp (may fail for animated GIFs)"
      cwebp -q 80 "$gif" -o "$webp_out" || echo "cwebp failed for $gif"
    else
      echo "Skipping WebP conversion: neither gif2webp nor cwebp found"
    fi
done < <(find "$SRC_PARENT" -type f -iname '*.gif' ! -path "*/converted_mp4/*" ! -path "*/converted_webp/*" -print0)

if [ "$found" = false ]; then
  echo "No GIF files found under $SRC_PARENT"
else
  echo "Done. Converted files saved to $OUT_MP4_DIR and $OUT_WEBP_DIR"
fi
