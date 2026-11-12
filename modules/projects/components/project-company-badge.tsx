"use client"

import type { MouseEvent } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import type { ProjectCompany } from "../lib/types/project.types"
import { ProjectBadgeShell, ProjectBadgePill } from "./project-badge-shell"

interface ProjectCompanyBadgeProps {
  company: ProjectCompany
  className?: string
  variant?: "default" | "image-overlay"
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

export function ProjectCompanyBadge({ company, className, variant = "default", onClick }: ProjectCompanyBadgeProps) {
  const t = useTranslations("projects.company")

  const isImageOverlay = variant === "image-overlay"
  const logoScale = company.logoScale ?? 1
  const leadingClassName =
    company.darkLogoPadding && !isImageOverlay ? "dark:h-[30px] dark:w-[30px]" : undefined

  return (
    <ProjectBadgeShell
      captionText={t("builtAt")}
      href={company.url}
      ariaLabel={t("ariaLabel", { name: company.name })}
      className={className}
      onClick={onClick}
      pillContent={
        <ProjectBadgePill
          isImageOverlay={isImageOverlay}
          label={company.name}
          leadingClassName={leadingClassName}
          leading={
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={285}
              height={63}
              className="h-6 w-6 object-contain"
              style={{ transform: `scale(${logoScale})` }}
            />
          }
        />
      }
    />
  )
}
