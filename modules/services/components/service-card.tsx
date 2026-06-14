import type { Service } from "../lib/types/services.types"

interface ServiceCardProps {
  service: Service
  idealForLabel: string
  index: number
  delay?: number
}

export function ServiceCard({ service, idealForLabel, index }: ServiceCardProps) {
  const { icon: Icon, color, title, tagline, bullets, idealFor } = service
  const ordinal = String(index + 1).padStart(2, "0")

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl">
      <div className="h-[3px] w-full shrink-0" style={{ backgroundColor: color }} />

      <span
        aria-hidden
        className="pointer-events-none absolute bottom-2 right-4 select-none font-black leading-none opacity-[0.06]"
        style={{ fontSize: "7rem", color }}
      >
        {ordinal}
      </span>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${color}14 0%, transparent 55%)` }}
      />

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <header className="mb-5 flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105"
            style={{
              backgroundColor: `${color}18`,
              border: `1.5px solid ${color}45`,
              color,
            }}
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
                aria-hidden
                className="mt-[3px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                style={{ backgroundColor: `${color}18`, color }}
              >
                {i + 1}
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        <footer className="mt-auto">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs"
            style={{
              backgroundColor: `${color}12`,
              border: `1px solid ${color}38`,
            }}
          >
            <span className="text-muted-foreground">{idealForLabel}:</span>
            <span className="font-semibold" style={{ color }}>{idealFor}</span>
          </span>
        </footer>
      </div>
    </article>
  )
}
