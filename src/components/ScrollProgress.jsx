import { useEffect, useRef } from "react";

/** Thin tide→catch progress bar pinned to the very top. */
export default function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[150] h-[2px] w-full bg-transparent">
      <div
        ref={bar}
        className="h-full w-full origin-left scale-x-0"
        style={{
          background:
            "linear-gradient(90deg, var(--color-signal), var(--color-catch))",
        }}
      />
    </div>
  );
}
