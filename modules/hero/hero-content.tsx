import { portfolioIdentity } from "@/modules/portfolio/lib/data/identity.data"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react"
import { DesignGeometry } from "@/components/design-geometry"
import { heroSocials } from "./lib/data/hero.data"
import { fetchHeroData } from "./lib/actions/hero.action"
import { HeroRoles } from "./components/hero-roles"

export async function Hero() {
  const t = await getTranslations("hero")
  const result = await fetchHeroData()
  if (!result.ok) return null
  const { badge, description, portraitAlt } = result.data
  const roles = Object.values(result.data.roles)
  const { name, portraitSrc } = portfolioIdentity

  return (
    <section id="home" aria-labelledby="hero-heading" className="hero-section relative overflow-hidden border-b border-border pt-20">
      <div className="site-container relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
        <div className="hero-copy relative z-10 min-w-0">
          <p className="eyebrow hero-enter mb-7 flex items-center gap-3">
            <span className="h-px w-8 shrink-0 bg-primary" aria-hidden="true" />{roles[0]}
          </p>
          <p className="mb-3 text-sm text-muted-foreground">{t("greeting")}</p>
          <h1 id="hero-heading" className="hero-name hero-enter text-5xl max-w-[14ch] text-balance">
            {name}<span className="text-primary">.</span>
          </h1>
          <HeroRoles roles={roles} />
          <p className="section-copy hero-enter mt-3 max-w-lg text-pretty text-muted-foreground">{description}</p>
          <div className="hero-enter mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="button-primary">
              {t("cta.viewWork")}<ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a href="#contact" className="button-secondary">
              <FileText className="size-4" aria-hidden="true" />{t("cta.contact")}
            </a>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-border pt-6">
            <div className="flex gap-2">
              {heroSocials.map((social) => (
                <a key={social.label} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={social.label} className="icon-button">
                  <social.icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="flex max-w-xs items-start gap-2 text-xs leading-5 text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />{badge}
            </p>
          </div>
        </div>
        <div className="hero-art relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:ml-auto lg:mr-0">
          <DesignGeometry className="hero-geometry" />
          <div className="hero-portrait overflow-hidden p-2.5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
              <Image src={portraitSrc} alt={portraitAlt} fill preload sizes="(min-width: 640px) 330px, (min-width: 360px) 282px, calc(100vw - 62px)" className="object-cover" />
            </div>
            <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-4">
              <span className="text-xs font-medium">{roles[1] ?? roles[0]}</span>
              <span className="size-2 shrink-0 rounded-full border border-primary bg-primary/20" aria-hidden="true" />
            </div>
          </div>
          <div className="hero-stats">
            <div><strong>{portfolioIdentity.experienceYears}+</strong><span>{t("stats.yearsLabel")}</span></div><div><strong>{portfolioIdentity.projectsShipped}</strong><span>{t("stats.projectsLabel")}</span></div>
          </div>
        </div>
      </div>
      <div className="site-container hero-baseline relative flex flex-wrap items-center justify-between gap-4 border-t border-border py-6">
        <p className="eyebrow text-[10px]">{roles.join(" / ")}</p>
        <a href="#projects" className="inline-flex items-center gap-3 text-xs text-muted-foreground transition-colors hover:text-primary">
          {t("cta.viewWork")}<ArrowDown className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
