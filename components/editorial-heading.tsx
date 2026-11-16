import { Reveal } from "@/components/reveal"
import styles from "./portfolio-sections.module.css"

interface EditorialHeadingProps {
  index: string
  title: string
  subtitle?: string
  headingId: string
}

export function EditorialHeading({ index, title, subtitle, headingId }: EditorialHeadingProps) {
  const split = title.lastIndexOf(" ")
  return (
    <Reveal className={styles.heading}>
      <span className={styles.sectionNumber} aria-hidden="true">{index}<span /></span>
      <h2 id={headingId}>{split < 0 ? <em>{title}</em> : <>{title.slice(0, split)} <em>{title.slice(split + 1)}</em></>}</h2>
      {subtitle && <p>{subtitle}</p>}
    </Reveal>
  )
}
