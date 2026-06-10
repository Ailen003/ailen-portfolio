import { renderOgImage, ogSize, ogContentType } from "@/lib/seo/og-image"
import { routing } from "@/i18n/routing"

export const alt = "Elena Vargas — Software Engineer portfolio"
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return renderOgImage(locale)
}
