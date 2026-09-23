# Lo-fi background

Generated with the built-in imagegen tool. Website asset: `main/img/lofi-room.jpg`.
The generated PNG was converted to JPEG at quality 82 for delivery; no external image service is required at runtime.

## Generation prompt

Create a finished website background artwork, wide landscape 16:9. Original anime lo-fi background painting: cozy Japanese attic study at blue hour, large window overlooking layered quiet rooftops and distant violet mountains, peach sunset fading into indigo sky. Warm desk lamp, books and tiny sleeping cat on the right lower corner, trailing plants framing upper right, wooden desk lower edge. Composition mostly open atmospheric window in center and left with uncluttered dark purple negative space in upper center for white clock UI overlay. Beautiful hand-painted anime environment, subtle paper grain, muted dusty lavender, midnight plum, warm amber accents, cinematic soft light, detailed but restful. No people, no writing, no typography, no UI, no watermark. Save asset for website use.

## Time-of-day variants

Built-in imagegen edits of `main/img/lofi-room.jpg`, delivered as JPEG quality 82:

- `main/img/lofi-morning.jpg`
- `main/img/lofi-day.jpg`
- `main/img/lofi-night.jpg`

The original `lofi-room.jpg` is the evening scene. Automatic schedule uses the device's local clock: morning 06:00–11:00, day 11:00–17:00, evening 17:00–21:00, night 21:00–06:00. This is a fixed artistic schedule, not astronomical sunrise/sunset. Manual choice is saved in `chillScene`. The moon button selects night and the sun selects day; select Auto to resume the schedule. Images load on demand, the previous scene remains on a load error, and opacity transitions respect reduced-motion preferences.

### Morning prompt

Edit this exact background into early MORNING lighting. Preserve camera, crop, window frames, all furniture, sleeping cat, plants, town and mountain silhouettes in exactly the same positions. Only change time of day and illumination. Pale peach sunrise on left, soft powder-blue sky, light morning mist over distant mountains, gentle warm early sun illuminating desk, desk lamp switched OFF, town window lights off. Same hand painted anime lo-fi style. No text, no added objects, landscape same aspect ratio. A single morning variant.

### Day prompt

Edit this exact background into bright MIDDAY. Preserve camera, crop, window frames, all furniture, sleeping cat, plants, town and mountain silhouettes in exactly the same positions. Only change time of day and illumination. Clear azure sky with soft white clouds, vivid but gentle natural green foliage, distant blue mountains, neutral bright daylight entering window, natural wood desk lit by daylight, desk lamp switched OFF, town lights off. No sunset orange, no stars. Same hand painted anime lo-fi style. No text, no new objects, same landscape aspect ratio. A single midday variant.

### Night prompt

Edit this exact background into deep NIGHT. Preserve camera, crop, window frames, all furniture, sleeping cat, plants, town and mountain silhouettes in exactly the same positions. Change only time of day and illumination: deep midnight blue sky with sparse delicate stars and a modest crescent moon in upper left sky inside window, cool moonlit roof tiles, distant dark mountains, scattered warm town windows. Desk lamp remains ON casting cozy warm amber light onto books and sleeping cat. Remove ALL sunset orange on horizon, night not dusk. Same hand painted anime lo-fi style. No text, no additional furniture, same landscape aspect ratio. A single night variant.


## Cat anatomy correction

All four main/img/lofi-{room,morning,day,night}.jpg files were replaced using built-in imagegen edits. One sleeping tabby, one head, paws tucked beneath the body, a single curled tail. The corrected evening cat was the pose reference for morning, day and night. The scene loader uses an updated image URL to avoid stale browser copies.

Prompt for evening: Surgical local edit: correct ONLY the malformed animal on the lower-right desk. Replace the entire two-headed cat shape with ONE small sleeping grey-and-white tabby cat curled into a compact oval loaf: exactly ONE head at the RIGHT end, two ears, one muzzle with closed eyes, ONE continuous body extending left, both front paws tucked underneath and hind paws hidden, a single tail wrapped around the body. No second face or extra visible paws. Keep the cat in the same small footprint between mug and box, behind notebook. Preserve ALL other pixels/composition as closely as possible, including exact sky, landscape, desk, mug, books, lamp, plants, framing and existing time-of-day lighting. Same anime painted style, identical landscape aspect ratio. No text.

Prompt template for the other three scenes: Local edit of FIRST image only: replace malformed two-headed cat in lower right with the single curled sleeping tabby cat shown in SECOND image. Exactly one head on right, one continuous oval body on left, paws tucked hidden, single curled tail. Match the reference cat's pose and position. Preserve FIRST image [morning / midday / night] lighting, sky, lamp state, furniture, landscape, crop, all other details unchanged. Second image is cat anatomy reference only, do not copy its sunset. Return one full landscape image with the original time of day.
