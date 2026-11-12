"use client"

interface AvailabilityBadgeProps {
  label: string
}

export function AvailabilityBadge({ label }: AvailabilityBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      {label}
    </div>
  )
}
