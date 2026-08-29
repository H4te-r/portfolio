export type SkillItem = {
  name: string;
  percent: number;
  tooltip?: string;
};

export type SkillGroup = {
  category: string;
  skills: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", percent: 88, tooltip: "Barangay Central and KARMÉ" },
      { name: "PHP", percent: 86, tooltip: "Barangay Central (thesis) and KARMÉ" },
      { name: "HTML", percent: 90, tooltip: "Barangay Central and KARMÉ" },
      { name: "CSS", percent: 88, tooltip: "Barangay Central and KARMÉ" },
      { name: "Python", percent: 48, tooltip: "Learning / Certified via Certiport" },
      { name: "Java", percent: 45, tooltip: "Learning / Certified via Certiport" },
      { name: "C#", percent: 42, tooltip: "Learning / Certified via Certiport" },
      { name: "C++", percent: 42, tooltip: "Learning / Certified via Certiport" },
    ],
  },
  {
    category: "Frameworks & Tools",
    skills: [
      { name: "React", percent: 82, tooltip: "KARMÉ" },
      { name: "Next.js", percent: 80, tooltip: "KARMÉ" },
      { name: "Tailwind CSS", percent: 88, tooltip: "Barangay Central and KARMÉ" },
      { name: "Node.js", percent: 50, tooltip: "Learning / Certified via Certiport" },
      { name: "MySQL", percent: 84, tooltip: "Barangay Central (thesis) and KARMÉ" },
      { name: "REST APIs", percent: 78, tooltip: "Barangay Central" },
      { name: "Git", percent: 85 },
      { name: "GitHub", percent: 85 },
      { name: "VS Code", percent: 90 },
      { name: "Figma", percent: 70 },
      { name: "Vercel", percent: 80, tooltip: "KARMÉ (web/hosting)" },
    ],
  },
  {
    category: "Domains",
    skills: [
      {
        name: "Networking",
        percent: 78,
        tooltip: "Learning / Certified via Certiport",
      },
      {
        name: "Cybersecurity",
        percent: 76,
        tooltip: "Learning / Certified via Certiport",
      },
      {
        name: "Network Security",
        percent: 52,
        tooltip: "Learning / Certified via Certiport",
      },
      {
        name: "Cloud Computing",
        percent: 40,
        tooltip: "Learning / Certified via Certiport",
      },
    ],
  },
];
