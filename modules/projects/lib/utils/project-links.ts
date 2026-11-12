import type { EndToEndProject } from "../types/project.types"

export function isRepositoryUrl(url: string): boolean {
  return /^https?:\/\/(?:www\.)?(?:github\.com|gitlab\.com|bitbucket\.org)\//i.test(url)
}

export function getProjectExternalLinks(project: EndToEndProject) {
  const candidates = [
    { href: project.demo, label: "liveDemo", primary: true },
    { href: project.company?.url, label: "companyWebsite", primary: false },
    { href: project.source, label: isRepositoryUrl(project.source) ? "viewRepository" : "reference", primary: false },
  ]
  const seen = new Set<string>()

  return candidates.flatMap((link) => {
    if (!link.href) return []
    try {
      const url = new URL(link.href)
      if (url.protocol !== "https:" && url.protocol !== "http:") return []
      const identity = `${url.hostname.replace(/^www\./, "")}${url.port ? `:${url.port}` : ""}${url.pathname.replace(/\/$/, "")}${url.search}${url.hash}`
      if (seen.has(identity)) return []
      seen.add(identity)
      return [{ ...link, href: url.href }]
    } catch {
      return []
    }
  })
}
