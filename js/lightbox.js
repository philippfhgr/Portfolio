(function () {
    const lb = document.getElementById('lb-projects');
    if (!lb) return;

    const figure = lb.querySelector('.lb-figure');
    const caption = lb.querySelector('.lb-caption');
    const btnClose = lb.querySelector('.lb-close');
    const btnPrev = lb.querySelector('.lb-prev');
    const btnNext = lb.querySelector('.lb-next');

    let items = []; // {el, src, alt}
    let index = 0;

    const clearFigure = () => { while (figure.firstChild) figure.removeChild(figure.firstChild); };
    const openLB = () => { lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); lb.focus(); };
    const closeLB = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); clearFigure(); };

    const isPlayableFile = src => /\.(mp4|webm|ogg)(\?|#|$)/i.test(src || '');
    const getAlt = (root) => root?.querySelector?.('.project-img img')?.alt || '';

    function toEmbed(url) {
        try {
            const u = new URL(url);
            const host = u.hostname.replace(/^www\./, '');
            // YouTube
            if (host.includes('youtube.com') || host === 'youtu.be') {
                let id = '';
                if (host === 'youtu.be') id = u.pathname.slice(1);
                else if (u.searchParams.get('v')) id = u.searchParams.get('v');
                else {
                    const m = u.pathname.match(/\/(embed|shorts)\/([^/?#]+)/);
                    if (m) id = m[2];
                }
                if (!id) return null;
                const start = u.searchParams.get('t') || u.searchParams.get('start') || 0;
                return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1${start ? `&start=${parseInt(start, 10)}` : ''}`;
            }
            // Vimeo
            if (host.includes('vimeo.com')) {
                const m = u.pathname.match(/\/(\d+)/);
                return m ? `https://player.vimeo.com/video/${m[1]}?autoplay=1&title=0&byline=0&portrait=0` : null;
            }
            return null;
        } catch { return null; }
    }

    function collectItems() {
        // Buttons (haben Priorität)
        const btns = Array.from(document.querySelectorAll('.project-cta')).map(btn => {
            let src = (btn.getAttribute('data-src') || '').trim();
            if (!src) {
                const wrap = btn.closest('.project')?.querySelector('.project-img[data-video]');
                src = (wrap?.getAttribute('data-video') || '').trim();
            }
            return src ? { el: btn, src, alt: getAlt(btn.closest('.project')) } : null;
        }).filter(Boolean);

        // Thumbs (Klick aufs Bild erlaubt)
        const thumbs = Array.from(document.querySelectorAll('.project .project-img[data-video]')).map(wrap => {
            const src = (wrap.getAttribute('data-video') || '').trim();
            return src ? { el: wrap, src, alt: getAlt(wrap.closest('.project')) } : null;
        }).filter(Boolean);

        // Merge ohne Duplikate, in DOM-Reihenfolge
        const merged = [...btns, ...thumbs].filter((o, i, self) => self.findIndex(x => x.src === o.src) === i);
        merged.sort((a, b) =>
            (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
        );
        return merged;
    }

    function openMedia(src, alt) {
        clearFigure();
        const emb = toEmbed(src);
        if (emb) {
            const iframe = document.createElement('iframe');
            iframe.className = 'lb-video';
            iframe.src = emb;
            iframe.title = alt || 'Video';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            figure.prepend(iframe);
            caption.textContent = alt || '';
            openLB();
            return true;
        }
        if (isPlayableFile(src)) {
            const video = document.createElement('video');
            video.className = 'lb-img';
            video.controls = true; video.autoplay = true;
            const source = document.createElement('source');
            source.src = src;
            source.type = src.endsWith('.webm') ? 'video/webm' : src.endsWith('.ogg') ? 'video/ogg' : 'video/mp4';
            video.appendChild(source);
            figure.prepend(video);
            caption.textContent = alt || '';
            openLB();
            return true;
        }
        return false;
    }

    function openAt(i) {
        items = collectItems();
        if (!items.length) return;
        index = (i + items.length) % items.length;
        const { src, alt } = items[index];
        if (!openMedia(src, alt)) {
            window.open(src, '_blank', 'noopener,noreferrer');
        }
    }

    const prev = () => openAt(index - 1);
    const next = () => openAt(index + 1);

    // Klicks: Buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.project-cta');
        if (!btn) return;
        e.preventDefault();
        let src = (btn.getAttribute('data-src') || '').trim();
        if (!src) {
            const wrap = btn.closest('.project')?.querySelector('.project-img[data-video]');
            src = (wrap?.getAttribute('data-video') || '').trim();
        }
        if (!src) return;
        const list = collectItems();
        const i = list.findIndex(x => x.src === src);
        openAt(i === -1 ? 0 : i);
    }, true);

    // Klicks: Bild (optional, kannst du entfernen, wenn nur Button öffnen soll)
    document.addEventListener('click', (e) => {
        const hit = e.target.closest('.project .project-img[data-video], .project .project-img[data-video] img');
        if (!hit) return;
        const wrap = hit.closest('.project .project-img[data-video]');
        const src = (wrap?.getAttribute('data-video') || '').trim();
        if (!src) return;
        e.preventDefault();
        const list = collectItems();
        const i = list.findIndex(x => x.src === src);
        openAt(i === -1 ? 0 : i);
    }, true);

    // Controls & Close outside
    btnClose?.addEventListener('click', closeLB);
    btnPrev?.addEventListener('click', () => prev());
    btnNext?.addEventListener('click', () => next());
    lb.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLB();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });
    lb.addEventListener('pointerup', (e) => {
        const inside = e.target.closest('.lb-figure, .lb-prev, .lb-next, .lb-close');
        if (!inside) closeLB();
    });
})();

(function () {
    const scope = document.getElementById('gallery');
    const lb = document.getElementById('lb-gallery');
    if (!scope || !lb) return;

    const imgEl = lb.querySelector('.lb-img');
    const caption = lb.querySelector('.lb-caption');
    const btnClose = lb.querySelector('.lb-close');
    const btnPrev = lb.querySelector('.lb-prev');
    const btnNext = lb.querySelector('.lb-next');

    let items = [];
    let index = 0;

    function collect() {
        return Array.from(scope.querySelectorAll('img[data-full]'));
    }
    function openLB() { lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); lb.focus(); }
    function closeLB() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); imgEl.src = ''; }

    function openAt(i) {
        items = collect();
        if (!items.length) return;
        index = (i + items.length) % items.length;
        const el = items[index];
        imgEl.src = el.getAttribute('data-full') || el.src;
        imgEl.alt = el.alt || '';
        caption.textContent = el.getAttribute('data-caption') || el.alt || '';
        openLB();
    }
    const prev = () => openAt(index - 1);
    const next = () => openAt(index + 1);

    scope.addEventListener('click', (e) => {
        const thumb = e.target.closest('img[data-full]');
        if (!thumb) return;
        e.preventDefault();
        const list = collect();
        const key = thumb.getAttribute('data-full') || thumb.src;
        const i = list.findIndex(x => (x.getAttribute('data-full') || x.src) === key);
        openAt(i === -1 ? 0 : i);
    });

    btnClose.addEventListener('click', closeLB);
    btnPrev.addEventListener('click', prev);
    btnNext.addEventListener('click', next);

    lb.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLB();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });
    lb.addEventListener('pointerup', (e) => {
        const inside = e.target.closest('.lb-figure, .lb-prev, .lb-next, .lb-close');
        if (!inside) closeLB();
    });
})();