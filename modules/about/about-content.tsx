import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { aboutValues } from "./lib/data/about.data"
import { fetchAboutData } from "./lib/actions/about.action"

export async function About() {
  const result = await fetchAboutData()

  if (!result.ok) return null

  const { title, p1, p2, p3, values, facts } = result.data

  const factsData = [
    { key: "basedIn",    label: facts.basedIn.label,    value: facts.basedIn.value },
    { key: "experience", label: facts.experience.label, value: facts.experience.value },
    { key: "focus",      label: facts.focus.label,      value: facts.focus.value },
    { key: "languages",  label: facts.languages.label,  value: facts.languages.value },
  ]

  const valuesData = [
    { title: values.productMinded.title,  description: values.productMinded.description },
    { title: values.craftQuality.title,   description: values.craftQuality.description },
    { title: values.collaborative.title,  description: values.collaborative.description },
    { title: values.alwaysLearning.title, description: values.alwaysLearning.description },
  ]

  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 dot-grid-pattern opacity-70" />

      <svg className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] opacity-[0.06]" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="400" cy="400" r="160" stroke="oklch(0.6 0.12 175)" strokeWidth="1.5" fill="none" />
        <circle cx="400" cy="400" r="260" stroke="oklch(0.6 0.12 175)" strokeWidth="1" fill="none" />
        <circle cx="400" cy="400" r="360" stroke="oklch(0.6 0.12 175)" strokeWidth="0.75" fill="none" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="01" title={title} headingId="about-heading" />

        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>{p1}</p>
            <p>{p2}</p>
            <p>{p3}</p>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
              {factsData.map((f) => (
                <div key={f.key} className="bg-card p-4">
                  <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{f.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="grid gap-4">
            {aboutValues.map((v, i) => (
              <Reveal key={valuesData[i].title} delay={i * 80}>
                <div className="group flex gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{valuesData[i].title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{valuesData[i].description}</p>
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
