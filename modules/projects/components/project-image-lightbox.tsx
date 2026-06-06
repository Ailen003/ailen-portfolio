"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectImageLightboxProps {
  images: string[]
  projectTitle: string
}

export function ProjectImageLightbox({ images, projectTitle }: ProjectImageLightboxProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [images.length])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxIndex, closeLightbox, prev, next])

  if (images.length === 0) return null

  return (
    <>
      <div
        className={`grid gap-2 ${
          images.length === 1
            ? "grid-cols-1"
            : images.length === 2
            ? "grid-cols-2"
            : "grid-cols-2 sm:grid-cols-3"
        }`}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openLightbox(i)}
            className="group relative aspect-video overflow-hidden rounded-xl border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Image
              src={src || "/placeholder.svg"}
              alt={`${projectTitle} screenshot ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-3 sm:p-6"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); next() }}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-16"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="relative mx-auto w-full max-w-5xl px-12 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src={images[lightboxIndex] || "/placeholder.svg"}
                  alt={`${projectTitle} screenshot ${lightboxIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
              {images.length > 1 && (
                <p className="mt-2 text-center font-mono text-xs text-white/50">
                  {lightboxIndex + 1} / {images.length}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
