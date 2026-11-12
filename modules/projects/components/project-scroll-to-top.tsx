"use client"

import { useEffect } from "react"

export function ProjectScrollToTop({ projectKey }: { projectKey: string }) {
  useEffect(() => {
    // Run after the destination is committed, rather than scrolling the outgoing page.
    const frame = window.requestAnimationFrame(() => {
      // Direct links to a section must keep their intended destination.
      if (window.location.hash) return

      // Focus without triggering the browser's own scroll-to-focused-element behavior.
      document.getElementById("main-content")?.focus({ preventScroll: true })
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [projectKey])

  return null
}
