import type { EndToEndProject, ContributionProject, ResearchProject } from "../types/project.types"

export const endToEndProjects: EndToEndProject[] = [
  {
    title: "FinFlow",
    tagline: "Personal finance, reimagined",
    description:
      "A full-stack budgeting platform serving 40k+ users. I led the frontend architecture and design system, cut initial load time by 60%, and shipped real-time syncing across devices with optimistic UI.",
    image: "/project-finflow.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "tRPC", "Tailwind"],
    categories: ["fullstack", "frontend"],
    demo: "https://example.com",
    source: "https://github.com",
    featured: true,
  },
  {
    title: "Pulse",
    tagline: "Metrics at the speed of thought",
    description:
      "Real-time analytics for developer teams. Streaming metrics, anomaly alerts, and a query builder built for speed.",
    image: "/project-pulse.png",
    tags: ["React", "Go", "Redis", "WebSockets"],
    categories: ["fullstack", "devtools"],
    demo: "https://example.com",
    source: "https://github.com",
  },
  {
    title: "Atlas UI",
    tagline: "Design systems done right",
    description:
      "An open-source, accessible component library and design system adopted across multiple product teams.",
    image: "/project-atlas.png",
    tags: ["React", "TypeScript", "Storybook", "a11y"],
    categories: ["frontend", "ux"],
    demo: "https://example.com",
    source: "https://github.com",
  },
]

export const contributionProjects: ContributionProject[] = [
  {
    title: "Vercel AI SDK",
    description:
      "Contributed streaming improvements and new provider adapters to the official Vercel AI SDK, improving edge-runtime compatibility.",
    image: "/project-vercel-ai.png",
    role: "Open-source contributor",
    tags: ["TypeScript", "Edge Runtime", "Streaming"],
    categories: ["ai", "devtools"],
    source: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Radix UI Primitives",
    description:
      "Fixed accessibility regressions in Dialog and Tooltip components, added keyboard-navigation spec tests, and improved WAI-ARIA compliance.",
    role: "Bug fixes & a11y",
    tags: ["React", "TypeScript", "a11y", "Jest"],
    categories: ["frontend", "ux"],
    source: "https://github.com",
  },
  {
    title: "Internal Design System @ Corp",
    description:
      "Joined an existing design-system team to ship a dark-mode token layer and migrate 30+ components from class-based to functional patterns.",
    image: "/project-ds.png",
    role: "Frontend Engineer (contract)",
    tags: ["React", "CSS Variables", "Storybook"],
    categories: ["frontend", "ux"],
    source: "https://github.com",
  },
]

export const researchProjects: ResearchProject[] = [
  {
    title: "Cartographer",
    description: "Interactive data-viz toolkit for geospatial dashboards — exploring D3 + WebGL rendering boundaries.",
    researchType: "POC",
    tags: ["D3", "Mapbox", "Next.js"],
    categories: ["frontend"],
    link: "https://github.com",
  },
  {
    title: "Inbox Zero",
    description: "Prototype AI email triage assistant with smart summarization using function-calling pipelines.",
    researchType: "POC",
    tags: ["AI SDK", "Edge", "React"],
    categories: ["ai", "frontend"],
    link: "https://github.com",
  },
  {
    title: "Ledger CLI",
    description: "A fast, scriptable command-line tool for plain-text accounting. Study in Go CLI design patterns.",
    researchType: "Study",
    tags: ["Go", "CLI", "SQLite"],
    categories: ["backend", "devtools"],
    link: "https://github.com",
  },
  {
    title: "React Server Components — Deep Dive",
    description:
      "Hands-on exploration of RSC architecture: streaming, Suspense boundaries, and partial hydration tradeoffs.",
    researchType: "Deep Dive",
    tags: ["React", "Next.js", "RSC"],
    categories: ["frontend"],
  },
]
