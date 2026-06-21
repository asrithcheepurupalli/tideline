import Hero from "../sections/Hero";
import LandingCounter from "../sections/LandingCounter";
import Problem from "../sections/Problem";
import DirectLine from "../sections/DirectLine";
import Marquee from "../sections/Marquee";
import HowItWorks from "../sections/HowItWorks";
import PriceSplitter from "../sections/PriceSplitter";
import Benefits from "../sections/Benefits";
import Manifesto from "../sections/Manifesto";

export default function Home() {
  return (
    <>
      <Hero />
      <LandingCounter />
      <Problem />
      <DirectLine />
      <Marquee />
      <div id="how">
        <HowItWorks />
      </div>
      <PriceSplitter />
      <Benefits />
      <Manifesto />
    </>
  );
}
