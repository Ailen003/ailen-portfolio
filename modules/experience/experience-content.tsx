import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { experienceRoles } from "./lib/data/experience.data"
import AvatarContainer from "@/components/ui/avatar-container"

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden border-y border-border bg-secondary/50 crosshatch-pattern py-24">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-linear-to-b from-transparent via-primary/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          title="Experience"
          subtitle="Where I've worked and the impact I've made along the way."
        />

        <ol className="relative space-y-4 before:absolute before:left-[7px] before:top-2 before:hidden before:h-[calc(100%-1rem)] before:w-px before:bg-border md:before:block">
          {experienceRoles.map((r, i) => (
            <Reveal key={r.company} delay={i * 90} as="li">
              <div className="relative md:pl-12">
                <span className="absolute left-0 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background md:block" />
                <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <AvatarContainer
                      image={r.logo}
                      fallback={r.company.charAt(0)}
                      className="h-10 w-10 shrink-0 rounded-lg border border-border bg-secondary"
                      avatarFallbackClassName="rounded-lg text-sm font-bold"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-bold tracking-tight">
                        {r.role} <span className="text-primary">· {r.company}</span>
                      </h3>
                      <span className="font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {r.period}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {r.achievements.map((a) => (
                      <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {r.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
