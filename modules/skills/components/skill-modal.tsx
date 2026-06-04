"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SkillLevelIndicator } from "./skill-level"
import { SkillMarkdown } from "./skill-markdown"
import { SKILL_CATEGORY_TAG_META } from "../lib/types/skills.types"
import type { Skill } from "../lib/types/skills.types"


interface SkillModalProps {
  skill: Skill
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SkillModal({ skill, open, onOpenChange }: SkillModalProps) {
  const { name, Icon, color, level, description, categories, group } = skill

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85dvh] max-w-lg overflow-hidden flex flex-col gap-0 p-0">
        {/* Header band with brand color glow */}
        <div className="relative overflow-hidden rounded-t-lg border-b border-border bg-card px-6 pb-5 pt-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: color }}
          />
          <DialogHeader className="relative">
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-secondary/50"
                style={{ boxShadow: `0 0 20px ${color}30` }}
              >
                <Icon className="h-7 w-7" style={{ color }} aria-hidden />
              </div>
              <div className="min-w-0">
                <DialogTitle className="text-xl font-bold text-foreground leading-tight">
                  {name}
                </DialogTitle>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <SkillLevelIndicator level={level} showLabel size="md" />
                  {group && (
                    <span className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {group}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable description body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {categories && categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const meta = SKILL_CATEGORY_TAG_META[cat]
                return (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium"
                    style={{
                      backgroundColor: `${meta.color}18`,
                      color: meta.color,
                      border: `1px solid ${meta.color}40`,
                    }}
                  >
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                    {meta.label}
                  </span>
                )
              })}
            </div>
          )}
          <SkillMarkdown content={description} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
