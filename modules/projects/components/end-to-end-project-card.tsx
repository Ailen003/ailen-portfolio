import Image from "next/image"
import { ArrowUpRight, Github, Star } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { PROJECT_CATEGORY_META, type EndToEndProject } from "../lib/types/project.types"

interface EndToEndProjectCardProps {
  project: EndToEndProject
  index?: number
  onOpenDetail?: () => void
}

export function EndToEndProjectCard({ project, index = 0, onOpenDetail }: EndToEndProjectCardProps) {
  if (project.featured) {
    return (
      <Reveal delay={index * 80}>
        <article
          className="group grid overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 lg:grid-cols-2 cursor-pointer"
          onClick={onOpenDetail}
        >
          <div className="relative aspect-4/3 overflow-hidden lg:aspect-auto">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={`${project.title} preview`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-xs font-medium text-primary">
                <Star className="h-3.5 w-3.5" />
                Featured
              </span>
              {project.categories.map((cat) => {
                const meta = PROJECT_CATEGORY_META[cat]
                return (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium"
                    style={{
                      backgroundColor: `${meta.color}15`,
                      color: meta.color,
                      borderColor: `${meta.color}40`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: meta.color }}
                    />
                    {meta.label}
                  </span>
                )
              })}
            </div>

            <h3 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">{project.title}</h3>
            <p className="mt-1 font-medium text-primary">{project.tagline}</p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{project.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/25"
              >
                Live demo
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={project.source}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source code`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </article>
      </Reveal>
    )
  }

  return (
    <Reveal delay={index * 80}>
      <article
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
        onClick={onOpenDetail}
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
            {project.categories.map((cat) => {
              const meta = PROJECT_CATEGORY_META[cat]
              return (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium backdrop-blur-sm"
                  style={{
                    backgroundColor: `${meta.color}30`,
                    color: "#fff",
                    border: `1px solid ${meta.color}60`,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: meta.color }}
                  />
                  {meta.label}
                </span>
              )
            })}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-bold tracking-tight sm:text-xl">{project.title}</h3>
              <p className="mt-0.5 text-sm font-medium text-primary">{project.tagline}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={project.source}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source`}
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border/60 bg-secondary/50 px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>

        </div>
      </article>
    </Reveal>
  )
}
