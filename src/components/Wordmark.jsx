/**
 * Tideline wordmark. "Tide" in Fraunces italic, "line" upright, with the
 * signature tide-glyph — a horizon line the water just breaks over.
 */
export default function Wordmark({ className = "", onDark = false }) {
  return (
    <span
      className={`inline-flex items-baseline gap-[0.04em] font-display text-[1.35rem] font-medium tracking-tight ${
        onDark ? "text-paper" : "text-ink"
      } ${className}`}
    >
      <span className="italic">Tide</span>
      <span>line</span>
      <svg
        viewBox="0 0 22 14"
        className="ml-[0.18em] h-[0.62em] w-[0.95em] translate-y-[-0.04em]"
        fill="none"
        aria-hidden
      >
        <line
          x1="1"
          y1="5"
          x2="21"
          y2="5"
          stroke="var(--color-catch)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M1 10c3 0 3-3 5-3s3 3 5 3 3-3 5-3 3 3 5 3"
          stroke="var(--color-signal)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
