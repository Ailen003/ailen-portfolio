import { ArrowUpRight, FlaskConical, BookOpen, Microscope, Lightbulb, ScanSearch } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { PROJECT_CATEGORY_META, type ResearchProject, type ResearchType } from "../lib/types/project.types"

const RESEARCH_TYPE_META: Record<
  ResearchType,
  { label: string; icon: typeof FlaskConical; color: string }
> = {
  POC:         { label: "POC",        icon: FlaskConical, color: "#10B981" },
  Study:       { label: "Study",      icon: BookOpen,     color: "#3B82F6" },
  "Deep Dive": { label: "Deep Dive",  icon: Microscope,   color: "#8B5CF6" },
  Concept:     { label: "Concept",    icon: Lightbulb,    color: "#F59E0B" },
}

interface ResearchProjectCardProps {
  project: ResearchProject
  index?: number
  onOpenDetail?: () => void
}

export function ResearchProjectCard({ project, index = 0, onOpenDetail }: ResearchProjectCardProps) {
  const typeMeta = RESEARCH_TYPE_META[project.researchType]
  const TypeIcon = typeMeta.icon
  const primaryCat = project.categories[0]
  const accentColor = primaryCat ? PROJECT_CATEGORY_META[primaryCat].color : "#6B7280"

  return (
    <Reveal delay={index * 60}>
      <article
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        style={{ borderLeftColor: accentColor, borderLeftWidth: "3px" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-xs font-semibold"
              style={{
                backgroundColor: `${typeMeta.color}15`,
                color: typeMeta.color,
                border: `1px solid ${typeMeta.color}35`,
              }}
            >
              <TypeIcon className="h-3 w-3" />
              {typeMeta.label}
            </span>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} link`}
              className="shrink-0 text-muted-foreground transition-all hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <h3 className="mt-3 text-base font-bold tracking-tight">{project.title}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex flex-wrap gap-1.5">
            {project.categories.map((cat) => {
              const meta = PROJECT_CATEGORY_META[cat]
              return (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium"
                  style={{
                    backgroundColor: `${meta.color}12`,
                    color: meta.color,
                    border: `1px solid ${meta.color}30`,
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
          <ul className="flex flex-wrap gap-x-2.5 gap-y-1">
            {project.tags.map((tag) => (
              <li key={tag} className="font-mono text-xs text-primary/60">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {onOpenDetail && (
          <button
            type="button"
            onClick={onOpenDetail}
            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border/50 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ScanSearch className="h-3 w-3" />
            View details
          </button>
        )}
      </article>
    </Reveal>
  )
}
