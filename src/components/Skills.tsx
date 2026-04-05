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
      <h2 className="mb-12 text-center text-3xl font-bold text-white">
        Skills
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((group, groupIdx) => (
          <div key={group.category}>
            <h3 className="mb-4 text-sm font-semibold tracking-widest text-indigo-400 uppercase">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
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
                  className="rounded-full border border-white/10 bg-gray-800 px-4 py-1.5 text-sm text-gray-300"
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
