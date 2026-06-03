import { featuredProject, projects, moreProjects } from "../lib/data/projects.data"
import { ProjectsListPresentational } from "./projects-list-presentational"

export function ProjectsListContainer() {
  return (
    <ProjectsListPresentational
      featured={featuredProject}
      projects={projects}
      more={moreProjects}
    />
  )
}
