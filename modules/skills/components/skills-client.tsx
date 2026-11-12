"use client"

import { useTranslations } from "next-intl"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { marqueeSkills, skillCategories } from "../lib/data/skills.data"
import { SkillIcon } from "./skill-icon"
import type { SkillsData } from "../lib/types/skills.types"

interface SkillsClientProps {
  data: SkillsData
}

export function SkillsClient({ data }: SkillsClientProps) {
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
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden border-y border-border section-inset section-space"
    >
      <div className="site-container relative">
        <SectionHeading
          index="02"
          title={data.title}
          subtitle={data.subtitle}
          headingId="skills-heading"
        />


            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
              {categories.map((cat, i) => (
                <Reveal key={cat.title} delay={i * 90}>
                  <article className="group relative h-full overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-7">


                    <header className="mb-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-accent text-primary transition-colors duration-300 group-hover:border-primary/40">
                        <cat.icon className="h-6 w-6" aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
                        <p className="text-sm text-muted-foreground">{cat.tagline}</p>
                      </div>
                    </header>

                    <ul className="grid grid-cols-3 gap-3">
                      {cat.skills.map((skill) => (
                        <SkillIcon key={skill.name} skill={skill} />
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>

      </div>

      {/* ── Marquee strip of brand icons (shared) ───────────────────────── */}
      <div className="group/marquee relative mt-16 flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...marqueeSkills, ...marqueeSkills].map((item, i) => (
            <span key={`${item.name}-${i}`} className="flex items-center gap-3" title={item.name}>
              <item.Icon className="h-7 w-7" style={{ color: item.color === "#111111" ? "var(--foreground)" : item.color }} aria-hidden />
              <span className="whitespace-nowrap font-mono text-sm font-medium text-foreground/60">
                {item.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
