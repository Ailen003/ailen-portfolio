"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { ContributionWeek } from "../lib/types/github-stats.types"

interface ContributionMonthlyProps {
  weeks: ContributionWeek[]
  totalContributions: number
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

interface MonthTotal {
  key: string
  label: string
  count: number
}

function getMonthlyTotals(weeks: ContributionWeek[]): MonthTotal[] {
  const map = new Map<string, MonthTotal>()
  const order: string[] = []

  for (const week of weeks) {
    for (const day of week.days) {
      if (!day.date) continue
      const date = new Date(day.date + "T00:00:00")
      const key = `${date.getFullYear()}-${date.getMonth()}`
      if (!map.has(key)) {
        map.set(key, { key, label: MONTH_NAMES[date.getMonth()], count: 0 })
        order.push(key)
      }
      map.get(key)!.count += day.count
    }
  }

  return order.map((key) => map.get(key)!)
}

export function ContributionMonthly({ weeks, totalContributions }: ContributionMonthlyProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const months = useMemo(() => getMonthlyTotals(weeks), [weeks])
  const max = useMemo(() => Math.max(1, ...months.map((m) => m.count)), [months])

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

  return (
    <div ref={ref} className="space-y-4">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-foreground">Contribution calendar</p>
        <span className="font-mono text-xs text-muted-foreground">
          {totalContributions.toLocaleString("en-US")} contributions this year
        </span>
      </div>

      <div className="space-y-3">
        {months.map((month, i) => {
          const pct = (month.count / max) * 100
          return (
            <div key={month.key} className="group">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{month.label}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {month.count.toLocaleString("en-US")}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{
                    width: visible ? `${pct}%` : "0%",
                    backgroundColor: "oklch(0.6 0.12 175)",
                    transitionDelay: visible ? `${i * 60}ms` : "0ms",
                  }}
                  role="progressbar"
                  aria-valuenow={month.count}
                  aria-valuemin={0}
                  aria-valuemax={max}
                  aria-label={`${month.label}: ${month.count} contributions`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
