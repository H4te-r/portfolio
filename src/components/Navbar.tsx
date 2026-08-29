"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";
import { Magnetic } from "./MotionEffects";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border shadow-lg shadow-black/10 backdrop-blur-xl"
          : "border-b border-transparent backdrop-blur-md"
      }`}
      style={{ background: "var(--nav-bg)" }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Magnetic strength={0.18}>
          <a
            href="#hero"
            className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold tracking-tight text-foreground"
          >
            jess<span className="text-accent">.</span>
          </a>
        </Magnetic>

        <ul className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Magnetic strength={0.22}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="text-muted transition-colors hover:text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border backdrop-blur-xl lg:hidden"
            style={{ background: "var(--nav-bg)" }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
