import { A as _slicedToArray, ai as derived, aa as _toConsumableArray, a0 as writable } from './client.6106bd4c.js';
import { n as partial, q as __, N as make, as as tail, p as pipe, at as skip, am as pluck, a5 as map, au as zip } from './defaultLocale.76beb823.js';
import { i as initRange, e as linearish, f as bisectRight, r as rgb, m as mergeObj } from './linear.28f0351f.js';
import { m as makeStyleVars, p as pairs } from './Info.55e98c04.js';

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

function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1,
      t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis$1 (values) {
  var n = values.length - 1;
  return function (t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

function rgbSpline(spline) {
  return function (colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i,
        color;

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
    return function (t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(basis$1);

function ramp (scheme) {
  return rgbBasis(scheme[scheme.length - 1]);
}

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
  colorMainDesat: 'hsla(199, 50%, 52%, 1)',
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

export { _style as _, _theme as a, _makeColorScale as b, customizeTheme as c, _makeColorBins as d, _colorSchemeLabel as e, _colorSchemeLabels as f, toggleColorScheme as t };
