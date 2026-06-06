"use client"

import { ArrowUpRight, CalendarDays, Lightbulb, BookOpen, FlaskConical, Microscope, CheckCircle2, Circle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PROJECT_CATEGORY_META, type ResearchProject, type ResearchType } from "../lib/types/project.types"
import { ProjectMarkdown } from "./project-markdown"

const RESEARCH_TYPE_META: Record<
  ResearchType,
  { label: string; icon: typeof FlaskConical; color: string }
> = {
  POC:         { label: "POC",        icon: FlaskConical, color: "#10B981" },
  Study:       { label: "Study",      icon: BookOpen,     color: "#3B82F6" },
  "Deep Dive": { label: "Deep Dive",  icon: Microscope,   color: "#8B5CF6" },
  Concept:     { label: "Concept",    icon: Lightbulb,    color: "#F59E0B" },
}

interface ResearchProjectModalProps {
  project: ResearchProject
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ResearchProjectModal({ project, open, onOpenChange }: ResearchProjectModalProps) {
  const typeMeta = RESEARCH_TYPE_META[project.researchType]
  const TypeIcon = typeMeta.icon
  const primaryCat = project.categories[0]
  const accentColor = primaryCat ? PROJECT_CATEGORY_META[primaryCat].color : typeMeta.color
  const isOngoing = project.completionStatus === "ongoing"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88dvh] max-w-xl overflow-hidden flex flex-col gap-0 p-0">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-lg border-b border-border bg-card px-6 pb-5 pt-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: typeMeta.color }}
          />
          <DialogHeader className="relative">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 font-mono text-xs font-semibold"
                style={{
                  backgroundColor: `${typeMeta.color}15`,
                  color: typeMeta.color,
                  borderColor: `${typeMeta.color}40`,
                }}
              >
                <TypeIcon className="h-3 w-3" />
                {typeMeta.label}
              </span>

              {project.completionStatus && (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium ${
                    isOngoing
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-500"
                      : "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
                  }`}
                >
                  {isOngoing ? (
                    <Circle className="h-2.5 w-2.5 fill-current" />
                  ) : (
                    <CheckCircle2 className="h-3 w-3" />
                  )}
                  {isOngoing ? "Ongoing" : "Completed"}
                </span>
              )}

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

          {/* Findings */}
          {project.findings && project.findings.length > 0 && (
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Key findings
              </h4>
              <ul className="space-y-2">
                {project.findings.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Lightbulb
                      className="mt-0.5 h-3.5 w-3.5 shrink-0"
                      style={{ color: typeMeta.color }}
                    />
                    <span className="text-sm text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical notes */}
          {project.technicalNotes && (
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Notes
              </h4>
              <div className="rounded-xl border border-border/60 bg-secondary/20 px-4 py-3">
                <ProjectMarkdown content={project.technicalNotes} />
              </div>
            </div>
          )}

          {/* References */}
          {project.references && project.references.length > 0 && (
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                References
              </h4>
              <ul className="space-y-1.5">
                {project.references.map((ref) => (
                  <li key={ref.url}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span
                        className="h-1 w-1 rounded-full shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span className="flex-1">{ref.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer link */}
          {project.link && (
            <div className="pt-1">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                View project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
