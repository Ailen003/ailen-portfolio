import styles from "@/components/portfolio-sections.module.css"

interface ServicesProcessProps {
  steps: { number: string; label: string; description: string }[]
}

export function ServicesProcess({ steps }: ServicesProcessProps) {
  return (
    <ol className={styles.process}>
      {steps.map(step => <li key={step.number}>
        <span className={styles.processNumber} aria-hidden="true">{step.number}</span>
        <h3>{step.label}</h3><p>{step.description}</p>
      </li>)}
    </ol>
  )
}
