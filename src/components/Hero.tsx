"use client";

import { motion } from "framer-motion";
import Typewriter from "./Typewriter";
import { Magnetic } from "./MotionEffects";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden px-6"
    >
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-accent/15 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute top-2/3 left-1/3 -translate-x-1/2">
        <div className="h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="relative max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm font-medium tracking-[0.25em] text-accent uppercase"
        >
          Developer &bull; Builder &bull; Problem Solver
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
            <Typewriter />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
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
          <Magnetic>
            <a
              href="#projects"
              data-cursor="View"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-[var(--accent-glow)]"
            >
              View My Work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm font-medium text-muted transition-all hover:border-accent/50 hover:text-foreground"
            >
              Get in Touch
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
