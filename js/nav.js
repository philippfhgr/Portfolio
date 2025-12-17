const toggle = document.querySelector('.nav-toggle');
const leftNav = document.querySelector('.leftnav-inner');
const menuLinks = leftNav.querySelectorAll('.menu-item a');

/* Toggle per Burger */
toggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = leftNav.classList.toggle('is-open');
  toggle.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', isOpen);
});

/* Menü schließt bei Klick auf Link */
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

/* Klick außerhalb schließt Menü */
document.addEventListener('click', (e) => {
  if (!leftNav.contains(e.target) && !toggle.contains(e.target)) {
    closeMenu();
  }
});

/* ESC schließt Menü */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});

/* Helper */
function closeMenu() {
  leftNav.classList.remove('is-open');
  toggle.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}
