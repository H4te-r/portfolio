"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen items-center justify-center px-6 pt-20"
    >
      <div className="max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-sm font-medium tracking-widest text-indigo-400 uppercase"
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
        >
          Hi, I&apos;m{" "}
          <span className="text-indigo-400">Rinnah Garcia</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg text-gray-400 md:text-xl"
        >
          IT student building real-world solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-full bg-indigo-500 px-8 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-sm font-medium text-gray-300 transition-colors hover:border-white/40 hover:text-white"
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
