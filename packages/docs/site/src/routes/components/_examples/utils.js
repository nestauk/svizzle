import {makeRegexOf, transformValues} from '@svizzle/utils';
import * as _ from 'lamb';

const makeIndentSvelteMarkup = indent => str =>
	str.trim()
	.replace(makeRegexOf('gum')(`^\t{${indent}}`), '')
	.replace(/\t/gum, '  ');

const makeExamplesFormatter = indent =>
	_.mapWith(transformValues({
		doc: _.mapWith(transformValues({
			content: s => s.trim(),
		})),
		data: _.mapWith(transformValues({
			usage: makeIndentSvelteMarkup(indent)
		}))
	}));

export const examplesFormatter3 = makeExamplesFormatter(3);
export const examplesFormatter4 = makeExamplesFormatter(4);
