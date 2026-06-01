import Image from "next/image"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { ArrowUpRight, Github, Star } from "lucide-react"

const featured = {
  title: "FinFlow",
  tagline: "Personal finance, reimagined",
  description:
    "A full-stack budgeting platform serving 40k+ users. I led the frontend architecture and design system, cut initial load time by 60%, and shipped real-time syncing across devices with optimistic UI.",
  image: "/project-finflow.png",
  tags: ["Next.js", "TypeScript", "PostgreSQL", "tRPC", "Tailwind"],
  demo: "https://example.com",
  source: "https://github.com",
}

const projects = [
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

const more = [
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

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="03"
        title="Selected projects"
        subtitle="A few things I've designed, built, and shipped end to end."
      />

      {/* Featured project */}
      <Reveal>
        <article className="group grid overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
            <Image
              src={featured.image || "/placeholder.svg"}
              alt={`${featured.title} preview`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-xs font-medium text-primary">
              <Star className="h-3.5 w-3.5" />
              Featured project
            </div>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{featured.title}</h3>
            <p className="mt-1 font-medium text-primary">{featured.tagline}</p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{featured.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <a
                href={featured.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/25"
              >
                Live demo
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={featured.source}
                target="_blank"
                rel="noreferrer"
                aria-label={`${featured.title} source code`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </article>
      </Reveal>

      {/* Secondary projects */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image || "/placeholder.svg"}
                  alt={`${p.title} preview`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
                  <div className="flex items-center gap-2">
                    <a
                      href={p.source}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} source`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} live demo`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <li key={tag} className="font-mono text-xs text-muted-foreground">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* More projects */}
      <Reveal className="mt-6">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
          {more.map((p) => (
            <a
              key={p.title}
              href={p.source}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col bg-card p-6 transition-colors hover:bg-accent/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                {p.tags.map((tag) => (
                  <li key={tag} className="font-mono text-xs text-primary/70">
                    {tag}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
