import { ImageResponse } from "next/og"
import { getTranslations } from "next-intl/server"
import { PERSON_NAME, getSiteUrl } from "./site-config"

/** Shared size/content-type for the generated social images. */
export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

/**
 * Renders the Open Graph / Twitter card image for a given locale.
 * Content (role, site name) is pulled from the translations so it stays in
 * sync with the rest of the site.
 */
export async function renderOgImage(locale: string): Promise<ImageResponse> {
  const seo = await getTranslations({ locale, namespace: "seo" })
  const jobTitle = seo("jobTitle")
  const siteName = seo("siteName")
  const host = getSiteUrl().replace(/^https?:\/\//, "")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 80% 0%, #5c3b28 0%, #1c1612 55%)",
          color: "#f4eadc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "9999px",
              background: "#efa875",
            }}
          />
          <div
            style={{
              fontSize: "26px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#c7b29c",
            }}
          >
            {siteName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            {PERSON_NAME}
          </div>
          <div style={{ fontSize: "44px", fontWeight: 600, color: "#efa875" }}>
            {jobTitle}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "28px", color: "#c7b29c" }}>
          <span>{host}</span>
          <span style={{ textTransform: "uppercase", letterSpacing: "2px" }}>{locale}</span>
        </div>
      </div>
    ),
    { ...ogSize },
  )
}
