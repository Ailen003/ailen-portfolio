import type { Metadata } from "next"
import { Sora, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

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

export const metadata: Metadata = {
  title: "Elena Vargas — Software Engineer",
  description:
    "Portfolio of Elena Vargas, a senior software engineer crafting performant, accessible web products with thoughtful design and robust engineering.",
  generator: "v0.app",
  openGraph: {
    title: "Elena Vargas — Software Engineer",
    description:
      "Senior software engineer crafting performant, accessible web products.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
