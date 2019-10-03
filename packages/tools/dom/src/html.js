/**
* @module @svizzle/dom/html
*/

export const alignTags = htmlString =>
  htmlString
  .replace(/>\s*</g, '>\n<')
  .replace(/>\s*\[/g, '>\n[')
  .replace(/]\s*</g, ']\n<');
