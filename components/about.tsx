import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { Compass, Code2, Users, Sparkles } from "lucide-react"

const values = [
  {
    icon: Compass,
    title: "Product-minded",
    description: "I think beyond tickets — about the user, the business, and the long-term health of the codebase.",
  },
  {
    icon: Code2,
    title: "Craft & quality",
    description: "Clean architecture, strong typing, and tests. The details are where good products are made.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "I work closely with design and product, mentor engineers, and document decisions clearly.",
  },
  {
    icon: Sparkles,
    title: "Always learning",
    description: "From distributed systems to design systems — I stay curious and share what I learn.",
  },
]

const facts = [
  { label: "Based in", value: "Barcelona, ES" },
  { label: "Experience", value: "8+ years" },
  { label: "Focus", value: "Full-stack web" },
  { label: "Languages", value: "EN · ES · CA" },
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
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
            {facts.map((f) => (
              <div key={f.label} className="bg-card p-4">
                <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{f.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="grid gap-4">
          {values.map((v, i) => (
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
    </section>
  )
}
