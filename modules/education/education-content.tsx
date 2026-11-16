import { getTranslations } from "next-intl/server"
import { EditorialHeading } from "@/components/editorial-heading"
import { Reveal } from "@/components/reveal"
import { GraduationCap, Award } from "lucide-react"
import { fetchEducationData } from "./lib/actions/education.action"
import styles from "@/components/portfolio-sections.module.css"

export async function Education() {
  const t = await getTranslations("education")
  const result = await fetchEducationData()
  if (!result.ok) return null
  const { entries, certifications } = result.data
  return (
    <section id="education" aria-labelledby="education-heading" className={styles.section}>
      <div className="site-container">
        <EditorialHeading index="05" title={t("title")} subtitle={t("subtitle")} headingId="education-heading" />
        <div className={styles.educationLayout}>
          <Reveal className={styles.educationJourney}>
            <h3 className={styles.groupTitle}><GraduationCap size={20} strokeWidth={1.5} aria-hidden="true" />{t("sectionEducation")}</h3>
            <ol className={styles.timeline}>
              {entries.map(entry => <li key={`${entry.title}-${entry.period}`}>
                <span className={styles.period}>{entry.period}</span>
                <h4>{entry.title}</h4><p className={styles.institution}>{entry.org}</p><p>{entry.detail}</p>
              </li>)}
            </ol>
          </Reveal>
          <Reveal className={styles.credentials} delay={80}>
            <h3 className={styles.groupTitle}><Award size={20} strokeWidth={1.5} aria-hidden="true" />{t("sectionCertifications")}</h3>
            <ul>{certifications.map(cert => <li key={cert.title}>
              <span className={styles.certYear}>{cert.year}</span>
              <div><h4>{cert.title}</h4><p>{cert.org}</p>{cert.description && <p>{cert.description}</p>}</div>
            </li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
