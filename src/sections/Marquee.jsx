import { species } from "../data/listings";

/**
 * A tide of species names drifting past — the catch list of the coast, set in
 * big serif, looping forever. Dark band so the names read like a manifest.
 */
export default function Marquee() {
  const row = [...species, ...species];
  return (
    <section data-nav-dark className="overflow-hidden border-y border-ink-line bg-ink py-10 text-paper">
      <div className="marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-3xl text-paper/85 md:text-5xl">{s}</span>
            <span className="h-2 w-2 rounded-full bg-[var(--color-signal)]" />
          </span>
        ))}
      </div>
      <style>{`
        .marquee{animation:slide 38s linear infinite;}
        @media (prefers-reduced-motion: reduce){.marquee{animation:none;}}
        @keyframes slide{to{transform:translateX(-50%);}}
      `}</style>
    </section>
  );
}
