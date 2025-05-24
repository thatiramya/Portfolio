
import React from "react";
import { ThemeProvider } from "../context/ThemeContext";
import ThreeCanvas from "../components/Canvas/ThreeCanvas";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
        <ThreeCanvas />
        <NavBar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
