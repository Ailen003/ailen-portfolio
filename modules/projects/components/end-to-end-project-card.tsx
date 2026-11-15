"use client"

import Image from "next/image"
import { ArrowRight, ArrowUpRight, Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/reveal"
import { DesignGeometry } from "@/components/design-geometry"
import { Link } from "@/i18n/navigation"
import type { EndToEndProject } from "../lib/types/project.types"
import { getProjectExternalLinks } from "../lib/utils/project-links"
import styles from "./end-to-end-project-card.module.css"

const MAX_VISIBLE_TAGS = 5

export function EndToEndProjectCard({ project, index = 0 }: {
  project: EndToEndProject
  index?: number
}) {
  const t = useTranslations("projects")
  const detailHref = `/projects/${project.slug}`
  const hasCover = Boolean(project.image && project.image !== "/placeholder.svg")
  const initials = project.title.trim().split(/\s+/).slice(0, 2).map(word => Array.from(word)[0]).join("")
  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS)
  const remainingTags = project.tags.length - visibleTags.length
  const externalLinks = getProjectExternalLinks(project)

  return (
    <Reveal className="project-reveal min-w-0">
      <article className={`surface-card ${styles.card}`}>
        <div className={`${styles.cover} ${hasCover ? styles.coverWithImage : ""}`}>
          <div className={styles.coverHeader}>
            <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {project.featured && (
              <span className={styles.featured}><Star className="size-3" aria-hidden="true" />{t("badges.featured")}</span>
            )}
          </div>

          {hasCover ? (
            <Image
              src={project.image}
              alt={t("coverAlt", { title: project.title })}
              fill
              sizes="(min-width: 1280px) 400px, (min-width: 768px) 32vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className={styles.artwork} aria-hidden="true">
              <DesignGeometry className={styles.geometry} />
              <div className={styles.monogram}>{initials}<span>.</span></div>
              <span className={styles.artworkCaption}>{project.title}</span>
            </div>
          )}
        </div>

        <div className={styles.copy}>
          <div className={styles.context}>
            <div className={styles.origin}>
              {project.company ? (
                <>
                  <Image src={project.company.logo} alt="" width={24} height={24} className={styles.companyLogo} />
                  <span>{t("company.builtAt")} <strong>{project.company.name}</strong></span>
                </>
              ) : project.engagement ? <span>{t(`engagementLabels.${project.engagement}`)}</span> : null}
              {project.isExample && <span className={styles.example}>{t("example")}</span>}
            </div>
            {project.year && <time dateTime={String(project.year)} className={styles.year}>{project.year}</time>}
          </div>

          <div className={styles.heading}>
            <h4 className={styles.title}>{project.title}</h4>
            <p className={styles.tagline}>{project.tagline}</p>
          </div>

          <p className={`${styles.description} line-clamp-5`}>{project.description}</p>

          <ul className={styles.categories} aria-label={t("detail.disciplines")}>
            {project.categories.map(category => <li key={category}>{t(`categoryLabels.${category}`)}</li>)}
          </ul>

          <div className={styles.footer}>
            {project.tags.length > 0 && (
              <ul className={styles.stack} aria-label={t("detail.technologies")}>
                {visibleTags.map(tag => <li key={tag}>{tag}</li>)}
                {remainingTags > 0 && (
                  <li className={styles.moreTags}>
                    <Link href={`${detailHref}#project-stack`} aria-label={`${t("detail.technologies")}: ${project.title}`}>
                      {t("tagsMore", { count: remainingTags })}
                    </Link>
                  </li>
                )}
              </ul>
            )}
            <Link href={detailHref} scroll={false} className={`project-details-link ${styles.detailsLink}`}>
              {t("actions.viewProject")}<span className="sr-only">: {project.title}</span>
              <span className={styles.arrow}><ArrowRight className="size-4" aria-hidden="true" /></span>
            </Link>
          </div>

          {externalLinks.length > 0 && (
            <div className={styles.externalLinks}>
              {externalLinks.map(link => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {t(`actions.${link.label}`)}<ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}
