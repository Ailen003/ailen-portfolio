interface ProcessStepData {
  number: string
  label: string
  description: string
}

interface ServicesProcessProps {
  steps: ProcessStepData[]
}

export function ServicesProcess({ steps }: ServicesProcessProps) {
  return (
    <div className="relative mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <div
          key={step.number}
          className="group relative flex flex-col gap-2 bg-card p-6 transition-colors hover:bg-accent/50 sm:p-7"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-medium text-primary">{step.number}</span>
            {i < steps.length - 1 && (
              <span
                className="hidden h-px flex-1 bg-border lg:block"
                aria-hidden
              />
            )}
          </div>
          <h4 className="text-sm font-semibold text-foreground">{step.label}</h4>
          <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
