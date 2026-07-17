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
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [startDelay])

  useEffect(() => {
    if (!started) return

    const current = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === current) {
      setIsTyping(false)
      if (cycle) {
        timeout = setTimeout(() => setDeleting(true), pause)
      }
    } else if (deleting && text === "") {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      setIsTyping(true)
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
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause, cycle, started])

  return { text, isTyping }
}

interface HeroRolesProps {
  roles: string[]
}

export function HeroRoles({ roles }: HeroRolesProps) {
  const { text: role, isTyping: roleTyping } = useTypewriter(roles, 80, 40, 2000, true, 0)

  return (
    <h2
      className="mt-3 text-xl font-semibold text-muted-foreground sm:text-2xl md:text-3xl"
      style={{ minHeight: "1.5em" }}
    >
      {role}
      <span className={`caret ${!roleTyping ? "blinking" : ""}`}>|</span>
    </h2>
  )
}
