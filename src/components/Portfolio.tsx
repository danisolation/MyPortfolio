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
import PageIndicator from "./ui/page-indicator";

export default function Portfolio() {
  return (
    <div className="bg-slate-950 text-white overflow-x-hidden">
      <Header />
      <PageIndicator />
      <main className="snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth custom-scrollbar">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
