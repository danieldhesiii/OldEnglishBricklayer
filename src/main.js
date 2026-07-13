import 'splitting/dist/splitting.css';
import './styles.css';

import { initSmoothScroll } from './lib/smoothScroll.js';
import { initTextReveal, initScrollReveal } from './lib/textReveal.js';
import { initUI } from './lib/ui.js';
import { initGallery } from './lib/gallery.js';
import { initCalculator } from './lib/calculator.js';
import { initReviews } from './lib/reviews.js';
import { initBooking } from './lib/booking.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Interactive features first — these must work regardless of motion prefs.
initUI();
initGallery();
initCalculator();
initReviews();
initBooking();

// Smooth scroll + scroll-driven animation only when motion is welcome.
if (!reduceMotion) {
  initSmoothScroll();
  initTextReveal();
  initScrollReveal();
} else {
  // Make sure split headings are visible if we skipped the reveal.
  document.querySelectorAll('[data-splitting]').forEach((el) => (el.style.opacity = 1));
}
