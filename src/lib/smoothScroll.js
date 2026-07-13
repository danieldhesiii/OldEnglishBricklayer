import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scroll driven by GSAP's ticker so Lenis and ScrollTrigger
 * share a single rAF loop and stay perfectly in sync.
 */
export function initSmoothScroll() {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  // Keep ScrollTrigger in sync with Lenis' scroll position.
  lenis.on('scroll', ScrollTrigger.update);

  // Drive Lenis from GSAP's ticker (single source of truth for time).
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // GSAP ticker time is in seconds, Lenis wants ms.
  });

  // Avoid GSAP smoothing the ticker delta on top of Lenis' own lerp.
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
