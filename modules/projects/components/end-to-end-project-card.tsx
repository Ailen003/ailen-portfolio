"use client"

import Image from "next/image"
import { ArrowUpRight, Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/reveal"
import { DesignGeometry } from "@/components/design-geometry"
import { Link } from "@/i18n/navigation"
import type { EndToEndProject } from "../lib/types/project.types"
import { ProjectEngagementBadge } from "./project-engagement-badge"
import { getProjectExternalLinks } from "../lib/utils/project-links"

export function EndToEndProjectCard({ project, index = 0 }: {
  project: EndToEndProject; index?: number
}) {
  const t = useTranslations("projects")
  return <Reveal className="project-reveal min-w-0">
    <article className={`surface-card project-card group relative ${index % 2 ? "project-card--reversed" : ""}`}>
      <div className="project-stage project-stage--image relative overflow-hidden">
        <DesignGeometry className="project-placeholder-geometry" />
        <div className="project-card-image-frame">
          <Image src={project.image || "/placeholder.svg"} alt={t("coverAlt", { title: project.title })} fill sizes="(min-width: 1024px) 550px, 90vw" className="object-contain" />
        </div>
      </div>
      <div className="project-card-copy flex min-w-0 flex-col">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <ProjectEngagementBadge engagement={project.engagement} company={project.company} />
          {project.year && <span className="font-mono text-xs text-muted-foreground">{project.year}</span>}
        </div>
        <h4 className="project-card-title"><Link href={`/projects/${project.slug}`} scroll={false} className="project-details-link focus-visible:underline">{project.title}<ArrowUpRight className="ml-3 inline size-5 text-primary" aria-hidden="true" /></Link></h4>
        <p className="mt-2 text-sm font-medium text-primary">{project.tagline}</p>
        <p className="mt-4 text-pretty text-sm leading-7 text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.isExample && <span className="tag">{t("example")}</span>}
          {project.featured && <span className="tag text-primary"><Star className="size-3" aria-hidden="true" />{t("badges.featured")}</span>}
          {project.categories.map(category => <span key={category} className="tag">{t(`categoryLabels.${category}`)}</span>)}
        </div>
        <ul className="mt-5 flex flex-wrap gap-1.5">{project.tags.map(tag => <li key={tag} className="tag">{tag}</li>)}</ul>
        <div className="project-card-action flex flex-wrap gap-2">
          {getProjectExternalLinks(project).map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="button-secondary text-xs">{t(`actions.${link.label}`)}<ArrowUpRight className="size-3.5" aria-hidden="true" /></a>)}
        </div>
      </div>
    </article>
  </Reveal>
}
