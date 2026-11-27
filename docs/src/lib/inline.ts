const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

/** Escapes text and turns `backticks` into code elements, for JSDoc descriptions. */
export function inlineMarkdown(text: string) {
  return text
    .replace(/[&<>"]/g, (char) => ESCAPES[char] ?? char)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, ' ');
}
