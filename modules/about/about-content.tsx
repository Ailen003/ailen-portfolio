import { getTranslations } from "next-intl/server"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { aboutValues } from "./lib/data/about.data"
import { fetchAboutData } from "./lib/actions/about.action"

export async function About() {
  const t = await getTranslations("about")
  const result = await fetchAboutData()

  if (!result.ok) return null

  const { p1, p2, p3, values, facts } = result.data

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
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden section-space">


      <div className="site-container relative">
        <SectionHeading index="01" title={t("title")} headingId="about-heading" />

        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="section-copy space-y-5 text-muted-foreground">
            <p>{p1}</p>
            <p>{p2}</p>
            <p>{p3}</p>

            <dl className="paper-card grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
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
                <div className="paper-card group flex gap-4 border border-border p-5 transition-all hover:-translate-y-0.5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
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
