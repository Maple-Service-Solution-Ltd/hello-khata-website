import { notFound } from "next/navigation";

/**
 * Any unknown URL under a locale (e.g. /bn/old-page) lands here and renders the localised not-found page,
 * inside the site layout with the right <html lang>, instead of Next's bare English 404. Status stays 404.
 */
export const dynamic = "force-dynamic";

export default function CatchAll() {
  notFound();
}
