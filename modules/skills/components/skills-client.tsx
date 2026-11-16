"use client"

import { useTranslations } from "next-intl"
import { EditorialHeading } from "@/components/editorial-heading"
import { Reveal } from "@/components/reveal"
import { skillCategories } from "../lib/data/skills.data"
import { SkillIcon } from "./skill-icon"
import type { SkillsData } from "../lib/types/skills.types"
import styles from "@/components/portfolio-sections.module.css"

export function SkillsClient({ data }: { data: SkillsData }) {
  const t = useTranslations("skills")
  const categoryKeys = ["frontend", "backend", "dataInfra", "toolingPractices"]
  const categories = skillCategories.map((cat, index) => {
    const key = categoryKeys[index]
    const title = t(`categories.${key}.title`)
    return { ...cat, title, tagline: t(`categories.${key}.tagline`), skills: cat.skills.map(skill => {
      const key = skill.name.replace(/[^a-zA-Z0-9]/g, "")
      return { ...skill, group: title, description: t.has(`skillDescriptions.${key}`) ? t(`skillDescriptions.${key}`) : skill.description }
    }) }
  })
  return (
    <section id="skills" aria-labelledby="skills-heading" className={`${styles.section} ${styles.skillsSection}`}>
      <div className="site-container">
        <EditorialHeading index="02" title={data.title} subtitle={data.subtitle} headingId="skills-heading" />
        <div className={styles.skillCatalog}>
          {categories.map((cat, i) => <Reveal key={cat.title} delay={i * 60}>
            <article className={styles.skillRow}>
              <header className={styles.categoryHeader}>
                <span className={styles.ordinal} aria-hidden="true">0{i + 1}</span>
                <div><cat.icon width={24} height={24} strokeWidth={1.4} aria-hidden="true" /><h3>{cat.title}</h3><p>{cat.tagline}</p></div>
              </header>
              <ul className={styles.skillGrid}>{cat.skills.map(skill => <SkillIcon key={skill.name} skill={skill} />)}</ul>
            </article>
          </Reveal>)}
        </div>
      </div>
    </section>
  )
}
