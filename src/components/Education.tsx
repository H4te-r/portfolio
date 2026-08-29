"use client";

import SectionWrapper from "./SectionWrapper";

export default function Education() {
  return (
    <SectionWrapper id="education">
      <h2 className="mb-14 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
        Education
      </h2>

      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-white md:text-3xl">
            University of the East, Manila
          </h3>
          <p className="mt-3 text-cyan-400">Expected Graduation: 2027</p>
          <p className="mt-2 text-lg text-slate-300">
            Bachelor of Science in Information Technology
          </p>
          <p className="mt-3 text-slate-400">
            On-the-Job Training scheduled for 2nd Semester, SY 2026–2027
          </p>
        </div>

        <div className="mt-12 space-y-8 border-t border-white/5 pt-10 text-center">
          <div>
            <h4 className="text-sm font-medium tracking-wide text-slate-300">
              Arellano University, Andres Bonifacio Campus
            </h4>
            <p className="mt-2 text-sm text-slate-500">
              Senior High School — Graduated with High Honors (Grade 11 — With
              Honors)
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium tracking-wide text-slate-300">
              Benigno Ninoy S. Aquino High School
            </h4>
            <p className="mt-2 text-sm text-slate-500">
              Junior High School Graduate (Graduated With honors)
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
