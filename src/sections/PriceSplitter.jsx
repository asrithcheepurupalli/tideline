import { useState } from "react";
import { useReveal } from "../lib/useReveal";
import { inr } from "../data/listings";

/**
 * The interactive heart of the page. Drag the catch weight and watch the
 * dock-to-plate spread split three ways: what you save, what the skipper gains,
 * and the margin the chain no longer takes. Dock ₹620 vs plate ₹1,850 per kg.
 */
const DOCK = 620; // skipper's auction price /kg
const TIDELINE = 760; // what you pay direct /kg (skipper earns more, you pay less)
const PLATE = 1850; // retail counter /kg

export default function PriceSplitter() {
  const ref = useReveal();
  const [kg, setKg] = useState(4);

  const youPay = TIDELINE * kg;
  const marketPay = PLATE * kg;
  const youSave = marketPay - youPay;
  const skipperGain = (TIDELINE - DOCK) * kg;
  const chainCut = marketPay - PLATE * 0 - youPay - skipperGain; // margin removed
  const savePct = Math.round((youSave / marketPay) * 100);

  return (
    <section ref={ref} data-nav-dark className="relative bg-ink text-paper depth-grid-ink">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="reveal-up mb-4 flex items-center gap-4">
          <span className="label text-[var(--color-signal)]">The spread</span>
          <span className="h-px w-12 bg-ink-line" />
        </div>
        <h2 className="reveal-up display max-w-[20ch] text-[8vw] md:text-[4.2rem]">
          The same fish.{" "}
          <span className="serif-italic text-[var(--color-signal)]">Less for you, more for the boat.</span>
        </h2>
        <p className="reveal-up mt-6 max-w-[52ch] text-grey-dim">
          Cutting four middlemen leaves a spread worth splitting. Drag the weight
          and see where the money goes when the line runs straight from the deck
          to your kitchen.
        </p>

        {/* slider */}
        <div className="reveal-up mt-14">
          <div className="flex items-end justify-between">
            <span className="label text-grey">Your catch</span>
            <span className="font-display text-5xl text-[var(--color-signal)] md:text-6xl">
              {kg} kg
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="12"
            step="1"
            value={kg}
            onChange={(e) => setKg(Number(e.target.value))}
            className="tide-range mt-5 w-full"
            aria-label="Catch weight in kilograms"
          />
        </div>

        {/* split bars */}
        <div className="reveal-up mt-14 grid gap-8 lg:grid-cols-2">
          {/* the counter */}
          <div className="rounded-sm border border-ink-line p-6 md:p-8">
            <div className="flex items-center justify-between">
              <span className="label text-grey">At the retail counter</span>
              <span className="font-mono text-sm text-grey">{inr(PLATE)}/kg</span>
            </div>
            <div className="mt-6 font-display text-5xl text-paper/80 md:text-6xl">{inr(marketPay)}</div>
            <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-ink-soft">
              <div className="h-full bg-grey" style={{ width: "100%" }} />
            </div>
            <p className="mt-4 text-sm text-grey-dim">
              Three days old, four margins deep. The skipper saw {inr(DOCK)} of this.
            </p>
          </div>

          {/* tideline */}
          <div className="rounded-sm border border-[var(--color-signal)]/40 bg-ink-soft p-6 md:p-8">
            <div className="flex items-center justify-between">
              <span className="label text-[var(--color-signal)]">Direct on Tideline</span>
              <span className="font-mono text-sm text-[var(--color-signal)]">{inr(TIDELINE)}/kg</span>
            </div>
            <div className="mt-6 font-display text-5xl text-[var(--color-signal)] md:text-6xl">{inr(youPay)}</div>
            <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full bg-ink">
              <div className="h-full bg-[var(--color-signal)]" style={{ width: `${(youPay / marketPay) * 100}%` }} />
              <div className="h-full bg-[var(--color-catch)]" style={{ width: `${(youSave / marketPay) * 100}%` }} />
            </div>
            <p className="mt-4 text-sm text-grey-dim">
              Landed hours ago. The skipper earns {inr(TIDELINE - DOCK)}/kg more, and you
              still pay less.
            </p>
          </div>
        </div>

        {/* outcome row */}
        <div className="reveal-up mt-8 grid gap-px border-ink-line bg-ink-line sm:grid-cols-3">
          {[
            ["You save", inr(youSave), `${savePct}% off the counter`, "var(--color-signal)"],
            ["Skipper gains", inr(skipperGain), `+${inr(TIDELINE - DOCK)} on every kg`, "var(--color-catch)"],
            ["Chain margin removed", inr(youSave + skipperGain), "no longer taken by middlemen", "var(--color-rope)"],
          ].map(([k, v, sub, c]) => (
            <div key={k} className="bg-ink p-6">
              <div className="label text-grey">{k}</div>
              <div className="mt-3 font-display text-4xl md:text-5xl" style={{ color: c }}>{v}</div>
              <div className="mt-2 text-xs text-grey-dim">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tide-range{-webkit-appearance:none;appearance:none;height:3px;background:linear-gradient(90deg,var(--color-signal),var(--color-catch));border-radius:999px;outline:none;cursor:pointer;}
        .tide-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:26px;height:26px;border-radius:999px;background:var(--color-paper);border:3px solid var(--color-signal);box-shadow:0 2px 12px rgba(0,0,0,.4);cursor:grab;transition:transform .2s var(--ease-made);}
        .tide-range::-webkit-slider-thumb:active{transform:scale(1.15);cursor:grabbing;}
        .tide-range::-moz-range-thumb{width:26px;height:26px;border-radius:999px;background:var(--color-paper);border:3px solid var(--color-signal);cursor:grab;}
      `}</style>
    </section>
  );
}
