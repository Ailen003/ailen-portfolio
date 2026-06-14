import { getTranslations } from "next-intl/server"
import { ArrowRight, Calendar } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { AvailabilityBadge } from "./components/availability-badge"
import { ServiceCard } from "./components/service-card"
import { ServicesProcess } from "./components/services-process"
import { serviceItems, BOOKING_URL } from "./lib/data/services.data"
import type { Service } from "./lib/types/services.types"

export async function Services() {
  const t = await getTranslations("services")

  const services: Service[] = serviceItems.map((item) => ({
    ...item,
    title: t(`items.${item.key}.title`),
    tagline: t(`items.${item.key}.tagline`),
    bullets: [
      t(`items.${item.key}.bullets.0`),
      t(`items.${item.key}.bullets.1`),
      t(`items.${item.key}.bullets.2`),
    ],
    idealFor: t(`items.${item.key}.idealFor`),
  }))

  const processSteps = [
    { number: "01", label: t("process.0.label"), description: t("process.0.description") },
    { number: "02", label: t("process.1.label"), description: t("process.1.description") },
    { number: "03", label: t("process.2.label"), description: t("process.2.description") },
    { number: "04", label: t("process.3.label"), description: t("process.3.description") },
  ]

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 dot-grid-pattern opacity-60" />

      <svg
        className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] opacity-[0.05]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="0" cy="0" r="160" stroke="oklch(0.6 0.12 175)" strokeWidth="1.5" fill="none" />
        <circle cx="0" cy="0" r="260" stroke="oklch(0.6 0.12 175)" strokeWidth="1" fill="none" />
        <circle cx="0" cy="0" r="360" stroke="oklch(0.6 0.12 175)" strokeWidth="0.75" fill="none" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <SectionHeading
            index="07"
            title={t("title")}
            subtitle={t("subtitle")}
            headingId="services-heading"
          />
          <Reveal className="mb-12 shrink-0 sm:pt-2">
            <AvailabilityBadge label={t("availability")} />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.key}
              delay={i * 80}
              className={i === 0 || i === 3 ? "lg:col-span-2" : "lg:col-span-1"}
            >
              <ServiceCard
                service={service}
                idealForLabel={t("idealForLabel")}
                index={i}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <ServicesProcess steps={processSteps} />
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/25"
            >
              <Calendar className="h-4 w-4" />
              {t("cta.book")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {t("cta.contact")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
