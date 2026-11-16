import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"
import styles from "@/components/portfolio-continuity.module.css"

interface ProjectLevelSectionProps {
  number: string
  title: string
  description: string
  emptyLabel: string
  isEmpty?: boolean
  controls?: ReactNode
  children: ReactNode
}

export function ProjectLevelSection({
  number,
  title,
  description,
  emptyLabel,
  isEmpty = false,
  controls,
  children,
}: ProjectLevelSectionProps) {
  return (
    <section aria-label={title} className="project-level mt-16 first:mt-0">
      <Reveal>
        <div className="mb-4 flex items-start gap-4">
          <div className="flex shrink-0 flex-col items-center">
            <span className={styles.projectNumber}>
              {number}
            </span>
            <div className="mt-2 h-full w-px bg-border" />
          </div>
          <div className="pb-2 pt-1">
            <h3 className="text-lg font-medium tracking-tight">{title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        </div>
      </Reveal>

      {controls}

      {isEmpty ? (
        <Reveal>
          <p className="ml-13 text-sm italic text-muted-foreground/60">{emptyLabel}</p>
        </Reveal>
      ) : (
        children
      )}
    </section>
  )
}
