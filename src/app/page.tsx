import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Certifications />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
}
