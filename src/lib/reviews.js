import Swiper from 'swiper';
import { Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

/* Sample reviews to seed the carousel for the demo. Client can replace these
   with their real Google / Facebook reviews. Kept believable and local. */
const SEED = [
  { name: 'Marie H.', src: 'Facebook', rating: 5,
    text: 'Rebuilt our front garden wall after a car clipped it. Matched the old bricks so well you honestly can’t tell where the join is. Tidy, polite, cleared up every day.' },
  { name: 'Paul & Sam', src: 'Langley', rating: 5,
    text: 'Repointed the whole back of the house. Turned up when they said, fair price, and it looks a hundred times better. Would have them back tomorrow.' },
  { name: 'D. Okafor', src: 'Google', rating: 4,
    text: 'Good, solid brickwork on our extension. Job took a little longer than planned but the finish is spot on and they kept us in the loop throughout.' },
  { name: 'Jenny R.', src: 'Facebook', rating: 5,
    text: 'New brick piers and railings out front. Proper craftsmen — dead straight, lovely crisp joints. Neighbours have already asked who did it.' },
  { name: 'Tom (Iver)', src: 'Facebook', rating: 5,
    text: 'Block-paved the drive and laid a brick border. Great communication from the first quote to the last brush-down. Highly recommend to anyone local.' },
];

const KEY = 'oeb_reviews_v1';

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
};
const save = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

const escape = (s) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function stars(n) {
  return '★★★★★'.split('').map((s, i) =>
    i < n ? '★' : '<span class="off">★</span>').join('');
}

function slide(r) {
  return `<div class="swiper-slide">
    <article class="review">
      <div class="review__stars" aria-label="${r.rating} out of 5">${stars(r.rating)}</div>
      <p class="review__text">“${escape(r.text)}”</p>
      <div class="review__by">
        <span class="review__name">${escape(r.name)}</span>
        <span class="review__src">${escape(r.src)}</span>
      </div>
    </article>
  </div>`;
}

export function initReviews() {
  const track = document.getElementById('reviews-track');
  if (!track) return;

  const all = [...load(), ...SEED];
  track.innerHTML = all.map(slide).join('');

  const swiper = new Swiper('#reviews-carousel', {
    modules: [Pagination, Autoplay, A11y],
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    rewind: true,
    autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
    pagination: { el: '#reviews-pagination', clickable: true },
    breakpoints: { 720: { slidesPerView: 2 }, 1080: { slidesPerView: 3 } },
  });

  document.getElementById('rev-prev')?.addEventListener('click', () => swiper.slidePrev());
  document.getElementById('rev-next')?.addEventListener('click', () => swiper.slideNext());

  wireForm(swiper, track, all);
}

function wireForm(swiper, track, all) {
  const form = document.getElementById('review-form');
  const note = document.getElementById('review-note');
  const starsBox = document.getElementById('stars-input');
  const ratingInput = form.querySelector('input[name="rating"]');

  // Star picker
  const paint = (n) => starsBox.querySelectorAll('button').forEach((b, i) =>
    b.classList.toggle('on', i < n));
  paint(5);
  starsBox.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const n = Number(b.dataset.star);
    ratingInput.value = n;
    paint(n);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const review = {
      name: (data.get('name') || '').toString().trim() || 'Anonymous',
      text: (data.get('text') || '').toString().trim(),
      rating: Number(data.get('rating')) || 5,
      src: 'Website',
    };
    if (!review.text) return;

    const stored = JSON.parse(localStorage.getItem(KEY) || '[]');
    stored.unshift(review);
    save(stored);

    swiper.prependSlide(slide(review));
    swiper.update();
    swiper.slideTo(0, 400);

    form.reset();
    paint(5);
    ratingInput.value = 5;
    note.hidden = false;
    setTimeout(() => { note.hidden = true; }, 4000);
  });
}
