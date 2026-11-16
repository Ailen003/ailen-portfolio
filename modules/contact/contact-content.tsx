import { portfolioIdentity } from "@/modules/portfolio/lib/data/identity.data"
import { getLocale } from "next-intl/server"
import { getTranslations } from "next-intl/server"
import { EditorialHeading } from "@/components/editorial-heading"
import styles from "@/components/portfolio-continuity.module.css"
import { Reveal } from "@/components/reveal"
import { contactChannels, contactSocials } from "./lib/data/contact.data"
import { ContactFormContainer } from "./form/contact-form-container"
import { fetchContactData } from "./lib/actions/contact.action"

export async function Contact() {
  const t = await getTranslations("contact")
  const result = await fetchContactData()

  if (!result.ok) return null

  const { description } = result.data
  const locale = await getLocale()
  const channels = contactChannels.map(channel => channel.label === "Location" ? { ...channel, value: portfolioIdentity.location[locale === "es" ? "es" : "en"] } : channel)

  return (
    <section id="contact" aria-labelledby="contact-heading" className={`section-space ${styles.contact}`}>


      <div className="site-container relative">
        <EditorialHeading
          index="08"
          title={t("title")}
          subtitle={t("subtitle")}
          headingId="contact-heading"
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-6">
            <p className="section-copy text-pretty text-muted-foreground">
              {description}
            </p>

            <div className="space-y-3">
              {channels.map((c) => {
                const content = (
                  <div className="paper-card flex items-center gap-4 border border-border p-4 transition-colors">
                    <span className={styles.channelIcon}>
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div className="contact-channel-copy">
                      <p className="text-xs text-muted-foreground">
                        {t(`channels.${c.label.toLowerCase()}.label`)}
                      </p>
                      <p className="text-sm font-medium text-foreground">{c.value}</p>
                    </div>
                  </div>
                )
                return c.href ? (
                  <a key={c.label} href={c.href} className="contact-channel">
                    {content}
                  </a>
                ) : (
                  <div key={c.label} className="contact-channel">{content}</div>
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
                  className="icon-button"
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
