/**
 * An ambient tide line that drifts sideways forever — the recurring motif of
 * the site, used as a section divider. Pure CSS animation, GPU-cheap, and it
 * holds still under reduced-motion. Stroke colour inherits from `color`.
 */
export default function WaveLine({ color = "var(--color-signal)", height = 28, opacity = 1 }) {
  // two periods so the -50% translate loops seamlessly
  const wave =
    "M0 14c20 0 20-11 40-11s20 11 40 11 20-11 40-11 20 11 40 11";
  return (
    <div
      className="wave-line w-full overflow-hidden"
      style={{ height, opacity }}
      aria-hidden
    >
      <svg
        viewBox="0 0 320 28"
        preserveAspectRatio="none"
        className="wave-svg h-full w-[200%]"
        fill="none"
      >
        <path d={`${wave} ${wave.replace(/^M0/, "M160")}`} stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <style>{`
        .wave-svg{animation:drift 9s linear infinite;}
        @media (prefers-reduced-motion: reduce){.wave-svg{animation:none;}}
        @keyframes drift{to{transform:translateX(-50%);}}
      `}</style>
    </div>
  );
}
