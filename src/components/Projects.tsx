"use client";

import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { projects } from "@/data/projects";
import { HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import ProjectScreenshots from "./ProjectScreenshots";
import { TiltCard } from "./MotionEffects";
import Reveal, { SectionIcon } from "./Reveal";

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <SectionWrapper id="projects" className="section-alt">
      <SectionIcon />
      <Reveal type="up">
        <h2 className="mb-14 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-foreground">
          Projects
        </h2>
      </Reveal>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {projects.map((project, idx) => {
          const isOpen = expanded === project.title;
          return (
            <Reveal key={project.title} type="scale" delay={idx * 0.1}>
              <TiltCard>
                <article
                  data-cursor="View"
                  className="glow-border theme-surface flex h-full cursor-pointer flex-col rounded-2xl border border-border p-6"
                  onClick={() =>
                    setExpanded(isOpen ? null : project.title)
                  }
                >
                  {project.screenshots && project.screenshots.length > 0 && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <ProjectScreenshots
                        title={project.title}
                        screenshots={project.screenshots}
                      />
                    </div>
                  )}
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>

                  {!isOpen ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                  ) : (
                    <div className="mt-3 flex-1 space-y-3 text-sm leading-relaxed text-muted">
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

                  <p className="mt-3 text-xs text-muted">
                    {isOpen ? "Click to collapse" : "Click for case study"}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-accent/20 px-3 py-1 text-xs font-medium text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div
                    className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="Open"
                        className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                      >
                        <HiExternalLink size={16} />
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
                        <FaGithub size={16} />
                        Code
                      </a>
                    )}
                    {project.sourceNote && (
                      <span className="text-sm text-muted">
                        {project.sourceNote}
                      </span>
                    )}
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
