import type { Service } from "../lib/types/services.types"

interface ServiceCardProps {
  service: Service
  idealForLabel: string
  delay?: number
}

export function ServiceCard({ service, idealForLabel }: ServiceCardProps) {
  const { icon: Icon, color, title, tagline, bullets, idealFor } = service

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: `${color}26` }}
      />

      <header className="mb-5 flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-accent transition-colors duration-300 group-hover:border-transparent"
          style={{ color }}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <div>
          <h3 className="text-lg font-semibold leading-tight text-foreground">{title}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{tagline}</p>
        </div>
      </header>

      <ul className="mb-5 flex-1 space-y-2.5">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
              aria-hidden
            />
            {bullet}
          </li>
        ))}
      </ul>

      <footer className="mt-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground">
          <span className="text-muted-foreground">{idealForLabel}:</span>
          {idealFor}
        </span>
      </footer>
    </article>
  )
}
