import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { fetchGithubStats } from "./lib/actions/github-stats.action"
import { StatCounter } from "./components/stat-counter"
import { LanguageBars } from "./components/language-bars"
import { ContributionHeatmap } from "./components/contribution-heatmap"
import { GithubCta } from "./components/github-cta"

export async function GithubStats() {
  const result = await fetchGithubStats()

  if (!result.ok) {
    return null
  }

  const { profile, totalStars, topLanguages, contributions } = result.data

  const stats = [
    {
      value: profile.publicRepos,
      label: "Public repositories",
      iconKey: "GitFork",
      delay: 0,
    },
    {
      value: totalStars,
      label: "Total stars earned",
      iconKey: "Star",
      delay: 80,
    },
    {
      value: profile.followers,
      label: "Followers",
      iconKey: "Users",
      delay: 160,
    },
    {
      value: contributions.totalCommits,
      label: "Commits this year",
      iconKey: "GitCommitHorizontal",
      delay: 240,
    },
  ]

  return (
    <section
      id="contributions"
      aria-labelledby="contributions-heading"
      className="relative overflow-hidden border-y border-border bg-secondary/20 py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-100 mask-[radial-gradient(ellipse_at_center,black_45%,transparent_85%)]" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 15% 10%, oklch(0.6 0.12 175 / 0.28), transparent 60%), radial-gradient(50% 60% at 85% 25%, oklch(0.62 0.1 200 / 0.22), transparent 60%), radial-gradient(70% 60% at 50% 110%, oklch(0.6 0.12 175 / 0.30), transparent 65%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            index="06"
            title="Contribution activity"
            subtitle="Live metrics from my public profile — real data, no hand-picked numbers."
            headingId="contributions-heading"
          />
          <Reveal className="mb-12 shrink-0">
            <GithubCta profileUrl={profile.htmlUrl} login={profile.login} />
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label} delay={s.delay}>
              <StatCounter
                value={s.value}
                label={s.label}
                iconKey={s.iconKey}
                delay={s.delay}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <Reveal delay={100}>
            <div className="h-full rounded-3xl border border-border bg-card p-6 sm:p-7">
              <h3 className="mb-5 text-base font-semibold text-foreground">Top languages</h3>
              {topLanguages.length > 0 ? (
                <LanguageBars languages={topLanguages} />
              ) : (
                <p className="text-sm text-muted-foreground">No language data available.</p>
              )}
            </div>
          </Reveal>

          <Reveal delay={180} className="self-start">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-7">
              {contributions.weeks.length > 0 ? (
                <ContributionHeatmap
                  weeks={contributions.weeks}
                  totalContributions={contributions.totalContributions}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                  <p className="text-sm font-medium text-foreground">Contribution calendar</p>
                  <p className="text-xs text-muted-foreground">
                    Add a <code className="rounded bg-secondary px-1 py-0.5 font-mono text-[11px]">GITHUB_TOKEN</code> to
                    enable the contribution heatmap.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
