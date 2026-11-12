"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const t = useTranslations("themeToggle")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const color = resolvedTheme === "dark" ? "#1c1612" : "#faf5ec"
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute("content", color)
    })
  }, [mounted, resolvedTheme])

  const baseClass = cn(
    "icon-button",
    className,
  )

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className={baseClass}
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label={t("label")}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={baseClass}
    >
      {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  )
}
