import { getTranslations } from "next-intl/server"
import { ArrowUpRight } from "lucide-react"
import { EditorialHeading } from "@/components/editorial-heading"
import { Reveal } from "@/components/reveal"
import { ServiceCard } from "./components/service-card"
import { ServicesProcess } from "./components/services-process"
import { BOOKING_URL } from "./lib/data/services.data"
import { fetchServicesData } from "./lib/actions/services.action"
import styles from "@/components/portfolio-sections.module.css"

export async function Services() {
  const t = await getTranslations("services")
  const result = await fetchServicesData()
  if (!result.ok) return null
  const { services, processSteps } = result.data
  const ctaTargetProps = BOOKING_URL.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {}
  return (
    <section id="services" aria-labelledby="services-heading" className={`${styles.section} ${styles.servicesSection}`}>
      <div className="site-container">
        <div className={styles.servicesLayout}>
          <div className={styles.servicesAside}>
            <EditorialHeading index="07" title={t("title")} subtitle={t("subtitle")} headingId="services-heading" />
            <p className={styles.available}><span aria-hidden="true" />{t("availability")}</p>
            <a href="#contact" className={styles.textLink}>{t("cta.contact")}<ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <div className={styles.serviceList}>{services.map((service, i) => <Reveal key={service.key} delay={i * 60}>
            <ServiceCard service={service} idealForLabel={t("idealForLabel")} index={i} />
          </Reveal>)}</div>
        </div>
        <Reveal><ServicesProcess steps={processSteps} /></Reveal>
        <Reveal className={styles.serviceCta}>
          <a href={BOOKING_URL} {...ctaTargetProps} className={`button-primary ${styles.pillButton}`}>{t("cta.book")}<ArrowUpRight size={17} aria-hidden="true" /></a>
        </Reveal>
      </div>
    </section>
  )
}
