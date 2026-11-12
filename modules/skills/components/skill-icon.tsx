"use client"

import { useTranslations } from "next-intl"

import { useState } from "react"
import { Skill } from "../lib/types/skills.types"
import { SkillLevelIndicator } from "./skill-level"
import { SkillModal } from "./skill-modal"


interface SkillIconProps {
  skill: Skill
}

export function SkillIcon({ skill }: SkillIconProps) {
  const t = useTranslations("skills")
  const { name, Icon, color } = skill
  const [open, setOpen] = useState(false)

  return (
    <>
      <li className="group/sk relative">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("aria.viewSkill", { name })}
          className="relative flex w-full flex-col items-center gap-2 rounded-lg border border-border bg-secondary/40 p-3 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-secondary hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring"
        >
          {/* Icon */}
          <div className="flex h-10 w-10 items-center justify-center">
            <Icon
              className="h-6 w-6 transition-transform duration-300 group-hover/sk:scale-110 group-focus-within/sk:scale-110"
              style={{ color: color === "#111111" ? "var(--foreground)" : color }}
              aria-hidden
            />
          </div>

          {/* Name */}
          <span className="w-full truncate text-center font-mono text-[10px] font-medium leading-tight text-muted-foreground transition-colors group-hover/sk:text-foreground">
            {name}
          </span>

          {/* Stars */}
          <SkillLevelIndicator level={skill.level} showLabel={false} size="sm" />
        </button>
      </li>

      <SkillModal skill={skill} open={open} onOpenChange={setOpen} />
    </>
  )
}
