"use client"

import { useMemo, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { ProjectsCategoryFilter } from "../components/projects-category-filter"
import { EndToEndProjectCard } from "../components/end-to-end-project-card"
import { ContributionProjectCard } from "../components/contribution-project-card"
import { ResearchProjectCard } from "../components/research-project-card"
import { ProjectLevelSection } from "../components/project-level-section"
import { EndToEndProjectModal } from "../components/end-to-end-project-modal"
import { ContributionProjectModal } from "../components/contribution-project-modal"
import { ResearchProjectModal } from "../components/research-project-modal"
import {
  PROJECT_CATEGORY_META,
  type ProjectCategory,
} from "../lib/types/project.types"
import type {
  EndToEndProject,
  ContributionProject,
  ResearchProject,
} from "../lib/types/project.types"

interface ProjectsListPresentationalProps {
  endToEnd: EndToEndProject[]
  contributions: ContributionProject[]
  research: ResearchProject[]
}

type ProjectFilterGroup = "endToEnd" | "contributions" | "research"

type ProjectFilters = Record<ProjectFilterGroup, ProjectCategory[]>

const CATEGORY_ORDER = Object.keys(PROJECT_CATEGORY_META) as ProjectCategory[]

function hasCategory<T extends { categories: ProjectCategory[] }>(
  items: T[],
  active: ProjectCategory[],
): T[] {
  if (active.length === 0) return items
  return items.filter((p) => p.categories.some((c) => active.includes(c)))
}

function availableCategories<T extends { categories: ProjectCategory[] }>(items: T[]): ProjectCategory[] {
  const itemCategories = new Set(items.flatMap((item) => item.categories))
  return CATEGORY_ORDER.filter((category) => itemCategories.has(category))
}

export function ProjectsListPresentational({
  endToEnd,
  contributions,
  research,
}: ProjectsListPresentationalProps) {
  const t = useTranslations("projects")
  const detailTrigger = useRef<HTMLElement | null>(null)
  const restoreDetailFocus = () => detailTrigger.current?.focus()
  const [activeFilters, setActiveFilters] = useState<ProjectFilters>({
    endToEnd: [],
    contributions: [],
    research: [],
  })
  const [selectedEndToEnd, setSelectedEndToEnd] = useState<EndToEndProject | null>(null)
  const [selectedContribution, setSelectedContribution] = useState<ContributionProject | null>(null)
  const [selectedResearch, setSelectedResearch] = useState<ResearchProject | null>(null)

  const endToEndCategories = useMemo(() => availableCategories(endToEnd), [endToEnd])
  const contributionCategories = useMemo(() => availableCategories(contributions), [contributions])
  const researchCategories = useMemo(() => availableCategories(research), [research])

  const filteredEndToEnd = useMemo(
    () => hasCategory(endToEnd, activeFilters.endToEnd),
    [endToEnd, activeFilters.endToEnd],
  )
  const filteredContributions = useMemo(
    () => hasCategory(contributions, activeFilters.contributions),
    [contributions, activeFilters.contributions],
  )
  const filteredResearch = useMemo(
    () => hasCategory(research, activeFilters.research),
    [research, activeFilters.research],
  )

  function handleToggle(group: ProjectFilterGroup, category: ProjectCategory) {
    setActiveFilters((prev) => {
      const current = prev[group]
      const next = current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category]

      return { ...prev, [group]: next }
    })
  }

  function handleReset(group: ProjectFilterGroup) {
    setActiveFilters((prev) =>
      prev[group].length === 0 ? prev : { ...prev, [group]: [] },
    )
  }

  return (
    <>
      <ProjectLevelSection
        number="01"
        title={t("sections.endToEnd.title")}
        description={t("sections.endToEnd.description")}
        emptyLabel={t("noResults")}
        isEmpty={filteredEndToEnd.length === 0}
        controls={
          <ProjectsCategoryFilter
            activeFilters={activeFilters.endToEnd}
            categories={endToEndCategories}
            className="mb-6 sm:ml-13"
            onToggle={(category) => handleToggle("endToEnd", category)}
            onReset={() => handleReset("endToEnd")}
          />
        }
      >
        <div className="project-gallery grid grid-cols-1 gap-8 md:gap-12 lg:gap-16">
          {filteredEndToEnd.map((p, i) => (
            <EndToEndProjectCard
              key={p.title}
              project={p}
              index={i}
              onOpenDetail={() => { detailTrigger.current = document.activeElement as HTMLElement; setSelectedEndToEnd(p) }}
            />
          ))}
        </div>
      </ProjectLevelSection>

      <ProjectLevelSection
        number="02"
        title={t("sections.contribution.title")}
        description={t("sections.contribution.description")}
        emptyLabel={t("noResults")}
        isEmpty={filteredContributions.length === 0}
        controls={
          <ProjectsCategoryFilter
            activeFilters={activeFilters.contributions}
            categories={contributionCategories}
            className="mb-6 sm:ml-13"
            onToggle={(category) => handleToggle("contributions", category)}
            onReset={() => handleReset("contributions")}
          />
        }
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContributions.map((p, i) => (
            <ContributionProjectCard
              key={p.title}
              project={p}
              index={i}
              onOpenDetail={() => {
                detailTrigger.current = document.activeElement as HTMLElement
                setSelectedContribution(p)
              }}
            />
          ))}
        </div>
      </ProjectLevelSection>

      <ProjectLevelSection
        number="03"
        title={t("sections.research.title")}
        description={t("sections.research.description")}
        emptyLabel={t("noResults")}
        isEmpty={filteredResearch.length === 0}
        controls={
          <ProjectsCategoryFilter
            activeFilters={activeFilters.research}
            categories={researchCategories}
            className="mb-6 sm:ml-13"
            onToggle={(category) => handleToggle("research", category)}
            onReset={() => handleReset("research")}
          />
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredResearch.map((p, i) => (
            <ResearchProjectCard
              key={p.title}
              project={p}
              index={i}
              onOpenDetail={() => {
                detailTrigger.current = document.activeElement as HTMLElement
                setSelectedResearch(p)
              }}
            />
          ))}
        </div>
      </ProjectLevelSection>

      {selectedEndToEnd && <EndToEndProjectModal project={selectedEndToEnd} open onOpenChange={open => { if (!open) setSelectedEndToEnd(null) }} onCloseAutoFocus={restoreDetailFocus} />}
      {selectedContribution && (
        <ContributionProjectModal
          onCloseAutoFocus={restoreDetailFocus}
          project={selectedContribution}
          open={selectedContribution !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedContribution(null)
          }}
        />
      )}

      {selectedResearch && (
        <ResearchProjectModal
          onCloseAutoFocus={restoreDetailFocus}
          project={selectedResearch}
          open={selectedResearch !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedResearch(null)
          }}
        />
      )}
    </>
  )
}
