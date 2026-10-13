import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import TechnicalTracks from "@/components/TechnicalTracks";
import AnimatedStatement from "@/components/AnimatedStatement";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="relative">
        <Hero />
        <About />
        <TechnicalTracks />
        <Experience />
        <Projects />
        <Gallery />
        <AnimatedStatement />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
