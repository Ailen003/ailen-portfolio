"use client"

import { useState } from "react"
import { LayoutGrid, Sparkles } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { marqueeSkills, skillCategories } from "./lib/data/skills.data"
import { SkillIcon } from "./components/skill-icon"
import { SkillsGalaxy } from "./components/skills-galaxy"
import { CategoryFilter } from "./components/category-filter"
import type { SkillCategoryTag } from "./lib/types/skills.types"


export function Skills() {
  const [activeFilters, setActiveFilters] = useState<SkillCategoryTag[]>([])

  const toggleFilter = (tag: SkillCategoryTag) =>
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y border-border bg-secondary/30 diagonal-stripe-pattern py-24"
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          title="Technical skills"
          subtitle="A toolkit refined across products and teams. Click any skill to see my experience in detail."
        />

        <Tabs defaultValue="grid" className="w-full">
          {/* ── Tab switcher ───────────────────────────────────────────── */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <TabsList className="h-10 gap-0.5 rounded-xl p-1">
              <TabsTrigger
                value="grid"
                className="flex items-center gap-1.5 rounded-lg px-3 text-sm data-[state=active]:font-semibold"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Por categorías</span>
                <span className="sm:hidden">Categorías</span>
              </TabsTrigger>
              <TabsTrigger
                value="galaxy"
                className="flex items-center gap-1.5 rounded-lg px-3 text-sm data-[state=active]:font-semibold"
              >
                <Sparkles className="h-4 w-4" />
                Órbita
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ── Grid view ──────────────────────────────────────────────── */}
          <TabsContent value="grid">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
              {skillCategories.map((cat, i) => (
                <Reveal key={cat.title} delay={i * 90}>
                  <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-7">
                    {/* subtle glow that follows the card on hover */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <header className="mb-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-accent text-primary transition-colors duration-300 group-hover:border-primary/40">
                        <cat.icon className="h-6 w-6" aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
                        <p className="text-sm text-muted-foreground">{cat.tagline}</p>
                      </div>
                    </header>

                    <ul className="grid grid-cols-3 gap-3">
                      {cat.skills.map((skill) => (
                        <SkillIcon key={skill.name} skill={skill} />
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </TabsContent>

          {/* ── Galaxy view ────────────────────────────────────────────── */}
          <TabsContent value="galaxy">
            <CategoryFilter
              activeFilters={activeFilters}
              onToggle={toggleFilter}
              onReset={() => setActiveFilters([])}
            />
            <SkillsGalaxy activeFilters={activeFilters} />
          </TabsContent>
        </Tabs>
      </div>

      {/* ── Marquee strip of brand icons (shared) ───────────────────────── */}
      <div className="group/marquee relative mt-16 flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...marqueeSkills, ...marqueeSkills].map((item, i) => (
            <span key={`${item.name}-${i}`} className="flex items-center gap-3" title={item.name}>
              <item.Icon className="h-7 w-7" style={{ color: item.color }} aria-hidden />
              <span className="whitespace-nowrap font-mono text-sm font-medium text-foreground/60">
                {item.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
