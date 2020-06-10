export const formatSvelteMarkup = str =>
	str.trim()
	.replace(/^\t{4}/gum, '')
	.replace(/^\t/gum, '  ');
