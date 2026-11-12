"use client"

import { useEffect, useState } from "react"

function useTypewriter(
  words: string[],
  typeSpeed = 80,
  deleteSpeed = 40,
  pause = 1400,
  cycle = true,
  startDelay = 0,
) {
  const [text, setText] = useState(words[0] ?? "")
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [startDelay])

  useEffect(() => {
    if (!started || reducedMotion || words.length === 0) return

    const current = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === current) {
      if (cycle) {
        timeout = setTimeout(() => setDeleting(true), pause)
      }
    } else if (deleting && text === "") {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1),
          )
        },
        deleting ? deleteSpeed : typeSpeed,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause, cycle, started, reducedMotion])

  return { text, reducedMotion }
}

interface HeroRolesProps {
  roles: string[]
}

export function HeroRoles({ roles }: HeroRolesProps) {
  const { text: role, reducedMotion } = useTypewriter(roles, 80, 40, 2000, true, 0)

  return (
    <h2 className="hero-role mt-4">
      <span className="sr-only">{roles.join(" / ")}</span>
      <span aria-hidden="true">{reducedMotion ? roles[0] : role}</span>
      {!reducedMotion && <span aria-hidden="true" className="ml-0.5 opacity-50">|</span>}
    </h2>
  )
}
