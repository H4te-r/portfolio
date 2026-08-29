"use client";

import SectionWrapper from "./SectionWrapper";
import Image from "next/image";
import Reveal, { SectionIcon } from "./Reveal";

export default function About() {
  return (
    <SectionWrapper id="about" className="section-alt">
      <SectionIcon />
      <Reveal type="up">
        <h2 className="mb-14 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-foreground">
          About Me
        </h2>
      </Reveal>

      <div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
        <Reveal type="scale">
          <div className="relative h-52 w-52 shrink-0 overflow-hidden rounded-2xl border border-border bg-background-card">
            <Image
              src="/jess.jpg"
              alt="Jess Patrick R. Paguel"
              fill
              sizes="208px"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        <Reveal type="up" delay={0.1} className="max-w-xl text-muted leading-relaxed">
          <p className="text-lg text-foreground/90">
            I&apos;m Jess — an Information Technology student from the
            Philippines who&apos;d rather build things than just study them.
          </p>
          <p className="mt-4">
            My thesis project,{" "}
            <span className="font-medium text-foreground">Barangay Central</span>,
            is a full e-government web system that handles resident management,
            document requests, and community services for an actual local
            government unit. Building it taught me everything from database
            architecture to deploying software that real people depend on.
          </p>
          <p className="mt-4">
            I work primarily with{" "}
            <span className="font-medium text-accent">
              Tailwind CSS, JavaScript, PHP, and MySQL
            </span>
            , and I&apos;m always picking up new tools. I also hold
            certifications in Networking and Cybersecurity, and I&apos;m
            currently working toward Network Security (exam around October)
            before moving on to Cloud Computing. I&apos;m interested in
            building systems with security best practices in mind. Right now
            I&apos;m looking for internship opportunities where I can ship
            code, solve problems, and keep growing as a developer.
          </p>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
