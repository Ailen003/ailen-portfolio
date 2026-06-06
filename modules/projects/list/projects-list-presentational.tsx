"use client"

import { useState, useMemo } from "react"
import { ProjectsCategoryFilter } from "../components/projects-category-filter"
import { EndToEndProjectCard } from "../components/end-to-end-project-card"
import { ContributionProjectCard } from "../components/contribution-project-card"
import { ResearchProjectCard } from "../components/research-project-card"
import { ProjectLevelSection } from "../components/project-level-section"
import type {
  EndToEndProject,
  ContributionProject,
  ResearchProject,
  ProjectCategory,
} from "../lib/types/project.types"

interface ProjectsListPresentationalProps {
  endToEnd: EndToEndProject[]
  contributions: ContributionProject[]
  research: ResearchProject[]
}

function hasCategory<T extends { categories: ProjectCategory[] }>(
  items: T[],
  active: ProjectCategory[]
): T[] {
  if (active.length === 0) return items
  return items.filter((p) => p.categories.some((c) => active.includes(c)))
}

export function ProjectsListPresentational({
  endToEnd,
  contributions,
  research,
}: ProjectsListPresentationalProps) {
  const [activeFilters, setActiveFilters] = useState<ProjectCategory[]>([])

  const filteredEndToEnd = useMemo(() => hasCategory(endToEnd, activeFilters), [endToEnd, activeFilters])
  const filteredContributions = useMemo(() => hasCategory(contributions, activeFilters), [contributions, activeFilters])
  const filteredResearch = useMemo(() => hasCategory(research, activeFilters), [research, activeFilters])

  function handleToggle(category: ProjectCategory) {
    setActiveFilters((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  function handleReset() {
    setActiveFilters([])
  }

  const featuredProject = filteredEndToEnd.find((p) => p.featured)
  const otherEndToEnd = filteredEndToEnd.filter((p) => !p.featured)

  return (
    <>
      <ProjectsCategoryFilter
        activeFilters={activeFilters}
        onToggle={handleToggle}
        onReset={handleReset}
      />

      <ProjectLevelSection
        number="01"
        title="End-to-End Projects"
        description="Projects where I owned the full cycle — from architecture and design to deployment and maintenance."
        isEmpty={filteredEndToEnd.length === 0}
      >
        {featuredProject && (
          <EndToEndProjectCard project={featuredProject} index={0} />
        )}
        {otherEndToEnd.length > 0 && (
          <div className={`grid gap-6 md:grid-cols-2 ${featuredProject ? "mt-6" : ""}`}>
            {otherEndToEnd.map((p, i) => (
              <EndToEndProjectCard key={p.title} project={p} index={i + 1} />
            ))}
          </div>
        )}
      </ProjectLevelSection>

      <ProjectLevelSection
        number="02"
        title="Projects with Contribution"
        description="Work done as part of a team — open-source contributions, collaborative builds, and contract work."
        isEmpty={filteredContributions.length === 0}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContributions.map((p, i) => (
            <ContributionProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </ProjectLevelSection>

      <ProjectLevelSection
        number="03"
        title="Research & Studies"
        description="Explorations, POCs, and deep dives — demonstrating technical curiosity and continuous learning."
        isEmpty={filteredResearch.length === 0}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredResearch.map((p, i) => (
            <ResearchProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </ProjectLevelSection>
    </>
  )
}
