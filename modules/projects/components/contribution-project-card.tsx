"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { ArrowUpRight, Github, Star, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { PROJECT_CATEGORY_META, type ContributionProject } from "../lib/types/project.types"
import { ProjectEngagementBadge } from "./project-engagement-badge"
import { ProjectInProgressBadge } from "./project-in-progress-badge"

interface ContributionProjectCardProps {
  project: ContributionProject
  index?: number
  onOpenDetail?: () => void
}

const MAX_VISIBLE_TAGS = 10

export function ContributionProjectCard({ project, index = 0, onOpenDetail }: ContributionProjectCardProps) {
  const t = useTranslations("projects")
  const primaryCat = project.categories[0]
  const primaryColor = primaryCat ? PROJECT_CATEGORY_META[primaryCat].color : "#6B7280"
  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS)
  const remainingCount = project.tags.length - MAX_VISIBLE_TAGS

  return (
    <Reveal delay={index * 80}>
      <article
        className="paper-card portfolio-project-card group relative flex h-full flex-col overflow-hidden border border-border transition-all hover:-translate-y-1 cursor-pointer"
      >
        {project.image ? (
          <div className="project-preview-stage relative aspect-16/10 overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-20"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}33 0%, transparent 60%)`,
              }}
            />
            {project.featured && (
              <div className="absolute right-4 top-4 z-10">
                  <span className="paper-label inline-flex items-center gap-1.5 bg-accent px-3 py-1 text-primary">
                    <Star className="h-3.5 w-3.5" />
                    {t("badges.featured")}
                  </span>
              </div>
            )}
            {(project.company || project.engagement) && (
              <div className="absolute left-3 top-3 z-10">
                <ProjectEngagementBadge
                  engagement={project.engagement}
                  company={project.company}
                  onClick={(event) => event.stopPropagation()}
                />
              </div>
            )}
            {project.status === "supporting" && (
              <div className="absolute bottom-4 right-4 z-10">
                <ProjectInProgressBadge />
              </div>
            )}
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
              <Users className="h-5 w-5" style={{ color: `color-mix(in srgb, ${primaryColor} var(--tag-color-weight), var(--foreground))` }} />
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          {project.isExample && <span className="tag mb-3 self-start">{t("example")}</span>}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="paper-label inline-flex items-center gap-1.5 border px-2.5 py-0.5"
              style={{
                backgroundColor: `${primaryColor}12`,
                color: `color-mix(in srgb, ${primaryColor} var(--tag-color-weight), var(--foreground))`,
                borderColor: `${primaryColor}35`,
              }}
            >
              <Users className="h-3 w-3" />
              {project.role}
            </span>
            {project.status === "supporting" && <ProjectInProgressBadge />}
          </div>

          <div className="mt-3 flex items-start justify-between gap-4">
            <h3 className="line-clamp-1 text-base font-bold tracking-tight sm:text-lg" title={project.title}><button type="button" className="project-details-button" aria-haspopup="dialog" onClick={onOpenDetail}>{project.title}</button></h3>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={project.source}
                target="_blank"
                rel="noreferrer"
                aria-label={t("ariaLabels.source", { title: project.title })}
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
                    aria-label={t("ariaLabels.liveDemo", { title: project.title })}
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {project.tagline && (
            <p className="mt-1 line-clamp-1 text-sm font-medium text-muted-foreground" title={project.tagline}>{project.tagline}</p>
          )}

          <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground" title={project.description}>{project.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex flex-wrap gap-1.5">
              {project.categories.map((cat) => {
                const meta = PROJECT_CATEGORY_META[cat]
                return (
                  <span
                    key={cat}
                    className="paper-label inline-flex items-center gap-1 px-2 py-0.5 text-[10px]"
                    style={{
                      backgroundColor: `${meta.color}15`,
                      color: `color-mix(in srgb, ${meta.color} var(--tag-color-weight), var(--foreground))`,
                      border: `1px solid ${meta.color}35`,
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
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              {visibleTags.map((tag) => (
                <li key={tag} className="font-mono text-xs text-muted-foreground">
                  {tag}
                </li>
              ))}
              {remainingCount > 0 && (
                <li className="font-mono text-xs font-medium text-primary">
                  {t("tagsMore", { count: remainingCount })}
                </li>
              )}
            </ul>
          </div>

        </div>
      </article>
    </Reveal>
  )
}
