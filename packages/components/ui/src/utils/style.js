import * as _ from 'lamb';

export const getStylesheet = href => _.find(
	[...document.styleSheets], // convert collection to array
	_.hasKeyValue('href', href)
);

const getSelectorText = _.getKey('selectorText');

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
