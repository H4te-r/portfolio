"use client";

import SectionWrapper from "./SectionWrapper";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <h2 className="mb-12 text-center text-3xl font-bold text-white">
        Projects
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group flex flex-col rounded-2xl border border-white/10 bg-gray-900 p-6 transition-colors hover:border-indigo-500/40"
          >
            {/* Title */}
            <h3 className="text-lg font-semibold text-white">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-400">
              {project.description}
            </p>

            {/* Tech stack tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-5 flex gap-4 border-t border-white/5 pt-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <FaGithub size={16} />
                  Code
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <HiExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
