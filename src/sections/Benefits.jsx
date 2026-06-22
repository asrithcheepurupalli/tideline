import { useState } from "react";
import { useReveal } from "../lib/useReveal";

const TABS = {
  eaters: {
    label: "For eaters",
    items: [
      ["Fresher than fresh", "Fish you can trace to a boat and a tide, landed hours ago, not days."],
      ["The dock price", "Pay what the agent pays. The spread that used to vanish into the chain stays in your pocket."],
      ["Provenance you can read", "Every catch comes with the skipper, the gear, the position and the landing time."],
      ["A day at sea", "Or take the seat and go get it yourself. The catch tastes different when you hauled it."],
    ],
  },
  skippers: {
    label: "For skippers",
    items: [
      ["Sell before you sail", "Reserve shares at the dock price before the boat leaves. Land the catch already sold."],
      ["Keep the margin", "Earn more per kilo than the auction pays, without losing the buyer to four middlemen."],
      ["Fill empty seats", "Turn unused deck space into income on days the hold isn't full."],
      ["Your name on the catch", "Build a following that asks for your boat by name. Provenance is the new premium."],
    ],
  },
};

export default function Benefits() {
  const ref = useReveal({ stagger: 90 });
  const [tab, setTab] = useState("eaters");
  const data = TABS[tab];
  return (
    <section ref={ref} className="bg-paper-dim">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="reveal-up flex flex-wrap items-end justify-between gap-6">
          <h2 className="display max-w-[16ch] text-[8vw] text-ink md:text-[4.2rem]">
            A fairer line, both ends.
          </h2>
          <div className="flex gap-2">
            {Object.entries(TABS).map(([k, v]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                data-cursor="View"
                className={`label rounded-sm px-4 py-3 transition-colors ${
                  tab === k ? "bg-ink text-paper" : "bg-paper text-ink/60 hover:text-ink"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-px border-paper-line bg-paper-line md:grid-cols-2">
          {data.items.map(([t, d], i) => (
            <div key={t} className="bg-paper p-7 md:p-9">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-[var(--color-signal-deep)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl text-ink md:text-3xl">{t}</h3>
              </div>
              <p className="mt-4 max-w-[42ch] pl-9 text-ink/60">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
