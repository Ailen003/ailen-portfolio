import { heroSocials } from "@/modules/hero/lib/data/hero.data"
import { contactChannels, contactSocials } from "@/modules/contact/lib/data/contact.data"
import { aboutFacts } from "@/modules/about/lib/data/about.data"
import { routing } from "@/i18n/routing"

/**
 * Central, data-driven SEO configuration.
 *
 * Everything here is derived from the existing module data so that when you
 * update your portfolio content (socials, location, etc.) the SEO metadata,
 * structured data and Open Graph images stay in sync automatically.
 */

/** Person/brand name. Keep in sync with the Hero headline. */
export const PERSON_NAME = "Elena Vargas"

/** Default placeholder used when NEXT_PUBLIC_SITE_URL is not set. */
const FALLBACK_SITE_URL = "http://localhost:3000"

/**
 * Returns the canonical production origin (no trailing slash).
 * Configure via the `NEXT_PUBLIC_SITE_URL` environment variable before deploy.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL
  return raw.replace(/\/+$/, "")
}

/** Builds an absolute URL from a path, using the configured site origin. */
export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl()
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`
}

/** All locales handled by the app (from next-intl routing). */
export const LOCALES = routing.locales
export const DEFAULT_LOCALE = routing.defaultLocale
export type AppLocale = (typeof LOCALES)[number]

/**
 * Localized path for a given locale. next-intl uses the `always` prefix
 * strategy, so every locale (including the default) is prefixed.
 */
export function localePath(locale: string, path = ""): string {
  const clean = path.replace(/^\/+/, "")
  return clean ? `/${locale}/${clean}` : `/${locale}`
}

/**
 * Absolute social/profile links used for schema.org `sameAs`.
 * Collected from the hero + contact data and de-duplicated; only real
 * external URLs are kept (anchors like `#contact` are excluded).
 */
export function getSameAs(): string[] {
  const candidates = [
    ...heroSocials.map((s) => s.href),
    ...contactSocials.map((s) => s.href),
  ]
  const external = candidates.filter((href) => /^https?:\/\//i.test(href))
  return Array.from(new Set(external))
}

/** Public contact email, if present in the contact channels. */
export function getContactEmail(): string | undefined {
  const email = contactChannels.find((c) => c.href?.startsWith("mailto:"))
  return email?.href?.replace(/^mailto:/, "")
}

/** Location string ("Based in" fact), if present. */
export function getLocation(): string | undefined {
  const based = aboutFacts.find((f) => /based/i.test(f.label))
  return based?.value
}
