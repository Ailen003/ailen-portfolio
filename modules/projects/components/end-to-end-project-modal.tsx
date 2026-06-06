"use client"

import { ArrowUpRight, Github, CheckCircle2, Users, CalendarDays, Radio } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PROJECT_CATEGORY_META, type EndToEndProject, type ProjectStatus } from "../lib/types/project.types"
import { ProjectMarkdown } from "./project-markdown"
import { ProjectImageLightbox } from "./project-image-lightbox"

const STATUS_META: Record<ProjectStatus, { label: string; color: string }> = {
  live:     { label: "Live",     color: "#10B981" },
  wip:      { label: "In progress", color: "#F59E0B" },
  archived: { label: "Archived", color: "#6B7280" },
}

interface EndToEndProjectModalProps {
  project: EndToEndProject
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EndToEndProjectModal({ project, open, onOpenChange }: EndToEndProjectModalProps) {
  const primaryCat = project.categories[0]
  const accentColor = primaryCat ? PROJECT_CATEGORY_META[primaryCat].color : "#8B5CF6"
  const statusMeta = project.status ? STATUS_META[project.status] : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88dvh] max-w-2xl overflow-hidden flex flex-col gap-0 p-0">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-lg border-b border-border bg-card px-6 pb-5 pt-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-25 blur-3xl"
            style={{ backgroundColor: accentColor }}
          />
          <DialogHeader className="relative">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {statusMeta && (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium"
                      style={{
                        backgroundColor: `${statusMeta.color}15`,
                        color: statusMeta.color,
                        borderColor: `${statusMeta.color}40`,
                      }}
                    >
                      <Radio className="h-3 w-3" />
                      {statusMeta.label}
                    </span>
                  )}
                  {project.year && (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                      <CalendarDays className="h-3 w-3" />
                      {project.year}
                    </span>
                  )}
                  {project.teamSize && (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {project.teamSize}
                    </span>
                  )}
                </div>
                <DialogTitle className="text-2xl font-bold leading-tight text-foreground">
                  {project.title}
                </DialogTitle>
                <p className="mt-1 text-sm font-medium text-primary">{project.tagline}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={project.source}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Source code"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Live demo
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Category + tech stack */}
            <div className="mt-3 flex flex-wrap gap-1.5">
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
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          {/* Image gallery */}
          {project.images && project.images.length > 0 && (
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Screenshots
              </h4>
              <ProjectImageLightbox images={project.images} projectTitle={project.title} />
            </div>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Highlights
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: accentColor }}
                    />
                    <span className="text-sm text-foreground">{h}</span>
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
