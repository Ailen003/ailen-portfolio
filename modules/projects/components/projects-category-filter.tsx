"use client"

import { useTranslations } from "next-intl"
import { X } from "lucide-react"
import { PROJECT_CATEGORY_META, type ProjectCategory } from "../lib/types/project.types"
import { cn } from "@/lib/utils"

const ALL_CATEGORIES = Object.keys(PROJECT_CATEGORY_META) as ProjectCategory[]

interface ProjectsCategoryFilterProps {
  activeFilters: ProjectCategory[]
  categories?: ProjectCategory[]
  className?: string
  onToggle: (category: ProjectCategory) => void
  onReset: () => void
}

export function ProjectsCategoryFilter({
  activeFilters,
  categories = ALL_CATEGORIES,
  className,
  onToggle,
  onReset,
}: ProjectsCategoryFilterProps) {
  const t = useTranslations("projects")
  const hasFilters = activeFilters.length > 0
  const visibleCategories = ALL_CATEGORIES.filter((category) => categories.includes(category))

  if (visibleCategories.length === 0) return null

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <button
        type="button"
        aria-pressed={!hasFilters}
        onClick={onReset}
        className={cn(
          "paper-label inline-flex items-center gap-1.5 border min-h-9 px-3 py-1 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
          !hasFilters
            ? "border-primary/50 bg-primary/15 text-primary shadow-sm"
            : "border-border bg-secondary/30 text-muted-foreground hover:border-border hover:text-foreground"
        )}
      >
        {t("filter.all")}
        {hasFilters && <X className="h-3 w-3 opacity-70" />}
      </button>

      {visibleCategories.map((category) => {
        const meta = PROJECT_CATEGORY_META[category]
        const isActive = activeFilters.includes(category)

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onToggle(category)}
            className={cn(
              "paper-label inline-flex items-center gap-1.5 border min-h-9 px-3 py-1 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "border-transparent"
                : "border-border bg-secondary/30 text-muted-foreground hover:border-border hover:text-foreground"
            )}
            style={
              isActive
                ? {
                    backgroundColor: `${meta.color}22`,
                    color: `color-mix(in srgb, ${meta.color} var(--tag-color-weight), var(--foreground))`,
                    borderColor: `${meta.color}55`,
                  }
                : undefined
            }
          >
            <span
              className="h-1.5 w-1.5 rounded-full shrink-0 transition-colors duration-200"
              style={{ backgroundColor: isActive ? meta.color : `${meta.color}80` }}
            />
            {t(`categoryLabels.${category}`)}
          </button>
        )
      })}
    </div>
  )
}
