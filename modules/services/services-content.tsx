import { getTranslations } from "next-intl/server"
import { ArrowRight, Calendar } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { AvailabilityBadge } from "./components/availability-badge"
import { ServiceCard } from "./components/service-card"
import { ServicesProcess } from "./components/services-process"
import { BOOKING_URL } from "./lib/data/services.data"
import { fetchServicesData } from "./lib/actions/services.action"

export async function Services() {
  const t = await getTranslations("services")
  const result = await fetchServicesData()

  if (!result.ok) return null

  const { services, processSteps } = result.data
  const ctaTargetProps = BOOKING_URL.startsWith("http")
    ? { target: "_blank", rel: "noreferrer" }
    : {}

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden section-space"
    >


      <div className="site-container relative">
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
              {...ctaTargetProps}
              className="editorial-button group inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Calendar className="h-4 w-4" />
              {t("cta.book")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="editorial-button editorial-button--quiet inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold"
            >
              {t("cta.contact")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
