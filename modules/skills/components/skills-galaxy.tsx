"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { motion, useMotionValue, useReducedMotion, AnimatePresence } from "framer-motion"
import { getAllSkills } from "../lib/data/skills.data"
import { SkillNode } from "./skill-node"
import { SkillModal } from "./skill-modal"
import type { SkillCategoryTag } from "../lib/types/skills.types"

// ─── Collision-free grid layout ────────────────────────────────────────────
// Splits the canvas into a dynamic hex-staggered grid based on actual px width.
// Each cell is sized so the largest node (64px) + drift (±7px) + gap never overlaps.
function computeLayout(w: number, h: number, count: number) {
  const CANVAS_W = Math.max(w, 640)   // enforce minimum canvas width
  const CANVAS_H = h > 0 ? h : 520

  const CELL_MIN_W = 118   // px: node 64 + 2×drift 7 + 2×gap 20
  const CELL_MIN_H = 100   // px: node 64 + 2×drift 7 + 2×gap 11

  const cols = Math.max(4, Math.floor(CANVAS_W / CELL_MIN_W))
  const rows = Math.ceil(count / cols)

  const xPad = 0.05
  const yPad = Math.max(0.07, (1 - (CELL_MIN_H * rows) / CANVAS_H) / 2)
  const cellW = (1 - 2 * xPad) / cols
  const cellH = (1 - 2 * yPad) / rows

  return Array.from({ length: count }, (_, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    // Hex stagger: odd rows shift right by half a cell (skip last col to stay in bounds)
    const stagger = row % 2 === 1 && col < cols - 1 ? cellW * 0.5 : 0

    const baseX = xPad + cellW * (col + 0.5) + stagger
    const baseY = yPad + cellH * (row + 0.5)

    // Tiny deterministic jitter ±5% of cell — keeps nodes visually organic
    const jX = (((i * 73 + 31) % 100) / 100 - 0.5) * cellW * 0.10
    const jY = (((i * 53 + 17) % 100) / 100 - 0.5) * cellH * 0.10

    return {
      xPct: Math.max(0.03, Math.min(0.97, baseX + jX)),
      yPct: Math.max(0.04, Math.min(0.96, baseY + jY)),
    }
  })
}

// Decorative concentric orbit rings (SVG, purely visual)
const ORBIT_RINGS = [
  { rx: "18%", ry: "16%", opacity: 0.06 },
  { rx: "31%", ry: "27%", opacity: 0.05 },
  { rx: "44%", ry: "38%", opacity: 0.04 },
  { rx: "58%", ry: "49%", opacity: 0.03 },
]

interface SkillsGalaxyProps {
  activeFilters: SkillCategoryTag[]
}

export function SkillsGalaxy({ activeFilters }: SkillsGalaxyProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const prefersReduced = useReducedMotion() ?? false

  const mouseX = useMotionValue(Infinity)
  const mouseY = useMotionValue(Infinity)

  const allSkills = getAllSkills()
  type GalaxySkill = ReturnType<typeof getAllSkills>[number]
  const [selectedSkill, setSelectedSkill] = useState<GalaxySkill | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const isFiltered = activeFilters.length > 0

  // Measure the scrollable inner canvas (not the outer wrapper)
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const update = () => setDims({ w: el.offsetWidth, h: el.offsetHeight })
    update()
    const obs = new ResizeObserver(update)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Recompute positions only when canvas size changes
  const positions = useMemo(
    () => computeLayout(dims.w, dims.h, allSkills.length),
    [dims.w, dims.h, allSkills.length]
  )

  return (
    <>
      {/* Outer wrapper: clips + enables horizontal scroll on narrow screens */}
      <div ref={wrapperRef} className="w-full overflow-x-auto rounded-3xl">
        <div
          ref={canvasRef}
          className="relative h-[520px] min-w-[640px] w-full select-none rounded-3xl border border-border"
          style={{ background: "hsl(var(--card))" }}
          onPointerMove={(e) => {
            const rect = canvasRef.current?.getBoundingClientRect()
            if (!rect) return
            mouseX.set(e.clientX - rect.left)
            mouseY.set(e.clientY - rect.top)
          }}
          onPointerLeave={() => {
            mouseX.set(Infinity)
            mouseY.set(Infinity)
          }}
        >
          {/* ── Subtle dot-grid texture ─────────────────────────────────── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* ── Decorative orbit rings ──────────────────────────────────── */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            {ORBIT_RINGS.map((ring, i) => (
              <ellipse
                key={i}
                cx="50%"
                cy="50%"
                rx={ring.rx}
                ry={ring.ry}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity={ring.opacity}
              />
            ))}
          </svg>

          {/* ── Skill nodes ─────────────────────────────────────────────── */}
          {allSkills.map((skill, i) => {
            const pos = positions[i] ?? { xPct: 0.5, yPct: 0.5 }
            const isDimmed =
              isFiltered && !skill.categories.some((c) => activeFilters.includes(c))

            return (
              <SkillNode
                key={skill.name}
                skill={skill}
                xPct={pos.xPct}
                yPct={pos.yPct}
                index={i}
                mouseX={mouseX}
                mouseY={mouseY}
                containerWidth={dims.w}
                containerHeight={dims.h}
                isDimmed={isDimmed}
                isHovered={hoveredIndex === i}
                isAnyHovered={hoveredIndex !== null}
                prefersReduced={prefersReduced}
                onHover={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                onSelect={() => setSelectedSkill(skill)}
              />
            )
          })}

          {/* ── Hover info bar ──────────────────────────────────────────── */}
          <AnimatePresence>
            {hoveredIndex !== null && (() => {
              const s = allSkills[hoveredIndex]
              return (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.16 }}
                  className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl border border-border bg-card/90 px-4 py-2 text-center shadow-lg backdrop-blur-sm"
                >
                  <p className="font-mono text-xs font-semibold text-foreground">{s.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{s.group}</p>
                </motion.div>
              )
            })()}
          </AnimatePresence>

          {/* ── Interaction hint ────────────────────────────────────────── */}
          <AnimatePresence>
            {hoveredIndex === null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2"
              >
                <span className="font-mono text-[10px] tracking-wide text-muted-foreground/40">
                  Mueve el cursor · Toca para explorar
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Detail modal ──────────────────────────────────────────────────── */}
      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          open
          onOpenChange={(open) => !open && setSelectedSkill(null)}
        />
      )}
    </>
  )
}
