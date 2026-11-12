"use client"

import type { MouseEvent, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ProjectBadgeShellProps {
  captionText: string
  pillContent: ReactNode
  href?: string
  ariaLabel?: string
  className?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Shared visual shell for the "sello" badges shown on project cards/modals
 * (company, full-stack, personal). Keeps the caption + pill look consistent
 * across variants while each variant owns its own copy and content.
 */
export function ProjectBadgeShell({
  captionText,
  pillContent,
  href,
  ariaLabel,
  className,
  onClick,
}: ProjectBadgeShellProps) {
  const content = (
    <>
      <span className="paper-label border border-border/50 bg-background/80 px-1.5 py-px text-[8px] font-semibold text-muted-foreground backdrop-blur-sm">
        {captionText}
      </span>
      {pillContent}
    </>
  )

  const classes = cn(
    "inline-flex max-w-full flex-col items-start gap-0.5",
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
        className={cn(classes, "transition-transform hover:-translate-y-0.5")}
        onClick={onClick}
      >
        {content}
      </a>
    )
  }

  return <span className={classes}>{content}</span>
}

interface ProjectBadgePillProps {
  isImageOverlay?: boolean
  leading: ReactNode
  leadingClassName?: string
  label?: ReactNode
  /** Visual size of the pill. "sm" (default) keeps the legacy compact look. */
  size?: "sm" | "lg"
}

/** Shared pill (white rounded container) used inside every badge variant. */
export function ProjectBadgePill({ isImageOverlay, leading, leadingClassName, label, size = "sm" }: ProjectBadgePillProps) {
  const isLarge = size === "lg"
  return (
    <span className={cn(
      "inline-flex items-center bg-card shadow-sm ring-1 ring-border/60",
      isImageOverlay
        ? cn(
            "justify-center rounded-sm",
            isLarge ? "h-11 w-11 p-1.5" : "h-8 w-8 p-1",
          )
        : cn(
            "gap-2 rounded-sm",
            isLarge ? "h-11 px-2.5" : "h-8 px-2",
          ),
    )}>
      <span className={cn("flex shrink-0 items-center justify-center overflow-hidden", leadingClassName)}>
        {leading}
      </span>
      {!isImageOverlay && label && (
        <span className="max-w-36 truncate text-xs font-semibold leading-none text-foreground">
          {label}
        </span>
      )}
    </span>
  )
}
