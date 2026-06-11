"use client"

import { useEffect, useRef, useState } from "react"
import type { ContributionWeek } from "../lib/types/github-stats.types"

interface ContributionHeatmapProps {
  weeks: ContributionWeek[]
  totalContributions: number
}

const LEVEL_OPACITY = ["0.06", "0.25", "0.50", "0.75", "1"]
const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""]
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function getMonthLabels(weeks: ContributionWeek[]): { label: string; col: number }[] {
  const seen = new Set<number>()
  const labels: { label: string; col: number }[] = []
  for (let i = 0; i < weeks.length; i++) {
    const week = weeks[i]
    const day = week.days.find((d) => d.date)
    if (!day) continue
    const month = new Date(day.date).getMonth()
    if (!seen.has(month)) {
      seen.add(month)
      labels.push({ label: MONTH_NAMES[month], col: i })
    }
  }
  return labels
}

export function ContributionHeatmap({ weeks, totalContributions }: ContributionHeatmapProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const CELL = 11
  const GAP = 3
  const STEP = CELL + GAP
  const DAY_LABEL_W = 28
  const MONTH_LABEL_H = 18
  const cols = weeks.length
  const svgW = DAY_LABEL_W + cols * STEP
  const svgH = MONTH_LABEL_H + 7 * STEP

  const monthLabels = getMonthLabels(weeks)

  return (
    <div ref={ref} className="space-y-3">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-foreground">Contribution calendar</p>
        <span className="font-mono text-xs text-muted-foreground">
          {totalContributions.toLocaleString("en-US")} contributions this year
        </span>
      </div>

      <div
        className="relative overflow-x-auto"
        onMouseLeave={() => setTooltip(null)}
      >
        <svg
          width={svgW}
          height={svgH}
          className="min-w-full"
          aria-label={`Contribution heatmap: ${totalContributions} contributions this year`}
        >
          {monthLabels.map(({ label, col }) => (
            <text
              key={label + col}
              x={DAY_LABEL_W + col * STEP}
              y={MONTH_LABEL_H - 4}
              className="fill-muted-foreground font-mono text-[9px]"
              fontSize={9}
              fill="currentColor"
              opacity={0.6}
            >
              {label}
            </text>
          ))}

          {DAY_LABELS.map((d, row) =>
            d ? (
              <text
                key={row}
                x={0}
                y={MONTH_LABEL_H + row * STEP + CELL - 1}
                fontSize={9}
                fill="currentColor"
                opacity={0.5}
                className="fill-muted-foreground font-mono"
              >
                {d}
              </text>
            ) : null,
          )}

          {weeks.map((week, col) =>
            week.days.map((day, row) => {
              const x = DAY_LABEL_W + col * STEP
              const y = MONTH_LABEL_H + row * STEP
              const opacity = visible ? LEVEL_OPACITY[day.level] : "0"
              return (
                <rect
                  key={day.date}
                  x={x}
                  y={y}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  ry={2}
                  fill={`oklch(0.6 0.12 175)`}
                  opacity={opacity}
                  className="cursor-pointer transition-opacity duration-500"
                  style={{
                    transitionDelay: visible ? `${(col * 7 + row) * 2}ms` : "0ms",
                  }}
                  onMouseEnter={(e) => {
                    const rect = (e.target as SVGRectElement).getBoundingClientRect()
                    const container = ref.current?.getBoundingClientRect()
                    if (!container) return
                    const dateStr = day.date
                      ? new Date(day.date + "T00:00:00").toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""
                    setTooltip({
                      text: `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${dateStr}`,
                      x: rect.left - container.left + CELL / 2,
                      y: rect.top - container.top - 8,
                    })
                  }}
                />
              )
            }),
          )}
        </svg>

        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-foreground shadow-lg"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.text}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-1.5">
        <span className="text-xs text-muted-foreground">Less</span>
        {LEVEL_OPACITY.map((op, i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: `oklch(0.6 0.12 175 / ${op})` }}
            aria-hidden
          />
        ))}
        <span className="text-xs text-muted-foreground">More</span>
      </div>
    </div>
  )
}
