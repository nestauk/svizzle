import {transformValues} from '@svizzle/utils';
import {mapWith} from 'lamb';

export const formatSvelteMarkup = str =>
	str.trim()
	.replace(/^\t{4}/gum, '')
	.replace(/^\t/gum, '  ');

export const formatExamples = mapWith(transformValues({
	doc: mapWith(transformValues({
		content: s => s.trim(),
	})),
	data: mapWith(transformValues({
		usage: formatSvelteMarkup
	}))
}));
