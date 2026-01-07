"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Work{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline line */}
              <div className="absolute left-8 top-16 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 to-transparent hidden md:block" />

              <div className="relative pl-0 md:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-5 top-8 w-6 h-6 rounded-full bg-slate-950 border-2 border-emerald-500 hidden md:flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>

                <div className="group relative bg-slate-900/50 rounded-2xl p-8 border border-slate-800 hover:border-emerald-500/30 transition-all duration-500">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                          <Briefcase className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {exp.title}
                          </h3>
                          <p className="text-emerald-400 font-medium">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-sm">{exp.period}</p>
                        <p className="text-slate-500 text-sm">{exp.location}</p>
                      </div>
                    </div>

                    <ul className="space-y-3 mt-6">
                      {exp.highlights.map((highlight, highlightIndex) => (
                        <motion.li
                          key={highlightIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: highlightIndex * 0.1 }}
                          className="flex items-start gap-3 text-slate-300"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                          <span>
                            {highlight.includes("jChat") && exp.link ? (
                              <>
                                {highlight.split("jChat")[0]}
                                <a
                                  href={exp.link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                                >
                                  jChat
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                                {highlight.split("jChat")[1]}
                              </>
                            ) : (
                              highlight
                            )}
                          </span>
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

