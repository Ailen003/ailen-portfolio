import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { contactChannels, contactSocials } from "./lib/data/contact.data"
import { ContactFormContainer } from "./form/contact-form-container"

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden border-t border-border bg-secondary/30 dot-pattern py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 radial-spotlight" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="07"
          title="Let's build something"
          subtitle="Have a project in mind or just want to say hello? My inbox is always open."
          headingId="contact-heading"
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-6">
            <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {
                "Whether you're looking for an engineer to join your team or need help shipping a product, I'd love to hear about it. I usually reply within a day."
              }
            </p>

            <div className="space-y-3">
              {contactChannels.map((c) => {
                const content = (
                  <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{c.label}</p>
                      <p className="font-medium text-foreground">{c.value}</p>
                    </div>
                  </div>
                )
                return c.href ? (
                  <a key={c.label} href={c.href}>
                    {content}
                  </a>
                ) : (
                  <div key={c.label}>{content}</div>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              {contactSocials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactFormContainer />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
