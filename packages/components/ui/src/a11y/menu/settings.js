import {
	applyFnMap,
	isNot,
	isNotNull,
	makeMergeAppliedFnMap,
	mergeObj,
	mergeWith,
	mergeWithMerge,
	makePostfixed,
} from '@svizzle/utils';
import * as _ from 'lamb';
import {derived, get, writable} from 'svelte/store';

const defaultA11ySettings = {
	brightness: {
		defaultValue: 100,
		format: 'percentage',
		group: 'color',
		id: 'brightness',
		label: 'Brightness',
		next: 'contrast',
		prev: 'grayscale',
		range: [10, 150],
		value: 100,
	},
	contrast: {
		defaultValue: 100,
		format: 'percentage',
		group: 'color',
		id: 'contrast',
		label: 'Contrast',
		next: null,
		prev: 'brightness',
		range: [10, 150],
		value: 100,
	},
	cvd: {
		defaultValue: 'None',
		group: 'color',
		id: 'cvd',
		label: 'Color Vision Deficiency',
		next: 'hue',
		prev: 'invert',
		value: 'None',
		values: ['None', 'Protanopia', 'Deuteranopia', 'Tritanopia'],
	},
	fontScaling: {
		defaultValue: 100,
		format: 'percentage',
		group: 'text',
		id: 'fontScaling',
		label: 'Font scale',
		next: 'lineHeight',
		prev: 'typeface',
		value: 100,
		values: [50, 75, 100, 125, 150],
	},
	grayscale: {
		defaultValue: 0,
		format: 'percentage',
		group: 'color',
		id: 'grayscale',
		label: 'Grayscale',
		next: 'brightness',
		prev: 'hue',
		range: [0, 100],
		value: 0,
	},
	hue: {
		defaultValue: 0,
		format: 'degrees',
		group: 'color',
		id: 'hue',
		label: 'Hue Shift',
		next: 'grayscale',
		prev: 'cvd',
		range: [0, 360],
		value: 0,
	},
	invert: {
		defaultValue: false,
		format: 'boolean',
		group: 'color',
		id: 'invert',
		label: 'Invert',
		next: 'cvd',
		prev: 'wordSpacing',
		value: false,
	},
	letterSpacing: {
		defaultValue: 0,
		format: 'percentage',
		group: 'text',
		id: 'letterSpacing',
		label: 'Letter spacing',
		next: 'wordSpacing',
		prev: 'lineHeight',
		value: 0,
		values: [0, 10, 20],
	},
	lineHeight: {
		defaultValue: 150,
		format: 'percentage',
		group: 'text',
		id: 'lineHeight',
		label: 'Line height',
		next: 'letterSpacing',
		prev: 'fontScaling',
		value: 150,
		values: [100, 125, 150, 175, 200],
	},
	typeface: {
		defaultValue: 'sans-serif',
		group: 'text',
		id: 'typeface',
		label: 'Font',
		next: 'fontScaling',
		prev: null,
		value: 'sans-serif',
		values: [
			'sans-serif',
			'monospace',
		],
	},
	wordSpacing: {
		defaultValue: 0,
		format: 'percentage',
		group: 'text',
		id: 'wordSpacing',
		label: 'Word spacing',
		next: 'invert',
		prev: 'letterSpacing',
		value: 0,
		values: [0, 20, 40],
	},
};

export const _a11ySettings = writable(defaultA11ySettings);

/* init */

const isFirstSetting = _.pipe([_.getKey('prev'), _.isNull]);
const getFirstId = _.pipe([
	_.values,
	_.findWhere(isFirstSetting),
	_.getKey('id')
]);
const firstId = getFirstId(defaultA11ySettings);

/* current setting */

export const _currentId = writable(firstId);
export const _currentSetting = derived(
	[_a11ySettings, _currentId],
	([settings, id]) => settings[id]
);

/* formatting */

const formats = {
	'percentage': value => `${value}%`,
	'degrees': value => `${value}°`,
	'boolean': value => value ? 'Yes' : 'No',
};
export const _formatValue = derived(
	_currentSetting,
	setting => setting.format ? formats[setting.format] : _.identity
);

/* navigation */

export const setNextId = () => _currentId.set(get(_currentSetting).next);
export const setPrevId = () => _currentId.set(get(_currentSetting).prev);

export const _hasPrev = derived(
	_currentSetting,
	_.pipe([_.getKey('prev'), isNotNull])
);
export const _hasNext = derived(
	_currentSetting,
	_.pipe([_.getKey('next'), isNotNull])
);

/* update */

const isValueInRange = (value, range) => value >= range[0] && value <= range[1];

const updateSettingsOf = (id, settings) => {
	_a11ySettings.update(_.updateKey(id, mergeObj(settings)));
};

export const updateCurrentValue = value => {
	const setting = get(_currentSetting);
	updateSettingsOf(setting.id, {value});
};

/* defaults */

const setValueToDefault = makeMergeAppliedFnMap({value: _.getKey('defaultValue')});

const isValidValue = setting => value =>
	setting.values && value in setting.values
	|| setting.range && isValueInRange(value, setting.range)

const mergeOnlyUpdateValueIfInvalid = (newSetting, oldSetting) => {
	const setting = isValidValue(newSetting)(oldSetting.value)
		? _.skipIn(newSetting, ['value'])
		: newSetting;
	return _.merge(oldSetting, setting);
}

export const mergeDefaultSettings = newDefaultSettings => {
	const mergedDefaultSettings = _.mapValuesWith(setValueToDefault)(
		newDefaultSettings
	);
	_a11ySettings.update(
		_.curry(mergeWith(mergeOnlyUpdateValueIfInvalid))(mergedDefaultSettings)
	);
	return mergeWithMerge(defaultA11ySettings, mergedDefaultSettings);
}

/* resets */

const getGroupsResetStatus = _.pipe([
	_.values,
	_.groupBy(_.getKey('group')),
	_.mapValuesWith(
		_.pipe([
			_.mapWith(
				_.collect([
					_.getKey('value'),
					_.getKey('defaultValue'),
				])
			),
			_.every(_.apply(_.areSame))
		])
	)
]);
export const _groupsResetStatus = derived(_a11ySettings, getGroupsResetStatus);

export const _isA11yDirty = derived(
	_groupsResetStatus,
	_.pipe([
		_.values,
		_.some(_.not(_.identity))
	])
);

const isNotOfGroup = groupId => _.pipe([_.getKey('group'), isNot(groupId)]);
const resetGroupItems = groupId => _.mapValuesWith(_.adapter([
	_.casus(isNotOfGroup(groupId), _.identity),
	_.casus(_.hasKey('value'), setValueToDefault),
]));
export const resetGroup = groupId => _a11ySettings.update(
	resetGroupItems(groupId)
);

/* Color corrections CSS property formatter */
const getValuesOrderedByKeys = keys => obj => _.map(keys, key => obj[key]);
const hasDirtyValue = _.pipe([
	_.collect([
		_.getKey('defaultValue'),
		_.getKey('value'),
	]),
	_.apply(_.not(_.areSame))
]);
const cvdFilters = {
	Deuteranopia: 'url(#recolor-deuteranopia)',
	Protanopia: 'url(#recolor-protanopia)',
	Tritanopia: 'url(#recolor-tritanopia)',
};
const valueFormatters = {
	percentage: value => `${value}%`,
	degrees: value => `${value}deg`,
	boolean: value => value ? '100%' : '0%',
}
const getCssFilter = setting => {
	if (setting.id === 'cvd') {
		return cvdFilters[setting.value]
	}
	let filter = setting.id === 'hue' ? 'hue-rotate' : setting.id;
	return `${filter}(${valueFormatters[setting.format](setting.value)})`
};
const getColorCorrectionString = _.pipe([
	getValuesOrderedByKeys([
		'invert',
		'cvd',
		'hue',
		'grayscale',
		'brightness',
		'contrast',
	]),
	_.filterWith(hasDirtyValue),
	_.mapWith(getCssFilter),
	_.joinWith(' ')
]);
const getColorStyles = applyFnMap({
	'--color-correction': getColorCorrectionString
});
export const _a11yColorStyles = derived(_a11ySettings, getColorStyles);

/* Text corrections CSS property formatters */

const divideBy100 = _.divideBy(100);
const toRemPercent = _.pipe([divideBy100, makePostfixed('rem')]);

const getTextStyles = applyFnMap({
	'font-family': _.getPath('typeface.value'),
	'font-size': _.pipe([_.getPath('fontScaling.value'), toRemPercent]),
	'letter-spacing': _.pipe([_.getPath('letterSpacing.value'), toRemPercent]),
	'line-height': _.pipe([_.getPath('lineHeight.value'), divideBy100]),
	'word-spacing': _.pipe([_.getPath('wordSpacing.value'), toRemPercent]),
});

export const _a11yTextStyles = derived(_a11ySettings, getTextStyles);

export const applyStyles = (domStyle, styles) => {
	_.pairs(styles)
	.forEach(prop => domStyle.setProperty(...prop));
};
