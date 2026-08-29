"use client";

import { useCallback, useEffect, useState } from "react";
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
  const [viewing, setViewing] = useState<string | null>(null);
  const activeCert = certifications.find((c) => c.name === viewing) ?? null;

  const close = useCallback(() => setViewing(null), []);

  useEffect(() => {
    if (!viewing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [viewing, close]);

  return (
    <SectionWrapper id="certifications">
      <SectionIcon />
      <Reveal type="up">
        <h2 className="mb-14 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-foreground">
          Certifications
        </h2>
      </Reveal>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {certifications.map((cert, idx) => (
          <Reveal key={cert.name} type="scale" delay={idx * 0.1}>
            <GlowCard className="h-full w-full">
              <button
                type="button"
                onClick={() => setViewing(cert.name)}
                className="group flex h-72 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-border p-6 text-left theme-surface glow-border transition-transform duration-200 hover:scale-[1.02]"
                aria-label={`View ${cert.name} certificate`}
              >
                <div className="relative mb-4 h-28 w-full overflow-hidden rounded-xl border border-border bg-background-card">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} certificate from ${cert.issuer}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-foreground">
                  {cert.name}
                </h3>
                <span className="glow-badge mt-3 rounded-full border border-border px-4 py-1.5 text-xs text-muted">
                  {cert.issuer}
                </span>
                <span className="mt-3 text-xs text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Click to view certificate
                </span>
              </button>
            </GlowCard>
          </Reveal>
        ))}
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

      {/* ── Lightbox modal ── */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCert.name} certificate`}
        >
          <div
            className="relative mx-4 w-full max-w-3xl animate-[modalIn_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Certificate image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-background-card shadow-2xl">
              <Image
                src={activeCert.image}
                alt={`${activeCert.name} certificate from ${activeCert.issuer}`}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain p-4"
                priority
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white">
                {activeCert.name}
              </h3>
              <p className="mt-1 text-sm text-white/60">
                {activeCert.issueNote} — {activeCert.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
