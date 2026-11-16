import { portfolioIdentity } from "@/modules/portfolio/lib/data/identity.data"
import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react"
import { heroSocials } from "./lib/data/hero.data"
import { fetchHeroData } from "./lib/actions/hero.action"
import styles from "./hero.module.css"

export async function Hero() {
  const t = await getTranslations("hero")
  const locale = await getLocale()
  const result = await fetchHeroData()
  if (!result.ok) return null
  const { badge, description, portraitAlt } = result.data
  const roles = Object.values(result.data.roles)
  const { name, portraitSrc, location } = portfolioIdentity

  return (
    <section id="home" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`site-container ${styles.container}`}>
        <div className={styles.topline}>
          <p className={styles.availability}><span aria-hidden="true" />{badge}</p>
          <p className={styles.location}><MapPin size={13} aria-hidden="true" />{location[locale === "es" ? "es" : "en"]}</p>
        </div>

        <div className={styles.stage}>
          <p className={styles.signature}><span>{name}</span><span className={styles.signatureDivider} aria-hidden="true">/</span><span>{roles[0]}</span></p>
          <h1 id="hero-heading" className={styles.headline} aria-label={`${t("headline.start")} ${t("headline.end")}`}>
            <span className={styles.firstLine}>{t("headline.start")}</span>
            <span className={styles.secondLine}>
              <span className={styles.portrait}>
                <Image src={portraitSrc} alt={portraitAlt} fill preload sizes="(min-width: 768px) 156px, (min-width: 400px) 104px, 80px" />
              </span>
              <span className={styles.emphasis}>{t("headline.end")}</span>
              <span className={styles.sketchArrow} aria-hidden="true">
                <svg viewBox="0 0 90 90" fill="none"><path d="M10 15C65 2 80 55 24 68M24 68l17-24M24 68l29 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </span>
          </h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}>
            <a href="#projects" className={`button-primary ${styles.primaryAction}`}>{t("cta.viewWork")}<ArrowUpRight size={17} aria-hidden="true" /></a>
            <a href="#contact" className={styles.contact}>{t("cta.contact")}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <ul className={styles.roles} aria-label={t("specialtiesLabel")}>
            {roles.slice(1).map(role => <li key={role}>{role}</li>)}
          </ul>
        </div>

        <div className={styles.baseline}>
          <dl className={styles.stats}>
            <div><dt>{t("stats.yearsLabel")}</dt><dd>{portfolioIdentity.experienceYears}+</dd></div>
            <div><dt>{t("stats.projectsLabel")}</dt><dd>{portfolioIdentity.projectsShipped}</dd></div>
          </dl>
          <a href="#projects" className={styles.explore} aria-label={t("cta.viewWork")}><ArrowDown size={18} aria-hidden="true" /></a>
          <div className={styles.socials}>
            {heroSocials.map(social => (
              <a key={social.label} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noreferrer" : undefined} aria-label={social.label}>
                <social.icon size={16} aria-hidden="true" /><span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
