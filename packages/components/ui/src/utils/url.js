const absoluteURLRegex = /^(?:[a-z+]+:)?\/\//iu;

export const getURL = href => new URL(
	href,
	absoluteURLRegex.test(href)
		? undefined
		: location.origin
);
