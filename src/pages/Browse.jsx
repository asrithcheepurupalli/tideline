import { useMemo, useState } from "react";
import { listings } from "../data/listings";
import BoatCard from "../components/BoatCard";
import { useReveal } from "../lib/useReveal";
import WaveLine from "../components/WaveLine";

const FILTERS = [
  { key: "all", label: "All landings" },
  { key: "seats", label: "Seats aboard" },
  { key: "shares", label: "Catch shares" },
];

export default function Browse() {
  const [filter, setFilter] = useState("all");
  const ref = useReveal({ stagger: 80 });

  const boats = useMemo(() => {
    if (filter === "seats") return listings.filter((b) => b.seatsLeft > 0);
    if (filter === "shares") return listings.filter((b) => b.sharesLeft > 0);
    return listings;
  }, [filter]);

  return (
    <div className="bg-paper pt-32">
      {/* header */}
      <header className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-center gap-4">
          <span className="label text-[var(--color-signal-deep)]">Today's landings</span>
          <span className="h-px w-12 bg-paper-line" />
          <span className="label text-ink/45">{boats.length} boats on the water</span>
        </div>
        <h1 className="mt-6 display max-w-[18ch] text-[11vw] text-ink md:text-[5.5rem]">
          The catch, before it leaves the dock.
        </h1>
        <p className="mt-6 max-w-[54ch] text-lg text-ink/65">
          Every boat below is sailing within the day. Book a seat to go out with
          the crew, or claim a share of the landing at the dock price.
        </p>

        <div className="my-10">
          <WaveLine color="var(--color-signal)" height={30} />
        </div>

        {/* filters */}
        <div className="flex flex-wrap gap-2 pb-12">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              data-cursor="Filter"
              className={`label rounded-sm px-4 py-3 transition-colors ${
                filter === f.key ? "bg-ink text-paper" : "bg-paper-dim text-ink/60 hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      {/* grid */}
      <div ref={ref} className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boats.map((b) => (
            <BoatCard key={b.id} boat={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
