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
          Want the full picture? Grab my resume or CV — they cover my
          education, projects, and the tech I work with.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/Jess_Paguel_Resume.docx"
            download
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-3 text-sm font-semibold text-[#0a0f1e] transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            <HiDownload size={18} />
            Download Resume
          </a>
          <a
            href="/Jess_Paguel_CV.docx"
            download
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-8 py-3 text-sm font-medium text-slate-300 transition-all hover:border-cyan-500/50 hover:text-white"
          >
            <HiDownload size={18} />
            Download CV
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
