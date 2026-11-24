import { jsonLdString } from "@/lib/structured-data";

/** Renders schema.org nodes as one JSON-LD script (server-rendered, no client JS). */
export function JsonLd({ nodes }: { nodes: object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(...nodes) }} />;
}
