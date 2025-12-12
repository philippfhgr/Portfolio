(function () {
    function initCarousel(root) {
        const track = root.querySelector('[data-carousel-track]');
        const slides = Array.from(track.children);
        const n = slides.length;

        const dotsWrap = root.querySelector('[data-carousel-dots]');
        const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.dot')) : [];
        const prevBtn = root.querySelector('[data-carousel-prev]');
        const nextBtn = root.querySelector('[data-carousel-next]');

        let index = 0; // 0..n-1

        function setTransform() {
            track.style.transition = 'transform .35s ease';
            track.style.transform = `translateX(${-index * 100}%)`;
        }

        function updateUI() {
            slides.forEach((s, i) => {
                s.classList.toggle('current', i === index);
                s.setAttribute('aria-hidden', i === index ? 'false' : 'true');
            });
            dots.forEach((d, i) => {
                const active = i === index;
                d.classList.toggle('is-active', active);
                d.setAttribute('aria-selected', active ? 'true' : 'false');
                d.tabIndex = active ? 0 : -1;
            });
        }

        function goTo(i) {
            index = (i + n) % n; // wrap, aber ohne Klone im DOM
            setTransform();
            updateUI();
        }

        // Controls
        prevBtn?.addEventListener('click', () => goTo(index - 1));
        nextBtn?.addEventListener('click', () => goTo(index + 1));
        dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

        // Keyboard
        root.tabIndex = 0;
        root.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') goTo(index - 1);
            if (e.key === 'ArrowRight') goTo(index + 1);
        });

        // Initial
        setTransform();
        updateUI();
    }

    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
})();