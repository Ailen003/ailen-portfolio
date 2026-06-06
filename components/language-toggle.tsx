"use client"

import { useTransition } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Languages, Check } from "lucide-react"
import { useRouter, usePathname } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useTranslations("languageToggle")
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleSelect = (next: Locale) => {
    if (next === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("label")}
          disabled={isPending}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50",
            className,
          )}
        >
          <Languages className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-wide">{locale}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {routing.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => handleSelect(l)}
            className="flex items-center justify-between"
          >
            <span>{t(l)}</span>
            {l === locale && <Check className="h-3.5 w-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
