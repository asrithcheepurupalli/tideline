import { Link } from "react-router-dom";
import Wordmark from "./Wordmark";
import WaveLine from "./WaveLine";

// One-click, pre-written email to the studio — for anyone who wants this built.
const BUILD_MAIL =
  "mailto:thebrain@made-by-ac.com?subject=" +
  encodeURIComponent("Tideline: build this with us") +
  "&body=" +
  encodeURIComponent(
    "Hi made. team,\n\nI saw Tideline and I'd love to talk about building something like it (or working together).\n\nWhat I have in mind:\n\n\nThanks,\n"
  );

/**
 * Footer drawn as a harbour log-book entry — the day's manifest cartouche from
 * the corner of a chart. Every cell is a field. The "2% nobody asks for".
 */
export default function Footer() {
  const cell =
    "border-ink-line border-t border-l p-4 md:p-5 flex flex-col gap-1.5";
  return (
    <footer data-nav-dark className="bg-ink text-paper depth-grid-ink">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <h2 className="display max-w-[16ch] text-[2.75rem] md:text-[4.5rem]">
            Off the boat.{" "}
            <span className="serif-italic text-[var(--color-signal)]">
              Onto your table.
            </span>
          </h2>
          <Link to="/catch" data-cursor="Today" className="signal-btn">
            See today's landings →
          </Link>
        </div>

        <div className="mb-12">
          <WaveLine color="var(--color-signal)" height={26} opacity={0.5} />
        </div>

        {/* manifest block */}
        <div className="border-ink-line border-b border-r">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className={cell}>
              <span className="label text-grey">Vessel</span>
              <Wordmark onDark className="!text-[1.1rem]" />
            </div>
            <div className={cell}>
              <span className="label text-grey">Manifest</span>
              <span className="font-mono text-sm">Day catch / direct</span>
              <span className="font-mono text-sm">landing Rev. 01</span>
            </div>
            <div className={cell}>
              <span className="label text-grey">Spread</span>
              <span className="font-mono text-sm">Dock → plate / 1:3.1</span>
            </div>
            <div className={cell}>
              <span className="label text-grey">Tide</span>
              <span className="inline-flex items-center gap-2 font-mono text-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--color-signal)]" /> Running
              </span>
            </div>

            <div className={cell}>
              <span className="label text-grey">Marketplace</span>
              <Link to="/catch" className="text-sm hover:text-[var(--color-signal)]">Today's landings</Link>
              <Link to="/skipper" className="text-sm hover:text-[var(--color-signal)]">Skipper deck</Link>
              <Link to="/#how" className="text-sm hover:text-[var(--color-signal)]">How it works</Link>
            </div>
            <div className={cell}>
              <span className="label text-grey">Harbour</span>
              <span className="text-sm text-grey-dim">Coastal sourcing</span>
              <span className="text-sm text-grey-dim">Cold chain</span>
              <span className="text-sm text-grey-dim">Crew</span>
            </div>
            <div className={cell}>
              <span className="label text-grey">Legal</span>
              <span className="text-sm text-grey-dim">Catch terms</span>
              <span className="text-sm text-grey-dim">Privacy</span>
              <span className="text-sm text-grey-dim">Safety at sea</span>
            </div>
            <div className={cell}>
              <span className="label text-grey">Drawn by</span>
              <a
                href="https://made-by-ac.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="Visit"
                className="font-display text-lg italic hover:text-[var(--color-signal)]"
              >
                made<span className="text-[var(--color-signal)]">.</span> by ac
              </a>
              <a
                href={BUILD_MAIL}
                data-cursor="Email"
                className="text-sm text-[var(--color-signal)] hover:underline"
              >
                Build this with us →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="label text-grey">
            © 2026 Tideline · The marketplace for the day's catch
          </p>
          <p className="label text-grey">Concept demo · not a live marketplace</p>
        </div>
      </div>
    </footer>
  );
}
