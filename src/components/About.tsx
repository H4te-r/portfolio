"use client";

import SectionWrapper from "./SectionWrapper";
import { HiUser } from "react-icons/hi";

export default function About() {
  return (
    <SectionWrapper id="about" className="section-alt">
      <h2 className="mb-14 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
        About Me
      </h2>

      <div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
        {/* Photo placeholder */}
        <div className="flex h-52 w-52 shrink-0 items-center justify-center rounded-2xl border border-white/5 bg-[#111a2e] text-slate-600">
          <HiUser size={64} />
        </div>

        <div className="max-w-xl text-slate-400 leading-relaxed">
          <p className="text-lg">
            I&apos;m Jess — an Information Technology student from the
            Philippines who&apos;d rather build things than just study them.
          </p>
          <p className="mt-4">
            My thesis project,{" "}
            <span className="font-medium text-white">Barangay Central</span>,
            is a full e-government web system that handles resident management,
            document requests, and community services for an actual local
            government unit. Building it taught me everything from database
            architecture to deploying software that real people depend on.
          </p>
          <p className="mt-4">
            I work primarily with{" "}
            <span className="font-medium text-cyan-400">
              Tailwind CSS, JavaScript, PHP, and MySQL
            </span>
            , and I&apos;m always picking up new tools. Right now I&apos;m
            looking for internship opportunities where I can ship code, solve
            problems, and keep growing as a developer.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
