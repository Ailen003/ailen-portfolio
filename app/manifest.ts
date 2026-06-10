import type { MetadataRoute } from "next"
import { PERSON_NAME } from "@/lib/seo/site-config"

/**
 * Web app manifest for installability and richer search/app metadata.
 * Icons reuse the existing assets in /public.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PERSON_NAME} — Portfolio`,
    short_name: PERSON_NAME,
    description: `Portfolio of ${PERSON_NAME}, senior software engineer.`,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icon-light-32x32.png", type: "image/png", sizes: "32x32" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  }
}
