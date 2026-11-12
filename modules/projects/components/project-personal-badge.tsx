"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { ProjectBadgeShell, ProjectBadgePill } from "./project-badge-shell"

interface ProjectPersonalBadgeProps {
  className?: string
  variant?: "default" | "image-overlay"
}

const PERSONAL_PROJECT_LOGO = "/icons/projects/personal-project.webp"

/** Badge for self-initiated projects with no client/employer involved. */
export function ProjectPersonalBadge({ className, variant = "default" }: ProjectPersonalBadgeProps) {
  const t = useTranslations("projects.personal")

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
              src={PERSONAL_PROJECT_LOGO}
              alt={t("label")}
              width={442}
              height={434}
              className="h-6 w-6 object-contain"
            />
          }
        />
      }
    />
  )
}
