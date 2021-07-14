import { p as partial, _ as __, R as make, S as generic, au as tail, k as pipe, av as skip, ao as pluck, a7 as map, aw as zip, a1 as getPath, ax as find, J as isUndefined, c as mapValues, v as values, ag as filterWith, w as getKey, ak as is, a9 as isIterableNotEmpty, ay as flatMapWith, az as updatePath, aA as negate } from './defaultLocale.3cc8e503.js';
import { a9 as derived, U as writable } from './client.0cc30d5f.js';
import { i as initRange, f as linearish, g as bisectRight, r as rgbBasis, m as mergeObj } from './linear.9671b245.js';
import { m as makeStyleVars, p as pairs } from './Info.7faabc1a.js';

/**
* @module @svizzle/utils/array-[array-object]
*/

/**
 * Return a function expecting an array of values and returning an object assigning the values to the provided keys.
 *
 * @function
 * @arg {array} keys - Array of keys
 * @return {function} - Array -> Object
 *
 * @example
> makeWithLatLng = makeWithKeys(['lng', 'lat'])
> makeWithLatLng([1, 2])
{lng: 1, lat: 2}
> makeWithLatLng([10, 20])
{lng: 10, lat: 20}
 *
 * @since 0.2.0
 * @see {@link module:@svizzle/utils/array-[array-object].makeWithValues|makeWithValues}
 * @see {@link module:@svizzle/utils/array-[any-object].makeWith|makeWith}
 */
const makeWithKeys = keys => partial(make, [keys, __]);

/**
* @module @svizzle/utils/string_proto-boolean
*/

/**
 * Return true if the input string ends with the test string
 * @see
 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith|String.prototype.endsWith},
 {@link module:@svizzle/utils/string-[string-boolean].makeEndsWith|makeEndsWith},
 {@link module:@svizzle/utils/string-[string-boolean].makeStringEndsWith|makeStringEndsWith}
 *
 * @function
 * @arg {string} string - The input string
 * @arg {string} string - The test string
 * @return {boolean} - True if the input string ends with the test string
 *
 * @example
> endsWith('Ping', 'ing')
true
> endsWith('Pong', 'ing')
false
 *
 * @since 0.5.0
 */
generic(String.prototype.endsWith);

/**
 * Return true if the input string starts with the test string
 * @see
 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith|String.prototype.startsWith},
 {@link module:@svizzle/utils/string-[string-boolean].makeStartsWith|makeStartsWith},
 {@link module:@svizzle/utils/string-[string-boolean].makeStringStartsWith|makeStringStartsWith}
 *
 * @function
 * @arg {string} string - The input string
 * @arg {string} string - The test string
 * @return {boolean} - True if the input string starts with the test string
 *
 * @example
> startsWith('Ping', 'Pin')
true
> startsWith('Pong', 'Pin')
false
 *
 * @since 0.1.0
 */
const startsWith = generic(String.prototype.startsWith);

function quantize() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range = [0, 1],
      unknown;

  function scale(x) {
    return x != null && x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }

  scale.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
  };

  scale.range = function(_) {
    return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };

  scale.thresholds = function() {
    return domain.slice();
  };

  scale.copy = function() {
    return quantize()
        .domain([x0, x1])
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(linearish(scale), arguments);
}

function colors(specifier) {
  var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
  while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors;
}

var ramp = scheme => rgbBasis(scheme[scheme.length - 1]);

var scheme$1 = new Array(3).concat(
  "fc8d59ffffbf91bfdb",
  "d7191cfdae61abd9e92c7bb6",
  "d7191cfdae61ffffbfabd9e92c7bb6",
  "d73027fc8d59fee090e0f3f891bfdb4575b4",
  "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
  "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
  "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
  "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
  "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
).map(colors);

ramp(scheme$1);

var scheme = new Array(3).concat(
  "e0f3dba8ddb543a2ca",
  "f0f9e8bae4bc7bccc42b8cbe",
  "f0f9e8bae4bc7bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
).map(colors);

ramp(scheme);

const colorLightgrey = 'lightgrey';

const defaultTheme = {
	colorBlack: 'black',
	colorBoxShadow: colorLightgrey,
	colorLightgrey,
	colorMain: 'rgb(16, 174, 249)',
	colorMainDesat: 'hsla(199, 50%, 30%, 1)',
	colorMainLighter: 'rgb(157, 219, 249)',
	colorNav: '#f9f7dd',
	colorRef: 'rgb(70, 70, 70)',
	colorRefLight: 'rgb(180, 180, 180)',
	colorSchemes: [{
		colors: scheme$1[8],
		label: 'Red-Blue',
	}, {
		colors: tail(scheme[9]),
		label: 'Green-Blue',
	}],
	colorSelected: 'hsla(199, 50%, 52%, 1)',
	colorSelectedDesat: 'lightseagreen',
	colorWhite: 'white',
	dimBoxShadowXY: '2px 8px 9px -4px',
	dimBoxShadowY: '0px 8px 9px -4px',
	dimFontSizeMessage: '14px',
	dimFontWeight: 200,
	dimHeaderHeight: '4.5rem',
	dimHeaderHeightShort: '2.5rem',
	dimPadding: '1rem',
	dimSidebarWidth: '340px',
	dimSmallSelectorHeight: '3rem',
	transDuration: '0.25s',
	transFunction: 'ease',
	valueModalBackgroundOpacity: 0.25,
};

const _theme = writable(defaultTheme);

const customizeTheme = theme => _theme.update(mergeObj(theme));

const _style = derived(_theme, pipe([
	skip(['colorSchemes']),
	makeStyleVars
]));

/* color scale */

const _colorSchemeIndex = writable(0);

const toggleColorScheme = () => {
	_colorSchemeIndex.update(index => index === 0 ? 1 : 0);
};

const _colorScheme = derived(
	[_theme, _colorSchemeIndex],
	([theme, index]) => theme.colorSchemes[index]
);

const _colorSchemeLabel = derived(_colorScheme, s => s.label);

const getLabels = pluck('label');
const _colorSchemeLabels = derived(
	_theme,
	theme => getLabels(theme.colorSchemes)
);

const _colorScale = derived(
	_colorScheme,
	({colors}) => quantize().range(colors)
);

const _makeColorScale = derived(
	_colorScale,
	colorScale => extent => colorScale.domain(extent)
);

const _makeColorBins = derived(
	[_colorScheme, _colorScale],
	([{colors}, colorScale]) =>
		cScale => {
			const domain = cScale.domain();
			const ranges = pairs([domain[0], ...colorScale.thresholds(), domain[1]]);

			return map(
				zip(ranges, colors),
				makeWithKeys(['range', 'color'])
			);
		}
);

var UKC = {
	id: "UKC",
	name: "North East",
	children: [
		"UKC1",
		"UKC2"
	]
};
var UKD = {
	id: "UKD",
	name: "North West",
	children: [
		"UKD1",
		"UKD2",
		"UKD3",
		"UKD4",
		"UKD5",
		"UKD6",
		"UKD7"
	]
};
var UKE = {
	id: "UKE",
	name: "Yorkshire and The Humber",
	children: [
		"UKE1",
		"UKE2",
		"UKE3",
		"UKE4"
	]
};
var UKF = {
	id: "UKF",
	name: "East Midlands",
	children: [
		"UKF1",
		"UKF2",
		"UKF3"
	]
};
var UKG = {
	id: "UKG",
	name: "West Midlands",
	children: [
		"UKG1",
		"UKG2",
		"UKG3"
	]
};
var UKH = {
	id: "UKH",
	name: "East Of England",
	children: [
		"UKH1",
		"UKH2",
		"UKH3"
	]
};
var UKI = {
	id: "UKI",
	name: "London",
	children: [
		"UKI1",
		"UKI2",
		"UKI3",
		"UKI4",
		"UKI5",
		"UKI6",
		"UKI7"
	]
};
var UKJ = {
	id: "UKJ",
	name: "South East",
	children: [
		"UKJ1",
		"UKJ2",
		"UKJ3",
		"UKJ4"
	]
};
var UKK = {
	id: "UKK",
	name: "South West",
	children: [
		"UKK1",
		"UKK2",
		"UKK3",
		"UKK4"
	]
};
var UKL = {
	id: "UKL",
	name: "Wales",
	children: [
		"UKL1",
		"UKL2"
	]
};
var UKM = {
	id: "UKM",
	name: "Scotland",
	children: [
		"UKM1",
		"UKM2",
		"UKM3",
		"UKM4",
		"UKM5",
		"UKM6",
		"UKM7",
		"UKM8",
		"UKM9"
	]
};
var UKN = {
	id: "UKN",
	name: "Northern Ireland",
	children: [
		"UKN0"
	]
};
var UK_NUTS_1_2 = {
	UKC: UKC,
	UKD: UKD,
	UKE: UKE,
	UKF: UKF,
	UKG: UKG,
	UKH: UKH,
	UKI: UKI,
	UKJ: UKJ,
	UKK: UKK,
	UKL: UKL,
	UKM: UKM,
	UKN: UKN
};

const _regionSettings = writable();
const setRegionSettings = obj => _regionSettings.set(obj);

const _getFeatureKey = derived(
	_regionSettings,
	regionSettings => getPath(`properties.${regionSettings.key}`)
);

const _hasValidKey = derived(
	[_regionSettings, _getFeatureKey],
	([regionSettings, getFeatureKey]) => pipe([
		getFeatureKey,
		key => find(
			regionSettings.ignoredRegions,
			ignoredRegion => startsWith(key, ignoredRegion)
		),
		isUndefined
	])
);

// selected regions

const noNutsSelected = mapValues(UK_NUTS_1_2, mergeObj({selected: false}));
const allNutsSelected = mapValues(UK_NUTS_1_2, mergeObj({selected: true}));
const _nutsSelection = writable(allNutsSelected);
const _nutsRegions = derived(_nutsSelection, values);

const selectAllRegions = () => _nutsSelection.set(allNutsSelected);
const deselectAllRegions = () => _nutsSelection.set(noNutsSelected);

const toggleRegionNUTS1 =
	id => _nutsSelection.update(updatePath(`${id}.selected`, negate));

const _someUnselectedRegions = derived(
	_nutsSelection,
	pipe([
		values,
		filterWith(pipe([getKey('selected'), is(false)])),
		isIterableNotEmpty
	])
);

const getSelectedChildren = pipe([
	values,
	filterWith(getKey('selected')),
	flatMapWith(getKey('children'))
]);
const _selectedNUT2Ids = derived(
	_nutsSelection,
	nutsSelection => getSelectedChildren(nutsSelection)
);

// pre-selected regions

const getNUTS1Children = id => UK_NUTS_1_2[id].children;
const _preselectedNUTS1Id = writable(null);
const _preselectedNUTS2Ids = derived(
	_preselectedNUTS1Id,
	id => id && getNUTS1Children(id) || []
);

export { _theme as _, _style as a, _selectedNUT2Ids as b, customizeTheme as c, _preselectedNUTS2Ids as d, _makeColorScale as e, _makeColorBins as f, _someUnselectedRegions as g, _preselectedNUTS1Id as h, _nutsRegions as i, deselectAllRegions as j, selectAllRegions as k, toggleColorScheme as l, _colorSchemeLabel as m, _colorSchemeLabels as n, _regionSettings as o, _hasValidKey as p, _getFeatureKey as q, setRegionSettings as s, toggleRegionNUTS1 as t };
