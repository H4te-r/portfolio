export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface ProjectCaseStudy {
  problem: string;
  built: string;
  outcome: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
  sourceNote?: string;
  screenshots?: ProjectScreenshot[];
  caseStudy: ProjectCaseStudy;
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
    caseStudy: {
      problem:
        "Local barangay operations needed a clearer way to handle resident management, document requests, and community services without relying on fragmented paper workflows.",
      built:
        "A full e-government web system (thesis project) covering resident records, document requests, and community services, with attention to input validation and secure authentication.",
      outcome:
        "Deployed for real users in a local government unit — software people depend on day to day.",
    },
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
    caseStudy: {
      problem:
        "A fragrance startup needed an online storefront that could present the brand, catalog products, and support shopping cart flows before public launch.",
      built:
        "A full e-commerce website with a product catalog, shopping cart, and brand storytelling pages — built for my sister's business.",
      outcome:
        "Site is live in an early launch phase and ready for the business to grow into.",
    },
  },
];
