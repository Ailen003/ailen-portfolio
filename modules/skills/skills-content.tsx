import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { skillCategories, marqueeSkills } from "./lib/data/skills.data"

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden border-y border-border bg-secondary/60 diagonal-stripe-pattern py-24">
      <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 relative">
        <SectionHeading
          index="02"
          title="Technical skills"
          subtitle="A toolkit refined across products and teams — chosen for reliability, not hype."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 90}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="relative mt-16 flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-4 pr-4">
          {[...marqueeSkills, ...marqueeSkills].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="whitespace-nowrap font-mono text-2xl font-semibold text-muted-foreground/40"
            >
              {item}
              <span className="px-4 text-primary/40">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
