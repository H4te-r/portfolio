"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Glowing orb — cyan */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />
      </div>
      {/* Secondary orb — blue */}
      <div className="pointer-events-none absolute top-2/3 left-1/3 -translate-x-1/2">
        <div className="h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="relative max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm font-medium tracking-[0.25em] text-cyan-400 uppercase"
        >
          Developer &bull; Builder &bull; Problem Solver
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Jess
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
        >
          An IT student from the Philippines who builds software that actually
          ships. Currently focused on web development and real-world systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-500 px-8 text-sm font-semibold text-[#0a0f1e] transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-700 px-8 text-sm font-medium text-slate-300 transition-all hover:border-cyan-500/50 hover:text-white"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
