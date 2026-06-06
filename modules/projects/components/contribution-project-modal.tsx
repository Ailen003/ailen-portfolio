"use client"

import { ArrowUpRight, Github, Users, CalendarDays, GitPullRequest, TrendingUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PROJECT_CATEGORY_META, type ContributionProject } from "../lib/types/project.types"
import { ProjectMarkdown } from "./project-markdown"

interface ContributionProjectModalProps {
  project: ContributionProject
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContributionProjectModal({ project, open, onOpenChange }: ContributionProjectModalProps) {
  const primaryCat = project.categories[0]
  const accentColor = primaryCat ? PROJECT_CATEGORY_META[primaryCat].color : "#6B7280"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88dvh] max-w-xl overflow-hidden flex flex-col gap-0 p-0">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-lg border-b border-border bg-card px-6 pb-5 pt-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: accentColor }}
          />
          <DialogHeader className="relative">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                  borderColor: `${accentColor}40`,
                }}
              >
                <Users className="h-3 w-3" />
                {project.role}
              </span>
              {project.year && (
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  {project.year}
                </span>
              )}
            </div>

            <DialogTitle className="text-xl font-bold leading-tight text-foreground">
              {project.title}
            </DialogTitle>

            {/* Category + tech stack */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {project.categories.map((cat) => {
                const meta = PROJECT_CATEGORY_META[cat]
                return (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium"
                    style={{
                      backgroundColor: `${meta.color}15`,
                      color: meta.color,
                      borderColor: `${meta.color}40`,
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: meta.color }} />
                    {meta.label}
                  </span>
                )
              })}
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 bg-secondary/50 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          {/* Impact */}
          {project.impact && (
            <div
              className="flex items-start gap-3 rounded-xl border px-4 py-3"
              style={{
                backgroundColor: `${accentColor}08`,
                borderColor: `${accentColor}30`,
              }}
            >
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accentColor }} />
              <p className="text-sm font-medium text-foreground">{project.impact}</p>
            </div>
          )}

          {/* PR / Issue links */}
          {project.prLinks && project.prLinks.length > 0 && (
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Pull requests & issues
              </h4>
              <ul className="space-y-2">
                {project.prLinks.map((pr) => (
                  <li key={pr.url}>
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2.5 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2.5 transition-colors hover:border-primary/40 hover:bg-secondary/60"
                    >
                      <GitPullRequest className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-primary" />
                      <span className="flex-1 font-mono text-xs text-foreground">{pr.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical notes */}
          {project.technicalNotes && (
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Technical notes
              </h4>
              <div className="rounded-xl border border-border/60 bg-secondary/20 px-4 py-3">
                <ProjectMarkdown content={project.technicalNotes} />
              </div>
            </div>
          )}

          {/* Footer links */}
          <div className="flex items-center gap-3 pt-1">
            <a
              href={project.source}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Github className="h-3.5 w-3.5" />
              View repository
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Live demo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
