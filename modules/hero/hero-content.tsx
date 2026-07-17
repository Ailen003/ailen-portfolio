import Image from "next/image"
import { ArrowDownRight, FileText } from "lucide-react"
import { heroSocials } from "./lib/data/hero.data"
import { fetchHeroData } from "./lib/actions/hero.action"
import { HeroRoles } from "./components/hero-roles"

export async function Hero() {
  const result = await fetchHeroData()

  if (!result.ok) return null

  const { badge, greeting, roles, description, cta, stats, portraitAlt } = result.data

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-80" />

      <svg className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] opacity-[0.07]" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="420" cy="0" r="180" stroke="oklch(0.6 0.12 175)" strokeWidth="1.5" fill="none" />
        <circle cx="420" cy="0" r="280" stroke="oklch(0.6 0.12 175)" strokeWidth="1" fill="none" />
        <circle cx="420" cy="0" r="380" stroke="oklch(0.6 0.12 175)" strokeWidth="0.75" fill="none" />
      </svg>

      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-40">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {badge}
          </div>

          <p className="mb-3 font-mono text-sm font-medium tracking-wide text-primary">{greeting}</p>
          <h1 id="hero-heading" className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Elena Vargas
          </h1>

          <HeroRoles roles={[roles.senior, roles.fullStack, roles.problemSolver]} />

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/25"
            >
              {cta.viewWork}
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <FileText className="h-4 w-4" />
              {cta.downloadCv}
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3">
            {heroSocials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/15 to-transparent dot-pattern" />
          <div className="animate-float-slow overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl shadow-primary/10">
            <Image
              src="/elena-portrait.png"
              alt={portraitAlt}
              width={640}
              height={760}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card/90 px-5 py-4 shadow-xl backdrop-blur sm:block">
            <p className="font-mono text-2xl font-bold text-primary">8+</p>
            <p className="text-xs text-muted-foreground">{stats.yearsLabel}</p>
          </div>
          <div className="absolute -right-4 top-8 hidden rounded-2xl border border-border bg-card/90 px-5 py-4 shadow-xl backdrop-blur sm:block">
            <p className="font-mono text-2xl font-bold text-primary">50+</p>
            <p className="text-xs text-muted-foreground">{stats.projectsLabel}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
