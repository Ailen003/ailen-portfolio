import { SectionHeading } from "@/components/section-heading"
import { ProjectsListContainer } from "./list/projects-list-container"

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 topo-pattern" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background/60" />


      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          title="Selected projects"
          subtitle="A few things I've designed, built, and shipped end to end."
        />
        <ProjectsListContainer />
      </div>
    </section>
  )
}
