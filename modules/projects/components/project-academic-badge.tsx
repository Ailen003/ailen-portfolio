"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { ProjectBadgeShell, ProjectBadgePill } from "./project-badge-shell"

interface ProjectAcademicBadgeProps {
  className?: string
  variant?: "default" | "image-overlay"
}

const ACADEMIC_PROJECT_LOGO = "/icons/projects/academic-project.webp"

/** Badge for academic/coursework projects (no client/employer involved). */
export function ProjectAcademicBadge({ className, variant = "default" }: ProjectAcademicBadgeProps) {
  const t = useTranslations("projects.academic")

  const isImageOverlay = variant === "image-overlay"

  return (
    <ProjectBadgeShell
      captionText={t("caption")}
      className={className}
      pillContent={
        <ProjectBadgePill
          isImageOverlay={isImageOverlay}
          label={t("label")}
          leading={
            <Image
              src={ACADEMIC_PROJECT_LOGO}
              alt={t("label")}
              width={444}
              height={476}
              className="h-6 w-6 object-contain"
            />
          }
        />
      }
    />
  )
}
