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
      "A full e-government web system built as a thesis project. Streamlines barangay operations including resident management, document requests, and community services — serving real users in local government. Built with attention to security practices such as input validation and secure authentication.",
    techStack: ["PHP", "JavaScript", "Tailwind CSS", "MySQL"],
    github: "https://github.com/H4te-r/barangay-central",
    liveDemo: "https://barangaycentral.com/public/",
  },
  {
    title: "KARMÉ — Luxury That Lingers",
    description:
      "A full e-commerce website built for a real fragrance business, featuring a product catalog, individual product pages, shopping cart functionality, and brand storytelling — built and shipped for an actual client with live sales.",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    liveDemo: "https://karmefragrance.vercel.app/",
  },
];
