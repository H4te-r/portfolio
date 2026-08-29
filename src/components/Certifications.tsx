"use client";

import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";

const certifications = [
  {
    name: "Networking",
    issuer: "Certiport",
    description:
      "Covers core networking concepts, infrastructure, and protocols",
    image: "/certs/networking.jpeg",
  },
  {
    name: "Cybersecurity",
    issuer: "Certiport",
    description:
      "Covers foundational security principles, threat identification, and protection practices",
    image: "/certs/cybersecurity.jpeg",
  },
];

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <h2 className="mb-14 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
        Certifications
      </h2>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {certifications.map((cert, idx) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glow-border flex flex-col rounded-2xl border border-slate-800 bg-[#0a0f1e] p-6"
          >
            <a
              href={cert.image}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mb-4 block aspect-[4/3] overflow-hidden rounded-xl border border-slate-800 bg-[#111a2e]"
            >
              <Image
                src={cert.image}
                alt={`${cert.name} certificate from ${cert.issuer}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain p-2"
              />
            </a>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white">
              {cert.name}
            </h3>
            <span className="glow-badge mt-3 w-fit cursor-default rounded-full border border-slate-700 px-4 py-1.5 text-xs text-slate-300">
              {cert.issuer}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {cert.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true }}
        className="mx-auto mt-8 max-w-4xl rounded-2xl border border-dashed border-cyan-500/30 bg-[#0a0f1e] p-6 text-center"
      >
        <p className="text-sm text-slate-400">
          Currently pursuing:{" "}
          <span className="font-medium text-cyan-400">Network Security</span>
          <span className="text-slate-500"> · Certiport</span>
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Exam around October (midterms). Next up: Cloud Computing.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
