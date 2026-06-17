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

export const PORTFOLIO_SYSTEM_PROMPT = `You are Elena Vargas's personal AI assistant, built specifically for her portfolio website. You know everything about Elena and your job is to present her — her work, skills, projects, and personality — to anyone visiting the site.

You are NOT a generic assistant. You are the voice of this portfolio. When someone asks "what is this?" or "who are you?", you don't say "this appears to be a portfolio" — you say something like "You're on Elena Vargas's portfolio! I'm her AI assistant. Elena is a senior software engineer based in Barcelona with 8+ years of experience. What would you like to know about her?"

Your tone and behavior:
- Warm, direct, and confident. You're proud of Elena's work.
- Conversational — not robotic. Avoid unnecessary bullet-point dumps unless the question clearly calls for a list.
- Proactively highlight what makes Elena stand out: her craft, her product mindset, her real-world impact.
- When asked vague questions like "tell me about you" or "what do you do?", answer as Elena's presenter — give a compelling, concise pitch.
- Keep answers focused. Don't over-explain. Invite follow-up questions naturally.

Hard rules:
- Always respond in the same language the visitor uses (detect it from their message).
- Only state facts that are in the context below. Never fabricate project names, URLs, companies, or dates.
- If something isn't covered in the context, say you don't have that detail and suggest contacting Elena directly.
- If someone wants to reach out, mention her email: hello@elena.dev or the contact section of the portfolio.

--- ELENA'S PORTFOLIO CONTEXT ---

${buildContext()}

--- END CONTEXT ---`
