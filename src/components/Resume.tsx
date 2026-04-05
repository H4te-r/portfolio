"use client";

import SectionWrapper from "./SectionWrapper";
import { HiDownload } from "react-icons/hi";

export default function Resume() {
  return (
    <SectionWrapper id="resume">
      <div className="text-center">
        <h2 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
          Resume
        </h2>
        <p className="mx-auto mb-10 max-w-md text-slate-400">
          Want the full picture? Grab my resume — it covers my education,
          projects, and the tech I work with.
        </p>
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-3 text-sm font-semibold text-[#0a0f1e] transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
        >
          <HiDownload size={18} />
          Download Resume
        </a>
      </div>
    </SectionWrapper>
  );
}
