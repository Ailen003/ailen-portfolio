"use client"

import { useEffect, useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { SKILL_LEVEL_META, type Skill } from "../lib/types/skills.types"

const NODE_SIZE = 52
const HALF = NODE_SIZE / 2

interface SkillNodeProps {
  skill: Skill & { group: string }
  orbitCx: number
  orbitCy: number
  orbitRx: number
  orbitRy: number
  baseAngle: number
  orbitAngle: MotionValue<number>
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  isDimmed: boolean
  isHovered: boolean
  isAnyHovered: boolean
  onHover: () => void
  onHoverEnd: () => void
  onSelect: () => void
}

export function SkillNode({
  skill,
  orbitCx,
  orbitCy,
  orbitRx,
  orbitRy,
  baseAngle,
  orbitAngle,
  mouseX,
  mouseY,
  isDimmed,
  isHovered,
  isAnyHovered,
  onHover,
  onHoverEnd,
  onSelect,
}: SkillNodeProps) {
  const { name, Icon, color, level } = skill

  // ─── Orbital position ────────────────────────────────────────────────────────
  // Keep orbit params in a ref so the transform closure always reads the latest
  // values even after a canvas resize triggers a re-render.
  const orbitRef = useRef({ cx: orbitCx, cy: orbitCy, rx: orbitRx, ry: orbitRy, base: baseAngle })
  useEffect(() => {
    orbitRef.current = { cx: orbitCx, cy: orbitCy, rx: orbitRx, ry: orbitRy, base: baseAngle }
  }, [orbitCx, orbitCy, orbitRx, orbitRy, baseAngle])

  const nodeX = useTransform(orbitAngle, (a) => {
    const { cx, rx, base } = orbitRef.current
    return cx + Math.cos(base + a) * rx
  })
  const nodeY = useTransform(orbitAngle, (a) => {
    const { cy, ry, base } = orbitRef.current
    return cy + Math.sin(base + a) * ry
  })

  // ─── Gravity ─────────────────────────────────────────────────────────────────
  const rawGX = useMotionValue(0)
  const rawGY = useMotionValue(0)
  const gX = useSpring(rawGX, { stiffness: 52, damping: 22, mass: 0.55 })
  const gY = useSpring(rawGY, { stiffness: 52, damping: 22, mass: 0.55 })

  useEffect(() => {
    const unsub = mouseX.on("change", (mx) => {
      if (!isFinite(mx)) {
        rawGX.set(0)
        rawGY.set(0)
        return
      }
      const nx = nodeX.get()
      const ny = nodeY.get()
      const my = mouseY.get()
      const dx = mx - nx
      const dy = my - ny
      const dist = Math.sqrt(dx * dx + dy * dy)
      const RADIUS = 190
      const STRENGTH = 0.20

      if (dist < RADIUS && dist > 2) {
        const factor = ((RADIUS - dist) / RADIUS) * STRENGTH
        rawGX.set(dx * factor)
        rawGY.set(dy * factor)
      } else {
        rawGX.set(0)
        rawGY.set(0)
      }
    })
    return unsub
  }, [mouseX, mouseY, rawGX, rawGY, nodeX, nodeY])

  // ─── Final position: top-left corner of node (center + gravity − half-size) ──
  const finalLeft = useTransform(
    [nodeX, gX] as MotionValue<number>[],
    ([n, g]: number[]) => n + g - HALF
  )
  const finalTop = useTransform(
    [nodeY, gY] as MotionValue<number>[],
    ([n, g]: number[]) => n + g - HALF
  )

  const targetOpacity = isDimmed
    ? 0.17
    : isAnyHovered && !isHovered
    ? 0.5
    : 1

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: finalLeft,
        top: finalTop,
        width: NODE_SIZE,
        height: NODE_SIZE,
        zIndex: isHovered ? 30 : 1,
      }}
    >
      <div className="pointer-events-auto relative w-full h-full">
        {/* Ambient glow bloom — expands on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.6 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle, ${color}28 0%, transparent 70%)`,
            filter: "blur(10px)",
          }}
        />

        <motion.button
          type="button"
          aria-label={`${name} · ${SKILL_LEVEL_META[level].label} · ${skill.group}`}
          onClick={onSelect}
          onHoverStart={onHover}
          onHoverEnd={onHoverEnd}
          onFocus={onHover}
          onBlur={onHoverEnd}
          animate={{
            scale: isHovered ? 1.22 : 1,
            opacity: targetOpacity,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative flex items-center justify-center rounded-2xl border border-border bg-secondary/80 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
          style={{
            width: NODE_SIZE,
            height: NODE_SIZE,
            boxShadow: isHovered
              ? `0 0 28px ${color}80, 0 0 56px ${color}25`
              : `0 0 10px ${color}35`,
          }}
        >
          <Icon
            className="h-6 w-6"
            style={{ color }}
            aria-hidden
          />
        </motion.button>
      </div>
    </motion.div>
  )
}
