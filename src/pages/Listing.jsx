import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getListing, listings, inr } from "../data/listings";
import TideChart from "../components/TideChart";
import BoatCard from "../components/BoatCard";
import WaveLine from "../components/WaveLine";
import { useMagnetic } from "../lib/useMagnetic";
import { useReveal } from "../lib/useReveal";

export default function Listing() {
  const { id } = useParams();
  const boat = getListing(id);
  const cta = useMagnetic(0.2);
  const ref = useReveal({ stagger: 90 });
  const hasSeats = boat && boat.seatsLeft > 0;
  const [mode, setMode] = useState("share"); // 'share' | 'seat'
  const [qty, setQty] = useState(1);

  const others = useMemo(
    () => listings.filter((b) => boat && b.id !== boat.id).slice(0, 3),
    [boat]
  );

  if (!boat) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-6 text-center">
        <h1 className="display text-4xl text-ink">That boat has sailed.</h1>
        <Link to="/catch" className="signal-btn mt-8">Back to today's landings →</Link>
      </div>
    );
  }

  const isSeat = mode === "seat" && hasSeats;
  const unit = isSeat ? boat.seatPrice : boat.sharePrice;
  const maxQty = isSeat ? boat.seatsLeft : Math.min(6, boat.sharesLeft);
  const total = unit * qty;
  const counterValue = isSeat ? null : boat.marketPrice * boat.shareKg * qty;
  const saved = counterValue ? counterValue - total : 0;

  const specs = [
    ["Skipper", boat.skipper],
    ["Vessel", `${boat.vessel} · ${boat.length}ft`],
    ["Crew", `${boat.crew} aboard`],
    ["Gear", boat.gear],
    ["Departs", boat.departs],
    ["Time at sea", boat.duration],
    ["Lands", boat.landing],
    ["Dock price", `${inr(boat.dockPrice)}/kg`],
  ];

  const sea = [
    ["Tide", boat.tideState],
    ["Swell", boat.swell],
    ["Moon", boat.moon],
  ];

  return (
    <div ref={ref} className="bg-paper pt-28">
      {/* breadcrumb */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Link to="/catch" data-cursor="Back" className="label text-ink/50 hover:text-ink">
          ← Today's landings
        </Link>
      </div>

      {/* hero */}
      <header className="mx-auto max-w-[1600px] px-6 pt-8 md:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="label rounded-full bg-ink px-3 py-1.5 text-paper">{boat.coast}</span>
          <span className="label text-ink/45">{boat.port}</span>
        </div>
        <h1 className="mt-6 display text-[13vw] leading-[0.9] text-ink md:text-[7rem]">
          {boat.boatName}
        </h1>
        <p className="mt-6 max-w-[60ch] text-xl text-ink/70">{boat.blurb}</p>
      </header>

      <div className="mx-auto mt-14 grid max-w-[1600px] gap-10 px-6 pb-10 md:px-10 lg:grid-cols-[1.4fr_1fr]">
        {/* left: chart + specs */}
        <div>
          <div className="overflow-hidden rounded-sm border border-paper-line">
            <div className="h-72 md:h-96">
              <TideChart seed={boat.id} tone={boat.tone} />
            </div>
            <div className="grid grid-cols-3 gap-px border-t border-paper-line bg-paper-line">
              {sea.map(([k, v]) => (
                <div key={k} className="bg-paper p-5">
                  <span className="label text-ink/40">{k}</span>
                  <div className="mt-2 font-display text-xl text-ink">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* targets */}
          <div className="mt-8">
            <span className="label text-ink/40">Targeting today</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {boat.targets.map((t) => (
                <span key={t} className="rounded-full border border-paper-line bg-paper-dim px-4 py-2 font-mono text-sm text-ink/70">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* specs */}
          <div className="mt-10 grid grid-cols-2 gap-px border border-paper-line bg-paper-line sm:grid-cols-4">
            {specs.map(([k, v]) => (
              <div key={k} className="bg-paper p-5">
                <span className="label text-ink/40">{k}</span>
                <div className="mt-2 text-sm text-ink">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right: booking panel */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-sm border border-ink bg-ink p-7 text-paper depth-grid-ink">
            {/* mode toggle */}
            <div className="grid grid-cols-2 gap-1 rounded-sm bg-ink-soft p-1">
              <button
                onClick={() => { setMode("share"); setQty(1); }}
                data-cursor="Share"
                className={`label rounded-[3px] py-3 transition-colors ${!isSeat ? "bg-[var(--color-signal)] text-ink" : "text-grey-dim"}`}
              >
                Catch share
              </button>
              <button
                onClick={() => { if (hasSeats) { setMode("seat"); setQty(1); } }}
                disabled={!hasSeats}
                data-cursor={hasSeats ? "Seat" : "Full"}
                className={`label rounded-[3px] py-3 transition-colors ${isSeat ? "bg-[var(--color-catch)] text-ink" : "text-grey-dim"} ${!hasSeats ? "opacity-40" : ""}`}
              >
                {hasSeats ? "Seat aboard" : "Seats full"}
              </button>
            </div>

            <div className="mt-7 flex items-end justify-between">
              <div>
                <span className="label text-grey">{isSeat ? "Per seat" : `Per ${boat.shareKg}kg share`}</span>
                <div className="mt-2 font-display text-5xl text-paper">{inr(unit)}</div>
              </div>
              <span className="font-mono text-xs text-grey">
                {isSeat ? `${boat.seatsLeft} left` : `${boat.sharesLeft} shares left`}
              </span>
            </div>

            {/* qty stepper */}
            <div className="mt-7 flex items-center justify-between border-y border-ink-line py-4">
              <span className="label text-grey">{isSeat ? "Seats" : "Shares"}</span>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-lg hover:border-paper"
                  data-cursor="−"
                  aria-label="Decrease"
                >−</button>
                <span className="font-display text-2xl tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-line text-lg hover:border-paper"
                  data-cursor="+"
                  aria-label="Increase"
                >+</button>
              </div>
            </div>

            {/* total */}
            <div className="mt-6 flex items-end justify-between">
              <span className="label text-grey">Total</span>
              <span className="font-display text-4xl text-[var(--color-signal)]">{inr(total)}</span>
            </div>
            {!isSeat && (
              <p className="mt-3 text-right font-mono text-xs text-[var(--color-catch-soft)]">
                {inr(saved)} under the counter price
              </p>
            )}

            <button ref={cta} data-cursor="Reserve" className="signal-btn mt-7 w-full justify-center">
              {isSeat ? "Reserve the seat →" : "Claim the catch →"}
            </button>
            <p className="mt-4 text-center text-xs text-grey">
              Concept demo · no payment is taken
            </p>
          </div>

          <div className="mt-6 rounded-sm border border-paper-line bg-paper-dim p-5">
            <span className="label text-ink/40">Skipper</span>
            <div className="mt-2 font-display text-xl text-ink">{boat.skipper}</div>
            <p className="mt-2 text-sm text-ink/60">
              Vetted by Tideline · {boat.vessel} out of {boat.port.split(",")[0]}
            </p>
          </div>
        </aside>
      </div>

      {/* other boats */}
      <div className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
        <div className="my-10">
          <WaveLine color="var(--color-signal)" height={28} opacity={0.6} />
        </div>
        <h2 className="display text-3xl text-ink md:text-4xl">Other boats on the water</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((b) => (
            <BoatCard key={b.id} boat={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
