// The recording loads only after an explicit play request.
(() => {
    const button = document.querySelector('[data-ambience="rain"]');
    const slider = document.getElementById('rain-volume');
    const status = document.getElementById('ambience-status');
    const t = key => window.CHILL_I18N?.t(key) || key;
    let audio, busy = false, generation = 0;
    function updateButton() {
        const active = Boolean(audio && !audio.paused);
        button.setAttribute('aria-pressed', String(active));
        button.querySelector('.sound-icon').textContent = active ? 'Ⅱ' : '▶';
        button.setAttribute('aria-label', `${t(active ? 'soundStop' : 'soundPlay')}: ${t('soundRain')}`);
        document.querySelector('[data-tab="sounds-tab"]')?.classList.toggle('has-audio', active);
    }
    function showError() {
        audio?.pause();
        updateButton();
        status.textContent = t('soundError');
        status.hidden = false;
    }
    button.addEventListener('click', async () => {
        if (busy) return;
        busy = true;
        const request = ++generation;
        try {
            if (!audio) {
                audio = new Audio('/main/audio/rain_sound.mp3');
                audio.preload = 'none';
                audio.loop = true;
                audio.addEventListener('error', showError);
                audio.addEventListener('play', updateButton);
                audio.addEventListener('pause', updateButton);
            }
            audio.volume = Number(slider.value) / 100;
            if (!audio.paused) audio.pause();
            else await audio.play();
            if (request !== generation) {audio.pause(); return;}
            updateButton();
            status.hidden = true;
        } catch (_) {if (request === generation) showError();}
        finally {busy = false;}
    });
    slider.addEventListener('input', () => {
        slider.nextElementSibling.value = `${slider.value}%`;
        if (audio) audio.volume = Number(slider.value) / 100;
    });
    document.addEventListener('chillLanguageChange', () => {
        updateButton();
        if (!status.hidden) status.textContent = t('soundError');
    });
    document.addEventListener('DOMContentLoaded', updateButton);
    window.addEventListener('pagehide', () => {generation++; audio?.pause(); updateButton();});
})();
