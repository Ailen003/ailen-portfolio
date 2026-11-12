import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { routing } from "@/i18n/routing"
import { PERSON_NAME } from "@/lib/seo/site-config"
import { renderOgImage } from "@/lib/seo/og-image"
import { portfolioIdentity } from "@/modules/portfolio/lib/data/identity.data"

export const alt = `${PERSON_NAME} — ${portfolioIdentity.brand}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage({ params }: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return renderOgImage(locale)
}
