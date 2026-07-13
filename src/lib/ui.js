/** Small UI wiring: sticky-header state, mobile menu, footer year. */
export function initUI() {
  const header = document.getElementById('site-header');
  const burger = document.getElementById('burger');

  // Add a border/darken once scrolled past the hero top.
  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle.
  burger?.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    document.body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  // Close the menu after tapping a link.
  header.querySelectorAll('.nav a').forEach((a) =>
    a.addEventListener('click', () => {
      header.classList.remove('menu-open');
      document.body.classList.remove('nav-open');
      burger?.setAttribute('aria-expanded', 'false');
    }));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}
