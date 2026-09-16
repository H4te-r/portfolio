"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { projects, type Project } from "@/data/projects";
import { HiExternalLink, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import ProjectScreenshots from "./ProjectScreenshots";
import Reveal, { SectionIcon } from "./Reveal";

/* ── Slide animation ─────────────────────────────────── */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 420 : -420,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -420 : 420,
    opacity: 0,
    scale: 0.97,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.15 },
    },
  }),
};

const SWIPE_THRESHOLD = 80;

/* ── Single carousel card ────────────────────────────── */

function CarouselCard({
  project,
  isOpen,
  onToggle,
}: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background-card md:h-[480px]">
      <div className="grid h-full md:grid-cols-2">
        {/* ── Visual side ── */}
        {hasScreenshots && (
          <div
            className="relative overflow-hidden border-b border-border md:border-b-0 md:border-r md:h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectScreenshots
              title={project.title}
              screenshots={project.screenshots!}
            />
          </div>
        )}

        {/* ── Content side ── */}
        <div className="flex flex-col overflow-y-auto p-6 md:p-8">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-foreground md:text-2xl">
            {project.title}
          </h3>

          <div className="mt-3 h-px w-10 bg-accent/50" />

          {/* Description or Case Study */}
          {!isOpen ? (
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted md:text-base">
              {project.description}
            </p>
          ) : (
            <div className="mt-4 flex-1 space-y-3 text-sm leading-relaxed text-muted md:text-base">
              <p>
                <span className="font-medium text-accent">Problem: </span>
                {project.caseStudy.problem}
              </p>
              <p>
                <span className="font-medium text-accent">
                  What I built:{" "}
                </span>
                {project.caseStudy.built}
              </p>
              <p>
                <span className="font-medium text-accent">Outcome: </span>
                {project.caseStudy.outcome}
              </p>
            </div>
          )}

          <button
            onClick={onToggle}
            className="mt-4 self-start text-xs font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {isOpen ? "← Back to overview" : "View case study →"}
          </button>

          {/* Tech tags */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted transition-colors hover:border-accent/30 hover:text-accent"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
              >
                <HiExternalLink size={15} />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                <FaGithub size={14} />
                Code
              </a>
            )}
            {project.sourceNote && (
              <span className="text-xs text-muted/50">
                {project.sourceNote}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Projects Section ───────────────────────────── */

export default function Projects() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const paginate = useCallback(
    (dir: number) => {
      setExpanded(null);
      setPage(([prev]) => [
        (prev + dir + projects.length) % projects.length,
        dir,
      ]);
    },
    []
  );

  const goTo = useCallback((index: number) => {
    setExpanded(null);
    setPage(([prev]) => [index, index > prev ? 1 : -1]);
  }, []);

  /* Keyboard navigation when section is hovered/focused */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let hovered = false;
    const enter = () => (hovered = true);
    const leave = () => (hovered = false);
    const onKey = (e: KeyboardEvent) => {
      if (!hovered) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        paginate(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        paginate(1);
      }
    };

    section.addEventListener("mouseenter", enter);
    section.addEventListener("mouseleave", leave);
    window.addEventListener("keydown", onKey);
    return () => {
      section.removeEventListener("mouseenter", enter);
      section.removeEventListener("mouseleave", leave);
      window.removeEventListener("keydown", onKey);
    };
  }, [paginate]);

  const project = projects[page];
  const hasMultiple = projects.length > 1;

  return (
    <SectionWrapper id="projects" className="section-alt">
      <div ref={sectionRef}>
        <SectionIcon />
        <Reveal type="up">
          <h2 className="mb-14 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-foreground">
            Projects
          </h2>
        </Reveal>

        <div className="mx-auto max-w-5xl px-4">
          {/* ── Carousel wrapper ── */}
          <Reveal type="scale">
            <div className="relative">
              {/* Arrow buttons */}
              {hasMultiple && (
                <>
                  <button
                    onClick={() => paginate(-1)}
                    aria-label="Previous project"
                    className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background-card/80 p-2 text-muted/70 backdrop-blur-sm transition-all hover:border-accent/40 hover:text-accent hover:shadow-lg md:-left-6 md:p-3"
                  >
                    <HiChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    aria-label="Next project"
                    className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background-card/80 p-2 text-muted/70 backdrop-blur-sm transition-all hover:border-accent/40 hover:text-accent hover:shadow-lg md:-right-6 md:p-3"
                  >
                    <HiChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Slide area */}
              <div className="overflow-hidden rounded-2xl">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="wait"
                >
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag={hasMultiple ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
                        paginate(info.offset.x > 0 ? -1 : 1);
                      }
                    }}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <CarouselCard
                      project={project}
                      isOpen={expanded === project.title}
                      onToggle={() =>
                        setExpanded(
                          expanded === project.title ? null : project.title
                        )
                      }
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* ── Dot indicators + counter ── */}
          {hasMultiple && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === page
                        ? "w-6 bg-accent"
                        : "w-2 bg-muted/25 hover:bg-muted/50"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs tracking-wider text-muted/40">
                {page + 1} / {projects.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
