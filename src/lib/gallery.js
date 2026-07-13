/**
 * Gallery filtering. Tiles carry data-cat; chips carry data-filter.
 * Kept dead simple so it's obvious how to extend with real photos:
 * add a <figure class="tile" data-cat="walls"> and drop an <img> inside
 * (or set data-src on .tile__ph) — no JS changes needed.
 */
export function initGallery() {
  const filters = document.getElementById('gallery-filters');
  const tiles = [...document.querySelectorAll('#gallery .tile')];
  if (!filters) return;

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;

    filters.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-active'));
    btn.classList.add('is-active');

    const want = btn.dataset.filter;
    tiles.forEach((tile) => {
      const show = want === 'all' || tile.dataset.cat === want;
      tile.classList.toggle('is-hidden', !show);
    });
  });
}
