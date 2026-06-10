import type { MetadataRoute } from "next"
import { absoluteUrl, localePath, LOCALES, DEFAULT_LOCALE } from "@/lib/seo/site-config"

/**
 * Localized sitemap. One entry per locale root, each exposing hreflang
 * alternates so Google serves the right language version.
 *
 * Designed to be extended: when per-project routes are added, push extra
 * entries (with their own `alternates.languages`) into the array.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((l) => [l, absoluteUrl(localePath(l))]),
  )
  languages["x-default"] = absoluteUrl(localePath(DEFAULT_LOCALE))

  return LOCALES.map((locale) => ({
    url: absoluteUrl(localePath(locale)),
    lastModified,
    changeFrequency: "monthly",
    priority: locale === DEFAULT_LOCALE ? 1 : 0.9,
    alternates: { languages },
  }))
}
