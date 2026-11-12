import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Exclude _next, api, static assets, and metadata routes
    // (sitemap.xml, robots.txt, manifest.webmanifest, icons) so next-intl
    // does not prefix them with a locale.
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};
