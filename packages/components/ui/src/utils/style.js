import {isIterableNotEmpty, makeTrimmedSplitBy} from '@svizzle/utils';
import * as _ from 'lamb';

const parseCssText = _.pipe([
	_.splitBy(';'),
	_.filterWith(isIterableNotEmpty),
	_.mapWith(makeTrimmedSplitBy(':'))
]);

export const getStylesheet = href => _.find(
	[...document.styleSheets], // convert collection to array
	_.hasKeyValue('href', href)
);

const getSelectorText = _.getKey('selectorText');

export const makeGetStyleRulesObj = selectorRegex => _.pipe([
	_.filterWith(_.pipe([
		getSelectorText,
		makeTrimmedSplitBy(','),
		_.some(selectorRegex.test.bind(selectorRegex))
	])),
	_.mapWith(_.collect([
		getSelectorText,
		_.pipe([
			_.getPath('style.cssText'),
			parseCssText,
			_.fromPairs
		])
	])),
	_.reduceWith(
		(themes, [selector, rules]) => {
			const themeEntry = _.find(
				themes,
				_.hasPathValue('0', selector)
			);
			if (themeEntry) {
				const [, existingRules] = themeEntry;
				themeEntry[1] = {...existingRules, ...rules};
			} else {
				themes.push([selector, rules]);
			}
			return themes;
		},
		[]
	),
	_.fromPairs
]);

export const getAllStylesBySelector = _.pipe([
	_.mapWith(_.collect([
		getSelectorText,
		_.getKey('style')
	])),
	_.fromPairs
]);

export const setStyleRules = (targetRules, srcRules) => {
	const selectors = _.keys(srcRules);
	selectors.forEach(selector => {
		if (selector in targetRules) {
			const style = srcRules[selector];
			const properties = _.keys(style);
			properties.forEach(prop => {
				targetRules[selector].setProperty(prop, style[prop])
			});
		}
	})
}
