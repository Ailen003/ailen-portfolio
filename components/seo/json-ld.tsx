/**
 * Server component that renders one or more JSON-LD structured-data graphs.
 * No client JavaScript is shipped; the script tag is part of the SSR HTML
 * so crawlers can read it immediately.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const graphs = Array.isArray(data) ? data : [data]

  return (
    <>
      {graphs.map((graph, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is safe here: it's derived from our own
          // trusted content data, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  )
}
