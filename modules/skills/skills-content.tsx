import { fetchSkillsData } from "./lib/actions/skills.action"
import { SkillsClient } from "./components/skills-client"

export async function Skills() {
  const result = await fetchSkillsData()

  if (!result.ok) return null

  return <SkillsClient data={result.data} />
}
