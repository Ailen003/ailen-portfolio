import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { aboutValues, aboutFacts } from "./lib/data/about.data"

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 dot-grid-pattern opacity-70" />

      <svg className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] opacity-[0.06]" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="400" cy="400" r="160" stroke="oklch(0.6 0.12 175)" strokeWidth="1.5" fill="none" />
        <circle cx="400" cy="400" r="260" stroke="oklch(0.6 0.12 175)" strokeWidth="1" fill="none" />
        <circle cx="400" cy="400" r="360" stroke="oklch(0.6 0.12 175)" strokeWidth="0.75" fill="none" />
      </svg>

      <div className="pointer-events-none absolute -left-24 -top-8 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-primary/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 -bottom-8 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeading index="01" title="About me" />

      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            {
              "I'm a senior software engineer who loves turning complex problems into simple, reliable products. My favorite work lives at the intersection of design and engineering — interfaces that feel effortless and are built to scale."
            }
          </p>
          <p>
            {
              "Over the past eight years I've worked across startups and product studios, leading frontend architecture, building design systems, and shipping features used by millions. I believe the best engineering is invisible: fast, accessible, and dependable."
            }
          </p>
          <p>
            {
              "When I'm not coding, you'll find me sketching UI ideas, contributing to open source, or running along the coast with a good podcast."
            }
          </p>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {aboutFacts.map((f) => (
              <div key={f.label} className="bg-card p-4">
                <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{f.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="grid gap-4">
          {aboutValues.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="group flex gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <v.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
