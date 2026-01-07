"use client";

import {
  Header,
  Hero,
  About,
  Experience,
  Projects,
  Education,
  Contact,
  Footer,
} from "./sections";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
