import { useEffect, useRef } from "react";

/**
 * The precise dot + lagging ring. Morphs into a tide-disc with a contextual
 * word over elements carrying data-cursor="Word". Desktop only.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      const el = e.target.closest("[data-cursor]");
      if (el) {
        const word = el.getAttribute("data-cursor");
        ring.current?.classList.add("is-active");
        if (label.current) label.current.textContent = word || "";
      } else {
        ring.current?.classList.remove("is-active");
        if (label.current) label.current.textContent = "";
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-signal)] md:block"
        style={{ marginLeft: -3, marginTop: -3 }}
      />
      <div
        ref={ring}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[199] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:flex"
      >
        <span ref={label} className="cursor-label" />
      </div>
      <style>{`
        .cursor-ring{width:40px;height:40px;margin-left:-20px;margin-top:-20px;border:1px solid color-mix(in srgb,var(--color-ink) 45%,transparent);transition:width .35s var(--ease-made),height .35s var(--ease-made),background .35s var(--ease-made),border-color .35s var(--ease-made);}
        .cursor-ring.is-active{width:76px;height:76px;margin-left:-38px;margin-top:-38px;background:var(--color-signal);border-color:var(--color-signal);}
        .cursor-label{font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.14em;font-size:.5625rem;color:var(--color-ink);opacity:0;transition:opacity .3s var(--ease-made);}
        .cursor-ring.is-active .cursor-label{opacity:1;}
      `}</style>
    </>
  );
}
