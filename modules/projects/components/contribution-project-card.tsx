import Image from "next/image"
import { ArrowUpRight, Github, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { PROJECT_CATEGORY_META, type ContributionProject } from "../lib/types/project.types"

interface ContributionProjectCardProps {
  project: ContributionProject
  index?: number
  onOpenDetail?: () => void
}

export function ContributionProjectCard({ project, index = 0, onOpenDetail }: ContributionProjectCardProps) {
  const primaryCat = project.categories[0]
  const primaryColor = primaryCat ? PROJECT_CATEGORY_META[primaryCat].color : "#6B7280"

  return (
    <Reveal delay={index * 80}>
      <article
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
        onClick={onOpenDetail}
      >
        {project.image ? (
          <div className="relative aspect-16/10 overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-20"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}33 0%, transparent 60%)`,
              }}
            />
          </div>
        ) : (
          <div
            className="flex h-20 items-center justify-center border-b border-border"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}12 0%, transparent 70%)`,
            }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: `${primaryColor}20`, border: `1px solid ${primaryColor}40` }}
            >
              <Users className="h-5 w-5" style={{ color: primaryColor }} />
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium"
              style={{
                backgroundColor: `${primaryColor}12`,
                color: primaryColor,
                borderColor: `${primaryColor}35`,
              }}
            >
              <Users className="h-3 w-3" />
              {project.role}
            </span>
          </div>

          <div className="mt-3 flex items-start justify-between gap-4">
            <h3 className="text-lg font-bold tracking-tight">{project.title}</h3>
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
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} demo`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex flex-wrap gap-1.5">
              {project.categories.map((cat) => {
                const meta = PROJECT_CATEGORY_META[cat]
                return (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium"
                    style={{
                      backgroundColor: `${meta.color}15`,
                      color: meta.color,
                      border: `1px solid ${meta.color}35`,
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
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              {project.tags.map((tag) => (
                <li key={tag} className="font-mono text-xs text-muted-foreground">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </article>
    </Reveal>
  )
}
