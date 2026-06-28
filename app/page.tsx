import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import Logos from "@/components/sections/Logos";
import About from "@/components/sections/About";
import AboutMe from "@/components/sections/AboutMe";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      <Hero />
      <MarqueeStrip />
      <Logos />
      <About />
      <AboutMe />
      <Stats />
      <Services />
      <Process />
      <Work />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
