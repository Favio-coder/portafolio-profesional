import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Tracks from "@/components/Tracks";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="relative">
        <Hero />
        <Tracks
          bands={[
            {
              text: "FULL STACK  CLOUD  DATA  AI  BUILD & SHIP",
              direction: "left",
              speed: 35,
              color: "var(--muted-foreground)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              weight: 700,
            },
            {
              text: "DESIGN  DEVELOP  DEPLOY  ITERATE  SCALE",
              direction: "right",
              speed: 42,
              color: "var(--muted-foreground)",
              fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)",
              weight: 600,
            },
            {
              text: "REACT  NEXT.JS  TYPESCRIPT  TAILWIND  AWS  GCP  TENSORFLOW",
              direction: "left",
              speed: 50,
              color: "var(--muted-foreground)",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              weight: 500,
            },
            {
              text: "CODE  CREATE  SHIP  REPEAT  CODE  CREATE  SHIP  REPEAT",
              direction: "right",
              speed: 38,
              color: "var(--primary)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              weight: 700,
            },
          ]}
          className="py-12 border-y border-[var(--border)]"
        />
        <About />
        <Experience />
        <Projects />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </>
  );
}