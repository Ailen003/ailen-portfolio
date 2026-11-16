"use client"

import { useTranslations } from "next-intl"
import { ArrowUpRight, Github } from "lucide-react"
import { isRepositoryUrl } from "../lib/utils/project-links"

interface ProjectCardActionsProps {
  title: string
  source?: string
  demo?: string
  link?: string
  variant?: "inline" | "overlay"
}

export function ProjectCardActions({ title, source, demo, link, variant = "inline" }: ProjectCardActionsProps) {
  const t = useTranslations("projects")
  const repository = source ? isRepositoryUrl(source) : false
  if (!repository && !demo && !link) return null

  const actionClassName = `pointer-events-auto inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-border px-2.5 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/60 hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${variant === "overlay" ? "bg-card/95 shadow-sm backdrop-blur-md" : "bg-secondary/50"}`

  return (
    <div className="flex flex-wrap items-center gap-2">
      {repository && (
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("cardActions.repository")}: ${title}`}
          onClick={(event) => event.stopPropagation()}
          className={actionClassName}
        >
          <Github className="h-4 w-4 shrink-0" aria-hidden="true" />
          {t("cardActions.repository")}
        </a>
      )}
      {(demo || link) && (
        <a
          href={demo || link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t(demo ? "cardActions.demo" : "cardActions.resource")}: ${title}`}
          onClick={(event) => event.stopPropagation()}
          className={actionClassName}
        >
          {t(demo ? "cardActions.demo" : "cardActions.resource")}
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      )}
    </div>
  )
}
