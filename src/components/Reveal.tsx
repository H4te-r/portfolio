"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
};

export default function Reveal({
  children,
  type = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  type?: "up" | "scale";
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={variants[type]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionIcon({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className="mx-auto mb-4 text-accent"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <motion.polygon
        points="14,2 25,8.5 25,19.5 14,26 3,19.5 3,8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay, ease: "easeInOut" }}
      />
      <motion.circle
        cx="14"
        cy="14"
        r="2.5"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: delay + 0.35 }}
      />
    </motion.svg>
  );
}
