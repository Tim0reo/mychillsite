function sceneForHour(hour) {
    if (hour >= 6 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 17) return 'day';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
}
if (typeof module !== 'undefined') module.exports = {sceneForHour};
if (typeof document !== 'undefined') (() => {
    const files = {morning:'lofi-morning.jpg', day:'lofi-day.jpg', evening:'lofi-room.jpg', night:'lofi-night.jpg'};
    const select = document.getElementById('scene-select');
    const stage = document.getElementById('scene-background');
    const status = document.getElementById('scene-status');
    let choice = 'auto', displayed = '', pending = '', requestId = 0, timer;
    let error = false;
    try {
        const saved = localStorage.getItem('chillScene');
        if (saved === 'auto' || files[saved]) choice = saved;
    } catch (_) {}
    select.value = choice;
    const t = key => window.CHILL_I18N?.t(key) || key;
    function updateLabels() {
        status.textContent = error ? t('sceneError') : pending ? t('sceneLoading') : '';
        status.hidden = !status.textContent;
        const button = document.getElementById('theme-toggle');
        const dark = displayed === 'night';
        button.textContent = dark ? '☀' : '☾';
        button.setAttribute('aria-pressed', String(dark));
        button.setAttribute('aria-label', t('nightMode'));
        button.title = t('nightMode');
    }
    function schedule() {
        clearTimeout(timer);
        if (choice !== 'auto' || document.hidden) return;
        const now = new Date();
        const next = new Date(now);
        const boundary = [6,11,17,21].find(hour => hour > now.getHours());
        if (boundary === undefined) {next.setDate(next.getDate()+1); next.setHours(6,0,0,0);}
        else next.setHours(boundary,0,0,0);
        timer = setTimeout(refresh, Math.max(1000, next.getTime()-now.getTime()));
    }
    async function refresh() {
        schedule();
        const scene = choice === 'auto' ? sceneForHour(new Date().getHours()) : choice;
        if (scene === pending) return;
        const id = ++requestId;
        pending = '';
        if (scene === displayed) {error=false; updateLabels(); return;}
        pending = scene; error = false; updateLabels();
        const picture = new Image();
        picture.alt = '';
        picture.decoding = 'async';
        let loadTimer;
        try {
            await new Promise((resolve, reject) => {
                loadTimer = setTimeout(() => reject(new Error('Image timeout')), 15000);
                picture.onload = resolve;
                picture.onerror = reject;
                picture.src = `/main/img/${files[scene]}?v=cat-fixed-1`;
            });
            if (id !== requestId) return;
            const previous = [...stage.children];
            stage.appendChild(picture);
            // Commit the initial opacity before starting the fade.
            picture.getBoundingClientRect();
            picture.classList.add('visible');
            setTimeout(() => previous.forEach(node => node.remove()), 1100);
            displayed = scene;
            document.body.dataset.scene = scene;
            document.body.classList.toggle('dark-theme', scene === 'night');
            document.querySelector('meta[name="theme-color"]').content = scene === 'night' ? '#171e37' : '#c9b0e9';
            document.body.classList.add('bg-loaded');
        } catch (_) {
            if (id === requestId) error = true;
        } finally {
            clearTimeout(loadTimer);
            if (id === requestId) {
                pending = '';
                document.getElementById('bg-loader')?.remove();
                updateLabels();
            }
        }
    }
    function choose(value) {
        choice = value;
        select.value = value;
        try {localStorage.setItem('chillScene', value);} catch (_) {}
        refresh();
    }
    select.addEventListener('change', () => choose(select.value));
    document.getElementById('theme-toggle').addEventListener('click', () => {
        // The crescent still opens night directly; the sun opens daytime.
        choose(displayed === 'night' ? 'day' : 'night');
    });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) clearTimeout(timer); else refresh();
    });
    window.addEventListener('focus', refresh);
    window.addEventListener('pageshow', refresh);
    document.addEventListener('chillLanguageChange', updateLabels);
    document.addEventListener('DOMContentLoaded', refresh);
})();
