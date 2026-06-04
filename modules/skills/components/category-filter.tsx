"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import {
  SKILL_CATEGORY_TAG_META,
  type SkillCategoryTag,
} from "../lib/types/skills.types"
import { cn } from "@/lib/utils"

const ALL_TAGS = Object.keys(SKILL_CATEGORY_TAG_META) as SkillCategoryTag[]

interface CategoryFilterProps {
  activeFilters: SkillCategoryTag[]
  onToggle: (tag: SkillCategoryTag) => void
  onReset: () => void
}

export function CategoryFilter({
  activeFilters,
  onToggle,
  onReset,
}: CategoryFilterProps) {
  const hasFilters = activeFilters.length > 0

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {/* "Todas" reset chip */}
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
        Todas
        {hasFilters && <X className="h-3 w-3 opacity-70" />}
      </button>

      {ALL_TAGS.map((tag) => {
        const meta = SKILL_CATEGORY_TAG_META[tag]
        const isActive = activeFilters.includes(tag)

        return (
          <motion.button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
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
