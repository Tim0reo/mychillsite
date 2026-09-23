// Coordinates follow the illustrated window through the same centered cover crop as the background.
(() => {
    const canvas = document.getElementById('weather-effects');
    const ctx = canvas.getContext('2d');
    const toggle = document.getElementById('weather-effects-toggle');
    const note = document.getElementById('weather-effects-note');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let activated = false, enabled = true, effect = 'none', frame = 0, last = 0, width, height, particles = [];
    try {enabled = localStorage.getItem('weatherEffects') !== 'off';} catch (_) {}
    toggle.checked = enabled;
    function labels() {
        if (!window.CHILL_I18N) return;
        note.textContent = window.CHILL_I18N.t(reduced.matches ? 'effectsReduced' : 'effectsHint');
    }
    function resize() {
        width = innerWidth; height = innerHeight;
        const ratio = Math.min(devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
        ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
        const count = width < 700 ? 35 : 75;
        particles = Array.from({length:count}, () => ({x:Math.random()*width, y:Math.random()*height, size:1+Math.random()*1.7, speed:0.7+Math.random()*0.7, phase:Math.random()*Math.PI*2}));
    }
    function windowPath() {
        const scale = Math.max(width/1672, height/941);
        const dx = (width-1672*scale)/2, dy = (height-941*scale)/2;
        // Keep away from the window frame, desk and the dense plants on the right.
        const points = [[276,100],[1090,22],[1195,172],[1195,739],[276,749]];
        ctx.beginPath();
        points.forEach(([x,y], i) => i ? ctx.lineTo(dx+x*scale,dy+y*scale) : ctx.moveTo(dx+x*scale,dy+y*scale));
        ctx.closePath(); ctx.clip();
    }
    function draw(now) {
        frame = 0;
        if (now-last < 1000/30) {frame=requestAnimationFrame(draw); return;}
        const dt = last ? Math.min((now-last)/1000,0.06) : 1/30;
        last = now;
        ctx.clearRect(0,0,width,height);
        ctx.save(); windowPath();
        ctx.strokeStyle='rgba(206,225,250,.36)'; ctx.fillStyle='rgba(239,245,255,.65)'; ctx.lineWidth=.9;
        for (const p of particles) {
            if (effect === 'rain') {
                p.y += 410*p.speed*dt; p.x -= 75*dt;
                ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x-3,p.y+14*p.speed); ctx.stroke();
            } else {
                p.y += 28*p.speed*dt; p.x += Math.sin(now/1800+p.phase)*10*dt;
                ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
            }
            if (p.y>height+20) {p.y=-20; p.x=Math.random()*width;}
            if (p.x < -20) p.x=width+10;
            if (p.x > width+20) p.x=-10;
        }
        ctx.restore();
        frame=requestAnimationFrame(draw);
    }
    function sync() {
        cancelAnimationFrame(frame); frame=0; last=0;
        ctx?.clearRect(0,0,width,height);
        const running = ctx && activated && enabled && !reduced.matches && !document.hidden && effect !== 'none';
        canvas.dataset.effect = effect;
        canvas.dataset.running = String(Boolean(running));
        canvas.hidden = !running;
        labels();
        if (running) frame=requestAnimationFrame(draw);
    }
    document.addEventListener('chillWeatherChange', event => {
        const id = Number(event.detail.id);
        effect = id >= 600 && id < 700 ? 'snow' : id >= 200 && id < 600 ? 'rain' : 'none';
        sync();
    });
    document.addEventListener('chillTabChange', event => {
        if (event.detail.tab === 'weather-tab') {activated = true; sync();}
    });
    toggle.addEventListener('change', () => {
        enabled=toggle.checked;
        try {localStorage.setItem('weatherEffects', enabled ? 'on' : 'off');} catch (_) {}
        sync();
    });
    window.addEventListener('resize', () => {resize();sync();});
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    document.addEventListener('chillLanguageChange', labels);
    window.addEventListener('pagehide', () => {cancelAnimationFrame(frame);frame=0;canvas.dataset.running='false';});
    window.addEventListener('pageshow', sync);
    resize();sync();
})();
