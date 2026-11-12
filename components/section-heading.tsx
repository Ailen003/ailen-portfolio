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
    <Reveal className="section-heading mb-10 md:mb-14">
      <div aria-hidden="true" className="mb-5 flex items-center gap-3">
        <span className="section-index">{index}</span>
        <span className="section-rule" /><span className="section-corner" />
      </div>
      <h2 id={headingId} className="section-title text-balance">{title}</h2>
      {subtitle && <p className="section-copy mt-4 max-w-2xl text-pretty text-muted-foreground">{subtitle}</p>}
    </Reveal>
  )
}
