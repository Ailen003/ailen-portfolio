import type { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { absoluteUrl, DEFAULT_LOCALE, localePath, PERSON_NAME } from "@/lib/seo/site-config"
import { buildProjectSchema } from "@/lib/seo/structured-data"
import { getEndToEndProjectBySlug, getProjectsData } from "@/modules/projects/lib/services/projects.service"
import { ProjectDetail } from "@/modules/projects/detail/project-detail"
import { ProjectScrollToTop } from "@/modules/projects/components/project-scroll-to-top"

type ProjectPageProps = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return getProjectsData(params.locale).endToEnd.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const project = getEndToEndProjectBySlug(locale, slug)
  if (!project) notFound()

  const path = `projects/${project.slug}`
  const title = `${project.title} — ${PERSON_NAME}`
  const description = project.tagline || project.description.slice(0, 180)
  const languages = Object.fromEntries(routing.locales.map((language) => [language, localePath(language, path)]))
  languages["x-default"] = localePath(DEFAULT_LOCALE, path)
  const seo = await getTranslations({ locale, namespace: "seo" })
  const image = project.image && !project.image.startsWith("/placeholder") ? project.image : undefined
  const images = image ? [{ url: absoluteUrl(image), alt: project.title }] : (await parent).openGraph?.images

  return {
    title,
    description,
    ...(project.isExample ? { robots: { index: false, follow: true } } : {}),
    alternates: { canonical: localePath(locale, path), languages },
    openGraph: { title, description, type: "website", url: localePath(locale, path), siteName: seo("siteName"), locale, alternateLocale: routing.locales.filter((language) => language !== locale), images },
    twitter: { card: "summary_large_image", title, description, images },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const project = getEndToEndProjectBySlug(locale, slug)
  if (!project) notFound()
  const t = await getTranslations({ locale, namespace: "projects" })

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-20">
        <ProjectScrollToTop projectKey={`${locale}/${project.slug}`} />
        <JsonLd data={buildProjectSchema(project, locale)} />
        <div className="site-container py-3 sm:py-4">
          <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"><ArrowLeft className="size-3.5" aria-hidden="true" />{t("detail.back")}</Link>
        </div>
        <ProjectDetail project={project} locale={locale} />
        <div className="contact-section border-t border-border">
          <div className="site-container flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">{t("detail.contactTitle")}</p>
            <Link href="/#contact" className="button-primary w-fit">{t("detail.contactAction")}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
