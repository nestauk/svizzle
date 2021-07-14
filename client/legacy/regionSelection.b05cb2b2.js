import { D as _slicedToArray, aj as derived, ab as _toConsumableArray, a1 as writable } from './client.83de09e6.js';
import { p as partial, c as __, S as make, T as generic, av as tail, l as pipe, aw as skip, ap as pluck, a8 as map, ax as zip, a2 as getPath, ay as find, L as isUndefined, d as mapValues, v as values, ah as filterWith, x as getKey, al as is, aa as isIterableNotEmpty, az as flatMapWith, aA as updatePath, aB as negate } from './defaultLocale.ed51f02f.js';
import { i as initRange, f as linearish, g as bisectRight, r as rgbBasis, m as mergeObj } from './linear.9ddc8189.js';
import { m as makeStyleVars, p as pairs } from './Info.eaefe45f.js';

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

var makeWithKeys = function makeWithKeys(keys) {
  return partial(make, [keys, __]);
};

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

var startsWith = generic(String.prototype.startsWith);

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

    while (++i < n) {
      domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    }

    return scale;
  }

  scale.domain = function (_) {
    var _ref, _ref2;

    return arguments.length ? ((_ref = _, _ref2 = _slicedToArray(_ref, 2), x0 = _ref2[0], x1 = _ref2[1], _ref), x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
  };

  scale.range = function (_) {
    return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function (y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n ? [domain[n - 1], x1] : [domain[i - 1], domain[i]];
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };

  scale.thresholds = function () {
    return domain.slice();
  };

  scale.copy = function () {
    return quantize().domain([x0, x1]).range(range).unknown(unknown);
  };

  return initRange.apply(linearish(scale), arguments);
}

function colors (specifier) {
  var n = specifier.length / 6 | 0,
      colors = new Array(n),
      i = 0;

  while (i < n) {
    colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  }

  return colors;
}

var ramp = (function (scheme) {
  return rgbBasis(scheme[scheme.length - 1]);
});

var scheme$1 = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(colors);
ramp(scheme$1);

var scheme = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(colors);
ramp(scheme);

var colorLightgrey = 'lightgrey';
var defaultTheme = {
  colorBlack: 'black',
  colorBoxShadow: colorLightgrey,
  colorLightgrey: colorLightgrey,
  colorMain: 'rgb(16, 174, 249)',
  colorMainDesat: 'hsla(199, 50%, 30%, 1)',
  colorMainLighter: 'rgb(157, 219, 249)',
  colorNav: '#f9f7dd',
  colorRef: 'rgb(70, 70, 70)',
  colorRefLight: 'rgb(180, 180, 180)',
  colorSchemes: [{
    colors: scheme$1[8],
    label: 'Red-Blue'
  }, {
    colors: tail(scheme[9]),
    label: 'Green-Blue'
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
  valueModalBackgroundOpacity: 0.25
};
var _theme = writable(defaultTheme);
var customizeTheme = function customizeTheme(theme) {
  return _theme.update(mergeObj(theme));
};
var _style = derived(_theme, pipe([skip(['colorSchemes']), makeStyleVars]));
/* color scale */

var _colorSchemeIndex = writable(0);
var toggleColorScheme = function toggleColorScheme() {
  _colorSchemeIndex.update(function (index) {
    return index === 0 ? 1 : 0;
  });
};
var _colorScheme = derived([_theme, _colorSchemeIndex], function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      theme = _ref2[0],
      index = _ref2[1];

  return theme.colorSchemes[index];
});
var _colorSchemeLabel = derived(_colorScheme, function (s) {
  return s.label;
});

var getLabels = pluck('label');

var _colorSchemeLabels = derived(_theme, function (theme) {
  return getLabels(theme.colorSchemes);
});

var _colorScale = derived(_colorScheme, function (_ref3) {
  var colors = _ref3.colors;
  return quantize().range(colors);
});

var _makeColorScale = derived(_colorScale, function (colorScale) {
  return function (extent) {
    return colorScale.domain(extent);
  };
});
var _makeColorBins = derived([_colorScheme, _colorScale], function (_ref4) {
  var _ref5 = _slicedToArray(_ref4, 2),
      colors = _ref5[0].colors,
      colorScale = _ref5[1];

  return function (cScale) {
    var domain = cScale.domain();
    var ranges = pairs([domain[0]].concat(_toConsumableArray(colorScale.thresholds()), [domain[1]]));
    return map(zip(ranges, colors), makeWithKeys(['range', 'color']));
  };
});

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

var _regionSettings = writable();
var setRegionSettings = function setRegionSettings(obj) {
  return _regionSettings.set(obj);
};
var _getFeatureKey = derived(_regionSettings, function (regionSettings) {
  return getPath("properties.".concat(regionSettings.key));
});
var _hasValidKey = derived([_regionSettings, _getFeatureKey], function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      regionSettings = _ref2[0],
      getFeatureKey = _ref2[1];

  return pipe([getFeatureKey, function (key) {
    return find(regionSettings.ignoredRegions, function (ignoredRegion) {
      return startsWith(key, ignoredRegion);
    });
  }, isUndefined]);
}); // selected regions

var noNutsSelected = mapValues(UK_NUTS_1_2, mergeObj({
  selected: false
}));

var allNutsSelected = mapValues(UK_NUTS_1_2, mergeObj({
  selected: true
}));

var _nutsSelection = writable(allNutsSelected);
var _nutsRegions = derived(_nutsSelection, values);
var selectAllRegions = function selectAllRegions() {
  return _nutsSelection.set(allNutsSelected);
};
var deselectAllRegions = function deselectAllRegions() {
  return _nutsSelection.set(noNutsSelected);
};
var toggleRegionNUTS1 = function toggleRegionNUTS1(id) {
  return _nutsSelection.update(updatePath("".concat(id, ".selected"), negate));
};
var _someUnselectedRegions = derived(_nutsSelection, pipe([values, filterWith(pipe([getKey('selected'), is(false)])), isIterableNotEmpty]));

var getSelectedChildren = pipe([values, filterWith(getKey('selected')), flatMapWith(getKey('children'))]);

var _selectedNUT2Ids = derived(_nutsSelection, function (nutsSelection) {
  return getSelectedChildren(nutsSelection);
}); // pre-selected regions

var getNUTS1Children = function getNUTS1Children(id) {
  return UK_NUTS_1_2[id].children;
};

var _preselectedNUTS1Id = writable(null);
var _preselectedNUTS2Ids = derived(_preselectedNUTS1Id, function (id) {
  return id && getNUTS1Children(id) || [];
});

export { _theme as _, _style as a, _selectedNUT2Ids as b, customizeTheme as c, _preselectedNUTS2Ids as d, _makeColorScale as e, _makeColorBins as f, _someUnselectedRegions as g, _preselectedNUTS1Id as h, _nutsRegions as i, deselectAllRegions as j, selectAllRegions as k, toggleColorScheme as l, _colorSchemeLabel as m, _colorSchemeLabels as n, _regionSettings as o, _hasValidKey as p, _getFeatureKey as q, setRegionSettings as s, toggleRegionNUTS1 as t };
