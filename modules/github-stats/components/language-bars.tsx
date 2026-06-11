"use client"

import { useEffect, useRef, useState } from "react"
import type { GithubLanguage } from "../lib/types/github-stats.types"

interface LanguageBarsProps {
  languages: GithubLanguage[]
}

export function LanguageBars({ languages }: LanguageBarsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

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
      {languages.map((lang, i) => (
        <div key={lang.name} className="group">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: lang.color }}
                aria-hidden
              />
              <span className="text-sm font-medium text-foreground">{lang.name}</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{lang.percentage.toFixed(1)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out"
              style={{
                width: visible ? `${lang.percentage}%` : "0%",
                backgroundColor: lang.color,
                transitionDelay: visible ? `${i * 80}ms` : "0ms",
              }}
              role="progressbar"
              aria-valuenow={lang.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${lang.name}: ${lang.percentage.toFixed(1)}%`}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
