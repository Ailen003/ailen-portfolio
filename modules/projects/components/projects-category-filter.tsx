"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { PROJECT_CATEGORY_META, type ProjectCategory } from "../lib/types/project.types"
import { cn } from "@/lib/utils"

const ALL_CATEGORIES = Object.keys(PROJECT_CATEGORY_META) as ProjectCategory[]

interface ProjectsCategoryFilterProps {
  activeFilters: ProjectCategory[]
  onToggle: (category: ProjectCategory) => void
  onReset: () => void
}

export function ProjectsCategoryFilter({
  activeFilters,
  onToggle,
  onReset,
}: ProjectsCategoryFilterProps) {
  const hasFilters = activeFilters.length > 0

  return (
    <div className="mb-10 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onReset}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
          !hasFilters
            ? "border-primary/50 bg-primary/15 text-primary shadow-sm"
            : "border-border bg-secondary/30 text-muted-foreground hover:border-border hover:text-foreground"
        )}
      >
        All
        {hasFilters && <X className="h-3 w-3 opacity-70" />}
      </button>

      {ALL_CATEGORIES.map((category) => {
        const meta = PROJECT_CATEGORY_META[category]
        const isActive = activeFilters.includes(category)

        return (
          <motion.button
            key={category}
            type="button"
            onClick={() => onToggle(category)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "border-transparent"
                : "border-border bg-secondary/30 text-muted-foreground hover:border-border hover:text-foreground"
            )}
            style={
              isActive
                ? {
                    backgroundColor: `${meta.color}22`,
                    color: meta.color,
                    borderColor: `${meta.color}55`,
                    boxShadow: `0 0 10px ${meta.color}30`,
                  }
                : undefined
            }
          >
            <span
              className="h-1.5 w-1.5 rounded-full shrink-0 transition-colors duration-200"
              style={{ backgroundColor: isActive ? meta.color : `${meta.color}80` }}
            />
            {meta.label}
          </motion.button>
        )
      })}
    </div>
  )
}
