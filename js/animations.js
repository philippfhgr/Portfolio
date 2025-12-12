(function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => e.target.classList.toggle('is-visible', e.isIntersecting));
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
})();