import { useEffect, useRef, useState } from "react";
import Wordmark from "./Wordmark";

/**
 * One-time tide curtain on first load. The horizon line draws, a wave rolls
 * under it, the wordmark settles, then the tide lifts the curtain away.
 * Skipped entirely under reduced-motion.
 */
export default function Intro() {
  const [gone, setGone] = useState(false);
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    document.documentElement.classList.add("lenis-stopped");
    const t1 = setTimeout(() => {
      root.current?.classList.add("lift");
      document.documentElement.classList.remove("lenis-stopped");
    }, 1900);
    const t2 = setTimeout(() => setGone(true), 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="intro fixed inset-0 z-[300] flex flex-col items-center justify-center bg-paper"
    >
      <svg
        viewBox="0 0 160 70"
        className="mb-8 h-20 w-40"
        fill="none"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        {/* horizon */}
        <line className="draw" x1="14" y1="30" x2="146" y2="30" stroke="var(--color-catch)" />
        {/* rolling wave */}
        <path
          className="draw d2"
          d="M14 48c11 0 11-12 22-12s11 12 22 12 11-12 22-12 11 12 22 12 11-12 22-12 11 12 22 12"
          stroke="var(--color-signal)"
        />
        {/* the catch — a dot riding the line */}
        <circle className="buoy" cx="80" cy="30" r="3.2" fill="var(--color-catch)" />
      </svg>
      <div className="intro-mark">
        <Wordmark className="!text-[2rem]" />
      </div>
      <style>{`
        .intro{transition:transform 1s var(--ease-made);}
        .intro.lift{transform:translateY(-101%);}
        .intro .draw{stroke-dasharray:340;stroke-dashoffset:340;animation:draw 1.2s var(--ease-made) forwards;}
        .intro .d2{animation-delay:.5s;}
        .intro .buoy{opacity:0;transform-box:fill-box;transform-origin:center;animation:buoy .6s var(--ease-made) 1.25s forwards;}
        .intro .intro-mark{opacity:0;animation:fade .8s var(--ease-made) 1.4s forwards;}
        @keyframes draw{to{stroke-dashoffset:0;}}
        @keyframes buoy{0%{opacity:0;transform:translateY(-6px) scale(.4);}100%{opacity:1;transform:translateY(0) scale(1);}}
        @keyframes fade{to{opacity:1;}}
      `}</style>
    </div>
  );
}
