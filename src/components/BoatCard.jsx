import { Link } from "react-router-dom";
import TideChart from "./TideChart";
import { inr } from "../data/listings";

/** A single boat / catch-share, drawn as a chart card with the day's terms. */
export default function BoatCard({ boat }) {
  const hasSeats = boat.seatsLeft > 0;
  return (
    <Link
      to={`/boat/${boat.id}`}
      data-cursor="Open"
      className="group reveal-up flex flex-col overflow-hidden rounded-sm border border-paper-line bg-paper transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-ink/40 hover:shadow-[0_18px_50px_-24px_rgba(6,24,29,0.5)]"
    >
      {/* chart header */}
      <div className="relative h-44 overflow-hidden border-b border-paper-line">
        <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
          <TideChart seed={boat.id} tone={boat.tone} />
        </div>
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="label rounded-full bg-ink px-3 py-1.5 text-paper">{boat.coast}</span>
          {hasSeats && (
            <span className="label rounded-full bg-[var(--color-catch)] px-3 py-1.5 text-ink">
              {boat.seatsLeft} seat{boat.seatsLeft > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <span className="absolute bottom-3 right-4 font-mono text-xs text-ink/55">
          {boat.vessel} · {boat.length}ft
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-ink">{boat.boatName}</h3>
            <p className="mt-1 text-sm text-ink/55">{boat.port}</p>
          </div>
          <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: boat.tone }} />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {boat.targets.map((t) => (
            <span key={t} className="rounded-full border border-paper-line px-2.5 py-1 font-mono text-[0.7rem] text-ink/60">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-px border-t border-paper-line pt-px">
          <div className="bg-paper pt-5">
            <span className="label text-ink/40">Share / {boat.shareKg}kg</span>
            <div className="mt-1 font-display text-2xl text-ink">{inr(boat.sharePrice)}</div>
          </div>
          <div className="bg-paper pt-5 pl-5">
            <span className="label text-ink/40">{hasSeats ? "Seat aboard" : "Departs"}</span>
            <div className="mt-1 font-display text-2xl text-ink">
              {hasSeats ? inr(boat.seatPrice) : <span className="text-[var(--color-signal-deep)]">{boat.departs.split(" · ")[0]}</span>}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-paper-line pt-4">
          <span className="font-mono text-xs text-ink/50">Lands {boat.landing}</span>
          <span className="label text-[var(--color-signal-deep)] transition-transform group-hover:translate-x-1">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
