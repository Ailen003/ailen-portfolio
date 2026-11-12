import { ChevronDown } from "lucide-react"

interface CaseStudyNavigationProps {
  sections: { id: string; title: string }[]
  label: string
}

export function CaseStudyNavigation({ sections, label }: CaseStudyNavigationProps) {
  if (sections.length < 2) return null

  const links = (
    <ol className="case-index-links">
      {sections.map((section, index) => (
        <li key={section.id}>
          <a href={`#${section.id}`}>
            <span aria-hidden="true" className="font-mono text-[10px] text-primary">{String(index + 1).padStart(2, "0")}</span>
            <span>{section.title}</span>
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <nav aria-label={label} className="case-index">
      <div className="hidden lg:block">
        <p className="eyebrow mb-4">{label}</p>
        {links}
      </div>
      <details className="group lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          {label}<ChevronDown className="size-4 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        {links}
      </details>
    </nav>
  )
}
