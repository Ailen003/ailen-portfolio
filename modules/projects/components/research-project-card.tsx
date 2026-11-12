"use client"

import { useTranslations } from "next-intl"
import { ArrowUpRight, FlaskConical, BookOpen, Microscope, Lightbulb } from "lucide-react"
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

function researchTypeKey(type: ResearchType) {
  return type === "Deep Dive" ? "DeepDive" : type
}

export function ResearchProjectCard({ project, index = 0, onOpenDetail }: ResearchProjectCardProps) {
  const t = useTranslations("projects")
  const typeMeta = RESEARCH_TYPE_META[project.researchType]
  const TypeIcon = typeMeta.icon
  const primaryCat = project.categories[0]
  const accentColor = primaryCat ? PROJECT_CATEGORY_META[primaryCat].color : "#6B7280"

  const VISIBLE_TAG_COUNT = 6
  const visibleTags = project.tags.slice(0, VISIBLE_TAG_COUNT)
  const remainingTags = project.tags.length - VISIBLE_TAG_COUNT

  return (
    <Reveal delay={index * 60}>
      <article
        className="paper-card portfolio-project-card group relative flex h-full flex-col overflow-hidden border border-border p-5 transition-all hover:-translate-y-0.5 cursor-pointer"
        style={{ borderLeftColor: accentColor, borderLeftWidth: "3px" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className="paper-label inline-flex items-center gap-1.5 px-2 py-0.5 font-semibold"
              style={{
                backgroundColor: `${typeMeta.color}15`,
                color: `color-mix(in srgb, ${typeMeta.color} var(--tag-color-weight), var(--foreground))`,
                border: `1px solid ${typeMeta.color}35`,
              }}
            >
              <TypeIcon className="h-3 w-3" />
              {t(`researchTypes.${researchTypeKey(project.researchType)}`)}
            </span>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={t("ariaLabels.link", { title: project.title })}
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 text-muted-foreground transition-all hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <h3 className="mt-3 text-base font-bold tracking-tight"><button type="button" className="project-details-button" aria-haspopup="dialog" onClick={onOpenDetail}>{project.title}</button></h3>
        <p
          className="mt-1.5 line-clamp-6 text-sm leading-relaxed text-muted-foreground"
          title={project.description}
        >
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
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
          <ul className="flex flex-wrap gap-x-2.5 gap-y-1">
            {visibleTags.map((tag) => (
              <li key={tag} className="font-mono text-xs text-primary/60">
                {tag}
              </li>
            ))}
            {remainingTags > 0 && (
              <li className="font-mono text-xs font-semibold text-primary/80">
                +{remainingTags}
              </li>
            )}
          </ul>
        </div>

      </article>
    </Reveal>
  )
}
