"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import SectionWrapper from "./SectionWrapper";
import { skillGroups } from "@/data/skills";
import Reveal, { SectionIcon } from "./Reveal";

/* ── Geometry & Layout Configuration ─────────────────── */

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 720;
const CENTER_X = 500;
const CENTER_Y = 360;

interface SkillNode {
  id: string;
  name: string;
  category: string;
  percent: number;
  note?: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  filterId: string;
}

interface CategoryNode {
  id: string;
  name: string;
  shortName: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  filterId: string;
  skills: SkillNode[];
}

const CATEGORY_META: Record<
  string,
  {
    color: string;
    filterId: string;
    shortName: string;
    catX: number;
    catY: number;
    coords: { x: number; y: number }[];
  }
> = {
  Languages: {
    color: "#06b6d4", // Cyan
    filterId: "glow-cyan",
    shortName: "LANG",
    catX: 270,
    catY: 240,
    coords: [
      { x: 120, y: 160 }, // JavaScript
      { x: 100, y: 260 }, // PHP
      { x: 130, y: 360 }, // HTML
      { x: 210, y: 410 }, // CSS
      { x: 190, y: 100 }, // Python
      { x: 300, y: 80 },  // Java
      { x: 390, y: 90 },  // C#
      { x: 380, y: 170 }, // C++
    ],
  },
  "Frameworks & Tools": {
    color: "#a855f7", // Violet
    filterId: "glow-purple",
    shortName: "TOOLS",
    catX: 730,
    catY: 360,
    coords: [
      { x: 640, y: 150 }, // React
      { x: 730, y: 130 }, // Next.js
      { x: 820, y: 140 }, // Tailwind CSS
      { x: 890, y: 200 }, // Node.js
      { x: 930, y: 280 }, // MySQL
      { x: 940, y: 370 }, // REST APIs
      { x: 930, y: 460 }, // Git & GitHub
      { x: 880, y: 540 }, // VS Code
      { x: 800, y: 590 }, // Figma
      { x: 710, y: 600 }, // Vercel
      { x: 620, y: 550 }, // Docker
      { x: 820, y: 270 }, // Proxmox VE
      { x: 840, y: 370 }, // Traefik
      { x: 810, y: 470 }, // Cloudflare
    ],
  },
  Domains: {
    color: "#10b981", // Emerald
    filterId: "glow-emerald",
    shortName: "DOMAINS",
    catX: 270,
    catY: 520,
    coords: [
      { x: 110, y: 490 }, // Networking
      { x: 120, y: 590 }, // Cybersecurity
      { x: 210, y: 640 }, // Network Security
      { x: 320, y: 640 }, // Cloud Computing
      { x: 400, y: 580 }, // Linux Administration
      { x: 410, y: 490 }, // Virtualization & Containers
    ],
  },
};

export default function Skills() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT });

  const containerRef = useRef<HTMLDivElement>(null);

  // Keep track of container dimensions for responsive tooltip positioning
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      setContainerDimensions({
        width: el.clientWidth || CANVAS_WIDTH,
        height: el.clientHeight || CANVAS_HEIGHT,
      });
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ── Build node graph dynamically from skillGroups ── */
  const { categories, allSkills, centerNode } = useMemo(() => {
    const center = {
      id: "center",
      name: "Jess Patrick",
      title: "Software Developer | Networking & Security",
      x: CENTER_X,
      y: CENTER_Y,
      radius: 42,
    };

    const cats: CategoryNode[] = [];
    const skillsList: SkillNode[] = [];

    skillGroups.forEach((group) => {
      const meta = CATEGORY_META[group.category] || {
        color: "#06b6d4",
        filterId: "glow-cyan",
        shortName: group.category.substring(0, 4).toUpperCase(),
        catX: 250,
        catY: 250,
        coords: [],
      };

      const groupSkills: SkillNode[] = group.skills.map((skill, idx) => {
        const coord = meta.coords[idx] || {
          x: meta.catX + Math.cos((idx / group.skills.length) * Math.PI * 2) * 160,
          y: meta.catY + Math.sin((idx / group.skills.length) * Math.PI * 2) * 160,
        };

        // Node radius scales with proficiency percentage (from ~14px to ~28px)
        const radius = 14 + (skill.percent / 100) * 14;

        const node: SkillNode = {
          id: `skill::${group.category}::${skill.name}`,
          name: skill.name,
          category: group.category,
          percent: skill.percent,
          note: skill.tooltip,
          x: coord.x,
          y: coord.y,
          radius,
          color: meta.color,
          filterId: meta.filterId,
        };

        skillsList.push(node);
        return node;
      });

      cats.push({
        id: `cat::${group.category}`,
        name: group.category,
        shortName: meta.shortName,
        x: meta.catX,
        y: meta.catY,
        radius: 34,
        color: meta.color,
        filterId: meta.filterId,
        skills: groupSkills,
      });
    });

    return { categories: cats, allSkills: skillsList, centerNode: center };
  }, []);

  /* ── Effective focus target (hovered or active category filter) ── */
  const effectiveFocus = hoveredId || (activeCategoryFilter ? `cat::${activeCategoryFilter}` : null);

  /* ── Opacity & highlight calculation logic ── */
  const getNodeOpacity = useCallback(
    (nodeId: string) => {
      if (!effectiveFocus) return 1;

      // Direct match
      if (nodeId === effectiveFocus) return 1;

      // When center is focused
      if (effectiveFocus === "center") {
        if (nodeId.startsWith("cat::")) return 0.85;
        return 0.2;
      }

      // When a category node is focused
      if (effectiveFocus.startsWith("cat::")) {
        const catName = effectiveFocus.replace("cat::", "");
        if (nodeId === "center") return 0.8;
        if (nodeId === effectiveFocus) return 1;
        if (nodeId.startsWith(`skill::${catName}::`)) return 1;
        return 0.12; // Dim all other categories & skills
      }

      // When an individual skill node is focused
      if (effectiveFocus.startsWith("skill::")) {
        const parts = effectiveFocus.split("::");
        const catName = parts[1];
        if (nodeId === effectiveFocus) return 1;
        if (nodeId === `cat::${catName}`) return 0.9;
        if (nodeId === "center") return 0.7;
        return 0.12; // Dim all other nodes
      }

      return 1;
    },
    [effectiveFocus]
  );

  const getLineProps = useCallback(
    (fromId: string, toId: string, defaultColor: string) => {
      if (!effectiveFocus) {
        return {
          stroke: defaultColor,
          strokeWidth: 1.2,
          opacity: 0.32,
          active: false,
        };
      }

      // Center focused
      if (effectiveFocus === "center") {
        if (fromId === "center" && toId.startsWith("cat::")) {
          return { stroke: defaultColor, strokeWidth: 2.5, opacity: 0.85, active: true };
        }
        return { stroke: defaultColor, strokeWidth: 1, opacity: 0.08, active: false };
      }

      // Category focused
      if (effectiveFocus.startsWith("cat::")) {
        const catName = effectiveFocus.replace("cat::", "");
        if (fromId === "center" && toId === effectiveFocus) {
          return { stroke: defaultColor, strokeWidth: 3, opacity: 1, active: true };
        }
        if (fromId === effectiveFocus && toId.startsWith(`skill::${catName}::`)) {
          return { stroke: defaultColor, strokeWidth: 2, opacity: 0.85, active: true };
        }
        return { stroke: defaultColor, strokeWidth: 1, opacity: 0.08, active: false };
      }

      // Skill focused
      if (effectiveFocus.startsWith("skill::")) {
        const parts = effectiveFocus.split("::");
        const catName = parts[1];
        const catId = `cat::${catName}`;

        if (fromId === "center" && toId === catId) {
          return { stroke: defaultColor, strokeWidth: 2.5, opacity: 0.85, active: true };
        }
        if (fromId === catId && toId === effectiveFocus) {
          return { stroke: defaultColor, strokeWidth: 3.5, opacity: 1, active: true };
        }
        return { stroke: defaultColor, strokeWidth: 1, opacity: 0.08, active: false };
      }

      return { stroke: defaultColor, strokeWidth: 1.2, opacity: 0.32, active: false };
    },
    [effectiveFocus]
  );

  /* ── Currently inspected skill / category for tooltip ── */
  const activeSkill = useMemo(() => {
    if (!effectiveFocus || !effectiveFocus.startsWith("skill::")) return null;
    return allSkills.find((s) => s.id === effectiveFocus) ?? null;
  }, [effectiveFocus, allSkills]);

  const activeCategoryNode = useMemo(() => {
    if (!effectiveFocus || !effectiveFocus.startsWith("cat::")) return null;
    return categories.find((c) => c.id === effectiveFocus) ?? null;
  }, [effectiveFocus, categories]);

  // Scaled tooltip position on container with edge detection & flipping
  const tooltipPos = useMemo(() => {
    if (!activeSkill) return null;
    const scaleX = containerDimensions.width / CANVAS_WIDTH;
    const scaleY = containerDimensions.height / CANVAS_HEIGHT;

    const rawX = activeSkill.x * scaleX;
    const rawY = activeSkill.y * scaleY;
    const rawRadius = activeSkill.radius * scaleX;

    // Detect proximity to container boundaries (normalized to viewBox)
    const isNearLeft = activeSkill.x / CANVAS_WIDTH < 0.28;
    const isNearRight = activeSkill.x / CANVAS_WIDTH > 0.72;
    const isNearTop = activeSkill.y / CANVAS_HEIGHT < 0.26;
    const isNearBottom = activeSkill.y / CANVAS_HEIGHT > 0.76;

    let posX = rawX;
    let posY = rawY;
    let transformX = "-50%";
    let transformY = "-100%";

    if (isNearLeft) {
      // Near left edge: flip tooltip to appear to the RIGHT of the node
      posX = rawX + rawRadius + 14;
      transformX = "0%";

      if (isNearTop) {
        posY = Math.max(12, rawY - 8);
        transformY = "0%";
      } else if (isNearBottom) {
        posY = Math.min(containerDimensions.height - 12, rawY + 8);
        transformY = "-100%";
      } else {
        posY = rawY;
        transformY = "-50%";
      }
    } else if (isNearRight) {
      // Near right edge: anchor tooltip to appear to the LEFT of the node
      posX = rawX - rawRadius - 14;
      transformX = "-100%";

      if (isNearTop) {
        posY = Math.max(12, rawY - 8);
        transformY = "0%";
      } else if (isNearBottom) {
        posY = Math.min(containerDimensions.height - 12, rawY + 8);
        transformY = "-100%";
      } else {
        posY = rawY;
        transformY = "-50%";
      }
    } else {
      // In the middle horizontally: centered over node
      posX = Math.min(Math.max(rawX, 130), containerDimensions.width - 130);
      transformX = "-50%";

      if (isNearTop) {
        // Near top edge: flip to appear BELOW the node
        posY = rawY + rawRadius + 14;
        transformY = "0%";
      } else {
        // Default: appear ABOVE the node
        posY = rawY - rawRadius - 14;
        transformY = "-100%";
      }
    }

    return {
      x: posX,
      y: posY,
      transform: `translate(${transformX}, ${transformY})`,
    };
  }, [activeSkill, containerDimensions]);

  return (
    <SectionWrapper id="skills">
      <SectionIcon />
      <Reveal type="up">
        <h2 className="mb-3 text-center font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-foreground">
          Skills Network
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted">
          Interactive node network showing proficiency, technologies, and infrastructure. Hover or tap nodes to trace pathways.
        </p>
      </Reveal>

      {/* ── Category Filter / Legend Pills ── */}
      <Reveal type="up" delay={0.05}>
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setActiveCategoryFilter(null);
              setHoveredId(null);
            }}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all cursor-pointer ${
              !activeCategoryFilter && !hoveredId
                ? "border-accent bg-accent/15 text-accent shadow-[0_0_12px_var(--accent-glow)]"
                : "border-border bg-background-card/60 text-muted hover:border-accent/40 hover:text-foreground"
            }`}
          >
            All Skills ({allSkills.length})
          </button>

          {categories.map((cat) => {
            const isCatActive =
              activeCategoryFilter === cat.name ||
              (effectiveFocus && effectiveFocus.includes(cat.name));

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  const next = activeCategoryFilter === cat.name ? null : cat.name;
                  setActiveCategoryFilter(next);
                  setHoveredId(next ? `cat::${next}` : null);
                }}
                className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium transition-all cursor-pointer"
                style={{
                  borderColor: isCatActive ? cat.color : undefined,
                  backgroundColor: isCatActive ? `${cat.color}20` : undefined,
                  color: isCatActive ? cat.color : undefined,
                  boxShadow: isCatActive ? `0 0 14px ${cat.color}35` : undefined,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span>{cat.name}</span>
                <span className="opacity-60 font-mono text-[10px]">({cat.skills.length})</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* ── Graph Container ── */}
      <Reveal type="scale" delay={0.1}>
        <div
          ref={containerRef}
          className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-background-card/50 shadow-2xl backdrop-blur-md"
          onClick={() => {
            setHoveredId(null);
            setActiveCategoryFilter(null);
          }}
        >
          {/* Subtle Cyberpunk Grid Background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, var(--color-foreground) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* ── SVG Visualization ── */}
          <svg
            viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
            className="w-full h-auto block select-none"
            style={{ touchAction: "manipulation" }}
          >
            <defs>
              {/* Glow filters for node category colors */}
              <filter id="glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-purple" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-blue" x="-35%" y="-35%" width="170%" height="170%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Avatar circle clip */}
              <clipPath id="center-avatar-clip">
                <circle cx={CENTER_X} cy={CENTER_Y} r={34} />
              </clipPath>
            </defs>

            {/* ── Group 1: Background Connecting Lines ── */}
            <g className="transition-all duration-300">
              {/* Category-to-Skill Lines */}
              {categories.map((cat) =>
                cat.skills.map((skill) => {
                  const lineProps = getLineProps(cat.id, skill.id, cat.color);
                  return (
                    <line
                      key={`line::${cat.id}::${skill.id}`}
                      x1={cat.x}
                      y1={cat.y}
                      x2={skill.x}
                      y2={skill.y}
                      stroke={lineProps.stroke}
                      strokeWidth={lineProps.strokeWidth}
                      opacity={lineProps.opacity}
                      strokeLinecap="round"
                      style={{
                        transition: "opacity 0.25s ease, stroke-width 0.25s ease, stroke 0.25s ease",
                        filter: lineProps.active ? `drop-shadow(0 0 6px ${cat.color})` : undefined,
                      }}
                    />
                  );
                })
              )}

              {/* Center-to-Category Lines */}
              {categories.map((cat) => {
                const lineProps = getLineProps("center", cat.id, cat.color);
                return (
                  <line
                    key={`line::center::${cat.id}`}
                    x1={centerNode.x}
                    y1={centerNode.y}
                    x2={cat.x}
                    y2={cat.y}
                    stroke={lineProps.stroke}
                    strokeWidth={lineProps.strokeWidth}
                    opacity={lineProps.opacity}
                    strokeDasharray={lineProps.active ? "none" : "5 4"}
                    strokeLinecap="round"
                    style={{
                      transition: "opacity 0.25s ease, stroke-width 0.25s ease, stroke 0.25s ease",
                      filter: lineProps.active ? `drop-shadow(0 0 8px ${cat.color})` : undefined,
                    }}
                  />
                );
              })}
            </g>

            {/* ── Group 2: Skill Nodes (Leaf Circles) ── */}
            <g>
              {allSkills.map((skill) => {
                const isHovered = effectiveFocus === skill.id;
                const nodeOpacity = getNodeOpacity(skill.id);

                return (
                  <g
                    key={skill.id}
                    className="cursor-pointer"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setHoveredId(skill.id);
                    }}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHoveredId(isHovered ? null : skill.id);
                    }}
                    style={{
                      opacity: nodeOpacity,
                      transformOrigin: `${skill.x}px ${skill.y}px`,
                      transform: isHovered ? "scale(1.22)" : "scale(1)",
                      transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
                    }}
                  >
                    {/* Glowing Aura on Hover */}
                    {isHovered && (
                      <circle
                        cx={skill.x}
                        cy={skill.y}
                        r={skill.radius + 6}
                        fill="none"
                        stroke={skill.color}
                        strokeWidth={1.5}
                        strokeDasharray="3 3"
                        className="animate-spin-slow opacity-80"
                      />
                    )}

                    {/* Node Base Circle */}
                    <circle
                      cx={skill.x}
                      cy={skill.y}
                      r={skill.radius}
                      fill="#0e172a"
                      stroke={skill.color}
                      strokeWidth={isHovered ? 3 : 1.8}
                      style={{
                        filter: isHovered ? `drop-shadow(0 0 10px ${skill.color})` : undefined,
                        transition: "stroke-width 0.2s ease",
                      }}
                    />

                    {/* Percentage label inside node */}
                    <text
                      x={skill.x}
                      y={skill.y + (skill.radius >= 20 ? 4 : 3)}
                      textAnchor="middle"
                      className="font-mono font-bold select-none pointer-events-none"
                      fill={skill.color}
                      fontSize={skill.radius >= 22 ? 11 : skill.radius >= 17 ? 9 : 8}
                    >
                      {skill.percent}%
                    </text>

                    {/* Skill Name Label underneath */}
                    <text
                      x={skill.x}
                      y={skill.y + skill.radius + 12}
                      textAnchor="middle"
                      className="select-none pointer-events-none font-medium fill-foreground"
                      fontSize={isHovered ? 12 : 10.5}
                      style={{
                        fontWeight: isHovered ? 700 : 500,
                        fill: isHovered ? skill.color : "var(--color-foreground)",
                        transition: "fill 0.2s ease",
                      }}
                    >
                      {skill.name}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* ── Group 3: Category Nodes ── */}
            <g>
              {categories.map((cat) => {
                const isHovered = effectiveFocus === cat.id;
                const nodeOpacity = getNodeOpacity(cat.id);

                return (
                  <g
                    key={cat.id}
                    className="cursor-pointer"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setHoveredId(cat.id);
                    }}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHoveredId(isHovered ? null : cat.id);
                      setActiveCategoryFilter(cat.name);
                    }}
                    style={{
                      opacity: nodeOpacity,
                      transformOrigin: `${cat.x}px ${cat.y}px`,
                      transform: isHovered ? "scale(1.15)" : "scale(1)",
                      transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
                    }}
                  >
                    {/* Orbit Ring */}
                    <circle
                      cx={cat.x}
                      cy={cat.y}
                      r={cat.radius + 5}
                      fill="none"
                      stroke={cat.color}
                      strokeWidth={1.2}
                      strokeDasharray="4 3"
                      className="opacity-60 animate-spin-slow"
                    />

                    {/* Category Base Circle */}
                    <circle
                      cx={cat.x}
                      cy={cat.y}
                      r={cat.radius}
                      fill="#111a2e"
                      stroke={cat.color}
                      strokeWidth={isHovered ? 3.5 : 2}
                      style={{
                        filter: isHovered
                          ? `drop-shadow(0 0 14px ${cat.color})`
                          : `drop-shadow(0 0 6px ${cat.color}40)`,
                      }}
                    />

                    {/* Short Tag Inside */}
                    <text
                      x={cat.x}
                      y={cat.y - 4}
                      textAnchor="middle"
                      className="font-[family-name:var(--font-space-grotesk)] text-[11px] font-bold select-none pointer-events-none"
                      fill={cat.color}
                    >
                      {cat.shortName}
                    </text>
                    <text
                      x={cat.x}
                      y={cat.y + 10}
                      textAnchor="middle"
                      className="text-[9px] font-mono select-none pointer-events-none"
                      fill="#94a3b8"
                    >
                      {cat.skills.length} skills
                    </text>

                    {/* Full Category Name Label */}
                    <text
                      x={cat.x}
                      y={cat.y + cat.radius + 14}
                      textAnchor="middle"
                      className="font-[family-name:var(--font-space-grotesk)] text-xs font-bold select-none pointer-events-none fill-foreground"
                    >
                      {cat.name}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* ── Group 4: Center Profile Node ── */}
            <g
              className="cursor-pointer"
              onMouseEnter={(e) => {
                e.stopPropagation();
                setHoveredId("center");
              }}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => {
                e.stopPropagation();
                setHoveredId(effectiveFocus === "center" ? null : "center");
              }}
              style={{
                opacity: getNodeOpacity("center"),
                transformOrigin: `${centerNode.x}px ${centerNode.y}px`,
                transform: effectiveFocus === "center" ? "scale(1.12)" : "scale(1)",
                transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
              }}
            >
              {/* Outer Cyan Ring */}
              <circle
                cx={centerNode.x}
                cy={centerNode.y}
                r={centerNode.radius + 5}
                fill="none"
                stroke="#38bdf8"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                className="opacity-75 animate-spin-slow"
              />

              {/* Center Circle Frame */}
              <circle
                cx={centerNode.x}
                cy={centerNode.y}
                r={centerNode.radius}
                fill="#0a0f1e"
                stroke="#38bdf8"
                strokeWidth={3}
                style={{
                  filter: "drop-shadow(0 0 15px rgba(56, 189, 248, 0.5))",
                }}
              />

              {/* Jess's Profile Photo */}
              <image
                href="/jess.jpg"
                x={centerNode.x - 34}
                y={centerNode.y - 34}
                width={68}
                height={68}
                clipPath="url(#center-avatar-clip)"
                preserveAspectRatio="xMidYMid slice"
              />

              {/* Profile Name & Subtitle */}
              <text
                x={centerNode.x}
                y={centerNode.y + centerNode.radius + 15}
                textAnchor="middle"
                className="font-[family-name:var(--font-space-grotesk)] text-xs font-bold select-none pointer-events-none fill-foreground"
              >
                {centerNode.name}
              </text>
              <text
                x={centerNode.x}
                y={centerNode.y + centerNode.radius + 28}
                textAnchor="middle"
                className="text-[10px] font-mono select-none pointer-events-none fill-muted"
              >
                {centerNode.title}
              </text>
            </g>
          </svg>

          {/* ── Hover Tooltip (Dynamically positioned & flipped) ── */}
          {activeSkill && tooltipPos && (
            <div
              className="pointer-events-none absolute z-30 rounded-xl border bg-background-card/95 p-3.5 shadow-2xl backdrop-blur-md transition-all duration-150 min-w-[210px] max-w-[280px]"
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y}px`,
                transform: tooltipPos.transform,
                borderColor: `${activeSkill.color}70`,
                boxShadow: `0 0 25px ${activeSkill.color}35`,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${activeSkill.color}20`,
                    color: activeSkill.color,
                  }}
                >
                  {activeSkill.category}
                </span>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: activeSkill.color }}
                >
                  {activeSkill.percent}%
                </span>
              </div>

              <h4 className="mt-1.5 font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-foreground">
                {activeSkill.name}
              </h4>

              {/* Progress bar */}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${activeSkill.percent}%`,
                    backgroundColor: activeSkill.color,
                  }}
                />
              </div>

              {activeSkill.note && (
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {activeSkill.note}
                </p>
              )}
            </div>
          )}

          {/* ── Category Cluster Hover Info ── */}
          {activeCategoryNode && !activeSkill && (
            <div
              className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-xl border bg-background-card/90 px-4 py-2.5 shadow-lg backdrop-blur-md"
              style={{ borderColor: `${activeCategoryNode.color}60` }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: activeCategoryNode.color }}
                />
                <span className="font-[family-name:var(--font-space-grotesk)] text-xs font-bold text-foreground">
                  {activeCategoryNode.name} Cluster
                </span>
                <span className="text-xs text-muted font-mono">
                  ({activeCategoryNode.skills.length} technologies)
                </span>
              </div>
            </div>
          )}
        </div>
      </Reveal>

      {/* ── Mobile Tapped Info Card (Ensures no cut-offs on phone viewports) ── */}
      {activeSkill && (
        <div className="mt-4 md:hidden">
          <div
            className="rounded-2xl border bg-background-card p-4 shadow-xl"
            style={{ borderColor: activeSkill.color }}
          >
            <div className="flex items-center justify-between">
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${activeSkill.color}20`,
                  color: activeSkill.color,
                }}
              >
                {activeSkill.category}
              </span>
              <span
                className="font-mono text-sm font-bold"
                style={{ color: activeSkill.color }}
              >
                {activeSkill.percent}%
              </span>
            </div>

            <h4 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-base font-bold text-foreground">
              {activeSkill.name}
            </h4>

            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${activeSkill.percent}%`,
                  backgroundColor: activeSkill.color,
                }}
              />
            </div>

            {activeSkill.note && (
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {activeSkill.note}
              </p>
            )}

            <button
              type="button"
              onClick={() => setHoveredId(null)}
              className="mt-3 w-full rounded-lg border border-border py-1.5 text-xs text-muted hover:text-foreground"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* ── Bottom Help Hint ── */}
      <p className="mt-4 text-center text-xs text-muted/60">
        Tip: Hover or tap any skill node to view details and highlight its network path. Node circle sizes correspond to proficiency.
      </p>
    </SectionWrapper>
  );
}
