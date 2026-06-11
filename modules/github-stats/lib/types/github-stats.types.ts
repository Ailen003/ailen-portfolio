export interface GithubProfile {
  login: string
  name: string | null
  bio: string | null
  avatarUrl: string
  publicRepos: number
  followers: number
  following: number
  htmlUrl: string
}

export interface GithubLanguage {
  name: string
  bytes: number
  percentage: number
  color: string
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionWeek {
  days: ContributionDay[]
}

export interface GithubContributions {
  totalCommits: number
  totalContributions: number
  currentStreak: number
  weeks: ContributionWeek[]
}

export interface GithubStats {
  profile: GithubProfile
  totalStars: number
  topLanguages: GithubLanguage[]
  contributions: GithubContributions
}

export type GithubStatsResult =
  | { ok: true; data: GithubStats }
  | { ok: false; error: string }
