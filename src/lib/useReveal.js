import { useEffect, useRef } from "react";

/**
 * Lightweight IntersectionObserver reveal. Attach the returned ref to a
 * container; any descendant with .reveal-up animates in, staggered by its
 * data-reveal-i index (or DOM order). Honours reduced-motion (CSS no-ops).
 */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const { stagger = 90, threshold = 0.15, once = true } = options;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll(".reveal-up"));
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const group = el.parentElement
            ? Array.from(el.parentElement.querySelectorAll(".reveal-up"))
            : [el];
          const i = el.dataset.revealI ?? group.indexOf(el);
          el.style.transitionDelay = `${Number(i) * stagger}ms`;
          el.classList.add("reveal-in");
          if (once) io.unobserve(el);
        });
      },
      { threshold }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [stagger, threshold, once]);

  return ref;
}
