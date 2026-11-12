"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { portfolioIdentity } from "@/modules/portfolio/lib/data/identity.data"
import { Link, usePathname } from "@/i18n/navigation"

const links = [
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "education", href: "#education" },
  { key: "contributions", href: "#contributions" },
  { key: "services", href: "#services" },
  { key: "contact", href: "#contact" },
]

export function Navbar() {
  const t = useTranslations("navigation")
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const menuButton = useRef<HTMLButtonElement>(null)
  const activeSection = isHome ? active : ""
  const sectionHref = (hash: string) => isHome ? hash : `/${hash}`

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 1440) setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

  useEffect(() => {
    if (!isHome || !window.IntersectionObserver) return
    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [isHome])

  return (
    <header className="masthead fixed inset-x-0 top-0 z-40">
      <a href="#main-content" className="sr-only fixed left-5 top-4 z-50 rounded-lg bg-primary px-4 py-3 text-sm text-primary-foreground focus:not-sr-only">{t("skipToContent")}</a>
      <nav aria-label={t("label")} className="site-container flex h-20 items-center justify-between gap-3">
        <Link href={sectionHref("#home")} aria-label={portfolioIdentity.name} onClick={() => setOpen(false)} className="brand-lockup group flex min-w-0 items-center gap-2.5 text-sm font-semibold tracking-tight">
          <span className="brand-mark" aria-hidden="true">
            {portfolioIdentity.initials}
          </span>
          <span className="hidden truncate text-sm font-semibold sm:inline">{portfolioIdentity.brand}</span>
        </Link>

        <ul className="desktop-navigation hidden items-center min-[1440px]:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={sectionHref(link.href)}
                aria-current={activeSection === link.href ? "location" : undefined}
                className={cn(
                  "nav-link",
                  activeSection === link.href && "is-active",
                )}
              >
                {t(`links.${link.key}`)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <LanguageToggle />
          <Link
            href={sectionHref("#contact")}
            className="button-primary ml-1 hidden min-[1440px]:inline-flex"
          >
            {t("cta")}
          </Link>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="icon-button min-[1440px]:hidden"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-navigation" className="border-t border-border bg-background min-[1440px]:hidden">
          <ul className="site-container flex max-h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto py-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={sectionHref(link.href)}
                  onClick={() => setOpen(false)}
                  aria-current={activeSection === link.href ? "location" : undefined}
                  className={cn("nav-link w-full py-3", activeSection === link.href && "is-active")}
                >
                  {t(`links.${link.key}`)}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Link
                href={sectionHref("#contact")}
                onClick={() => setOpen(false)}
                className="editorial-button inline-block px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                {t("cta")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
