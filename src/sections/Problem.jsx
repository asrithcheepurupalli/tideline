import { useReveal } from "../lib/useReveal";

/**
 * The chain. Five hands between the net and the plate, each one taking a cut
 * and a day. Rendered as a horizontal supply line that loses freshness and
 * gains price at every node.
 */
const CHAIN = [
  { hand: "The boat", note: "Lands the catch at dawn", price: "₹620/kg", day: "Day 0" },
  { hand: "The agent", note: "Buys the whole deck at auction", price: "₹780/kg", day: "Day 0" },
  { hand: "The wholesaler", note: "Trucks it to the city mandi", price: "₹1,080/kg", day: "Day 1" },
  { hand: "The distributor", note: "Splits lots to retailers", price: "₹1,440/kg", day: "Day 2" },
  { hand: "The counter", note: "Sells it three days old", price: "₹1,850/kg", day: "Day 3" },
];

export default function Problem() {
  const ref = useReveal({ stagger: 110 });
  return (
    <section ref={ref} className="bg-paper">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="reveal-up mb-4 flex items-center gap-4">
          <span className="label text-[var(--color-catch)]">The problem</span>
          <span className="h-px w-12 bg-paper-line" />
        </div>
        <h2 className="reveal-up display max-w-[20ch] text-[8vw] text-ink md:text-[4.2rem]">
          Five hands stand between the net and your plate.
        </h2>
        <p className="reveal-up mt-6 max-w-[52ch] text-lg text-ink/65">
          Every one of them takes a margin and a day. The fish gets older and
          the price triples on its way to you — and the skipper who caught it
          sees the smallest cut of all.
        </p>

        {/* the chain */}
        <div className="mt-16 grid gap-px border-paper-line bg-paper-line md:grid-cols-5">
          {CHAIN.map((c, i) => (
            <div key={c.hand} className="reveal-up relative bg-paper p-5">
              <div className="flex items-center justify-between">
                <span className="label text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="label text-ink/40">{c.day}</span>
              </div>
              <div className="mt-6 font-display text-2xl text-ink">{c.hand}</div>
              <div className="mt-2 min-h-[3em] text-sm text-ink/55">{c.note}</div>
              <div
                className="mt-4 font-mono text-lg"
                style={{ color: i === 0 ? "var(--color-signal-deep)" : i === CHAIN.length - 1 ? "var(--color-catch)" : "var(--color-ink)" }}
              >
                {c.price}
              </div>
              {/* price climb bar */}
              <div className="mt-3 h-1 w-full bg-paper-dim">
                <div
                  className="h-full"
                  style={{
                    width: `${[33, 42, 58, 78, 100][i]}%`,
                    background: i === CHAIN.length - 1 ? "var(--color-catch)" : "var(--color-signal)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
