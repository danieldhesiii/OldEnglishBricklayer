import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Subtle fade-and-rise for [data-reveal] blocks (cards, tiles). */
export function initScrollReveal() {
  gsap.utils.toArray('[data-reveal]').forEach((el, i) => {
    gsap.from(el, {
      y: 30,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: (i % 3) * 0.07,
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
  });
}
