import { Reveal } from "@/components/reveal"

interface SectionHeadingProps {
  index: string
  title: string
  subtitle?: string
  /** Optional id for the heading, used as the section's accessible name. */
  headingId?: string
}

export function SectionHeading({ index, title, subtitle, headingId }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-medium text-primary">{index}</span>
        <span className="h-px w-12 bg-primary/40" />
      </div>
      <h2 id={headingId} className="mt-3 text-balance text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">{subtitle}</p>}
    </Reveal>
  )
}
