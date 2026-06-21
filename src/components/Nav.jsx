import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Wordmark from "./Wordmark";
import { useMagnetic } from "../lib/useMagnetic";

const LINKS = [
  { label: "How it works", to: "/#how" },
  { label: "The catch", to: "/catch" },
  { label: "For skippers", to: "/skipper" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const cta = useMagnetic(0.25);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // flip light-over-dark when a [data-nav-dark] band crosses the nav line
  useEffect(() => {
    const bands = Array.from(document.querySelectorAll("[data-nav-dark]"));
    const check = () => {
      const y = 38;
      const over = bands.some((b) => {
        const r = b.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      });
      setDark(over);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [loc.pathname]);

  const handleAnchor = (e, to) => {
    if (!to.startsWith("/#")) return;
    if (loc.pathname === "/") {
      e.preventDefault();
      const id = to.slice(2);
      const el = document.getElementById(id);
      if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
      else el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tone = dark ? "text-paper" : "text-ink";

  return (
    <header
      className={`fixed left-0 top-0 z-[140] w-full transition-colors duration-500 ${tone}`}
    >
      <div
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-all duration-500 md:px-10 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <Link to="/" data-cursor="Home" className="shrink-0">
          <Wordmark onDark={dark} />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={(e) => handleAnchor(e, l.to)}
              className="label whitespace-nowrap opacity-70 transition-opacity hover:opacity-100"
            >
              {l.label}
            </Link>
          ))}
          <Link
            ref={cta}
            to="/catch"
            data-cursor="Today"
            className="signal-btn whitespace-nowrap !px-5 !py-3"
          >
            Today's landings
          </Link>
        </nav>

        <div className="lg:hidden">
          <Link to="/catch" data-cursor="Today" className="signal-btn !px-4 !py-2.5">
            Today's landings
          </Link>
        </div>
      </div>
    </header>
  );
}
