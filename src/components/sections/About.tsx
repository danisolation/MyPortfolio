"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { personalInfo, skills } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-slate-900/50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 p-1">
                <div className="w-full h-full rounded-full bg-slate-900" />
              </div>
              <Image
                src={personalInfo.image}
                alt={personalInfo.name}
                fill
                className="rounded-full object-cover p-2"
              />
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-8 bg-slate-800/90 backdrop-blur-sm border border-emerald-500/30 rounded-xl px-4 py-2"
              >
                <span className="text-emerald-400 font-semibold">2+ Years</span>
                <p className="text-slate-400 text-xs">Experience</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {personalInfo.bio.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={itemVariants}
                className="text-slate-300 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div variants={itemVariants} className="pt-6">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="group relative p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <Icon
                      icon={skill}
                      style={{ fontSize: "32px" }}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

