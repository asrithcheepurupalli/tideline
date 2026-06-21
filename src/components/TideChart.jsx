/**
 * A deterministic tide chart derived from a boat id — every boat gets its own
 * tide curve and sounding marks, drawn not photographed. On-theme, zero assets.
 * The filled area is "water"; the dot is where this boat lands its catch.
 */
export default function TideChart({ seed = "", tone = "var(--color-signal)" }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 9973;
  const rng = () => {
    h = (h * 1103515245 + 12345) % 2147483648;
    return h / 2147483648;
  };

  const W = 192;
  const H = 120;
  const amp = 14 + rng() * 12; // tide range
  const phase = rng() * Math.PI * 2;
  const freq = 1.4 + rng() * 1.1;
  const mid = 60 + (rng() - 0.5) * 16;

  const y = (x) => mid - amp * Math.sin((x / W) * Math.PI * 2 * freq + phase);

  // build the curve path
  let d = `M0 ${y(0).toFixed(1)}`;
  for (let x = 4; x <= W; x += 4) d += ` L${x} ${y(x).toFixed(1)}`;
  const area = `${d} L${W} ${H} L0 ${H} Z`;

  // the landing marker — peak-ish point chosen deterministically
  const markX = 40 + rng() * 112;
  const markY = y(markX);

  return (
    <svg viewBox="0 0 192 120" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="192" height="120" fill="var(--color-paper-dim)" />

      {/* depth contour lines */}
      <g stroke="var(--color-depth)" strokeWidth="0.5" opacity="0.14">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={"c" + i} x1="0" y1={20 + i * 18} x2="192" y2={20 + i * 18} />
        ))}
      </g>
      {/* sounding ticks along the bottom */}
      <g stroke="var(--color-ink)" strokeWidth="0.6" opacity="0.18">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={"t" + i} x1={i * 16 + 8} y1="112" x2={i * 16 + 8} y2="118" />
        ))}
      </g>

      {/* water fill under the tide curve */}
      <path d={area} fill={tone} opacity="0.18" />
      {/* the tide line itself */}
      <path d={d} fill="none" stroke={tone} strokeWidth="1.6" strokeLinejoin="round" />

      {/* landing marker */}
      <line x1={markX} y1={markY} x2={markX} y2="112" stroke="var(--color-ink)" strokeWidth="0.6" opacity="0.35" strokeDasharray="2 3" />
      <circle cx={markX} cy={markY} r="3.4" fill="var(--color-catch)" stroke="var(--color-paper)" strokeWidth="1.2" />
    </svg>
  );
}
