import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
/* import Stack from "@/components/Stack"; */
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      {/* <Stack /> */}
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
