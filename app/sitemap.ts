import type { MetadataRoute } from "next"
import { absoluteUrl, localePath, LOCALES, DEFAULT_LOCALE } from "@/lib/seo/site-config"
import { getProjectsData } from "@/modules/projects/lib/services/projects.service"

/**
 * Localized sitemap. One entry per locale root, each exposing hreflang
 * alternates so Google serves the right language version.
 *
 * Includes published end-to-end case studies; examples stay out of search.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((l) => [l, absoluteUrl(localePath(l))]),
  )
  languages["x-default"] = absoluteUrl(localePath(DEFAULT_LOCALE))

  const homeEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: absoluteUrl(localePath(locale)),
    lastModified,
    changeFrequency: "monthly",
    priority: locale === DEFAULT_LOCALE ? 1 : 0.9,
    alternates: { languages },
  }))

  const projectEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    getProjectsData(locale).endToEnd.filter((project) => !project.isExample).map((project) => {
      const path = `projects/${project.slug}`
      const languages: Record<string, string> = Object.fromEntries(
        LOCALES.map((language) => [language, absoluteUrl(localePath(language, path))]),
      )
      languages["x-default"] = absoluteUrl(localePath(DEFAULT_LOCALE, path))
      return {
        url: absoluteUrl(localePath(locale, path)),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages },
      }
    }),
  )

  return [...homeEntries, ...projectEntries]
}
