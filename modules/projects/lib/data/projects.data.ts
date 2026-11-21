import en from "@/messages/en.json"
import es from "@/messages/es.json"
import type { EndToEndProject, ContributionProject, ResearchProject } from "../types/project.types"
import type { ProjectsData } from "../types/projects.types"

export const endToEndProjects: EndToEndProject[] = [
  {
    slug: "fleet-control",
    title: "Fleet Control",
    ...en.projects.endToEnd["fleet-control"],
    image: "/elena-portrait.png",
    images: [],
    tags: [
      "Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Docker",
      "Portainer", "Nextcloud", "GitLab CI/CD", "Nexus", "Docker Swarm", "Better Auth",
    ],
    categories: ["fullstack", "frontend", "backend", "devtools"],
    demo: "",
    source: "",
    company: { name: "ETI", logo: "/images/experiences/eti-logo.jpg" },
    engagement: "employee",
    featured: true,
    isExample: false,
    status: "supporting",
    year: 2026,
  },
  {
    slug: "gestionvc",
    title: "GestionVC",
    ...en.projects.endToEnd.gestionvc,
    image: "/placeholder.svg",
    images: [],
    tags: [
      "Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "Redis",
      "TypeORM", "TrueConf API", "Docker", "GitLab CI/CD", "Nexus", "Docker Swarm",
    ],
    categories: ["fullstack", "frontend", "backend", "devtools"],
    demo: "",
    source: "",
    company: { name: "ETI", logo: "/images/experiences/eti-logo.jpg" },
    engagement: "employee",
    featured: true,
    isExample: false,
    status: "supporting",
    year: 2025,
  },
  {
    slug: "sicom",
    title: "SICOM",
    ...en.projects.endToEnd.sicom,
    image: "/placeholder.svg",
    images: [],
    tags: [
      "Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "SQL Server",
      "TypeORM", "JOSE/JWE", "Argon2id", "Nodemailer", "ExcelJS", "Docker",
      "GitLab CI/CD", "Nexus", "Docker Swarm",
    ],
    categories: ["fullstack", "frontend", "backend", "devtools"],
    demo: "",
    source: "",
    company: { name: "ETI", logo: "/images/experiences/eti-logo.jpg" },
    engagement: "employee",
    featured: true,
    isExample: false,
    status: "supporting",
    year: 2025,
  },
]

const rawContributionProjects: ContributionProject[] = [
  {
    translationKey: "vercel-ai-sdk",
    title: "Vercel AI SDK",
    tagline: "Streaming and provider integrations for edge-ready AI applications",
    description:
      "Contributed streaming improvements and new provider adapters to the official Vercel AI SDK, improving edge-runtime compatibility.",
    image: "/project-finflow.png",
    role: "Open-source contributor",
    tags: ["TypeScript", "Edge Runtime", "Streaming"],
    categories: ["ai", "devtools"],
    source: "https://github.com",
    demo: "https://example.com",
    year: 2024,
    impact: "Reduced streaming latency by ~30% on edge runtimes across all provider adapters.",
    prLinks: [
      { label: "feat: add Anthropic streaming adapter", url: "https://github.com" },
      { label: "fix: edge runtime compatibility for stream controllers", url: "https://github.com" },
      { label: "docs: streaming usage guide", url: "https://github.com" },
    ],
    technicalNotes: `## What I contributed

The Vercel AI SDK's streaming layer used Node.js \`Readable\` streams internally, which aren't available on edge runtimes (Cloudflare Workers, Vercel Edge). I refactored the core streaming abstraction to use the **Web Streams API** (\`ReadableStream\`) as the primary interface, with a Node.js compatibility shim.

## Provider adapter

Added a new adapter for **Anthropic's Messages API**, including support for tool-use streaming and prompt caching headers.`,
  },
  {
    translationKey: "radix-ui-primitives",
    title: "Radix UI Primitives",
    tagline: "Accessibility fixes for keyboard and screen reader users",
    description:
      "Fixed accessibility regressions in Dialog and Tooltip components, added keyboard-navigation spec tests, and improved WAI-ARIA compliance.",
    image: "/project-finflow.png",
    role: "Bug fixes & a11y",
    tags: ["React", "TypeScript", "a11y", "Jest"],
    categories: ["frontend", "ux"],
    source: "/project-finflow.png",
    year: 2023,
    impact: "Resolved 3 long-standing WCAG violations affecting screen reader users across all Radix consumers.",
    prLinks: [
      { label: "fix(Dialog): restore focus after close on iOS Safari", url: "https://github.com" },
      { label: "fix(Tooltip): aria-describedby not removed on unmount", url: "https://github.com" },
      { label: "test: keyboard navigation specs for Dialog + Tooltip", url: "https://github.com" },
    ],
    technicalNotes: `## Focus management bug

On iOS Safari, \`Dialog\` was not restoring focus to the trigger after close because the browser's focus behavior differs from the spec. Fixed by explicitly storing the trigger ref and calling \`.focus()\` in a \`requestAnimationFrame\` callback after the close animation completes.

## ARIA cleanup

\`Tooltip\` was keeping the \`aria-describedby\` attribute on the anchor even after the tooltip unmounted, causing screen readers to reference a non-existent element. Added a cleanup effect tied to the tooltip's portal lifecycle.`,
  },
  {
    translationKey: "internal-design-system",
    title: "Internal Design System @ Corp",
    tagline: "Dark mode and reusable components for a shared design system",
    description:
      "Joined an existing design-system team to ship a dark-mode token layer and migrate 30+ components from class-based to functional patterns.",
    image: "/project-finflow.png",
    role: "Frontend Engineer (contract)",
    tags: ["React", "CSS Variables", "Storybook"],
    categories: ["frontend", "ux"],
    source: "https://github.com",
    year: 2023,
    impact: "Enabled dark mode across 4 product surfaces in a single release, zero regression on existing consumers.",
    prLinks: [
      { label: "feat: CSS variable token layer + dark mode theme", url: "https://github.com" },
      { label: "refactor: migrate Button/Input/Card to functional components", url: "https://github.com" },
    ],
    technicalNotes: `## Token layer

The existing system used hardcoded hex values scattered across component files. Introduced a semantic token layer with \`data-theme\` attribute switching — light/dark themes are swapped without JavaScript by toggling a single attribute on \`<html>\`.

## Migration strategy

Class-based components were migrated incrementally using a codemods-first approach. Wrote a custom AST transform with \`jscodeshift\` to automate the boilerplate conversion, then manually reviewed each component's lifecycle methods.`,
  },
]

export const researchProjects: ResearchProject[] = [
  {
    translationKey: "cartographer",
    title: "Cartographer",
    description: "Interactive data-viz toolkit for geospatial dashboards — exploring D3 + WebGL rendering boundaries.",
    researchType: "POC",
    tags: ["D3", "Mapbox", "Next.js"],
    categories: ["frontend"],
    link: "https://github.com",
    year: 2024,
    completionStatus: "completed",
    findings: [
      "WebGL canvas outperforms SVG by 10× at 50k+ data points",
      "D3's projection math can be offloaded to a Web Worker without visual delay",
      "Mapbox GL's custom layer API is sufficient for most data-viz overlays",
    ],
    references: [
      { label: "Observable: D3 + WebGL patterns", url: "https://observablehq.com" },
      { label: "Mapbox Custom Layer docs", url: "https://docs.mapbox.com" },
    ],
    technicalNotes: `## Goal

Determine the practical rendering ceiling for browser-based geospatial dashboards and identify the best D3/WebGL integration point.

## Approach

Built a series of progressively complex visualizations — choropleth → point cloud → animated flow lines — and profiled each in Chrome DevTools. Compared SVG, Canvas 2D, and WebGL rendering for each case.

## Conclusion

For dashboards with < 5k features, SVG + D3 is the right choice (easy debugging, accessibility). Beyond that, Canvas 2D or WebGL is necessary. The \`deck.gl\` + Mapbox combination offers the best ergonomics for production use.`,
  },
  {
    translationKey: "inbox-zero",
    title: "Inbox Zero",
    description: "Prototype AI email triage assistant with smart summarization using function-calling pipelines.",
    researchType: "POC",
    tags: ["AI SDK", "Edge", "React"],
    categories: ["ai", "frontend"],
    link: "https://github.com",
    year: 2024,
    completionStatus: "completed",
    findings: [
      "Function-calling pipelines outperform prompt-only classification for structured extraction",
      "Edge streaming cuts perceived latency by ~50% vs. waiting for full response",
      "GPT-4o-mini is cost-effective enough for per-email processing at scale",
    ],
    references: [
      { label: "OpenAI function calling guide", url: "https://platform.openai.com/docs" },
      { label: "Vercel AI SDK streaming docs", url: "https://sdk.vercel.ai" },
    ],
    technicalNotes: `## Pipeline design

Each email passes through a 3-step function-calling pipeline:
1. **Classify** — label (action/info/promo/spam) + urgency score
2. **Summarize** — extract subject, sender intent, and required action
3. **Draft** — optional one-click reply draft

All steps run on Vercel Edge Functions with streaming so the UI updates progressively.

## Cost analysis

At GPT-4o-mini pricing, processing 100 emails/day costs ~$0.02. Acceptable for personal use; production would need batching + caching for repeated senders.`,
  },
  {
    translationKey: "ledger-cli",
    title: "Ledger CLI",
    description: "A fast, scriptable command-line tool for plain-text accounting. Study in Go CLI design patterns.",
    researchType: "Study",
    tags: ["Go", "CLI", "SQLite"],
    categories: ["backend", "devtools"],
    link: "https://github.com",
    year: 2023,
    completionStatus: "completed",
    findings: [
      "Go's stdlib is sufficient for most CLI tooling — cobra adds ergonomics, not capability",
      "SQLite with WAL mode handles concurrent reads with zero configuration",
      "Plain-text ledger format (hledger-compatible) is surprisingly robust for parsing",
    ],
    references: [
      { label: "hledger plain-text accounting format", url: "https://hledger.org" },
      { label: "SQLite WAL mode docs", url: "https://sqlite.org/wal.html" },
    ],
    technicalNotes: `## Motivation

Studied Go CLI architecture patterns by building a real tool I actually use — a plain-text accounting CLI compatible with the hledger format.

## Design decisions

- **cobra** for command routing and flag parsing
- **SQLite** (via \`modernc.org/sqlite\`) for the internal index — no CGo dependency
- **bubbletea** for the interactive TUI report viewer

## Learnings

Go's approach to CLI tooling is refreshingly pragmatic. The biggest lesson was around error handling — Go forces you to handle errors explicitly, which results in much more resilient CLI tools than equivalent Node.js scripts.`,
  },
  {
    translationKey: "react-server-components",
    title: "React Server Components — Deep Dive",
    description:
      "Hands-on exploration of RSC architecture: streaming, Suspense boundaries, and partial hydration tradeoffs.",
    researchType: "Deep Dive",
    tags: ["React", "Next.js", "RSC"],
    categories: ["frontend"],
    year: 2024,
    completionStatus: "ongoing",
    findings: [
      "RSC eliminates client-side data-fetching waterfalls for deeply nested component trees",
      "Suspense boundaries are the key unit of streaming — placement matters more than quantity",
      "The RSC payload format is compact but adds non-trivial complexity to the build pipeline",
      "Partial hydration via `use client` boundaries is the most impactful performance lever",
    ],
    references: [
      { label: "React RFC: Server Components", url: "https://github.com/reactjs/rfcs" },
      { label: "Next.js App Router deep dive", url: "https://nextjs.org/docs" },
      { label: "Dan Abramov — RSC from scratch", url: "https://github.com/reactwg/server-components" },
    ],
    technicalNotes: `## Scope

Built a series of increasingly complex Next.js App Router demos to stress-test RSC boundaries, streaming behavior, and the interop between server and client components.

## Key experiments

**Experiment 1 — Streaming waterfall elimination**: Replaced a deeply nested component tree that had 4 sequential \`useEffect\` fetches with RSC \`async/await\`. Result: 0 client-side waterfalls, ~40% reduction in TTI.

**Experiment 2 — Suspense placement**: Tested 3 different Suspense boundary configurations for the same UI. Found that coarse-grained boundaries (one per route segment) outperform fine-grained ones in practice because they reduce layout shifts.

**Experiment 3 — Client island size**: Measured JS bundle size as \`use client\` boundaries moved progressively closer to the leaves. Every level down reduced the hydrated JS by ~15–20%.

## Ongoing

Still exploring the cache invalidation model (\`revalidatePath\` vs \`revalidateTag\`) and its interaction with CDN-level caching.`,
  },
]

export const contributionProjects: ContributionProject[] = rawContributionProjects.map(project => ({
  ...project, engagement: "freelance", isExample: true,
}))
/** Fail early when a project has no translation instead of silently mixing copy. */
export function getProjectCopy<T>(copy: Record<string, T>, key: string): T {
  if (!Object.hasOwn(copy, key)) throw new Error(`Missing project translation: ${key}`)
  return copy[key]
}

export function localizeProjects(copy: typeof en.projects | typeof es.projects): ProjectsData {
  return { title: copy.title, subtitle: copy.subtitle,
    endToEnd: endToEndProjects.map(project => ({ ...project, ...getProjectCopy(copy.endToEnd, project.slug) })),
    contributions: contributionProjects.map(project => ({ ...project, ...getProjectCopy(copy.contributions, project.translationKey) })),
    research: researchProjects.map(project => ({ ...project, ...getProjectCopy(copy.research, project.translationKey) })),
  }
}
export const projectsDataMap: Record<string, ProjectsData> = { en: localizeProjects(en.projects), es: localizeProjects(es.projects) }
