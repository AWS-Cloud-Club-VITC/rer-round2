/**
 * Renders an inline script that runs during HTML parsing (before first paint)
 * but is inert on the client, where React warns about rendering <script> tags.
 * Pattern from next/dist/docs — "How to prevent flash before hydration".
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
