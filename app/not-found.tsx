import Link from "next/link"
import { Sora, JetBrains_Mono } from "next/font/google"
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

export default function NotFound() {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
          <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
            Error 404
          </p>
          <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-8xl">
            404
          </h1>
          <p className="max-w-sm text-base text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
          >
            Go back home
          </Link>
        </div>
      </body>
    </html>
  )
}
