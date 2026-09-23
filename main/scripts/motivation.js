(() => {
    const heading = document.getElementById('motivation');
    const keys = ['lofiTitle', 'quoteShakespeare', 'motivationStep', 'quoteChekhov', 'motivationToday', 'quoteBasho', 'motivationRest', 'motivationStart'];
    const author = document.getElementById('motivation-author');
    const block = document.querySelector('.motivation-block');
    const authors = {
        quoteShakespeare: 'authorShakespeare',
        quoteChekhov: 'authorChekhov',
        quoteBasho: 'authorBasho'
    };
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0, timer, fadeTimer;
    function render() {
        heading.dataset.i18n = keys[index];
        heading.textContent = window.CHILL_I18N.t(keys[index]);
        const authorKey = authors[keys[index]];
        author.hidden = !authorKey;
        author.textContent = authorKey ? '— ' + window.CHILL_I18N.t(authorKey) : '';
        block.classList.remove('is-fading');
    }
    function schedule() {
        clearTimeout(timer);
        if (!document.hidden) timer = setTimeout(rotate, 60000);
    }
    function rotate() {
        if (document.hidden) return;
        clearTimeout(fadeTimer);
        index = (index + 1) % keys.length;
        if (reducedMotion.matches) render();
        else {
            block.classList.add('is-fading');
            fadeTimer = setTimeout(render, 350);
        }
        schedule();
    }
    document.addEventListener('DOMContentLoaded', () => {render(); schedule();});
    document.addEventListener('chillLanguageChange', () => {
        clearTimeout(fadeTimer);
        render();
        schedule();
    });
    document.addEventListener('visibilitychange', () => {
        clearTimeout(fadeTimer);
        render();
        schedule();
    });
    window.addEventListener('pagehide', () => {clearTimeout(timer); clearTimeout(fadeTimer);});
    window.addEventListener('pageshow', schedule);
})();
