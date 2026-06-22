import { useReveal } from "../lib/useReveal";
import WaveLine from "../components/WaveLine";

/**
 * The third way. Cut the chain to a single line: skipper → you. Two ways to
 * take it: a seat aboard, or a share of the landing.
 */
export default function DirectLine() {
  const ref = useReveal({ stagger: 120 });
  return (
    <section ref={ref} className="relative overflow-hidden bg-paper-dim">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-32">
        <div className="reveal-up mb-4 flex items-center gap-4">
          <span className="label text-[var(--color-signal-deep)]">The third way</span>
          <span className="h-px w-12 bg-paper-line" />
        </div>
        <h2 className="reveal-up display max-w-[18ch] text-[8vw] text-ink md:text-[4.5rem]">
          One line.{" "}
          <span className="serif-italic text-[var(--color-signal-deep)]">Skipper to you.</span>
        </h2>

        <div className="reveal-up my-12">
          <WaveLine color="var(--color-signal)" height={34} />
        </div>

        <div className="grid gap-px border-paper-line bg-paper-line md:grid-cols-2">
          <div className="reveal-up bg-paper p-8 md:p-12">
            <span className="label text-[var(--color-catch)]">Option one</span>
            <h3 className="mt-5 font-display text-3xl text-ink md:text-4xl">Take a seat aboard</h3>
            <p className="mt-4 max-w-[40ch] text-ink/65">
              Go out with the crew on a working boat. Watch the gear go down,
              haul it back up, and come home with the fish you saw land, plus a
              day you'll talk about for years.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-sm text-ink/70">
              <li>2 to 4 seats per boat</li>
              <li>Your catch, cleaned dockside</li>
              <li>Skippers vetted, boats insured</li>
            </ul>
          </div>
          <div className="reveal-up bg-paper p-8 md:p-12">
            <span className="label text-[var(--color-signal-deep)]">Option two</span>
            <h3 className="mt-5 font-display text-3xl text-ink md:text-4xl">Claim a share of the landing</h3>
            <p className="mt-4 max-w-[40ch] text-ink/65">
              Can't make the tide? Reserve a share before the boat sails. It's
              weighed, bagged and waiting under your name at the dock, or
              cold-chained to your door, at the price the agent would have paid.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-sm text-ink/70">
              <li>From 2 kg per share</li>
              <li>Dock price, not plate price</li>
              <li>Landed-to-collected in hours</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
