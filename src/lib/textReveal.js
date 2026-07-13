import Splitting from 'splitting';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Split every [data-splitting] heading into characters and reveal them on
 * scroll with a staggered rise. Each word masks its own chars so they clip
 * cleanly as they slide up.
 */
export function initTextReveal() {
  const results = Splitting({ target: '[data-splitting]', by: 'chars' });

  results.forEach((result) => {
    gsap.set(result.el, { autoAlpha: 1 });
    gsap.from(result.chars, {
      yPercent: 115,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.018,
      scrollTrigger: { trigger: result.el, start: 'top 88%' },
    });
  });
}

/** Generic fade-and-rise for [data-reveal] blocks (cards, tiles, etc.). */
export function initScrollReveal() {
  gsap.utils.toArray('[data-reveal]').forEach((el, i) => {
    gsap.from(el, {
      y: 34,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power2.out',
      delay: (i % 3) * 0.06,
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
  });
}
