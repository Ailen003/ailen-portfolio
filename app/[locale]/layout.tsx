import type { Metadata, Viewport } from "next"
import { Sora, JetBrains_Mono } from "next/font/google"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { Analytics } from "@vercel/analytics/next"
import { ChatbotWidget } from "@/modules/chatbot/chatbot-widget"
import { routing } from "@/i18n/routing"
import { Providers } from "@/app/providers"
import {
  PERSON_NAME,
  getSiteUrl,
  localePath,
  LOCALES,
  DEFAULT_LOCALE,
} from "@/lib/seo/site-config"
import "../globals.css"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  const seo = await getTranslations({ locale, namespace: "seo" })

  const title = t("title")
  const description = t("description")
  const siteUrl = getSiteUrl()
  
  // hreflang alternates — one entry per locale plus an x-default.
  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((l) => [l, localePath(l)]),
  )
  languages["x-default"] = localePath(DEFAULT_LOCALE)

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: seo("siteName"),
    generator: "Next.js",
    keywords: seo("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    authors: [{ name: PERSON_NAME, url: siteUrl }],
    creator: PERSON_NAME,
    publisher: PERSON_NAME,
    alternates: {
      canonical: localePath(locale),
      languages,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: localePath(locale),
      siteName: seo("siteName"),
      locale,
      alternateLocale: LOCALES.filter((l) => l !== locale),
      images: [
        {
          url: "/og-image.webp",
          width: 1200,
          height: 630,
          alt: seo("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: PERSON_NAME,
      images: ["/elena-portrait.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "profile:first_name": PERSON_NAME.split(" ")[0],
      "profile:last_name": PERSON_NAME.split(" ").slice(1).join(" "),
    },
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${sora.variable} ${jetbrainsMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Providers>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
          <ChatbotWidget />
        </Providers>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
