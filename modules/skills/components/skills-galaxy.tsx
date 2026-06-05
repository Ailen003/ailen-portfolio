"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { motion, useMotionValue, useReducedMotion, AnimatePresence } from "framer-motion"
import { getAllSkills } from "../lib/data/skills.data"
import { SkillNode } from "./skill-node"
import { SkillModal } from "./skill-modal"
import type { SkillCategoryTag } from "../lib/types/skills.types"

// ─── Concentric orbit ring configuration ────────────────────────────────────
// One ring per skill group (4 groups × 6 skills = 24 nodes total).
// rxPct/ryPct are fractions of canvas width/height respectively.
const RING_CONFIG: Array<{
  group: string
  rxPct: number
  ryPct: number
  speed: number  // seconds per full revolution
  cw: boolean    // clockwise direction
}> = [
  { group: "Frontend",            rxPct: 0.148, ryPct: 0.150, speed: 28, cw: true  },
  { group: "Backend",             rxPct: 0.250, ryPct: 0.252, speed: 42, cw: false },
  { group: "Data & Infra",        rxPct: 0.352, ryPct: 0.352, speed: 58, cw: true  },
  { group: "Tooling & Practices", rxPct: 0.448, ryPct: 0.447, speed: 72, cw: false },
]

interface SkillsGalaxyProps {
  activeFilters: SkillCategoryTag[]
}

export function SkillsGalaxy({ activeFilters }: SkillsGalaxyProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const prefersReduced = useReducedMotion() ?? false

  const mouseX = useMotionValue(Infinity)
  const mouseY = useMotionValue(Infinity)

  const allSkills = useMemo(() => getAllSkills(), [])
  type GalaxySkill = ReturnType<typeof getAllSkills>[number]
  const [selectedSkill, setSelectedSkill] = useState<GalaxySkill | null>(null)
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null)

  const isFiltered = activeFilters.length > 0

  // Measure canvas
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const update = () => setDims({ w: el.offsetWidth, h: el.offsetHeight })
    update()
    const obs = new ResizeObserver(update)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Group skills by group name (preserves order from skillCategories)
  const skillsByGroup = useMemo(() => {
    const map = new Map<string, GalaxySkill[]>()
    for (const skill of allSkills) {
      if (!map.has(skill.group)) map.set(skill.group, [])
      map.get(skill.group)!.push(skill)
    }
    return map
  }, [allSkills])

  // One rotation angle MotionValue per ring — updated each rAF frame
  const angle0 = useMotionValue(0)
  const angle1 = useMotionValue(0)
  const angle2 = useMotionValue(0)
  const angle3 = useMotionValue(0)
  const ringAngles = useMemo(
    () => [angle0, angle1, angle2, angle3],
    [angle0, angle1, angle2, angle3]
  )

  // Animation loop — drives all 4 orbit rings, respects reduced-motion
  useEffect(() => {
    if (prefersReduced) return
    let frameId: number
    let startTime: number | null = null

    const loop = (time: number) => {
      if (startTime === null) startTime = time
      const elapsed = (time - startTime) / 1000
      RING_CONFIG.forEach((cfg, i) => {
        const dir = cfg.cw ? 1 : -1
        ringAngles[i].set(dir * elapsed * ((2 * Math.PI) / cfg.speed))
      })
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [prefersReduced, ringAngles])

  return (
    <>
      {/* Outer wrapper: clips + enables horizontal scroll on narrow screens */}
      <div className="w-full overflow-x-auto rounded-3xl">
        <div
          ref={canvasRef}
          className="relative h-[600px] min-w-[640px] w-full select-none rounded-3xl border border-border"
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

          {/* ── Decorative orbit ellipses — aligned with actual ring radii ── */}
          {dims.w > 0 && (
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden
            >
              {RING_CONFIG.map((cfg, i) => (
                <ellipse
                  key={i}
                  cx={dims.w / 2}
                  cy={dims.h / 2}
                  rx={dims.w * cfg.rxPct}
                  ry={dims.h * cfg.ryPct}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity={0.07 - i * 0.01}
                />
              ))}
            </svg>
          )}

          {/* ── Skill nodes ─────────────────────────────────────────────── */}
          {dims.w > 0 && RING_CONFIG.map((cfg, ringIdx) => {
            const group = skillsByGroup.get(cfg.group) ?? []
            const cx = dims.w / 2
            const cy = dims.h / 2
            const rx = dims.w * cfg.rxPct
            const ry = dims.h * cfg.ryPct

            return group.map((skill, j) => {
              const baseAngle = (j / group.length) * 2 * Math.PI
              const isDimmed =
                isFiltered && !skill.categories.some((c) => activeFilters.includes(c))

              return (
                <SkillNode
                  key={skill.name}
                  skill={skill}
                  orbitCx={cx}
                  orbitCy={cy}
                  orbitRx={rx}
                  orbitRy={ry}
                  baseAngle={baseAngle}
                  orbitAngle={ringAngles[ringIdx]}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  isDimmed={isDimmed}
                  isHovered={hoveredSkillName === skill.name}
                  isAnyHovered={hoveredSkillName !== null}
                  onHover={() => setHoveredSkillName(skill.name)}
                  onHoverEnd={() => setHoveredSkillName(null)}
                  onSelect={() => setSelectedSkill(skill)}
                />
              )
            })
          })}

          {/* ── Hover info bar ──────────────────────────────────────────── */}
          <AnimatePresence>
            {hoveredSkillName !== null && (() => {
              const s = allSkills.find((sk) => sk.name === hoveredSkillName)
              if (!s) return null
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
            {hoveredSkillName === null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2"
              >
                <span className="font-mono text-[10px] tracking-wide text-muted-foreground/40">
                  Move cursor · Tap to explore
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
