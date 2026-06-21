import { useReveal } from "../lib/useReveal";
import { Link } from "react-router-dom";
import { useMagnetic } from "../lib/useMagnetic";
import WaveLine from "../components/WaveLine";

/**
 * The closing statement. Big serif lines that rise on scroll, a tide running
 * beneath them, and the single invitation to enter the marketplace.
 */
export default function Manifesto() {
  const ref = useReveal({ stagger: 140 });
  const cta = useMagnetic(0.3);
  return (
    <section ref={ref} className="relative overflow-hidden bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-28 text-center md:px-10 md:py-40">
        <span className="reveal-up label text-[var(--color-signal-deep)]">The tideline</span>

        <h2 className="mt-8 font-display text-[9vw] leading-[1.05] text-ink md:text-[4.6rem]">
          <span className="reveal-up block">The fish was never the problem.</span>
          <span className="reveal-up block text-ink/45">
            <span className="serif-italic">The distance was.</span>
          </span>
          <span className="reveal-up mt-4 block">
            Tideline closes it to a{" "}
            <span className="text-[var(--color-signal-deep)]">single line</span>.
          </span>
        </h2>

        <div className="reveal-up mx-auto my-14 max-w-[640px]">
          <WaveLine color="var(--color-signal)" height={34} />
        </div>

        <div className="reveal-up flex flex-wrap items-center justify-center gap-4">
          <Link ref={cta} to="/catch" data-cursor="Today" className="signal-btn">
            See today's landings →
          </Link>
          <Link to="/skipper" className="ghost-btn border-ink/25 text-ink hover:bg-ink hover:text-paper" data-cursor="Skipper">
            I run a boat
          </Link>
        </div>
      </div>
    </section>
  );
}
