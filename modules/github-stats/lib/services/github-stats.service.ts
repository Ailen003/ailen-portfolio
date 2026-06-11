import type {
  GithubProfile,
  GithubLanguage,
  GithubContributions,
  GithubStats,
  ContributionDay,
  ContributionWeek,
} from "../types/github-stats.types"

const GITHUB_API = "https://api.github.com"
const GITHUB_GRAPHQL = "https://api.github.com/graphql"

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  PHP: "#4F5D95",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Lua: "#000080",
  R: "#198CE7",
  Scala: "#c22d40",
}

function getLanguageColor(name: string): string {
  return LANGUAGE_COLORS[name] ?? "#8b949e"
}

function buildHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  if (token) headers["Authorization"] = `Bearer ${token}`
  return headers
}

async function fetchProfile(username: string): Promise<GithubProfile> {
  const res = await fetch(`${GITHUB_API}/users/${username}`, {
    headers: buildHeaders(),
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`GitHub profile fetch failed: ${res.status}`)
  const data = await res.json()
  return {
    login: data.login,
    name: data.name,
    bio: data.bio,
    avatarUrl: data.avatar_url,
    publicRepos: data.public_repos,
    followers: data.followers,
    following: data.following,
    htmlUrl: data.html_url,
  }
}

async function fetchTopLanguagesAndStars(
  username: string,
): Promise<{ languages: GithubLanguage[]; totalStars: number }> {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=pushed&type=owner`,
    {
      headers: buildHeaders(),
      next: { revalidate: 3600 },
    },
  )
  if (!res.ok) throw new Error(`GitHub repos fetch failed: ${res.status}`)
  const repos = await res.json()

  const langBytes: Record<string, number> = {}
  let totalStars = 0

  for (const repo of repos) {
    if (repo.fork) continue
    totalStars += repo.stargazers_count ?? 0
    if (repo.language) {
      langBytes[repo.language] = (langBytes[repo.language] ?? 0) + 1
    }
  }

  const langEntries = await Promise.allSettled(
    repos
      .filter((r: { fork: boolean }) => !r.fork)
      .slice(0, 30)
      .map(async (repo: { languages_url: string }) => {
        const r = await fetch(repo.languages_url, {
          headers: buildHeaders(),
          next: { revalidate: 3600 },
        })
        if (!r.ok) return {}
        return r.json()
      }),
  )

  const aggregated: Record<string, number> = {}
  for (const result of langEntries) {
    if (result.status === "fulfilled") {
      const langs = result.value as Record<string, number>
      for (const [lang, bytes] of Object.entries(langs)) {
        aggregated[lang] = (aggregated[lang] ?? 0) + bytes
      }
    }
  }

  const totalBytes = Object.values(aggregated).reduce((a, b) => a + b, 0)
  const sorted = Object.entries(aggregated)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
      color: getLanguageColor(name),
    }))

  return { languages: sorted, totalStars }
}

const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        totalCommitContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`

const CONTRIBUTION_LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

async function fetchContributions(username: string): Promise<GithubContributions> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return {
      totalCommits: 0,
      totalContributions: 0,
      currentStreak: 0,
      weeks: [],
    }
  }

  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { username } }),
    next: { revalidate: 3600 },
  })

  if (!res.ok) throw new Error(`GitHub GraphQL fetch failed: ${res.status}`)
  const json = await res.json()
  const collection = json?.data?.user?.contributionsCollection
  if (!collection) throw new Error("No contributionsCollection in GraphQL response")

  const cal = collection.contributionCalendar
  const weeks: ContributionWeek[] = cal.weeks.map(
    (w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) => ({
      days: w.contributionDays.map(
        (d): ContributionDay => ({
          date: d.date,
          count: d.contributionCount,
          level: CONTRIBUTION_LEVEL_MAP[d.contributionLevel] ?? 0,
        }),
      ),
    }),
  )

  const allDays = weeks.flatMap((w) => w.days).sort((a, b) => b.date.localeCompare(a.date))
  let currentStreak = 0
  for (const day of allDays) {
    if (day.count > 0) currentStreak++
    else break
  }

  return {
    totalCommits: collection.totalCommitContributions,
    totalContributions: cal.totalContributions,
    currentStreak,
    weeks,
  }
}

export async function getGithubStats(): Promise<GithubStats> {
  const username = process.env.GITHUB_USERNAME
  if (!username) throw new Error("GITHUB_USERNAME environment variable is not set")

  const [profile, langAndStars, contributions] = await Promise.all([
    fetchProfile(username),
    fetchTopLanguagesAndStars(username),
    fetchContributions(username),
  ])

  return {
    profile,
    totalStars: langAndStars.totalStars,
    topLanguages: langAndStars.languages,
    contributions,
  }
}
