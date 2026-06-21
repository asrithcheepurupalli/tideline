import { useEffect, useRef, useState } from "react";
import WaveLine from "../components/WaveLine";

/**
 * A dark band that counts up the day's catch as it scrolls into view — the
 * scale of what lands on the coast every single morning, most of it routed
 * through middlemen before it's ever cooked.
 */
export default function LandingCounter() {
  const root = useRef(null);
  const [kg, setKg] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = 184600;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || done.current) return;
          done.current = true;
          if (reduce) return setKg(target);
          const start = performance.now();
          const dur = 1900;
          const tick = (t) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setKg(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} data-nav-dark className="relative bg-ink text-paper depth-grid-ink">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <span className="label text-[var(--color-signal)]">Landed on this coast · today</span>
          <span className="label text-grey">Live harbour estimate</span>
        </div>

        <div className="mt-8 flex items-baseline gap-4">
          <span className="display text-[18vw] leading-[0.8] text-paper md:text-[12rem]">
            {kg.toLocaleString("en-IN")}
          </span>
          <span className="display text-[6vw] text-[var(--color-signal)] md:text-[3rem]">kg</span>
        </div>

        <div className="mt-10">
          <WaveLine color="var(--color-signal)" height={30} opacity={0.55} />
        </div>

        <div className="mt-10 grid gap-px border-ink-line bg-ink-line sm:grid-cols-3">
          {[
            ["~73%", "passes through at least three middlemen"],
            ["3.4 days", "average age of fish at the retail counter"],
            ["1 : 3.1", "dock price to plate price, on average"],
          ].map(([n, l]) => (
            <div key={l} className="bg-ink p-6">
              <div className="display text-4xl text-paper md:text-5xl">{n}</div>
              <div className="mt-3 max-w-[26ch] text-sm text-grey-dim">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
