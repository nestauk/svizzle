/**
* @module @svizzle/dom/html
*/

export const alignTags = htmlString =>
  htmlString
  .replace(/>\s*</gu, '>\n<')
  .replace(/>\s*\[/gu, '>\n[')
  .replace(/\]\s*</gu, ']\n<');
