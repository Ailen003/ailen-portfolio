import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { GraduationCap, Award, BookOpen } from "lucide-react"
import { educationEntries, certifications } from "./lib/data/education.data"

export function Education() {
  return (
    <section id="education" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 circuit-dot-pattern" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-accent/20 via-transparent to-transparent" />


      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeading
        index="05"
        title="Education & certifications"
        subtitle="Formal training and the credentials I've earned to keep my craft sharp."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border border-border bg-card p-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                <GraduationCap className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold tracking-tight">Education</h3>
            </div>
            <div className="space-y-6">
              {educationEntries.map((e) => (
                <div key={e.title} className="border-l-2 border-border pl-5">
                  <span className="font-mono text-xs uppercase tracking-wide text-primary">{e.period}</span>
                  <h4 className="mt-1 font-semibold text-foreground">{e.title}</h4>
                  <p className="text-sm font-medium text-muted-foreground">{e.org}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="h-full rounded-3xl border border-border bg-card p-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                <Award className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold tracking-tight">Certifications</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li
                  key={c.title}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/50 p-4 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-start gap-3">
                    <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{c.title}</h4>
                      <p className="text-xs text-muted-foreground">{c.org}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{c.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      </div>
    </section>
  )
}
