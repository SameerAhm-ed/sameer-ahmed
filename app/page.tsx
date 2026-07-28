import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import Audience from "@/components/sections/Audience";
import AboutMe from "@/components/sections/AboutMe";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Activity from "@/components/sections/Activity";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      <Hero />
      <MarqueeStrip />
      <Audience />
      <AboutMe />
      <Stats />
      <Services />
      <Process />
      <Work />
      <Activity />
      <FAQ />
      <Contact />
    </main>
  );
}
