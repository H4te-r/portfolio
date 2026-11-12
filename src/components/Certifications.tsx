"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { GlowCard } from "./MotionEffects";
import Reveal, { SectionIcon } from "./Reveal";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface Certification {
  name: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  issueNote: string;
}

const certifications: Certification[] = [
  {
    name: "Networking",
    issuer: "Certiport",
    date: "April 2026",
    description:
      "Covers core networking concepts, infrastructure, and protocols",
    image: "/certs/networking.jpeg",
    issueNote: "Issued by Certiport · April 2026",
  },
  {
    name: "Cybersecurity",
    issuer: "Certiport",
    date: "Nov. 2025",
    description:
      "Covers foundational security principles, threat identification, and protection practices",
    image: "/certs/cybersecurity.jpeg",
    issueNote: "Issued by Certiport · November 2025",
  },
  {
    name: "AI for Good Workshop",
    issuer: "AI Singapore",
    date: "April 2025",
    description:
      "Completed the AISG AI for Good Workshop covering responsible AI practices, supported by Meta",
    image: "/certs/ai-for-good.jpg",
    issueNote: "Issued by AI Singapore · Supported by Meta · April 2025",
  },
  {
    name: "C++ Programming 1",
    issuer: "CodeChum",
    date: "Sept. 2026",
    description:
      "Covers foundational C++ programming concepts, logic, and problem-solving in CCS 2102",
    image: "/certs/codechumCertificate.jpg",
    issueNote: "Issued by CodeChum · Sept. 2026",
  },
];

export default function Certifications() {
  const [viewing, setViewing] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Drag interaction refs for desktop
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const activeCert = certifications.find((c) => c.name === viewing) ?? null;
  const close = useCallback(() => setViewing(null), []);

  /* ── Sync active card index on scroll ── */
  const updateScrollState = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll(".cert-card-item")
    ) as HTMLElement[];
    if (cards.length === 0) return;

    const containerLeft = container.getBoundingClientRect().left;
    let closestIdx = 0;
    let minDiff = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const diff = Math.abs(cardRect.left - containerLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setCurrentIndex(closestIdx);
  }, []);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    updateScrollState();

    const onScroll = () => {
      updateScrollState();
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  /* ── Programmatic scroll helper ── */
  const scrollToIndex = useCallback((index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    const cards = Array.from(
      container.querySelectorAll(".cert-card-item")
    ) as HTMLElement[];
    const targetCard = cards[index];
    if (targetCard) {
      container.scrollTo({
        left: targetCard.offsetLeft,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }, []);

  /* ── Infinite loop next/previous navigation ── */
  const scrollPrev = useCallback(() => {
    const prevIdx =
      (currentIndex - 1 + certifications.length) % certifications.length;
    scrollToIndex(prevIdx);
  }, [currentIndex, scrollToIndex]);

  const scrollNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % certifications.length;
    scrollToIndex(nextIdx);
  }, [currentIndex, scrollToIndex]);

  /* ── Keyboard navigation on hover ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isHovered = false;
    const onEnter = () => (isHovered = true);
    const onLeave = () => (isHovered = false);

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isHovered) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    };

    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [scrollPrev, scrollNext]);

  /* ── Lightbox escape key & scroll lock ── */
  useEffect(() => {
    if (!viewing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [viewing, close]);

  /* ── Mouse drag handlers for desktop ── */
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = carouselRef.current;
    if (!container) return;
    isPointerDownRef.current = true;
    startXRef.current = e.pageX;
    startScrollLeftRef.current = container.scrollLeft;
    hasDraggedRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPointerDownRef.current) return;
    const container = carouselRef.current;
    if (!container) return;
    const diff = e.pageX - startXRef.current;
    if (Math.abs(diff) > 6) {
      hasDraggedRef.current = true;
    }
    container.scrollLeft = startScrollLeftRef.current - diff;
  };

  const handleMouseUp = () => {
    isPointerDownRef.current = false;
  };

  const handleMouseLeave = () => {
    isPointerDownRef.current = false;
  };

  const handleCardClick = (certName: string) => {
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    setViewing(certName);
  };

  return (
    <SectionWrapper id="certifications">
      <div ref={sectionRef}>
        <SectionIcon />
        <Reveal type="up">
          <h2 className="mb-8 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-foreground">
            Certifications
          </h2>
        </Reveal>

        {/* ── Step progress indicator & counter ── */}
        <Reveal type="up" delay={0.08}>
          <div className="mb-8 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2.5">
              {certifications.map((cert, idx) => (
                <button
                  key={cert.name}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to certificate ${idx + 1}: ${cert.name}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-12 bg-accent shadow-[0_0_12px_var(--accent-glow)]"
                      : "w-7 bg-muted/20 hover:bg-muted/40"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono tracking-wider text-muted/60">
              0{currentIndex + 1} / 0{certifications.length}
            </span>
          </div>
        </Reveal>

        {/* ── Carousel container wrapper with side gutters for arrows ── */}
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-16 lg:px-20">
          {/* Left arrow button (Desktop - consistently placed outside card boundary) */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous certificate (loops from start to end)"
            className="hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-border bg-background-card/90 text-muted backdrop-blur-md transition-all shadow-lg hover:border-accent/50 hover:text-accent hover:shadow-[0_0_15px_var(--accent-glow)] cursor-pointer"
          >
            <HiChevronLeft size={22} />
          </button>

          {/* Right arrow button (Desktop - consistently placed outside card boundary) */}
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next certificate (loops from end to start)"
            className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-border bg-background-card/90 text-muted backdrop-blur-md transition-all shadow-lg hover:border-accent/50 hover:text-accent hover:shadow-[0_0_15px_var(--accent-glow)] cursor-pointer"
          >
            <HiChevronRight size={22} />
          </button>

          {/* Scrollable Track */}
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="relative flex gap-4 md:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-1 no-scrollbar select-none cursor-grab active:cursor-grabbing"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="cert-card-item"
              >
                <GlowCard className="h-full w-full">
                  <button
                    type="button"
                    onClick={() => handleCardClick(cert.name)}
                    className="group flex h-full min-h-[360px] w-full cursor-pointer flex-col justify-between rounded-2xl border border-border p-5 text-left theme-surface glow-border transition-all duration-200 hover:scale-[1.015] bg-background-card"
                    aria-label={`View ${cert.name} certificate`}
                  >
                    {/* Thumbnail Preview */}
                    <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-border/80 bg-background/50 shadow-inner">
                      <Image
                        src={cert.image}
                        alt={`${cert.name} certificate from ${cert.issuer}`}
                        fill
                        sizes="(max-width: 768px) 85vw, 45vw"
                        className="object-contain p-2.5 transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Hover overlay badge */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
                        <span className="rounded-full border border-white/20 bg-black/70 px-3.5 py-1.5 text-xs font-medium text-white shadow-lg">
                          Click to expand
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="glow-badge rounded-full border border-border px-3 py-1 text-xs text-muted">
                            {cert.issuer}
                          </span>
                          <span className="text-xs font-mono text-muted/70">
                            {cert.date}
                          </span>
                        </div>
                        <h3 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-foreground transition-colors group-hover:text-accent">
                          {cert.name}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                          {cert.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs text-accent">
                        <span className="font-medium">View certificate</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </button>
                </GlowCard>
              </div>
            ))}

            {/* Trailing spacer so the final card can scroll into view and loop seamlessly */}
            <div
              className="hidden md:block flex-shrink-0"
              style={{ width: "calc((100% - 40px) / 2.17)" }}
              aria-hidden="true"
            />
            <div
              className="md:hidden flex-shrink-0"
              style={{ width: "calc((100% - 16px) / 1.17)" }}
              aria-hidden="true"
            />
          </div>

          {/* Mobile Swipe Hint */}
          <p className="mt-2 text-center text-xs text-muted/50 md:hidden">
            Swipe to explore more certificates →
          </p>
        </div>
      </div>

      {/* ── Lightbox modal ── */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCert.name} certificate`}
        >
          <div
            className="relative mx-4 w-full max-w-3xl animate-[modalIn_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Certificate image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-background-card shadow-2xl">
              <Image
                src={activeCert.image}
                alt={`${activeCert.name} certificate from ${activeCert.issuer}`}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain p-4"
                priority
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white">
                {activeCert.name}
              </h3>
              <p className="mt-1 text-sm text-white/60">
                {activeCert.issueNote} — {activeCert.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
