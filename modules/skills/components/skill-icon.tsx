"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"
import type { Skill } from "../lib/types/skills.types"
import { SkillLevelIndicator } from "./skill-level"
import { SkillModal } from "./skill-modal"
import styles from "@/components/portfolio-sections.module.css"

export function SkillIcon({ skill }: { skill: Skill }) {
  const t = useTranslations("skills")
  const { name, Icon, color } = skill
  const [open, setOpen] = useState(false)
  return (
    <li>
      <button type="button" onClick={() => setOpen(true)} aria-label={t("aria.viewSkill", { name })} aria-haspopup="dialog" className={styles.skillButton}>
        <Icon className={styles.skillSymbol} width={25} height={25} style={{ color: color === "#111111" ? "var(--foreground)" : color }} aria-hidden="true" />
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillRating}><SkillLevelIndicator level={skill.level} showLabel={false} size="sm" /></span>
      </button>
      <SkillModal skill={skill} open={open} onOpenChange={setOpen} />
    </li>
  )
}
