import { f as partial, _ as __, O as make, ar as tail, p as pipe, as as skip, al as pluck, a4 as map, at as zip } from './defaultLocale.f3c5fc93.js';
import { a9 as derived, U as writable } from './client.ed49fe48.js';
import { i as initRange, e as linearish, f as bisectRight, r as rgb, m as mergeObj } from './linear.86b0ac46.js';
import { m as makeStyleVars, p as pairs } from './Info.aabe6ce3.js';

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

function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

function basis$1(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = rgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(basis$1);

function ramp(scheme) {
  return rgbBasis(scheme[scheme.length - 1]);
}

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
	colorMainDesat: 'hsla(199, 50%, 52%, 1)',
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

export { _style as _, _theme as a, _makeColorScale as b, customizeTheme as c, _makeColorBins as d, _colorSchemeLabel as e, _colorSchemeLabels as f, toggleColorScheme as t };
