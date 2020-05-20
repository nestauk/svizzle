/**
* @module @svizzle/dom/html
*/

/**
 * Return a copy of the input HTML string formatted by inserting return chars between tags.
 *
 * @function
 * @arg {string} - HTML string
 * @return {string} - formatted HTML string
 *
 * @example
> const input = '<main><div class="item"><div class="labels"><span>foo</span></div> </div></main>'
> alignTags(input)
<main>
<div class="item">
<div class="labels">
<span>foo</span>
</div>
</div>
</main>

> const input = '<main><div class="item"><div class="labels"><span>[Object object]</span></div> </div></main>'
> alignTags(input)
<main>
<div class="item">
<div class="labels">
<span>
[Object object]
</span>
</div>
</div>
</main>
 *
 * @version 0.3.0
 */
export const alignTags = htmlString =>
	htmlString
		.replace(/>\s*</gu, '>\n<')
		.replace(/>\s*\[/gu, '>\n[')
		.replace(/\]\s*</gu, ']\n<');
