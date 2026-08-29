"use client";

import SectionWrapper from "./SectionWrapper";
import { HiDownload } from "react-icons/hi";
import Reveal, { SectionIcon } from "./Reveal";
import { Magnetic } from "./MotionEffects";

export default function Resume() {
  return (
    <SectionWrapper id="resume">
      <SectionIcon />
      <Reveal type="up">
        <div className="text-center">
          <h2 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-foreground">
            Resume
          </h2>
          <p className="mx-auto mb-10 max-w-md text-muted">
            Want the full picture? Grab my resume or CV — they cover my
            education, projects, and the tech I work with.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <a
                href="/Jess_Paguel_Resume.pdf"
                download
                data-cursor="Get"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-[var(--accent-glow)]"
              >
                <HiDownload size={18} />
                Download Resume
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/Jess_Paguel_CV.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-medium text-muted transition-all hover:border-accent/50 hover:text-foreground"
              >
                <HiDownload size={18} />
                Download CV
              </a>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}
