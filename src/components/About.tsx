"use client";

import SectionWrapper from "./SectionWrapper";
import { HiUser } from "react-icons/hi";

export default function About() {
  return (
    <SectionWrapper id="about">
      <h2 className="mb-12 text-center text-3xl font-bold text-white">
        About Me
      </h2>

      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
        {/* Photo placeholder — replace the div with an <Image /> when you have a photo */}
        <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-2xl bg-gray-800 text-gray-500">
          <HiUser size={64} />
        </div>

        <div className="max-w-xl text-gray-400 leading-relaxed">
          <p>
            I&apos;m an Information Technology student passionate about turning
            ideas into software that real people use. My thesis project,{" "}
            <span className="text-white font-medium">Barangay Central</span>, is
            a full e-government web system that streamlines local government
            operations — and it taught me everything from database design to
            deployment.
          </p>
          <p className="mt-4">
            I work with{" "}
            <span className="text-white font-medium">
              Tailwind CSS, JavaScript, and PHP
            </span>
            , and I&apos;m always exploring new tools and frameworks. I&apos;m
            currently looking for internship opportunities where I can
            contribute, learn, and grow as a developer.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
