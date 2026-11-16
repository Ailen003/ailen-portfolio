"use client"

import { useTranslations } from "next-intl"
import { ArrowRight, FlaskConical, BookOpen, Microscope, Lightbulb } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { PROJECT_CATEGORY_META, type ResearchProject, type ResearchType } from "../lib/types/project.types"
import { ProjectCardActions } from "./project-card-actions"

const RESEARCH_TYPE_META: Record<
  ResearchType,
  { icon: typeof FlaskConical }
> = {
  POC: { icon: FlaskConical },
  Study: { icon: BookOpen },
  "Deep Dive": { icon: Microscope },
  Concept: { icon: Lightbulb },
}

interface ResearchProjectCardProps {
  project: ResearchProject
  index?: number
  onOpenDetail?: () => void
}

function researchTypeKey(type: ResearchType) {
  return type === "Deep Dive" ? "DeepDive" : type
}

export function ResearchProjectCard({ project, index = 0, onOpenDetail }: ResearchProjectCardProps) {
  const t = useTranslations("projects")
  const typeMeta = RESEARCH_TYPE_META[project.researchType]
  const TypeIcon = typeMeta.icon

  const VISIBLE_TAG_COUNT = 4
  const visibleTags = project.tags.slice(0, VISIBLE_TAG_COUNT)
  const remainingTags = project.tags.length - VISIBLE_TAG_COUNT

  return (
    <Reveal delay={index * 60} className="min-w-0">
      <article
        className="paper-card portfolio-project-card group relative flex h-full flex-col overflow-hidden border border-border transition-all hover:-translate-y-1 cursor-pointer"
      >
        <div className="flex min-h-11 items-center justify-between gap-2 border-b border-border px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex shrink-0 items-center justify-center text-primary">
              <TypeIcon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground">
              {t(`researchTypes.${researchTypeKey(project.researchType)}`)}
            </span>
          </div>
          {project.year && <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{project.year}</span>}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-bold leading-snug tracking-tight"><button type="button" className="project-details-button line-clamp-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring" aria-haspopup="dialog" onClick={onOpenDetail}>{project.title}</button></h3>
          <p
            className="mt-2 line-clamp-5 shrink-0 text-sm leading-relaxed text-muted-foreground"
            title={project.description}
          >
            {project.description}
          </p>

          <div className="mt-auto space-y-2.5 pt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.categories.map((cat) => {
                const meta = PROJECT_CATEGORY_META[cat]
                return (
                  <span
                    key={cat}
                    className="paper-label inline-flex items-center gap-1 px-2 py-0.5 text-[10px]"
                    style={{
                      backgroundColor: `${meta.color}12`,
                      color: `color-mix(in srgb, ${meta.color} var(--tag-color-weight), var(--foreground))`,
                      border: `1px solid ${meta.color}30`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: meta.color }}
                    />
                    {t(`categoryLabels.${cat}`)}
                  </span>
                )
              })}
            </div>
            <ul className="flex flex-wrap items-center gap-1.5">
              {visibleTags.map((tag) => (
                <li key={tag} className="max-w-full rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-[11px] leading-relaxed wrap-anywhere text-muted-foreground">
                  {tag}
                </li>
              ))}
              {remainingTags > 0 && (
                <li className="px-1 py-0.5 font-mono text-[11px] font-semibold text-primary">
                  {t("tagsMore", { count: remainingTags })}
                </li>
              )}
            </ul>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2.5">
            <span aria-hidden="true" className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-primary">
              {t("actions.viewProject")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
            </span>
            <ProjectCardActions title={project.title} link={project.link} />
          </div>
        </div>
      </article>
    </Reveal>
  )
}
