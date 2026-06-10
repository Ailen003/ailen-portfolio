import { getAllSkills } from "@/modules/skills/lib/data/skills.data"
import { educationEntries } from "@/modules/education/lib/data/education.data"
import { endToEndProjects } from "@/modules/projects/lib/data/projects.data"
import {
  PERSON_NAME,
  absoluteUrl,
  getSameAs,
  getContactEmail,
  getLocation,
  localePath,
} from "./site-config"

/**
 * Builders that map the existing portfolio data into schema.org JSON-LD.
 *
 * They are intentionally data-driven: editing the module data files keeps the
 * structured data accurate without touching this file. Localized strings
 * (title, description, jobTitle) are passed in by the caller so the output
 * matches the active locale.
 */

interface LocalizedSeoStrings {
  locale: string
  siteName: string
  jobTitle: string
  description: string
}

type JsonLd = Record<string, unknown>

/** schema.org Person describing the portfolio owner. */
export function buildPersonSchema({
  locale,
  jobTitle,
  description,
}: LocalizedSeoStrings): JsonLd {
  const location = getLocation()
  const email = getContactEmail()

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${absoluteUrl(localePath(locale))}#person`,
    name: PERSON_NAME,
    url: absoluteUrl(localePath(locale)),
    jobTitle,
    description,
    knowsAbout: getAllSkills().map((s) => s.name),
    alumniOf: educationEntries.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.org,
    })),
    sameAs: getSameAs(),
    ...(email ? { email } : {}),
    ...(location
      ? { address: { "@type": "PostalAddress", addressLocality: location } }
      : {}),
  }
}

/** schema.org WebSite for the portfolio. */
export function buildWebSiteSchema({
  locale,
  siteName,
  description,
}: LocalizedSeoStrings): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl()}#website`,
    url: absoluteUrl(localePath(locale)),
    name: siteName,
    description,
    inLanguage: locale,
    author: { "@id": `${absoluteUrl(localePath(locale))}#person` },
  }
}

/** schema.org ProfilePage tying the page to its main Person entity. */
export function buildProfilePageSchema({
  locale,
  description,
}: LocalizedSeoStrings): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(localePath(locale)),
    inLanguage: locale,
    description,
    mainEntity: { "@id": `${absoluteUrl(localePath(locale))}#person` },
  }
}

/**
 * schema.org ItemList of featured projects (CreativeWork).
 * Built from the end-to-end projects data; ready to point at dedicated
 * project routes once they exist.
 */
export function buildProjectsItemList({ locale }: LocalizedSeoStrings): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected projects",
    inLanguage: locale,
    itemListElement: endToEndProjects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        headline: p.tagline,
        description: p.description,
        keywords: p.tags.join(", "),
        ...(p.year ? { dateCreated: String(p.year) } : {}),
        ...(p.source ? { codeRepository: p.source } : {}),
        ...(p.demo ? { url: p.demo } : {}),
        author: { "@id": `${absoluteUrl(localePath(locale))}#person` },
      },
    })),
  }
}

/** Assembles the full set of JSON-LD graphs for the home page. */
export function buildPortfolioJsonLd(strings: LocalizedSeoStrings): JsonLd[] {
  return [
    buildPersonSchema(strings),
    buildWebSiteSchema(strings),
    buildProfilePageSchema(strings),
    buildProjectsItemList(strings),
  ]
}
