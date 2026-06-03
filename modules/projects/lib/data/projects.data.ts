import type { FeaturedProject, Project, MiniProject } from "../types/project.types"

export const featuredProject: FeaturedProject = {
  title: "FinFlow",
  tagline: "Personal finance, reimagined",
  description:
    "A full-stack budgeting platform serving 40k+ users. I led the frontend architecture and design system, cut initial load time by 60%, and shipped real-time syncing across devices with optimistic UI.",
  image: "/project-finflow.png",
  tags: ["Next.js", "TypeScript", "PostgreSQL", "tRPC", "Tailwind"],
  demo: "https://example.com",
  source: "https://github.com",
}

export const projects: Project[] = [
  {
    title: "Pulse",
    description:
      "Real-time analytics for developer teams. Streaming metrics, anomaly alerts, and a query builder built for speed.",
    image: "/project-pulse.png",
    tags: ["React", "Go", "Redis", "WebSockets"],
    demo: "https://example.com",
    source: "https://github.com",
  },
  {
    title: "Atlas UI",
    description:
      "An open-source, accessible component library and design system adopted across multiple product teams.",
    image: "/project-atlas.png",
    tags: ["React", "TypeScript", "Storybook", "a11y"],
    demo: "https://example.com",
    source: "https://github.com",
  },
]

export const moreProjects: MiniProject[] = [
  {
    title: "Cartographer",
    description: "Interactive data-viz toolkit for geospatial dashboards.",
    tags: ["D3", "Mapbox", "Next.js"],
    source: "https://github.com",
  },
  {
    title: "Inbox Zero",
    description: "AI email triage assistant with smart summarization.",
    tags: ["AI SDK", "Edge", "React"],
    source: "https://github.com",
  },
  {
    title: "Ledger CLI",
    description: "A fast, scriptable command-line tool for plain-text accounting.",
    tags: ["Go", "CLI", "SQLite"],
    source: "https://github.com",
  },
]
