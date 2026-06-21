import { Link } from "react-router-dom";
import { useReveal } from "../lib/useReveal";
import { inr } from "../data/listings";
import WaveLine from "../components/WaveLine";
import TideChart from "../components/TideChart";
import { useMagnetic } from "../lib/useMagnetic";

const STATS = [
  ["This week's landings", "₹1,84,200", "sold before the boats sailed"],
  ["Avg. uplift / kg", "+₹140", "over the auction price"],
  ["Seats filled", "11 / 14", "across four sailings"],
  ["Repeat buyers", "62%", "asked for your boat by name"],
];

const SAILINGS = [
  { id: "sassoon-dawn-runner", boat: "Dawn Runner", date: "Tomorrow · 04:10", shares: "9 / 12", seats: "2 / 2", value: 31600, tone: "#14c0b0" },
  { id: "rameswaram-crab-line", boat: "Meen Thunai", date: "Today · 06:00", shares: "5 / 8", seats: "2 / 2", value: 18400, tone: "#c2a878" },
  { id: "betul-goa-snapper", boat: "Espírito do Mar", date: "Tomorrow · 05:15", shares: "8 / 12", seats: "1 / 4", value: 27200, tone: "#1d6f9e" },
];

export default function Dashboard() {
  const ref = useReveal({ stagger: 80 });
  const cta = useMagnetic(0.25);

  return (
    <div ref={ref} className="bg-paper pt-32">
      {/* header */}
      <header className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="reveal-up flex items-center gap-4">
          <span className="label text-[var(--color-signal-deep)]">Skipper deck</span>
          <span className="h-px w-12 bg-paper-line" />
          <span className="label text-ink/45">Sell the catch before you sail</span>
        </div>
        <h1 className="reveal-up mt-6 display max-w-[16ch] text-[11vw] text-ink md:text-[5.5rem]">
          Land it already sold.
        </h1>
        <p className="reveal-up mt-6 max-w-[54ch] text-lg text-ink/65">
          List a sailing, set your dock price, and let buyers reserve shares and
          seats before the boat leaves the breakwater. Keep the margin the
          auction would have taken.
        </p>

        <div className="reveal-up my-10">
          <WaveLine color="var(--color-signal)" height={30} />
        </div>
      </header>

      {/* stats */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="reveal-up grid gap-px border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(([k, v, s]) => (
            <div key={k} className="bg-paper p-7">
              <span className="label text-ink/40">{k}</span>
              <div className="mt-3 display text-4xl text-ink md:text-5xl">{v}</div>
              <div className="mt-2 text-sm text-ink/55">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* sailings table */}
      <div className="mx-auto mt-16 max-w-[1600px] px-6 md:px-10">
        <h2 className="reveal-up display text-3xl text-ink md:text-4xl">Your sailings</h2>
        <div className="reveal-up mt-8 overflow-hidden rounded-sm border border-paper-line">
          {/* head */}
          <div className="hidden grid-cols-[1.4fr_1fr_0.8fr_0.8fr_1fr_auto] gap-4 border-b border-paper-line bg-paper-dim px-6 py-4 md:grid">
            {["Boat", "Departs", "Shares", "Seats", "Reserved", ""].map((h) => (
              <span key={h} className="label text-ink/45">{h}</span>
            ))}
          </div>
          {SAILINGS.map((s) => (
            <div
              key={s.id}
              className="grid grid-cols-2 items-center gap-4 border-b border-paper-line px-6 py-5 last:border-0 md:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_1fr_auto]"
            >
              <div className="flex items-center gap-3">
                <span className="h-9 w-14 overflow-hidden rounded-[3px] border border-paper-line">
                  <TideChart seed={s.id} tone={s.tone} />
                </span>
                <span className="font-display text-lg text-ink">{s.boat}</span>
              </div>
              <span className="font-mono text-sm text-ink/65">{s.date}</span>
              <span className="font-mono text-sm text-ink/65">{s.shares}</span>
              <span className="font-mono text-sm text-ink/65">{s.seats}</span>
              <span className="font-display text-lg text-[var(--color-signal-deep)]">{inr(s.value)}</span>
              <Link to={`/boat/${s.id}`} data-cursor="Open" className="label text-ink/50 hover:text-ink">
                View →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* list a sailing CTA */}
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="reveal-up overflow-hidden rounded-sm bg-ink p-10 text-paper depth-grid-ink md:p-16" data-nav-dark>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <span className="label text-[var(--color-signal)]">List a sailing</span>
              <h2 className="mt-5 display max-w-[16ch] text-4xl md:text-6xl">
                Your next tide, sold from the dock.
              </h2>
              <p className="mt-5 max-w-[46ch] text-grey-dim">
                Three minutes to list. No fee until the catch is reserved. The
                cold chain and the buyers are already here.
              </p>
            </div>
            <button ref={cta} data-cursor="List" className="signal-btn">
              List your boat →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
