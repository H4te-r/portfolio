export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
  sourceNote?: string;
  screenshots?: ProjectScreenshot[];
}

export const projects: Project[] = [
  {
    title: "Barangay Central",
    description:
      "A full e-government web system built as a thesis project. Streamlines barangay operations including resident management, document requests, and community services — serving real users in local government. Built with attention to security practices such as input validation and secure authentication.",
    techStack: ["PHP", "JavaScript", "Tailwind CSS", "MySQL"],
    liveDemo: "https://barangaycentral.com/public/",
    sourceNote: "Source available upon request",
    screenshots: [
      {
        src: "/projects/barangay-central/home.png",
        alt: "Barangay Central homepage with hero, services, and resident portal",
      },
      {
        src: "/projects/barangay-central/login.png",
        alt: "Barangay Central login page",
      },
    ],
  },
  {
    title: "KARMÉ — Luxury That Lingers",
    description:
      "A full e-commerce website built for a real fragrance startup (my sister's business), currently in its early launch phase — including a product catalog, shopping cart, and brand storytelling pages.",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    liveDemo: "https://karmefragrance.vercel.app/",
    screenshots: [
      {
        src: "/projects/karme/home.png",
        alt: "KARMÉ homepage hero, Luxury That Lingers",
      },
      {
        src: "/projects/karme/shop.png",
        alt: "KARMÉ shop page with Our Fragrances collection grid",
      },
    ],
  },
];
