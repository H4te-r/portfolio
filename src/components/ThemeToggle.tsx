"use client";

import { motion } from "framer-motion";
import { HiMoon, HiSun } from "react-icons/hi";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border text-accent"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.55 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex"
      >
        {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
      </motion.span>
    </button>
  );
}
