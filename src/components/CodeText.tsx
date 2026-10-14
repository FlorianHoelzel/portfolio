// Curated copy can mark real identifiers with backticks, without a Markdown dependency.
export function CodeText({ text }: { text: string }) {
  return <>{text.split(/(`[^`]+`)/g).map((part, index) =>
    part.startsWith('`') && part.endsWith('`')
      ? <code key={index}>{part.slice(1, -1)}</code>
      : part
  )}</>;
}
