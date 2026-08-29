"use client";

import { useState } from "react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { GlowCard } from "./MotionEffects";
import Reveal, { SectionIcon } from "./Reveal";

const certifications = [
  {
    name: "Networking",
    issuer: "Certiport",
    description:
      "Covers core networking concepts, infrastructure, and protocols",
    image: "/certs/networking.jpeg",
    issueNote: "Issued by Certiport",
  },
  {
    name: "Cybersecurity",
    issuer: "Certiport",
    description:
      "Covers foundational security principles, threat identification, and protection practices",
    image: "/certs/cybersecurity.jpeg",
    issueNote: "Issued by Certiport",
  },
];

export default function Certifications() {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <SectionWrapper id="certifications">
      <SectionIcon />
      <Reveal type="up">
        <h2 className="mb-14 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-foreground">
          Certifications
        </h2>
      </Reveal>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {certifications.map((cert, idx) => {
          const isFlipped = flipped === cert.name;
          return (
            <Reveal key={cert.name} type="scale" delay={idx * 0.1}>
              <GlowCard className="h-full w-full">
                <button
                  type="button"
                  data-cursor="View"
                  onClick={() =>
                    setFlipped(isFlipped ? null : cert.name)
                  }
                  className={`cert-flip h-72 w-full text-left ${isFlipped ? "flipped" : ""}`}
                  aria-label={`${cert.name} certificate details`}
                >
                  <div className="cert-flip-inner h-full">
                    <div className="cert-face theme-surface glow-border flex h-full flex-col items-center justify-center rounded-2xl border border-border p-6">
                      <div className="relative mb-4 h-28 w-full overflow-hidden rounded-xl border border-border bg-background-card">
                        <Image
                          src={cert.image}
                          alt={`${cert.name} certificate from ${cert.issuer}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-contain p-2"
                        />
                      </div>
                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-foreground">
                        {cert.name}
                      </h3>
                      <span className="glow-badge mt-3 rounded-full border border-border px-4 py-1.5 text-xs text-muted">
                        {cert.issuer}
                      </span>
                    </div>
                    <div className="cert-face cert-back theme-surface glow-border flex h-full flex-col justify-center rounded-2xl border border-border p-6">
                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-foreground">
                        {cert.name}
                      </h3>
                      <p className="mt-2 text-sm text-accent">{cert.issueNote}</p>
                      <p className="mt-4 text-sm leading-relaxed text-muted">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </button>
              </GlowCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal type="up" delay={0.15}>
        <div className="theme-surface mx-auto mt-8 max-w-4xl rounded-2xl border border-dashed border-accent/30 bg-background-card p-6 text-center">
          <p className="text-sm text-muted">
            Currently pursuing:{" "}
            <span className="font-medium text-accent">Network Security</span>
            <span className="text-muted"> · Certiport</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            Exam around October (midterms). Next up: Cloud Computing.
          </p>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}
