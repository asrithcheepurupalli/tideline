import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useMagnetic } from "../lib/useMagnetic";

/**
 * The opening act. A tide curve draws itself across the shelf; the buoy lights
 * and rides the line as the kinetic headline rises from behind masks. The day
 * begins at sea.
 */
export default function Hero() {
  const root = useRef(null);
  const chart = useRef(null);
  const cta = useMagnetic(0.3);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.to(".hero-line .line-inner", {
        y: 0,
        duration: reduce ? 0 : 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: reduce ? 0 : 2.0,
      });
      gsap.to(".hero-fade", {
        opacity: 1,
        y: 0,
        duration: reduce ? 0 : 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: reduce ? 0 : 2.5,
      });

      if (reduce) {
        gsap.set(".tide-draw", { strokeDashoffset: 0 });
        gsap.set(".buoy, .sea-readout", { opacity: 1 });
        return;
      }

      // tide curve draws (dash offset set inline → free, no DrawSVG plugin)
      gsap.to(".tide-draw", {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: "power2.inOut",
        delay: 2.1,
      });
      // water fill rises
      gsap.fromTo(
        ".tide-fill",
        { opacity: 0 },
        { opacity: 0.18, duration: 1, ease: "power2.out", delay: 3.2 }
      );
      // buoy lights and bobs
      gsap.to(".buoy", { opacity: 1, duration: 0.5, ease: "power2.out", delay: 3.1 });
      gsap.to(".sea-readout", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 3.3,
      });

      // gentle parallax drift on scroll
      gsap.to(chart.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] overflow-hidden bg-paper pt-28 depth-grid"
    >
      {/* tide field, right side */}
      <div
        ref={chart}
        className="pointer-events-none absolute right-[-4%] top-1/2 hidden w-[54%] max-w-[860px] -translate-y-1/2 lg:block"
        aria-hidden
      >
        <TideField />
      </div>

      <div className="relative mx-auto flex max-w-[1600px] flex-col justify-center px-6 pb-24 pt-[12vh] md:px-10">
        <div className="hero-fade mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 opacity-0" style={{ transform: "translateY(12px)" }}>
          <span className="label text-[var(--color-signal-deep)]">A new category</span>
          <span className="hidden h-px w-12 bg-paper-line sm:block" />
          <span className="label text-ink/55">Catch direct from the boat</span>
        </div>

        <h1 className="display text-ink">
          <span className="hero-line line-mask text-[11vw] leading-[0.92] md:text-[11.5vw] lg:text-[9.5rem]">
            <span className="line-inner">Off the boat</span>
          </span>
          <span className="hero-line line-mask text-[11vw] leading-[0.92] md:text-[11.5vw] lg:text-[9.5rem]">
            <span className="line-inner">
              onto your table<span className="text-[var(--color-catch)]">.</span>
            </span>
          </span>
          <span className="hero-line line-mask mt-2 block text-[6.4vw] leading-[1] text-ink/45 md:text-[5vw] lg:text-[3.7rem]">
            <span className="line-inner serif-italic">Nothing in between but the tide.</span>
          </span>
        </h1>

        <div
          className="hero-fade mt-10 max-w-[48ch] text-lg text-ink/70 opacity-0 md:text-xl"
          style={{ transform: "translateY(12px)" }}
        >
          By the time most fish reaches a plate it has passed five hands and three
          days. Tideline is the marketplace for the in-between — book a seat on a
          working boat, or claim a share of the landing, direct from the skipper
          at the dock price.
        </div>

        <div
          className="hero-fade mt-10 flex flex-wrap items-center gap-4 opacity-0"
          style={{ transform: "translateY(12px)" }}
        >
          <Link ref={cta} to="/catch" data-cursor="Today" className="signal-btn">
            See today's landings →
          </Link>
          <a href="#how" className="ghost-btn border-ink/25 text-ink hover:bg-ink hover:text-paper" data-cursor="See how">
            How it works
          </a>
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-fade absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-0 md:flex">
        <span className="label text-ink/40">Scroll</span>
        <span className="scroll-dot h-8 w-px bg-ink/30" />
      </div>
      <style>{`
        .scroll-dot{transform-origin:top;animation:cue 1.8s var(--ease-made) infinite;}
        @keyframes cue{0%,100%{transform:scaleY(.3);opacity:.3}50%{transform:scaleY(1);opacity:.8}}
      `}</style>
    </section>
  );
}

function TideField() {
  // a wide tide curve across a depth chart, drawn via dash offset
  const W = 600;
  const H = 520;
  const mid = 250;
  const amp = 70;
  const pts = [];
  for (let x = 0; x <= W; x += 6) {
    const yy = mid - amp * Math.sin((x / W) * Math.PI * 4);
    pts.push(`${x === 0 ? "M" : "L"}${x} ${yy.toFixed(1)}`);
  }
  const curve = pts.join(" ");
  const fill = `${curve} L${W} ${H} L0 ${H} Z`;

  // buoy at a crest
  const bx = 150;
  const by = mid - amp * Math.sin((bx / W) * Math.PI * 4);

  const readouts = [
    { x: 360, y: 110, k: "Sea state", v: "Slight · 0.8 m" },
    { x: 360, y: 175, k: "Tide", v: "Ebbing → low 18:42" },
    { x: 360, y: 240, k: "Water temp", v: "27.4 °C" },
    { x: 360, y: 305, k: "Moon", v: "Waning gibbous" },
  ];

  return (
    <svg viewBox="0 0 600 520" className="w-full">
      {/* depth contours */}
      <g stroke="var(--color-depth)" strokeWidth="1" opacity="0.1">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="0" y1={60 + i * 56} x2="600" y2={60 + i * 56} />
        ))}
      </g>

      {/* water fill */}
      <path className="tide-fill" d={fill} fill="var(--color-signal)" opacity="0" />
      {/* the tide line */}
      <path
        className="tide-draw"
        d={curve}
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{ strokeDasharray: 2600, strokeDashoffset: 2600 }}
      />

      {/* buoy */}
      <g className="buoy" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <line x1={bx} y1={by} x2={bx} y2={by - 34} stroke="var(--color-catch)" strokeWidth="1.5" />
        <circle cx={bx} cy={by - 38} r="5" fill="var(--color-catch)" />
        <circle cx={bx} cy={by} r="6" fill="var(--color-catch)" stroke="var(--color-paper)" strokeWidth="2" />
      </g>

      {/* sea-state readouts */}
      {readouts.map((r) => (
        <g key={r.k} className="sea-readout" opacity="0" style={{ transform: "translateY(10px)" }}>
          <text x={r.x} y={r.y} fontFamily="Space Mono" fontSize="11" fill="var(--color-ink)" opacity="0.45" letterSpacing="2">
            {r.k.toUpperCase()}
          </text>
          <text x={r.x} y={r.y + 22} fontFamily="Fraunces" fontSize="22" fill="var(--color-ink)">
            {r.v}
          </text>
        </g>
      ))}
    </svg>
  );
}
