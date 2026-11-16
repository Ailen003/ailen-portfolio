import { Plus } from "lucide-react"
import type { Service } from "../lib/types/services.types"
import styles from "@/components/portfolio-sections.module.css"

interface ServiceCardProps {
  service: Service
  idealForLabel: string
  index: number
}

export function ServiceCard({ service, idealForLabel, index }: ServiceCardProps) {
  const { icon: Icon, title, tagline, bullets, idealFor } = service
  return (
    <details className={styles.service} open={index === 0}>
      <summary>
        <span className={styles.ordinal} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <h3>{title}</h3>
        <span className={styles.serviceToggle}><Plus size={20} strokeWidth={1.5} aria-hidden="true" /></span>
      </summary>
      <div className={styles.serviceBody}>
        <div className={styles.serviceIntro}><Icon width={26} height={26} strokeWidth={1.3} aria-hidden="true" /><p>{tagline}</p></div>
        <div><ul>{bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
          <p className={styles.idealFor}><span>{idealForLabel}</span>{idealFor}</p>
        </div>
      </div>
    </details>
  )
}
