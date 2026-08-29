"use client";

import SectionWrapper from "./SectionWrapper";

export default function Education() {
  return (
    <SectionWrapper id="education">
      <h2 className="mb-14 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
        Education
      </h2>

      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <p className="leading-relaxed text-slate-400">
          University of the East, Manila —{" "}
          <span className="font-medium text-white">
            BS Information Technology
          </span>{" "}
          (Expected Graduation: 2027)
        </p>
        <p className="text-slate-400">
          Upcoming OJT:{" "}
          <span className="font-medium text-cyan-400">
            2nd Semester, SY 2026–2027
          </span>
        </p>
      </div>
    </SectionWrapper>
  );
}
