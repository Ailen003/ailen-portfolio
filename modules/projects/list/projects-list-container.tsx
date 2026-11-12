import { ProjectsListPresentational } from "./projects-list-presentational"
import type { ContributionProject, EndToEndProject, ResearchProject } from "../lib/types/project.types"

interface ProjectsListContainerProps {
  endToEnd: EndToEndProject[]
  contributions: ContributionProject[]
  research: ResearchProject[]
}

export function ProjectsListContainer({
  endToEnd,
  contributions,
  research,
}: ProjectsListContainerProps) {
  return (
    <ProjectsListPresentational
      endToEnd={endToEnd}
      contributions={contributions}
      research={research}
    />
  )
}
