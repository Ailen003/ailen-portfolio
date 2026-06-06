import { endToEndProjects, contributionProjects, researchProjects } from "../lib/data/projects.data"
import { ProjectsListPresentational } from "./projects-list-presentational"

export function ProjectsListContainer() {
  return (
    <ProjectsListPresentational
      endToEnd={endToEndProjects}
      contributions={contributionProjects}
      research={researchProjects}
    />
  )
}
