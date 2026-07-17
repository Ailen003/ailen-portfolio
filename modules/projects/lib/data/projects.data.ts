import type { EndToEndProject, ContributionProject, ResearchProject } from "../types/project.types"
import type { ProjectsData } from "../types/projects.types"

export const endToEndProjects: EndToEndProject[] = [
  {
    title: "FinFlow",
    tagline: "Personal finance, reimagined",
    description:
      "A full-stack budgeting platform serving 40k+ users. I led the frontend architecture and design system, cut initial load time by 60%, and shipped real-time syncing across devices with optimistic UI.",
    image: "/project-finflow.png",
    images: ["/project-finflow.png", "/project-finflow-2.png", "/project-finflow-3.png"],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "tRPC", "Tailwind"],
    categories: ["fullstack", "frontend"],
    demo: "https://example.com",
    source: "https://github.com",
    featured: true,
    status: "live",
    year: 2024,
    teamSize: "Solo",
    highlights: [
      "Serves 40k+ active users with 99.9% uptime",
      "Cut initial load time by 60% via code-splitting and edge caching",
      "Real-time sync across devices using optimistic UI and WebSockets",
      "Custom design system with 30+ accessible components",
    ],
    technicalNotes: `## Architecture

The frontend is built on **Next.js App Router** with a strict separation between server and client components. Data fetching happens on the server via **tRPC** procedures, keeping the client bundle lean.

## Key decisions

- **Optimistic UI**: All mutations update local state immediately and roll back on error, making the app feel instantaneous even on slow connections.
- **Edge caching**: Static routes are cached at the CDN edge; dynamic user data is served from a regional PostgreSQL read replica.
- **Design system**: Built on Radix UI primitives with a custom token layer — supports light/dark mode and meets WCAG AA contrast ratios throughout.

## Challenges

The biggest challenge was real-time budget reconciliation across browser tabs. Solved this using a \`BroadcastChannel\` + server-sent events fallback for environments that don't support it.`,
  },
  {
    title: "Pulse",
    tagline: "Metrics at the speed of thought",
    description:
      "Real-time analytics for developer teams. Streaming metrics, anomaly alerts, and a query builder built for speed.",
    image: "/project-pulse.png",
    images: ["/project-pulse.png", "/project-pulse-2.png"],
    tags: ["React", "Go", "Redis", "WebSockets"],
    categories: ["fullstack", "devtools"],
    demo: "https://example.com",
    source: "https://github.com",
    status: "live",
    year: 2023,
    teamSize: "2-person",
    highlights: [
      "Sub-100ms latency for metric streaming via Redis Pub/Sub",
      "Anomaly detection engine processing 10k+ events/sec",
      "Visual query builder with zero SQL knowledge required",
    ],
    technicalNotes: `## Streaming pipeline

Metrics are ingested by a **Go** backend into **Redis Streams**, then fanned out to connected browser clients via WebSocket. The Go service handles backpressure automatically — slow clients get a compressed snapshot instead of a raw stream.

## Query builder

The query builder generates a subset of PromQL. The AST is built client-side in React, serialized to JSON, and interpreted server-side. This keeps the UI completely decoupled from the query language internals.

## Anomaly detection

Uses a sliding window Z-score algorithm — simple but effective for developer dashboards where spikes are the main concern.`,
  },
  {
    title: "Atlas UI",
    tagline: "Design systems done right",
    description:
      "An open-source, accessible component library and design system adopted across multiple product teams.",
    image: "/project-atlas.png",
    images: ["/project-atlas.png", "/project-atlas-2.png"],
    tags: ["React", "TypeScript", "Storybook", "a11y"],
    categories: ["frontend", "ux"],
    demo: "https://example.com",
    source: "https://github.com",
    status: "live",
    year: 2023,
    teamSize: "Solo",
    highlights: [
      "40+ accessible components used across 3 product teams",
      "Full WCAG AA compliance verified with automated axe-core tests",
      "Comprehensive Storybook docs with interaction tests",
      "Tree-shakeable ESM build — zero runtime dependencies",
    ],
    technicalNotes: `## Design tokens

All design decisions are encoded as CSS custom properties following the W3C Design Token spec draft. This allows teams to theme the library without forking it.

## Accessibility first

Every interactive component is built on **Radix UI** primitives, which handle focus management, keyboard navigation, and ARIA attributes. Tests run \`axe-core\` in jsdom on every CI push.

## Bundle size

The library is built with **tsup** to produce both ESM and CJS outputs. Each component is a separate entry point, so teams only ship what they use.`,
  },
]

export const contributionProjects: ContributionProject[] = [
  {
    title: "Vercel AI SDK",
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
    title: "Radix UI Primitives",
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
    title: "Internal Design System @ Corp",
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

export const projectsDataMap: Record<string, ProjectsData> = {
  en: {
    title: "Featured projects",
    subtitle: "Some things I\u2019ve designed, built, and shipped from start to finish.",
  },
  es: {
    title: "Proyectos destacados",
    subtitle: "Algunas cosas que he dise\u00f1ado, constru\u00eddo y lanzado de principio a fin.",
  },
}
