"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/smooth-scroll";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function PageIndicator() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const mainElement = document.querySelector("main");

    const observerOptions = {
      root: mainElement,
      rootMargin: "-40% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sectionElements = document.querySelectorAll("section[id]");
    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-4 xl:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 xl:gap-4"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleScrollToSection(section.id)}
          className="group relative flex items-center justify-end touch-target"
        >
          {/* Label */}
          <span
            className={`absolute right-6 xl:right-8 text-[10px] xl:text-xs font-medium whitespace-nowrap transition-all duration-300 ${
              activeSection === section.id
                ? "opacity-100 text-blue-400"
                : "opacity-0 group-hover:opacity-100 text-slate-400"
            }`}
          >
            {section.label}
          </span>

          {/* Dot */}
          <span className="relative flex items-center justify-center w-4 h-4">
            <motion.span
              className={`absolute rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "w-2.5 h-2.5 xl:w-3 xl:h-3 bg-blue-400"
                  : "w-1.5 h-1.5 xl:w-2 xl:h-2 bg-slate-600 group-hover:bg-slate-400"
              }`}
              layoutId="activeDot"
            />
            {activeSection === section.id && (
              <motion.span
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute w-2.5 h-2.5 xl:w-3 xl:h-3 bg-blue-400 rounded-full"
              />
            )}
          </span>
        </button>
      ))}

      {/* Line connecting dots */}
      <div className="absolute top-2 bottom-2 right-[7px] w-px bg-slate-800 -z-10" />
    </motion.div>
  );
}

