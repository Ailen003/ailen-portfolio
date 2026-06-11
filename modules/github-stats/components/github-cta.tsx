import { ArrowUpRight } from "lucide-react"
import { SiGithub } from "react-icons/si"

interface GithubCtaProps {
  profileUrl: string
  login: string
}

export function GithubCta({ profileUrl, login }: GithubCtaProps) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/10"
    >
      <SiGithub className="h-4 w-4" aria-hidden />
      <span>@{login}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </a>
  )
}
