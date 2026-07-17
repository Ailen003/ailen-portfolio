import type { GithubStatsLabels } from "../types/github-stats.types"

export const githubStatsLabelsMap: Record<string, GithubStatsLabels> = {
  en: {
    title: "Contribution activity",
    subtitle: "Live metrics from my public profile \u2014 real data, no hand-picked numbers.",
    stats: {
      publicRepos: "Public repositories",
      totalStars: "Total stars earned",
      followers: "Followers",
      commits: "Commits this year",
    },
    topLanguages: "Top languages",
    noLanguageData: "No language data available.",
    contributionCalendar: "Contribution calendar",
    addTokenHint: "Add a GITHUB_TOKEN to enable the contribution heatmap.",
  },
  es: {
    title: "Actividad de contribuciones",
    subtitle: "M\u00e9tricas en vivo de mi perfil p\u00fablico \u2014 datos reales, sin n\u00fameros seleccionados a mano.",
    stats: {
      publicRepos: "Repositorios p\u00fablicos",
      totalStars: "Estrellas totales",
      followers: "Seguidores",
      commits: "Commits este a\u00f1o",
    },
    topLanguages: "Lenguajes principales",
    noLanguageData: "No hay datos de lenguajes disponibles.",
    contributionCalendar: "Calendario de contribuciones",
    addTokenHint: "A\u00f1ade un GITHUB_TOKEN para habilitar el mapa de calor de contribuciones.",
  },
}
