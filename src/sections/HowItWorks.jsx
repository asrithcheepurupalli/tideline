import { useReveal } from "../lib/useReveal";

const STEPS = [
  {
    n: "01",
    t: "Read the tide",
    d: "Browse the boats sailing tomorrow: species, gear, sea state and the skipper behind the wheel. Every listing is a real working vessel on a real harbour.",
  },
  {
    n: "02",
    t: "Seat or share",
    d: "Book a place aboard for the landing, or reserve a share of the catch before the boat leaves the breakwater. Pay the dock price, locked in.",
  },
  {
    n: "03",
    t: "The boat sails",
    d: "The skipper works the water. You get the position, the haul and the landing time as it happens, the day unfolding from the deck to your phone.",
  },
  {
    n: "04",
    t: "Collect the catch",
    d: "Walk the dock and pick it up cleaned, or have it cold-chained to your door. Off the boat, onto your table, with nothing in between but the tide.",
  },
];

export default function HowItWorks() {
  const ref = useReveal({ stagger: 100 });
  return (
    <section ref={ref} className="bg-paper contour">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="reveal-up mb-4 flex items-center gap-4">
          <span className="label text-[var(--color-signal-deep)]">How it works</span>
          <span className="h-px w-12 bg-paper-line" />
        </div>
        <h2 className="reveal-up display max-w-[16ch] text-[8vw] text-ink md:text-[4.5rem]">
          Four steps from breakwater to plate.
        </h2>

        <div className="mt-16 grid gap-px border-paper-line bg-paper-line md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="reveal-up flex flex-col bg-paper p-7">
              <span className="font-mono text-sm text-[var(--color-signal-deep)]">{s.n}</span>
              <span className="mt-8 font-display text-2xl text-ink md:text-3xl">{s.t}</span>
              <span className="mt-4 text-sm leading-relaxed text-ink/60">{s.d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
