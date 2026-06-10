import type { MetadataRoute } from "next"
import { absoluteUrl, getSiteUrl } from "@/lib/seo/site-config"

/**
 * robots.txt — allow full crawling and advertise the sitemap.
 * The base URL is read from NEXT_PUBLIC_SITE_URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteUrl(),
  }
}
