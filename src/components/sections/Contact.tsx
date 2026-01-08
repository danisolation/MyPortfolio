"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone, Send, MapPin } from "lucide-react";
import { personalInfo } from "@/lib/data";

const socialLinks = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/5",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "danisolation",
    href: personalInfo.github,
    color: "hover:text-slate-300 hover:border-slate-300/30 hover:bg-slate-300/5",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Tran Quoc Dung",
    href: personalInfo.linkedin,
    color: "hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/5",
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    color: "hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/5",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-screen py-16 sm:py-20 lg:py-24 bg-slate-900/30 snap-start snap-always flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Get In{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-4 sm:mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-2">
            I&apos;m always open to new opportunities, collaborations, and interesting projects.
            Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact info card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-slate-900/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-slate-800 overflow-hidden"
          >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg sm:rounded-xl">
                  <Send className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Let&apos;s Connect
                </h3>
              </div>

              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-slate-400 mb-6 sm:mb-8 lg:mb-10 text-sm sm:text-base">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Ho Chi Minh City, Vietnam</span>
              </div>

              {/* Social links grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700/50 transition-all duration-300 ${link.color}`}
                  >
                    <div className="p-1.5 sm:p-2 bg-slate-700/50 rounded-md sm:rounded-lg">
                      <link.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider">
                        {link.label}
                      </p>
                      <p className="text-white font-medium text-sm sm:text-base truncate">
                        {link.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-6 sm:mt-8 lg:mt-10 text-center"
              >
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-sm sm:text-base"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  Send me an email
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

