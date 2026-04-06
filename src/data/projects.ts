export interface Project {
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "Barangay Central",
    description:
      "A full e-government web system built as a thesis project. Streamlines barangay operations including resident management, document requests, and community services — serving real users in local government.",
    techStack: ["PHP", "JavaScript", "Tailwind CSS", "MySQL"],
    github: "https://github.com/H4te-r/barangay-central",
    liveDemo: "https://barangaycentral.com/public/",
  },
  // Add more projects here:
  // {
  //   title: "Project Name",
  //   description: "What the project does.",
  //   techStack: ["React", "Node.js"],
  //   github: "https://github.com/...",
  //   liveDemo: "https://...",
  // },
];
