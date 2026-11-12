import { getTranslations } from "next-intl/server"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { GraduationCap, Award, BookOpen } from "lucide-react"
import { fetchEducationData } from "./lib/actions/education.action"

export async function Education() {
  const t = await getTranslations("education")
  const result = await fetchEducationData()

  if (!result.ok) return null

  const { entries, certifications } = result.data

  return (
    <section id="education" aria-labelledby="education-heading" className="relative overflow-hidden section-space">


      <div className="site-container relative">
      <SectionHeading
        index="05"
        title={t("title")}
        subtitle={t("subtitle")}
        headingId="education-heading"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="paper-card h-full border border-border p-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-accent text-primary">
                <GraduationCap className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold tracking-tight">{t("sectionEducation")}</h3>
            </div>
            <div className="space-y-6">
              {entries.map((e) => (
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
          <div className="paper-card h-full border border-border p-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-accent text-primary">
                <Award className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold tracking-tight">{t("sectionCertifications")}</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li
                  key={c.title}
                  className="group flex items-center justify-between gap-4 border border-border bg-secondary/50 p-4 transition-colors hover:border-primary"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-foreground">{c.title}</h4>
                      <p className="text-xs text-muted-foreground">{c.org}</p>
                      {c.description && (
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.description}</p>
                      )}
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
