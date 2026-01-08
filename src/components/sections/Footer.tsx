"use client";

import { motion } from "framer-motion";
import { Heart, ChevronUp } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { scrollToSection } from "@/lib/smooth-scroll";

export default function Footer() {
  const scrollToTop = () => {
    scrollToSection("home", 1500);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 py-8 sm:py-10 lg:py-12 snap-end">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 sm:mb-6"
          >
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1 text-slate-500 text-xs sm:text-sm text-center flex-wrap justify-center"
          >
            © {currentYear} Made with{" "}
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 fill-red-400" /> by{" "}
            {personalInfo.name}
          </motion.p>
        </div>
      </div>

      {/* Scroll to top button - responsive positioning */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 p-2.5 sm:p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow z-40"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>
    </footer>
  );
}

