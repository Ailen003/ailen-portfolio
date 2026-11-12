import type { Service } from "../lib/types/services.types"

interface ServiceCardProps {
  service: Service
  idealForLabel: string
  index: number
  delay?: number
}

export function ServiceCard({ service, idealForLabel, index }: ServiceCardProps) {
  const { icon: Icon, title, tagline, bullets, idealFor } = service
  const ordinal = String(index + 1).padStart(2, "0")

  return (
    <article className="quiet-card flex h-full flex-col overflow-hidden">
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <header className="mb-5 flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-accent text-primary"
          >
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold leading-tight text-foreground">{title}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{tagline}</p>
          </div>
          <span aria-hidden="true" className="pt-1 font-mono text-xs tabular-nums text-muted-foreground/70">{ordinal}</span>
        </header>

        <ul className="mb-5 flex-1 space-y-2.5">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <span
                aria-hidden
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border bg-accent font-mono text-[10px] text-primary"
              >
                {i + 1}
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        <footer className="mt-auto border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">{idealForLabel}</p>
          <p className="mt-1 text-sm font-medium text-foreground">{idealFor}</p>
        </footer>
      </div>
    </article>
  )
}
