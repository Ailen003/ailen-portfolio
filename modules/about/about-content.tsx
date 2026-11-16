import { getTranslations } from "next-intl/server"
import { EditorialHeading } from "@/components/editorial-heading"
import { Reveal } from "@/components/reveal"
import { aboutValues } from "./lib/data/about.data"
import { fetchAboutData } from "./lib/actions/about.action"
import styles from "@/components/portfolio-sections.module.css"

export async function About() {
  const t = await getTranslations("about")
  const result = await fetchAboutData()
  if (!result.ok) return null
  const { p1, p2, p3, values, facts } = result.data
  const factsData = [facts.basedIn, facts.experience, facts.focus, facts.languages]
  const valuesData = [values.productMinded, values.craftQuality, values.collaborative, values.alwaysLearning]

  return (
    <section id="about" aria-labelledby="about-heading" className={styles.section}>
      <div className="site-container">
        <div className={styles.aboutLayout}>
          <div>
            <EditorialHeading index="01" title={t("title")} headingId="about-heading" />
            <Reveal><dl className={styles.facts}>
              {factsData.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
            </dl></Reveal>
          </div>
          <Reveal className={styles.story}>
            <p className={styles.lead}>{p1}</p>
            <div className={styles.storyBody}><p>{p2}</p><p>{p3}</p></div>
          </Reveal>
        </div>
        <div className={styles.values}>
          {aboutValues.map((value, i) => <Reveal key={valuesData[i].title} delay={i * 60}>
            <article className={styles.value}>
              <span className={styles.valueIcon}><value.icon size={22} strokeWidth={1.4} aria-hidden="true" /></span>
              <h3>{valuesData[i].title}</h3><p>{valuesData[i].description}</p>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>
  )
}
