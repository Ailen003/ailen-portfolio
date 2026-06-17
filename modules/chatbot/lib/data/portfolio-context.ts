import { aboutFacts } from "@/modules/about/lib/data/about.data"
import { experienceRoles } from "@/modules/experience/lib/data/experience.data"
import { educationEntries, certifications } from "@/modules/education/lib/data/education.data"
import { endToEndProjects, contributionProjects, researchProjects } from "@/modules/projects/lib/data/projects.data"
import { skillCategories } from "@/modules/skills/lib/data/skills.data"

function buildContext(): string {
  const facts = aboutFacts.map((f) => `- ${f.label}: ${f.value}`).join("\n")

  const experience = experienceRoles
    .map(
      (r) =>
        `### ${r.role} @ ${r.company} (${r.period})\n${r.summary}\nAchievements:\n${r.achievements.map((a) => `- ${a}`).join("\n")}\nTech: ${r.tags.join(", ")}`,
    )
    .join("\n\n")

  const skills = skillCategories
    .map(
      (cat) =>
        `**${cat.title}**: ${cat.skills.map((s) => `${s.name} (${s.level})`).join(", ")}`,
    )
    .join("\n")

  const mainProjects = endToEndProjects
    .map(
      (p) =>
        `### ${p.title} — ${p.tagline}\n${p.description}\nStack: ${p.tags.join(", ")} | Year: ${p.year} | Team: ${p.teamSize}`,
    )
    .join("\n\n")

  const contributions = contributionProjects
    .map((p) => `- **${p.title}** (${p.role}): ${p.description}`)
    .join("\n")

  const research = researchProjects
    .map((p) => `- **${p.title}** [${p.researchType}]: ${p.description}`)
    .join("\n")

  const education = educationEntries
    .map((e) => `- ${e.period} — ${e.title} at ${e.org}. ${e.detail}`)
    .join("\n")

  const certs = certifications
    .map((c) => `- ${c.title} (${c.org}, ${c.year})`)
    .join("\n")

  return `
## Quick facts
${facts}

## Work experience
${experience}

## Technical skills
${skills}

## Main projects (built end-to-end)
${mainProjects}

## Open-source contributions
${contributions}

## Research & experiments
${research}

## Education
${education}

## Certifications
${certs}

## Services offered
- Remote full-time or part-time engineering roles
- Freelance product development
- Technical consulting & architecture reviews
- Code reviews & mentoring
`.trim()
}

export const PORTFOLIO_SYSTEM_PROMPT = `You are an AI assistant embedded in Elena Vargas's personal portfolio website. Your role is to answer any questions visitors have about Elena — her background, skills, experience, projects, values, availability, and anything else covered in the context below.

Rules:
- Answer ONLY based on the information provided. If something isn't covered, say you don't have that information.
- Be conversational, concise, and friendly. Avoid bullet-point dumps unless the question clearly calls for a list.
- Always respond in the same language the visitor uses (detect it from their message).
- Never fabricate facts, links, or project details not mentioned here.
- If someone asks to contact Elena, mention her email: hello@elena.dev or the contact section of the portfolio.

--- PORTFOLIO CONTEXT ---

${buildContext()}

--- END CONTEXT ---`
