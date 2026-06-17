import type { ExperienceRole } from "../types/experience.types"

export const experienceRoles: ExperienceRole[] = [
  {
    period: "2022 — Present",
    role: "Senior Software Engineer",
    company: "ETI",
    logo: "/images/experiences/eti-logo.jpg",
    summary:
      "Leading developer of all types of systems.",
    achievements: [
      "Development and implementation of GestionVC, a solution to videoconferencing problems.",
      "Commercial development system.",
      "Infrastructure deployment.",
    ],
    tags: ["Next.js", "TypeScript", "GraphQL"],
  },
  {
    period: "2019 — 2022",
    role: "Software Engineer",
    company: "Lumen Studio",
    logo: "/placeholder-logo.png",
    summary:
      "Built client products end to end — from marketing sites to complex dashboards — across a fast-moving product agency.",
    achievements: [
      "Shipped 20+ production apps for startups and enterprise clients.",
      "Established the company's reusable component toolkit and CI pipeline.",
      "Collaborated directly with designers to deliver pixel-perfect, accessible UIs.",
    ],
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    period: "2017 — 2019",
    role: "Frontend Developer",
    company: "Cobalt Interactive",
    logo: "/placeholder-logo.png",
    summary:
      "Joined as the second engineer and helped grow the product from prototype to its first thousand users.",
    achievements: [
      "Implemented the initial component library and styling conventions.",
      "Owned the public-facing web app and improved Lighthouse scores across the board.",
    ],
    tags: ["JavaScript", "Vue", "SCSS"],
  },
]
