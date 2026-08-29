"use client";

import SectionWrapper from "./SectionWrapper";
import { skillGroups } from "@/data/skills";
import { motion } from "framer-motion";
import Reveal, { SectionIcon } from "./Reveal";
import { GlowCard } from "./MotionEffects";

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionIcon />
      <Reveal type="up">
        <h2 className="mb-6 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-foreground">
          Skills
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-muted">
          Tools and technologies I use to build and secure real-world systems.
        </p>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-3">
        {skillGroups.map((group, groupIdx) => (
          <Reveal key={group.category} type="scale" delay={groupIdx * 0.08}>
            <GlowCard className="h-full">
            <div className="theme-surface glow-border h-full rounded-2xl border border-border p-6">
              <h3 className="mb-6 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                {group.category}
              </h3>
              <div className="space-y-4">
                {group.skills.map((skill, skillIdx) => (
                  <div key={skill.name} className="group relative">
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-muted">{skill.percent}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-border">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percent}%` }}
                        transition={{
                          duration: 0.8,
                          delay: groupIdx * 0.08 + skillIdx * 0.04,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                    {skill.tooltip && (
                      <div className="pointer-events-none absolute -top-9 left-0 z-10 hidden rounded-md border border-border bg-background-card px-2.5 py-1 text-xs text-muted shadow-lg group-hover:block">
                        {skill.tooltip}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
