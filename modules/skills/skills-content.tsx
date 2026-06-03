"use client"

import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { marqueeSkills, skillCategories } from "./lib/data/skills.data"
import { SkillIcon } from "./components/skill-icon"


export function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y border-border bg-secondary/30 diagonal-stripe-pattern py-24"
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          title="Technical skills"
          subtitle="A toolkit refined across products and teams. Click any skill to see my experience in detail."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 90}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-7">
                {/* subtle glow that follows the card on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <header className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-accent text-primary transition-colors duration-300 group-hover:border-primary/40">
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

      {/* Marquee strip of brand icons */}
      <div className="group/marquee relative mt-16 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...marqueeSkills, ...marqueeSkills].map((item, i) => (
            <span key={`${item.name}-${i}`} className="flex items-center gap-3" title={item.name}>
              <item.Icon className="h-7 w-7 text-muted-foreground/50" aria-hidden />
              <span className="whitespace-nowrap font-mono text-sm font-medium text-muted-foreground/40">
                {item.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
