export const formatSvelteMarkup = str =>
	str.trim()
	.replace(/^\t{3}/gum, '')
	.replace(/^\t/gum, '  ');
