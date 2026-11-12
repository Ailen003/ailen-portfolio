"use client"

import { BriefcaseBusiness } from "lucide-react"
import { useTranslations } from "next-intl"
import type { MouseEvent } from "react"
import type { ProjectCompany, ProjectEngagement } from "../lib/types/project.types"
import { ProjectCompanyBadge } from "./project-company-badge"
import { ProjectPersonalBadge } from "./project-personal-badge"
import { ProjectAcademicBadge } from "./project-academic-badge"

export function ProjectEngagementBadge({ engagement, company, className, variant, onClick }: {
  engagement?: ProjectEngagement
  company?: ProjectCompany
  className?: string
  variant?: "default" | "image-overlay"
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}) {
  const t = useTranslations("projects")
  if (engagement === "personal") return <ProjectPersonalBadge className={className} variant={variant} />
  if (engagement === "academic") return <ProjectAcademicBadge className={className} variant={variant} />
  if (engagement === "freelance") return <span className={`tag ${className ?? ""}`}><BriefcaseBusiness className="size-4" aria-hidden="true" />{t("freelance")}</span>
  if (company) return <ProjectCompanyBadge company={company} className={className} variant={variant} onClick={onClick} />
  return null
}
