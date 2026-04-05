"use client";

import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";

const skillCategories = [
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "React", "Next.js"],
  },
  {
    category: "Backend",
    skills: ["PHP", "MySQL", "REST APIs"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Vercel"],
  },
];

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <h2 className="mb-14 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
        Skills
      </h2>

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((group, groupIdx) => (
          <div key={group.category}>
            <h3 className="mb-5 text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill, skillIdx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: groupIdx * 0.1 + skillIdx * 0.05,
                  }}
                  viewport={{ once: true }}
                  className="glow-badge cursor-default rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
