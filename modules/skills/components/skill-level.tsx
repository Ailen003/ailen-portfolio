import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { SKILL_LEVEL_META, SKILL_MAX_STARS, type SkillLevel } from "../lib/types/skills.types"


interface SkillLevelProps {
  level: SkillLevel
  /** Show the text label next to the stars */
  showLabel?: boolean
  /** Controls star size */
  size?: "sm" | "md"
  className?: string
}

export function SkillLevelIndicator({
  level,
  showLabel = true,
  size = "sm",
  className,
}: SkillLevelProps) {
  const { label, stars } = SKILL_LEVEL_META[level]

  const starSize = size === "md" ? "h-4 w-4" : "h-3 w-3"

  return (
    <span
      className={cn("flex items-center gap-1", className)}
      aria-label={`Nivel: ${label}`}
    >
      {Array.from({ length: SKILL_MAX_STARS }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            starSize,
            "transition-colors duration-150",
            i < stars
              ? "fill-yellow-400 text-yellow-400"
              : "fill-transparent text-muted-foreground/30"
          )}
        />
      ))}
      {showLabel && (
        <span className="ml-0.5 font-mono text-[10px] leading-none text-muted-foreground">
          {label}
        </span>
      )}
    </span>
  )
}
