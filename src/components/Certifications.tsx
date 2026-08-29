"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";

const certifications = [
  {
    name: "Networking",
    issuer: "Certiport",
    description:
      "Covers core networking concepts, infrastructure, and protocols",
  },
  {
    name: "Cybersecurity",
    issuer: "Certiport",
    description:
      "Covers foundational security principles, threat identification, and protection practices",
  },
  {
    name: "Network Security",
    issuer: "Certiport",
    description:
      "Covers securing network infrastructure against vulnerabilities and attacks",
  },
];

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <h2 className="mb-14 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
        Certifications
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, idx) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glow-border flex flex-col rounded-2xl border border-slate-800 bg-[#0a0f1e] p-6"
          >
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

      <p className="mt-10 text-center text-sm text-slate-400">
        Currently pursuing:{" "}
        <span className="glow-badge inline-block cursor-default rounded-full border border-cyan-500/20 px-4 py-1.5 font-medium text-cyan-400">
          Cloud Computing
        </span>
      </p>
    </SectionWrapper>
  );
}
