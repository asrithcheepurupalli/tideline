import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the whole page with Lenis smooth scroll and syncs GSAP ScrollTrigger
 * to it. No-ops (native scroll) under prefers-reduced-motion.
 */
export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // Desktop only. On touch, Lenis fights native momentum scrolling (dead,
    // stop-mid-flick scroll on phones). Mobile uses native scroll, and GSAP
    // ScrollTrigger updates on the native scroll position as usual.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // expose for anchor jumps
    window.__lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
}
