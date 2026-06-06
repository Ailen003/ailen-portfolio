import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"

interface ProjectLevelSectionProps {
  number: string
  title: string
  description: string
  isEmpty?: boolean
  children: ReactNode
}

export function ProjectLevelSection({
  number,
  title,
  description,
  isEmpty = false,
  children,
}: ProjectLevelSectionProps) {
  return (
    <section className="mt-16 first:mt-0">
      <Reveal>
        <div className="mb-8 flex items-start gap-4">
          <div className="flex shrink-0 flex-col items-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/8 font-mono text-sm font-bold text-primary">
              {number}
            </span>
            <div className="mt-2 h-full w-px bg-border" />
          </div>
          <div className="pb-2 pt-1">
            <h3 className="text-xl font-bold tracking-tight">{title}</h3>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </Reveal>

      {isEmpty ? (
        <Reveal>
          <p className="ml-13 text-sm italic text-muted-foreground/60">No projects match the current filter.</p>
        </Reveal>
      ) : (
        children
      )}
    </section>
  )
}
