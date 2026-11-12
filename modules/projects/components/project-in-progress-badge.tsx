"use client"

import { useTranslations } from "next-intl"

interface ProjectInProgressBadgeProps {
  className?: string
}

export function ProjectInProgressBadge({ className }: ProjectInProgressBadgeProps) {
  const t = useTranslations("projects")

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 font-mono text-xs font-medium text-amber-500 backdrop-blur-sm ${className ?? ""}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
      </span>
      {t("statusLabels.supporting")}
    </span>
  )
}
