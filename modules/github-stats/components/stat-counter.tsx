"use client"

import { useEffect, useRef, useState } from "react"
import { GitFork, Star, Users, GitCommitHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = {
  GitFork,
  Star,
  Users,
  GitCommitHorizontal,
}

interface StatCounterProps {
  value: number
  label: string
  iconKey: string
  suffix?: string
  delay?: number
}

function useCountUp(target: number, duration = 1200, delay = 0) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (target === 0) return

    const startTime = performance.now()
    let raf: number

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target, duration])

  return count
}

export function StatCounter({ value, label, iconKey, suffix = "", delay = 0 }: StatCounterProps) {
  const Icon = ICON_MAP[iconKey] ?? GitFork
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
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const count = useCountUp(visible ? value : 0, 1400, delay)

  return (
    <div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/8 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-accent text-primary transition-colors group-hover:border-primary/40">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <p className="font-mono text-3xl font-bold tabular-nums text-foreground">
        {count.toLocaleString("en-US")}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
