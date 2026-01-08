"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="relative min-h-screen py-16 sm:py-20 lg:py-24 bg-slate-950 snap-start snap-always flex items-center">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative bg-slate-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-800 hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-4">
                    <div className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg sm:rounded-xl border border-blue-500/20 w-fit">
                      <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                        {edu.degree}
                      </h3>
                      <div className="flex flex-col xs:flex-row flex-wrap gap-2 xs:gap-4 text-xs sm:text-sm">
                        <span className="flex items-center gap-1.5 sm:gap-2 text-blue-400">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {edu.institution}
                        </span>
                        <span className="flex items-center gap-1.5 sm:gap-2 text-slate-400">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {edu.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base pl-0 sm:pl-12 md:pl-16">
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

