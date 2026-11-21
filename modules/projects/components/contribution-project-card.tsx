"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/reveal"
import type { ContributionProject } from "../lib/types/project.types"
import { ProjectEngagementBadge } from "./project-engagement-badge"
import { ProjectInProgressBadge } from "./project-in-progress-badge"
import { ProjectCardActions } from "./project-card-actions"
import styles from "./contribution-project-card.module.css"

interface ContributionProjectCardProps {
  project: ContributionProject
  index?: number
  onOpenDetail?: () => void
}

const MAX_VISIBLE_TAGS = 7

export function ContributionProjectCard({ project, index = 0, onOpenDetail }: ContributionProjectCardProps) {
  const t = useTranslations("projects")
  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS)
  const remainingCount = project.tags.length - visibleTags.length

  return (
    <Reveal delay={index * 80} className="min-w-0">
      <article className="paper-card portfolio-project-card group relative flex h-full cursor-pointer flex-col overflow-hidden border border-border transition-all hover:-translate-y-1">
        <div className="project-preview-stage relative aspect-16/11 shrink-0 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={t("coverAlt", { title: project.title })}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          {(project.company || project.engagement) && (
            <div className="absolute left-3 top-3 z-10">
              <ProjectEngagementBadge
                engagement={project.engagement}
                company={project.company}
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex flex-col items-end gap-2">
            <ProjectCardActions title={project.title} source={project.source} demo={project.demo} variant="overlay" />
            {project.status === "supporting" && (
              <div className="flex w-full">
                <ProjectInProgressBadge />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          {project.isExample && <span className="tag mb-3 self-start">{t("example")}</span>}
          <div>
            <h4 className={`${styles.title} text-lg sm:text-xl`}>
              <button type="button" className={`project-details-button ${styles.detailsButton}`} aria-haspopup="dialog" onClick={onOpenDetail}>
                {project.title}
              </button>
            </h4>
            <p className="mt-0.5 line-clamp-3 text-sm font-medium text-primary">{project.tagline}</p>
          </div>

          <p className="mt-3 line-clamp-4 shrink-0 text-sm leading-relaxed text-muted-foreground" title={project.description}>{project.description}</p>

          <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label={t("detail.technologies")}>
            {visibleTags.map((tag) => (
              <li key={tag} className="paper-label border border-border/60 bg-secondary/50 px-2.5 py-0.5 text-muted-foreground">
                {tag}
              </li>
            ))}
            {remainingCount > 0 && (
              <li className="paper-label border border-border/60 bg-secondary/50 px-2.5 py-0.5 font-medium text-primary">
                {t("tagsMore", { count: remainingCount })}
              </li>
            )}
          </ul>
        </div>
      </article>
    </Reveal>
  )
}
