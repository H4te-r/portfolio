"use client";

import SectionWrapper from "./SectionWrapper";
import { HiDownload } from "react-icons/hi";

export default function Resume() {
  return (
    <SectionWrapper id="resume">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">Resume</h2>
        <p className="mb-8 text-gray-400">
          Interested in working together? Download my resume for the full
          picture.
        </p>
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
        >
          <HiDownload size={18} />
          Download Resume
        </a>
      </div>
    </SectionWrapper>
  );
}
