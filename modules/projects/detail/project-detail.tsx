import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { ArrowUpRight } from "lucide-react"
import { DesignGeometry } from "@/components/design-geometry"
import { Reveal } from "@/components/reveal"
import { CaseStudyNavigation } from "../components/case-study-navigation"
import { ProjectImageLightbox } from "../components/project-image-lightbox"
import { ProjectMarkdown } from "../components/project-markdown"
import { getProjectExternalLinks } from "../lib/utils/project-links"
import type { EndToEndProject } from "../lib/types/project.types"

interface ProjectDetailProps {
  project: EndToEndProject
  locale: string
}

/** One shared presentation for every end-to-end project, in either language. */
export async function ProjectDetail({ project, locale }: ProjectDetailProps) {
  const t = await getTranslations({ locale, namespace: "projects" })
  const gallery = Array.from(new Set(project.images?.filter(Boolean) ?? []))
  const externalLinks = getProjectExternalLinks(project)
  const heroTags = project.tags.slice(0, 6)
  const remainingTags = project.tags.length - heroTags.length
  const engagement = project.engagement ?? (project.company ? "employee" : undefined)
  const meta = [
    { label: t("detail.company"), value: project.company?.name },
    { label: t("detail.engagement"), value: engagement ? t(`engagementLabels.${engagement}`) : undefined },
    { label: t("detail.year"), value: project.year?.toString() },
    { label: t("detail.participation"), value: project.teamSize },
    { label: t("detail.status"), value: project.status ? t(`statusLabels.${project.status}`) : undefined },
  ].filter((item) => item.value)

  // The index and the content use the same list: optional fields never leave empty sections.
  const sections = [
    {
      id: "project-overview", title: t("detail.overview"), available: true,
      content: <p className="case-prose">{project.description}</p>,
    },
    {
      id: "project-contribution", title: t("detail.contribution"), available: Boolean(project.highlights?.length),
      content: <ul className="case-bullet-list">{project.highlights?.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>,
    },
    {
      id: "project-gallery", title: t("modal.screenshots"), available: gallery.length > 0,
      content: <ProjectImageLightbox images={gallery} projectTitle={project.title} />,
    },
    {
      id: "project-technical", title: t("modal.technicalNotes"), available: Boolean(project.technicalNotes?.trim()),
      content: <ProjectMarkdown content={project.technicalNotes ?? ""} variant="case-study" />,
    },
  ].filter((section) => section.available)

  return (
    <article className="case-study site-container pb-20">
      <header id="home" className="case-hero relative isolate">
        <DesignGeometry className="case-hero-geometry" />
        <div className="case-hero-copy relative min-w-0">
          <p className="eyebrow mb-3 flex items-center gap-3"><span aria-hidden="true" className="h-px w-8 shrink-0 bg-primary" />{t("detail.kicker")}</p>
          {project.isExample && <p className="paper-label mb-3 w-fit">{t("example")}</p>}
          <h1 className="case-title text-balance">{project.title}</h1>
          <p className="mt-3 max-w-xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">{project.tagline}</p>
          <ul aria-label={t("detail.technologies")} className="mt-4 flex flex-wrap gap-1.5">
            {heroTags.map((tag) => <li key={tag} className="paper-label border border-border bg-card/70 px-2.5 py-1 text-muted-foreground">{tag}</li>)}
            {remainingTags > 0 && (
              <li className="inline-flex"><a href="#project-stack" className="paper-label border-primary/25 bg-primary/5 px-2.5 py-1 text-primary underline-offset-4 hover:underline" aria-label={t("detail.technologies")}>{t("tagsMore", { count: remainingTags })}</a></li>
            )}
          </ul>
          {externalLinks.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {externalLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={link.primary ? "button-primary" : "button-secondary"}>
                  {t(`actions.${link.label}`)}<ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>

        <Reveal className="case-cover paper-card relative min-w-0 overflow-hidden">
          <Image src={project.image || "/placeholder.svg"} alt={t("coverAlt", { title: project.title })} fill preload sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, (min-width: 768px) 70vw, 100vw" className="object-contain p-3 sm:p-5" />
        </Reveal>
      </header>

      <div className="grid items-start gap-12 border-t border-border pt-10 lg:grid-cols-[0.65fr_1.5fr] lg:gap-20 lg:pt-14">
        <aside className="case-sidebar min-w-0" aria-labelledby="project-facts-heading">
          <h2 id="project-facts-heading" className="eyebrow mb-6">{t("detail.atGlance")}</h2>
          <dl className="case-metadata divide-y divide-border border-y border-border">
            {meta.map((item) => <div key={item.label} className="py-4"><dt className="text-xs text-muted-foreground">{item.label}</dt><dd className="mt-1.5 text-sm font-medium leading-6">{item.value}</dd></div>)}
            {project.categories.length > 0 && (
              <div className="py-4"><dt className="text-xs text-muted-foreground">{t("detail.disciplines")}</dt><dd className="mt-2 flex flex-wrap gap-2">{project.categories.map((category) => <span key={category} className="paper-label border border-border px-2 py-1">{t(`categoryLabels.${category}`)}</span>)}</dd></div>
            )}
          </dl>
          {project.tags.length > 0 && (
            <div id="project-stack" tabIndex={-1} className="mt-6 scroll-mt-28">
              <h3 className="eyebrow mb-3">{t("detail.technologies")}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => <li key={tag} className="paper-label">{tag}</li>)}
              </ul>
            </div>
          )}
          <CaseStudyNavigation label={t("detail.contents")} sections={sections.map(({ id, title }) => ({ id, title }))} />
        </aside>

        <div className="case-content min-w-0">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} tabIndex={-1} aria-labelledby={`${section.id}-heading`} className="case-section">
              <div className="mb-6 flex items-start gap-4">
                <span aria-hidden="true" className="section-index mt-2">{String(index + 1).padStart(2, "0")}</span>
                <h2 id={`${section.id}-heading`} className="text-xl font-medium tracking-tight sm:text-2xl">{section.title}</h2>
              </div>
              {section.content}
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
