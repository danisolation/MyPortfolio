"use client";

import { experience } from "@/lib/data";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative min-h-screen py-16 sm:py-20 lg:py-24 bg-slate-950 snap-start snap-always flex items-center"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
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
            Work{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative mb-4 sm:mb-5"
            >
              {/* Timeline line */}
              <div className="absolute left-8 top-16 bottom-0 w-px bg-gradient-to-b from-blue-500/50 to-transparent hidden md:block" />

              <div className="relative pl-0 md:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-5 top-8 w-6 h-6 rounded-full bg-slate-950 border-2 border-blue-500 hidden md:flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>

                <div className="group relative bg-slate-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-800 hover:border-blue-500/30 transition-all duration-500">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0">
                          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-white">
                            {exp.title}
                          </h3>
                          <p className="text-blue-400 font-medium text-sm sm:text-base">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right ml-11 sm:ml-0">
                        <p className="text-slate-400 text-xs sm:text-sm">{exp.period}</p>
                        <p className="text-slate-500 text-xs sm:text-sm">{exp.location}</p>
                      </div>
                    </div>

                    <ul className="space-y-2 sm:space-y-3 mt-4 sm:mt-6">
                      {exp.highlights.map((highlight, highlightIndex) => (
                        <motion.li
                          key={highlightIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: highlightIndex * 0.1 }}
                          className="flex items-start gap-2 sm:gap-3 text-slate-300 text-sm sm:text-base"
                        >
                          <span className="mt-1.5 sm:mt-2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
