"use client";

import SectionWrapper from "./SectionWrapper";
import Reveal, { SectionIcon } from "./Reveal";

export default function Education() {
  return (
    <SectionWrapper id="education">
      <SectionIcon />
      <Reveal type="up">
        <h2 className="mb-14 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-foreground">
          Education
        </h2>
      </Reveal>

      <div className="mx-auto max-w-2xl">
        <Reveal type="up">
          <div className="theme-surface glow-border rounded-2xl border border-border p-8 text-center">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-foreground md:text-3xl">
              University of the East, Manila
            </h3>
            <p className="mt-3 text-accent">Expected Graduation: 2027</p>
            <p className="mt-2 text-lg text-foreground/80">
              Bachelor of Science in Information Technology
            </p>
            <p className="mt-3 text-muted">
              On-the-Job Training scheduled for 2nd Semester, SY 2026–2027
            </p>
          </div>
        </Reveal>

        <Reveal type="up" delay={0.1}>
          <div className="mt-10 space-y-8 border-t border-border pt-10 text-center">
            <div>
              <h4 className="text-sm font-medium tracking-wide text-foreground/80">
                Arellano University, Andres Bonifacio Campus
              </h4>
              <p className="mt-2 text-sm text-muted">
                Senior High School — Graduated with High Honors (Grade 11 — With
                Honors)
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium tracking-wide text-foreground/80">
                Benigno Ninoy S. Aquino High School
              </h4>
              <p className="mt-2 text-sm text-muted">
                Junior High School Graduate (Graduated With honors)
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
