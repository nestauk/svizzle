import { X as partial, _ as __, bF as make, bG as tail, by as derived, T as pipe, bH as skip, a6 as makeStyleVars, bv as pluck, b4 as map, Y as zip, ac as writable, ae as mergeObj, R as getKey, bI as getAt, bJ as mapValues, aS as sortWith, bK as sorter, O as transformValues, aX as getPath, bL as get_store_value, bM as values, bN as groupBy, U as mapValuesWith, bw as indexBy, bO as setKey, M as keys, bP as flatMapWith, bQ as isGT, b6 as isNotNil, ak as uniques, aJ as updateKey, bR as updateKeys, bS as filter, b5 as reduce, bT as isIterableEmpty, bi as sorterDesc, ba as flatten } from './client.5c29960b.js';
import { p as _lookup, q as makeGetIndicatorFormatOf, k as _selectedYear } from './stores.21551741.js';
import { d as getId, e as setIndexAsKey } from './yootils.es.6e4269de.js';
import { i as initRange, b as linearish, e as bisect, r as rgbBasis } from './linear.ec33a939.js';
import { p as pairs, e as extent } from './Info.c6802fb5.js';

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
    return x != null && x <= x ? range[bisect(domain, x, 0, n)] : unknown;
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

/* color */

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

const _baseColorScale = derived(
	_colorScheme,
	({colors}) => quantize().range(colors)
);

const _makeColorScale = derived(
	_baseColorScale,
	_baseColorScale => extent => _baseColorScale.domain(extent)
);

const _makeColorBins = derived(
	[_baseColorScale, _colorScheme],
	([baseColorScale, {colors}]) =>
		colScale => {
			const domain = colScale.domain();
			const ranges = pairs([
				domain[0],
				...baseColorScale.thresholds(),
				domain[1]
			]);

			return map(
				zip(ranges, colors),
				makeWithKeys(['range', 'color'])
			);
		}
);

var hierarchy = {
	"0": {
	name: "Österreich",
	id: 0,
	rootId: 0,
	level: 0,
	children: [
		33,
		34,
		35
	]
},
	"1": {
	name: "Belgique-België",
	id: 1,
	rootId: 1,
	level: 0,
	children: [
		36,
		37,
		38
	]
},
	"2": {
	name: "Bulgaria",
	id: 2,
	rootId: 2,
	level: 0,
	children: [
		39,
		40
	]
},
	"3": {
	name: "Schweiz/Suisse/Svizzera",
	id: 3,
	rootId: 3,
	level: 0,
	children: [
		41
	]
},
	"4": {
	name: "Kýpros",
	id: 4,
	rootId: 4,
	level: 0,
	children: [
		42
	]
},
	"5": {
	name: "Česká Republika",
	id: 5,
	rootId: 5,
	level: 0,
	children: [
		43
	]
},
	"6": {
	name: "Deutschland",
	id: 6,
	rootId: 6,
	level: 0,
	children: [
		44,
		45,
		46,
		47,
		48,
		49,
		50,
		51,
		52,
		53,
		54,
		55,
		56,
		57,
		58,
		59
	]
},
	"7": {
	name: "Danmark",
	id: 7,
	rootId: 7,
	level: 0,
	children: [
		60
	]
},
	"8": {
	name: "Eesti",
	id: 8,
	rootId: 8,
	level: 0,
	children: [
		61
	]
},
	"9": {
	name: "España",
	id: 9,
	rootId: 9,
	level: 0,
	children: [
		62,
		63,
		64,
		65,
		66,
		67,
		68
	]
},
	"10": {
	name: "Suomi / Finland",
	id: 10,
	rootId: 10,
	level: 0,
	children: [
		69,
		70
	]
},
	"11": {
	name: "France",
	id: 11,
	rootId: 11,
	level: 0,
	children: [
		71,
		72,
		73,
		74,
		75,
		76,
		77,
		78,
		79,
		2083,
		2204,
		2205,
		2206,
		2207,
		2208,
		2209,
		2210,
		2211,
		2212,
		2213,
		2214
	]
},
	"12": {
	name: "ELLADA",
	id: 12,
	rootId: 12,
	level: 0,
	children: [
		80,
		81,
		82,
		83,
		2016,
		2081,
		2082
	]
},
	"13": {
	name: "Hrvatska",
	id: 13,
	rootId: 13,
	level: 0,
	children: [
		84
	]
},
	"14": {
	name: "Magyarország",
	id: 14,
	rootId: 14,
	level: 0,
	children: [
		85,
		86,
		87
	]
},
	"15": {
	name: "Ireland",
	id: 15,
	rootId: 15,
	level: 0,
	children: [
		88
	]
},
	"16": {
	name: "Ísland",
	id: 16,
	rootId: 16,
	level: 0,
	children: [
		89
	]
},
	"17": {
	name: "Italia",
	id: 17,
	rootId: 17,
	level: 0,
	children: [
		90,
		91,
		92,
		93,
		94,
		2014,
		2015
	]
},
	"18": {
	name: "Liechtenstein",
	id: 18,
	rootId: 18,
	level: 0,
	children: [
		95
	]
},
	"19": {
	name: "Lietuva",
	id: 19,
	rootId: 19,
	level: 0,
	children: [
		96
	]
},
	"20": {
	name: "LUXEMBOURG",
	id: 20,
	rootId: 20,
	level: 0,
	children: [
		97
	]
},
	"21": {
	name: "Latvija",
	id: 21,
	rootId: 21,
	level: 0,
	children: [
		98
	]
},
	"22": {
	name: "Malta",
	id: 22,
	rootId: 22,
	level: 0,
	children: [
		99
	]
},
	"23": {
	name: "Nederland",
	id: 23,
	rootId: 23,
	level: 0,
	children: [
		100,
		101,
		102,
		103
	]
},
	"24": {
	name: "Norge",
	id: 24,
	rootId: 24,
	level: 0,
	children: [
		104
	]
},
	"25": {
	name: "Polska",
	id: 25,
	rootId: 25,
	level: 0,
	children: [
		105,
		106,
		107,
		108,
		109,
		110,
		2215,
		2216,
		2217
	]
},
	"26": {
	name: "Portugal",
	id: 26,
	rootId: 26,
	level: 0,
	children: [
		111,
		112,
		113
	]
},
	"27": {
	name: "ROMÂNIA",
	id: 27,
	rootId: 27,
	level: 0,
	children: [
		114,
		115,
		116,
		117
	]
},
	"28": {
	name: "Sverige",
	id: 28,
	rootId: 28,
	level: 0,
	children: [
		118,
		1895,
		1896,
		1897
	]
},
	"29": {
	name: "Slovenija",
	id: 29,
	rootId: 29,
	level: 0,
	children: [
		119
	]
},
	"30": {
	name: "SLOVENSKO",
	id: 30,
	rootId: 30,
	level: 0,
	children: [
		120
	]
},
	"31": {
	name: "TÜRKIYE",
	id: 31,
	rootId: 31,
	level: 0,
	children: [
		121,
		122,
		123,
		124,
		125,
		126,
		127,
		128,
		129,
		130,
		131,
		132
	]
},
	"32": {
	name: "United Kingdom",
	id: 32,
	rootId: 32,
	level: 0,
	children: [
		133,
		134,
		135,
		136,
		137,
		138,
		139,
		140,
		141,
		142,
		143,
		144
	]
},
	"33": {
	name: "Ostösterreich",
	id: 33,
	pid: 0,
	rootId: 0,
	level: 1,
	children: [
		145,
		146,
		147
	]
},
	"34": {
	name: "Südösterreich",
	id: 34,
	pid: 0,
	rootId: 0,
	level: 1,
	children: [
		148,
		149
	]
},
	"35": {
	name: "Westösterreich",
	id: 35,
	pid: 0,
	rootId: 0,
	level: 1,
	children: [
		150,
		151,
		152,
		153
	]
},
	"36": {
	name: "Région de Bruxelles-Capitale / Brussels Hoofdstedelijk Gewest",
	id: 36,
	pid: 1,
	rootId: 1,
	level: 1,
	children: [
		154
	]
},
	"37": {
	name: "Vlaams Gewest",
	id: 37,
	pid: 1,
	rootId: 1,
	level: 1,
	children: [
		155,
		156,
		157,
		158,
		159
	]
},
	"38": {
	name: "Région Wallonne",
	id: 38,
	pid: 1,
	rootId: 1,
	level: 1,
	children: [
		160,
		161,
		162,
		163,
		164
	]
},
	"39": {
	name: "Severna i Yugoiztochna Bulgaria",
	id: 39,
	pid: 2,
	rootId: 2,
	level: 1,
	children: [
		165,
		166,
		167,
		168
	]
},
	"40": {
	name: "Yugozapadna i Yuzhna tsentralna Bulgaria",
	id: 40,
	pid: 2,
	rootId: 2,
	level: 1,
	children: [
		169,
		170
	]
},
	"41": {
	name: "Schweiz/Suisse/Svizzera",
	id: 41,
	pid: 3,
	rootId: 3,
	level: 1,
	children: [
		171,
		172,
		173,
		174,
		175,
		176,
		177
	]
},
	"42": {
	name: "Kýpros",
	id: 42,
	pid: 4,
	rootId: 4,
	level: 1,
	children: [
		178
	]
},
	"43": {
	name: "Česká Republika",
	id: 43,
	pid: 5,
	rootId: 5,
	level: 1,
	children: [
		179,
		180,
		181,
		182,
		183,
		184,
		185,
		186
	]
},
	"44": {
	name: "Baden-Württemberg",
	id: 44,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		187,
		188,
		189,
		190
	]
},
	"45": {
	name: "Bayern",
	id: 45,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		191,
		192,
		193,
		194,
		195,
		196,
		197
	]
},
	"46": {
	name: "Berlin",
	id: 46,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		198
	]
},
	"47": {
	name: "Brandenburg",
	id: 47,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		199,
		200,
		2017
	]
},
	"48": {
	name: "Bremen",
	id: 48,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		201
	]
},
	"49": {
	name: "Hamburg",
	id: 49,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		202
	]
},
	"50": {
	name: "Hessen",
	id: 50,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		203,
		204,
		205
	]
},
	"51": {
	name: "Mecklenburg-Vorpommern",
	id: 51,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		206
	]
},
	"52": {
	name: "Niedersachsen",
	id: 52,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		207,
		208,
		209,
		210
	]
},
	"53": {
	name: "Nordrhein-Westfalen",
	id: 53,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		211,
		212,
		213,
		214,
		215
	]
},
	"54": {
	name: "Rheinland-Pfalz",
	id: 54,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		216,
		217,
		218
	]
},
	"55": {
	name: "Saarland",
	id: 55,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		219
	]
},
	"56": {
	name: "Sachsen",
	id: 56,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		220,
		221,
		222,
		2018,
		2019
	]
},
	"57": {
	name: "Sachsen-Anhalt",
	id: 57,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		223,
		224,
		225,
		1898
	]
},
	"58": {
	name: "Schleswig-Holstein",
	id: 58,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		226
	]
},
	"59": {
	name: "Thüringen",
	id: 59,
	pid: 6,
	rootId: 6,
	level: 1,
	children: [
		227
	]
},
	"60": {
	name: "Danmark",
	id: 60,
	pid: 7,
	rootId: 7,
	level: 1,
	children: [
		228,
		1899,
		1900,
		1901,
		1902,
		1903
	]
},
	"61": {
	name: "Eesti",
	id: 61,
	pid: 8,
	rootId: 8,
	level: 1,
	children: [
		229
	]
},
	"62": {
	name: "Noroeste",
	id: 62,
	pid: 9,
	rootId: 9,
	level: 1,
	children: [
		230,
		231,
		232
	]
},
	"63": {
	name: "Noreste",
	id: 63,
	pid: 9,
	rootId: 9,
	level: 1,
	children: [
		233,
		234,
		235,
		236
	]
},
	"64": {
	name: "Comunidad de Madrid",
	id: 64,
	pid: 9,
	rootId: 9,
	level: 1,
	children: [
		237
	]
},
	"65": {
	name: "CENTRO (ES)",
	id: 65,
	pid: 9,
	rootId: 9,
	level: 1,
	children: [
		238,
		239,
		240
	]
},
	"66": {
	name: "Este",
	id: 66,
	pid: 9,
	rootId: 9,
	level: 1,
	children: [
		241,
		242,
		243
	]
},
	"67": {
	name: "Sur",
	id: 67,
	pid: 9,
	rootId: 9,
	level: 1,
	children: [
		244,
		245,
		246,
		247
	]
},
	"68": {
	name: "Canarias",
	id: 68,
	pid: 9,
	rootId: 9,
	level: 1,
	children: [
		248
	]
},
	"69": {
	name: "Manner-Suomi",
	id: 69,
	pid: 10,
	rootId: 10,
	level: 1,
	children: [
		249,
		250,
		251,
		252,
		2020,
		2021,
		2022
	]
},
	"70": {
	name: "Åland",
	id: 70,
	pid: 10,
	rootId: 10,
	level: 1,
	children: [
		253
	]
},
	"71": {
	name: "Île de France",
	id: 71,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		254
	]
},
	"72": {
	name: "Bassin Parisien",
	id: 72,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		255,
		256,
		257,
		258,
		259,
		260
	]
},
	"73": {
	name: "Nord - Pas-de-Calais",
	id: 73,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		261
	]
},
	"74": {
	name: "Est",
	id: 74,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		262,
		263,
		264
	]
},
	"75": {
	name: "Ouest",
	id: 75,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		265,
		266,
		267
	]
},
	"76": {
	name: "Sud-Ouest",
	id: 76,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		268,
		269,
		270
	]
},
	"77": {
	name: "Centre-Est",
	id: 77,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		271,
		272
	]
},
	"78": {
	name: "Méditerranée",
	id: 78,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		273,
		274,
		275
	]
},
	"79": {
	name: "Départements d'outre-mer",
	id: 79,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		276,
		277,
		278,
		279
	]
},
	"80": {
	name: "Voreia Ellada",
	id: 80,
	pid: 12,
	rootId: 12,
	level: 1,
	children: [
		280,
		281,
		282,
		283
	]
},
	"81": {
	name: "Kentriki Ellada",
	id: 81,
	pid: 12,
	rootId: 12,
	level: 1,
	children: [
		284,
		285,
		286,
		287,
		288
	]
},
	"82": {
	name: "ATTIKI",
	id: 82,
	pid: 12,
	rootId: 12,
	level: 1,
	children: [
		289
	]
},
	"83": {
	name: "NISIA AIGAIOU, KRITI",
	id: 83,
	pid: 12,
	rootId: 12,
	level: 1,
	children: [
		290,
		291,
		292
	]
},
	"84": {
	name: "Hrvatska",
	id: 84,
	pid: 13,
	rootId: 13,
	level: 1,
	children: [
		293,
		294,
		295,
		2023,
		2288,
		2289,
		2290
	]
},
	"85": {
	name: "Közép-Magyarország",
	id: 85,
	pid: 14,
	rootId: 14,
	level: 1,
	children: [
		296,
		2223,
		2224
	]
},
	"86": {
	name: "Dunántúl",
	id: 86,
	pid: 14,
	rootId: 14,
	level: 1,
	children: [
		297,
		298,
		299
	]
},
	"87": {
	name: "ALFÖLD ÉS ÉSZAK",
	id: 87,
	pid: 14,
	rootId: 14,
	level: 1,
	children: [
		300,
		301,
		302
	]
},
	"88": {
	name: "Ireland",
	id: 88,
	pid: 15,
	rootId: 15,
	level: 1,
	children: [
		303,
		304,
		2225,
		2226,
		2227
	]
},
	"89": {
	name: "Ísland",
	id: 89,
	pid: 16,
	rootId: 16,
	level: 1,
	children: [
		305
	]
},
	"90": {
	name: "Nord-Ovest",
	id: 90,
	pid: 17,
	rootId: 17,
	level: 1,
	children: [
		306,
		307,
		308,
		309
	]
},
	"91": {
	name: "Nord-Est",
	id: 91,
	pid: 17,
	rootId: 17,
	level: 1,
	children: [
		310,
		311,
		312,
		313,
		314
	]
},
	"92": {
	name: "Centro (I)",
	id: 92,
	pid: 17,
	rootId: 17,
	level: 1,
	children: [
		315,
		316,
		317,
		318
	]
},
	"93": {
	name: "Sud",
	id: 93,
	pid: 17,
	rootId: 17,
	level: 1,
	children: [
		319,
		320,
		321,
		322,
		323,
		324
	]
},
	"94": {
	name: "Isole",
	id: 94,
	pid: 17,
	rootId: 17,
	level: 1,
	children: [
		325,
		326
	]
},
	"95": {
	name: "Liechtenstein",
	id: 95,
	pid: 18,
	rootId: 18,
	level: 1,
	children: [
		327
	]
},
	"96": {
	name: "Lietuva",
	id: 96,
	pid: 19,
	rootId: 19,
	level: 1,
	children: [
		328,
		2228,
		2229
	]
},
	"97": {
	name: "LUXEMBOURG",
	id: 97,
	pid: 20,
	rootId: 20,
	level: 1,
	children: [
		329
	]
},
	"98": {
	name: "Latvija",
	id: 98,
	pid: 21,
	rootId: 21,
	level: 1,
	children: [
		330
	]
},
	"99": {
	name: "Malta",
	id: 99,
	pid: 22,
	rootId: 22,
	level: 1,
	children: [
		331
	]
},
	"100": {
	name: "Noord-Nederland",
	id: 100,
	pid: 23,
	rootId: 23,
	level: 1,
	children: [
		332,
		333,
		334
	]
},
	"101": {
	name: "Oost-Nederland",
	id: 101,
	pid: 23,
	rootId: 23,
	level: 1,
	children: [
		335,
		336,
		337
	]
},
	"102": {
	name: "West-Nederland",
	id: 102,
	pid: 23,
	rootId: 23,
	level: 1,
	children: [
		338,
		339,
		340,
		341
	]
},
	"103": {
	name: "Zuid-Nederland",
	id: 103,
	pid: 23,
	rootId: 23,
	level: 1,
	children: [
		342,
		343
	]
},
	"104": {
	name: "Norge",
	id: 104,
	pid: 24,
	rootId: 24,
	level: 1,
	children: [
		344,
		345,
		346,
		347,
		348,
		349,
		350,
		2291,
		2292,
		2293
	]
},
	"105": {
	name: "Region Centralny",
	id: 105,
	pid: 25,
	rootId: 25,
	level: 1,
	children: [
		351,
		352
	]
},
	"106": {
	name: "Makroregion południowy",
	id: 106,
	pid: 25,
	rootId: 25,
	level: 1,
	children: [
		353,
		354
	]
},
	"107": {
	name: "Region Wschodni",
	id: 107,
	pid: 25,
	rootId: 25,
	level: 1,
	children: [
		355,
		356,
		357,
		358
	]
},
	"108": {
	name: "Makroregion północno-zachodni",
	id: 108,
	pid: 25,
	rootId: 25,
	level: 1,
	children: [
		359,
		360,
		361
	]
},
	"109": {
	name: "Makroregion południowo-zachodni",
	id: 109,
	pid: 25,
	rootId: 25,
	level: 1,
	children: [
		362,
		363
	]
},
	"110": {
	name: "Makroregion północny",
	id: 110,
	pid: 25,
	rootId: 25,
	level: 1,
	children: [
		364,
		365,
		366
	]
},
	"111": {
	name: "Continente",
	id: 111,
	pid: 26,
	rootId: 26,
	level: 1,
	children: [
		367,
		368,
		369,
		370,
		371
	]
},
	"112": {
	name: "Região Autónoma dos Açores",
	id: 112,
	pid: 26,
	rootId: 26,
	level: 1,
	children: [
		372
	]
},
	"113": {
	name: "Região Autónoma da Madeira",
	id: 113,
	pid: 26,
	rootId: 26,
	level: 1,
	children: [
		373
	]
},
	"114": {
	name: "MACROREGIUNEA UNU",
	id: 114,
	pid: 27,
	rootId: 27,
	level: 1,
	children: [
		374,
		375
	]
},
	"115": {
	name: "MACROREGIUNEA DOI",
	id: 115,
	pid: 27,
	rootId: 27,
	level: 1,
	children: [
		376,
		377
	]
},
	"116": {
	name: "MACROREGIUNEA TREI",
	id: 116,
	pid: 27,
	rootId: 27,
	level: 1,
	children: [
		378,
		379
	]
},
	"117": {
	name: "MACROREGIUNEA PATRU",
	id: 117,
	pid: 27,
	rootId: 27,
	level: 1,
	children: [
		380,
		381
	]
},
	"118": {
	name: "Sverige",
	id: 118,
	pid: 28,
	rootId: 28,
	level: 1,
	children: [
		382,
		383,
		384,
		385,
		386,
		387,
		388,
		389
	]
},
	"119": {
	name: "Slovenija",
	id: 119,
	pid: 29,
	rootId: 29,
	level: 1,
	children: [
		390,
		1906,
		1907,
		2086,
		2087
	]
},
	"120": {
	name: "SLOVENSKO",
	id: 120,
	pid: 30,
	rootId: 30,
	level: 1,
	children: [
		391,
		392,
		393,
		394
	]
},
	"121": {
	name: "ISTANBUL",
	id: 121,
	pid: 31,
	rootId: 31,
	level: 1,
	children: [
		395
	]
},
	"122": {
	name: "Bati Marmara",
	id: 122,
	pid: 31,
	rootId: 31,
	level: 1,
	children: [
		396,
		397
	]
},
	"123": {
	name: "Ege",
	id: 123,
	pid: 31,
	rootId: 31,
	level: 1,
	children: [
		398,
		399,
		400
	]
},
	"124": {
	name: "DOGU MARMARA",
	id: 124,
	pid: 31,
	rootId: 31,
	level: 1,
	children: [
		401,
		402
	]
},
	"125": {
	name: "Bati Anadolu",
	id: 125,
	pid: 31,
	rootId: 31,
	level: 1,
	children: [
		403,
		404
	]
},
	"126": {
	name: "Akdeniz",
	id: 126,
	pid: 31,
	rootId: 31,
	level: 1,
	children: [
		405,
		406,
		407
	]
},
	"127": {
	name: "Orta Anadolu",
	id: 127,
	pid: 31,
	rootId: 31,
	level: 1,
	children: [
		408,
		409
	]
},
	"128": {
	name: "Bati Karadeniz",
	id: 128,
	pid: 31,
	rootId: 31,
	level: 1,
	children: [
		410,
		411,
		412
	]
},
	"129": {
	name: "DOGU KARADENIZ",
	id: 129,
	pid: 31,
	rootId: 31,
	level: 1,
	children: [
		413
	]
},
	"130": {
	name: "KUZEYDOGU ANADOLU",
	id: 130,
	pid: 31,
	rootId: 31,
	level: 1,
	children: [
		414,
		415
	]
},
	"131": {
	name: "ORTADOGU ANADOLU",
	id: 131,
	pid: 31,
	rootId: 31,
	level: 1,
	children: [
		416,
		417
	]
},
	"132": {
	name: "GÜNEYDOGU ANADOLU",
	id: 132,
	pid: 31,
	rootId: 31,
	level: 1,
	children: [
		418,
		419,
		420
	]
},
	"133": {
	name: "North East (England)",
	id: 133,
	pid: 32,
	rootId: 32,
	level: 1,
	children: [
		421,
		422
	]
},
	"134": {
	name: "North West (England)",
	id: 134,
	pid: 32,
	rootId: 32,
	level: 1,
	children: [
		423,
		424,
		425,
		426,
		427,
		2026,
		2027
	]
},
	"135": {
	name: "Yorkshire and the Humber",
	id: 135,
	pid: 32,
	rootId: 32,
	level: 1,
	children: [
		428,
		429,
		430,
		431
	]
},
	"136": {
	name: "East Midlands (England)",
	id: 136,
	pid: 32,
	rootId: 32,
	level: 1,
	children: [
		432,
		433,
		434
	]
},
	"137": {
	name: "West Midlands (England)",
	id: 137,
	pid: 32,
	rootId: 32,
	level: 1,
	children: [
		435,
		436,
		437
	]
},
	"138": {
	name: "East of England",
	id: 138,
	pid: 32,
	rootId: 32,
	level: 1,
	children: [
		438,
		439,
		440
	]
},
	"139": {
	name: "London",
	id: 139,
	pid: 32,
	rootId: 32,
	level: 1,
	children: [
		441,
		442,
		2088,
		2089,
		2090,
		2091,
		2092
	]
},
	"140": {
	name: "South East (England)",
	id: 140,
	pid: 32,
	rootId: 32,
	level: 1,
	children: [
		443,
		444,
		445,
		446
	]
},
	"141": {
	name: "South West (England)",
	id: 141,
	pid: 32,
	rootId: 32,
	level: 1,
	children: [
		447,
		448,
		449,
		450
	]
},
	"142": {
	name: "Wales",
	id: 142,
	pid: 32,
	rootId: 32,
	level: 1,
	children: [
		451,
		452
	]
},
	"143": {
	name: "Scotland",
	id: 143,
	pid: 32,
	rootId: 32,
	level: 1,
	children: [
		453,
		454,
		455,
		456,
		1908,
		1909,
		2236,
		2237
	]
},
	"144": {
	name: "Northern Ireland",
	id: 144,
	pid: 32,
	rootId: 32,
	level: 1,
	children: [
		457
	]
},
	"145": {
	name: "Burgenland",
	id: 145,
	pid: 33,
	rootId: 0,
	level: 2,
	children: [
		458,
		459,
		460
	]
},
	"146": {
	name: "Niederösterreich",
	id: 146,
	pid: 33,
	rootId: 0,
	level: 2,
	children: [
		461,
		462,
		463,
		464,
		465,
		466,
		467
	]
},
	"147": {
	name: "Wien",
	id: 147,
	pid: 33,
	rootId: 0,
	level: 2,
	children: [
		468
	]
},
	"148": {
	name: "Kärnten",
	id: 148,
	pid: 34,
	rootId: 0,
	level: 2,
	children: [
		469,
		470,
		471
	]
},
	"149": {
	name: "Steiermark",
	id: 149,
	pid: 34,
	rootId: 0,
	level: 2,
	children: [
		472,
		473,
		474,
		475,
		476,
		477
	]
},
	"150": {
	name: "Oberösterreich",
	id: 150,
	pid: 35,
	rootId: 0,
	level: 2,
	children: [
		478,
		479,
		480,
		481,
		482
	]
},
	"151": {
	name: "Salzburg",
	id: 151,
	pid: 35,
	rootId: 0,
	level: 2,
	children: [
		483,
		484,
		485
	]
},
	"152": {
	name: "Tirol",
	id: 152,
	pid: 35,
	rootId: 0,
	level: 2,
	children: [
		486,
		487,
		488,
		489,
		490
	]
},
	"153": {
	name: "Vorarlberg",
	id: 153,
	pid: 35,
	rootId: 0,
	level: 2,
	children: [
		491,
		492
	]
},
	"154": {
	name: "Région de Bruxelles-Capitale / Brussels Hoofdstedelijk Gewest",
	id: 154,
	pid: 36,
	rootId: 1,
	level: 2,
	children: [
		493
	]
},
	"155": {
	name: "Prov. Antwerpen",
	id: 155,
	pid: 37,
	rootId: 1,
	level: 2,
	children: [
		494,
		495,
		496
	]
},
	"156": {
	name: "Prov. Limburg (BE)",
	id: 156,
	pid: 37,
	rootId: 1,
	level: 2,
	children: [
		497,
		498,
		499
	]
},
	"157": {
	name: "Prov. Oost-Vlaanderen",
	id: 157,
	pid: 37,
	rootId: 1,
	level: 2,
	children: [
		500,
		501,
		502,
		503,
		504,
		505
	]
},
	"158": {
	name: "Prov. Vlaams-Brabant",
	id: 158,
	pid: 37,
	rootId: 1,
	level: 2,
	children: [
		506,
		507
	]
},
	"159": {
	name: "Prov. West-Vlaanderen",
	id: 159,
	pid: 37,
	rootId: 1,
	level: 2,
	children: [
		508,
		509,
		510,
		511,
		512,
		513,
		514,
		515
	]
},
	"160": {
	name: "Prov. Brabant Wallon",
	id: 160,
	pid: 38,
	rootId: 1,
	level: 2,
	children: [
		516
	]
},
	"161": {
	name: "Prov. Hainaut",
	id: 161,
	pid: 38,
	rootId: 1,
	level: 2,
	children: [
		517,
		518,
		519,
		520,
		521,
		522,
		523,
		2294,
		2295
	]
},
	"162": {
	name: "Prov. Liège",
	id: 162,
	pid: 38,
	rootId: 1,
	level: 2,
	children: [
		524,
		525,
		526,
		527,
		1910,
		1911
	]
},
	"163": {
	name: "Prov. Luxembourg (BE)",
	id: 163,
	pid: 38,
	rootId: 1,
	level: 2,
	children: [
		528,
		529,
		530,
		531,
		532
	]
},
	"164": {
	name: "Prov. Namur",
	id: 164,
	pid: 38,
	rootId: 1,
	level: 2,
	children: [
		533,
		534,
		535
	]
},
	"165": {
	name: "Severozapaden",
	id: 165,
	pid: 39,
	rootId: 2,
	level: 2,
	children: [
		536,
		537,
		538,
		539,
		540
	]
},
	"166": {
	name: "Severen tsentralen",
	id: 166,
	pid: 39,
	rootId: 2,
	level: 2,
	children: [
		541,
		542,
		543,
		544,
		545
	]
},
	"167": {
	name: "Severoiztochen",
	id: 167,
	pid: 39,
	rootId: 2,
	level: 2,
	children: [
		546,
		547,
		548,
		549
	]
},
	"168": {
	name: "Yugoiztochen",
	id: 168,
	pid: 39,
	rootId: 2,
	level: 2,
	children: [
		550,
		551,
		552,
		553
	]
},
	"169": {
	name: "Yugozapaden",
	id: 169,
	pid: 40,
	rootId: 2,
	level: 2,
	children: [
		554,
		555,
		556,
		557,
		558
	]
},
	"170": {
	name: "Yuzhen tsentralen",
	id: 170,
	pid: 40,
	rootId: 2,
	level: 2,
	children: [
		559,
		560,
		561,
		562,
		563
	]
},
	"171": {
	name: "Région lémanique",
	id: 171,
	pid: 41,
	rootId: 3,
	level: 2,
	children: [
		564,
		565,
		566
	]
},
	"172": {
	name: "Espace Mittelland",
	id: 172,
	pid: 41,
	rootId: 3,
	level: 2,
	children: [
		567,
		568,
		569,
		570,
		571
	]
},
	"173": {
	name: "Nordwestschweiz",
	id: 173,
	pid: 41,
	rootId: 3,
	level: 2,
	children: [
		572,
		573,
		574
	]
},
	"174": {
	name: "Zürich",
	id: 174,
	pid: 41,
	rootId: 3,
	level: 2,
	children: [
		575
	]
},
	"175": {
	name: "Ostschweiz",
	id: 175,
	pid: 41,
	rootId: 3,
	level: 2,
	children: [
		576,
		577,
		578,
		579,
		580,
		581,
		582
	]
},
	"176": {
	name: "Zentralschweiz",
	id: 176,
	pid: 41,
	rootId: 3,
	level: 2,
	children: [
		583,
		584,
		585,
		586,
		587,
		588
	]
},
	"177": {
	name: "Ticino",
	id: 177,
	pid: 41,
	rootId: 3,
	level: 2,
	children: [
		589
	]
},
	"178": {
	name: "Kýpros",
	id: 178,
	pid: 42,
	rootId: 4,
	level: 2,
	children: [
		590
	]
},
	"179": {
	name: "Praha",
	id: 179,
	pid: 43,
	rootId: 5,
	level: 2,
	children: [
		591
	]
},
	"180": {
	name: "Střední Čechy",
	id: 180,
	pid: 43,
	rootId: 5,
	level: 2,
	children: [
		592
	]
},
	"181": {
	name: "Jihozápad",
	id: 181,
	pid: 43,
	rootId: 5,
	level: 2,
	children: [
		593,
		594
	]
},
	"182": {
	name: "Severozápad",
	id: 182,
	pid: 43,
	rootId: 5,
	level: 2,
	children: [
		595,
		596
	]
},
	"183": {
	name: "Severovýchod",
	id: 183,
	pid: 43,
	rootId: 5,
	level: 2,
	children: [
		597,
		598,
		599
	]
},
	"184": {
	name: "Jihovýchod",
	id: 184,
	pid: 43,
	rootId: 5,
	level: 2,
	children: [
		600,
		601,
		1912,
		1913
	]
},
	"185": {
	name: "Střední Morava",
	id: 185,
	pid: 43,
	rootId: 5,
	level: 2,
	children: [
		602,
		603
	]
},
	"186": {
	name: "Moravskoslezsko",
	id: 186,
	pid: 43,
	rootId: 5,
	level: 2,
	children: [
		604
	]
},
	"187": {
	name: "Stuttgart",
	id: 187,
	pid: 44,
	rootId: 6,
	level: 2,
	children: [
		605,
		606,
		607,
		608,
		609,
		610,
		611,
		612,
		613,
		614,
		615,
		616,
		617
	]
},
	"188": {
	name: "Karlsruhe",
	id: 188,
	pid: 44,
	rootId: 6,
	level: 2,
	children: [
		618,
		619,
		620,
		621,
		622,
		623,
		624,
		625,
		626,
		627,
		628,
		629
	]
},
	"189": {
	name: "Freiburg",
	id: 189,
	pid: 44,
	rootId: 6,
	level: 2,
	children: [
		630,
		631,
		632,
		633,
		634,
		635,
		636,
		637,
		638,
		639
	]
},
	"190": {
	name: "Tübingen",
	id: 190,
	pid: 44,
	rootId: 6,
	level: 2,
	children: [
		640,
		641,
		642,
		643,
		644,
		645,
		646,
		647,
		648
	]
},
	"191": {
	name: "Oberbayern",
	id: 191,
	pid: 45,
	rootId: 6,
	level: 2,
	children: [
		649,
		650,
		651,
		652,
		653,
		654,
		655,
		656,
		657,
		658,
		659,
		660,
		661,
		662,
		663,
		664,
		665,
		666,
		667,
		668,
		669,
		670,
		671
	]
},
	"192": {
	name: "Niederbayern",
	id: 192,
	pid: 45,
	rootId: 6,
	level: 2,
	children: [
		672,
		673,
		674,
		675,
		676,
		677,
		678,
		679,
		680,
		681,
		682,
		683
	]
},
	"193": {
	name: "Oberpfalz",
	id: 193,
	pid: 45,
	rootId: 6,
	level: 2,
	children: [
		684,
		685,
		686,
		687,
		688,
		689,
		690,
		691,
		692,
		693
	]
},
	"194": {
	name: "Oberfranken",
	id: 194,
	pid: 45,
	rootId: 6,
	level: 2,
	children: [
		694,
		695,
		696,
		697,
		698,
		699,
		700,
		701,
		702,
		703,
		704,
		705,
		706
	]
},
	"195": {
	name: "Mittelfranken",
	id: 195,
	pid: 45,
	rootId: 6,
	level: 2,
	children: [
		707,
		708,
		709,
		710,
		711,
		712,
		713,
		714,
		715,
		716,
		717,
		718
	]
},
	"196": {
	name: "Unterfranken",
	id: 196,
	pid: 45,
	rootId: 6,
	level: 2,
	children: [
		719,
		720,
		721,
		722,
		723,
		724,
		725,
		726,
		727,
		728,
		729,
		730
	]
},
	"197": {
	name: "Schwaben",
	id: 197,
	pid: 45,
	rootId: 6,
	level: 2,
	children: [
		731,
		732,
		733,
		734,
		735,
		736,
		737,
		738,
		739,
		740,
		741,
		742,
		743,
		744
	]
},
	"198": {
	name: "Berlin",
	id: 198,
	pid: 46,
	rootId: 6,
	level: 2,
	children: [
		745
	]
},
	"199": {
	name: "Brandenburg - Nordost",
	id: 199,
	pid: 47,
	rootId: 6,
	level: 2,
	children: [
		746,
		747,
		748,
		749,
		750,
		751,
		752,
		753
	]
},
	"200": {
	name: "Brandenburg - Südwest",
	id: 200,
	pid: 47,
	rootId: 6,
	level: 2,
	children: [
		754,
		755,
		756,
		757,
		758,
		759,
		760,
		761,
		762,
		763
	]
},
	"201": {
	name: "Bremen",
	id: 201,
	pid: 48,
	rootId: 6,
	level: 2,
	children: [
		764,
		765
	]
},
	"202": {
	name: "Hamburg",
	id: 202,
	pid: 49,
	rootId: 6,
	level: 2,
	children: [
		766
	]
},
	"203": {
	name: "Darmstadt",
	id: 203,
	pid: 50,
	rootId: 6,
	level: 2,
	children: [
		767,
		768,
		769,
		770,
		771,
		772,
		773,
		774,
		775,
		776,
		777,
		778,
		779,
		780
	]
},
	"204": {
	name: "Gießen",
	id: 204,
	pid: 50,
	rootId: 6,
	level: 2,
	children: [
		781,
		782,
		783,
		784,
		785
	]
},
	"205": {
	name: "Kassel",
	id: 205,
	pid: 50,
	rootId: 6,
	level: 2,
	children: [
		786,
		787,
		788,
		789,
		790,
		791,
		792
	]
},
	"206": {
	name: "Mecklenburg-Vorpommern",
	id: 206,
	pid: 51,
	rootId: 6,
	level: 2,
	children: [
		793,
		794,
		795,
		796,
		797,
		798,
		799,
		800,
		801,
		802,
		803,
		804,
		805,
		806,
		807,
		808,
		809,
		810,
		2093,
		2094,
		2095,
		2096,
		2097,
		2098
	]
},
	"207": {
	name: "Braunschweig",
	id: 207,
	pid: 52,
	rootId: 6,
	level: 2,
	children: [
		811,
		812,
		813,
		814,
		815,
		816,
		817,
		818,
		819,
		820,
		821,
		2250
	]
},
	"208": {
	name: "Hannover",
	id: 208,
	pid: 52,
	rootId: 6,
	level: 2,
	children: [
		822,
		823,
		824,
		825,
		826,
		827,
		828
	]
},
	"209": {
	name: "Lüneburg",
	id: 209,
	pid: 52,
	rootId: 6,
	level: 2,
	children: [
		829,
		830,
		831,
		832,
		833,
		834,
		835,
		836,
		837,
		838,
		839
	]
},
	"210": {
	name: "Weser-Ems",
	id: 210,
	pid: 52,
	rootId: 6,
	level: 2,
	children: [
		840,
		841,
		842,
		843,
		844,
		845,
		846,
		847,
		848,
		849,
		850,
		851,
		852,
		853,
		854,
		855,
		856
	]
},
	"211": {
	name: "Düsseldorf",
	id: 211,
	pid: 53,
	rootId: 6,
	level: 2,
	children: [
		857,
		858,
		859,
		860,
		861,
		862,
		863,
		864,
		865,
		866,
		867,
		868,
		869,
		870,
		871
	]
},
	"212": {
	name: "Köln",
	id: 212,
	pid: 53,
	rootId: 6,
	level: 2,
	children: [
		872,
		873,
		874,
		875,
		876,
		877,
		878,
		879,
		880,
		881,
		882,
		883,
		2028
	]
},
	"213": {
	name: "Münster",
	id: 213,
	pid: 53,
	rootId: 6,
	level: 2,
	children: [
		884,
		885,
		886,
		887,
		888,
		889,
		890,
		891
	]
},
	"214": {
	name: "Detmold",
	id: 214,
	pid: 53,
	rootId: 6,
	level: 2,
	children: [
		892,
		893,
		894,
		895,
		896,
		897,
		898
	]
},
	"215": {
	name: "Arnsberg",
	id: 215,
	pid: 53,
	rootId: 6,
	level: 2,
	children: [
		899,
		900,
		901,
		902,
		903,
		904,
		905,
		906,
		907,
		908,
		909,
		910
	]
},
	"216": {
	name: "Koblenz",
	id: 216,
	pid: 54,
	rootId: 6,
	level: 2,
	children: [
		911,
		912,
		913,
		914,
		915,
		916,
		917,
		918,
		919,
		920,
		921
	]
},
	"217": {
	name: "Trier",
	id: 217,
	pid: 54,
	rootId: 6,
	level: 2,
	children: [
		922,
		923,
		924,
		925,
		926
	]
},
	"218": {
	name: "Rheinhessen-Pfalz",
	id: 218,
	pid: 54,
	rootId: 6,
	level: 2,
	children: [
		927,
		928,
		929,
		930,
		931,
		932,
		933,
		934,
		935,
		936,
		937,
		938,
		939,
		940,
		941,
		942,
		943,
		944,
		945,
		946
	]
},
	"219": {
	name: "Saarland",
	id: 219,
	pid: 55,
	rootId: 6,
	level: 2,
	children: [
		947,
		948,
		949,
		950,
		951,
		952
	]
},
	"220": {
	name: "Chemnitz",
	id: 220,
	pid: 56,
	rootId: 6,
	level: 2,
	children: [
		953,
		954,
		955,
		956,
		957,
		958,
		959,
		960,
		961,
		962,
		963,
		964
	]
},
	"221": {
	name: "Dresden",
	id: 221,
	pid: 56,
	rootId: 6,
	level: 2,
	children: [
		965,
		966,
		967,
		968,
		969,
		970,
		971,
		972,
		973,
		974,
		975,
		2029,
		2030,
		2031,
		2032
	]
},
	"222": {
	name: "Leipzig",
	id: 222,
	pid: 56,
	rootId: 6,
	level: 2,
	children: [
		976,
		977,
		978,
		979,
		980,
		981
	]
},
	"223": {
	name: "Dessau",
	id: 223,
	pid: 57,
	rootId: 6,
	level: 2,
	children: [
		982,
		983,
		984,
		985,
		986,
		987
	]
},
	"224": {
	name: "Halle",
	id: 224,
	pid: 57,
	rootId: 6,
	level: 2,
	children: [
		988,
		989,
		990,
		991,
		992,
		993,
		994
	]
},
	"225": {
	name: "Magdeburg",
	id: 225,
	pid: 57,
	rootId: 6,
	level: 2,
	children: [
		995,
		996,
		997,
		998,
		999,
		1000,
		1001,
		1002,
		1003,
		1004,
		1005
	]
},
	"226": {
	name: "Schleswig-Holstein",
	id: 226,
	pid: 58,
	rootId: 6,
	level: 2,
	children: [
		1006,
		1007,
		1008,
		1009,
		1010,
		1011,
		1012,
		1013,
		1014,
		1015,
		1016,
		1017,
		1018,
		1019,
		1020
	]
},
	"227": {
	name: "Thüringen",
	id: 227,
	pid: 59,
	rootId: 6,
	level: 2,
	children: [
		1021,
		1022,
		1023,
		1024,
		1025,
		1026,
		1027,
		1028,
		1029,
		1030,
		1031,
		1032,
		1033,
		1034,
		1035,
		1036,
		1037,
		1038,
		1039,
		1040,
		1041,
		1042,
		1043
	]
},
	"228": {
	name: "Danmark",
	id: 228,
	pid: 60,
	rootId: 7,
	level: 2,
	children: [
		1044,
		1045,
		1046,
		1047,
		1048,
		1049,
		1050,
		1051,
		1052,
		1053,
		1054,
		1055,
		1056,
		1057,
		1058
	]
},
	"229": {
	name: "Eesti",
	id: 229,
	pid: 61,
	rootId: 8,
	level: 2,
	children: [
		1059,
		1060,
		1061,
		1062,
		1063
	]
},
	"230": {
	name: "Galicia",
	id: 230,
	pid: 62,
	rootId: 9,
	level: 2,
	children: [
		1064,
		1065,
		1066,
		1067
	]
},
	"231": {
	name: "Principado de Asturias",
	id: 231,
	pid: 62,
	rootId: 9,
	level: 2,
	children: [
		1068
	]
},
	"232": {
	name: "Cantabria",
	id: 232,
	pid: 62,
	rootId: 9,
	level: 2,
	children: [
		1069
	]
},
	"233": {
	name: "País Vasco",
	id: 233,
	pid: 63,
	rootId: 9,
	level: 2,
	children: [
		1070,
		1071,
		1072
	]
},
	"234": {
	name: "Comunidad Foral de Navarra",
	id: 234,
	pid: 63,
	rootId: 9,
	level: 2,
	children: [
		1073
	]
},
	"235": {
	name: "La Rioja",
	id: 235,
	pid: 63,
	rootId: 9,
	level: 2,
	children: [
		1074
	]
},
	"236": {
	name: "Aragón",
	id: 236,
	pid: 63,
	rootId: 9,
	level: 2,
	children: [
		1075,
		1076,
		1077
	]
},
	"237": {
	name: "Comunidad de Madrid",
	id: 237,
	pid: 64,
	rootId: 9,
	level: 2,
	children: [
		1078
	]
},
	"238": {
	name: "Castilla y León",
	id: 238,
	pid: 65,
	rootId: 9,
	level: 2,
	children: [
		1079,
		1080,
		1081,
		1082,
		1083,
		1084,
		1085,
		1086,
		1087
	]
},
	"239": {
	name: "Castilla-La Mancha",
	id: 239,
	pid: 65,
	rootId: 9,
	level: 2,
	children: [
		1088,
		1089,
		1090,
		1091,
		1092
	]
},
	"240": {
	name: "Extremadura",
	id: 240,
	pid: 65,
	rootId: 9,
	level: 2,
	children: [
		1093,
		1094
	]
},
	"241": {
	name: "Cataluña",
	id: 241,
	pid: 66,
	rootId: 9,
	level: 2,
	children: [
		1095,
		1096,
		1097,
		1098
	]
},
	"242": {
	name: "Comunidad Valenciana",
	id: 242,
	pid: 66,
	rootId: 9,
	level: 2,
	children: [
		1099,
		1100,
		1101
	]
},
	"243": {
	name: "Illes Balears",
	id: 243,
	pid: 66,
	rootId: 9,
	level: 2,
	children: [
		1102,
		1933,
		1934,
		1935
	]
},
	"244": {
	name: "Andalucía",
	id: 244,
	pid: 67,
	rootId: 9,
	level: 2,
	children: [
		1103,
		1104,
		1105,
		1106,
		1107,
		1108,
		1109,
		1110
	]
},
	"245": {
	name: "Región de Murcia",
	id: 245,
	pid: 67,
	rootId: 9,
	level: 2,
	children: [
		1111
	]
},
	"246": {
	name: "Ciudad Autónoma de Ceuta",
	id: 246,
	pid: 67,
	rootId: 9,
	level: 2,
	children: [
		1112
	]
},
	"247": {
	name: "Ciudad Autónoma de Melilla",
	id: 247,
	pid: 67,
	rootId: 9,
	level: 2,
	children: [
		1113
	]
},
	"248": {
	name: "Canarias",
	id: 248,
	pid: 68,
	rootId: 9,
	level: 2,
	children: [
		1114,
		1115,
		1936,
		1937,
		1938,
		1939,
		1940,
		1941,
		1942
	]
},
	"249": {
	name: "Itä-Suomi",
	id: 249,
	pid: 69,
	rootId: 10,
	level: 2,
	children: [
		1116,
		1117,
		1118,
		1119
	]
},
	"250": {
	name: "Etelä-Suomi",
	id: 250,
	pid: 69,
	rootId: 10,
	level: 2,
	children: [
		1120,
		1121,
		1122,
		1123,
		1124,
		1125,
		1126
	]
},
	"251": {
	name: "Länsi-Suomi",
	id: 251,
	pid: 69,
	rootId: 10,
	level: 2,
	children: [
		1127,
		1128,
		1129,
		1130,
		1131,
		1943,
		1944
	]
},
	"252": {
	name: "Pohjois-Suomi",
	id: 252,
	pid: 69,
	rootId: 10,
	level: 2,
	children: [
		1132,
		1133,
		1134
	]
},
	"253": {
	name: "Åland",
	id: 253,
	pid: 70,
	rootId: 10,
	level: 2,
	children: [
		1135
	]
},
	"254": {
	name: "Île de France",
	id: 254,
	pid: 71,
	rootId: 11,
	level: 2,
	children: [
		1136,
		1137,
		1138,
		1139,
		1140,
		1141,
		1142,
		1143
	]
},
	"255": {
	name: "Champagne-Ardenne",
	id: 255,
	pid: 72,
	rootId: 11,
	level: 2,
	children: [
		1144,
		1145,
		1146,
		1147
	]
},
	"256": {
	name: "Picardie",
	id: 256,
	pid: 72,
	rootId: 11,
	level: 2,
	children: [
		1148,
		1149,
		1150
	]
},
	"257": {
	name: "Haute-Normandie",
	id: 257,
	pid: 72,
	rootId: 11,
	level: 2,
	children: [
		1151,
		1152
	]
},
	"258": {
	name: "Centre",
	id: 258,
	pid: 72,
	rootId: 11,
	level: 2,
	children: [
		1153,
		1154,
		1155,
		1156,
		1157,
		1158
	]
},
	"259": {
	name: "Basse-Normandie",
	id: 259,
	pid: 72,
	rootId: 11,
	level: 2,
	children: [
		1159,
		1160,
		1161
	]
},
	"260": {
	name: "Bourgogne",
	id: 260,
	pid: 72,
	rootId: 11,
	level: 2,
	children: [
		1162,
		1163,
		1164,
		1165
	]
},
	"261": {
	name: "Nord - Pas-de-Calais",
	id: 261,
	pid: 73,
	rootId: 11,
	level: 2,
	children: [
		1166,
		1167
	]
},
	"262": {
	name: "Lorraine",
	id: 262,
	pid: 74,
	rootId: 11,
	level: 2,
	children: [
		1168,
		1169,
		1170,
		1171
	]
},
	"263": {
	name: "Alsace",
	id: 263,
	pid: 74,
	rootId: 11,
	level: 2,
	children: [
		1172,
		1173
	]
},
	"264": {
	name: "Franche-Comté",
	id: 264,
	pid: 74,
	rootId: 11,
	level: 2,
	children: [
		1174,
		1175,
		1176,
		1177
	]
},
	"265": {
	name: "Pays de la Loire",
	id: 265,
	pid: 75,
	rootId: 11,
	level: 2,
	children: [
		1178,
		1179,
		1180,
		1181,
		1182
	]
},
	"266": {
	name: "Bretagne",
	id: 266,
	pid: 75,
	rootId: 11,
	level: 2,
	children: [
		1183,
		1184,
		1185,
		1186
	]
},
	"267": {
	name: "Poitou-Charentes",
	id: 267,
	pid: 75,
	rootId: 11,
	level: 2,
	children: [
		1187,
		1188,
		1189,
		1190
	]
},
	"268": {
	name: "Aquitaine",
	id: 268,
	pid: 76,
	rootId: 11,
	level: 2,
	children: [
		1191,
		1192,
		1193,
		1194,
		1195
	]
},
	"269": {
	name: "Midi-Pyrénées",
	id: 269,
	pid: 76,
	rootId: 11,
	level: 2,
	children: [
		1196,
		1197,
		1198,
		1199,
		1200,
		1201,
		1202,
		1203
	]
},
	"270": {
	name: "Limousin",
	id: 270,
	pid: 76,
	rootId: 11,
	level: 2,
	children: [
		1204,
		1205,
		1206
	]
},
	"271": {
	name: "Rhône-Alpes",
	id: 271,
	pid: 77,
	rootId: 11,
	level: 2,
	children: [
		1207,
		1208,
		1209,
		1210,
		1211,
		1212,
		1213,
		1214
	]
},
	"272": {
	name: "Auvergne",
	id: 272,
	pid: 77,
	rootId: 11,
	level: 2,
	children: [
		1215,
		1216,
		1217,
		1218
	]
},
	"273": {
	name: "Languedoc-Roussillon",
	id: 273,
	pid: 78,
	rootId: 11,
	level: 2,
	children: [
		1219,
		1220,
		1221,
		1222,
		1223
	]
},
	"274": {
	name: "Provence-Alpes-Côte d'Azur",
	id: 274,
	pid: 78,
	rootId: 11,
	level: 2,
	children: [
		1224,
		1225,
		1226,
		1227,
		1228,
		1229
	]
},
	"275": {
	name: "Corse",
	id: 275,
	pid: 78,
	rootId: 11,
	level: 2,
	children: [
		1230,
		1231
	]
},
	"276": {
	name: "Guadeloupe",
	id: 276,
	pid: 79,
	rootId: 11,
	level: 2,
	children: [
		1232
	]
},
	"277": {
	name: "Martinique",
	id: 277,
	pid: 79,
	rootId: 11,
	level: 2,
	children: [
		1233
	]
},
	"278": {
	name: "Guyane",
	id: 278,
	pid: 79,
	rootId: 11,
	level: 2,
	children: [
		1234
	]
},
	"279": {
	name: "La Réunion",
	id: 279,
	pid: 79,
	rootId: 11,
	level: 2,
	children: [
		1235
	]
},
	"280": {
	name: "Anatoliki Makedonia, Thraki",
	id: 280,
	pid: 80,
	rootId: 12,
	level: 2,
	children: [
		1236,
		1237,
		1238,
		1239,
		1240
	]
},
	"281": {
	name: "Kentriki Makedonia",
	id: 281,
	pid: 80,
	rootId: 12,
	level: 2,
	children: [
		1241,
		1242,
		1243,
		1244,
		1245,
		1246,
		1247
	]
},
	"282": {
	name: "Dytiki Makedonia",
	id: 282,
	pid: 80,
	rootId: 12,
	level: 2,
	children: [
		1248,
		1249,
		1250,
		1251,
		2106
	]
},
	"283": {
	name: "Thessalia",
	id: 283,
	pid: 80,
	rootId: 12,
	level: 2,
	children: [
		1252,
		1253,
		1254,
		1255,
		2108
	]
},
	"284": {
	name: "Ipeiros",
	id: 284,
	pid: 81,
	rootId: 12,
	level: 2,
	children: [
		1256,
		1257,
		1258,
		1259,
		2107
	]
},
	"285": {
	name: "Ionia Nisia",
	id: 285,
	pid: 81,
	rootId: 12,
	level: 2,
	children: [
		1260,
		1261,
		1262,
		1263
	]
},
	"286": {
	name: "Dytiki Elláda",
	id: 286,
	pid: 81,
	rootId: 12,
	level: 2,
	children: [
		1264,
		1265,
		1266
	]
},
	"287": {
	name: "Sterea Elláda",
	id: 287,
	pid: 81,
	rootId: 12,
	level: 2,
	children: [
		1267,
		1268,
		1269,
		1270,
		1271
	]
},
	"288": {
	name: "Peloponnisos",
	id: 288,
	pid: 81,
	rootId: 12,
	level: 2,
	children: [
		1272,
		1273,
		1274,
		1275,
		1276,
		2109,
		2110
	]
},
	"289": {
	name: "Attiki",
	id: 289,
	pid: 82,
	rootId: 12,
	level: 2,
	children: [
		1277,
		2099,
		2100,
		2101,
		2102,
		2103,
		2104,
		2105
	]
},
	"290": {
	name: "Voreio Aigaio",
	id: 290,
	pid: 83,
	rootId: 12,
	level: 2,
	children: [
		1278,
		1279,
		1280
	]
},
	"291": {
	name: "Notio Aigaio",
	id: 291,
	pid: 83,
	rootId: 12,
	level: 2,
	children: [
		1281,
		1282
	]
},
	"292": {
	name: "Kriti",
	id: 292,
	pid: 83,
	rootId: 12,
	level: 2,
	children: [
		1283,
		1284,
		1285,
		1286
	]
},
	"293": {
	name: "Sjeverozapadna Hrvatska",
	id: 293,
	pid: 84,
	rootId: 13,
	level: 2,
	children: [
		1287,
		1288,
		1289,
		1290,
		1291,
		1292
	]
},
	"294": {
	name: "Središnja i Istočna (Panonska) Hrvatska",
	id: 294,
	pid: 84,
	rootId: 13,
	level: 2,
	children: [
		1293,
		1294,
		1295,
		1296,
		1297,
		1298,
		1299,
		1300
	]
},
	"295": {
	name: "Jadranska Hrvatska",
	id: 295,
	pid: 84,
	rootId: 13,
	level: 2,
	children: [
		1301,
		1302,
		1303,
		1304,
		1305,
		1306,
		1307
	]
},
	"296": {
	name: "Közép-Magyarország",
	id: 296,
	pid: 85,
	rootId: 14,
	level: 2,
	children: [
		1308,
		1309
	]
},
	"297": {
	name: "Közép-Dunántúl",
	id: 297,
	pid: 86,
	rootId: 14,
	level: 2,
	children: [
		1310,
		1311,
		1312
	]
},
	"298": {
	name: "Nyugat-Dunántúl",
	id: 298,
	pid: 86,
	rootId: 14,
	level: 2,
	children: [
		1313,
		1314,
		1315
	]
},
	"299": {
	name: "Dél-Dunántúl",
	id: 299,
	pid: 86,
	rootId: 14,
	level: 2,
	children: [
		1316,
		1317,
		1318
	]
},
	"300": {
	name: "Észak-Magyarország",
	id: 300,
	pid: 87,
	rootId: 14,
	level: 2,
	children: [
		1319,
		1320,
		1321
	]
},
	"301": {
	name: "Észak-Alföld",
	id: 301,
	pid: 87,
	rootId: 14,
	level: 2,
	children: [
		1322,
		1323,
		1324
	]
},
	"302": {
	name: "Dél-Alföld",
	id: 302,
	pid: 87,
	rootId: 14,
	level: 2,
	children: [
		1325,
		1326,
		1327
	]
},
	"303": {
	name: "Border, Midland and Western",
	id: 303,
	pid: 88,
	rootId: 15,
	level: 2,
	children: [
		1328,
		1329,
		1330
	]
},
	"304": {
	name: "Southern and Eastern",
	id: 304,
	pid: 88,
	rootId: 15,
	level: 2,
	children: [
		1331,
		1332,
		1333,
		1334,
		1335
	]
},
	"305": {
	name: "Ísland",
	id: 305,
	pid: 89,
	rootId: 16,
	level: 2,
	children: [
		1336,
		1945,
		1946
	]
},
	"306": {
	name: "Piemonte",
	id: 306,
	pid: 90,
	rootId: 17,
	level: 2,
	children: [
		1337,
		1338,
		1339,
		1340,
		1341,
		1342,
		1343,
		1344
	]
},
	"307": {
	name: "Valle d'Aosta/Vallée d'Aoste",
	id: 307,
	pid: 90,
	rootId: 17,
	level: 2,
	children: [
		1345
	]
},
	"308": {
	name: "Liguria",
	id: 308,
	pid: 90,
	rootId: 17,
	level: 2,
	children: [
		1346,
		1347,
		1348,
		1349
	]
},
	"309": {
	name: "Lombardia",
	id: 309,
	pid: 90,
	rootId: 17,
	level: 2,
	children: [
		1350,
		1351,
		1352,
		1353,
		1354,
		1355,
		1356,
		1357,
		1358,
		1359,
		1360,
		2054,
		2055
	]
},
	"310": {
	name: "Provincia Autonoma di Bolzano/Bozen",
	id: 310,
	pid: 91,
	rootId: 17,
	level: 2,
	children: [
		1361
	]
},
	"311": {
	name: "Provincia Autonoma di Trento",
	id: 311,
	pid: 91,
	rootId: 17,
	level: 2,
	children: [
		1362
	]
},
	"312": {
	name: "Veneto",
	id: 312,
	pid: 91,
	rootId: 17,
	level: 2,
	children: [
		1363,
		1364,
		1365,
		1366,
		1367,
		1368,
		1369
	]
},
	"313": {
	name: "Friuli-Venezia Giulia",
	id: 313,
	pid: 91,
	rootId: 17,
	level: 2,
	children: [
		1370,
		1371,
		1372,
		1373
	]
},
	"314": {
	name: "Emilia-Romagna",
	id: 314,
	pid: 91,
	rootId: 17,
	level: 2,
	children: [
		1374,
		1375,
		1376,
		1377,
		1378,
		1379,
		1380,
		1381,
		1382
	]
},
	"315": {
	name: "Toscana",
	id: 315,
	pid: 92,
	rootId: 17,
	level: 2,
	children: [
		1383,
		1384,
		1385,
		1386,
		1387,
		1388,
		1389,
		1390,
		1391,
		1392
	]
},
	"316": {
	name: "Umbria",
	id: 316,
	pid: 92,
	rootId: 17,
	level: 2,
	children: [
		1393,
		1394
	]
},
	"317": {
	name: "Marche",
	id: 317,
	pid: 92,
	rootId: 17,
	level: 2,
	children: [
		1395,
		1396,
		1397,
		1398
	]
},
	"318": {
	name: "Lazio",
	id: 318,
	pid: 92,
	rootId: 17,
	level: 2,
	children: [
		1399,
		1400,
		1401,
		1402,
		1403
	]
},
	"319": {
	name: "Abruzzo",
	id: 319,
	pid: 93,
	rootId: 17,
	level: 2,
	children: [
		1404,
		1405,
		1406,
		1407
	]
},
	"320": {
	name: "Molise",
	id: 320,
	pid: 93,
	rootId: 17,
	level: 2,
	children: [
		1408,
		1409
	]
},
	"321": {
	name: "Campania",
	id: 321,
	pid: 93,
	rootId: 17,
	level: 2,
	children: [
		1410,
		1411,
		1412,
		1413,
		1414
	]
},
	"322": {
	name: "Puglia",
	id: 322,
	pid: 93,
	rootId: 17,
	level: 2,
	children: [
		1415,
		1416,
		1417,
		1418,
		1419,
		2056,
		2057,
		2058
	]
},
	"323": {
	name: "Basilicata",
	id: 323,
	pid: 93,
	rootId: 17,
	level: 2,
	children: [
		1420,
		1421
	]
},
	"324": {
	name: "Calabria",
	id: 324,
	pid: 93,
	rootId: 17,
	level: 2,
	children: [
		1422,
		1423,
		1424,
		1425,
		1426
	]
},
	"325": {
	name: "Sicilia",
	id: 325,
	pid: 94,
	rootId: 17,
	level: 2,
	children: [
		1427,
		1428,
		1429,
		1430,
		1431,
		1432,
		1433,
		1434,
		1435
	]
},
	"326": {
	name: "Sardegna",
	id: 326,
	pid: 94,
	rootId: 17,
	level: 2,
	children: [
		1436,
		1437,
		1438,
		1439,
		1947,
		1948,
		1949,
		1950,
		1951,
		1952,
		1953,
		1954,
		2296
	]
},
	"327": {
	name: "Liechtenstein",
	id: 327,
	pid: 95,
	rootId: 18,
	level: 2,
	children: [
		1440
	]
},
	"328": {
	name: "Lietuva",
	id: 328,
	pid: 96,
	rootId: 19,
	level: 2,
	children: [
		1441,
		1442,
		1443,
		1444,
		1445,
		1446,
		1447,
		1448,
		1449,
		1450
	]
},
	"329": {
	name: "Luxembourg",
	id: 329,
	pid: 97,
	rootId: 20,
	level: 2,
	children: [
		1451
	]
},
	"330": {
	name: "Latvija",
	id: 330,
	pid: 98,
	rootId: 21,
	level: 2,
	children: [
		1452,
		1453,
		1454,
		1455,
		1456,
		1457
	]
},
	"331": {
	name: "Malta",
	id: 331,
	pid: 99,
	rootId: 22,
	level: 2,
	children: [
		1458,
		1459
	]
},
	"332": {
	name: "Groningen",
	id: 332,
	pid: 100,
	rootId: 23,
	level: 2,
	children: [
		1460,
		1461,
		1462
	]
},
	"333": {
	name: "Friesland (NL)",
	id: 333,
	pid: 100,
	rootId: 23,
	level: 2,
	children: [
		1463,
		1464,
		1465
	]
},
	"334": {
	name: "Drenthe",
	id: 334,
	pid: 100,
	rootId: 23,
	level: 2,
	children: [
		1466,
		1467,
		1468
	]
},
	"335": {
	name: "Overijssel",
	id: 335,
	pid: 101,
	rootId: 23,
	level: 2,
	children: [
		1469,
		1470,
		1471
	]
},
	"336": {
	name: "Gelderland",
	id: 336,
	pid: 101,
	rootId: 23,
	level: 2,
	children: [
		1472,
		1473,
		1474,
		1475,
		1964,
		1965
	]
},
	"337": {
	name: "Flevoland",
	id: 337,
	pid: 101,
	rootId: 23,
	level: 2,
	children: [
		1476
	]
},
	"338": {
	name: "Utrecht",
	id: 338,
	pid: 102,
	rootId: 23,
	level: 2,
	children: [
		1477
	]
},
	"339": {
	name: "Noord-Holland",
	id: 339,
	pid: 102,
	rootId: 23,
	level: 2,
	children: [
		1478,
		1479,
		1480,
		1481,
		1482,
		1483,
		1484
	]
},
	"340": {
	name: "Zuid-Holland",
	id: 340,
	pid: 102,
	rootId: 23,
	level: 2,
	children: [
		1485,
		1486,
		1487,
		1488,
		1489,
		1490,
		2063,
		2064,
		2065,
		2066
	]
},
	"341": {
	name: "Zeeland",
	id: 341,
	pid: 102,
	rootId: 23,
	level: 2,
	children: [
		1491,
		1492
	]
},
	"342": {
	name: "Noord-Brabant",
	id: 342,
	pid: 103,
	rootId: 23,
	level: 2,
	children: [
		1493,
		1494,
		1495,
		1496
	]
},
	"343": {
	name: "Limburg (NL)",
	id: 343,
	pid: 103,
	rootId: 23,
	level: 2,
	children: [
		1497,
		1498,
		1499
	]
},
	"344": {
	name: "Oslo og Akershus",
	id: 344,
	pid: 104,
	rootId: 24,
	level: 2,
	children: [
		1500,
		1501
	]
},
	"345": {
	name: "Hedmark og Oppland",
	id: 345,
	pid: 104,
	rootId: 24,
	level: 2,
	children: [
		1502,
		1503,
		2297
	]
},
	"346": {
	name: "Sør-Østlandet",
	id: 346,
	pid: 104,
	rootId: 24,
	level: 2,
	children: [
		1504,
		1505,
		1506,
		1507
	]
},
	"347": {
	name: "Agder og Rogaland",
	id: 347,
	pid: 104,
	rootId: 24,
	level: 2,
	children: [
		1508,
		1509,
		1510
	]
},
	"348": {
	name: "Vestlandet",
	id: 348,
	pid: 104,
	rootId: 24,
	level: 2,
	children: [
		1511,
		1512,
		1513,
		1510,
		2302
	]
},
	"349": {
	name: "Trøndelag",
	id: 349,
	pid: 104,
	rootId: 24,
	level: 2,
	children: [
		1514,
		1515,
		2251
	]
},
	"350": {
	name: "Nord-Norge",
	id: 350,
	pid: 104,
	rootId: 24,
	level: 2,
	children: [
		1516,
		1517,
		1518,
		2298
	]
},
	"351": {
	name: "Łódzkie",
	id: 351,
	pid: 105,
	rootId: 25,
	level: 2,
	children: [
		1519,
		1520,
		1521,
		1966,
		1967,
		1968,
		1969
	]
},
	"352": {
	name: "Mazowieckie",
	id: 352,
	pid: 105,
	rootId: 25,
	level: 2,
	children: [
		1522,
		1523,
		1524,
		1525,
		1526,
		1970,
		1971,
		1972,
		2113,
		2114,
		2115,
		2116
	]
},
	"353": {
	name: "Małopolskie",
	id: 353,
	pid: 106,
	rootId: 25,
	level: 2,
	children: [
		1527,
		1528,
		1529,
		1973,
		1974,
		1975,
		1976,
		2117,
		2118,
		2119
	]
},
	"354": {
	name: "Śląskie",
	id: 354,
	pid: 106,
	rootId: 25,
	level: 2,
	children: [
		1530,
		1531,
		1532,
		1533,
		1977,
		1978,
		1979,
		1980,
		1981
	]
},
	"355": {
	name: "Lubelskie",
	id: 355,
	pid: 107,
	rootId: 25,
	level: 2,
	children: [
		1534,
		1535,
		1536,
		1982,
		1983
	]
},
	"356": {
	name: "Podkarpackie",
	id: 356,
	pid: 107,
	rootId: 25,
	level: 2,
	children: [
		1537,
		1538,
		1984,
		1985,
		1986,
		1987
	]
},
	"357": {
	name: "Świętokrzyskie",
	id: 357,
	pid: 107,
	rootId: 25,
	level: 2,
	children: [
		1539,
		1988,
		1989
	]
},
	"358": {
	name: "Podlaskie",
	id: 358,
	pid: 107,
	rootId: 25,
	level: 2,
	children: [
		1540,
		1541,
		1990,
		1991,
		1992
	]
},
	"359": {
	name: "Wielkopolskie",
	id: 359,
	pid: 108,
	rootId: 25,
	level: 2,
	children: [
		1542,
		1543,
		1544,
		1545,
		1546,
		1993,
		1994,
		1995
	]
},
	"360": {
	name: "Zachodniopomorskie",
	id: 360,
	pid: 108,
	rootId: 25,
	level: 2,
	children: [
		1547,
		1548,
		1996,
		1997,
		1998,
		2120,
		2121,
		2122
	]
},
	"361": {
	name: "Lubuskie",
	id: 361,
	pid: 108,
	rootId: 25,
	level: 2,
	children: [
		1549,
		1550
	]
},
	"362": {
	name: "Dolnośląskie",
	id: 362,
	pid: 109,
	rootId: 25,
	level: 2,
	children: [
		1551,
		1552,
		1553,
		1554,
		1999,
		2000,
		2001,
		2002
	]
},
	"363": {
	name: "Opolskie",
	id: 363,
	pid: 109,
	rootId: 25,
	level: 2,
	children: [
		1555,
		2003,
		2004,
		2123,
		2124
	]
},
	"364": {
	name: "Kujawsko-Pomorskie",
	id: 364,
	pid: 110,
	rootId: 25,
	level: 2,
	children: [
		1556,
		1557,
		2005,
		2006,
		2007,
		2125,
		2126,
		2127,
		2128
	]
},
	"365": {
	name: "Warmińsko-Mazurskie",
	id: 365,
	pid: 110,
	rootId: 25,
	level: 2,
	children: [
		1558,
		1559,
		1560
	]
},
	"366": {
	name: "Pomorskie",
	id: 366,
	pid: 110,
	rootId: 25,
	level: 2,
	children: [
		1561,
		1562,
		1563,
		2008,
		2009,
		2129,
		2130,
		2131
	]
},
	"367": {
	name: "Norte",
	id: 367,
	pid: 111,
	rootId: 26,
	level: 2,
	children: [
		1564,
		1565,
		1566,
		1567,
		1568,
		1569,
		1570,
		1571,
		2132,
		2133,
		2134,
		2135,
		2136,
		2137
	]
},
	"368": {
	name: "Algarve",
	id: 368,
	pid: 111,
	rootId: 26,
	level: 2,
	children: [
		1572
	]
},
	"369": {
	name: "Centro (PT)",
	id: 369,
	pid: 111,
	rootId: 26,
	level: 2,
	children: [
		1573,
		1574,
		1575,
		1576,
		1577,
		1578,
		1579,
		1580,
		1581,
		1582,
		1583,
		1584,
		2138,
		2139,
		2140,
		2141,
		2142,
		2143,
		2144
	]
},
	"370": {
	name: "Área Metropolitana de Lisboa",
	id: 370,
	pid: 111,
	rootId: 26,
	level: 2,
	children: [
		1585,
		1586,
		2145
	]
},
	"371": {
	name: "Alentejo",
	id: 371,
	pid: 111,
	rootId: 26,
	level: 2,
	children: [
		1587,
		1588,
		1589,
		1590,
		1591,
		2146,
		2147
	]
},
	"372": {
	name: "Região Autónoma dos Açores",
	id: 372,
	pid: 112,
	rootId: 26,
	level: 2,
	children: [
		1592
	]
},
	"373": {
	name: "Região Autónoma da Madeira",
	id: 373,
	pid: 113,
	rootId: 26,
	level: 2,
	children: [
		1593
	]
},
	"374": {
	name: "Nord-Vest",
	id: 374,
	pid: 114,
	rootId: 27,
	level: 2,
	children: [
		1594,
		1595,
		1596,
		1597,
		1598,
		1599
	]
},
	"375": {
	name: "Centru",
	id: 375,
	pid: 114,
	rootId: 27,
	level: 2,
	children: [
		1600,
		1601,
		1602,
		1603,
		1604,
		1605
	]
},
	"376": {
	name: "Nord-Est",
	id: 376,
	pid: 115,
	rootId: 27,
	level: 2,
	children: [
		1606,
		1607,
		1608,
		1609,
		1610,
		1611
	]
},
	"377": {
	name: "Sud-Est",
	id: 377,
	pid: 115,
	rootId: 27,
	level: 2,
	children: [
		1612,
		1613,
		1614,
		1615,
		1616,
		1617
	]
},
	"378": {
	name: "Sud - Muntenia",
	id: 378,
	pid: 116,
	rootId: 27,
	level: 2,
	children: [
		1618,
		1619,
		1620,
		1621,
		1622,
		1623,
		1624
	]
},
	"379": {
	name: "Bucureşti - Ilfov",
	id: 379,
	pid: 116,
	rootId: 27,
	level: 2,
	children: [
		1625,
		1626
	]
},
	"380": {
	name: "Sud-Vest Oltenia",
	id: 380,
	pid: 117,
	rootId: 27,
	level: 2,
	children: [
		1627,
		1628,
		1629,
		1630,
		1631
	]
},
	"381": {
	name: "Vest",
	id: 381,
	pid: 117,
	rootId: 27,
	level: 2,
	children: [
		1632,
		1633,
		1634,
		1635
	]
},
	"382": {
	name: "Stockholm",
	id: 382,
	pid: 118,
	rootId: 28,
	level: 2,
	children: [
		1636
	]
},
	"383": {
	name: "Östra Mellansverige",
	id: 383,
	pid: 118,
	rootId: 28,
	level: 2,
	children: [
		1637,
		1638,
		1639,
		1640,
		1641,
		2010,
		2011
	]
},
	"384": {
	name: "Sydsverige",
	id: 384,
	pid: 118,
	rootId: 28,
	level: 2,
	children: [
		1642,
		1643
	]
},
	"385": {
	name: "Norra Mellansverige",
	id: 385,
	pid: 118,
	rootId: 28,
	level: 2,
	children: [
		1644,
		1645,
		1646
	]
},
	"386": {
	name: "Mellersta Norrland",
	id: 386,
	pid: 118,
	rootId: 28,
	level: 2,
	children: [
		1647,
		1648
	]
},
	"387": {
	name: "Övre Norrland",
	id: 387,
	pid: 118,
	rootId: 28,
	level: 2,
	children: [
		1649,
		1650
	]
},
	"388": {
	name: "Småland med öarna",
	id: 388,
	pid: 118,
	rootId: 28,
	level: 2,
	children: [
		1651,
		1652,
		1653,
		1654
	]
},
	"389": {
	name: "Västsverige",
	id: 389,
	pid: 118,
	rootId: 28,
	level: 2,
	children: [
		1655,
		1656
	]
},
	"390": {
	name: "Slovenija",
	id: 390,
	pid: 119,
	rootId: 29,
	level: 2,
	children: [
		1657,
		1658,
		1659,
		1660,
		1661,
		1662,
		1663,
		1664,
		1665,
		1666,
		1667,
		1668
	]
},
	"391": {
	name: "Bratislavský kraj",
	id: 391,
	pid: 120,
	rootId: 30,
	level: 2,
	children: [
		1669
	]
},
	"392": {
	name: "Západné Slovensko",
	id: 392,
	pid: 120,
	rootId: 30,
	level: 2,
	children: [
		1670,
		1671,
		1672
	]
},
	"393": {
	name: "Stredné Slovensko",
	id: 393,
	pid: 120,
	rootId: 30,
	level: 2,
	children: [
		1673,
		1674
	]
},
	"394": {
	name: "Východné Slovensko",
	id: 394,
	pid: 120,
	rootId: 30,
	level: 2,
	children: [
		1675,
		1676
	]
},
	"395": {
	name: "Istanbul",
	id: 395,
	pid: 121,
	rootId: 31,
	level: 2,
	children: [
		1677
	]
},
	"396": {
	name: "Tekirdag, Edirne, Kirklareli",
	id: 396,
	pid: 122,
	rootId: 31,
	level: 2,
	children: [
		1678,
		1679,
		1680
	]
},
	"397": {
	name: "Balikesir, Çanakkale",
	id: 397,
	pid: 122,
	rootId: 31,
	level: 2,
	children: [
		1681,
		1682
	]
},
	"398": {
	name: "İzmir",
	id: 398,
	pid: 123,
	rootId: 31,
	level: 2,
	children: [
		1683
	]
},
	"399": {
	name: "Aydin, Denizli, Mugla",
	id: 399,
	pid: 123,
	rootId: 31,
	level: 2,
	children: [
		1684,
		1685,
		1686
	]
},
	"400": {
	name: "Manisa, Afyonkarahisar, Kütahya, Usak",
	id: 400,
	pid: 123,
	rootId: 31,
	level: 2,
	children: [
		1687,
		1688,
		1689,
		1690
	]
},
	"401": {
	name: "Bursa, Eskisehir, Bilecik",
	id: 401,
	pid: 124,
	rootId: 31,
	level: 2,
	children: [
		1691,
		1692,
		1693
	]
},
	"402": {
	name: "Kocaeli, Sakarya, Düzce, Bolu, Yalova",
	id: 402,
	pid: 124,
	rootId: 31,
	level: 2,
	children: [
		1694,
		1695,
		1696,
		1697,
		1698
	]
},
	"403": {
	name: "Ankara",
	id: 403,
	pid: 125,
	rootId: 31,
	level: 2,
	children: [
		1699
	]
},
	"404": {
	name: "Konya, Karaman",
	id: 404,
	pid: 125,
	rootId: 31,
	level: 2,
	children: [
		1700,
		1701
	]
},
	"405": {
	name: "Antalya, Isparta, Burdur",
	id: 405,
	pid: 126,
	rootId: 31,
	level: 2,
	children: [
		1702,
		1703,
		1704
	]
},
	"406": {
	name: "Adana, Mersin",
	id: 406,
	pid: 126,
	rootId: 31,
	level: 2,
	children: [
		1705,
		1706
	]
},
	"407": {
	name: "Hatay, Kahramanmaras, Osmaniye",
	id: 407,
	pid: 126,
	rootId: 31,
	level: 2,
	children: [
		1707,
		1708,
		1709
	]
},
	"408": {
	name: "Kirikkale, Aksaray, Nigde, Nevsehir, Kirsehir",
	id: 408,
	pid: 127,
	rootId: 31,
	level: 2,
	children: [
		1710,
		1711,
		1712,
		1713,
		1714
	]
},
	"409": {
	name: "Kayseri, Sivas, Yozgat",
	id: 409,
	pid: 127,
	rootId: 31,
	level: 2,
	children: [
		1715,
		1716,
		1717
	]
},
	"410": {
	name: "Zonguldak, Karabük, Bartin",
	id: 410,
	pid: 128,
	rootId: 31,
	level: 2,
	children: [
		1718,
		1719,
		1720
	]
},
	"411": {
	name: "Kastamonu, Çankiri, Sinop",
	id: 411,
	pid: 128,
	rootId: 31,
	level: 2,
	children: [
		1721,
		1722,
		1723
	]
},
	"412": {
	name: "Samsun, Tokat, Çorum, Amasya",
	id: 412,
	pid: 128,
	rootId: 31,
	level: 2,
	children: [
		1724,
		1725,
		1726,
		1727
	]
},
	"413": {
	name: "Trabzon",
	id: 413,
	pid: 129,
	rootId: 31,
	level: 2,
	children: [
		1728,
		1729,
		1730,
		1731,
		1732,
		1733
	]
},
	"414": {
	name: "Erzurum, Erzincan, Bayburt",
	id: 414,
	pid: 130,
	rootId: 31,
	level: 2,
	children: [
		1734,
		1735,
		1736
	]
},
	"415": {
	name: "Agri, Kars, Igdir, Ardahan",
	id: 415,
	pid: 130,
	rootId: 31,
	level: 2,
	children: [
		1737,
		1738,
		1739,
		1740
	]
},
	"416": {
	name: "Malatya, Elazig, Bingöl, Tunceli",
	id: 416,
	pid: 131,
	rootId: 31,
	level: 2,
	children: [
		1741,
		1742,
		1743,
		1744
	]
},
	"417": {
	name: "Van, Mus, Bitlis, Hakkari",
	id: 417,
	pid: 131,
	rootId: 31,
	level: 2,
	children: [
		1745,
		1746,
		1747,
		1748
	]
},
	"418": {
	name: "Gaziantep, Adiyaman, Kilis",
	id: 418,
	pid: 132,
	rootId: 31,
	level: 2,
	children: [
		1749,
		1750,
		1751
	]
},
	"419": {
	name: "Sanliurfa, Diyarbakir",
	id: 419,
	pid: 132,
	rootId: 31,
	level: 2,
	children: [
		1752,
		1753
	]
},
	"420": {
	name: "Mardin, Batman, Sirnak, Siirt",
	id: 420,
	pid: 132,
	rootId: 31,
	level: 2,
	children: [
		1754,
		1755,
		1756,
		1757
	]
},
	"421": {
	name: "Tees Valley and Durham",
	id: 421,
	pid: 133,
	rootId: 32,
	level: 2,
	children: [
		1758,
		1759,
		1760,
		1761
	]
},
	"422": {
	name: "Northumberland and Tyne and Wear",
	id: 422,
	pid: 133,
	rootId: 32,
	level: 2,
	children: [
		1762,
		1763,
		1764
	]
},
	"423": {
	name: "Cumbria",
	id: 423,
	pid: 134,
	rootId: 32,
	level: 2,
	children: [
		1765,
		1766
	]
},
	"424": {
	name: "Cheshire",
	id: 424,
	pid: 134,
	rootId: 32,
	level: 2,
	children: [
		1767,
		1768
	]
},
	"425": {
	name: "Greater Manchester",
	id: 425,
	pid: 134,
	rootId: 32,
	level: 2,
	children: [
		1769,
		1770,
		2153,
		2154,
		2155,
		2156,
		2157
	]
},
	"426": {
	name: "Lancashire",
	id: 426,
	pid: 134,
	rootId: 32,
	level: 2,
	children: [
		1771,
		1772,
		1773,
		2158,
		2159,
		2160,
		2161
	]
},
	"427": {
	name: "Merseyside",
	id: 427,
	pid: 134,
	rootId: 32,
	level: 2,
	children: [
		1774,
		1775,
		1776,
		1777
	]
},
	"428": {
	name: "East Yorkshire and Northern Lincolnshire",
	id: 428,
	pid: 135,
	rootId: 32,
	level: 2,
	children: [
		1778,
		1779,
		1780
	]
},
	"429": {
	name: "North Yorkshire",
	id: 429,
	pid: 135,
	rootId: 32,
	level: 2,
	children: [
		1781,
		1782
	]
},
	"430": {
	name: "South Yorkshire",
	id: 430,
	pid: 135,
	rootId: 32,
	level: 2,
	children: [
		1783,
		1784
	]
},
	"431": {
	name: "West Yorkshire",
	id: 431,
	pid: 135,
	rootId: 32,
	level: 2,
	children: [
		1785,
		1786,
		1787,
		2071,
		2072
	]
},
	"432": {
	name: "Derbyshire and Nottinghamshire",
	id: 432,
	pid: 136,
	rootId: 32,
	level: 2,
	children: [
		1788,
		1789,
		1790,
		1791,
		1792,
		1793
	]
},
	"433": {
	name: "Leicestershire, Rutland and Northamptonshire",
	id: 433,
	pid: 136,
	rootId: 32,
	level: 2,
	children: [
		1794,
		1795,
		1796,
		2073,
		2074
	]
},
	"434": {
	name: "Lincolnshire",
	id: 434,
	pid: 136,
	rootId: 32,
	level: 2,
	children: [
		1797
	]
},
	"435": {
	name: "Herefordshire, Worcestershire and Warwickshire",
	id: 435,
	pid: 137,
	rootId: 32,
	level: 2,
	children: [
		1798,
		1799,
		1800
	]
},
	"436": {
	name: "Shropshire and Staffordshire",
	id: 436,
	pid: 137,
	rootId: 32,
	level: 2,
	children: [
		1801,
		1802,
		1803,
		1804
	]
},
	"437": {
	name: "West Midlands",
	id: 437,
	pid: 137,
	rootId: 32,
	level: 2,
	children: [
		1805,
		1806,
		1807,
		1808,
		1809,
		2075,
		2076,
		2077,
		2078
	]
},
	"438": {
	name: "East Anglia",
	id: 438,
	pid: 138,
	rootId: 32,
	level: 2,
	children: [
		1810,
		1811,
		1812,
		1813,
		2162,
		2163,
		2164
	]
},
	"439": {
	name: "Bedfordshire and Hertfordshire",
	id: 439,
	pid: 138,
	rootId: 32,
	level: 2,
	children: [
		1814,
		1815,
		1816,
		2079,
		2080
	]
},
	"440": {
	name: "Essex",
	id: 440,
	pid: 138,
	rootId: 32,
	level: 2,
	children: [
		1817,
		1818,
		1819,
		2165,
		2166,
		2167,
		2168
	]
},
	"441": {
	name: "Inner London",
	id: 441,
	pid: 139,
	rootId: 32,
	level: 2,
	children: [
		1820,
		1821
	]
},
	"442": {
	name: "Outer London",
	id: 442,
	pid: 139,
	rootId: 32,
	level: 2,
	children: [
		1822,
		1823,
		1824
	]
},
	"443": {
	name: "Berkshire, Buckinghamshire and Oxfordshire",
	id: 443,
	pid: 140,
	rootId: 32,
	level: 2,
	children: [
		1825,
		1826,
		1827,
		1828
	]
},
	"444": {
	name: "Surrey, East and West Sussex",
	id: 444,
	pid: 140,
	rootId: 32,
	level: 2,
	children: [
		1829,
		1830,
		1831,
		1832,
		2190,
		2191,
		2192,
		2193
	]
},
	"445": {
	name: "Hampshire and Isle of Wight",
	id: 445,
	pid: 140,
	rootId: 32,
	level: 2,
	children: [
		1833,
		1834,
		1835,
		1836,
		2194,
		2195,
		2196
	]
},
	"446": {
	name: "Kent",
	id: 446,
	pid: 140,
	rootId: 32,
	level: 2,
	children: [
		1837,
		1838,
		2197,
		2198,
		2199,
		2200
	]
},
	"447": {
	name: "Gloucestershire, Wiltshire and Bristol/Bath area",
	id: 447,
	pid: 141,
	rootId: 32,
	level: 2,
	children: [
		1839,
		1840,
		1841,
		1842,
		1843
	]
},
	"448": {
	name: "Dorset and Somerset",
	id: 448,
	pid: 141,
	rootId: 32,
	level: 2,
	children: [
		1844,
		1845,
		1846
	]
},
	"449": {
	name: "Cornwall and Isles of Scilly",
	id: 449,
	pid: 141,
	rootId: 32,
	level: 2,
	children: [
		1847
	]
},
	"450": {
	name: "Devon",
	id: 450,
	pid: 141,
	rootId: 32,
	level: 2,
	children: [
		1848,
		1849,
		1850
	]
},
	"451": {
	name: "West Wales and The Valleys",
	id: 451,
	pid: 142,
	rootId: 32,
	level: 2,
	children: [
		1851,
		1852,
		1853,
		1854,
		1855,
		1856,
		1857,
		1858
	]
},
	"452": {
	name: "East Wales",
	id: 452,
	pid: 142,
	rootId: 32,
	level: 2,
	children: [
		1859,
		1860,
		1861,
		1862
	]
},
	"453": {
	name: "North Eastern Scotland",
	id: 453,
	pid: 143,
	rootId: 32,
	level: 2,
	children: [
		1863
	]
},
	"454": {
	name: "Eastern Scotland",
	id: 454,
	pid: 143,
	rootId: 32,
	level: 2,
	children: [
		1864,
		1865,
		1866,
		1867,
		1868,
		1869,
		1870,
		1871
	]
},
	"455": {
	name: "South Western Scotland",
	id: 455,
	pid: 143,
	rootId: 32,
	level: 2,
	children: [
		1872,
		1873,
		1874,
		1875,
		1876,
		1877,
		1878,
		1879
	]
},
	"456": {
	name: "Highlands and Islands",
	id: 456,
	pid: 143,
	rootId: 32,
	level: 2,
	children: [
		1880,
		1881,
		1882,
		1883,
		1884,
		1885
	]
},
	"457": {
	name: "Northern Ireland",
	id: 457,
	pid: 144,
	rootId: 32,
	level: 2,
	children: [
		1886,
		1887,
		1888,
		1889,
		1890,
		2278,
		2279,
		2280,
		2281,
		2282,
		2283,
		2284,
		2285,
		2286,
		2287
	]
},
	"458": {
	name: "Mittelburgenland",
	id: 458,
	pid: 145,
	rootId: 0,
	level: 3
},
	"459": {
	name: "Nordburgenland",
	id: 459,
	pid: 145,
	rootId: 0,
	level: 3
},
	"460": {
	name: "Südburgenland",
	id: 460,
	pid: 145,
	rootId: 0,
	level: 3
},
	"461": {
	name: "Mostviertel-Eisenwurzen",
	id: 461,
	pid: 146,
	rootId: 0,
	level: 3
},
	"462": {
	name: "Niederösterreich-Süd",
	id: 462,
	pid: 146,
	rootId: 0,
	level: 3
},
	"463": {
	name: "Sankt Pölten",
	id: 463,
	pid: 146,
	rootId: 0,
	level: 3
},
	"464": {
	name: "Waldviertel",
	id: 464,
	pid: 146,
	rootId: 0,
	level: 3
},
	"465": {
	name: "Weinviertel",
	id: 465,
	pid: 146,
	rootId: 0,
	level: 3
},
	"466": {
	name: "Wiener Umland/Nordteil",
	id: 466,
	pid: 146,
	rootId: 0,
	level: 3
},
	"467": {
	name: "Wiener Umland/Südteil",
	id: 467,
	pid: 146,
	rootId: 0,
	level: 3
},
	"468": {
	name: "Wien",
	id: 468,
	pid: 147,
	rootId: 0,
	level: 3
},
	"469": {
	name: "Klagenfurt-Villach",
	id: 469,
	pid: 148,
	rootId: 0,
	level: 3
},
	"470": {
	name: "Oberkärnten",
	id: 470,
	pid: 148,
	rootId: 0,
	level: 3
},
	"471": {
	name: "Unterkärnten",
	id: 471,
	pid: 148,
	rootId: 0,
	level: 3
},
	"472": {
	name: "Graz",
	id: 472,
	pid: 149,
	rootId: 0,
	level: 3
},
	"473": {
	name: "Liezen",
	id: 473,
	pid: 149,
	rootId: 0,
	level: 3
},
	"474": {
	name: "Östliche Obersteiermark",
	id: 474,
	pid: 149,
	rootId: 0,
	level: 3
},
	"475": {
	name: "Oststeiermark",
	id: 475,
	pid: 149,
	rootId: 0,
	level: 3
},
	"476": {
	name: "West- und Südsteiermark",
	id: 476,
	pid: 149,
	rootId: 0,
	level: 3
},
	"477": {
	name: "Westliche Obersteiermark",
	id: 477,
	pid: 149,
	rootId: 0,
	level: 3
},
	"478": {
	name: "Innviertel",
	id: 478,
	pid: 150,
	rootId: 0,
	level: 3
},
	"479": {
	name: "Linz-Wels",
	id: 479,
	pid: 150,
	rootId: 0,
	level: 3
},
	"480": {
	name: "Mühlviertel",
	id: 480,
	pid: 150,
	rootId: 0,
	level: 3
},
	"481": {
	name: "Steyr-Kirchdorf",
	id: 481,
	pid: 150,
	rootId: 0,
	level: 3
},
	"482": {
	name: "Traunviertel",
	id: 482,
	pid: 150,
	rootId: 0,
	level: 3
},
	"483": {
	name: "Lungau",
	id: 483,
	pid: 151,
	rootId: 0,
	level: 3
},
	"484": {
	name: "Pinzgau-Pongau",
	id: 484,
	pid: 151,
	rootId: 0,
	level: 3
},
	"485": {
	name: "Salzburg und Umgebung",
	id: 485,
	pid: 151,
	rootId: 0,
	level: 3
},
	"486": {
	name: "Außerfern",
	id: 486,
	pid: 152,
	rootId: 0,
	level: 3
},
	"487": {
	name: "Innsbruck",
	id: 487,
	pid: 152,
	rootId: 0,
	level: 3
},
	"488": {
	name: "Osttirol",
	id: 488,
	pid: 152,
	rootId: 0,
	level: 3
},
	"489": {
	name: "Tiroler Oberland",
	id: 489,
	pid: 152,
	rootId: 0,
	level: 3
},
	"490": {
	name: "Tiroler Unterland",
	id: 490,
	pid: 152,
	rootId: 0,
	level: 3
},
	"491": {
	name: "Bludenz-Bregenzer Wald",
	id: 491,
	pid: 153,
	rootId: 0,
	level: 3
},
	"492": {
	name: "Rheintal-Bodenseegebiet",
	id: 492,
	pid: 153,
	rootId: 0,
	level: 3
},
	"493": {
	name: "Arr. de Bruxelles-Capitale / Arr. van Brussel-Hoofdstad",
	id: 493,
	pid: 154,
	rootId: 1,
	level: 3
},
	"494": {
	name: "Arr. Antwerpen",
	id: 494,
	pid: 155,
	rootId: 1,
	level: 3
},
	"495": {
	name: "Arr. Mechelen",
	id: 495,
	pid: 155,
	rootId: 1,
	level: 3
},
	"496": {
	name: "Arr. Turnhout",
	id: 496,
	pid: 155,
	rootId: 1,
	level: 3
},
	"497": {
	name: "Arr. Hasselt",
	id: 497,
	pid: 156,
	rootId: 1,
	level: 3
},
	"498": {
	name: "Arr. Maaseik",
	id: 498,
	pid: 156,
	rootId: 1,
	level: 3
},
	"499": {
	name: "Arr. Tongeren",
	id: 499,
	pid: 156,
	rootId: 1,
	level: 3
},
	"500": {
	name: "Arr. Aalst",
	id: 500,
	pid: 157,
	rootId: 1,
	level: 3
},
	"501": {
	name: "Arr. Dendermonde",
	id: 501,
	pid: 157,
	rootId: 1,
	level: 3
},
	"502": {
	name: "Arr. Eeklo",
	id: 502,
	pid: 157,
	rootId: 1,
	level: 3
},
	"503": {
	name: "Arr. Gent",
	id: 503,
	pid: 157,
	rootId: 1,
	level: 3
},
	"504": {
	name: "Arr. Oudenaarde",
	id: 504,
	pid: 157,
	rootId: 1,
	level: 3
},
	"505": {
	name: "Arr. Sint-Niklaas",
	id: 505,
	pid: 157,
	rootId: 1,
	level: 3
},
	"506": {
	name: "Arr. Halle-Vilvoorde",
	id: 506,
	pid: 158,
	rootId: 1,
	level: 3
},
	"507": {
	name: "Arr. Leuven",
	id: 507,
	pid: 158,
	rootId: 1,
	level: 3
},
	"508": {
	name: "Arr. Brugge",
	id: 508,
	pid: 159,
	rootId: 1,
	level: 3
},
	"509": {
	name: "Arr. Diksmuide",
	id: 509,
	pid: 159,
	rootId: 1,
	level: 3
},
	"510": {
	name: "Arr. Ieper",
	id: 510,
	pid: 159,
	rootId: 1,
	level: 3
},
	"511": {
	name: "Arr. Kortrijk",
	id: 511,
	pid: 159,
	rootId: 1,
	level: 3
},
	"512": {
	name: "Arr. Oostende",
	id: 512,
	pid: 159,
	rootId: 1,
	level: 3
},
	"513": {
	name: "Arr. Roeselare",
	id: 513,
	pid: 159,
	rootId: 1,
	level: 3
},
	"514": {
	name: "Arr. Tielt",
	id: 514,
	pid: 159,
	rootId: 1,
	level: 3
},
	"515": {
	name: "Arr. Veurne",
	id: 515,
	pid: 159,
	rootId: 1,
	level: 3
},
	"516": {
	name: "Arr. Nivelles",
	id: 516,
	pid: 160,
	rootId: 1,
	level: 3
},
	"517": {
	name: "Arr. Ath",
	id: 517,
	pid: 161,
	rootId: 1,
	level: 3
},
	"518": {
	name: "Arr. Charleroi",
	id: 518,
	pid: 161,
	rootId: 1,
	level: 3
},
	"519": {
	name: "Arr. Mons",
	id: 519,
	pid: 161,
	rootId: 1,
	level: 3
},
	"520": {
	name: "Arr. Mouscron",
	id: 520,
	pid: 161,
	rootId: 1,
	level: 3
},
	"521": {
	name: "Arr. Soignies",
	id: 521,
	pid: 161,
	rootId: 1,
	level: 3
},
	"522": {
	name: "Arr. Thuin",
	id: 522,
	pid: 161,
	rootId: 1,
	level: 3
},
	"523": {
	name: "Arr. Tournai",
	id: 523,
	pid: 161,
	rootId: 1,
	level: 3
},
	"524": {
	name: "Arr. Huy",
	id: 524,
	pid: 162,
	rootId: 1,
	level: 3
},
	"525": {
	name: "Arr. Liège",
	id: 525,
	pid: 162,
	rootId: 1,
	level: 3
},
	"526": {
	name: "Arr. Verviers",
	id: 526,
	pid: 162,
	rootId: 1,
	level: 3
},
	"527": {
	name: "Arr. Waremme",
	id: 527,
	pid: 162,
	rootId: 1,
	level: 3
},
	"528": {
	name: "Arr. Arlon",
	id: 528,
	pid: 163,
	rootId: 1,
	level: 3
},
	"529": {
	name: "Arr. Bastogne",
	id: 529,
	pid: 163,
	rootId: 1,
	level: 3
},
	"530": {
	name: "Arr. Marche-en-Famenne",
	id: 530,
	pid: 163,
	rootId: 1,
	level: 3
},
	"531": {
	name: "Arr. Neufchâteau",
	id: 531,
	pid: 163,
	rootId: 1,
	level: 3
},
	"532": {
	name: "Arr. Virton",
	id: 532,
	pid: 163,
	rootId: 1,
	level: 3
},
	"533": {
	name: "Arr. Dinant",
	id: 533,
	pid: 164,
	rootId: 1,
	level: 3
},
	"534": {
	name: "Arr. Namur",
	id: 534,
	pid: 164,
	rootId: 1,
	level: 3
},
	"535": {
	name: "Arr. Philippeville",
	id: 535,
	pid: 164,
	rootId: 1,
	level: 3
},
	"536": {
	name: "Vidin",
	id: 536,
	pid: 165,
	rootId: 2,
	level: 3
},
	"537": {
	name: "Montana",
	id: 537,
	pid: 165,
	rootId: 2,
	level: 3
},
	"538": {
	name: "Vratsa",
	id: 538,
	pid: 165,
	rootId: 2,
	level: 3
},
	"539": {
	name: "Pleven",
	id: 539,
	pid: 165,
	rootId: 2,
	level: 3
},
	"540": {
	name: "Lovech",
	id: 540,
	pid: 165,
	rootId: 2,
	level: 3
},
	"541": {
	name: "Veliko Tarnovo",
	id: 541,
	pid: 166,
	rootId: 2,
	level: 3
},
	"542": {
	name: "Gabrovo",
	id: 542,
	pid: 166,
	rootId: 2,
	level: 3
},
	"543": {
	name: "Ruse",
	id: 543,
	pid: 166,
	rootId: 2,
	level: 3
},
	"544": {
	name: "Razgrad",
	id: 544,
	pid: 166,
	rootId: 2,
	level: 3
},
	"545": {
	name: "Silistra",
	id: 545,
	pid: 166,
	rootId: 2,
	level: 3
},
	"546": {
	name: "Varna",
	id: 546,
	pid: 167,
	rootId: 2,
	level: 3
},
	"547": {
	name: "Dobrich",
	id: 547,
	pid: 167,
	rootId: 2,
	level: 3
},
	"548": {
	name: "Shumen",
	id: 548,
	pid: 167,
	rootId: 2,
	level: 3
},
	"549": {
	name: "Targovishte",
	id: 549,
	pid: 167,
	rootId: 2,
	level: 3
},
	"550": {
	name: "Burgas",
	id: 550,
	pid: 168,
	rootId: 2,
	level: 3
},
	"551": {
	name: "Sliven",
	id: 551,
	pid: 168,
	rootId: 2,
	level: 3
},
	"552": {
	name: "Yambol",
	id: 552,
	pid: 168,
	rootId: 2,
	level: 3
},
	"553": {
	name: "Stara Zagora",
	id: 553,
	pid: 168,
	rootId: 2,
	level: 3
},
	"554": {
	name: "Sofia (stolitsa)",
	id: 554,
	pid: 169,
	rootId: 2,
	level: 3
},
	"555": {
	name: "Sofia",
	id: 555,
	pid: 169,
	rootId: 2,
	level: 3
},
	"556": {
	name: "Blagoevgrad",
	id: 556,
	pid: 169,
	rootId: 2,
	level: 3
},
	"557": {
	name: "Pernik",
	id: 557,
	pid: 169,
	rootId: 2,
	level: 3
},
	"558": {
	name: "Kyustendil",
	id: 558,
	pid: 169,
	rootId: 2,
	level: 3
},
	"559": {
	name: "Plovdiv",
	id: 559,
	pid: 170,
	rootId: 2,
	level: 3
},
	"560": {
	name: "Haskovo",
	id: 560,
	pid: 170,
	rootId: 2,
	level: 3
},
	"561": {
	name: "Pazardzhik",
	id: 561,
	pid: 170,
	rootId: 2,
	level: 3
},
	"562": {
	name: "Smolyan",
	id: 562,
	pid: 170,
	rootId: 2,
	level: 3
},
	"563": {
	name: "Kardzhali",
	id: 563,
	pid: 170,
	rootId: 2,
	level: 3
},
	"564": {
	name: "Vaud",
	id: 564,
	pid: 171,
	rootId: 3,
	level: 3
},
	"565": {
	name: "Valais",
	id: 565,
	pid: 171,
	rootId: 3,
	level: 3
},
	"566": {
	name: "Genève",
	id: 566,
	pid: 171,
	rootId: 3,
	level: 3
},
	"567": {
	name: "Bern",
	id: 567,
	pid: 172,
	rootId: 3,
	level: 3
},
	"568": {
	name: "Freiburg",
	id: 568,
	pid: 172,
	rootId: 3,
	level: 3
},
	"569": {
	name: "Solothurn",
	id: 569,
	pid: 172,
	rootId: 3,
	level: 3
},
	"570": {
	name: "Neuchâtel",
	id: 570,
	pid: 172,
	rootId: 3,
	level: 3
},
	"571": {
	name: "Jura",
	id: 571,
	pid: 172,
	rootId: 3,
	level: 3
},
	"572": {
	name: "Basel-Stadt",
	id: 572,
	pid: 173,
	rootId: 3,
	level: 3
},
	"573": {
	name: "Basel-Landschaft",
	id: 573,
	pid: 173,
	rootId: 3,
	level: 3
},
	"574": {
	name: "Aargau",
	id: 574,
	pid: 173,
	rootId: 3,
	level: 3
},
	"575": {
	name: "Zürich",
	id: 575,
	pid: 174,
	rootId: 3,
	level: 3
},
	"576": {
	name: "Glarus",
	id: 576,
	pid: 175,
	rootId: 3,
	level: 3
},
	"577": {
	name: "Schaffhausen",
	id: 577,
	pid: 175,
	rootId: 3,
	level: 3
},
	"578": {
	name: "Appenzell Ausserrhoden",
	id: 578,
	pid: 175,
	rootId: 3,
	level: 3
},
	"579": {
	name: "Appenzell Innerrhoden",
	id: 579,
	pid: 175,
	rootId: 3,
	level: 3
},
	"580": {
	name: "St. Gallen",
	id: 580,
	pid: 175,
	rootId: 3,
	level: 3
},
	"581": {
	name: "Graubünden",
	id: 581,
	pid: 175,
	rootId: 3,
	level: 3
},
	"582": {
	name: "Thurgau",
	id: 582,
	pid: 175,
	rootId: 3,
	level: 3
},
	"583": {
	name: "Luzern",
	id: 583,
	pid: 176,
	rootId: 3,
	level: 3
},
	"584": {
	name: "Uri",
	id: 584,
	pid: 176,
	rootId: 3,
	level: 3
},
	"585": {
	name: "Schwyz",
	id: 585,
	pid: 176,
	rootId: 3,
	level: 3
},
	"586": {
	name: "Obwalden",
	id: 586,
	pid: 176,
	rootId: 3,
	level: 3
},
	"587": {
	name: "Nidwalden",
	id: 587,
	pid: 176,
	rootId: 3,
	level: 3
},
	"588": {
	name: "Zug",
	id: 588,
	pid: 176,
	rootId: 3,
	level: 3
},
	"589": {
	name: "Ticino",
	id: 589,
	pid: 177,
	rootId: 3,
	level: 3
},
	"590": {
	name: "Kýpros",
	id: 590,
	pid: 178,
	rootId: 4,
	level: 3
},
	"591": {
	name: "Hlavní město Praha",
	id: 591,
	pid: 179,
	rootId: 5,
	level: 3
},
	"592": {
	name: "Středočeský kraj",
	id: 592,
	pid: 180,
	rootId: 5,
	level: 3
},
	"593": {
	name: "Jihočeský kraj",
	id: 593,
	pid: 181,
	rootId: 5,
	level: 3
},
	"594": {
	name: "Plzeňský kraj",
	id: 594,
	pid: 181,
	rootId: 5,
	level: 3
},
	"595": {
	name: "Karlovarský kraj",
	id: 595,
	pid: 182,
	rootId: 5,
	level: 3
},
	"596": {
	name: "Ústecký kraj",
	id: 596,
	pid: 182,
	rootId: 5,
	level: 3
},
	"597": {
	name: "Liberecký kraj",
	id: 597,
	pid: 183,
	rootId: 5,
	level: 3
},
	"598": {
	name: "Královéhradecký kraj",
	id: 598,
	pid: 183,
	rootId: 5,
	level: 3
},
	"599": {
	name: "Pardubický kraj",
	id: 599,
	pid: 183,
	rootId: 5,
	level: 3
},
	"600": {
	name: "Vysočina",
	id: 600,
	pid: 184,
	rootId: 5,
	level: 3
},
	"601": {
	name: "Jihomoravský kraj",
	id: 601,
	pid: 184,
	rootId: 5,
	level: 3
},
	"602": {
	name: "Olomoucký kraj",
	id: 602,
	pid: 185,
	rootId: 5,
	level: 3
},
	"603": {
	name: "Zlínský kraj",
	id: 603,
	pid: 185,
	rootId: 5,
	level: 3
},
	"604": {
	name: "Moravskoslezský kraj",
	id: 604,
	pid: 186,
	rootId: 5,
	level: 3
},
	"605": {
	name: "Stuttgart, Stadtkreis",
	id: 605,
	pid: 187,
	rootId: 6,
	level: 3
},
	"606": {
	name: "Böblingen",
	id: 606,
	pid: 187,
	rootId: 6,
	level: 3
},
	"607": {
	name: "Esslingen",
	id: 607,
	pid: 187,
	rootId: 6,
	level: 3
},
	"608": {
	name: "Göppingen",
	id: 608,
	pid: 187,
	rootId: 6,
	level: 3
},
	"609": {
	name: "Ludwigsburg",
	id: 609,
	pid: 187,
	rootId: 6,
	level: 3
},
	"610": {
	name: "Rems-Murr-Kreis",
	id: 610,
	pid: 187,
	rootId: 6,
	level: 3
},
	"611": {
	name: "Heilbronn, Stadtkreis",
	id: 611,
	pid: 187,
	rootId: 6,
	level: 3
},
	"612": {
	name: "Heilbronn, Landkreis",
	id: 612,
	pid: 187,
	rootId: 6,
	level: 3
},
	"613": {
	name: "Hohenlohekreis",
	id: 613,
	pid: 187,
	rootId: 6,
	level: 3
},
	"614": {
	name: "Schwäbisch Hall",
	id: 614,
	pid: 187,
	rootId: 6,
	level: 3
},
	"615": {
	name: "Main-Tauber-Kreis",
	id: 615,
	pid: 187,
	rootId: 6,
	level: 3
},
	"616": {
	name: "Heidenheim",
	id: 616,
	pid: 187,
	rootId: 6,
	level: 3
},
	"617": {
	name: "Ostalbkreis",
	id: 617,
	pid: 187,
	rootId: 6,
	level: 3
},
	"618": {
	name: "Baden-Baden, Stadtkreis",
	id: 618,
	pid: 188,
	rootId: 6,
	level: 3
},
	"619": {
	name: "Karlsruhe, Stadtkreis",
	id: 619,
	pid: 188,
	rootId: 6,
	level: 3
},
	"620": {
	name: "Karlsruhe, Landkreis",
	id: 620,
	pid: 188,
	rootId: 6,
	level: 3
},
	"621": {
	name: "Rastatt",
	id: 621,
	pid: 188,
	rootId: 6,
	level: 3
},
	"622": {
	name: "Heidelberg, Stadtkreis",
	id: 622,
	pid: 188,
	rootId: 6,
	level: 3
},
	"623": {
	name: "Mannheim, Stadtkreis",
	id: 623,
	pid: 188,
	rootId: 6,
	level: 3
},
	"624": {
	name: "Neckar-Odenwald-Kreis",
	id: 624,
	pid: 188,
	rootId: 6,
	level: 3
},
	"625": {
	name: "Rhein-Neckar-Kreis",
	id: 625,
	pid: 188,
	rootId: 6,
	level: 3
},
	"626": {
	name: "Pforzheim, Stadtkreis",
	id: 626,
	pid: 188,
	rootId: 6,
	level: 3
},
	"627": {
	name: "Calw",
	id: 627,
	pid: 188,
	rootId: 6,
	level: 3
},
	"628": {
	name: "Enzkreis",
	id: 628,
	pid: 188,
	rootId: 6,
	level: 3
},
	"629": {
	name: "Freudenstadt",
	id: 629,
	pid: 188,
	rootId: 6,
	level: 3
},
	"630": {
	name: "Freiburg im Breisgau, Stadtkreis",
	id: 630,
	pid: 189,
	rootId: 6,
	level: 3
},
	"631": {
	name: "Breisgau-Hochschwarzwald",
	id: 631,
	pid: 189,
	rootId: 6,
	level: 3
},
	"632": {
	name: "Emmendingen",
	id: 632,
	pid: 189,
	rootId: 6,
	level: 3
},
	"633": {
	name: "Ortenaukreis",
	id: 633,
	pid: 189,
	rootId: 6,
	level: 3
},
	"634": {
	name: "Rottweil",
	id: 634,
	pid: 189,
	rootId: 6,
	level: 3
},
	"635": {
	name: "Schwarzwald-Baar-Kreis",
	id: 635,
	pid: 189,
	rootId: 6,
	level: 3
},
	"636": {
	name: "Tuttlingen",
	id: 636,
	pid: 189,
	rootId: 6,
	level: 3
},
	"637": {
	name: "Konstanz",
	id: 637,
	pid: 189,
	rootId: 6,
	level: 3
},
	"638": {
	name: "Lörrach",
	id: 638,
	pid: 189,
	rootId: 6,
	level: 3
},
	"639": {
	name: "Waldshut",
	id: 639,
	pid: 189,
	rootId: 6,
	level: 3
},
	"640": {
	name: "Reutlingen",
	id: 640,
	pid: 190,
	rootId: 6,
	level: 3
},
	"641": {
	name: "Tübingen, Landkreis",
	id: 641,
	pid: 190,
	rootId: 6,
	level: 3
},
	"642": {
	name: "Zollernalbkreis",
	id: 642,
	pid: 190,
	rootId: 6,
	level: 3
},
	"643": {
	name: "Ulm, Stadtkreis",
	id: 643,
	pid: 190,
	rootId: 6,
	level: 3
},
	"644": {
	name: "Alb-Donau-Kreis",
	id: 644,
	pid: 190,
	rootId: 6,
	level: 3
},
	"645": {
	name: "Biberach",
	id: 645,
	pid: 190,
	rootId: 6,
	level: 3
},
	"646": {
	name: "Bodenseekreis",
	id: 646,
	pid: 190,
	rootId: 6,
	level: 3
},
	"647": {
	name: "Ravensburg",
	id: 647,
	pid: 190,
	rootId: 6,
	level: 3
},
	"648": {
	name: "Sigmaringen",
	id: 648,
	pid: 190,
	rootId: 6,
	level: 3
},
	"649": {
	name: "Ingolstadt, Kreisfreie Stadt",
	id: 649,
	pid: 191,
	rootId: 6,
	level: 3
},
	"650": {
	name: "München, Kreisfreie Stadt",
	id: 650,
	pid: 191,
	rootId: 6,
	level: 3
},
	"651": {
	name: "Rosenheim, Kreisfreie Stadt",
	id: 651,
	pid: 191,
	rootId: 6,
	level: 3
},
	"652": {
	name: "Altötting",
	id: 652,
	pid: 191,
	rootId: 6,
	level: 3
},
	"653": {
	name: "Berchtesgadener Land",
	id: 653,
	pid: 191,
	rootId: 6,
	level: 3
},
	"654": {
	name: "Bad Tölz-Wolfratshausen",
	id: 654,
	pid: 191,
	rootId: 6,
	level: 3
},
	"655": {
	name: "Dachau",
	id: 655,
	pid: 191,
	rootId: 6,
	level: 3
},
	"656": {
	name: "Ebersberg",
	id: 656,
	pid: 191,
	rootId: 6,
	level: 3
},
	"657": {
	name: "Eichstätt",
	id: 657,
	pid: 191,
	rootId: 6,
	level: 3
},
	"658": {
	name: "Erding",
	id: 658,
	pid: 191,
	rootId: 6,
	level: 3
},
	"659": {
	name: "Freising",
	id: 659,
	pid: 191,
	rootId: 6,
	level: 3
},
	"660": {
	name: "Fürstenfeldbruck",
	id: 660,
	pid: 191,
	rootId: 6,
	level: 3
},
	"661": {
	name: "Garmisch-Partenkirchen",
	id: 661,
	pid: 191,
	rootId: 6,
	level: 3
},
	"662": {
	name: "Landsberg am Lech",
	id: 662,
	pid: 191,
	rootId: 6,
	level: 3
},
	"663": {
	name: "Miesbach",
	id: 663,
	pid: 191,
	rootId: 6,
	level: 3
},
	"664": {
	name: "Mühldorf a. Inn",
	id: 664,
	pid: 191,
	rootId: 6,
	level: 3
},
	"665": {
	name: "München, Landkreis",
	id: 665,
	pid: 191,
	rootId: 6,
	level: 3
},
	"666": {
	name: "Neuburg-Schrobenhausen",
	id: 666,
	pid: 191,
	rootId: 6,
	level: 3
},
	"667": {
	name: "Pfaffenhofen a. d. Ilm",
	id: 667,
	pid: 191,
	rootId: 6,
	level: 3
},
	"668": {
	name: "Rosenheim, Landkreis",
	id: 668,
	pid: 191,
	rootId: 6,
	level: 3
},
	"669": {
	name: "Starnberg",
	id: 669,
	pid: 191,
	rootId: 6,
	level: 3
},
	"670": {
	name: "Traunstein",
	id: 670,
	pid: 191,
	rootId: 6,
	level: 3
},
	"671": {
	name: "Weilheim-Schongau",
	id: 671,
	pid: 191,
	rootId: 6,
	level: 3
},
	"672": {
	name: "Landshut, Kreisfreie Stadt",
	id: 672,
	pid: 192,
	rootId: 6,
	level: 3
},
	"673": {
	name: "Passau, Kreisfreie Stadt",
	id: 673,
	pid: 192,
	rootId: 6,
	level: 3
},
	"674": {
	name: "Straubing, Kreisfreie Stadt",
	id: 674,
	pid: 192,
	rootId: 6,
	level: 3
},
	"675": {
	name: "Deggendorf",
	id: 675,
	pid: 192,
	rootId: 6,
	level: 3
},
	"676": {
	name: "Freyung-Grafenau",
	id: 676,
	pid: 192,
	rootId: 6,
	level: 3
},
	"677": {
	name: "Kelheim",
	id: 677,
	pid: 192,
	rootId: 6,
	level: 3
},
	"678": {
	name: "Landshut, Landkreis",
	id: 678,
	pid: 192,
	rootId: 6,
	level: 3
},
	"679": {
	name: "Passau, Landkreis",
	id: 679,
	pid: 192,
	rootId: 6,
	level: 3
},
	"680": {
	name: "Regen",
	id: 680,
	pid: 192,
	rootId: 6,
	level: 3
},
	"681": {
	name: "Rottal-Inn",
	id: 681,
	pid: 192,
	rootId: 6,
	level: 3
},
	"682": {
	name: "Straubing-Bogen",
	id: 682,
	pid: 192,
	rootId: 6,
	level: 3
},
	"683": {
	name: "Dingolfing-Landau",
	id: 683,
	pid: 192,
	rootId: 6,
	level: 3
},
	"684": {
	name: "Amberg, Kreisfreie Stadt",
	id: 684,
	pid: 193,
	rootId: 6,
	level: 3
},
	"685": {
	name: "Regensburg, Kreisfreie Stadt",
	id: 685,
	pid: 193,
	rootId: 6,
	level: 3
},
	"686": {
	name: "Weiden i. d. Opf, Kreisfreie Stadt",
	id: 686,
	pid: 193,
	rootId: 6,
	level: 3
},
	"687": {
	name: "Amberg-Sulzbach",
	id: 687,
	pid: 193,
	rootId: 6,
	level: 3
},
	"688": {
	name: "Cham",
	id: 688,
	pid: 193,
	rootId: 6,
	level: 3
},
	"689": {
	name: "Neumarkt i. d. OPf.",
	id: 689,
	pid: 193,
	rootId: 6,
	level: 3
},
	"690": {
	name: "Neustadt a. d. Waldnaab",
	id: 690,
	pid: 193,
	rootId: 6,
	level: 3
},
	"691": {
	name: "Regensburg, Landkreis",
	id: 691,
	pid: 193,
	rootId: 6,
	level: 3
},
	"692": {
	name: "Schwandorf",
	id: 692,
	pid: 193,
	rootId: 6,
	level: 3
},
	"693": {
	name: "Tirschenreuth",
	id: 693,
	pid: 193,
	rootId: 6,
	level: 3
},
	"694": {
	name: "Bamberg, Kreisfreie Stadt",
	id: 694,
	pid: 194,
	rootId: 6,
	level: 3
},
	"695": {
	name: "Bayreuth, Kreisfreie Stadt",
	id: 695,
	pid: 194,
	rootId: 6,
	level: 3
},
	"696": {
	name: "Coburg, Kreisfreie Stadt",
	id: 696,
	pid: 194,
	rootId: 6,
	level: 3
},
	"697": {
	name: "Hof, Kreisfreie Stadt",
	id: 697,
	pid: 194,
	rootId: 6,
	level: 3
},
	"698": {
	name: "Bamberg, Landkreis",
	id: 698,
	pid: 194,
	rootId: 6,
	level: 3
},
	"699": {
	name: "Bayreuth, Landkreis",
	id: 699,
	pid: 194,
	rootId: 6,
	level: 3
},
	"700": {
	name: "Coburg, Landkreis",
	id: 700,
	pid: 194,
	rootId: 6,
	level: 3
},
	"701": {
	name: "Forchheim",
	id: 701,
	pid: 194,
	rootId: 6,
	level: 3
},
	"702": {
	name: "Hof, Landkreis",
	id: 702,
	pid: 194,
	rootId: 6,
	level: 3
},
	"703": {
	name: "Kronach",
	id: 703,
	pid: 194,
	rootId: 6,
	level: 3
},
	"704": {
	name: "Kulmbach",
	id: 704,
	pid: 194,
	rootId: 6,
	level: 3
},
	"705": {
	name: "Lichtenfels",
	id: 705,
	pid: 194,
	rootId: 6,
	level: 3
},
	"706": {
	name: "Wunsiedel i. Fichtelgebirge",
	id: 706,
	pid: 194,
	rootId: 6,
	level: 3
},
	"707": {
	name: "Ansbach, Kreisfreie Stadt",
	id: 707,
	pid: 195,
	rootId: 6,
	level: 3
},
	"708": {
	name: "Erlangen, Kreisfreie Stadt",
	id: 708,
	pid: 195,
	rootId: 6,
	level: 3
},
	"709": {
	name: "Fürth, Kreisfreie Stadt",
	id: 709,
	pid: 195,
	rootId: 6,
	level: 3
},
	"710": {
	name: "Nürnberg, Kreisfreie Stadt",
	id: 710,
	pid: 195,
	rootId: 6,
	level: 3
},
	"711": {
	name: "Schwabach, Kreisfreie Stadt",
	id: 711,
	pid: 195,
	rootId: 6,
	level: 3
},
	"712": {
	name: "Ansbach, Landkreis",
	id: 712,
	pid: 195,
	rootId: 6,
	level: 3
},
	"713": {
	name: "Erlangen-Höchstadt",
	id: 713,
	pid: 195,
	rootId: 6,
	level: 3
},
	"714": {
	name: "Fürth, Landkreis",
	id: 714,
	pid: 195,
	rootId: 6,
	level: 3
},
	"715": {
	name: "Nürnberger Land",
	id: 715,
	pid: 195,
	rootId: 6,
	level: 3
},
	"716": {
	name: "Neustadt a. d. Aisch-Bad Windsheim",
	id: 716,
	pid: 195,
	rootId: 6,
	level: 3
},
	"717": {
	name: "Roth",
	id: 717,
	pid: 195,
	rootId: 6,
	level: 3
},
	"718": {
	name: "Weißenburg-Gunzenhausen",
	id: 718,
	pid: 195,
	rootId: 6,
	level: 3
},
	"719": {
	name: "Aschaffenburg, Kreisfreie Stadt",
	id: 719,
	pid: 196,
	rootId: 6,
	level: 3
},
	"720": {
	name: "Schweinfurt, Kreisfreie Stadt",
	id: 720,
	pid: 196,
	rootId: 6,
	level: 3
},
	"721": {
	name: "Würzburg, Kreisfreie Stadt",
	id: 721,
	pid: 196,
	rootId: 6,
	level: 3
},
	"722": {
	name: "Aschaffenburg, Landkreis",
	id: 722,
	pid: 196,
	rootId: 6,
	level: 3
},
	"723": {
	name: "Bad Kissingen",
	id: 723,
	pid: 196,
	rootId: 6,
	level: 3
},
	"724": {
	name: "Rhön-Grabfeld",
	id: 724,
	pid: 196,
	rootId: 6,
	level: 3
},
	"725": {
	name: "Haßberge",
	id: 725,
	pid: 196,
	rootId: 6,
	level: 3
},
	"726": {
	name: "Kitzingen",
	id: 726,
	pid: 196,
	rootId: 6,
	level: 3
},
	"727": {
	name: "Miltenberg",
	id: 727,
	pid: 196,
	rootId: 6,
	level: 3
},
	"728": {
	name: "Main-Spessart",
	id: 728,
	pid: 196,
	rootId: 6,
	level: 3
},
	"729": {
	name: "Schweinfurt, Landkreis",
	id: 729,
	pid: 196,
	rootId: 6,
	level: 3
},
	"730": {
	name: "Würzburg, Landkreis",
	id: 730,
	pid: 196,
	rootId: 6,
	level: 3
},
	"731": {
	name: "Augsburg, Kreisfreie Stadt",
	id: 731,
	pid: 197,
	rootId: 6,
	level: 3
},
	"732": {
	name: "Kaufbeuren, Kreisfreie Stadt",
	id: 732,
	pid: 197,
	rootId: 6,
	level: 3
},
	"733": {
	name: "Kempten (Allgäu), Kreisfreie Stadt",
	id: 733,
	pid: 197,
	rootId: 6,
	level: 3
},
	"734": {
	name: "Memmingen, Kreisfreie Stadt",
	id: 734,
	pid: 197,
	rootId: 6,
	level: 3
},
	"735": {
	name: "Aichach-Friedberg",
	id: 735,
	pid: 197,
	rootId: 6,
	level: 3
},
	"736": {
	name: "Augsburg, Landkreis",
	id: 736,
	pid: 197,
	rootId: 6,
	level: 3
},
	"737": {
	name: "Dillingen a.d. Donau",
	id: 737,
	pid: 197,
	rootId: 6,
	level: 3
},
	"738": {
	name: "Günzburg",
	id: 738,
	pid: 197,
	rootId: 6,
	level: 3
},
	"739": {
	name: "Neu-Ulm",
	id: 739,
	pid: 197,
	rootId: 6,
	level: 3
},
	"740": {
	name: "Lindau (Bodensee)",
	id: 740,
	pid: 197,
	rootId: 6,
	level: 3
},
	"741": {
	name: "Ostallgäu",
	id: 741,
	pid: 197,
	rootId: 6,
	level: 3
},
	"742": {
	name: "Unterallgäu",
	id: 742,
	pid: 197,
	rootId: 6,
	level: 3
},
	"743": {
	name: "Donau-Ries",
	id: 743,
	pid: 197,
	rootId: 6,
	level: 3
},
	"744": {
	name: "Oberallgäu",
	id: 744,
	pid: 197,
	rootId: 6,
	level: 3
},
	"745": {
	name: "Berlin",
	id: 745,
	pid: 198,
	rootId: 6,
	level: 3
},
	"746": {
	name: "Frankfurt (Oder), Kreisfreie Stadt",
	id: 746,
	pid: 199,
	rootId: 6,
	level: 3
},
	"747": {
	name: "Barnim",
	id: 747,
	pid: 199,
	rootId: 6,
	level: 3
},
	"748": {
	name: "Märkisch-Oderland",
	id: 748,
	pid: 199,
	rootId: 6,
	level: 3
},
	"749": {
	name: "Oberhavel",
	id: 749,
	pid: 199,
	rootId: 6,
	level: 3
},
	"750": {
	name: "Oder-Spree",
	id: 750,
	pid: 199,
	rootId: 6,
	level: 3
},
	"751": {
	name: "Ostprignitz-Ruppin",
	id: 751,
	pid: 199,
	rootId: 6,
	level: 3
},
	"752": {
	name: "Prignitz",
	id: 752,
	pid: 199,
	rootId: 6,
	level: 3
},
	"753": {
	name: "Uckermark",
	id: 753,
	pid: 199,
	rootId: 6,
	level: 3
},
	"754": {
	name: "Brandenburg an der Havel, Kreisfreie Stadt",
	id: 754,
	pid: 200,
	rootId: 6,
	level: 3
},
	"755": {
	name: "Cottbus, Kreisfreie Stadt",
	id: 755,
	pid: 200,
	rootId: 6,
	level: 3
},
	"756": {
	name: "Potsdam, Kreisfreie Stadt",
	id: 756,
	pid: 200,
	rootId: 6,
	level: 3
},
	"757": {
	name: "Dahme-Spreewald",
	id: 757,
	pid: 200,
	rootId: 6,
	level: 3
},
	"758": {
	name: "Elbe-Elster",
	id: 758,
	pid: 200,
	rootId: 6,
	level: 3
},
	"759": {
	name: "Havelland",
	id: 759,
	pid: 200,
	rootId: 6,
	level: 3
},
	"760": {
	name: "Oberspreewald-Lausitz",
	id: 760,
	pid: 200,
	rootId: 6,
	level: 3
},
	"761": {
	name: "Potsdam-Mittelmark",
	id: 761,
	pid: 200,
	rootId: 6,
	level: 3
},
	"762": {
	name: "Spree-Neiße",
	id: 762,
	pid: 200,
	rootId: 6,
	level: 3
},
	"763": {
	name: "Teltow-Fläming",
	id: 763,
	pid: 200,
	rootId: 6,
	level: 3
},
	"764": {
	name: "Bremen, Kreisfreie Stadt",
	id: 764,
	pid: 201,
	rootId: 6,
	level: 3
},
	"765": {
	name: "Bremerhaven, Kreisfreie Stadt",
	id: 765,
	pid: 201,
	rootId: 6,
	level: 3
},
	"766": {
	name: "Hamburg",
	id: 766,
	pid: 202,
	rootId: 6,
	level: 3
},
	"767": {
	name: "Darmstadt, Kreisfreie Stadt",
	id: 767,
	pid: 203,
	rootId: 6,
	level: 3
},
	"768": {
	name: "Frankfurt am Main, Kreisfreie Stadt",
	id: 768,
	pid: 203,
	rootId: 6,
	level: 3
},
	"769": {
	name: "Offenbach am Main, Kreisfreie Stadt",
	id: 769,
	pid: 203,
	rootId: 6,
	level: 3
},
	"770": {
	name: "Wiesbaden, Kreisfreie Stadt",
	id: 770,
	pid: 203,
	rootId: 6,
	level: 3
},
	"771": {
	name: "Bergstraße",
	id: 771,
	pid: 203,
	rootId: 6,
	level: 3
},
	"772": {
	name: "Darmstadt-Dieburg",
	id: 772,
	pid: 203,
	rootId: 6,
	level: 3
},
	"773": {
	name: "Groß-Gerau",
	id: 773,
	pid: 203,
	rootId: 6,
	level: 3
},
	"774": {
	name: "Hochtaunuskreis",
	id: 774,
	pid: 203,
	rootId: 6,
	level: 3
},
	"775": {
	name: "Main-Kinzig-Kreis",
	id: 775,
	pid: 203,
	rootId: 6,
	level: 3
},
	"776": {
	name: "Main-Taunus-Kreis",
	id: 776,
	pid: 203,
	rootId: 6,
	level: 3
},
	"777": {
	name: "Odenwaldkreis",
	id: 777,
	pid: 203,
	rootId: 6,
	level: 3
},
	"778": {
	name: "Offenbach, Landkreis",
	id: 778,
	pid: 203,
	rootId: 6,
	level: 3
},
	"779": {
	name: "Rheingau-Taunus-Kreis",
	id: 779,
	pid: 203,
	rootId: 6,
	level: 3
},
	"780": {
	name: "Wetteraukreis",
	id: 780,
	pid: 203,
	rootId: 6,
	level: 3
},
	"781": {
	name: "Gießen, Landkreis",
	id: 781,
	pid: 204,
	rootId: 6,
	level: 3
},
	"782": {
	name: "Lahn-Dill-Kreis",
	id: 782,
	pid: 204,
	rootId: 6,
	level: 3
},
	"783": {
	name: "Limburg-Weilburg",
	id: 783,
	pid: 204,
	rootId: 6,
	level: 3
},
	"784": {
	name: "Marburg-Biedenkopf",
	id: 784,
	pid: 204,
	rootId: 6,
	level: 3
},
	"785": {
	name: "Vogelsbergkreis",
	id: 785,
	pid: 204,
	rootId: 6,
	level: 3
},
	"786": {
	name: "Kassel, Kreisfreie Stadt",
	id: 786,
	pid: 205,
	rootId: 6,
	level: 3
},
	"787": {
	name: "Fulda",
	id: 787,
	pid: 205,
	rootId: 6,
	level: 3
},
	"788": {
	name: "Hersfeld-Rotenburg",
	id: 788,
	pid: 205,
	rootId: 6,
	level: 3
},
	"789": {
	name: "Kassel, Landkreis",
	id: 789,
	pid: 205,
	rootId: 6,
	level: 3
},
	"790": {
	name: "Schwalm-Eder-Kreis",
	id: 790,
	pid: 205,
	rootId: 6,
	level: 3
},
	"791": {
	name: "Waldeck-Frankenberg",
	id: 791,
	pid: 205,
	rootId: 6,
	level: 3
},
	"792": {
	name: "Werra-Meißner-Kreis",
	id: 792,
	pid: 205,
	rootId: 6,
	level: 3
},
	"793": {
	name: "Greifswald, Kreisfreie Stadt",
	id: 793,
	pid: 206,
	rootId: 6,
	level: 3
},
	"794": {
	name: "Neubrandenburg, Kreisfreie Stadt",
	id: 794,
	pid: 206,
	rootId: 6,
	level: 3
},
	"795": {
	name: "Rostock, Kreisfreie Stadt",
	id: 795,
	pid: 206,
	rootId: 6,
	level: 3
},
	"796": {
	name: "Schwerin, Kreisfreie Stadt",
	id: 796,
	pid: 206,
	rootId: 6,
	level: 3
},
	"797": {
	name: "Stralsund, Kreisfreie Stadt",
	id: 797,
	pid: 206,
	rootId: 6,
	level: 3
},
	"798": {
	name: "Wismar, Kreisfreie Stadt",
	id: 798,
	pid: 206,
	rootId: 6,
	level: 3
},
	"799": {
	name: "Bad Doberan",
	id: 799,
	pid: 206,
	rootId: 6,
	level: 3
},
	"800": {
	name: "Demmin",
	id: 800,
	pid: 206,
	rootId: 6,
	level: 3
},
	"801": {
	name: "Güstrow",
	id: 801,
	pid: 206,
	rootId: 6,
	level: 3
},
	"802": {
	name: "Ludwigslust",
	id: 802,
	pid: 206,
	rootId: 6,
	level: 3
},
	"803": {
	name: "Mecklenburg-Strelitz",
	id: 803,
	pid: 206,
	rootId: 6,
	level: 3
},
	"804": {
	name: "Müritz",
	id: 804,
	pid: 206,
	rootId: 6,
	level: 3
},
	"805": {
	name: "Nordvorpommern",
	id: 805,
	pid: 206,
	rootId: 6,
	level: 3
},
	"806": {
	name: "Nordwestmecklenburg",
	id: 806,
	pid: 206,
	rootId: 6,
	level: 3
},
	"807": {
	name: "Ostvorpommern",
	id: 807,
	pid: 206,
	rootId: 6,
	level: 3
},
	"808": {
	name: "Parchim",
	id: 808,
	pid: 206,
	rootId: 6,
	level: 3
},
	"809": {
	name: "Rügen",
	id: 809,
	pid: 206,
	rootId: 6,
	level: 3
},
	"810": {
	name: "Uecker-Randow",
	id: 810,
	pid: 206,
	rootId: 6,
	level: 3
},
	"811": {
	name: "Braunschweig, Kreisfreie Stadt",
	id: 811,
	pid: 207,
	rootId: 6,
	level: 3
},
	"812": {
	name: "Salzgitter, Kreisfreie Stadt",
	id: 812,
	pid: 207,
	rootId: 6,
	level: 3
},
	"813": {
	name: "Wolfsburg, Kreisfreie Stadt",
	id: 813,
	pid: 207,
	rootId: 6,
	level: 3
},
	"814": {
	name: "Gifhorn",
	id: 814,
	pid: 207,
	rootId: 6,
	level: 3
},
	"815": {
	name: "Göttingen",
	id: 815,
	pid: 207,
	rootId: 6,
	level: 3
},
	"816": {
	name: "Goslar",
	id: 816,
	pid: 207,
	rootId: 6,
	level: 3
},
	"817": {
	name: "Helmstedt",
	id: 817,
	pid: 207,
	rootId: 6,
	level: 3
},
	"818": {
	name: "Northeim",
	id: 818,
	pid: 207,
	rootId: 6,
	level: 3
},
	"819": {
	name: "Osterode am Harz",
	id: 819,
	pid: 207,
	rootId: 6,
	level: 3
},
	"820": {
	name: "Peine",
	id: 820,
	pid: 207,
	rootId: 6,
	level: 3
},
	"821": {
	name: "Wolfenbüttel",
	id: 821,
	pid: 207,
	rootId: 6,
	level: 3
},
	"822": {
	name: "Diepholz",
	id: 822,
	pid: 208,
	rootId: 6,
	level: 3
},
	"823": {
	name: "Hameln-Pyrmont",
	id: 823,
	pid: 208,
	rootId: 6,
	level: 3
},
	"824": {
	name: "Hildesheim",
	id: 824,
	pid: 208,
	rootId: 6,
	level: 3
},
	"825": {
	name: "Holzminden",
	id: 825,
	pid: 208,
	rootId: 6,
	level: 3
},
	"826": {
	name: "Nienburg (Weser)",
	id: 826,
	pid: 208,
	rootId: 6,
	level: 3
},
	"827": {
	name: "Schaumburg",
	id: 827,
	pid: 208,
	rootId: 6,
	level: 3
},
	"828": {
	name: "Region Hannover",
	id: 828,
	pid: 208,
	rootId: 6,
	level: 3
},
	"829": {
	name: "Celle",
	id: 829,
	pid: 209,
	rootId: 6,
	level: 3
},
	"830": {
	name: "Cuxhaven",
	id: 830,
	pid: 209,
	rootId: 6,
	level: 3
},
	"831": {
	name: "Harburg",
	id: 831,
	pid: 209,
	rootId: 6,
	level: 3
},
	"832": {
	name: "Lüchow-Dannenberg",
	id: 832,
	pid: 209,
	rootId: 6,
	level: 3
},
	"833": {
	name: "Lüneburg, Landkreis",
	id: 833,
	pid: 209,
	rootId: 6,
	level: 3
},
	"834": {
	name: "Osterholz",
	id: 834,
	pid: 209,
	rootId: 6,
	level: 3
},
	"835": {
	name: "Rotenburg (Wümme)",
	id: 835,
	pid: 209,
	rootId: 6,
	level: 3
},
	"836": {
	name: "Heidekreis",
	id: 836,
	pid: 209,
	rootId: 6,
	level: 3
},
	"837": {
	name: "Stade",
	id: 837,
	pid: 209,
	rootId: 6,
	level: 3
},
	"838": {
	name: "Uelzen",
	id: 838,
	pid: 209,
	rootId: 6,
	level: 3
},
	"839": {
	name: "Verden",
	id: 839,
	pid: 209,
	rootId: 6,
	level: 3
},
	"840": {
	name: "Delmenhorst, Kreisfreie Stadt",
	id: 840,
	pid: 210,
	rootId: 6,
	level: 3
},
	"841": {
	name: "Emden, Kreisfreie Stadt",
	id: 841,
	pid: 210,
	rootId: 6,
	level: 3
},
	"842": {
	name: "Oldenburg (Oldenburg), Kreisfreie Stadt",
	id: 842,
	pid: 210,
	rootId: 6,
	level: 3
},
	"843": {
	name: "Osnabrück, Kreisfreie Stadt",
	id: 843,
	pid: 210,
	rootId: 6,
	level: 3
},
	"844": {
	name: "Wilhelmshaven, Kreisfreie Stadt",
	id: 844,
	pid: 210,
	rootId: 6,
	level: 3
},
	"845": {
	name: "Ammerland",
	id: 845,
	pid: 210,
	rootId: 6,
	level: 3
},
	"846": {
	name: "Aurich",
	id: 846,
	pid: 210,
	rootId: 6,
	level: 3
},
	"847": {
	name: "Cloppenburg",
	id: 847,
	pid: 210,
	rootId: 6,
	level: 3
},
	"848": {
	name: "Emsland",
	id: 848,
	pid: 210,
	rootId: 6,
	level: 3
},
	"849": {
	name: "Friesland (DE)",
	id: 849,
	pid: 210,
	rootId: 6,
	level: 3
},
	"850": {
	name: "Grafschaft Bentheim",
	id: 850,
	pid: 210,
	rootId: 6,
	level: 3
},
	"851": {
	name: "Leer",
	id: 851,
	pid: 210,
	rootId: 6,
	level: 3
},
	"852": {
	name: "Oldenburg, Landkreis",
	id: 852,
	pid: 210,
	rootId: 6,
	level: 3
},
	"853": {
	name: "Osnabrück, Landkreis",
	id: 853,
	pid: 210,
	rootId: 6,
	level: 3
},
	"854": {
	name: "Vechta",
	id: 854,
	pid: 210,
	rootId: 6,
	level: 3
},
	"855": {
	name: "Wesermarsch",
	id: 855,
	pid: 210,
	rootId: 6,
	level: 3
},
	"856": {
	name: "Wittmund",
	id: 856,
	pid: 210,
	rootId: 6,
	level: 3
},
	"857": {
	name: "Düsseldorf, Kreisfreie Stadt",
	id: 857,
	pid: 211,
	rootId: 6,
	level: 3
},
	"858": {
	name: "Duisburg, Kreisfreie Stadt",
	id: 858,
	pid: 211,
	rootId: 6,
	level: 3
},
	"859": {
	name: "Essen, Kreisfreie Stadt",
	id: 859,
	pid: 211,
	rootId: 6,
	level: 3
},
	"860": {
	name: "Krefeld, Kreisfreie Stadt",
	id: 860,
	pid: 211,
	rootId: 6,
	level: 3
},
	"861": {
	name: "Mönchengladbach, Kreisfreie Stadt",
	id: 861,
	pid: 211,
	rootId: 6,
	level: 3
},
	"862": {
	name: "Mülheim an der Ruhr,Kreisfreie Stadt",
	id: 862,
	pid: 211,
	rootId: 6,
	level: 3
},
	"863": {
	name: "Oberhausen, Kreisfreie Stadt",
	id: 863,
	pid: 211,
	rootId: 6,
	level: 3
},
	"864": {
	name: "Remscheid, Kreisfreie Stadt",
	id: 864,
	pid: 211,
	rootId: 6,
	level: 3
},
	"865": {
	name: "Solingen, Kreisfreie Stadt",
	id: 865,
	pid: 211,
	rootId: 6,
	level: 3
},
	"866": {
	name: "Wuppertal, Kreisfreie Stadt",
	id: 866,
	pid: 211,
	rootId: 6,
	level: 3
},
	"867": {
	name: "Kleve",
	id: 867,
	pid: 211,
	rootId: 6,
	level: 3
},
	"868": {
	name: "Mettmann",
	id: 868,
	pid: 211,
	rootId: 6,
	level: 3
},
	"869": {
	name: "Rhein-Kreis Neuss",
	id: 869,
	pid: 211,
	rootId: 6,
	level: 3
},
	"870": {
	name: "Viersen",
	id: 870,
	pid: 211,
	rootId: 6,
	level: 3
},
	"871": {
	name: "Wesel",
	id: 871,
	pid: 211,
	rootId: 6,
	level: 3
},
	"872": {
	name: "Aachen, Kreisfreie Stadt",
	id: 872,
	pid: 212,
	rootId: 6,
	level: 3
},
	"873": {
	name: "Bonn, Kreisfreie Stadt",
	id: 873,
	pid: 212,
	rootId: 6,
	level: 3
},
	"874": {
	name: "Köln, Kreisfreie Stadt",
	id: 874,
	pid: 212,
	rootId: 6,
	level: 3
},
	"875": {
	name: "Leverkusen, Kreisfreie Stadt",
	id: 875,
	pid: 212,
	rootId: 6,
	level: 3
},
	"876": {
	name: "Aachen, Kreis",
	id: 876,
	pid: 212,
	rootId: 6,
	level: 3
},
	"877": {
	name: "Düren",
	id: 877,
	pid: 212,
	rootId: 6,
	level: 3
},
	"878": {
	name: "Rhein-Erft-Kreis",
	id: 878,
	pid: 212,
	rootId: 6,
	level: 3
},
	"879": {
	name: "Euskirchen",
	id: 879,
	pid: 212,
	rootId: 6,
	level: 3
},
	"880": {
	name: "Heinsberg",
	id: 880,
	pid: 212,
	rootId: 6,
	level: 3
},
	"881": {
	name: "Oberbergischer Kreis",
	id: 881,
	pid: 212,
	rootId: 6,
	level: 3
},
	"882": {
	name: "Rheinisch-Bergischer Kreis",
	id: 882,
	pid: 212,
	rootId: 6,
	level: 3
},
	"883": {
	name: "Rhein-Sieg-Kreis",
	id: 883,
	pid: 212,
	rootId: 6,
	level: 3
},
	"884": {
	name: "Bottrop, Kreisfreie Stadt",
	id: 884,
	pid: 213,
	rootId: 6,
	level: 3
},
	"885": {
	name: "Gelsenkirchen, Kreisfreie Stadt",
	id: 885,
	pid: 213,
	rootId: 6,
	level: 3
},
	"886": {
	name: "Münster, Kreisfreie Stadt",
	id: 886,
	pid: 213,
	rootId: 6,
	level: 3
},
	"887": {
	name: "Borken",
	id: 887,
	pid: 213,
	rootId: 6,
	level: 3
},
	"888": {
	name: "Coesfeld",
	id: 888,
	pid: 213,
	rootId: 6,
	level: 3
},
	"889": {
	name: "Recklinghausen",
	id: 889,
	pid: 213,
	rootId: 6,
	level: 3
},
	"890": {
	name: "Steinfurt",
	id: 890,
	pid: 213,
	rootId: 6,
	level: 3
},
	"891": {
	name: "Warendorf",
	id: 891,
	pid: 213,
	rootId: 6,
	level: 3
},
	"892": {
	name: "Bielefeld, Kreisfreie Stadt",
	id: 892,
	pid: 214,
	rootId: 6,
	level: 3
},
	"893": {
	name: "Gütersloh",
	id: 893,
	pid: 214,
	rootId: 6,
	level: 3
},
	"894": {
	name: "Herford",
	id: 894,
	pid: 214,
	rootId: 6,
	level: 3
},
	"895": {
	name: "Höxter",
	id: 895,
	pid: 214,
	rootId: 6,
	level: 3
},
	"896": {
	name: "Lippe",
	id: 896,
	pid: 214,
	rootId: 6,
	level: 3
},
	"897": {
	name: "Minden-Lübbecke",
	id: 897,
	pid: 214,
	rootId: 6,
	level: 3
},
	"898": {
	name: "Paderborn",
	id: 898,
	pid: 214,
	rootId: 6,
	level: 3
},
	"899": {
	name: "Bochum, Kreisfreie Stadt",
	id: 899,
	pid: 215,
	rootId: 6,
	level: 3
},
	"900": {
	name: "Dortmund, Kreisfreie Stadt",
	id: 900,
	pid: 215,
	rootId: 6,
	level: 3
},
	"901": {
	name: "Hagen, Kreisfreie Stadt",
	id: 901,
	pid: 215,
	rootId: 6,
	level: 3
},
	"902": {
	name: "Hamm, Kreisfreie Stadt",
	id: 902,
	pid: 215,
	rootId: 6,
	level: 3
},
	"903": {
	name: "Herne, Kreisfreie Stadt",
	id: 903,
	pid: 215,
	rootId: 6,
	level: 3
},
	"904": {
	name: "Ennepe-Ruhr-Kreis",
	id: 904,
	pid: 215,
	rootId: 6,
	level: 3
},
	"905": {
	name: "Hochsauerlandkreis",
	id: 905,
	pid: 215,
	rootId: 6,
	level: 3
},
	"906": {
	name: "Märkischer Kreis",
	id: 906,
	pid: 215,
	rootId: 6,
	level: 3
},
	"907": {
	name: "Olpe",
	id: 907,
	pid: 215,
	rootId: 6,
	level: 3
},
	"908": {
	name: "Siegen-Wittgenstein",
	id: 908,
	pid: 215,
	rootId: 6,
	level: 3
},
	"909": {
	name: "Soest",
	id: 909,
	pid: 215,
	rootId: 6,
	level: 3
},
	"910": {
	name: "Unna",
	id: 910,
	pid: 215,
	rootId: 6,
	level: 3
},
	"911": {
	name: "Koblenz, Kreisfreie Stadt",
	id: 911,
	pid: 216,
	rootId: 6,
	level: 3
},
	"912": {
	name: "Ahrweiler",
	id: 912,
	pid: 216,
	rootId: 6,
	level: 3
},
	"913": {
	name: "Altenkirchen (Westerwald)",
	id: 913,
	pid: 216,
	rootId: 6,
	level: 3
},
	"914": {
	name: "Bad Kreuznach",
	id: 914,
	pid: 216,
	rootId: 6,
	level: 3
},
	"915": {
	name: "Birkenfeld",
	id: 915,
	pid: 216,
	rootId: 6,
	level: 3
},
	"916": {
	name: "Cochem-Zell",
	id: 916,
	pid: 216,
	rootId: 6,
	level: 3
},
	"917": {
	name: "Mayen-Koblenz",
	id: 917,
	pid: 216,
	rootId: 6,
	level: 3
},
	"918": {
	name: "Neuwied",
	id: 918,
	pid: 216,
	rootId: 6,
	level: 3
},
	"919": {
	name: "Rhein-Hunsrück-Kreis",
	id: 919,
	pid: 216,
	rootId: 6,
	level: 3
},
	"920": {
	name: "Rhein-Lahn-Kreis",
	id: 920,
	pid: 216,
	rootId: 6,
	level: 3
},
	"921": {
	name: "Westerwaldkreis",
	id: 921,
	pid: 216,
	rootId: 6,
	level: 3
},
	"922": {
	name: "Trier, Kreisfreie Stadt",
	id: 922,
	pid: 217,
	rootId: 6,
	level: 3
},
	"923": {
	name: "Bernkastel-Wittlich",
	id: 923,
	pid: 217,
	rootId: 6,
	level: 3
},
	"924": {
	name: "Eifelkreis Bitburg-Prüm",
	id: 924,
	pid: 217,
	rootId: 6,
	level: 3
},
	"925": {
	name: "Vulkaneifel",
	id: 925,
	pid: 217,
	rootId: 6,
	level: 3
},
	"926": {
	name: "Trier-Saarburg",
	id: 926,
	pid: 217,
	rootId: 6,
	level: 3
},
	"927": {
	name: "Frankenthal (Pfalz), Kreisfreie Stadt",
	id: 927,
	pid: 218,
	rootId: 6,
	level: 3
},
	"928": {
	name: "Kaiserslautern, Kreisfreie Stadt",
	id: 928,
	pid: 218,
	rootId: 6,
	level: 3
},
	"929": {
	name: "Landau in der Pfalz, Kreisfreie Stadt",
	id: 929,
	pid: 218,
	rootId: 6,
	level: 3
},
	"930": {
	name: "Ludwigshafen am Rhein, Kreisfreie Stadt",
	id: 930,
	pid: 218,
	rootId: 6,
	level: 3
},
	"931": {
	name: "Mainz, Kreisfreie Stadt",
	id: 931,
	pid: 218,
	rootId: 6,
	level: 3
},
	"932": {
	name: "Neustadt an der Weinstraße, Kreisfreie Stadt",
	id: 932,
	pid: 218,
	rootId: 6,
	level: 3
},
	"933": {
	name: "Pirmasens, Kreisfreie Stadt",
	id: 933,
	pid: 218,
	rootId: 6,
	level: 3
},
	"934": {
	name: "Speyer, Kreisfreie Stadt",
	id: 934,
	pid: 218,
	rootId: 6,
	level: 3
},
	"935": {
	name: "Worms, Kreisfreie Stadt",
	id: 935,
	pid: 218,
	rootId: 6,
	level: 3
},
	"936": {
	name: "Zweibrücken, Kreisfreie Stadt",
	id: 936,
	pid: 218,
	rootId: 6,
	level: 3
},
	"937": {
	name: "Alzey-Worms",
	id: 937,
	pid: 218,
	rootId: 6,
	level: 3
},
	"938": {
	name: "Bad Dürkheim",
	id: 938,
	pid: 218,
	rootId: 6,
	level: 3
},
	"939": {
	name: "Donnersbergkreis",
	id: 939,
	pid: 218,
	rootId: 6,
	level: 3
},
	"940": {
	name: "Germersheim",
	id: 940,
	pid: 218,
	rootId: 6,
	level: 3
},
	"941": {
	name: "Kaiserslautern, Landkreis",
	id: 941,
	pid: 218,
	rootId: 6,
	level: 3
},
	"942": {
	name: "Kusel",
	id: 942,
	pid: 218,
	rootId: 6,
	level: 3
},
	"943": {
	name: "Südliche Weinstraße",
	id: 943,
	pid: 218,
	rootId: 6,
	level: 3
},
	"944": {
	name: "Rhein-Pfalz-Kreis",
	id: 944,
	pid: 218,
	rootId: 6,
	level: 3
},
	"945": {
	name: "Mainz-Bingen",
	id: 945,
	pid: 218,
	rootId: 6,
	level: 3
},
	"946": {
	name: "Südwestpfalz",
	id: 946,
	pid: 218,
	rootId: 6,
	level: 3
},
	"947": {
	name: "Regionalverband Saarbrücken",
	id: 947,
	pid: 219,
	rootId: 6,
	level: 3
},
	"948": {
	name: "Merzig-Wadern",
	id: 948,
	pid: 219,
	rootId: 6,
	level: 3
},
	"949": {
	name: "Neunkirchen",
	id: 949,
	pid: 219,
	rootId: 6,
	level: 3
},
	"950": {
	name: "Saarlouis",
	id: 950,
	pid: 219,
	rootId: 6,
	level: 3
},
	"951": {
	name: "Saarpfalz-Kreis",
	id: 951,
	pid: 219,
	rootId: 6,
	level: 3
},
	"952": {
	name: "St. Wendel",
	id: 952,
	pid: 219,
	rootId: 6,
	level: 3
},
	"953": {
	name: "Chemnitz, Kreisfreie Stadt",
	id: 953,
	pid: 220,
	rootId: 6,
	level: 3
},
	"954": {
	name: "Plauen, Kreisfreie Stadt",
	id: 954,
	pid: 220,
	rootId: 6,
	level: 3
},
	"955": {
	name: "Zwickau, Kreisfreie Stadt",
	id: 955,
	pid: 220,
	rootId: 6,
	level: 3
},
	"956": {
	name: "Annaberg",
	id: 956,
	pid: 220,
	rootId: 6,
	level: 3
},
	"957": {
	name: "Chemnitzer Land",
	id: 957,
	pid: 220,
	rootId: 6,
	level: 3
},
	"958": {
	name: "Freiberg",
	id: 958,
	pid: 220,
	rootId: 6,
	level: 3
},
	"959": {
	name: "Vogtlandkreis",
	id: 959,
	pid: 220,
	rootId: 6,
	level: 3
},
	"960": {
	name: "Mittlerer Erzgebirgskreis",
	id: 960,
	pid: 220,
	rootId: 6,
	level: 3
},
	"961": {
	name: "Mittweida",
	id: 961,
	pid: 220,
	rootId: 6,
	level: 3
},
	"962": {
	name: "Stollberg",
	id: 962,
	pid: 220,
	rootId: 6,
	level: 3
},
	"963": {
	name: "Aue-Schwarzenberg",
	id: 963,
	pid: 220,
	rootId: 6,
	level: 3
},
	"964": {
	name: "Zwickauer Land",
	id: 964,
	pid: 220,
	rootId: 6,
	level: 3
},
	"965": {
	name: "Dresden, Kreisfreie Stadt",
	id: 965,
	pid: 221,
	rootId: 6,
	level: 3
},
	"966": {
	name: "Görlitz, Kreisfreie Stadt",
	id: 966,
	pid: 221,
	rootId: 6,
	level: 3
},
	"967": {
	name: "Hoyerswerda, Kreisfreie Stadt",
	id: 967,
	pid: 221,
	rootId: 6,
	level: 3
},
	"968": {
	name: "Bautzen",
	id: 968,
	pid: 221,
	rootId: 6,
	level: 3
},
	"969": {
	name: "Meißen",
	id: 969,
	pid: 221,
	rootId: 6,
	level: 3
},
	"970": {
	name: "Niederschlesischer Oberlausitzkreis",
	id: 970,
	pid: 221,
	rootId: 6,
	level: 3
},
	"971": {
	name: "Riesa-Großenhain",
	id: 971,
	pid: 221,
	rootId: 6,
	level: 3
},
	"972": {
	name: "Löbau-Zittau",
	id: 972,
	pid: 221,
	rootId: 6,
	level: 3
},
	"973": {
	name: "Sächsische Schweiz",
	id: 973,
	pid: 221,
	rootId: 6,
	level: 3
},
	"974": {
	name: "Weißeritzkreis",
	id: 974,
	pid: 221,
	rootId: 6,
	level: 3
},
	"975": {
	name: "Kamenz",
	id: 975,
	pid: 221,
	rootId: 6,
	level: 3
},
	"976": {
	name: "Leipzig, Kreisfreie Stadt",
	id: 976,
	pid: 222,
	rootId: 6,
	level: 3
},
	"977": {
	name: "Delitzsch",
	id: 977,
	pid: 222,
	rootId: 6,
	level: 3
},
	"978": {
	name: "Döbeln",
	id: 978,
	pid: 222,
	rootId: 6,
	level: 3
},
	"979": {
	name: "Leipziger Land",
	id: 979,
	pid: 222,
	rootId: 6,
	level: 3
},
	"980": {
	name: "Muldentalkreis",
	id: 980,
	pid: 222,
	rootId: 6,
	level: 3
},
	"981": {
	name: "Torgau-Oschatz",
	id: 981,
	pid: 222,
	rootId: 6,
	level: 3
},
	"982": {
	name: "Dessau, Kreisfreie Stadt",
	id: 982,
	pid: 223,
	rootId: 6,
	level: 3
},
	"983": {
	name: "Anhalt-Zerbst",
	id: 983,
	pid: 223,
	rootId: 6,
	level: 3
},
	"984": {
	name: "Bernburg",
	id: 984,
	pid: 223,
	rootId: 6,
	level: 3
},
	"985": {
	name: "Bitterfeld",
	id: 985,
	pid: 223,
	rootId: 6,
	level: 3
},
	"986": {
	name: "Köthen",
	id: 986,
	pid: 223,
	rootId: 6,
	level: 3
},
	"987": {
	name: "Wittenberg",
	id: 987,
	pid: 223,
	rootId: 6,
	level: 3
},
	"988": {
	name: "Halle (Saale), Kreisfreie Stadt",
	id: 988,
	pid: 224,
	rootId: 6,
	level: 3
},
	"989": {
	name: "Burgenlandkreis",
	id: 989,
	pid: 224,
	rootId: 6,
	level: 3
},
	"990": {
	name: "Mansfelder Land",
	id: 990,
	pid: 224,
	rootId: 6,
	level: 3
},
	"991": {
	name: "Merseburg-Querfurt",
	id: 991,
	pid: 224,
	rootId: 6,
	level: 3
},
	"992": {
	name: "Saalkreis",
	id: 992,
	pid: 224,
	rootId: 6,
	level: 3
},
	"993": {
	name: "Sangerhausen",
	id: 993,
	pid: 224,
	rootId: 6,
	level: 3
},
	"994": {
	name: "Weißenfels",
	id: 994,
	pid: 224,
	rootId: 6,
	level: 3
},
	"995": {
	name: "Magdeburg, Kreisfreie Stadt",
	id: 995,
	pid: 225,
	rootId: 6,
	level: 3
},
	"996": {
	name: "Aschersleben-Staßfurt",
	id: 996,
	pid: 225,
	rootId: 6,
	level: 3
},
	"997": {
	name: "Bördekreis",
	id: 997,
	pid: 225,
	rootId: 6,
	level: 3
},
	"998": {
	name: "Halberstadt",
	id: 998,
	pid: 225,
	rootId: 6,
	level: 3
},
	"999": {
	name: "Jerichower Land",
	id: 999,
	pid: 225,
	rootId: 6,
	level: 3
},
	"1000": {
	name: "Ohrekreis",
	id: 1000,
	pid: 225,
	rootId: 6,
	level: 3
},
	"1001": {
	name: "Stendal",
	id: 1001,
	pid: 225,
	rootId: 6,
	level: 3
},
	"1002": {
	name: "Quedlinburg",
	id: 1002,
	pid: 225,
	rootId: 6,
	level: 3
},
	"1003": {
	name: "Schönebeck",
	id: 1003,
	pid: 225,
	rootId: 6,
	level: 3
},
	"1004": {
	name: "Wernigerode",
	id: 1004,
	pid: 225,
	rootId: 6,
	level: 3
},
	"1005": {
	name: "Altmarkkreis Salzwedel",
	id: 1005,
	pid: 225,
	rootId: 6,
	level: 3
},
	"1006": {
	name: "Flensburg, Kreisfreie Stadt",
	id: 1006,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1007": {
	name: "Kiel, Kreisfreie Stadt",
	id: 1007,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1008": {
	name: "Lübeck, Kreisfreie Stadt",
	id: 1008,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1009": {
	name: "Neumünster, Kreisfreie Stadt",
	id: 1009,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1010": {
	name: "Dithmarschen",
	id: 1010,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1011": {
	name: "Herzogtum Lauenburg",
	id: 1011,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1012": {
	name: "Nordfriesland",
	id: 1012,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1013": {
	name: "Ostholstein",
	id: 1013,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1014": {
	name: "Pinneberg",
	id: 1014,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1015": {
	name: "Plön",
	id: 1015,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1016": {
	name: "Rendsburg-Eckernförde",
	id: 1016,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1017": {
	name: "Schleswig-Flensburg",
	id: 1017,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1018": {
	name: "Segeberg",
	id: 1018,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1019": {
	name: "Steinburg",
	id: 1019,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1020": {
	name: "Stormarn",
	id: 1020,
	pid: 226,
	rootId: 6,
	level: 3
},
	"1021": {
	name: "Erfurt, Kreisfreie Stadt",
	id: 1021,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1022": {
	name: "Gera, Kreisfreie Stadt",
	id: 1022,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1023": {
	name: "Jena, Kreisfreie Stadt",
	id: 1023,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1024": {
	name: "Suhl, Kreisfreie Stadt",
	id: 1024,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1025": {
	name: "Weimar, Kreisfreie Stadt",
	id: 1025,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1026": {
	name: "Eichsfeld",
	id: 1026,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1027": {
	name: "Nordhausen",
	id: 1027,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1028": {
	name: "Unstrut-Hainich-Kreis",
	id: 1028,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1029": {
	name: "Kyffhäuserkreis",
	id: 1029,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1030": {
	name: "Schmalkalden-Meiningen",
	id: 1030,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1031": {
	name: "Gotha",
	id: 1031,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1032": {
	name: "Sömmerda",
	id: 1032,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1033": {
	name: "Hildburghausen",
	id: 1033,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1034": {
	name: "Ilm-Kreis",
	id: 1034,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1035": {
	name: "Weimarer Land",
	id: 1035,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1036": {
	name: "Sonneberg",
	id: 1036,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1037": {
	name: "Saalfeld-Rudolstadt",
	id: 1037,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1038": {
	name: "Saale-Holzland-Kreis",
	id: 1038,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1039": {
	name: "Saale-Orla-Kreis",
	id: 1039,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1040": {
	name: "Greiz",
	id: 1040,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1041": {
	name: "Altenburger Land",
	id: 1041,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1042": {
	name: "Eisenach, Kreisfreie Stadt",
	id: 1042,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1043": {
	name: "Wartburgkreis",
	id: 1043,
	pid: 227,
	rootId: 6,
	level: 3
},
	"1044": {
	name: "København og Frederiksberg kommuner",
	id: 1044,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1045": {
	name: "Københavns amt",
	id: 1045,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1046": {
	name: "Frederiksborg amt",
	id: 1046,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1047": {
	name: "Roskilde amt",
	id: 1047,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1048": {
	name: "Vestsjællands amt",
	id: 1048,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1049": {
	name: "Storstrøms amt",
	id: 1049,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1050": {
	name: "Bornholm",
	id: 1050,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1051": {
	name: "Fyn",
	id: 1051,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1052": {
	name: "Sønderjyllands amt",
	id: 1052,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1053": {
	name: "Ribe amt",
	id: 1053,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1054": {
	name: "Vejle amt",
	id: 1054,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1055": {
	name: "Ringkøbing amt",
	id: 1055,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1056": {
	name: "Århus amt",
	id: 1056,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1057": {
	name: "Viborg amt",
	id: 1057,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1058": {
	name: "Nordjyllands amt",
	id: 1058,
	pid: 228,
	rootId: 7,
	level: 3
},
	"1059": {
	name: "Põhja-Eesti",
	id: 1059,
	pid: 229,
	rootId: 8,
	level: 3
},
	"1060": {
	name: "Lääne-Eesti",
	id: 1060,
	pid: 229,
	rootId: 8,
	level: 3
},
	"1061": {
	name: "Kesk-Eesti",
	id: 1061,
	pid: 229,
	rootId: 8,
	level: 3
},
	"1062": {
	name: "Kirde-Eesti",
	id: 1062,
	pid: 229,
	rootId: 8,
	level: 3
},
	"1063": {
	name: "Lõuna-Eesti",
	id: 1063,
	pid: 229,
	rootId: 8,
	level: 3
},
	"1064": {
	name: "A Coruña",
	id: 1064,
	pid: 230,
	rootId: 9,
	level: 3
},
	"1065": {
	name: "Lugo",
	id: 1065,
	pid: 230,
	rootId: 9,
	level: 3
},
	"1066": {
	name: "Ourense",
	id: 1066,
	pid: 230,
	rootId: 9,
	level: 3
},
	"1067": {
	name: "Pontevedra",
	id: 1067,
	pid: 230,
	rootId: 9,
	level: 3
},
	"1068": {
	name: "Asturias",
	id: 1068,
	pid: 231,
	rootId: 9,
	level: 3
},
	"1069": {
	name: "Cantabria",
	id: 1069,
	pid: 232,
	rootId: 9,
	level: 3
},
	"1070": {
	name: "Araba/Álava",
	id: 1070,
	pid: 233,
	rootId: 9,
	level: 3
},
	"1071": {
	name: "Gipuzkoa",
	id: 1071,
	pid: 233,
	rootId: 9,
	level: 3
},
	"1072": {
	name: "Bizkaia",
	id: 1072,
	pid: 233,
	rootId: 9,
	level: 3
},
	"1073": {
	name: "Navarra",
	id: 1073,
	pid: 234,
	rootId: 9,
	level: 3
},
	"1074": {
	name: "La Rioja",
	id: 1074,
	pid: 235,
	rootId: 9,
	level: 3
},
	"1075": {
	name: "Huesca",
	id: 1075,
	pid: 236,
	rootId: 9,
	level: 3
},
	"1076": {
	name: "Teruel",
	id: 1076,
	pid: 236,
	rootId: 9,
	level: 3
},
	"1077": {
	name: "Zaragoza",
	id: 1077,
	pid: 236,
	rootId: 9,
	level: 3
},
	"1078": {
	name: "Madrid",
	id: 1078,
	pid: 237,
	rootId: 9,
	level: 3
},
	"1079": {
	name: "Ávila",
	id: 1079,
	pid: 238,
	rootId: 9,
	level: 3
},
	"1080": {
	name: "Burgos",
	id: 1080,
	pid: 238,
	rootId: 9,
	level: 3
},
	"1081": {
	name: "León",
	id: 1081,
	pid: 238,
	rootId: 9,
	level: 3
},
	"1082": {
	name: "Palencia",
	id: 1082,
	pid: 238,
	rootId: 9,
	level: 3
},
	"1083": {
	name: "Salamanca",
	id: 1083,
	pid: 238,
	rootId: 9,
	level: 3
},
	"1084": {
	name: "Segovia",
	id: 1084,
	pid: 238,
	rootId: 9,
	level: 3
},
	"1085": {
	name: "Soria",
	id: 1085,
	pid: 238,
	rootId: 9,
	level: 3
},
	"1086": {
	name: "Valladolid",
	id: 1086,
	pid: 238,
	rootId: 9,
	level: 3
},
	"1087": {
	name: "Zamora",
	id: 1087,
	pid: 238,
	rootId: 9,
	level: 3
},
	"1088": {
	name: "Albacete",
	id: 1088,
	pid: 239,
	rootId: 9,
	level: 3
},
	"1089": {
	name: "Ciudad Real",
	id: 1089,
	pid: 239,
	rootId: 9,
	level: 3
},
	"1090": {
	name: "Cuenca",
	id: 1090,
	pid: 239,
	rootId: 9,
	level: 3
},
	"1091": {
	name: "Guadalajara",
	id: 1091,
	pid: 239,
	rootId: 9,
	level: 3
},
	"1092": {
	name: "Toledo",
	id: 1092,
	pid: 239,
	rootId: 9,
	level: 3
},
	"1093": {
	name: "Badajoz",
	id: 1093,
	pid: 240,
	rootId: 9,
	level: 3
},
	"1094": {
	name: "Cáceres",
	id: 1094,
	pid: 240,
	rootId: 9,
	level: 3
},
	"1095": {
	name: "Barcelona",
	id: 1095,
	pid: 241,
	rootId: 9,
	level: 3
},
	"1096": {
	name: "Girona",
	id: 1096,
	pid: 241,
	rootId: 9,
	level: 3
},
	"1097": {
	name: "Lleida",
	id: 1097,
	pid: 241,
	rootId: 9,
	level: 3
},
	"1098": {
	name: "Tarragona",
	id: 1098,
	pid: 241,
	rootId: 9,
	level: 3
},
	"1099": {
	name: "Alicante / Alacant",
	id: 1099,
	pid: 242,
	rootId: 9,
	level: 3
},
	"1100": {
	name: "Castellón / Castelló",
	id: 1100,
	pid: 242,
	rootId: 9,
	level: 3
},
	"1101": {
	name: "Valencia / València",
	id: 1101,
	pid: 242,
	rootId: 9,
	level: 3
},
	"1102": {
	name: "Illes Balears",
	id: 1102,
	pid: 243,
	rootId: 9,
	level: 3
},
	"1103": {
	name: "Almería",
	id: 1103,
	pid: 244,
	rootId: 9,
	level: 3
},
	"1104": {
	name: "Cádiz",
	id: 1104,
	pid: 244,
	rootId: 9,
	level: 3
},
	"1105": {
	name: "Córdoba",
	id: 1105,
	pid: 244,
	rootId: 9,
	level: 3
},
	"1106": {
	name: "Granada",
	id: 1106,
	pid: 244,
	rootId: 9,
	level: 3
},
	"1107": {
	name: "Huelva",
	id: 1107,
	pid: 244,
	rootId: 9,
	level: 3
},
	"1108": {
	name: "Jaén",
	id: 1108,
	pid: 244,
	rootId: 9,
	level: 3
},
	"1109": {
	name: "Málaga",
	id: 1109,
	pid: 244,
	rootId: 9,
	level: 3
},
	"1110": {
	name: "Sevilla",
	id: 1110,
	pid: 244,
	rootId: 9,
	level: 3
},
	"1111": {
	name: "Murcia",
	id: 1111,
	pid: 245,
	rootId: 9,
	level: 3
},
	"1112": {
	name: "Ceuta",
	id: 1112,
	pid: 246,
	rootId: 9,
	level: 3
},
	"1113": {
	name: "Melilla",
	id: 1113,
	pid: 247,
	rootId: 9,
	level: 3
},
	"1114": {
	name: "Las Palmas",
	id: 1114,
	pid: 248,
	rootId: 9,
	level: 3
},
	"1115": {
	name: "Santa Cruz de Tenerife",
	id: 1115,
	pid: 248,
	rootId: 9,
	level: 3
},
	"1116": {
	name: "Etelä-Savo",
	id: 1116,
	pid: 249,
	rootId: 10,
	level: 3
},
	"1117": {
	name: "Pohjois-Savo",
	id: 1117,
	pid: 249,
	rootId: 10,
	level: 3
},
	"1118": {
	name: "Pohjois-Karjala",
	id: 1118,
	pid: 249,
	rootId: 10,
	level: 3
},
	"1119": {
	name: "Kainuu",
	id: 1119,
	pid: 249,
	rootId: 10,
	level: 3
},
	"1120": {
	name: "Uusimaa",
	id: 1120,
	pid: 250,
	rootId: 10,
	level: 3
},
	"1121": {
	name: "Itä-Uusimaa",
	id: 1121,
	pid: 250,
	rootId: 10,
	level: 3
},
	"1122": {
	name: "Varsinais-Suomi",
	id: 1122,
	pid: 250,
	rootId: 10,
	level: 3
},
	"1123": {
	name: "Kanta-Häme",
	id: 1123,
	pid: 250,
	rootId: 10,
	level: 3
},
	"1124": {
	name: "Päijät-Häme",
	id: 1124,
	pid: 250,
	rootId: 10,
	level: 3
},
	"1125": {
	name: "Kymenlaakso",
	id: 1125,
	pid: 250,
	rootId: 10,
	level: 3
},
	"1126": {
	name: "Etelä-Karjala",
	id: 1126,
	pid: 250,
	rootId: 10,
	level: 3
},
	"1127": {
	name: "Satakunta",
	id: 1127,
	pid: 251,
	rootId: 10,
	level: 3
},
	"1128": {
	name: "Pirkanmaa",
	id: 1128,
	pid: 251,
	rootId: 10,
	level: 3
},
	"1129": {
	name: "Keski-Suomi",
	id: 1129,
	pid: 251,
	rootId: 10,
	level: 3
},
	"1130": {
	name: "Etelä-Pohjanmaa",
	id: 1130,
	pid: 251,
	rootId: 10,
	level: 3
},
	"1131": {
	name: "Pohjanmaa",
	id: 1131,
	pid: 251,
	rootId: 10,
	level: 3
},
	"1132": {
	name: "Keski-Pohjanmaa",
	id: 1132,
	pid: 252,
	rootId: 10,
	level: 3
},
	"1133": {
	name: "Pohjois-Pohjanmaa",
	id: 1133,
	pid: 252,
	rootId: 10,
	level: 3
},
	"1134": {
	name: "Lappi",
	id: 1134,
	pid: 252,
	rootId: 10,
	level: 3
},
	"1135": {
	name: "Åland",
	id: 1135,
	pid: 253,
	rootId: 10,
	level: 3
},
	"1136": {
	name: "Paris",
	id: 1136,
	pid: 254,
	rootId: 11,
	level: 3
},
	"1137": {
	name: "Seine-et-Marne",
	id: 1137,
	pid: 254,
	rootId: 11,
	level: 3
},
	"1138": {
	name: "Yvelines",
	id: 1138,
	pid: 254,
	rootId: 11,
	level: 3
},
	"1139": {
	name: "Essonne",
	id: 1139,
	pid: 254,
	rootId: 11,
	level: 3
},
	"1140": {
	name: "Hauts-de-Seine",
	id: 1140,
	pid: 254,
	rootId: 11,
	level: 3
},
	"1141": {
	name: "Seine-Saint-Denis",
	id: 1141,
	pid: 254,
	rootId: 11,
	level: 3
},
	"1142": {
	name: "Val-de-Marne",
	id: 1142,
	pid: 254,
	rootId: 11,
	level: 3
},
	"1143": {
	name: "Val-d'Oise",
	id: 1143,
	pid: 254,
	rootId: 11,
	level: 3
},
	"1144": {
	name: "Ardennes",
	id: 1144,
	pid: 255,
	rootId: 11,
	level: 3
},
	"1145": {
	name: "Aube",
	id: 1145,
	pid: 255,
	rootId: 11,
	level: 3
},
	"1146": {
	name: "Marne",
	id: 1146,
	pid: 255,
	rootId: 11,
	level: 3
},
	"1147": {
	name: "Haute-Marne",
	id: 1147,
	pid: 255,
	rootId: 11,
	level: 3
},
	"1148": {
	name: "Aisne",
	id: 1148,
	pid: 256,
	rootId: 11,
	level: 3
},
	"1149": {
	name: "Oise",
	id: 1149,
	pid: 256,
	rootId: 11,
	level: 3
},
	"1150": {
	name: "Somme",
	id: 1150,
	pid: 256,
	rootId: 11,
	level: 3
},
	"1151": {
	name: "Eure",
	id: 1151,
	pid: 257,
	rootId: 11,
	level: 3
},
	"1152": {
	name: "Seine-Maritime",
	id: 1152,
	pid: 257,
	rootId: 11,
	level: 3
},
	"1153": {
	name: "Cher",
	id: 1153,
	pid: 258,
	rootId: 11,
	level: 3
},
	"1154": {
	name: "Eure-et-Loir",
	id: 1154,
	pid: 258,
	rootId: 11,
	level: 3
},
	"1155": {
	name: "Indre",
	id: 1155,
	pid: 258,
	rootId: 11,
	level: 3
},
	"1156": {
	name: "Indre-et-Loire",
	id: 1156,
	pid: 258,
	rootId: 11,
	level: 3
},
	"1157": {
	name: "Loir-et-Cher",
	id: 1157,
	pid: 258,
	rootId: 11,
	level: 3
},
	"1158": {
	name: "Loiret",
	id: 1158,
	pid: 258,
	rootId: 11,
	level: 3
},
	"1159": {
	name: "Calvados",
	id: 1159,
	pid: 259,
	rootId: 11,
	level: 3
},
	"1160": {
	name: "Manche",
	id: 1160,
	pid: 259,
	rootId: 11,
	level: 3
},
	"1161": {
	name: "Orne",
	id: 1161,
	pid: 259,
	rootId: 11,
	level: 3
},
	"1162": {
	name: "Côte-d'Or",
	id: 1162,
	pid: 260,
	rootId: 11,
	level: 3
},
	"1163": {
	name: "Nièvre",
	id: 1163,
	pid: 260,
	rootId: 11,
	level: 3
},
	"1164": {
	name: "Saône-et-Loire",
	id: 1164,
	pid: 260,
	rootId: 11,
	level: 3
},
	"1165": {
	name: "Yonne",
	id: 1165,
	pid: 260,
	rootId: 11,
	level: 3
},
	"1166": {
	name: "Nord",
	id: 1166,
	pid: 261,
	rootId: 11,
	level: 3
},
	"1167": {
	name: "Pas-de-Calais",
	id: 1167,
	pid: 261,
	rootId: 11,
	level: 3
},
	"1168": {
	name: "Meurthe-et-Moselle",
	id: 1168,
	pid: 262,
	rootId: 11,
	level: 3
},
	"1169": {
	name: "Meuse",
	id: 1169,
	pid: 262,
	rootId: 11,
	level: 3
},
	"1170": {
	name: "Moselle",
	id: 1170,
	pid: 262,
	rootId: 11,
	level: 3
},
	"1171": {
	name: "Vosges",
	id: 1171,
	pid: 262,
	rootId: 11,
	level: 3
},
	"1172": {
	name: "Bas-Rhin",
	id: 1172,
	pid: 263,
	rootId: 11,
	level: 3
},
	"1173": {
	name: "Haut-Rhin",
	id: 1173,
	pid: 263,
	rootId: 11,
	level: 3
},
	"1174": {
	name: "Doubs",
	id: 1174,
	pid: 264,
	rootId: 11,
	level: 3
},
	"1175": {
	name: "Jura",
	id: 1175,
	pid: 264,
	rootId: 11,
	level: 3
},
	"1176": {
	name: "Haute-Saône",
	id: 1176,
	pid: 264,
	rootId: 11,
	level: 3
},
	"1177": {
	name: "Territoire de Belfort",
	id: 1177,
	pid: 264,
	rootId: 11,
	level: 3
},
	"1178": {
	name: "Loire-Atlantique",
	id: 1178,
	pid: 265,
	rootId: 11,
	level: 3
},
	"1179": {
	name: "Maine-et-Loire",
	id: 1179,
	pid: 265,
	rootId: 11,
	level: 3
},
	"1180": {
	name: "Mayenne",
	id: 1180,
	pid: 265,
	rootId: 11,
	level: 3
},
	"1181": {
	name: "Sarthe",
	id: 1181,
	pid: 265,
	rootId: 11,
	level: 3
},
	"1182": {
	name: "Vendée",
	id: 1182,
	pid: 265,
	rootId: 11,
	level: 3
},
	"1183": {
	name: "Côtes-d'Armor",
	id: 1183,
	pid: 266,
	rootId: 11,
	level: 3
},
	"1184": {
	name: "Finistère",
	id: 1184,
	pid: 266,
	rootId: 11,
	level: 3
},
	"1185": {
	name: "Ille-et-Vilaine",
	id: 1185,
	pid: 266,
	rootId: 11,
	level: 3
},
	"1186": {
	name: "Morbihan",
	id: 1186,
	pid: 266,
	rootId: 11,
	level: 3
},
	"1187": {
	name: "Charente",
	id: 1187,
	pid: 267,
	rootId: 11,
	level: 3
},
	"1188": {
	name: "Charente-Maritime",
	id: 1188,
	pid: 267,
	rootId: 11,
	level: 3
},
	"1189": {
	name: "Deux-Sèvres",
	id: 1189,
	pid: 267,
	rootId: 11,
	level: 3
},
	"1190": {
	name: "Vienne",
	id: 1190,
	pid: 267,
	rootId: 11,
	level: 3
},
	"1191": {
	name: "Dordogne",
	id: 1191,
	pid: 268,
	rootId: 11,
	level: 3
},
	"1192": {
	name: "Gironde",
	id: 1192,
	pid: 268,
	rootId: 11,
	level: 3
},
	"1193": {
	name: "Landes",
	id: 1193,
	pid: 268,
	rootId: 11,
	level: 3
},
	"1194": {
	name: "Lot-et-Garonne",
	id: 1194,
	pid: 268,
	rootId: 11,
	level: 3
},
	"1195": {
	name: "Pyrénées-Atlantiques",
	id: 1195,
	pid: 268,
	rootId: 11,
	level: 3
},
	"1196": {
	name: "Ariège",
	id: 1196,
	pid: 269,
	rootId: 11,
	level: 3
},
	"1197": {
	name: "Aveyron",
	id: 1197,
	pid: 269,
	rootId: 11,
	level: 3
},
	"1198": {
	name: "Haute-Garonne",
	id: 1198,
	pid: 269,
	rootId: 11,
	level: 3
},
	"1199": {
	name: "Gers",
	id: 1199,
	pid: 269,
	rootId: 11,
	level: 3
},
	"1200": {
	name: "Lot",
	id: 1200,
	pid: 269,
	rootId: 11,
	level: 3
},
	"1201": {
	name: "Hautes-Pyrénées",
	id: 1201,
	pid: 269,
	rootId: 11,
	level: 3
},
	"1202": {
	name: "Tarn",
	id: 1202,
	pid: 269,
	rootId: 11,
	level: 3
},
	"1203": {
	name: "Tarn-et-Garonne",
	id: 1203,
	pid: 269,
	rootId: 11,
	level: 3
},
	"1204": {
	name: "Corrèze",
	id: 1204,
	pid: 270,
	rootId: 11,
	level: 3
},
	"1205": {
	name: "Creuse",
	id: 1205,
	pid: 270,
	rootId: 11,
	level: 3
},
	"1206": {
	name: "Haute-Vienne",
	id: 1206,
	pid: 270,
	rootId: 11,
	level: 3
},
	"1207": {
	name: "Ain",
	id: 1207,
	pid: 271,
	rootId: 11,
	level: 3
},
	"1208": {
	name: "Ardèche",
	id: 1208,
	pid: 271,
	rootId: 11,
	level: 3
},
	"1209": {
	name: "Drôme",
	id: 1209,
	pid: 271,
	rootId: 11,
	level: 3
},
	"1210": {
	name: "Isère",
	id: 1210,
	pid: 271,
	rootId: 11,
	level: 3
},
	"1211": {
	name: "Loire",
	id: 1211,
	pid: 271,
	rootId: 11,
	level: 3
},
	"1212": {
	name: "Rhône",
	id: 1212,
	pid: 271,
	rootId: 11,
	level: 3
},
	"1213": {
	name: "Savoie",
	id: 1213,
	pid: 271,
	rootId: 11,
	level: 3
},
	"1214": {
	name: "Haute-Savoie",
	id: 1214,
	pid: 271,
	rootId: 11,
	level: 3
},
	"1215": {
	name: "Allier",
	id: 1215,
	pid: 272,
	rootId: 11,
	level: 3
},
	"1216": {
	name: "Cantal",
	id: 1216,
	pid: 272,
	rootId: 11,
	level: 3
},
	"1217": {
	name: "Haute-Loire",
	id: 1217,
	pid: 272,
	rootId: 11,
	level: 3
},
	"1218": {
	name: "Puy-de-Dôme",
	id: 1218,
	pid: 272,
	rootId: 11,
	level: 3
},
	"1219": {
	name: "Aude",
	id: 1219,
	pid: 273,
	rootId: 11,
	level: 3
},
	"1220": {
	name: "Gard",
	id: 1220,
	pid: 273,
	rootId: 11,
	level: 3
},
	"1221": {
	name: "Hérault",
	id: 1221,
	pid: 273,
	rootId: 11,
	level: 3
},
	"1222": {
	name: "Lozère",
	id: 1222,
	pid: 273,
	rootId: 11,
	level: 3
},
	"1223": {
	name: "Pyrénées-Orientales",
	id: 1223,
	pid: 273,
	rootId: 11,
	level: 3
},
	"1224": {
	name: "Alpes-de-Haute-Provence",
	id: 1224,
	pid: 274,
	rootId: 11,
	level: 3
},
	"1225": {
	name: "Hautes-Alpes",
	id: 1225,
	pid: 274,
	rootId: 11,
	level: 3
},
	"1226": {
	name: "Alpes-Maritimes",
	id: 1226,
	pid: 274,
	rootId: 11,
	level: 3
},
	"1227": {
	name: "Bouches-du-Rhône",
	id: 1227,
	pid: 274,
	rootId: 11,
	level: 3
},
	"1228": {
	name: "Var",
	id: 1228,
	pid: 274,
	rootId: 11,
	level: 3
},
	"1229": {
	name: "Vaucluse",
	id: 1229,
	pid: 274,
	rootId: 11,
	level: 3
},
	"1230": {
	name: "Corse-du-Sud",
	id: 1230,
	pid: 275,
	rootId: 11,
	level: 3
},
	"1231": {
	name: "Haute-Corse",
	id: 1231,
	pid: 275,
	rootId: 11,
	level: 3
},
	"1232": {
	name: "Guadeloupe",
	id: 1232,
	pid: 276,
	rootId: 11,
	level: 3
},
	"1233": {
	name: "Martinique",
	id: 1233,
	pid: 277,
	rootId: 11,
	level: 3
},
	"1234": {
	name: "Guyane",
	id: 1234,
	pid: 278,
	rootId: 11,
	level: 3
},
	"1235": {
	name: "La Réunion",
	id: 1235,
	pid: 279,
	rootId: 11,
	level: 3
},
	"1236": {
	name: "Evros",
	id: 1236,
	pid: 280,
	rootId: 12,
	level: 3
},
	"1237": {
	name: "Xanthi",
	id: 1237,
	pid: 280,
	rootId: 12,
	level: 3
},
	"1238": {
	name: "Rodopi",
	id: 1238,
	pid: 280,
	rootId: 12,
	level: 3
},
	"1239": {
	name: "Drama",
	id: 1239,
	pid: 280,
	rootId: 12,
	level: 3
},
	"1240": {
	name: "Thasos, Kavala",
	id: 1240,
	pid: 280,
	rootId: 12,
	level: 3
},
	"1241": {
	name: "Imathia",
	id: 1241,
	pid: 281,
	rootId: 12,
	level: 3
},
	"1242": {
	name: "Thessaloniki",
	id: 1242,
	pid: 281,
	rootId: 12,
	level: 3
},
	"1243": {
	name: "Kilkis",
	id: 1243,
	pid: 281,
	rootId: 12,
	level: 3
},
	"1244": {
	name: "Pella",
	id: 1244,
	pid: 281,
	rootId: 12,
	level: 3
},
	"1245": {
	name: "Pieria",
	id: 1245,
	pid: 281,
	rootId: 12,
	level: 3
},
	"1246": {
	name: "Serres",
	id: 1246,
	pid: 281,
	rootId: 12,
	level: 3
},
	"1247": {
	name: "Chalkidiki",
	id: 1247,
	pid: 281,
	rootId: 12,
	level: 3
},
	"1248": {
	name: "Grevena",
	id: 1248,
	pid: 282,
	rootId: 12,
	level: 3
},
	"1249": {
	name: "Kastoria",
	id: 1249,
	pid: 282,
	rootId: 12,
	level: 3
},
	"1250": {
	name: "Kozani",
	id: 1250,
	pid: 282,
	rootId: 12,
	level: 3
},
	"1251": {
	name: "Florina",
	id: 1251,
	pid: 282,
	rootId: 12,
	level: 3
},
	"1252": {
	name: "Karditsa",
	id: 1252,
	pid: 283,
	rootId: 12,
	level: 3
},
	"1253": {
	name: "Larisa",
	id: 1253,
	pid: 283,
	rootId: 12,
	level: 3
},
	"1254": {
	name: "Magnisia",
	id: 1254,
	pid: 283,
	rootId: 12,
	level: 3
},
	"1255": {
	name: "Trikala",
	id: 1255,
	pid: 283,
	rootId: 12,
	level: 3
},
	"1256": {
	name: "Arta",
	id: 1256,
	pid: 284,
	rootId: 12,
	level: 3
},
	"1257": {
	name: "Thesprotia",
	id: 1257,
	pid: 284,
	rootId: 12,
	level: 3
},
	"1258": {
	name: "Ioannina",
	id: 1258,
	pid: 284,
	rootId: 12,
	level: 3
},
	"1259": {
	name: "Preveza",
	id: 1259,
	pid: 284,
	rootId: 12,
	level: 3
},
	"1260": {
	name: "Zakynthos",
	id: 1260,
	pid: 285,
	rootId: 12,
	level: 3
},
	"1261": {
	name: "Kerkyra",
	id: 1261,
	pid: 285,
	rootId: 12,
	level: 3
},
	"1262": {
	name: "Ithaki, Kefallinia",
	id: 1262,
	pid: 285,
	rootId: 12,
	level: 3
},
	"1263": {
	name: "Lefkada",
	id: 1263,
	pid: 285,
	rootId: 12,
	level: 3
},
	"1264": {
	name: "Aitoloakarnania",
	id: 1264,
	pid: 286,
	rootId: 12,
	level: 3
},
	"1265": {
	name: "Achaia",
	id: 1265,
	pid: 286,
	rootId: 12,
	level: 3
},
	"1266": {
	name: "Ileia",
	id: 1266,
	pid: 286,
	rootId: 12,
	level: 3
},
	"1267": {
	name: "Voiotia",
	id: 1267,
	pid: 287,
	rootId: 12,
	level: 3
},
	"1268": {
	name: "Evvoia",
	id: 1268,
	pid: 287,
	rootId: 12,
	level: 3
},
	"1269": {
	name: "Evrytania",
	id: 1269,
	pid: 287,
	rootId: 12,
	level: 3
},
	"1270": {
	name: "Fthiotida",
	id: 1270,
	pid: 287,
	rootId: 12,
	level: 3
},
	"1271": {
	name: "Fokida",
	id: 1271,
	pid: 287,
	rootId: 12,
	level: 3
},
	"1272": {
	name: "Argolida",
	id: 1272,
	pid: 288,
	rootId: 12,
	level: 3
},
	"1273": {
	name: "Arkadia",
	id: 1273,
	pid: 288,
	rootId: 12,
	level: 3
},
	"1274": {
	name: "Korinthia",
	id: 1274,
	pid: 288,
	rootId: 12,
	level: 3
},
	"1275": {
	name: "Lakonia",
	id: 1275,
	pid: 288,
	rootId: 12,
	level: 3
},
	"1276": {
	name: "Messinia",
	id: 1276,
	pid: 288,
	rootId: 12,
	level: 3
},
	"1277": {
	name: "Attiki",
	id: 1277,
	pid: 289,
	rootId: 12,
	level: 3
},
	"1278": {
	name: "Lesvos, Limnos",
	id: 1278,
	pid: 290,
	rootId: 12,
	level: 3
},
	"1279": {
	name: "Ikaria, Samos",
	id: 1279,
	pid: 290,
	rootId: 12,
	level: 3
},
	"1280": {
	name: "Chios",
	id: 1280,
	pid: 290,
	rootId: 12,
	level: 3
},
	"1281": {
	name: "Kalymnos, Karpathos, Kos, Rodos",
	id: 1281,
	pid: 291,
	rootId: 12,
	level: 3
},
	"1282": {
	name: "Andros, Thira, Kea, Milos, Mykonos, Naxos, Paros,  Syros, Tinos",
	id: 1282,
	pid: 291,
	rootId: 12,
	level: 3
},
	"1283": {
	name: "Irakleio",
	id: 1283,
	pid: 292,
	rootId: 12,
	level: 3
},
	"1284": {
	name: "Lasithi",
	id: 1284,
	pid: 292,
	rootId: 12,
	level: 3
},
	"1285": {
	name: "Rethymni",
	id: 1285,
	pid: 292,
	rootId: 12,
	level: 3
},
	"1286": {
	name: "Chania",
	id: 1286,
	pid: 292,
	rootId: 12,
	level: 3
},
	"1287": {
	name: "Grad Zagreb",
	id: 1287,
	pid: 293,
	rootId: 13,
	level: 3
},
	"1288": {
	name: "Zagrebačka županija",
	id: 1288,
	pid: 293,
	rootId: 13,
	level: 3
},
	"1289": {
	name: "Krapinsko-zagorska županija",
	id: 1289,
	pid: 293,
	rootId: 13,
	level: 3
},
	"1290": {
	name: "Varaždinska županija",
	id: 1290,
	pid: 293,
	rootId: 13,
	level: 3
},
	"1291": {
	name: "Koprivničko-križevačka županija",
	id: 1291,
	pid: 293,
	rootId: 13,
	level: 3
},
	"1292": {
	name: "Međimurska županija",
	id: 1292,
	pid: 293,
	rootId: 13,
	level: 3
},
	"1293": {
	name: "Bjelovarsko-bilogorska županija",
	id: 1293,
	pid: 294,
	rootId: 13,
	level: 3
},
	"1294": {
	name: "Virovitičko-podravska županija",
	id: 1294,
	pid: 294,
	rootId: 13,
	level: 3
},
	"1295": {
	name: "Požeško-slavonska županija",
	id: 1295,
	pid: 294,
	rootId: 13,
	level: 3
},
	"1296": {
	name: "Brodsko-posavska županija",
	id: 1296,
	pid: 294,
	rootId: 13,
	level: 3
},
	"1297": {
	name: "Osječko-baranjska županija",
	id: 1297,
	pid: 294,
	rootId: 13,
	level: 3
},
	"1298": {
	name: "Vukovarsko-srijemska županija",
	id: 1298,
	pid: 294,
	rootId: 13,
	level: 3
},
	"1299": {
	name: "Karlovačka županija",
	id: 1299,
	pid: 294,
	rootId: 13,
	level: 3
},
	"1300": {
	name: "Sisačko-moslavačka županija",
	id: 1300,
	pid: 294,
	rootId: 13,
	level: 3
},
	"1301": {
	name: "Primorsko-goranska županija",
	id: 1301,
	pid: 295,
	rootId: 13,
	level: 3
},
	"1302": {
	name: "Ličko-senjska županija",
	id: 1302,
	pid: 295,
	rootId: 13,
	level: 3
},
	"1303": {
	name: "Zadarska županija",
	id: 1303,
	pid: 295,
	rootId: 13,
	level: 3
},
	"1304": {
	name: "Šibensko-kninska županija",
	id: 1304,
	pid: 295,
	rootId: 13,
	level: 3
},
	"1305": {
	name: "Splitsko-dalmatinska županija",
	id: 1305,
	pid: 295,
	rootId: 13,
	level: 3
},
	"1306": {
	name: "Istarska županija",
	id: 1306,
	pid: 295,
	rootId: 13,
	level: 3
},
	"1307": {
	name: "Dubrovačko-neretvanska županija",
	id: 1307,
	pid: 295,
	rootId: 13,
	level: 3
},
	"1308": {
	name: "Budapest",
	id: 1308,
	pid: 296,
	rootId: 14,
	level: 3
},
	"1309": {
	name: "Pest",
	id: 1309,
	pid: 296,
	rootId: 14,
	level: 3
},
	"1310": {
	name: "Fejér",
	id: 1310,
	pid: 297,
	rootId: 14,
	level: 3
},
	"1311": {
	name: "Komárom-Esztergom",
	id: 1311,
	pid: 297,
	rootId: 14,
	level: 3
},
	"1312": {
	name: "Veszprém",
	id: 1312,
	pid: 297,
	rootId: 14,
	level: 3
},
	"1313": {
	name: "Győr-Moson-Sopron",
	id: 1313,
	pid: 298,
	rootId: 14,
	level: 3
},
	"1314": {
	name: "Vas",
	id: 1314,
	pid: 298,
	rootId: 14,
	level: 3
},
	"1315": {
	name: "Zala",
	id: 1315,
	pid: 298,
	rootId: 14,
	level: 3
},
	"1316": {
	name: "Baranya",
	id: 1316,
	pid: 299,
	rootId: 14,
	level: 3
},
	"1317": {
	name: "Somogy",
	id: 1317,
	pid: 299,
	rootId: 14,
	level: 3
},
	"1318": {
	name: "Tolna",
	id: 1318,
	pid: 299,
	rootId: 14,
	level: 3
},
	"1319": {
	name: "Borsod-Abaúj-Zemplén",
	id: 1319,
	pid: 300,
	rootId: 14,
	level: 3
},
	"1320": {
	name: "Heves",
	id: 1320,
	pid: 300,
	rootId: 14,
	level: 3
},
	"1321": {
	name: "Nógrád",
	id: 1321,
	pid: 300,
	rootId: 14,
	level: 3
},
	"1322": {
	name: "Hajdú-Bihar",
	id: 1322,
	pid: 301,
	rootId: 14,
	level: 3
},
	"1323": {
	name: "Jász-Nagykun-Szolnok",
	id: 1323,
	pid: 301,
	rootId: 14,
	level: 3
},
	"1324": {
	name: "Szabolcs-Szatmár-Bereg",
	id: 1324,
	pid: 301,
	rootId: 14,
	level: 3
},
	"1325": {
	name: "Bács-Kiskun",
	id: 1325,
	pid: 302,
	rootId: 14,
	level: 3
},
	"1326": {
	name: "Békés",
	id: 1326,
	pid: 302,
	rootId: 14,
	level: 3
},
	"1327": {
	name: "Csongrád",
	id: 1327,
	pid: 302,
	rootId: 14,
	level: 3
},
	"1328": {
	name: "Border",
	id: 1328,
	pid: 303,
	rootId: 15,
	level: 3
},
	"1329": {
	name: "Midland",
	id: 1329,
	pid: 303,
	rootId: 15,
	level: 3
},
	"1330": {
	name: "West",
	id: 1330,
	pid: 303,
	rootId: 15,
	level: 3
},
	"1331": {
	name: "Dublin",
	id: 1331,
	pid: 304,
	rootId: 15,
	level: 3
},
	"1332": {
	name: "Mid-East",
	id: 1332,
	pid: 304,
	rootId: 15,
	level: 3
},
	"1333": {
	name: "Mid-West",
	id: 1333,
	pid: 304,
	rootId: 15,
	level: 3
},
	"1334": {
	name: "South-East",
	id: 1334,
	pid: 304,
	rootId: 15,
	level: 3
},
	"1335": {
	name: "South-West",
	id: 1335,
	pid: 304,
	rootId: 15,
	level: 3
},
	"1336": {
	name: "Ísland",
	id: 1336,
	pid: 305,
	rootId: 16,
	level: 3
},
	"1337": {
	name: "Torino",
	id: 1337,
	pid: 306,
	rootId: 17,
	level: 3
},
	"1338": {
	name: "Vercelli",
	id: 1338,
	pid: 306,
	rootId: 17,
	level: 3
},
	"1339": {
	name: "Biella",
	id: 1339,
	pid: 306,
	rootId: 17,
	level: 3
},
	"1340": {
	name: "Verbano-Cusio-Ossola",
	id: 1340,
	pid: 306,
	rootId: 17,
	level: 3
},
	"1341": {
	name: "Novara",
	id: 1341,
	pid: 306,
	rootId: 17,
	level: 3
},
	"1342": {
	name: "Cuneo",
	id: 1342,
	pid: 306,
	rootId: 17,
	level: 3
},
	"1343": {
	name: "Asti",
	id: 1343,
	pid: 306,
	rootId: 17,
	level: 3
},
	"1344": {
	name: "Alessandria",
	id: 1344,
	pid: 306,
	rootId: 17,
	level: 3
},
	"1345": {
	name: "Valle d'Aosta/Vallée d'Aoste",
	id: 1345,
	pid: 307,
	rootId: 17,
	level: 3
},
	"1346": {
	name: "Imperia",
	id: 1346,
	pid: 308,
	rootId: 17,
	level: 3
},
	"1347": {
	name: "Savona",
	id: 1347,
	pid: 308,
	rootId: 17,
	level: 3
},
	"1348": {
	name: "Genova",
	id: 1348,
	pid: 308,
	rootId: 17,
	level: 3
},
	"1349": {
	name: "La Spezia",
	id: 1349,
	pid: 308,
	rootId: 17,
	level: 3
},
	"1350": {
	name: "Varese",
	id: 1350,
	pid: 309,
	rootId: 17,
	level: 3
},
	"1351": {
	name: "Como",
	id: 1351,
	pid: 309,
	rootId: 17,
	level: 3
},
	"1352": {
	name: "Lecco",
	id: 1352,
	pid: 309,
	rootId: 17,
	level: 3
},
	"1353": {
	name: "Sondrio",
	id: 1353,
	pid: 309,
	rootId: 17,
	level: 3
},
	"1354": {
	name: "Milano",
	id: 1354,
	pid: 309,
	rootId: 17,
	level: 3
},
	"1355": {
	name: "Bergamo",
	id: 1355,
	pid: 309,
	rootId: 17,
	level: 3
},
	"1356": {
	name: "Brescia",
	id: 1356,
	pid: 309,
	rootId: 17,
	level: 3
},
	"1357": {
	name: "Pavia",
	id: 1357,
	pid: 309,
	rootId: 17,
	level: 3
},
	"1358": {
	name: "Lodi",
	id: 1358,
	pid: 309,
	rootId: 17,
	level: 3
},
	"1359": {
	name: "Cremona",
	id: 1359,
	pid: 309,
	rootId: 17,
	level: 3
},
	"1360": {
	name: "Mantova",
	id: 1360,
	pid: 309,
	rootId: 17,
	level: 3
},
	"1361": {
	name: "Bolzano-Bozen",
	id: 1361,
	pid: 310,
	rootId: 17,
	level: 3
},
	"1362": {
	name: "Trento",
	id: 1362,
	pid: 311,
	rootId: 17,
	level: 3
},
	"1363": {
	name: "Verona",
	id: 1363,
	pid: 312,
	rootId: 17,
	level: 3
},
	"1364": {
	name: "Vicenza",
	id: 1364,
	pid: 312,
	rootId: 17,
	level: 3
},
	"1365": {
	name: "Belluno",
	id: 1365,
	pid: 312,
	rootId: 17,
	level: 3
},
	"1366": {
	name: "Treviso",
	id: 1366,
	pid: 312,
	rootId: 17,
	level: 3
},
	"1367": {
	name: "Venezia",
	id: 1367,
	pid: 312,
	rootId: 17,
	level: 3
},
	"1368": {
	name: "Padova",
	id: 1368,
	pid: 312,
	rootId: 17,
	level: 3
},
	"1369": {
	name: "Rovigo",
	id: 1369,
	pid: 312,
	rootId: 17,
	level: 3
},
	"1370": {
	name: "Pordenone",
	id: 1370,
	pid: 313,
	rootId: 17,
	level: 3
},
	"1371": {
	name: "Udine",
	id: 1371,
	pid: 313,
	rootId: 17,
	level: 3
},
	"1372": {
	name: "Gorizia",
	id: 1372,
	pid: 313,
	rootId: 17,
	level: 3
},
	"1373": {
	name: "Trieste",
	id: 1373,
	pid: 313,
	rootId: 17,
	level: 3
},
	"1374": {
	name: "Piacenza",
	id: 1374,
	pid: 314,
	rootId: 17,
	level: 3
},
	"1375": {
	name: "Parma",
	id: 1375,
	pid: 314,
	rootId: 17,
	level: 3
},
	"1376": {
	name: "Reggio nell'Emilia",
	id: 1376,
	pid: 314,
	rootId: 17,
	level: 3
},
	"1377": {
	name: "Modena",
	id: 1377,
	pid: 314,
	rootId: 17,
	level: 3
},
	"1378": {
	name: "Bologna",
	id: 1378,
	pid: 314,
	rootId: 17,
	level: 3
},
	"1379": {
	name: "Ferrara",
	id: 1379,
	pid: 314,
	rootId: 17,
	level: 3
},
	"1380": {
	name: "Ravenna",
	id: 1380,
	pid: 314,
	rootId: 17,
	level: 3
},
	"1381": {
	name: "Forlì-Cesena",
	id: 1381,
	pid: 314,
	rootId: 17,
	level: 3
},
	"1382": {
	name: "Rimini",
	id: 1382,
	pid: 314,
	rootId: 17,
	level: 3
},
	"1383": {
	name: "Massa-Carrara",
	id: 1383,
	pid: 315,
	rootId: 17,
	level: 3
},
	"1384": {
	name: "Lucca",
	id: 1384,
	pid: 315,
	rootId: 17,
	level: 3
},
	"1385": {
	name: "Pistoia",
	id: 1385,
	pid: 315,
	rootId: 17,
	level: 3
},
	"1386": {
	name: "Firenze",
	id: 1386,
	pid: 315,
	rootId: 17,
	level: 3
},
	"1387": {
	name: "Prato",
	id: 1387,
	pid: 315,
	rootId: 17,
	level: 3
},
	"1388": {
	name: "Livorno",
	id: 1388,
	pid: 315,
	rootId: 17,
	level: 3
},
	"1389": {
	name: "Pisa",
	id: 1389,
	pid: 315,
	rootId: 17,
	level: 3
},
	"1390": {
	name: "Arezzo",
	id: 1390,
	pid: 315,
	rootId: 17,
	level: 3
},
	"1391": {
	name: "Siena",
	id: 1391,
	pid: 315,
	rootId: 17,
	level: 3
},
	"1392": {
	name: "Grosseto",
	id: 1392,
	pid: 315,
	rootId: 17,
	level: 3
},
	"1393": {
	name: "Perugia",
	id: 1393,
	pid: 316,
	rootId: 17,
	level: 3
},
	"1394": {
	name: "Terni",
	id: 1394,
	pid: 316,
	rootId: 17,
	level: 3
},
	"1395": {
	name: "Pesaro e Urbino",
	id: 1395,
	pid: 317,
	rootId: 17,
	level: 3
},
	"1396": {
	name: "Ancona",
	id: 1396,
	pid: 317,
	rootId: 17,
	level: 3
},
	"1397": {
	name: "Macerata",
	id: 1397,
	pid: 317,
	rootId: 17,
	level: 3
},
	"1398": {
	name: "Ascoli Piceno",
	id: 1398,
	pid: 317,
	rootId: 17,
	level: 3
},
	"1399": {
	name: "Viterbo",
	id: 1399,
	pid: 318,
	rootId: 17,
	level: 3
},
	"1400": {
	name: "Rieti",
	id: 1400,
	pid: 318,
	rootId: 17,
	level: 3
},
	"1401": {
	name: "Roma",
	id: 1401,
	pid: 318,
	rootId: 17,
	level: 3
},
	"1402": {
	name: "Latina",
	id: 1402,
	pid: 318,
	rootId: 17,
	level: 3
},
	"1403": {
	name: "Frosinone",
	id: 1403,
	pid: 318,
	rootId: 17,
	level: 3
},
	"1404": {
	name: "L'Aquila",
	id: 1404,
	pid: 319,
	rootId: 17,
	level: 3
},
	"1405": {
	name: "Teramo",
	id: 1405,
	pid: 319,
	rootId: 17,
	level: 3
},
	"1406": {
	name: "Pescara",
	id: 1406,
	pid: 319,
	rootId: 17,
	level: 3
},
	"1407": {
	name: "Chieti",
	id: 1407,
	pid: 319,
	rootId: 17,
	level: 3
},
	"1408": {
	name: "Isernia",
	id: 1408,
	pid: 320,
	rootId: 17,
	level: 3
},
	"1409": {
	name: "Campobasso",
	id: 1409,
	pid: 320,
	rootId: 17,
	level: 3
},
	"1410": {
	name: "Caserta",
	id: 1410,
	pid: 321,
	rootId: 17,
	level: 3
},
	"1411": {
	name: "Benevento",
	id: 1411,
	pid: 321,
	rootId: 17,
	level: 3
},
	"1412": {
	name: "Napoli",
	id: 1412,
	pid: 321,
	rootId: 17,
	level: 3
},
	"1413": {
	name: "Avellino",
	id: 1413,
	pid: 321,
	rootId: 17,
	level: 3
},
	"1414": {
	name: "Salerno",
	id: 1414,
	pid: 321,
	rootId: 17,
	level: 3
},
	"1415": {
	name: "Foggia",
	id: 1415,
	pid: 322,
	rootId: 17,
	level: 3
},
	"1416": {
	name: "Bari",
	id: 1416,
	pid: 322,
	rootId: 17,
	level: 3
},
	"1417": {
	name: "Taranto",
	id: 1417,
	pid: 322,
	rootId: 17,
	level: 3
},
	"1418": {
	name: "Brindisi",
	id: 1418,
	pid: 322,
	rootId: 17,
	level: 3
},
	"1419": {
	name: "Lecce",
	id: 1419,
	pid: 322,
	rootId: 17,
	level: 3
},
	"1420": {
	name: "Potenza",
	id: 1420,
	pid: 323,
	rootId: 17,
	level: 3
},
	"1421": {
	name: "Matera",
	id: 1421,
	pid: 323,
	rootId: 17,
	level: 3
},
	"1422": {
	name: "Cosenza",
	id: 1422,
	pid: 324,
	rootId: 17,
	level: 3
},
	"1423": {
	name: "Crotone",
	id: 1423,
	pid: 324,
	rootId: 17,
	level: 3
},
	"1424": {
	name: "Catanzaro",
	id: 1424,
	pid: 324,
	rootId: 17,
	level: 3
},
	"1425": {
	name: "Vibo Valentia",
	id: 1425,
	pid: 324,
	rootId: 17,
	level: 3
},
	"1426": {
	name: "Reggio di Calabria",
	id: 1426,
	pid: 324,
	rootId: 17,
	level: 3
},
	"1427": {
	name: "Trapani",
	id: 1427,
	pid: 325,
	rootId: 17,
	level: 3
},
	"1428": {
	name: "Palermo",
	id: 1428,
	pid: 325,
	rootId: 17,
	level: 3
},
	"1429": {
	name: "Messina",
	id: 1429,
	pid: 325,
	rootId: 17,
	level: 3
},
	"1430": {
	name: "Agrigento",
	id: 1430,
	pid: 325,
	rootId: 17,
	level: 3
},
	"1431": {
	name: "Caltanissetta",
	id: 1431,
	pid: 325,
	rootId: 17,
	level: 3
},
	"1432": {
	name: "Enna",
	id: 1432,
	pid: 325,
	rootId: 17,
	level: 3
},
	"1433": {
	name: "Catania",
	id: 1433,
	pid: 325,
	rootId: 17,
	level: 3
},
	"1434": {
	name: "Ragusa",
	id: 1434,
	pid: 325,
	rootId: 17,
	level: 3
},
	"1435": {
	name: "Siracusa",
	id: 1435,
	pid: 325,
	rootId: 17,
	level: 3
},
	"1436": {
	name: "Sassari",
	id: 1436,
	pid: 326,
	rootId: 17,
	level: 3
},
	"1437": {
	name: "Nuoro",
	id: 1437,
	pid: 326,
	rootId: 17,
	level: 3
},
	"1438": {
	name: "Oristano",
	id: 1438,
	pid: 326,
	rootId: 17,
	level: 3
},
	"1439": {
	name: "Cagliari",
	id: 1439,
	pid: 326,
	rootId: 17,
	level: 3
},
	"1440": {
	name: "Liechtenstein",
	id: 1440,
	pid: 327,
	rootId: 18,
	level: 3
},
	"1441": {
	name: "Alytaus apskritis",
	id: 1441,
	pid: 328,
	rootId: 19,
	level: 3
},
	"1442": {
	name: "Kauno apskritis",
	id: 1442,
	pid: 328,
	rootId: 19,
	level: 3
},
	"1443": {
	name: "Klaipėdos apskritis",
	id: 1443,
	pid: 328,
	rootId: 19,
	level: 3
},
	"1444": {
	name: "Marijampolės apskritis",
	id: 1444,
	pid: 328,
	rootId: 19,
	level: 3
},
	"1445": {
	name: "Panevėžio apskritis",
	id: 1445,
	pid: 328,
	rootId: 19,
	level: 3
},
	"1446": {
	name: "Šiaulių apskritis",
	id: 1446,
	pid: 328,
	rootId: 19,
	level: 3
},
	"1447": {
	name: "Tauragės apskritis",
	id: 1447,
	pid: 328,
	rootId: 19,
	level: 3
},
	"1448": {
	name: "Telšių apskritis",
	id: 1448,
	pid: 328,
	rootId: 19,
	level: 3
},
	"1449": {
	name: "Utenos apskritis",
	id: 1449,
	pid: 328,
	rootId: 19,
	level: 3
},
	"1450": {
	name: "Vilniaus apskritis",
	id: 1450,
	pid: 328,
	rootId: 19,
	level: 3
},
	"1451": {
	name: "Luxembourg",
	id: 1451,
	pid: 329,
	rootId: 20,
	level: 3
},
	"1452": {
	name: "Kurzeme",
	id: 1452,
	pid: 330,
	rootId: 21,
	level: 3
},
	"1453": {
	name: "Latgale",
	id: 1453,
	pid: 330,
	rootId: 21,
	level: 3
},
	"1454": {
	name: "Rīga",
	id: 1454,
	pid: 330,
	rootId: 21,
	level: 3
},
	"1455": {
	name: "Pierīga",
	id: 1455,
	pid: 330,
	rootId: 21,
	level: 3
},
	"1456": {
	name: "Vidzeme",
	id: 1456,
	pid: 330,
	rootId: 21,
	level: 3
},
	"1457": {
	name: "Zemgale",
	id: 1457,
	pid: 330,
	rootId: 21,
	level: 3
},
	"1458": {
	name: "Malta",
	id: 1458,
	pid: 331,
	rootId: 22,
	level: 3
},
	"1459": {
	name: "Gozo and Comino/Għawdex u Kemmuna",
	id: 1459,
	pid: 331,
	rootId: 22,
	level: 3
},
	"1460": {
	name: "Oost-Groningen",
	id: 1460,
	pid: 332,
	rootId: 23,
	level: 3
},
	"1461": {
	name: "Delfzijl en omgeving",
	id: 1461,
	pid: 332,
	rootId: 23,
	level: 3
},
	"1462": {
	name: "Overig Groningen",
	id: 1462,
	pid: 332,
	rootId: 23,
	level: 3
},
	"1463": {
	name: "Noord-Friesland",
	id: 1463,
	pid: 333,
	rootId: 23,
	level: 3
},
	"1464": {
	name: "Zuidwest-Friesland",
	id: 1464,
	pid: 333,
	rootId: 23,
	level: 3
},
	"1465": {
	name: "Zuidoost-Friesland",
	id: 1465,
	pid: 333,
	rootId: 23,
	level: 3
},
	"1466": {
	name: "Noord-Drenthe",
	id: 1466,
	pid: 334,
	rootId: 23,
	level: 3
},
	"1467": {
	name: "Zuidoost-Drenthe",
	id: 1467,
	pid: 334,
	rootId: 23,
	level: 3
},
	"1468": {
	name: "Zuidwest-Drenthe",
	id: 1468,
	pid: 334,
	rootId: 23,
	level: 3
},
	"1469": {
	name: "Noord-Overijssel",
	id: 1469,
	pid: 335,
	rootId: 23,
	level: 3
},
	"1470": {
	name: "Zuidwest-Overijssel",
	id: 1470,
	pid: 335,
	rootId: 23,
	level: 3
},
	"1471": {
	name: "Twente",
	id: 1471,
	pid: 335,
	rootId: 23,
	level: 3
},
	"1472": {
	name: "Veluwe",
	id: 1472,
	pid: 336,
	rootId: 23,
	level: 3
},
	"1473": {
	name: "Achterhoek",
	id: 1473,
	pid: 336,
	rootId: 23,
	level: 3
},
	"1474": {
	name: "Arnhem/Nijmegen",
	id: 1474,
	pid: 336,
	rootId: 23,
	level: 3
},
	"1475": {
	name: "Zuidwest-Gelderland",
	id: 1475,
	pid: 336,
	rootId: 23,
	level: 3
},
	"1476": {
	name: "Flevoland",
	id: 1476,
	pid: 337,
	rootId: 23,
	level: 3
},
	"1477": {
	name: "Utrecht",
	id: 1477,
	pid: 338,
	rootId: 23,
	level: 3
},
	"1478": {
	name: "Kop van Noord-Holland",
	id: 1478,
	pid: 339,
	rootId: 23,
	level: 3
},
	"1479": {
	name: "Alkmaar en omgeving",
	id: 1479,
	pid: 339,
	rootId: 23,
	level: 3
},
	"1480": {
	name: "IJmond",
	id: 1480,
	pid: 339,
	rootId: 23,
	level: 3
},
	"1481": {
	name: "Agglomeratie Haarlem",
	id: 1481,
	pid: 339,
	rootId: 23,
	level: 3
},
	"1482": {
	name: "Zaanstreek",
	id: 1482,
	pid: 339,
	rootId: 23,
	level: 3
},
	"1483": {
	name: "Groot-Amsterdam",
	id: 1483,
	pid: 339,
	rootId: 23,
	level: 3
},
	"1484": {
	name: "Het Gooi en Vechtstreek",
	id: 1484,
	pid: 339,
	rootId: 23,
	level: 3
},
	"1485": {
	name: "Agglomeratie Leiden en Bollenstreek",
	id: 1485,
	pid: 340,
	rootId: 23,
	level: 3
},
	"1486": {
	name: "Agglomeratie 's-Gravenhage",
	id: 1486,
	pid: 340,
	rootId: 23,
	level: 3
},
	"1487": {
	name: "Delft en Westland",
	id: 1487,
	pid: 340,
	rootId: 23,
	level: 3
},
	"1488": {
	name: "Oost-Zuid-Holland",
	id: 1488,
	pid: 340,
	rootId: 23,
	level: 3
},
	"1489": {
	name: "Groot-Rijnmond",
	id: 1489,
	pid: 340,
	rootId: 23,
	level: 3
},
	"1490": {
	name: "Zuidoost-Zuid-Holland",
	id: 1490,
	pid: 340,
	rootId: 23,
	level: 3
},
	"1491": {
	name: "Zeeuwsch-Vlaanderen",
	id: 1491,
	pid: 341,
	rootId: 23,
	level: 3
},
	"1492": {
	name: "Overig Zeeland",
	id: 1492,
	pid: 341,
	rootId: 23,
	level: 3
},
	"1493": {
	name: "West-Noord-Brabant",
	id: 1493,
	pid: 342,
	rootId: 23,
	level: 3
},
	"1494": {
	name: "Midden-Noord-Brabant",
	id: 1494,
	pid: 342,
	rootId: 23,
	level: 3
},
	"1495": {
	name: "Noordoost-Noord-Brabant",
	id: 1495,
	pid: 342,
	rootId: 23,
	level: 3
},
	"1496": {
	name: "Zuidoost-Noord-Brabant",
	id: 1496,
	pid: 342,
	rootId: 23,
	level: 3
},
	"1497": {
	name: "Noord-Limburg",
	id: 1497,
	pid: 343,
	rootId: 23,
	level: 3
},
	"1498": {
	name: "Midden-Limburg",
	id: 1498,
	pid: 343,
	rootId: 23,
	level: 3
},
	"1499": {
	name: "Zuid-Limburg",
	id: 1499,
	pid: 343,
	rootId: 23,
	level: 3
},
	"1500": {
	name: "Oslo",
	id: 1500,
	pid: 344,
	rootId: 24,
	level: 3
},
	"1501": {
	name: "Akershus",
	id: 1501,
	pid: 344,
	rootId: 24,
	level: 3
},
	"1502": {
	name: "Hedmark",
	id: 1502,
	pid: 345,
	rootId: 24,
	level: 3
},
	"1503": {
	name: "Oppland",
	id: 1503,
	pid: 345,
	rootId: 24,
	level: 3
},
	"1504": {
	name: "Østfold",
	id: 1504,
	pid: 346,
	rootId: 24,
	level: 3
},
	"1505": {
	name: "Buskerud",
	id: 1505,
	pid: 346,
	rootId: 24,
	level: 3
},
	"1506": {
	name: "Vestfold",
	id: 1506,
	pid: 346,
	rootId: 24,
	level: 3
},
	"1507": {
	name: "Telemark",
	id: 1507,
	pid: 346,
	rootId: 24,
	level: 3
},
	"1508": {
	name: "Aust-Agder",
	id: 1508,
	pid: 347,
	rootId: 24,
	level: 3
},
	"1509": {
	name: "Vest-Agder",
	id: 1509,
	pid: 347,
	rootId: 24,
	level: 3
},
	"1510": {
	name: "Rogaland",
	id: 1510,
	pid: 347,
	rootId: 24,
	level: 3
},
	"1511": {
	name: "Hordaland",
	id: 1511,
	pid: 348,
	rootId: 24,
	level: 3
},
	"1512": {
	name: "Sogn og Fjordane",
	id: 1512,
	pid: 348,
	rootId: 24,
	level: 3
},
	"1513": {
	name: "Møre og Romsdal",
	id: 1513,
	pid: 348,
	rootId: 24,
	level: 3
},
	"1514": {
	name: "Sør-Trøndelag",
	id: 1514,
	pid: 349,
	rootId: 24,
	level: 3
},
	"1515": {
	name: "Nord-Trøndelag",
	id: 1515,
	pid: 349,
	rootId: 24,
	level: 3
},
	"1516": {
	name: "Nordland",
	id: 1516,
	pid: 350,
	rootId: 24,
	level: 3
},
	"1517": {
	name: "Troms",
	id: 1517,
	pid: 350,
	rootId: 24,
	level: 3
},
	"1518": {
	name: "Finnmark",
	id: 1518,
	pid: 350,
	rootId: 24,
	level: 3
},
	"1519": {
	name: "Łódzki",
	id: 1519,
	pid: 351,
	rootId: 25,
	level: 3
},
	"1520": {
	name: "Piotrkowsko-skierniewicki",
	id: 1520,
	pid: 351,
	rootId: 25,
	level: 3
},
	"1521": {
	name: "Miasto Łódź",
	id: 1521,
	pid: 351,
	rootId: 25,
	level: 3
},
	"1522": {
	name: "Ciechanowsko-płocki",
	id: 1522,
	pid: 352,
	rootId: 25,
	level: 3
},
	"1523": {
	name: "Ostrołęcko-siedlecki",
	id: 1523,
	pid: 352,
	rootId: 25,
	level: 3
},
	"1524": {
	name: "Radomski",
	id: 1524,
	pid: 352,
	rootId: 25,
	level: 3
},
	"1525": {
	name: "Warszawski",
	id: 1525,
	pid: 352,
	rootId: 25,
	level: 3
},
	"1526": {
	name: "Miasto Warszawa",
	id: 1526,
	pid: 352,
	rootId: 25,
	level: 3
},
	"1527": {
	name: "Krakowsko-tarnowski",
	id: 1527,
	pid: 353,
	rootId: 25,
	level: 3
},
	"1528": {
	name: "Nowosądecki",
	id: 1528,
	pid: 353,
	rootId: 25,
	level: 3
},
	"1529": {
	name: "Miasto Kraków",
	id: 1529,
	pid: 353,
	rootId: 25,
	level: 3
},
	"1530": {
	name: "Częstochowski",
	id: 1530,
	pid: 354,
	rootId: 25,
	level: 3
},
	"1531": {
	name: "Bielski",
	id: 1531,
	pid: 354,
	rootId: 25,
	level: 3
},
	"1532": {
	name: "Centralny śląski",
	id: 1532,
	pid: 354,
	rootId: 25,
	level: 3
},
	"1533": {
	name: "Rybnicki",
	id: 1533,
	pid: 354,
	rootId: 25,
	level: 3
},
	"1534": {
	name: "Bialski",
	id: 1534,
	pid: 355,
	rootId: 25,
	level: 3
},
	"1535": {
	name: "Chełmsko-zamojski",
	id: 1535,
	pid: 355,
	rootId: 25,
	level: 3
},
	"1536": {
	name: "Lubelski",
	id: 1536,
	pid: 355,
	rootId: 25,
	level: 3
},
	"1537": {
	name: "Rzeszowsko-tarnobrzeski",
	id: 1537,
	pid: 356,
	rootId: 25,
	level: 3
},
	"1538": {
	name: "Krośnieńsko-przemyski",
	id: 1538,
	pid: 356,
	rootId: 25,
	level: 3
},
	"1539": {
	name: "Świętokrzyski",
	id: 1539,
	pid: 357,
	rootId: 25,
	level: 3
},
	"1540": {
	name: "Białostocko-suwalski",
	id: 1540,
	pid: 358,
	rootId: 25,
	level: 3
},
	"1541": {
	name: "Łomżyński",
	id: 1541,
	pid: 358,
	rootId: 25,
	level: 3
},
	"1542": {
	name: "Pilski",
	id: 1542,
	pid: 359,
	rootId: 25,
	level: 3
},
	"1543": {
	name: "Poznański",
	id: 1543,
	pid: 359,
	rootId: 25,
	level: 3
},
	"1544": {
	name: "Kaliski",
	id: 1544,
	pid: 359,
	rootId: 25,
	level: 3
},
	"1545": {
	name: "Koniński",
	id: 1545,
	pid: 359,
	rootId: 25,
	level: 3
},
	"1546": {
	name: "Miasto Poznań",
	id: 1546,
	pid: 359,
	rootId: 25,
	level: 3
},
	"1547": {
	name: "Szczeciński",
	id: 1547,
	pid: 360,
	rootId: 25,
	level: 3
},
	"1548": {
	name: "Koszaliński",
	id: 1548,
	pid: 360,
	rootId: 25,
	level: 3
},
	"1549": {
	name: "Gorzowski",
	id: 1549,
	pid: 361,
	rootId: 25,
	level: 3
},
	"1550": {
	name: "Zielonogórski",
	id: 1550,
	pid: 361,
	rootId: 25,
	level: 3
},
	"1551": {
	name: "Jeleniogórsko-wałbrzyski",
	id: 1551,
	pid: 362,
	rootId: 25,
	level: 3
},
	"1552": {
	name: "Legnicki",
	id: 1552,
	pid: 362,
	rootId: 25,
	level: 3
},
	"1553": {
	name: "Wrocławski",
	id: 1553,
	pid: 362,
	rootId: 25,
	level: 3
},
	"1554": {
	name: "Miasto Wrocław",
	id: 1554,
	pid: 362,
	rootId: 25,
	level: 3
},
	"1555": {
	name: "Opolski",
	id: 1555,
	pid: 363,
	rootId: 25,
	level: 3
},
	"1556": {
	name: "Bydgoski",
	id: 1556,
	pid: 364,
	rootId: 25,
	level: 3
},
	"1557": {
	name: "Toruńsko-włocławski",
	id: 1557,
	pid: 364,
	rootId: 25,
	level: 3
},
	"1558": {
	name: "Elbląski",
	id: 1558,
	pid: 365,
	rootId: 25,
	level: 3
},
	"1559": {
	name: "Olsztyński",
	id: 1559,
	pid: 365,
	rootId: 25,
	level: 3
},
	"1560": {
	name: "Ełcki",
	id: 1560,
	pid: 365,
	rootId: 25,
	level: 3
},
	"1561": {
	name: "Słupski",
	id: 1561,
	pid: 366,
	rootId: 25,
	level: 3
},
	"1562": {
	name: "Gdański",
	id: 1562,
	pid: 366,
	rootId: 25,
	level: 3
},
	"1563": {
	name: "Trójmiejski",
	id: 1563,
	pid: 366,
	rootId: 25,
	level: 3
},
	"1564": {
	name: "Alto Minho",
	id: 1564,
	pid: 367,
	rootId: 26,
	level: 3
},
	"1565": {
	name: "Cávado",
	id: 1565,
	pid: 367,
	rootId: 26,
	level: 3
},
	"1566": {
	name: "Ave",
	id: 1566,
	pid: 367,
	rootId: 26,
	level: 3
},
	"1567": {
	name: "Grande Porto",
	id: 1567,
	pid: 367,
	rootId: 26,
	level: 3
},
	"1568": {
	name: "Tâmega",
	id: 1568,
	pid: 367,
	rootId: 26,
	level: 3
},
	"1569": {
	name: "Entre Douro e Vouga",
	id: 1569,
	pid: 367,
	rootId: 26,
	level: 3
},
	"1570": {
	name: "Douro",
	id: 1570,
	pid: 367,
	rootId: 26,
	level: 3
},
	"1571": {
	name: "Alto Trás-os-Montes",
	id: 1571,
	pid: 367,
	rootId: 26,
	level: 3
},
	"1572": {
	name: "Algarve",
	id: 1572,
	pid: 368,
	rootId: 26,
	level: 3
},
	"1573": {
	name: "Baixo Vouga",
	id: 1573,
	pid: 369,
	rootId: 26,
	level: 3
},
	"1574": {
	name: "Baixo Mondego",
	id: 1574,
	pid: 369,
	rootId: 26,
	level: 3
},
	"1575": {
	name: "Pinhal Litoral",
	id: 1575,
	pid: 369,
	rootId: 26,
	level: 3
},
	"1576": {
	name: "Pinhal Interior Norte",
	id: 1576,
	pid: 369,
	rootId: 26,
	level: 3
},
	"1577": {
	name: "Dão-Lafões",
	id: 1577,
	pid: 369,
	rootId: 26,
	level: 3
},
	"1578": {
	name: "Pinhal Interior Sul",
	id: 1578,
	pid: 369,
	rootId: 26,
	level: 3
},
	"1579": {
	name: "Serra da Estrela",
	id: 1579,
	pid: 369,
	rootId: 26,
	level: 3
},
	"1580": {
	name: "Beira Interior Norte",
	id: 1580,
	pid: 369,
	rootId: 26,
	level: 3
},
	"1581": {
	name: "Beira Interior Sul",
	id: 1581,
	pid: 369,
	rootId: 26,
	level: 3
},
	"1582": {
	name: "Cova da Beira",
	id: 1582,
	pid: 369,
	rootId: 26,
	level: 3
},
	"1583": {
	name: "Oeste",
	id: 1583,
	pid: 369,
	rootId: 26,
	level: 3
},
	"1584": {
	name: "Médio Tejo",
	id: 1584,
	pid: 369,
	rootId: 26,
	level: 3
},
	"1585": {
	name: "Grande Lisboa",
	id: 1585,
	pid: 370,
	rootId: 26,
	level: 3
},
	"1586": {
	name: "Península de Setúbal",
	id: 1586,
	pid: 370,
	rootId: 26,
	level: 3
},
	"1587": {
	name: "Alentejo Litoral",
	id: 1587,
	pid: 371,
	rootId: 26,
	level: 3
},
	"1588": {
	name: "Alto Alentejo",
	id: 1588,
	pid: 371,
	rootId: 26,
	level: 3
},
	"1589": {
	name: "Alentejo Central",
	id: 1589,
	pid: 371,
	rootId: 26,
	level: 3
},
	"1590": {
	name: "Baixo Alentejo",
	id: 1590,
	pid: 371,
	rootId: 26,
	level: 3
},
	"1591": {
	name: "Lezíria do Tejo",
	id: 1591,
	pid: 371,
	rootId: 26,
	level: 3
},
	"1592": {
	name: "Região Autónoma dos Açores",
	id: 1592,
	pid: 372,
	rootId: 26,
	level: 3
},
	"1593": {
	name: "Região Autónoma da Madeira",
	id: 1593,
	pid: 373,
	rootId: 26,
	level: 3
},
	"1594": {
	name: "Bihor",
	id: 1594,
	pid: 374,
	rootId: 27,
	level: 3
},
	"1595": {
	name: "Bistriţa-Năsăud",
	id: 1595,
	pid: 374,
	rootId: 27,
	level: 3
},
	"1596": {
	name: "Cluj",
	id: 1596,
	pid: 374,
	rootId: 27,
	level: 3
},
	"1597": {
	name: "Maramureş",
	id: 1597,
	pid: 374,
	rootId: 27,
	level: 3
},
	"1598": {
	name: "Satu Mare",
	id: 1598,
	pid: 374,
	rootId: 27,
	level: 3
},
	"1599": {
	name: "Sălaj",
	id: 1599,
	pid: 374,
	rootId: 27,
	level: 3
},
	"1600": {
	name: "Alba",
	id: 1600,
	pid: 375,
	rootId: 27,
	level: 3
},
	"1601": {
	name: "Braşov",
	id: 1601,
	pid: 375,
	rootId: 27,
	level: 3
},
	"1602": {
	name: "Covasna",
	id: 1602,
	pid: 375,
	rootId: 27,
	level: 3
},
	"1603": {
	name: "Harghita",
	id: 1603,
	pid: 375,
	rootId: 27,
	level: 3
},
	"1604": {
	name: "Mureş",
	id: 1604,
	pid: 375,
	rootId: 27,
	level: 3
},
	"1605": {
	name: "Sibiu",
	id: 1605,
	pid: 375,
	rootId: 27,
	level: 3
},
	"1606": {
	name: "Bacău",
	id: 1606,
	pid: 376,
	rootId: 27,
	level: 3
},
	"1607": {
	name: "Botoşani",
	id: 1607,
	pid: 376,
	rootId: 27,
	level: 3
},
	"1608": {
	name: "Iaşi",
	id: 1608,
	pid: 376,
	rootId: 27,
	level: 3
},
	"1609": {
	name: "Neamţ",
	id: 1609,
	pid: 376,
	rootId: 27,
	level: 3
},
	"1610": {
	name: "Suceava",
	id: 1610,
	pid: 376,
	rootId: 27,
	level: 3
},
	"1611": {
	name: "Vaslui",
	id: 1611,
	pid: 376,
	rootId: 27,
	level: 3
},
	"1612": {
	name: "Brăila",
	id: 1612,
	pid: 377,
	rootId: 27,
	level: 3
},
	"1613": {
	name: "Buzău",
	id: 1613,
	pid: 377,
	rootId: 27,
	level: 3
},
	"1614": {
	name: "Constanţa",
	id: 1614,
	pid: 377,
	rootId: 27,
	level: 3
},
	"1615": {
	name: "Galaţi",
	id: 1615,
	pid: 377,
	rootId: 27,
	level: 3
},
	"1616": {
	name: "Tulcea",
	id: 1616,
	pid: 377,
	rootId: 27,
	level: 3
},
	"1617": {
	name: "Vrancea",
	id: 1617,
	pid: 377,
	rootId: 27,
	level: 3
},
	"1618": {
	name: "Argeş",
	id: 1618,
	pid: 378,
	rootId: 27,
	level: 3
},
	"1619": {
	name: "Călăraşi",
	id: 1619,
	pid: 378,
	rootId: 27,
	level: 3
},
	"1620": {
	name: "Dâmboviţa",
	id: 1620,
	pid: 378,
	rootId: 27,
	level: 3
},
	"1621": {
	name: "Giurgiu",
	id: 1621,
	pid: 378,
	rootId: 27,
	level: 3
},
	"1622": {
	name: "Ialomiţa",
	id: 1622,
	pid: 378,
	rootId: 27,
	level: 3
},
	"1623": {
	name: "Prahova",
	id: 1623,
	pid: 378,
	rootId: 27,
	level: 3
},
	"1624": {
	name: "Teleorman",
	id: 1624,
	pid: 378,
	rootId: 27,
	level: 3
},
	"1625": {
	name: "Bucureşti",
	id: 1625,
	pid: 379,
	rootId: 27,
	level: 3
},
	"1626": {
	name: "Ilfov",
	id: 1626,
	pid: 379,
	rootId: 27,
	level: 3
},
	"1627": {
	name: "Dolj",
	id: 1627,
	pid: 380,
	rootId: 27,
	level: 3
},
	"1628": {
	name: "Gorj",
	id: 1628,
	pid: 380,
	rootId: 27,
	level: 3
},
	"1629": {
	name: "Mehedinţi",
	id: 1629,
	pid: 380,
	rootId: 27,
	level: 3
},
	"1630": {
	name: "Olt",
	id: 1630,
	pid: 380,
	rootId: 27,
	level: 3
},
	"1631": {
	name: "Vâlcea",
	id: 1631,
	pid: 380,
	rootId: 27,
	level: 3
},
	"1632": {
	name: "Arad",
	id: 1632,
	pid: 381,
	rootId: 27,
	level: 3
},
	"1633": {
	name: "Caraş-Severin",
	id: 1633,
	pid: 381,
	rootId: 27,
	level: 3
},
	"1634": {
	name: "Hunedoara",
	id: 1634,
	pid: 381,
	rootId: 27,
	level: 3
},
	"1635": {
	name: "Timiş",
	id: 1635,
	pid: 381,
	rootId: 27,
	level: 3
},
	"1636": {
	name: "Stockholms län",
	id: 1636,
	pid: 382,
	rootId: 28,
	level: 3
},
	"1637": {
	name: "Uppsala län",
	id: 1637,
	pid: 383,
	rootId: 28,
	level: 3
},
	"1638": {
	name: "Södermanlands län",
	id: 1638,
	pid: 383,
	rootId: 28,
	level: 3
},
	"1639": {
	name: "Östergötlands län",
	id: 1639,
	pid: 383,
	rootId: 28,
	level: 3
},
	"1640": {
	name: "Örebro län",
	id: 1640,
	pid: 383,
	rootId: 28,
	level: 3
},
	"1641": {
	name: "Västmanlands län",
	id: 1641,
	pid: 383,
	rootId: 28,
	level: 3
},
	"1642": {
	name: "Blekinge län",
	id: 1642,
	pid: 384,
	rootId: 28,
	level: 3
},
	"1643": {
	name: "Skåne län",
	id: 1643,
	pid: 384,
	rootId: 28,
	level: 3
},
	"1644": {
	name: "Värmlands län",
	id: 1644,
	pid: 385,
	rootId: 28,
	level: 3
},
	"1645": {
	name: "Dalarnas län",
	id: 1645,
	pid: 385,
	rootId: 28,
	level: 3
},
	"1646": {
	name: "Gävleborgs län",
	id: 1646,
	pid: 385,
	rootId: 28,
	level: 3
},
	"1647": {
	name: "Västernorrlands län",
	id: 1647,
	pid: 386,
	rootId: 28,
	level: 3
},
	"1648": {
	name: "Jämtlands län",
	id: 1648,
	pid: 386,
	rootId: 28,
	level: 3
},
	"1649": {
	name: "Västerbottens län",
	id: 1649,
	pid: 387,
	rootId: 28,
	level: 3
},
	"1650": {
	name: "Norrbottens län",
	id: 1650,
	pid: 387,
	rootId: 28,
	level: 3
},
	"1651": {
	name: "Jönköpings län",
	id: 1651,
	pid: 388,
	rootId: 28,
	level: 3
},
	"1652": {
	name: "Kronobergs län",
	id: 1652,
	pid: 388,
	rootId: 28,
	level: 3
},
	"1653": {
	name: "Kalmar län",
	id: 1653,
	pid: 388,
	rootId: 28,
	level: 3
},
	"1654": {
	name: "Gotlands län",
	id: 1654,
	pid: 388,
	rootId: 28,
	level: 3
},
	"1655": {
	name: "Hallands län",
	id: 1655,
	pid: 389,
	rootId: 28,
	level: 3
},
	"1656": {
	name: "Västra Götalands län",
	id: 1656,
	pid: 389,
	rootId: 28,
	level: 3
},
	"1657": {
	name: "Pomurska",
	id: 1657,
	pid: 390,
	rootId: 29,
	level: 3
},
	"1658": {
	name: "Podravska",
	id: 1658,
	pid: 390,
	rootId: 29,
	level: 3
},
	"1659": {
	name: "Koroška",
	id: 1659,
	pid: 390,
	rootId: 29,
	level: 3
},
	"1660": {
	name: "Savinjska",
	id: 1660,
	pid: 390,
	rootId: 29,
	level: 3
},
	"1661": {
	name: "Zasavska",
	id: 1661,
	pid: 390,
	rootId: 29,
	level: 3
},
	"1662": {
	name: "Spodnjeposavska",
	id: 1662,
	pid: 390,
	rootId: 29,
	level: 3
},
	"1663": {
	name: "Gorenjska",
	id: 1663,
	pid: 390,
	rootId: 29,
	level: 3
},
	"1664": {
	name: "Notranjsko-kraška",
	id: 1664,
	pid: 390,
	rootId: 29,
	level: 3
},
	"1665": {
	name: "Goriška",
	id: 1665,
	pid: 390,
	rootId: 29,
	level: 3
},
	"1666": {
	name: "Obalno-kraška",
	id: 1666,
	pid: 390,
	rootId: 29,
	level: 3
},
	"1667": {
	name: "Jugovzhodna Slovenija",
	id: 1667,
	pid: 390,
	rootId: 29,
	level: 3
},
	"1668": {
	name: "Osrednjeslovenska",
	id: 1668,
	pid: 390,
	rootId: 29,
	level: 3
},
	"1669": {
	name: "Bratislavský kraj",
	id: 1669,
	pid: 391,
	rootId: 30,
	level: 3
},
	"1670": {
	name: "Trnavský kraj",
	id: 1670,
	pid: 392,
	rootId: 30,
	level: 3
},
	"1671": {
	name: "Trenčiansky kraj",
	id: 1671,
	pid: 392,
	rootId: 30,
	level: 3
},
	"1672": {
	name: "Nitriansky kraj",
	id: 1672,
	pid: 392,
	rootId: 30,
	level: 3
},
	"1673": {
	name: "Žilinský kraj",
	id: 1673,
	pid: 393,
	rootId: 30,
	level: 3
},
	"1674": {
	name: "Banskobystrický kraj",
	id: 1674,
	pid: 393,
	rootId: 30,
	level: 3
},
	"1675": {
	name: "Prešovský kraj",
	id: 1675,
	pid: 394,
	rootId: 30,
	level: 3
},
	"1676": {
	name: "Košický kraj",
	id: 1676,
	pid: 394,
	rootId: 30,
	level: 3
},
	"1677": {
	name: "Istanbul",
	id: 1677,
	pid: 395,
	rootId: 31,
	level: 3
},
	"1678": {
	name: "Tekirdağ",
	id: 1678,
	pid: 396,
	rootId: 31,
	level: 3
},
	"1679": {
	name: "Edirne",
	id: 1679,
	pid: 396,
	rootId: 31,
	level: 3
},
	"1680": {
	name: "Kırklareli",
	id: 1680,
	pid: 396,
	rootId: 31,
	level: 3
},
	"1681": {
	name: "Balıkesir",
	id: 1681,
	pid: 397,
	rootId: 31,
	level: 3
},
	"1682": {
	name: "Çanakkale",
	id: 1682,
	pid: 397,
	rootId: 31,
	level: 3
},
	"1683": {
	name: "İzmir",
	id: 1683,
	pid: 398,
	rootId: 31,
	level: 3
},
	"1684": {
	name: "Aydın",
	id: 1684,
	pid: 399,
	rootId: 31,
	level: 3
},
	"1685": {
	name: "Denizli",
	id: 1685,
	pid: 399,
	rootId: 31,
	level: 3
},
	"1686": {
	name: "Muğla",
	id: 1686,
	pid: 399,
	rootId: 31,
	level: 3
},
	"1687": {
	name: "Manisa",
	id: 1687,
	pid: 400,
	rootId: 31,
	level: 3
},
	"1688": {
	name: "Afyon",
	id: 1688,
	pid: 400,
	rootId: 31,
	level: 3
},
	"1689": {
	name: "Kütahya",
	id: 1689,
	pid: 400,
	rootId: 31,
	level: 3
},
	"1690": {
	name: "Uşak",
	id: 1690,
	pid: 400,
	rootId: 31,
	level: 3
},
	"1691": {
	name: "Bursa",
	id: 1691,
	pid: 401,
	rootId: 31,
	level: 3
},
	"1692": {
	name: "Eskişehir",
	id: 1692,
	pid: 401,
	rootId: 31,
	level: 3
},
	"1693": {
	name: "Bilecik",
	id: 1693,
	pid: 401,
	rootId: 31,
	level: 3
},
	"1694": {
	name: "Kocaeli",
	id: 1694,
	pid: 402,
	rootId: 31,
	level: 3
},
	"1695": {
	name: "Sakarya",
	id: 1695,
	pid: 402,
	rootId: 31,
	level: 3
},
	"1696": {
	name: "Düzce",
	id: 1696,
	pid: 402,
	rootId: 31,
	level: 3
},
	"1697": {
	name: "Bolu",
	id: 1697,
	pid: 402,
	rootId: 31,
	level: 3
},
	"1698": {
	name: "Yalova",
	id: 1698,
	pid: 402,
	rootId: 31,
	level: 3
},
	"1699": {
	name: "Ankara",
	id: 1699,
	pid: 403,
	rootId: 31,
	level: 3
},
	"1700": {
	name: "Konya",
	id: 1700,
	pid: 404,
	rootId: 31,
	level: 3
},
	"1701": {
	name: "Karaman",
	id: 1701,
	pid: 404,
	rootId: 31,
	level: 3
},
	"1702": {
	name: "Antalya",
	id: 1702,
	pid: 405,
	rootId: 31,
	level: 3
},
	"1703": {
	name: "Isparta",
	id: 1703,
	pid: 405,
	rootId: 31,
	level: 3
},
	"1704": {
	name: "Burdur",
	id: 1704,
	pid: 405,
	rootId: 31,
	level: 3
},
	"1705": {
	name: "Adana",
	id: 1705,
	pid: 406,
	rootId: 31,
	level: 3
},
	"1706": {
	name: "İçel",
	id: 1706,
	pid: 406,
	rootId: 31,
	level: 3
},
	"1707": {
	name: "Hatay",
	id: 1707,
	pid: 407,
	rootId: 31,
	level: 3
},
	"1708": {
	name: "Kahramanmaraş",
	id: 1708,
	pid: 407,
	rootId: 31,
	level: 3
},
	"1709": {
	name: "Osmaniye",
	id: 1709,
	pid: 407,
	rootId: 31,
	level: 3
},
	"1710": {
	name: "Kırıkkale",
	id: 1710,
	pid: 408,
	rootId: 31,
	level: 3
},
	"1711": {
	name: "Aksaray",
	id: 1711,
	pid: 408,
	rootId: 31,
	level: 3
},
	"1712": {
	name: "Niğde",
	id: 1712,
	pid: 408,
	rootId: 31,
	level: 3
},
	"1713": {
	name: "Nevşehir",
	id: 1713,
	pid: 408,
	rootId: 31,
	level: 3
},
	"1714": {
	name: "Kırşehir",
	id: 1714,
	pid: 408,
	rootId: 31,
	level: 3
},
	"1715": {
	name: "Kayseri",
	id: 1715,
	pid: 409,
	rootId: 31,
	level: 3
},
	"1716": {
	name: "Sivas",
	id: 1716,
	pid: 409,
	rootId: 31,
	level: 3
},
	"1717": {
	name: "Yozgat",
	id: 1717,
	pid: 409,
	rootId: 31,
	level: 3
},
	"1718": {
	name: "Zonguldak",
	id: 1718,
	pid: 410,
	rootId: 31,
	level: 3
},
	"1719": {
	name: "Karabük",
	id: 1719,
	pid: 410,
	rootId: 31,
	level: 3
},
	"1720": {
	name: "Bartın",
	id: 1720,
	pid: 410,
	rootId: 31,
	level: 3
},
	"1721": {
	name: "Kastamonu",
	id: 1721,
	pid: 411,
	rootId: 31,
	level: 3
},
	"1722": {
	name: "Çankırı",
	id: 1722,
	pid: 411,
	rootId: 31,
	level: 3
},
	"1723": {
	name: "Sinop",
	id: 1723,
	pid: 411,
	rootId: 31,
	level: 3
},
	"1724": {
	name: "Samsun",
	id: 1724,
	pid: 412,
	rootId: 31,
	level: 3
},
	"1725": {
	name: "Tokat",
	id: 1725,
	pid: 412,
	rootId: 31,
	level: 3
},
	"1726": {
	name: "Çorum",
	id: 1726,
	pid: 412,
	rootId: 31,
	level: 3
},
	"1727": {
	name: "Amasya",
	id: 1727,
	pid: 412,
	rootId: 31,
	level: 3
},
	"1728": {
	name: "Trabzon",
	id: 1728,
	pid: 413,
	rootId: 31,
	level: 3
},
	"1729": {
	name: "Ordu",
	id: 1729,
	pid: 413,
	rootId: 31,
	level: 3
},
	"1730": {
	name: "Giresun",
	id: 1730,
	pid: 413,
	rootId: 31,
	level: 3
},
	"1731": {
	name: "Rize",
	id: 1731,
	pid: 413,
	rootId: 31,
	level: 3
},
	"1732": {
	name: "Artvin",
	id: 1732,
	pid: 413,
	rootId: 31,
	level: 3
},
	"1733": {
	name: "Gümüşhane",
	id: 1733,
	pid: 413,
	rootId: 31,
	level: 3
},
	"1734": {
	name: "Erzurum",
	id: 1734,
	pid: 414,
	rootId: 31,
	level: 3
},
	"1735": {
	name: "Erzincan",
	id: 1735,
	pid: 414,
	rootId: 31,
	level: 3
},
	"1736": {
	name: "Bayburt",
	id: 1736,
	pid: 414,
	rootId: 31,
	level: 3
},
	"1737": {
	name: "Ağrı",
	id: 1737,
	pid: 415,
	rootId: 31,
	level: 3
},
	"1738": {
	name: "Kars",
	id: 1738,
	pid: 415,
	rootId: 31,
	level: 3
},
	"1739": {
	name: "Iğdır",
	id: 1739,
	pid: 415,
	rootId: 31,
	level: 3
},
	"1740": {
	name: "Ardahan",
	id: 1740,
	pid: 415,
	rootId: 31,
	level: 3
},
	"1741": {
	name: "Malatya",
	id: 1741,
	pid: 416,
	rootId: 31,
	level: 3
},
	"1742": {
	name: "Elazığ",
	id: 1742,
	pid: 416,
	rootId: 31,
	level: 3
},
	"1743": {
	name: "Bingöl",
	id: 1743,
	pid: 416,
	rootId: 31,
	level: 3
},
	"1744": {
	name: "Tunceli",
	id: 1744,
	pid: 416,
	rootId: 31,
	level: 3
},
	"1745": {
	name: "Van",
	id: 1745,
	pid: 417,
	rootId: 31,
	level: 3
},
	"1746": {
	name: "Muş",
	id: 1746,
	pid: 417,
	rootId: 31,
	level: 3
},
	"1747": {
	name: "Bitlis",
	id: 1747,
	pid: 417,
	rootId: 31,
	level: 3
},
	"1748": {
	name: "Hakkari",
	id: 1748,
	pid: 417,
	rootId: 31,
	level: 3
},
	"1749": {
	name: "Gaziantep",
	id: 1749,
	pid: 418,
	rootId: 31,
	level: 3
},
	"1750": {
	name: "Adıyaman",
	id: 1750,
	pid: 418,
	rootId: 31,
	level: 3
},
	"1751": {
	name: "Kilis",
	id: 1751,
	pid: 418,
	rootId: 31,
	level: 3
},
	"1752": {
	name: "Şanlıurfa",
	id: 1752,
	pid: 419,
	rootId: 31,
	level: 3
},
	"1753": {
	name: "Diyarbakır",
	id: 1753,
	pid: 419,
	rootId: 31,
	level: 3
},
	"1754": {
	name: "Mardin",
	id: 1754,
	pid: 420,
	rootId: 31,
	level: 3
},
	"1755": {
	name: "Batman",
	id: 1755,
	pid: 420,
	rootId: 31,
	level: 3
},
	"1756": {
	name: "Şırnak",
	id: 1756,
	pid: 420,
	rootId: 31,
	level: 3
},
	"1757": {
	name: "Siirt",
	id: 1757,
	pid: 420,
	rootId: 31,
	level: 3
},
	"1758": {
	name: "Hartlepool and Stockton-on-Tees",
	id: 1758,
	pid: 421,
	rootId: 32,
	level: 3
},
	"1759": {
	name: "South Teesside",
	id: 1759,
	pid: 421,
	rootId: 32,
	level: 3
},
	"1760": {
	name: "Darlington",
	id: 1760,
	pid: 421,
	rootId: 32,
	level: 3
},
	"1761": {
	name: "Durham CC",
	id: 1761,
	pid: 421,
	rootId: 32,
	level: 3
},
	"1762": {
	name: "Northumberland",
	id: 1762,
	pid: 422,
	rootId: 32,
	level: 3
},
	"1763": {
	name: "Tyneside",
	id: 1763,
	pid: 422,
	rootId: 32,
	level: 3
},
	"1764": {
	name: "Sunderland",
	id: 1764,
	pid: 422,
	rootId: 32,
	level: 3
},
	"1765": {
	name: "West Cumbria",
	id: 1765,
	pid: 423,
	rootId: 32,
	level: 3
},
	"1766": {
	name: "East Cumbria",
	id: 1766,
	pid: 423,
	rootId: 32,
	level: 3
},
	"1767": {
	name: "Halton and Warrington",
	id: 1767,
	pid: 424,
	rootId: 32,
	level: 3
},
	"1768": {
	name: "Cheshire CC",
	id: 1768,
	pid: 424,
	rootId: 32,
	level: 3
},
	"1769": {
	name: "Greater Manchester South",
	id: 1769,
	pid: 425,
	rootId: 32,
	level: 3
},
	"1770": {
	name: "Greater Manchester North",
	id: 1770,
	pid: 425,
	rootId: 32,
	level: 3
},
	"1771": {
	name: "Blackburn with Darwen",
	id: 1771,
	pid: 426,
	rootId: 32,
	level: 3
},
	"1772": {
	name: "Blackpool",
	id: 1772,
	pid: 426,
	rootId: 32,
	level: 3
},
	"1773": {
	name: "Lancashire CC",
	id: 1773,
	pid: 426,
	rootId: 32,
	level: 3
},
	"1774": {
	name: "East Merseyside",
	id: 1774,
	pid: 427,
	rootId: 32,
	level: 3
},
	"1775": {
	name: "Liverpool",
	id: 1775,
	pid: 427,
	rootId: 32,
	level: 3
},
	"1776": {
	name: "Sefton",
	id: 1776,
	pid: 427,
	rootId: 32,
	level: 3
},
	"1777": {
	name: "Wirral",
	id: 1777,
	pid: 427,
	rootId: 32,
	level: 3
},
	"1778": {
	name: "Kingston upon Hull, City of",
	id: 1778,
	pid: 428,
	rootId: 32,
	level: 3
},
	"1779": {
	name: "East Riding of Yorkshire",
	id: 1779,
	pid: 428,
	rootId: 32,
	level: 3
},
	"1780": {
	name: "North and North East Lincolnshire",
	id: 1780,
	pid: 428,
	rootId: 32,
	level: 3
},
	"1781": {
	name: "York",
	id: 1781,
	pid: 429,
	rootId: 32,
	level: 3
},
	"1782": {
	name: "North Yorkshire CC",
	id: 1782,
	pid: 429,
	rootId: 32,
	level: 3
},
	"1783": {
	name: "Barnsley, Doncaster and Rotherham",
	id: 1783,
	pid: 430,
	rootId: 32,
	level: 3
},
	"1784": {
	name: "Sheffield",
	id: 1784,
	pid: 430,
	rootId: 32,
	level: 3
},
	"1785": {
	name: "Bradford",
	id: 1785,
	pid: 431,
	rootId: 32,
	level: 3
},
	"1786": {
	name: "Leeds",
	id: 1786,
	pid: 431,
	rootId: 32,
	level: 3
},
	"1787": {
	name: "Calderdale, Kirklees and Wakefield",
	id: 1787,
	pid: 431,
	rootId: 32,
	level: 3
},
	"1788": {
	name: "Derby",
	id: 1788,
	pid: 432,
	rootId: 32,
	level: 3
},
	"1789": {
	name: "East Derbyshire",
	id: 1789,
	pid: 432,
	rootId: 32,
	level: 3
},
	"1790": {
	name: "South and West Derbyshire",
	id: 1790,
	pid: 432,
	rootId: 32,
	level: 3
},
	"1791": {
	name: "Nottingham",
	id: 1791,
	pid: 432,
	rootId: 32,
	level: 3
},
	"1792": {
	name: "North Nottinghamshire",
	id: 1792,
	pid: 432,
	rootId: 32,
	level: 3
},
	"1793": {
	name: "South Nottinghamshire",
	id: 1793,
	pid: 432,
	rootId: 32,
	level: 3
},
	"1794": {
	name: "Leicester",
	id: 1794,
	pid: 433,
	rootId: 32,
	level: 3
},
	"1795": {
	name: "Leicestershire CC and Rutland",
	id: 1795,
	pid: 433,
	rootId: 32,
	level: 3
},
	"1796": {
	name: "Northamptonshire",
	id: 1796,
	pid: 433,
	rootId: 32,
	level: 3
},
	"1797": {
	name: "Lincolnshire",
	id: 1797,
	pid: 434,
	rootId: 32,
	level: 3
},
	"1798": {
	name: "Herefordshire, County of",
	id: 1798,
	pid: 435,
	rootId: 32,
	level: 3
},
	"1799": {
	name: "Worcestershire",
	id: 1799,
	pid: 435,
	rootId: 32,
	level: 3
},
	"1800": {
	name: "Warwickshire",
	id: 1800,
	pid: 435,
	rootId: 32,
	level: 3
},
	"1801": {
	name: "Telford and Wrekin",
	id: 1801,
	pid: 436,
	rootId: 32,
	level: 3
},
	"1802": {
	name: "Shropshire CC",
	id: 1802,
	pid: 436,
	rootId: 32,
	level: 3
},
	"1803": {
	name: "Stoke-on-Trent",
	id: 1803,
	pid: 436,
	rootId: 32,
	level: 3
},
	"1804": {
	name: "Staffordshire CC",
	id: 1804,
	pid: 436,
	rootId: 32,
	level: 3
},
	"1805": {
	name: "Birmingham",
	id: 1805,
	pid: 437,
	rootId: 32,
	level: 3
},
	"1806": {
	name: "Solihull",
	id: 1806,
	pid: 437,
	rootId: 32,
	level: 3
},
	"1807": {
	name: "Coventry",
	id: 1807,
	pid: 437,
	rootId: 32,
	level: 3
},
	"1808": {
	name: "Dudley and Sandwell",
	id: 1808,
	pid: 437,
	rootId: 32,
	level: 3
},
	"1809": {
	name: "Walsall and Wolverhampton",
	id: 1809,
	pid: 437,
	rootId: 32,
	level: 3
},
	"1810": {
	name: "Peterborough",
	id: 1810,
	pid: 438,
	rootId: 32,
	level: 3
},
	"1811": {
	name: "Cambridgeshire CC",
	id: 1811,
	pid: 438,
	rootId: 32,
	level: 3
},
	"1812": {
	name: "Norfolk",
	id: 1812,
	pid: 438,
	rootId: 32,
	level: 3
},
	"1813": {
	name: "Suffolk",
	id: 1813,
	pid: 438,
	rootId: 32,
	level: 3
},
	"1814": {
	name: "Luton",
	id: 1814,
	pid: 439,
	rootId: 32,
	level: 3
},
	"1815": {
	name: "Bedfordshire CC",
	id: 1815,
	pid: 439,
	rootId: 32,
	level: 3
},
	"1816": {
	name: "Hertfordshire",
	id: 1816,
	pid: 439,
	rootId: 32,
	level: 3
},
	"1817": {
	name: "Southend-on-Sea",
	id: 1817,
	pid: 440,
	rootId: 32,
	level: 3
},
	"1818": {
	name: "Thurrock",
	id: 1818,
	pid: 440,
	rootId: 32,
	level: 3
},
	"1819": {
	name: "Essex CC",
	id: 1819,
	pid: 440,
	rootId: 32,
	level: 3
},
	"1820": {
	name: "Inner London - West",
	id: 1820,
	pid: 441,
	rootId: 32,
	level: 3
},
	"1821": {
	name: "Inner London - East",
	id: 1821,
	pid: 441,
	rootId: 32,
	level: 3
},
	"1822": {
	name: "Outer London - East and North East",
	id: 1822,
	pid: 442,
	rootId: 32,
	level: 3
},
	"1823": {
	name: "Outer London - South",
	id: 1823,
	pid: 442,
	rootId: 32,
	level: 3
},
	"1824": {
	name: "Outer London - West and North West",
	id: 1824,
	pid: 442,
	rootId: 32,
	level: 3
},
	"1825": {
	name: "Berkshire",
	id: 1825,
	pid: 443,
	rootId: 32,
	level: 3
},
	"1826": {
	name: "Milton Keynes",
	id: 1826,
	pid: 443,
	rootId: 32,
	level: 3
},
	"1827": {
	name: "Buckinghamshire CC",
	id: 1827,
	pid: 443,
	rootId: 32,
	level: 3
},
	"1828": {
	name: "Oxfordshire",
	id: 1828,
	pid: 443,
	rootId: 32,
	level: 3
},
	"1829": {
	name: "Brighton and Hove",
	id: 1829,
	pid: 444,
	rootId: 32,
	level: 3
},
	"1830": {
	name: "East Sussex CC",
	id: 1830,
	pid: 444,
	rootId: 32,
	level: 3
},
	"1831": {
	name: "Surrey",
	id: 1831,
	pid: 444,
	rootId: 32,
	level: 3
},
	"1832": {
	name: "West Sussex",
	id: 1832,
	pid: 444,
	rootId: 32,
	level: 3
},
	"1833": {
	name: "Portsmouth",
	id: 1833,
	pid: 445,
	rootId: 32,
	level: 3
},
	"1834": {
	name: "Southampton",
	id: 1834,
	pid: 445,
	rootId: 32,
	level: 3
},
	"1835": {
	name: "Hampshire CC",
	id: 1835,
	pid: 445,
	rootId: 32,
	level: 3
},
	"1836": {
	name: "Isle of Wight",
	id: 1836,
	pid: 445,
	rootId: 32,
	level: 3
},
	"1837": {
	name: "Medway",
	id: 1837,
	pid: 446,
	rootId: 32,
	level: 3
},
	"1838": {
	name: "Kent CC",
	id: 1838,
	pid: 446,
	rootId: 32,
	level: 3
},
	"1839": {
	name: "Bristol, City of",
	id: 1839,
	pid: 447,
	rootId: 32,
	level: 3
},
	"1840": {
	name: "Bath and North East Somerset, North Somerset and South Gloucestershire",
	id: 1840,
	pid: 447,
	rootId: 32,
	level: 3
},
	"1841": {
	name: "Gloucestershire",
	id: 1841,
	pid: 447,
	rootId: 32,
	level: 3
},
	"1842": {
	name: "Swindon",
	id: 1842,
	pid: 447,
	rootId: 32,
	level: 3
},
	"1843": {
	name: "Wiltshire CC",
	id: 1843,
	pid: 447,
	rootId: 32,
	level: 3
},
	"1844": {
	name: "Bournemouth and Poole",
	id: 1844,
	pid: 448,
	rootId: 32,
	level: 3
},
	"1845": {
	name: "Dorset CC",
	id: 1845,
	pid: 448,
	rootId: 32,
	level: 3
},
	"1846": {
	name: "Somerset",
	id: 1846,
	pid: 448,
	rootId: 32,
	level: 3
},
	"1847": {
	name: "Cornwall and Isles of Scilly",
	id: 1847,
	pid: 449,
	rootId: 32,
	level: 3
},
	"1848": {
	name: "Plymouth",
	id: 1848,
	pid: 450,
	rootId: 32,
	level: 3
},
	"1849": {
	name: "Torbay",
	id: 1849,
	pid: 450,
	rootId: 32,
	level: 3
},
	"1850": {
	name: "Devon CC",
	id: 1850,
	pid: 450,
	rootId: 32,
	level: 3
},
	"1851": {
	name: "Isle of Anglesey",
	id: 1851,
	pid: 451,
	rootId: 32,
	level: 3
},
	"1852": {
	name: "Gwynedd",
	id: 1852,
	pid: 451,
	rootId: 32,
	level: 3
},
	"1853": {
	name: "Conwy and Denbighshire",
	id: 1853,
	pid: 451,
	rootId: 32,
	level: 3
},
	"1854": {
	name: "South West Wales",
	id: 1854,
	pid: 451,
	rootId: 32,
	level: 3
},
	"1855": {
	name: "Central Valleys",
	id: 1855,
	pid: 451,
	rootId: 32,
	level: 3
},
	"1856": {
	name: "Gwent Valleys",
	id: 1856,
	pid: 451,
	rootId: 32,
	level: 3
},
	"1857": {
	name: "Bridgend and Neath Port Talbot",
	id: 1857,
	pid: 451,
	rootId: 32,
	level: 3
},
	"1858": {
	name: "Swansea",
	id: 1858,
	pid: 451,
	rootId: 32,
	level: 3
},
	"1859": {
	name: "Monmouthshire and Newport",
	id: 1859,
	pid: 452,
	rootId: 32,
	level: 3
},
	"1860": {
	name: "Cardiff and Vale of Glamorgan",
	id: 1860,
	pid: 452,
	rootId: 32,
	level: 3
},
	"1861": {
	name: "Flintshire and Wrexham",
	id: 1861,
	pid: 452,
	rootId: 32,
	level: 3
},
	"1862": {
	name: "Powys",
	id: 1862,
	pid: 452,
	rootId: 32,
	level: 3
},
	"1863": {
	name: "Aberdeen City, Aberdeenshire and North East Moray",
	id: 1863,
	pid: 453,
	rootId: 32,
	level: 3
},
	"1864": {
	name: "Angus and Dundee City",
	id: 1864,
	pid: 454,
	rootId: 32,
	level: 3
},
	"1865": {
	name: "Clackmannanshire and Fife",
	id: 1865,
	pid: 454,
	rootId: 32,
	level: 3
},
	"1866": {
	name: "East Lothian and Midlothian",
	id: 1866,
	pid: 454,
	rootId: 32,
	level: 3
},
	"1867": {
	name: "Scottish Borders",
	id: 1867,
	pid: 454,
	rootId: 32,
	level: 3
},
	"1868": {
	name: "Edinburgh, City of",
	id: 1868,
	pid: 454,
	rootId: 32,
	level: 3
},
	"1869": {
	name: "Falkirk",
	id: 1869,
	pid: 454,
	rootId: 32,
	level: 3
},
	"1870": {
	name: "Perth & Kinross and Stirling",
	id: 1870,
	pid: 454,
	rootId: 32,
	level: 3
},
	"1871": {
	name: "West Lothian",
	id: 1871,
	pid: 454,
	rootId: 32,
	level: 3
},
	"1872": {
	name: "East Dunbartonshire, West Dunbartonshire and Helensburgh & Lomond",
	id: 1872,
	pid: 455,
	rootId: 32,
	level: 3
},
	"1873": {
	name: "Dumfries & Galloway",
	id: 1873,
	pid: 455,
	rootId: 32,
	level: 3
},
	"1874": {
	name: "East Ayrshire and North Ayrshire mainland",
	id: 1874,
	pid: 455,
	rootId: 32,
	level: 3
},
	"1875": {
	name: "Glasgow City",
	id: 1875,
	pid: 455,
	rootId: 32,
	level: 3
},
	"1876": {
	name: "Inverclyde, East Renfrewshire and Renfrewshire",
	id: 1876,
	pid: 455,
	rootId: 32,
	level: 3
},
	"1877": {
	name: "North Lanarkshire",
	id: 1877,
	pid: 455,
	rootId: 32,
	level: 3
},
	"1878": {
	name: "South Ayrshire",
	id: 1878,
	pid: 455,
	rootId: 32,
	level: 3
},
	"1879": {
	name: "South Lanarkshire",
	id: 1879,
	pid: 455,
	rootId: 32,
	level: 3
},
	"1880": {
	name: "Caithness & Sutherland and Ross & Cromarty",
	id: 1880,
	pid: 456,
	rootId: 32,
	level: 3
},
	"1881": {
	name: "Inverness and Nairn and Moray, Badenoch and Strathspey",
	id: 1881,
	pid: 456,
	rootId: 32,
	level: 3
},
	"1882": {
	name: "Lochaber, Skye & Lochalsh, Arran & Cumbrae and Argyll & Bute",
	id: 1882,
	pid: 456,
	rootId: 32,
	level: 3
},
	"1883": {
	name: "Eilean Siar (Western Isles)",
	id: 1883,
	pid: 456,
	rootId: 32,
	level: 3
},
	"1884": {
	name: "Orkney Islands",
	id: 1884,
	pid: 456,
	rootId: 32,
	level: 3
},
	"1885": {
	name: "Shetland Islands",
	id: 1885,
	pid: 456,
	rootId: 32,
	level: 3
},
	"1886": {
	name: "Belfast",
	id: 1886,
	pid: 457,
	rootId: 32,
	level: 3
},
	"1887": {
	name: "Outer Belfast",
	id: 1887,
	pid: 457,
	rootId: 32,
	level: 3
},
	"1888": {
	name: "East of Northern Ireland",
	id: 1888,
	pid: 457,
	rootId: 32,
	level: 3
},
	"1889": {
	name: "North of Northern Ireland",
	id: 1889,
	pid: 457,
	rootId: 32,
	level: 3
},
	"1890": {
	name: "West and South of Northern Ireland",
	id: 1890,
	pid: 457,
	rootId: 32,
	level: 3
},
	"1891": {
	name: "CRNA GORA",
	id: 1891,
	rootId: 1891,
	level: 0,
	children: [
		1893
	]
},
	"1892": {
	name: "Severna Makedonija",
	id: 1892,
	rootId: 1892,
	level: 0,
	children: [
		1894
	]
},
	"1893": {
	name: "CRNA GORA",
	id: 1893,
	pid: 1891,
	rootId: 1891,
	level: 1,
	children: [
		1904
	]
},
	"1894": {
	name: "Severna Makedonija",
	id: 1894,
	pid: 1892,
	rootId: 1892,
	level: 1,
	children: [
		1905
	]
},
	"1895": {
	name: "Östra Sverige",
	id: 1895,
	pid: 28,
	rootId: 28,
	level: 1,
	children: [
		382,
		383
	]
},
	"1896": {
	name: "Södra Sverige",
	id: 1896,
	pid: 28,
	rootId: 28,
	level: 1,
	children: [
		388,
		384,
		389
	]
},
	"1897": {
	name: "Norra Sverige",
	id: 1897,
	pid: 28,
	rootId: 28,
	level: 1,
	children: [
		385,
		386,
		387
	]
},
	"1898": {
	name: "Sachsen-Anhalt",
	id: 1898,
	pid: 57,
	rootId: 6,
	level: 2,
	children: [
		1914,
		988,
		995,
		1005,
		1915,
		1916,
		1917,
		1918,
		1919,
		1920,
		1921,
		1922,
		1001,
		1923
	]
},
	"1899": {
	name: "Hovedstaden",
	id: 1899,
	pid: 60,
	rootId: 7,
	level: 2,
	children: [
		1924,
		1925,
		1926,
		1050
	]
},
	"1900": {
	name: "Sjælland",
	id: 1900,
	pid: 60,
	rootId: 7,
	level: 2,
	children: [
		1927,
		1928
	]
},
	"1901": {
	name: "Syddanmark",
	id: 1901,
	pid: 60,
	rootId: 7,
	level: 2,
	children: [
		1051,
		1929
	]
},
	"1902": {
	name: "Midtjylland",
	id: 1902,
	pid: 60,
	rootId: 7,
	level: 2,
	children: [
		1930,
		1931
	]
},
	"1903": {
	name: "Nordjylland",
	id: 1903,
	pid: 60,
	rootId: 7,
	level: 2,
	children: [
		1932
	]
},
	"1904": {
	name: "Crna Gora",
	id: 1904,
	pid: 1893,
	rootId: 1891,
	level: 2,
	children: [
		1955
	]
},
	"1905": {
	name: "Severna Makedonija",
	id: 1905,
	pid: 1894,
	rootId: 1892,
	level: 2,
	children: [
		1956,
		1957,
		1958,
		1959,
		1960,
		1961,
		1962,
		1963
	]
},
	"1906": {
	name: "Vzhodna Slovenija",
	id: 1906,
	pid: 119,
	rootId: 29,
	level: 2,
	children: [
		1657,
		1658,
		1659,
		1660,
		1661,
		1662,
		1667,
		1664
	]
},
	"1907": {
	name: "Zahodna Slovenija",
	id: 1907,
	pid: 119,
	rootId: 29,
	level: 2,
	children: [
		1668,
		1663,
		1665,
		1666
	]
},
	"1908": {
	name: "North Eastern Scotland",
	id: 1908,
	pid: 143,
	rootId: 32,
	level: 2,
	children: [
		2012
	]
},
	"1909": {
	name: "Highlands and Islands",
	id: 1909,
	pid: 143,
	rootId: 32,
	level: 2,
	children: [
		1880,
		2013,
		1882,
		1883,
		1884,
		1885
	]
},
	"1910": {
	name: "Arr. Verviers - communes francophones",
	id: 1910,
	pid: 162,
	rootId: 1,
	level: 3
},
	"1911": {
	name: "Bezirk Verviers - Deutschsprachige Gemeinschaft",
	id: 1911,
	pid: 162,
	rootId: 1,
	level: 3
},
	"1912": {
	name: "Kraj Vysočina",
	id: 1912,
	pid: 184,
	rootId: 5,
	level: 3
},
	"1913": {
	name: "Jihomoravský kraj",
	id: 1913,
	pid: 184,
	rootId: 5,
	level: 3
},
	"1914": {
	name: "Dessau-Roßlau, Kreisfreie Stadt",
	id: 1914,
	pid: 1898,
	rootId: 6,
	level: 3
},
	"1915": {
	name: "Anhalt-Bitterfeld",
	id: 1915,
	pid: 1898,
	rootId: 6,
	level: 3
},
	"1916": {
	name: "Jerichower Land",
	id: 1916,
	pid: 1898,
	rootId: 6,
	level: 3
},
	"1917": {
	name: "Börde",
	id: 1917,
	pid: 1898,
	rootId: 6,
	level: 3
},
	"1918": {
	name: "Burgenlandkreis",
	id: 1918,
	pid: 1898,
	rootId: 6,
	level: 3
},
	"1919": {
	name: "Harz",
	id: 1919,
	pid: 1898,
	rootId: 6,
	level: 3
},
	"1920": {
	name: "Mansfeld-Südharz",
	id: 1920,
	pid: 1898,
	rootId: 6,
	level: 3
},
	"1921": {
	name: "Saalekreis",
	id: 1921,
	pid: 1898,
	rootId: 6,
	level: 3
},
	"1922": {
	name: "Salzlandkreis",
	id: 1922,
	pid: 1898,
	rootId: 6,
	level: 3
},
	"1923": {
	name: "Wittenberg",
	id: 1923,
	pid: 1898,
	rootId: 6,
	level: 3
},
	"1924": {
	name: "Byen København",
	id: 1924,
	pid: 1899,
	rootId: 7,
	level: 3
},
	"1925": {
	name: "Københavns omegn",
	id: 1925,
	pid: 1899,
	rootId: 7,
	level: 3
},
	"1926": {
	name: "Nordsjælland",
	id: 1926,
	pid: 1899,
	rootId: 7,
	level: 3
},
	"1927": {
	name: "Østsjælland",
	id: 1927,
	pid: 1900,
	rootId: 7,
	level: 3
},
	"1928": {
	name: "Vest- og Sydsjælland",
	id: 1928,
	pid: 1900,
	rootId: 7,
	level: 3
},
	"1929": {
	name: "Sydjylland",
	id: 1929,
	pid: 1901,
	rootId: 7,
	level: 3
},
	"1930": {
	name: "Vestjylland",
	id: 1930,
	pid: 1902,
	rootId: 7,
	level: 3
},
	"1931": {
	name: "Østjylland",
	id: 1931,
	pid: 1902,
	rootId: 7,
	level: 3
},
	"1932": {
	name: "Nordjylland",
	id: 1932,
	pid: 1903,
	rootId: 7,
	level: 3
},
	"1933": {
	name: "Eivissa y Formentera",
	id: 1933,
	pid: 243,
	rootId: 9,
	level: 3
},
	"1934": {
	name: "Mallorca",
	id: 1934,
	pid: 243,
	rootId: 9,
	level: 3
},
	"1935": {
	name: "Menorca",
	id: 1935,
	pid: 243,
	rootId: 9,
	level: 3
},
	"1936": {
	name: "El Hierro",
	id: 1936,
	pid: 248,
	rootId: 9,
	level: 3
},
	"1937": {
	name: "Fuerteventura",
	id: 1937,
	pid: 248,
	rootId: 9,
	level: 3
},
	"1938": {
	name: "Gran Canaria",
	id: 1938,
	pid: 248,
	rootId: 9,
	level: 3
},
	"1939": {
	name: "La Gomera",
	id: 1939,
	pid: 248,
	rootId: 9,
	level: 3
},
	"1940": {
	name: "La Palma",
	id: 1940,
	pid: 248,
	rootId: 9,
	level: 3
},
	"1941": {
	name: "Lanzarote",
	id: 1941,
	pid: 248,
	rootId: 9,
	level: 3
},
	"1942": {
	name: "Tenerife",
	id: 1942,
	pid: 248,
	rootId: 9,
	level: 3
},
	"1943": {
	name: "Satakunta",
	id: 1943,
	pid: 251,
	rootId: 10,
	level: 3
},
	"1944": {
	name: "Pirkanmaa",
	id: 1944,
	pid: 251,
	rootId: 10,
	level: 3
},
	"1945": {
	name: "Höfuðborgarsvæði",
	id: 1945,
	pid: 305,
	rootId: 16,
	level: 3
},
	"1946": {
	name: "Landsbyggð",
	id: 1946,
	pid: 305,
	rootId: 16,
	level: 3
},
	"1947": {
	name: "Sassari",
	id: 1947,
	pid: 326,
	rootId: 17,
	level: 3
},
	"1948": {
	name: "Nuoro",
	id: 1948,
	pid: 326,
	rootId: 17,
	level: 3
},
	"1949": {
	name: "Cagliari",
	id: 1949,
	pid: 326,
	rootId: 17,
	level: 3
},
	"1950": {
	name: "Oristano",
	id: 1950,
	pid: 326,
	rootId: 17,
	level: 3
},
	"1951": {
	name: "Olbia-Tempio",
	id: 1951,
	pid: 326,
	rootId: 17,
	level: 3
},
	"1952": {
	name: "Ogliastra",
	id: 1952,
	pid: 326,
	rootId: 17,
	level: 3
},
	"1953": {
	name: "Medio Campidano",
	id: 1953,
	pid: 326,
	rootId: 17,
	level: 3
},
	"1954": {
	name: "Carbonia-Iglesias",
	id: 1954,
	pid: 326,
	rootId: 17,
	level: 3
},
	"1955": {
	name: "Crna Gora",
	id: 1955,
	pid: 1904,
	rootId: 1891,
	level: 3
},
	"1956": {
	name: "Vardarski",
	id: 1956,
	pid: 1905,
	rootId: 1892,
	level: 3
},
	"1957": {
	name: "Istočen",
	id: 1957,
	pid: 1905,
	rootId: 1892,
	level: 3
},
	"1958": {
	name: "Jugozapaden",
	id: 1958,
	pid: 1905,
	rootId: 1892,
	level: 3
},
	"1959": {
	name: "Jugoistočen",
	id: 1959,
	pid: 1905,
	rootId: 1892,
	level: 3
},
	"1960": {
	name: "Pelagoniski",
	id: 1960,
	pid: 1905,
	rootId: 1892,
	level: 3
},
	"1961": {
	name: "Pološki",
	id: 1961,
	pid: 1905,
	rootId: 1892,
	level: 3
},
	"1962": {
	name: "Severoistočen",
	id: 1962,
	pid: 1905,
	rootId: 1892,
	level: 3
},
	"1963": {
	name: "Skopski",
	id: 1963,
	pid: 1905,
	rootId: 1892,
	level: 3
},
	"1964": {
	name: "Achterhoek",
	id: 1964,
	pid: 336,
	rootId: 23,
	level: 3
},
	"1965": {
	name: "Arnhem/Nijmegen",
	id: 1965,
	pid: 336,
	rootId: 23,
	level: 3
},
	"1966": {
	name: "Łódzki",
	id: 1966,
	pid: 351,
	rootId: 25,
	level: 3
},
	"1967": {
	name: "Piotrkowski",
	id: 1967,
	pid: 351,
	rootId: 25,
	level: 3
},
	"1968": {
	name: "Sieradzki",
	id: 1968,
	pid: 351,
	rootId: 25,
	level: 3
},
	"1969": {
	name: "Skierniewicki",
	id: 1969,
	pid: 351,
	rootId: 25,
	level: 3
},
	"1970": {
	name: "Radomski",
	id: 1970,
	pid: 352,
	rootId: 25,
	level: 3
},
	"1971": {
	name: "Warszawski wschodni",
	id: 1971,
	pid: 352,
	rootId: 25,
	level: 3
},
	"1972": {
	name: "Warszawski zachodni",
	id: 1972,
	pid: 352,
	rootId: 25,
	level: 3
},
	"1973": {
	name: "Krakowski",
	id: 1973,
	pid: 353,
	rootId: 25,
	level: 3
},
	"1974": {
	name: "Nowosądecki",
	id: 1974,
	pid: 353,
	rootId: 25,
	level: 3
},
	"1975": {
	name: "Oświęcimski",
	id: 1975,
	pid: 353,
	rootId: 25,
	level: 3
},
	"1976": {
	name: "Tarnowski",
	id: 1976,
	pid: 353,
	rootId: 25,
	level: 3
},
	"1977": {
	name: "Bytomski",
	id: 1977,
	pid: 354,
	rootId: 25,
	level: 3
},
	"1978": {
	name: "Gliwicki",
	id: 1978,
	pid: 354,
	rootId: 25,
	level: 3
},
	"1979": {
	name: "Katowicki",
	id: 1979,
	pid: 354,
	rootId: 25,
	level: 3
},
	"1980": {
	name: "Sosnowiecki",
	id: 1980,
	pid: 354,
	rootId: 25,
	level: 3
},
	"1981": {
	name: "Tyski",
	id: 1981,
	pid: 354,
	rootId: 25,
	level: 3
},
	"1982": {
	name: "Lubelski",
	id: 1982,
	pid: 355,
	rootId: 25,
	level: 3
},
	"1983": {
	name: "Puławski",
	id: 1983,
	pid: 355,
	rootId: 25,
	level: 3
},
	"1984": {
	name: "Krośnieński",
	id: 1984,
	pid: 356,
	rootId: 25,
	level: 3
},
	"1985": {
	name: "Przemyski",
	id: 1985,
	pid: 356,
	rootId: 25,
	level: 3
},
	"1986": {
	name: "Rzeszowski",
	id: 1986,
	pid: 356,
	rootId: 25,
	level: 3
},
	"1987": {
	name: "Tarnobrzeski",
	id: 1987,
	pid: 356,
	rootId: 25,
	level: 3
},
	"1988": {
	name: "Kielecki",
	id: 1988,
	pid: 357,
	rootId: 25,
	level: 3
},
	"1989": {
	name: "Sandomiersko-jędrzejowski",
	id: 1989,
	pid: 357,
	rootId: 25,
	level: 3
},
	"1990": {
	name: "Białostocki",
	id: 1990,
	pid: 358,
	rootId: 25,
	level: 3
},
	"1991": {
	name: "Łomżyński",
	id: 1991,
	pid: 358,
	rootId: 25,
	level: 3
},
	"1992": {
	name: "Suwalski",
	id: 1992,
	pid: 358,
	rootId: 25,
	level: 3
},
	"1993": {
	name: "Kaliski",
	id: 1993,
	pid: 359,
	rootId: 25,
	level: 3
},
	"1994": {
	name: "Leszczyński",
	id: 1994,
	pid: 359,
	rootId: 25,
	level: 3
},
	"1995": {
	name: "Poznański",
	id: 1995,
	pid: 359,
	rootId: 25,
	level: 3
},
	"1996": {
	name: "Stargardzki",
	id: 1996,
	pid: 360,
	rootId: 25,
	level: 3
},
	"1997": {
	name: "Miasto Szczecin",
	id: 1997,
	pid: 360,
	rootId: 25,
	level: 3
},
	"1998": {
	name: "Szczeciński",
	id: 1998,
	pid: 360,
	rootId: 25,
	level: 3
},
	"1999": {
	name: "Jeleniogórski",
	id: 1999,
	pid: 362,
	rootId: 25,
	level: 3
},
	"2000": {
	name: "Legnicko-głogowski",
	id: 2000,
	pid: 362,
	rootId: 25,
	level: 3
},
	"2001": {
	name: "Wałbrzyski",
	id: 2001,
	pid: 362,
	rootId: 25,
	level: 3
},
	"2002": {
	name: "Wrocławski",
	id: 2002,
	pid: 362,
	rootId: 25,
	level: 3
},
	"2003": {
	name: "Nyski",
	id: 2003,
	pid: 363,
	rootId: 25,
	level: 3
},
	"2004": {
	name: "Opolski",
	id: 2004,
	pid: 363,
	rootId: 25,
	level: 3
},
	"2005": {
	name: "Bydgosko-toruński",
	id: 2005,
	pid: 364,
	rootId: 25,
	level: 3
},
	"2006": {
	name: "Grudziądzki",
	id: 2006,
	pid: 364,
	rootId: 25,
	level: 3
},
	"2007": {
	name: "Włocławski",
	id: 2007,
	pid: 364,
	rootId: 25,
	level: 3
},
	"2008": {
	name: "Gdański",
	id: 2008,
	pid: 366,
	rootId: 25,
	level: 3
},
	"2009": {
	name: "Starogardzki",
	id: 2009,
	pid: 366,
	rootId: 25,
	level: 3
},
	"2010": {
	name: "Uppsala län",
	id: 2010,
	pid: 383,
	rootId: 28,
	level: 3
},
	"2011": {
	name: "Västmanlands län",
	id: 2011,
	pid: 383,
	rootId: 28,
	level: 3
},
	"2012": {
	name: "Aberdeen City and Aberdeenshire",
	id: 2012,
	pid: 1908,
	rootId: 32,
	level: 3
},
	"2013": {
	name: "Inverness & Nairn and Moray, Badenoch & Strathspey",
	id: 2013,
	pid: 1909,
	rootId: 32,
	level: 3
},
	"2014": {
	name: "NORD-EST",
	id: 2014,
	pid: 17,
	rootId: 17,
	level: 1,
	children: [
		310,
		311,
		312,
		313,
		2024
	]
},
	"2015": {
	name: "CENTRO (IT)",
	id: 2015,
	pid: 17,
	rootId: 17,
	level: 1,
	children: [
		315,
		316,
		2025,
		318
	]
},
	"2016": {
	name: "Mount Athos",
	id: 2016,
	pid: 12,
	rootId: 12,
	level: 1
},
	"2017": {
	name: "Brandenburg",
	id: 2017,
	pid: 47,
	rootId: 6,
	level: 2,
	children: [
		754,
		755,
		746,
		756,
		747,
		757,
		758,
		759,
		748,
		749,
		760,
		750,
		751,
		761,
		752,
		762,
		763,
		753
	]
},
	"2018": {
	name: "Chemnitz",
	id: 2018,
	pid: 56,
	rootId: 6,
	level: 2,
	children: [
		953,
		2033,
		2034,
		2035,
		2036
	]
},
	"2019": {
	name: "Leipzig",
	id: 2019,
	pid: 56,
	rootId: 6,
	level: 2,
	children: [
		976,
		2037,
		2038
	]
},
	"2020": {
	name: "Helsinki-Uusimaa",
	id: 2020,
	pid: 69,
	rootId: 10,
	level: 2,
	children: [
		2039
	]
},
	"2021": {
	name: "Etelä-Suomi",
	id: 2021,
	pid: 69,
	rootId: 10,
	level: 2,
	children: [
		1122,
		1123,
		1124,
		1125,
		1126
	]
},
	"2022": {
	name: "Pohjois- ja Itä-Suomi",
	id: 2022,
	pid: 69,
	rootId: 10,
	level: 2,
	children: [
		1116,
		1117,
		1118,
		1119,
		1132,
		1133,
		1134
	]
},
	"2023": {
	name: "Kontinentalna Hrvatska",
	id: 2023,
	pid: 84,
	rootId: 13,
	level: 2,
	children: [
		2040,
		2041,
		2042,
		2043,
		2044,
		2045,
		2046,
		2047,
		2048,
		2049,
		2050,
		2051,
		2052,
		2053
	]
},
	"2024": {
	name: "Emilia-Romagna",
	id: 2024,
	pid: 2014,
	rootId: 17,
	level: 2,
	children: [
		1374,
		1375,
		1376,
		1377,
		1378,
		1379,
		1380,
		1381,
		2059
	]
},
	"2025": {
	name: "Marche",
	id: 2025,
	pid: 2015,
	rootId: 17,
	level: 2,
	children: [
		2060,
		1396,
		1397,
		2061,
		2062
	]
},
	"2026": {
	name: "Cheshire",
	id: 2026,
	pid: 134,
	rootId: 32,
	level: 2,
	children: [
		2067,
		2068,
		2069
	]
},
	"2027": {
	name: "Merseyside",
	id: 2027,
	pid: 134,
	rootId: 32,
	level: 2,
	children: [
		2070,
		1775,
		1776,
		1777
	]
},
	"2028": {
	name: "Städteregion Aachen",
	id: 2028,
	pid: 212,
	rootId: 6,
	level: 3
},
	"2029": {
	name: "Bautzen",
	id: 2029,
	pid: 221,
	rootId: 6,
	level: 3
},
	"2030": {
	name: "Görlitz",
	id: 2030,
	pid: 221,
	rootId: 6,
	level: 3
},
	"2031": {
	name: "Meißen",
	id: 2031,
	pid: 221,
	rootId: 6,
	level: 3
},
	"2032": {
	name: "Sächsische Schweiz-Osterzgebirge",
	id: 2032,
	pid: 221,
	rootId: 6,
	level: 3
},
	"2033": {
	name: "Erzgebirgskreis",
	id: 2033,
	pid: 2018,
	rootId: 6,
	level: 3
},
	"2034": {
	name: "Mittelsachsen",
	id: 2034,
	pid: 2018,
	rootId: 6,
	level: 3
},
	"2035": {
	name: "Vogtlandkreis",
	id: 2035,
	pid: 2018,
	rootId: 6,
	level: 3
},
	"2036": {
	name: "Zwickau",
	id: 2036,
	pid: 2018,
	rootId: 6,
	level: 3
},
	"2037": {
	name: "Leipzig",
	id: 2037,
	pid: 2019,
	rootId: 6,
	level: 3
},
	"2038": {
	name: "Nordsachsen",
	id: 2038,
	pid: 2019,
	rootId: 6,
	level: 3
},
	"2039": {
	name: "Helsinki-Uusimaa",
	id: 2039,
	pid: 2020,
	rootId: 10,
	level: 3
},
	"2040": {
	name: "Grad Zagreb",
	id: 2040,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2041": {
	name: "Zagrebačka županija",
	id: 2041,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2042": {
	name: "Krapinsko-zagorska županija",
	id: 2042,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2043": {
	name: "Varaždinska županija",
	id: 2043,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2044": {
	name: "Koprivničko-križevačka županija",
	id: 2044,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2045": {
	name: "Međimurska županija",
	id: 2045,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2046": {
	name: "Bjelovarsko-bilogorska županija",
	id: 2046,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2047": {
	name: "Virovitičko-podravska županija",
	id: 2047,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2048": {
	name: "Požeško-slavonska županija",
	id: 2048,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2049": {
	name: "Brodsko-posavska županija",
	id: 2049,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2050": {
	name: "Osječko-baranjska županija",
	id: 2050,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2051": {
	name: "Vukovarsko-srijemska županija",
	id: 2051,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2052": {
	name: "Karlovačka županija",
	id: 2052,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2053": {
	name: "Sisačko-moslavačka županija",
	id: 2053,
	pid: 2023,
	rootId: 13,
	level: 3
},
	"2054": {
	name: "Milano",
	id: 2054,
	pid: 309,
	rootId: 17,
	level: 3
},
	"2055": {
	name: "Monza e della Brianza",
	id: 2055,
	pid: 309,
	rootId: 17,
	level: 3
},
	"2056": {
	name: "Foggia",
	id: 2056,
	pid: 322,
	rootId: 17,
	level: 3
},
	"2057": {
	name: "Bari",
	id: 2057,
	pid: 322,
	rootId: 17,
	level: 3
},
	"2058": {
	name: "Barletta-Andria-Trani",
	id: 2058,
	pid: 322,
	rootId: 17,
	level: 3
},
	"2059": {
	name: "Rimini",
	id: 2059,
	pid: 2024,
	rootId: 17,
	level: 3
},
	"2060": {
	name: "Pesaro e Urbino",
	id: 2060,
	pid: 2025,
	rootId: 17,
	level: 3
},
	"2061": {
	name: "Ascoli Piceno",
	id: 2061,
	pid: 2025,
	rootId: 17,
	level: 3
},
	"2062": {
	name: "Fermo",
	id: 2062,
	pid: 2025,
	rootId: 17,
	level: 3
},
	"2063": {
	name: "Agglomeratie Leiden en Bollenstreek",
	id: 2063,
	pid: 340,
	rootId: 23,
	level: 3
},
	"2064": {
	name: "Oost-Zuid-Holland",
	id: 2064,
	pid: 340,
	rootId: 23,
	level: 3
},
	"2065": {
	name: "Groot-Rijnmond",
	id: 2065,
	pid: 340,
	rootId: 23,
	level: 3
},
	"2066": {
	name: "Zuidoost-Zuid-Holland",
	id: 2066,
	pid: 340,
	rootId: 23,
	level: 3
},
	"2067": {
	name: "Warrington",
	id: 2067,
	pid: 2026,
	rootId: 32,
	level: 3
},
	"2068": {
	name: "Cheshire East",
	id: 2068,
	pid: 2026,
	rootId: 32,
	level: 3
},
	"2069": {
	name: "Cheshire West and Chester",
	id: 2069,
	pid: 2026,
	rootId: 32,
	level: 3
},
	"2070": {
	name: "East Merseyside",
	id: 2070,
	pid: 2027,
	rootId: 32,
	level: 3
},
	"2071": {
	name: "Calderdale and Kirklees",
	id: 2071,
	pid: 431,
	rootId: 32,
	level: 3
},
	"2072": {
	name: "Wakefield",
	id: 2072,
	pid: 431,
	rootId: 32,
	level: 3
},
	"2073": {
	name: "West Northamptonshire",
	id: 2073,
	pid: 433,
	rootId: 32,
	level: 3
},
	"2074": {
	name: "North Northamptonshire",
	id: 2074,
	pid: 433,
	rootId: 32,
	level: 3
},
	"2075": {
	name: "Dudley",
	id: 2075,
	pid: 437,
	rootId: 32,
	level: 3
},
	"2076": {
	name: "Sandwell",
	id: 2076,
	pid: 437,
	rootId: 32,
	level: 3
},
	"2077": {
	name: "Walsall",
	id: 2077,
	pid: 437,
	rootId: 32,
	level: 3
},
	"2078": {
	name: "Wolverhampton",
	id: 2078,
	pid: 437,
	rootId: 32,
	level: 3
},
	"2079": {
	name: "Bedford",
	id: 2079,
	pid: 439,
	rootId: 32,
	level: 3
},
	"2080": {
	name: "Central Bedfordshire",
	id: 2080,
	pid: 439,
	rootId: 32,
	level: 3
},
	"2081": {
	name: "VOREIA ELLADA",
	id: 2081,
	pid: 12,
	rootId: 12,
	level: 1,
	children: [
		280,
		281,
		282,
		284
	]
},
	"2082": {
	name: "KENTRIKI ELLADA",
	id: 2082,
	pid: 12,
	rootId: 12,
	level: 1,
	children: [
		283,
		285,
		286,
		287,
		288
	]
},
	"2083": {
	name: "RUP FR — Régions Ultrapériphériques Françaises",
	id: 2083,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		2084,
		277,
		278,
		279,
		2085
	]
},
	"2084": {
	name: "Guadeloupe",
	id: 2084,
	pid: 2083,
	rootId: 11,
	level: 2,
	children: [
		2111
	]
},
	"2085": {
	name: "Mayotte",
	id: 2085,
	pid: 2083,
	rootId: 11,
	level: 2,
	children: [
		2112
	]
},
	"2086": {
	name: "Vzhodna Slovenija",
	id: 2086,
	pid: 119,
	rootId: 29,
	level: 2,
	children: [
		1657,
		1658,
		1659,
		2148,
		2149,
		2150,
		1667,
		2151
	]
},
	"2087": {
	name: "Zahodna Slovenija",
	id: 2087,
	pid: 119,
	rootId: 29,
	level: 2,
	children: [
		2152,
		1663,
		1665,
		1666
	]
},
	"2088": {
	name: "Inner London - West",
	id: 2088,
	pid: 139,
	rootId: 32,
	level: 2,
	children: [
		2169,
		2170,
		2171,
		2172
	]
},
	"2089": {
	name: "Inner London - East",
	id: 2089,
	pid: 139,
	rootId: 32,
	level: 2,
	children: [
		2173,
		2174,
		2175,
		2176,
		2177
	]
},
	"2090": {
	name: "Outer London - East and North East",
	id: 2090,
	pid: 139,
	rootId: 32,
	level: 2,
	children: [
		2178,
		2179,
		2180,
		2181
	]
},
	"2091": {
	name: "Outer London - South",
	id: 2091,
	pid: 139,
	rootId: 32,
	level: 2,
	children: [
		2182,
		2183,
		2184
	]
},
	"2092": {
	name: "Outer London - West and North West",
	id: 2092,
	pid: 139,
	rootId: 32,
	level: 2,
	children: [
		2185,
		2186,
		2187,
		2188,
		2189
	]
},
	"2093": {
	name: "Mecklenburgische Seenplatte",
	id: 2093,
	pid: 206,
	rootId: 6,
	level: 3
},
	"2094": {
	name: "Landkreis Rostock",
	id: 2094,
	pid: 206,
	rootId: 6,
	level: 3
},
	"2095": {
	name: "Vorpommern-Rügen",
	id: 2095,
	pid: 206,
	rootId: 6,
	level: 3
},
	"2096": {
	name: "Nordwestmecklenburg",
	id: 2096,
	pid: 206,
	rootId: 6,
	level: 3
},
	"2097": {
	name: "Vorpommern-Greifswald",
	id: 2097,
	pid: 206,
	rootId: 6,
	level: 3
},
	"2098": {
	name: "Ludwigslust-Parchim",
	id: 2098,
	pid: 206,
	rootId: 6,
	level: 3
},
	"2099": {
	name: "Voreios Tomeas Athinon",
	id: 2099,
	pid: 289,
	rootId: 12,
	level: 3
},
	"2100": {
	name: "Dytikos Tomeas Athinon",
	id: 2100,
	pid: 289,
	rootId: 12,
	level: 3
},
	"2101": {
	name: "Kentrikos Tomeas Athinon",
	id: 2101,
	pid: 289,
	rootId: 12,
	level: 3
},
	"2102": {
	name: "Notios Tomeas Athinon",
	id: 2102,
	pid: 289,
	rootId: 12,
	level: 3
},
	"2103": {
	name: "Anatoliki Attiki",
	id: 2103,
	pid: 289,
	rootId: 12,
	level: 3
},
	"2104": {
	name: "Dytiki Attiki",
	id: 2104,
	pid: 289,
	rootId: 12,
	level: 3
},
	"2105": {
	name: "Peiraias, Nisoi",
	id: 2105,
	pid: 289,
	rootId: 12,
	level: 3
},
	"2106": {
	name: "Grevena, Kozani",
	id: 2106,
	pid: 282,
	rootId: 12,
	level: 3
},
	"2107": {
	name: "Arta, Preveza",
	id: 2107,
	pid: 284,
	rootId: 12,
	level: 3
},
	"2108": {
	name: "Karditsa, Trikala",
	id: 2108,
	pid: 283,
	rootId: 12,
	level: 3
},
	"2109": {
	name: "Argolida, Arkadia",
	id: 2109,
	pid: 288,
	rootId: 12,
	level: 3
},
	"2110": {
	name: "Lakonia, Messinia",
	id: 2110,
	pid: 288,
	rootId: 12,
	level: 3
},
	"2111": {
	name: "Guadeloupe",
	id: 2111,
	pid: 2084,
	rootId: 11,
	level: 3
},
	"2112": {
	name: "Mayotte",
	id: 2112,
	pid: 2085,
	rootId: 11,
	level: 3
},
	"2113": {
	name: "Ciechanowski",
	id: 2113,
	pid: 352,
	rootId: 25,
	level: 3
},
	"2114": {
	name: "Płocki",
	id: 2114,
	pid: 352,
	rootId: 25,
	level: 3
},
	"2115": {
	name: "Ostrołęcki",
	id: 2115,
	pid: 352,
	rootId: 25,
	level: 3
},
	"2116": {
	name: "Siedlecki",
	id: 2116,
	pid: 352,
	rootId: 25,
	level: 3
},
	"2117": {
	name: "Nowosądecki",
	id: 2117,
	pid: 353,
	rootId: 25,
	level: 3
},
	"2118": {
	name: "Nowotarski",
	id: 2118,
	pid: 353,
	rootId: 25,
	level: 3
},
	"2119": {
	name: "Oświęcimski",
	id: 2119,
	pid: 353,
	rootId: 25,
	level: 3
},
	"2120": {
	name: "Koszaliński",
	id: 2120,
	pid: 360,
	rootId: 25,
	level: 3
},
	"2121": {
	name: "Szczecinecko-pyrzycki",
	id: 2121,
	pid: 360,
	rootId: 25,
	level: 3
},
	"2122": {
	name: "Szczeciński",
	id: 2122,
	pid: 360,
	rootId: 25,
	level: 3
},
	"2123": {
	name: "Nyski",
	id: 2123,
	pid: 363,
	rootId: 25,
	level: 3
},
	"2124": {
	name: "Opolski",
	id: 2124,
	pid: 363,
	rootId: 25,
	level: 3
},
	"2125": {
	name: "Grudziądzki",
	id: 2125,
	pid: 364,
	rootId: 25,
	level: 3
},
	"2126": {
	name: "Inowrocławski",
	id: 2126,
	pid: 364,
	rootId: 25,
	level: 3
},
	"2127": {
	name: "Świecki",
	id: 2127,
	pid: 364,
	rootId: 25,
	level: 3
},
	"2128": {
	name: "Włocławski",
	id: 2128,
	pid: 364,
	rootId: 25,
	level: 3
},
	"2129": {
	name: "Słupski",
	id: 2129,
	pid: 366,
	rootId: 25,
	level: 3
},
	"2130": {
	name: "Chojnicki",
	id: 2130,
	pid: 366,
	rootId: 25,
	level: 3
},
	"2131": {
	name: "Starogardzki",
	id: 2131,
	pid: 366,
	rootId: 25,
	level: 3
},
	"2132": {
	name: "Ave",
	id: 2132,
	pid: 367,
	rootId: 26,
	level: 3
},
	"2133": {
	name: "Área Metropolitana do Porto",
	id: 2133,
	pid: 367,
	rootId: 26,
	level: 3
},
	"2134": {
	name: "Alto Tâmega",
	id: 2134,
	pid: 367,
	rootId: 26,
	level: 3
},
	"2135": {
	name: "Tâmega e Sousa",
	id: 2135,
	pid: 367,
	rootId: 26,
	level: 3
},
	"2136": {
	name: "Douro",
	id: 2136,
	pid: 367,
	rootId: 26,
	level: 3
},
	"2137": {
	name: "Terras de Trás-os-Montes",
	id: 2137,
	pid: 367,
	rootId: 26,
	level: 3
},
	"2138": {
	name: "Região de Aveiro",
	id: 2138,
	pid: 369,
	rootId: 26,
	level: 3
},
	"2139": {
	name: "Região de Coimbra",
	id: 2139,
	pid: 369,
	rootId: 26,
	level: 3
},
	"2140": {
	name: "Região de Leiria",
	id: 2140,
	pid: 369,
	rootId: 26,
	level: 3
},
	"2141": {
	name: "Viseu Dão Lafões",
	id: 2141,
	pid: 369,
	rootId: 26,
	level: 3
},
	"2142": {
	name: "Beira Baixa",
	id: 2142,
	pid: 369,
	rootId: 26,
	level: 3
},
	"2143": {
	name: "Médio Tejo",
	id: 2143,
	pid: 369,
	rootId: 26,
	level: 3
},
	"2144": {
	name: "Beiras e Serra da Estrela",
	id: 2144,
	pid: 369,
	rootId: 26,
	level: 3
},
	"2145": {
	name: "Área Metropolitana de Lisboa",
	id: 2145,
	pid: 370,
	rootId: 26,
	level: 3
},
	"2146": {
	name: "Alto Alentejo",
	id: 2146,
	pid: 371,
	rootId: 26,
	level: 3
},
	"2147": {
	name: "Alentejo Central",
	id: 2147,
	pid: 371,
	rootId: 26,
	level: 3
},
	"2148": {
	name: "Savinjska",
	id: 2148,
	pid: 2086,
	rootId: 29,
	level: 3
},
	"2149": {
	name: "Zasavska",
	id: 2149,
	pid: 2086,
	rootId: 29,
	level: 3
},
	"2150": {
	name: "Posavska",
	id: 2150,
	pid: 2086,
	rootId: 29,
	level: 3
},
	"2151": {
	name: "Primorsko-notranjska",
	id: 2151,
	pid: 2086,
	rootId: 29,
	level: 3
},
	"2152": {
	name: "Osrednjeslovenska",
	id: 2152,
	pid: 2087,
	rootId: 29,
	level: 3
},
	"2153": {
	name: "Manchester",
	id: 2153,
	pid: 425,
	rootId: 32,
	level: 3
},
	"2154": {
	name: "Greater Manchester South West",
	id: 2154,
	pid: 425,
	rootId: 32,
	level: 3
},
	"2155": {
	name: "Greater Manchester South East",
	id: 2155,
	pid: 425,
	rootId: 32,
	level: 3
},
	"2156": {
	name: "Greater Manchester North West",
	id: 2156,
	pid: 425,
	rootId: 32,
	level: 3
},
	"2157": {
	name: "Greater Manchester North East",
	id: 2157,
	pid: 425,
	rootId: 32,
	level: 3
},
	"2158": {
	name: "Lancaster and Wyre",
	id: 2158,
	pid: 426,
	rootId: 32,
	level: 3
},
	"2159": {
	name: "Mid Lancashire",
	id: 2159,
	pid: 426,
	rootId: 32,
	level: 3
},
	"2160": {
	name: "East Lancashire",
	id: 2160,
	pid: 426,
	rootId: 32,
	level: 3
},
	"2161": {
	name: "Chorley and West Lancashire",
	id: 2161,
	pid: 426,
	rootId: 32,
	level: 3
},
	"2162": {
	name: "Norwich and East Norfolk",
	id: 2162,
	pid: 438,
	rootId: 32,
	level: 3
},
	"2163": {
	name: "North and West Norfolk",
	id: 2163,
	pid: 438,
	rootId: 32,
	level: 3
},
	"2164": {
	name: "Breckland and South Norfolk",
	id: 2164,
	pid: 438,
	rootId: 32,
	level: 3
},
	"2165": {
	name: "Essex Haven Gateway",
	id: 2165,
	pid: 440,
	rootId: 32,
	level: 3
},
	"2166": {
	name: "West Essex",
	id: 2166,
	pid: 440,
	rootId: 32,
	level: 3
},
	"2167": {
	name: "Heart of Essex",
	id: 2167,
	pid: 440,
	rootId: 32,
	level: 3
},
	"2168": {
	name: "Essex Thames Gateway",
	id: 2168,
	pid: 440,
	rootId: 32,
	level: 3
},
	"2169": {
	name: "Camden and City of London",
	id: 2169,
	pid: 2088,
	rootId: 32,
	level: 3
},
	"2170": {
	name: "Westminster",
	id: 2170,
	pid: 2088,
	rootId: 32,
	level: 3
},
	"2171": {
	name: "Kensington & Chelsea and Hammersmith & Fulham",
	id: 2171,
	pid: 2088,
	rootId: 32,
	level: 3
},
	"2172": {
	name: "Wandsworth",
	id: 2172,
	pid: 2088,
	rootId: 32,
	level: 3
},
	"2173": {
	name: "Hackney and Newham",
	id: 2173,
	pid: 2089,
	rootId: 32,
	level: 3
},
	"2174": {
	name: "Tower Hamlets",
	id: 2174,
	pid: 2089,
	rootId: 32,
	level: 3
},
	"2175": {
	name: "Haringey and Islington",
	id: 2175,
	pid: 2089,
	rootId: 32,
	level: 3
},
	"2176": {
	name: "Lewisham and Southwark",
	id: 2176,
	pid: 2089,
	rootId: 32,
	level: 3
},
	"2177": {
	name: "Lambeth",
	id: 2177,
	pid: 2089,
	rootId: 32,
	level: 3
},
	"2178": {
	name: "Bexley and Greenwich",
	id: 2178,
	pid: 2090,
	rootId: 32,
	level: 3
},
	"2179": {
	name: "Barking & Dagenham and Havering",
	id: 2179,
	pid: 2090,
	rootId: 32,
	level: 3
},
	"2180": {
	name: "Redbridge and Waltham Forest",
	id: 2180,
	pid: 2090,
	rootId: 32,
	level: 3
},
	"2181": {
	name: "Enfield",
	id: 2181,
	pid: 2090,
	rootId: 32,
	level: 3
},
	"2182": {
	name: "Bromley",
	id: 2182,
	pid: 2091,
	rootId: 32,
	level: 3
},
	"2183": {
	name: "Croydon",
	id: 2183,
	pid: 2091,
	rootId: 32,
	level: 3
},
	"2184": {
	name: "Merton, Kingston upon Thames and Sutton",
	id: 2184,
	pid: 2091,
	rootId: 32,
	level: 3
},
	"2185": {
	name: "Barnet",
	id: 2185,
	pid: 2092,
	rootId: 32,
	level: 3
},
	"2186": {
	name: "Brent",
	id: 2186,
	pid: 2092,
	rootId: 32,
	level: 3
},
	"2187": {
	name: "Ealing",
	id: 2187,
	pid: 2092,
	rootId: 32,
	level: 3
},
	"2188": {
	name: "Harrow and Hillingdon",
	id: 2188,
	pid: 2092,
	rootId: 32,
	level: 3
},
	"2189": {
	name: "Hounslow and Richmond upon Thames",
	id: 2189,
	pid: 2092,
	rootId: 32,
	level: 3
},
	"2190": {
	name: "West Surrey",
	id: 2190,
	pid: 444,
	rootId: 32,
	level: 3
},
	"2191": {
	name: "East Surrey",
	id: 2191,
	pid: 444,
	rootId: 32,
	level: 3
},
	"2192": {
	name: "West Sussex (South West)",
	id: 2192,
	pid: 444,
	rootId: 32,
	level: 3
},
	"2193": {
	name: "West Sussex (North East)",
	id: 2193,
	pid: 444,
	rootId: 32,
	level: 3
},
	"2194": {
	name: "South Hampshire",
	id: 2194,
	pid: 445,
	rootId: 32,
	level: 3
},
	"2195": {
	name: "Central Hampshire",
	id: 2195,
	pid: 445,
	rootId: 32,
	level: 3
},
	"2196": {
	name: "North Hampshire",
	id: 2196,
	pid: 445,
	rootId: 32,
	level: 3
},
	"2197": {
	name: "Kent Thames Gateway",
	id: 2197,
	pid: 446,
	rootId: 32,
	level: 3
},
	"2198": {
	name: "East Kent",
	id: 2198,
	pid: 446,
	rootId: 32,
	level: 3
},
	"2199": {
	name: "Mid Kent",
	id: 2199,
	pid: 446,
	rootId: 32,
	level: 3
},
	"2200": {
	name: "West Kent",
	id: 2200,
	pid: 446,
	rootId: 32,
	level: 3
},
	"2201": {
	name: "Shqipëria",
	id: 2201,
	rootId: 2201,
	level: 0,
	children: [
		2203
	]
},
	"2202": {
	name: "Serbia",
	id: 2202,
	rootId: 2202,
	level: 0,
	children: [
		2218,
		2219
	]
},
	"2203": {
	name: "Shqipëria",
	id: 2203,
	pid: 2201,
	rootId: 2201,
	level: 1,
	children: [
		2220,
		2221,
		2222
	]
},
	"2204": {
	name: "Centre — Val de Loire",
	id: 2204,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		258
	]
},
	"2205": {
	name: "Bourgogne-Franche-Comté",
	id: 2205,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		260,
		264
	]
},
	"2206": {
	name: "Normandie",
	id: 2206,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		259,
		257
	]
},
	"2207": {
	name: "Hauts-de-France",
	id: 2207,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		261,
		256
	]
},
	"2208": {
	name: "Grand Est",
	id: 2208,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		263,
		255,
		262
	]
},
	"2209": {
	name: "Pays de la Loire",
	id: 2209,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		265
	]
},
	"2210": {
	name: "Bretagne",
	id: 2210,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		266
	]
},
	"2211": {
	name: "Nouvelle-Aquitaine",
	id: 2211,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		268,
		270,
		267
	]
},
	"2212": {
	name: "Occitanie",
	id: 2212,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		273,
		269
	]
},
	"2213": {
	name: "Provence-Alpes-Côte d’Azur",
	id: 2213,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		274
	]
},
	"2214": {
	name: "Corse",
	id: 2214,
	pid: 11,
	rootId: 11,
	level: 1,
	children: [
		275
	]
},
	"2215": {
	name: "Makroregion centralny",
	id: 2215,
	pid: 25,
	rootId: 25,
	level: 1,
	children: [
		351,
		357
	]
},
	"2216": {
	name: "Makroregion wschodni",
	id: 2216,
	pid: 25,
	rootId: 25,
	level: 1,
	children: [
		355,
		356,
		358
	]
},
	"2217": {
	name: "Makroregion województwo mazowieckie",
	id: 2217,
	pid: 25,
	rootId: 25,
	level: 1,
	children: [
		2230,
		2231
	]
},
	"2218": {
	name: "Serbia - sever",
	id: 2218,
	pid: 2202,
	rootId: 2202,
	level: 1,
	children: [
		2232,
		2233
	]
},
	"2219": {
	name: "Serbia - jug",
	id: 2219,
	pid: 2202,
	rootId: 2202,
	level: 1,
	children: [
		2234,
		2235
	]
},
	"2220": {
	name: "Veri",
	id: 2220,
	pid: 2203,
	rootId: 2201,
	level: 2,
	children: [
		2238,
		2239,
		2240,
		2241,
		2242
	]
},
	"2221": {
	name: "Qender",
	id: 2221,
	pid: 2203,
	rootId: 2201,
	level: 2,
	children: [
		2243,
		2244
	]
},
	"2222": {
	name: "Jug",
	id: 2222,
	pid: 2203,
	rootId: 2201,
	level: 2,
	children: [
		2245,
		2246,
		2247,
		2248,
		2249
	]
},
	"2223": {
	name: "Budapest",
	id: 2223,
	pid: 85,
	rootId: 14,
	level: 2,
	children: [
		1308
	]
},
	"2224": {
	name: "Pest",
	id: 2224,
	pid: 85,
	rootId: 14,
	level: 2,
	children: [
		1309
	]
},
	"2225": {
	name: "Northern and Western",
	id: 2225,
	pid: 88,
	rootId: 15,
	level: 2,
	children: [
		1328,
		1330
	]
},
	"2226": {
	name: "Southern",
	id: 2226,
	pid: 88,
	rootId: 15,
	level: 2,
	children: [
		1333,
		1334,
		1335
	]
},
	"2227": {
	name: "Eastern and Midland",
	id: 2227,
	pid: 88,
	rootId: 15,
	level: 2,
	children: [
		1331,
		1332,
		1329
	]
},
	"2228": {
	name: "Sostinės regionas",
	id: 2228,
	pid: 96,
	rootId: 19,
	level: 2,
	children: [
		1450
	]
},
	"2229": {
	name: "Vidurio ir vakarų Lietuvos regionas",
	id: 2229,
	pid: 96,
	rootId: 19,
	level: 2,
	children: [
		1441,
		1442,
		1443,
		1444,
		1445,
		1446,
		1447,
		1448,
		1449
	]
},
	"2230": {
	name: "Warszawski stołeczny",
	id: 2230,
	pid: 2217,
	rootId: 25,
	level: 2,
	children: [
		1526,
		1971,
		1972
	]
},
	"2231": {
	name: "Mazowiecki regionalny",
	id: 2231,
	pid: 2217,
	rootId: 25,
	level: 2,
	children: [
		1970,
		2113,
		2114,
		2115,
		2116,
		2252
	]
},
	"2232": {
	name: "City of Belgrade",
	id: 2232,
	pid: 2218,
	rootId: 2202,
	level: 2,
	children: [
		2253
	]
},
	"2233": {
	name: "Autonomous Province of Vojvodina",
	id: 2233,
	pid: 2218,
	rootId: 2202,
	level: 2,
	children: [
		2254,
		2255,
		2256,
		2257,
		2258,
		2259,
		2260
	]
},
	"2234": {
	name: "Region Šumadije i Zapadne Srbije",
	id: 2234,
	pid: 2219,
	rootId: 2202,
	level: 2,
	children: [
		2261,
		2262,
		2263,
		2264,
		2265,
		2266,
		2267,
		2268
	]
},
	"2235": {
	name: "Region Južne i Istočne Srbije",
	id: 2235,
	pid: 2219,
	rootId: 2202,
	level: 2,
	children: [
		2269,
		2270,
		2271,
		2272,
		2273,
		2274,
		2275,
		2276,
		2277
	]
},
	"2236": {
	name: "West Central Scotland",
	id: 2236,
	pid: 143,
	rootId: 32,
	level: 2,
	children: [
		1872,
		1875,
		1876,
		1877
	]
},
	"2237": {
	name: "Southern Scotland",
	id: 2237,
	pid: 143,
	rootId: 32,
	level: 2,
	children: [
		1867,
		1873,
		1874,
		1878,
		1879
	]
},
	"2238": {
	name: "Dibër",
	id: 2238,
	pid: 2220,
	rootId: 2201,
	level: 3
},
	"2239": {
	name: "Durrës",
	id: 2239,
	pid: 2220,
	rootId: 2201,
	level: 3
},
	"2240": {
	name: "Kukës",
	id: 2240,
	pid: 2220,
	rootId: 2201,
	level: 3
},
	"2241": {
	name: "Lezhë",
	id: 2241,
	pid: 2220,
	rootId: 2201,
	level: 3
},
	"2242": {
	name: "Shkodër",
	id: 2242,
	pid: 2220,
	rootId: 2201,
	level: 3
},
	"2243": {
	name: "Elbasan",
	id: 2243,
	pid: 2221,
	rootId: 2201,
	level: 3
},
	"2244": {
	name: "Tiranë",
	id: 2244,
	pid: 2221,
	rootId: 2201,
	level: 3
},
	"2245": {
	name: "Berat",
	id: 2245,
	pid: 2222,
	rootId: 2201,
	level: 3
},
	"2246": {
	name: "Fier",
	id: 2246,
	pid: 2222,
	rootId: 2201,
	level: 3
},
	"2247": {
	name: "Gjirokastër",
	id: 2247,
	pid: 2222,
	rootId: 2201,
	level: 3
},
	"2248": {
	name: "Korcë",
	id: 2248,
	pid: 2222,
	rootId: 2201,
	level: 3
},
	"2249": {
	name: "Vlorë",
	id: 2249,
	pid: 2222,
	rootId: 2201,
	level: 3
},
	"2250": {
	name: "Göttingen",
	id: 2250,
	pid: 207,
	rootId: 6,
	level: 3
},
	"2251": {
	name: "Trøndelag",
	id: 2251,
	pid: 349,
	rootId: 24,
	level: 3
},
	"2252": {
	name: "Żyrardowski",
	id: 2252,
	pid: 2231,
	rootId: 25,
	level: 3
},
	"2253": {
	name: "City of Belgrade",
	id: 2253,
	pid: 2232,
	rootId: 2202,
	level: 3
},
	"2254": {
	name: "Zapadnobačka oblast",
	id: 2254,
	pid: 2233,
	rootId: 2202,
	level: 3
},
	"2255": {
	name: "Južnobanatska oblast",
	id: 2255,
	pid: 2233,
	rootId: 2202,
	level: 3
},
	"2256": {
	name: "Južnobačka oblast",
	id: 2256,
	pid: 2233,
	rootId: 2202,
	level: 3
},
	"2257": {
	name: "Severnobanatska oblast",
	id: 2257,
	pid: 2233,
	rootId: 2202,
	level: 3
},
	"2258": {
	name: "Severnobačka oblast",
	id: 2258,
	pid: 2233,
	rootId: 2202,
	level: 3
},
	"2259": {
	name: "Srednjobanatska oblast",
	id: 2259,
	pid: 2233,
	rootId: 2202,
	level: 3
},
	"2260": {
	name: "Sremska oblast",
	id: 2260,
	pid: 2233,
	rootId: 2202,
	level: 3
},
	"2261": {
	name: "Zlatiborska oblast",
	id: 2261,
	pid: 2234,
	rootId: 2202,
	level: 3
},
	"2262": {
	name: "Kolubarska oblast",
	id: 2262,
	pid: 2234,
	rootId: 2202,
	level: 3
},
	"2263": {
	name: "Mačvanska oblast",
	id: 2263,
	pid: 2234,
	rootId: 2202,
	level: 3
},
	"2264": {
	name: "Moravička oblast",
	id: 2264,
	pid: 2234,
	rootId: 2202,
	level: 3
},
	"2265": {
	name: "Pomoravska oblast",
	id: 2265,
	pid: 2234,
	rootId: 2202,
	level: 3
},
	"2266": {
	name: "Rasinska oblast",
	id: 2266,
	pid: 2234,
	rootId: 2202,
	level: 3
},
	"2267": {
	name: "Raška oblast",
	id: 2267,
	pid: 2234,
	rootId: 2202,
	level: 3
},
	"2268": {
	name: "Šumadijska oblast",
	id: 2268,
	pid: 2234,
	rootId: 2202,
	level: 3
},
	"2269": {
	name: "Borska oblast",
	id: 2269,
	pid: 2235,
	rootId: 2202,
	level: 3
},
	"2270": {
	name: "Braničevska oblast",
	id: 2270,
	pid: 2235,
	rootId: 2202,
	level: 3
},
	"2271": {
	name: "Zaječarska oblast",
	id: 2271,
	pid: 2235,
	rootId: 2202,
	level: 3
},
	"2272": {
	name: "Jablanička oblast",
	id: 2272,
	pid: 2235,
	rootId: 2202,
	level: 3
},
	"2273": {
	name: "Nišavska oblast",
	id: 2273,
	pid: 2235,
	rootId: 2202,
	level: 3
},
	"2274": {
	name: "Pirotska oblast",
	id: 2274,
	pid: 2235,
	rootId: 2202,
	level: 3
},
	"2275": {
	name: "Podunavska oblast",
	id: 2275,
	pid: 2235,
	rootId: 2202,
	level: 3
},
	"2276": {
	name: "Pčinjska oblast",
	id: 2276,
	pid: 2235,
	rootId: 2202,
	level: 3
},
	"2277": {
	name: "Toplička oblast",
	id: 2277,
	pid: 2235,
	rootId: 2202,
	level: 3
},
	"2278": {
	name: "Armagh City, Banbridge and Craigavon",
	id: 2278,
	pid: 457,
	rootId: 32,
	level: 3
},
	"2279": {
	name: "Newry, Mourne and Down",
	id: 2279,
	pid: 457,
	rootId: 32,
	level: 3
},
	"2280": {
	name: "Ards and North Down",
	id: 2280,
	pid: 457,
	rootId: 32,
	level: 3
},
	"2281": {
	name: "Derry City and Strabane",
	id: 2281,
	pid: 457,
	rootId: 32,
	level: 3
},
	"2282": {
	name: "Mid Ulster",
	id: 2282,
	pid: 457,
	rootId: 32,
	level: 3
},
	"2283": {
	name: "Causeway Coast and Glens",
	id: 2283,
	pid: 457,
	rootId: 32,
	level: 3
},
	"2284": {
	name: "Antrim and Newtownabbey",
	id: 2284,
	pid: 457,
	rootId: 32,
	level: 3
},
	"2285": {
	name: "Lisburn and Castlereagh",
	id: 2285,
	pid: 457,
	rootId: 32,
	level: 3
},
	"2286": {
	name: "Mid and East Antrim",
	id: 2286,
	pid: 457,
	rootId: 32,
	level: 3
},
	"2287": {
	name: "Fermanagh and Omagh",
	id: 2287,
	pid: 457,
	rootId: 32,
	level: 3
},
	"2288": {
	name: "Panonska Hrvatska",
	id: 2288,
	pid: 84,
	rootId: 13,
	level: 2,
	children: [
		2046,
		2047,
		2048,
		2049,
		2050,
		2051,
		2052,
		2053
	]
},
	"2289": {
	name: "Grad Zagreb",
	id: 2289,
	pid: 84,
	rootId: 13,
	level: 2,
	children: [
		2040
	]
},
	"2290": {
	name: "Sjeverna Hrvatska",
	id: 2290,
	pid: 84,
	rootId: 13,
	level: 2,
	children: [
		2045,
		2043,
		2044,
		2042,
		2041
	]
},
	"2291": {
	name: "Oslo og Viken",
	id: 2291,
	pid: 104,
	rootId: 24,
	level: 2,
	children: [
		1500,
		2299
	]
},
	"2292": {
	name: "Agder og Sør-Østlandet",
	id: 2292,
	pid: 104,
	rootId: 24,
	level: 2,
	children: [
		2300,
		2301
	]
},
	"2293": {
	name: "Jan Mayen and Svalbard",
	id: 2293,
	pid: 104,
	rootId: 24,
	level: 2,
	children: [
		2303,
		2304
	]
},
	"2294": {
	name: "Arr. Tournai-Mouscron",
	id: 2294,
	pid: 161,
	rootId: 1,
	level: 3
},
	"2295": {
	name: "Arr. La Louvière",
	id: 2295,
	pid: 161,
	rootId: 1,
	level: 3
},
	"2296": {
	name: "Sud Sardegna",
	id: 2296,
	pid: 326,
	rootId: 17,
	level: 3
},
	"2297": {
	name: "Innlandet",
	id: 2297,
	pid: 345,
	rootId: 24,
	level: 3
},
	"2298": {
	name: "Troms og Finnmark",
	id: 2298,
	pid: 350,
	rootId: 24,
	level: 3
},
	"2299": {
	name: "Viken",
	id: 2299,
	pid: 2291,
	rootId: 24,
	level: 3
},
	"2300": {
	name: "Vestfold og Telemark",
	id: 2300,
	pid: 2292,
	rootId: 24,
	level: 3
},
	"2301": {
	name: "Agder",
	id: 2301,
	pid: 2292,
	rootId: 24,
	level: 3
},
	"2302": {
	name: "Vestland",
	id: 2302,
	pid: 348,
	rootId: 24,
	level: 3
},
	"2303": {
	name: "Jan Mayen",
	id: 2303,
	pid: 2293,
	rootId: 24,
	level: 3
},
	"2304": {
	name: "Svalbard",
	id: 2304,
	pid: 2293,
	rootId: 24,
	level: 3
}
};

var yearlyNutsIdToId = {
	"2003/AT": 0,
	"2003/BE": 1,
	"2003/BG": 2,
	"2003/CH": 3,
	"2003/CY": 4,
	"2003/CZ": 5,
	"2003/DE": 6,
	"2003/DK": 7,
	"2003/EE": 8,
	"2003/ES": 9,
	"2003/FI": 10,
	"2003/FR": 11,
	"2003/GR": 12,
	"2003/HR": 13,
	"2003/HU": 14,
	"2003/IE": 15,
	"2003/IS": 16,
	"2003/IT": 17,
	"2003/LI": 18,
	"2003/LT": 19,
	"2003/LU": 20,
	"2003/LV": 21,
	"2003/MT": 22,
	"2003/NL": 23,
	"2003/NO": 24,
	"2003/PL": 25,
	"2003/PT": 26,
	"2003/RO": 27,
	"2003/SE": 28,
	"2003/SI": 29,
	"2003/SK": 30,
	"2003/TR": 31,
	"2003/UK": 32,
	"2003/AT1": 33,
	"2003/AT2": 34,
	"2003/AT3": 35,
	"2003/BE1": 36,
	"2003/BE2": 37,
	"2003/BE3": 38,
	"2003/BG3": 39,
	"2003/BG4": 40,
	"2003/CH0": 41,
	"2003/CY0": 42,
	"2003/CZ0": 43,
	"2003/DE1": 44,
	"2003/DE2": 45,
	"2003/DE3": 46,
	"2003/DE4": 47,
	"2003/DE5": 48,
	"2003/DE6": 49,
	"2003/DE7": 50,
	"2003/DE8": 51,
	"2003/DE9": 52,
	"2003/DEA": 53,
	"2003/DEB": 54,
	"2003/DEC": 55,
	"2003/DED": 56,
	"2003/DEE": 57,
	"2003/DEF": 58,
	"2003/DEG": 59,
	"2003/DK0": 60,
	"2003/EE0": 61,
	"2003/ES1": 62,
	"2003/ES2": 63,
	"2003/ES3": 64,
	"2003/ES4": 65,
	"2003/ES5": 66,
	"2003/ES6": 67,
	"2003/ES7": 68,
	"2003/FI1": 69,
	"2003/FI2": 70,
	"2003/FR1": 71,
	"2003/FR2": 72,
	"2003/FR3": 73,
	"2003/FR4": 74,
	"2003/FR5": 75,
	"2003/FR6": 76,
	"2003/FR7": 77,
	"2003/FR8": 78,
	"2003/FR9": 79,
	"2003/GR1": 80,
	"2003/GR2": 81,
	"2003/GR3": 82,
	"2003/GR4": 83,
	"2003/HR0": 84,
	"2003/HU1": 85,
	"2003/HU2": 86,
	"2003/HU3": 87,
	"2003/IE0": 88,
	"2003/IS0": 89,
	"2003/ITC": 90,
	"2003/ITD": 91,
	"2003/ITE": 92,
	"2003/ITF": 93,
	"2003/ITG": 94,
	"2003/LI0": 95,
	"2003/LT0": 96,
	"2003/LU0": 97,
	"2003/LV0": 98,
	"2003/MT0": 99,
	"2003/NL1": 100,
	"2003/NL2": 101,
	"2003/NL3": 102,
	"2003/NL4": 103,
	"2003/NO0": 104,
	"2003/PL1": 105,
	"2003/PL2": 106,
	"2003/PL3": 107,
	"2003/PL4": 108,
	"2003/PL5": 109,
	"2003/PL6": 110,
	"2003/PT1": 111,
	"2003/PT2": 112,
	"2003/PT3": 113,
	"2003/RO1": 114,
	"2003/RO2": 115,
	"2003/RO3": 116,
	"2003/RO4": 117,
	"2003/SE0": 118,
	"2003/SI0": 119,
	"2003/SK0": 120,
	"2003/TR1": 121,
	"2003/TR2": 122,
	"2003/TR3": 123,
	"2003/TR4": 124,
	"2003/TR5": 125,
	"2003/TR6": 126,
	"2003/TR7": 127,
	"2003/TR8": 128,
	"2003/TR9": 129,
	"2003/TRA": 130,
	"2003/TRB": 131,
	"2003/TRC": 132,
	"2003/UKC": 133,
	"2003/UKD": 134,
	"2003/UKE": 135,
	"2003/UKF": 136,
	"2003/UKG": 137,
	"2003/UKH": 138,
	"2003/UKI": 139,
	"2003/UKJ": 140,
	"2003/UKK": 141,
	"2003/UKL": 142,
	"2003/UKM": 143,
	"2003/UKN": 144,
	"2003/AT11": 145,
	"2003/AT12": 146,
	"2003/AT13": 147,
	"2003/AT21": 148,
	"2003/AT22": 149,
	"2003/AT31": 150,
	"2003/AT32": 151,
	"2003/AT33": 152,
	"2003/AT34": 153,
	"2003/BE10": 154,
	"2003/BE21": 155,
	"2003/BE22": 156,
	"2003/BE23": 157,
	"2003/BE24": 158,
	"2003/BE25": 159,
	"2003/BE31": 160,
	"2003/BE32": 161,
	"2003/BE33": 162,
	"2003/BE34": 163,
	"2003/BE35": 164,
	"2003/BG31": 165,
	"2003/BG32": 166,
	"2003/BG33": 167,
	"2003/BG34": 168,
	"2003/BG41": 169,
	"2003/BG42": 170,
	"2003/CH01": 171,
	"2003/CH02": 172,
	"2003/CH03": 173,
	"2003/CH04": 174,
	"2003/CH05": 175,
	"2003/CH06": 176,
	"2003/CH07": 177,
	"2003/CY00": 178,
	"2003/CZ01": 179,
	"2003/CZ02": 180,
	"2003/CZ03": 181,
	"2003/CZ04": 182,
	"2003/CZ05": 183,
	"2003/CZ06": 184,
	"2003/CZ07": 185,
	"2003/CZ08": 186,
	"2003/DE11": 187,
	"2003/DE12": 188,
	"2003/DE13": 189,
	"2003/DE14": 190,
	"2003/DE21": 191,
	"2003/DE22": 192,
	"2003/DE23": 193,
	"2003/DE24": 194,
	"2003/DE25": 195,
	"2003/DE26": 196,
	"2003/DE27": 197,
	"2003/DE30": 198,
	"2003/DE41": 199,
	"2003/DE42": 200,
	"2003/DE50": 201,
	"2003/DE60": 202,
	"2003/DE71": 203,
	"2003/DE72": 204,
	"2003/DE73": 205,
	"2003/DE80": 206,
	"2003/DE91": 207,
	"2003/DE92": 208,
	"2003/DE93": 209,
	"2003/DE94": 210,
	"2003/DEA1": 211,
	"2003/DEA2": 212,
	"2003/DEA3": 213,
	"2003/DEA4": 214,
	"2003/DEA5": 215,
	"2003/DEB1": 216,
	"2003/DEB2": 217,
	"2003/DEB3": 218,
	"2003/DEC0": 219,
	"2003/DED1": 220,
	"2003/DED2": 221,
	"2003/DED3": 222,
	"2003/DEE1": 223,
	"2003/DEE2": 224,
	"2003/DEE3": 225,
	"2003/DEF0": 226,
	"2003/DEG0": 227,
	"2003/DK00": 228,
	"2003/EE00": 229,
	"2003/ES11": 230,
	"2003/ES12": 231,
	"2003/ES13": 232,
	"2003/ES21": 233,
	"2003/ES22": 234,
	"2003/ES23": 235,
	"2003/ES24": 236,
	"2003/ES30": 237,
	"2003/ES41": 238,
	"2003/ES42": 239,
	"2003/ES43": 240,
	"2003/ES51": 241,
	"2003/ES52": 242,
	"2003/ES53": 243,
	"2003/ES61": 244,
	"2003/ES62": 245,
	"2003/ES63": 246,
	"2003/ES64": 247,
	"2003/ES70": 248,
	"2003/FI13": 249,
	"2003/FI18": 250,
	"2003/FI19": 251,
	"2003/FI1A": 252,
	"2003/FI20": 253,
	"2003/FR10": 254,
	"2003/FR21": 255,
	"2003/FR22": 256,
	"2003/FR23": 257,
	"2003/FR24": 258,
	"2003/FR25": 259,
	"2003/FR26": 260,
	"2003/FR30": 261,
	"2003/FR41": 262,
	"2003/FR42": 263,
	"2003/FR43": 264,
	"2003/FR51": 265,
	"2003/FR52": 266,
	"2003/FR53": 267,
	"2003/FR61": 268,
	"2003/FR62": 269,
	"2003/FR63": 270,
	"2003/FR71": 271,
	"2003/FR72": 272,
	"2003/FR81": 273,
	"2003/FR82": 274,
	"2003/FR83": 275,
	"2003/FR91": 276,
	"2003/FR92": 277,
	"2003/FR93": 278,
	"2003/FR94": 279,
	"2003/GR11": 280,
	"2003/GR12": 281,
	"2003/GR13": 282,
	"2003/GR14": 283,
	"2003/GR21": 284,
	"2003/GR22": 285,
	"2003/GR23": 286,
	"2003/GR24": 287,
	"2003/GR25": 288,
	"2003/GR30": 289,
	"2003/GR41": 290,
	"2003/GR42": 291,
	"2003/GR43": 292,
	"2003/HR01": 293,
	"2003/HR02": 294,
	"2003/HR03": 295,
	"2003/HU10": 296,
	"2003/HU21": 297,
	"2003/HU22": 298,
	"2003/HU23": 299,
	"2003/HU31": 300,
	"2003/HU32": 301,
	"2003/HU33": 302,
	"2003/IE01": 303,
	"2003/IE02": 304,
	"2003/IS00": 305,
	"2003/ITC1": 306,
	"2003/ITC2": 307,
	"2003/ITC3": 308,
	"2003/ITC4": 309,
	"2003/ITD1": 310,
	"2003/ITD2": 311,
	"2003/ITD3": 312,
	"2003/ITD4": 313,
	"2003/ITD5": 314,
	"2003/ITE1": 315,
	"2003/ITE2": 316,
	"2003/ITE3": 317,
	"2003/ITE4": 318,
	"2003/ITF1": 319,
	"2003/ITF2": 320,
	"2003/ITF3": 321,
	"2003/ITF4": 322,
	"2003/ITF5": 323,
	"2003/ITF6": 324,
	"2003/ITG1": 325,
	"2003/ITG2": 326,
	"2003/LI00": 327,
	"2003/LT00": 328,
	"2003/LU00": 329,
	"2003/LV00": 330,
	"2003/MT00": 331,
	"2003/NL11": 332,
	"2003/NL12": 333,
	"2003/NL13": 334,
	"2003/NL21": 335,
	"2003/NL22": 336,
	"2003/NL23": 337,
	"2003/NL31": 338,
	"2003/NL32": 339,
	"2003/NL33": 340,
	"2003/NL34": 341,
	"2003/NL41": 342,
	"2003/NL42": 343,
	"2003/NO01": 344,
	"2003/NO02": 345,
	"2003/NO03": 346,
	"2003/NO04": 347,
	"2003/NO05": 348,
	"2003/NO06": 349,
	"2003/NO07": 350,
	"2003/PL11": 351,
	"2003/PL12": 352,
	"2003/PL21": 353,
	"2003/PL22": 354,
	"2003/PL31": 355,
	"2003/PL32": 356,
	"2003/PL33": 357,
	"2003/PL34": 358,
	"2003/PL41": 359,
	"2003/PL42": 360,
	"2003/PL43": 361,
	"2003/PL51": 362,
	"2003/PL52": 363,
	"2003/PL61": 364,
	"2003/PL62": 365,
	"2003/PL63": 366,
	"2003/PT11": 367,
	"2003/PT15": 368,
	"2003/PT16": 369,
	"2003/PT17": 370,
	"2003/PT18": 371,
	"2003/PT20": 372,
	"2003/PT30": 373,
	"2003/RO11": 374,
	"2003/RO12": 375,
	"2003/RO21": 376,
	"2003/RO22": 377,
	"2003/RO31": 378,
	"2003/RO32": 379,
	"2003/RO41": 380,
	"2003/RO42": 381,
	"2003/SE01": 382,
	"2003/SE02": 383,
	"2003/SE04": 384,
	"2003/SE06": 385,
	"2003/SE07": 386,
	"2003/SE08": 387,
	"2003/SE09": 388,
	"2003/SE0A": 389,
	"2003/SI00": 390,
	"2003/SK01": 391,
	"2003/SK02": 392,
	"2003/SK03": 393,
	"2003/SK04": 394,
	"2003/TR10": 395,
	"2003/TR21": 396,
	"2003/TR22": 397,
	"2003/TR31": 398,
	"2003/TR32": 399,
	"2003/TR33": 400,
	"2003/TR41": 401,
	"2003/TR42": 402,
	"2003/TR51": 403,
	"2003/TR52": 404,
	"2003/TR61": 405,
	"2003/TR62": 406,
	"2003/TR63": 407,
	"2003/TR71": 408,
	"2003/TR72": 409,
	"2003/TR81": 410,
	"2003/TR82": 411,
	"2003/TR83": 412,
	"2003/TR90": 413,
	"2003/TRA1": 414,
	"2003/TRA2": 415,
	"2003/TRB1": 416,
	"2003/TRB2": 417,
	"2003/TRC1": 418,
	"2003/TRC2": 419,
	"2003/TRC3": 420,
	"2003/UKC1": 421,
	"2003/UKC2": 422,
	"2003/UKD1": 423,
	"2003/UKD2": 424,
	"2003/UKD3": 425,
	"2003/UKD4": 426,
	"2003/UKD5": 427,
	"2003/UKE1": 428,
	"2003/UKE2": 429,
	"2003/UKE3": 430,
	"2003/UKE4": 431,
	"2003/UKF1": 432,
	"2003/UKF2": 433,
	"2003/UKF3": 434,
	"2003/UKG1": 435,
	"2003/UKG2": 436,
	"2003/UKG3": 437,
	"2003/UKH1": 438,
	"2003/UKH2": 439,
	"2003/UKH3": 440,
	"2003/UKI1": 441,
	"2003/UKI2": 442,
	"2003/UKJ1": 443,
	"2003/UKJ2": 444,
	"2003/UKJ3": 445,
	"2003/UKJ4": 446,
	"2003/UKK1": 447,
	"2003/UKK2": 448,
	"2003/UKK3": 449,
	"2003/UKK4": 450,
	"2003/UKL1": 451,
	"2003/UKL2": 452,
	"2003/UKM1": 453,
	"2003/UKM2": 454,
	"2003/UKM3": 455,
	"2003/UKM4": 456,
	"2003/UKN0": 457,
	"2003/AT111": 458,
	"2003/AT112": 459,
	"2003/AT113": 460,
	"2003/AT121": 461,
	"2003/AT122": 462,
	"2003/AT123": 463,
	"2003/AT124": 464,
	"2003/AT125": 465,
	"2003/AT126": 466,
	"2003/AT127": 467,
	"2003/AT130": 468,
	"2003/AT211": 469,
	"2003/AT212": 470,
	"2003/AT213": 471,
	"2003/AT221": 472,
	"2003/AT222": 473,
	"2003/AT223": 474,
	"2003/AT224": 475,
	"2003/AT225": 476,
	"2003/AT226": 477,
	"2003/AT311": 478,
	"2003/AT312": 479,
	"2003/AT313": 480,
	"2003/AT314": 481,
	"2003/AT315": 482,
	"2003/AT321": 483,
	"2003/AT322": 484,
	"2003/AT323": 485,
	"2003/AT331": 486,
	"2003/AT332": 487,
	"2003/AT333": 488,
	"2003/AT334": 489,
	"2003/AT335": 490,
	"2003/AT341": 491,
	"2003/AT342": 492,
	"2003/BE100": 493,
	"2003/BE211": 494,
	"2003/BE212": 495,
	"2003/BE213": 496,
	"2003/BE221": 497,
	"2003/BE222": 498,
	"2003/BE223": 499,
	"2003/BE231": 500,
	"2003/BE232": 501,
	"2003/BE233": 502,
	"2003/BE234": 503,
	"2003/BE235": 504,
	"2003/BE236": 505,
	"2003/BE241": 506,
	"2003/BE242": 507,
	"2003/BE251": 508,
	"2003/BE252": 509,
	"2003/BE253": 510,
	"2003/BE254": 511,
	"2003/BE255": 512,
	"2003/BE256": 513,
	"2003/BE257": 514,
	"2003/BE258": 515,
	"2003/BE310": 516,
	"2003/BE321": 517,
	"2003/BE322": 518,
	"2003/BE323": 519,
	"2003/BE324": 520,
	"2003/BE325": 521,
	"2003/BE326": 522,
	"2003/BE327": 523,
	"2003/BE331": 524,
	"2003/BE332": 525,
	"2003/BE333": 526,
	"2003/BE334": 527,
	"2003/BE341": 528,
	"2003/BE342": 529,
	"2003/BE343": 530,
	"2003/BE344": 531,
	"2003/BE345": 532,
	"2003/BE351": 533,
	"2003/BE352": 534,
	"2003/BE353": 535,
	"2003/BG311": 536,
	"2003/BG312": 537,
	"2003/BG313": 538,
	"2003/BG314": 539,
	"2003/BG315": 540,
	"2003/BG321": 541,
	"2003/BG322": 542,
	"2003/BG323": 543,
	"2003/BG324": 544,
	"2003/BG325": 545,
	"2003/BG331": 546,
	"2003/BG332": 547,
	"2003/BG333": 548,
	"2003/BG334": 549,
	"2003/BG341": 550,
	"2003/BG342": 551,
	"2003/BG343": 552,
	"2003/BG344": 553,
	"2003/BG411": 554,
	"2003/BG412": 555,
	"2003/BG413": 556,
	"2003/BG414": 557,
	"2003/BG415": 558,
	"2003/BG421": 559,
	"2003/BG422": 560,
	"2003/BG423": 561,
	"2003/BG424": 562,
	"2003/BG425": 563,
	"2003/CH011": 564,
	"2003/CH012": 565,
	"2003/CH013": 566,
	"2003/CH021": 567,
	"2003/CH022": 568,
	"2003/CH023": 569,
	"2003/CH024": 570,
	"2003/CH025": 571,
	"2003/CH031": 572,
	"2003/CH032": 573,
	"2003/CH033": 574,
	"2003/CH040": 575,
	"2003/CH051": 576,
	"2003/CH052": 577,
	"2003/CH053": 578,
	"2003/CH054": 579,
	"2003/CH055": 580,
	"2003/CH056": 581,
	"2003/CH057": 582,
	"2003/CH061": 583,
	"2003/CH062": 584,
	"2003/CH063": 585,
	"2003/CH064": 586,
	"2003/CH065": 587,
	"2003/CH066": 588,
	"2003/CH070": 589,
	"2003/CY000": 590,
	"2003/CZ010": 591,
	"2003/CZ020": 592,
	"2003/CZ031": 593,
	"2003/CZ032": 594,
	"2003/CZ041": 595,
	"2003/CZ042": 596,
	"2003/CZ051": 597,
	"2003/CZ052": 598,
	"2003/CZ053": 599,
	"2003/CZ061": 600,
	"2003/CZ062": 601,
	"2003/CZ071": 602,
	"2003/CZ072": 603,
	"2003/CZ080": 604,
	"2003/DE111": 605,
	"2003/DE112": 606,
	"2003/DE113": 607,
	"2003/DE114": 608,
	"2003/DE115": 609,
	"2003/DE116": 610,
	"2003/DE117": 611,
	"2003/DE118": 612,
	"2003/DE119": 613,
	"2003/DE11A": 614,
	"2003/DE11B": 615,
	"2003/DE11C": 616,
	"2003/DE11D": 617,
	"2003/DE121": 618,
	"2003/DE122": 619,
	"2003/DE123": 620,
	"2003/DE124": 621,
	"2003/DE125": 622,
	"2003/DE126": 623,
	"2003/DE127": 624,
	"2003/DE128": 625,
	"2003/DE129": 626,
	"2003/DE12A": 627,
	"2003/DE12B": 628,
	"2003/DE12C": 629,
	"2003/DE131": 630,
	"2003/DE132": 631,
	"2003/DE133": 632,
	"2003/DE134": 633,
	"2003/DE135": 634,
	"2003/DE136": 635,
	"2003/DE137": 636,
	"2003/DE138": 637,
	"2003/DE139": 638,
	"2003/DE13A": 639,
	"2003/DE141": 640,
	"2003/DE142": 641,
	"2003/DE143": 642,
	"2003/DE144": 643,
	"2003/DE145": 644,
	"2003/DE146": 645,
	"2003/DE147": 646,
	"2003/DE148": 647,
	"2003/DE149": 648,
	"2003/DE211": 649,
	"2003/DE212": 650,
	"2003/DE213": 651,
	"2003/DE214": 652,
	"2003/DE215": 653,
	"2003/DE216": 654,
	"2003/DE217": 655,
	"2003/DE218": 656,
	"2003/DE219": 657,
	"2003/DE21A": 658,
	"2003/DE21B": 659,
	"2003/DE21C": 660,
	"2003/DE21D": 661,
	"2003/DE21E": 662,
	"2003/DE21F": 663,
	"2003/DE21G": 664,
	"2003/DE21H": 665,
	"2003/DE21I": 666,
	"2003/DE21J": 667,
	"2003/DE21K": 668,
	"2003/DE21L": 669,
	"2003/DE21M": 670,
	"2003/DE21N": 671,
	"2003/DE221": 672,
	"2003/DE222": 673,
	"2003/DE223": 674,
	"2003/DE224": 675,
	"2003/DE225": 676,
	"2003/DE226": 677,
	"2003/DE227": 678,
	"2003/DE228": 679,
	"2003/DE229": 680,
	"2003/DE22A": 681,
	"2003/DE22B": 682,
	"2003/DE22C": 683,
	"2003/DE231": 684,
	"2003/DE232": 685,
	"2003/DE233": 686,
	"2003/DE234": 687,
	"2003/DE235": 688,
	"2003/DE236": 689,
	"2003/DE237": 690,
	"2003/DE238": 691,
	"2003/DE239": 692,
	"2003/DE23A": 693,
	"2003/DE241": 694,
	"2003/DE242": 695,
	"2003/DE243": 696,
	"2003/DE244": 697,
	"2003/DE245": 698,
	"2003/DE246": 699,
	"2003/DE247": 700,
	"2003/DE248": 701,
	"2003/DE249": 702,
	"2003/DE24A": 703,
	"2003/DE24B": 704,
	"2003/DE24C": 705,
	"2003/DE24D": 706,
	"2003/DE251": 707,
	"2003/DE252": 708,
	"2003/DE253": 709,
	"2003/DE254": 710,
	"2003/DE255": 711,
	"2003/DE256": 712,
	"2003/DE257": 713,
	"2003/DE258": 714,
	"2003/DE259": 715,
	"2003/DE25A": 716,
	"2003/DE25B": 717,
	"2003/DE25C": 718,
	"2003/DE261": 719,
	"2003/DE262": 720,
	"2003/DE263": 721,
	"2003/DE264": 722,
	"2003/DE265": 723,
	"2003/DE266": 724,
	"2003/DE267": 725,
	"2003/DE268": 726,
	"2003/DE269": 727,
	"2003/DE26A": 728,
	"2003/DE26B": 729,
	"2003/DE26C": 730,
	"2003/DE271": 731,
	"2003/DE272": 732,
	"2003/DE273": 733,
	"2003/DE274": 734,
	"2003/DE275": 735,
	"2003/DE276": 736,
	"2003/DE277": 737,
	"2003/DE278": 738,
	"2003/DE279": 739,
	"2003/DE27A": 740,
	"2003/DE27B": 741,
	"2003/DE27C": 742,
	"2003/DE27D": 743,
	"2003/DE27E": 744,
	"2003/DE300": 745,
	"2003/DE411": 746,
	"2003/DE412": 747,
	"2003/DE413": 748,
	"2003/DE414": 749,
	"2003/DE415": 750,
	"2003/DE416": 751,
	"2003/DE417": 752,
	"2003/DE418": 753,
	"2003/DE421": 754,
	"2003/DE422": 755,
	"2003/DE423": 756,
	"2003/DE424": 757,
	"2003/DE425": 758,
	"2003/DE426": 759,
	"2003/DE427": 760,
	"2003/DE428": 761,
	"2003/DE429": 762,
	"2003/DE42A": 763,
	"2003/DE501": 764,
	"2003/DE502": 765,
	"2003/DE600": 766,
	"2003/DE711": 767,
	"2003/DE712": 768,
	"2003/DE713": 769,
	"2003/DE714": 770,
	"2003/DE715": 771,
	"2003/DE716": 772,
	"2003/DE717": 773,
	"2003/DE718": 774,
	"2003/DE719": 775,
	"2003/DE71A": 776,
	"2003/DE71B": 777,
	"2003/DE71C": 778,
	"2003/DE71D": 779,
	"2003/DE71E": 780,
	"2003/DE721": 781,
	"2003/DE722": 782,
	"2003/DE723": 783,
	"2003/DE724": 784,
	"2003/DE725": 785,
	"2003/DE731": 786,
	"2003/DE732": 787,
	"2003/DE733": 788,
	"2003/DE734": 789,
	"2003/DE735": 790,
	"2003/DE736": 791,
	"2003/DE737": 792,
	"2003/DE801": 793,
	"2003/DE802": 794,
	"2003/DE803": 795,
	"2003/DE804": 796,
	"2003/DE805": 797,
	"2003/DE806": 798,
	"2003/DE807": 799,
	"2003/DE808": 800,
	"2003/DE809": 801,
	"2003/DE80A": 802,
	"2003/DE80B": 803,
	"2003/DE80C": 804,
	"2003/DE80D": 805,
	"2003/DE80E": 806,
	"2003/DE80F": 807,
	"2003/DE80G": 808,
	"2003/DE80H": 809,
	"2003/DE80I": 810,
	"2003/DE911": 811,
	"2003/DE912": 812,
	"2003/DE913": 813,
	"2003/DE914": 814,
	"2003/DE915": 815,
	"2003/DE916": 816,
	"2003/DE917": 817,
	"2003/DE918": 818,
	"2003/DE919": 819,
	"2003/DE91A": 820,
	"2003/DE91B": 821,
	"2003/DE922": 822,
	"2003/DE923": 823,
	"2003/DE925": 824,
	"2003/DE926": 825,
	"2003/DE927": 826,
	"2003/DE928": 827,
	"2003/DE929": 828,
	"2003/DE931": 829,
	"2003/DE932": 830,
	"2003/DE933": 831,
	"2003/DE934": 832,
	"2003/DE935": 833,
	"2003/DE936": 834,
	"2003/DE937": 835,
	"2003/DE938": 836,
	"2003/DE939": 837,
	"2003/DE93A": 838,
	"2003/DE93B": 839,
	"2003/DE941": 840,
	"2003/DE942": 841,
	"2003/DE943": 842,
	"2003/DE944": 843,
	"2003/DE945": 844,
	"2003/DE946": 845,
	"2003/DE947": 846,
	"2003/DE948": 847,
	"2003/DE949": 848,
	"2003/DE94A": 849,
	"2003/DE94B": 850,
	"2003/DE94C": 851,
	"2003/DE94D": 852,
	"2003/DE94E": 853,
	"2003/DE94F": 854,
	"2003/DE94G": 855,
	"2003/DE94H": 856,
	"2003/DEA11": 857,
	"2003/DEA12": 858,
	"2003/DEA13": 859,
	"2003/DEA14": 860,
	"2003/DEA15": 861,
	"2003/DEA16": 862,
	"2003/DEA17": 863,
	"2003/DEA18": 864,
	"2003/DEA19": 865,
	"2003/DEA1A": 866,
	"2003/DEA1B": 867,
	"2003/DEA1C": 868,
	"2003/DEA1D": 869,
	"2003/DEA1E": 870,
	"2003/DEA1F": 871,
	"2003/DEA21": 872,
	"2003/DEA22": 873,
	"2003/DEA23": 874,
	"2003/DEA24": 875,
	"2003/DEA25": 876,
	"2003/DEA26": 877,
	"2003/DEA27": 878,
	"2003/DEA28": 879,
	"2003/DEA29": 880,
	"2003/DEA2A": 881,
	"2003/DEA2B": 882,
	"2003/DEA2C": 883,
	"2003/DEA31": 884,
	"2003/DEA32": 885,
	"2003/DEA33": 886,
	"2003/DEA34": 887,
	"2003/DEA35": 888,
	"2003/DEA36": 889,
	"2003/DEA37": 890,
	"2003/DEA38": 891,
	"2003/DEA41": 892,
	"2003/DEA42": 893,
	"2003/DEA43": 894,
	"2003/DEA44": 895,
	"2003/DEA45": 896,
	"2003/DEA46": 897,
	"2003/DEA47": 898,
	"2003/DEA51": 899,
	"2003/DEA52": 900,
	"2003/DEA53": 901,
	"2003/DEA54": 902,
	"2003/DEA55": 903,
	"2003/DEA56": 904,
	"2003/DEA57": 905,
	"2003/DEA58": 906,
	"2003/DEA59": 907,
	"2003/DEA5A": 908,
	"2003/DEA5B": 909,
	"2003/DEA5C": 910,
	"2003/DEB11": 911,
	"2003/DEB12": 912,
	"2003/DEB13": 913,
	"2003/DEB14": 914,
	"2003/DEB15": 915,
	"2003/DEB16": 916,
	"2003/DEB17": 917,
	"2003/DEB18": 918,
	"2003/DEB19": 919,
	"2003/DEB1A": 920,
	"2003/DEB1B": 921,
	"2003/DEB21": 922,
	"2003/DEB22": 923,
	"2003/DEB23": 924,
	"2003/DEB24": 925,
	"2003/DEB25": 926,
	"2003/DEB31": 927,
	"2003/DEB32": 928,
	"2003/DEB33": 929,
	"2003/DEB34": 930,
	"2003/DEB35": 931,
	"2003/DEB36": 932,
	"2003/DEB37": 933,
	"2003/DEB38": 934,
	"2003/DEB39": 935,
	"2003/DEB3A": 936,
	"2003/DEB3B": 937,
	"2003/DEB3C": 938,
	"2003/DEB3D": 939,
	"2003/DEB3E": 940,
	"2003/DEB3F": 941,
	"2003/DEB3G": 942,
	"2003/DEB3H": 943,
	"2003/DEB3I": 944,
	"2003/DEB3J": 945,
	"2003/DEB3K": 946,
	"2003/DEC01": 947,
	"2003/DEC02": 948,
	"2003/DEC03": 949,
	"2003/DEC04": 950,
	"2003/DEC05": 951,
	"2003/DEC06": 952,
	"2003/DED11": 953,
	"2003/DED12": 954,
	"2003/DED13": 955,
	"2003/DED14": 956,
	"2003/DED15": 957,
	"2003/DED16": 958,
	"2003/DED17": 959,
	"2003/DED18": 960,
	"2003/DED19": 961,
	"2003/DED1A": 962,
	"2003/DED1B": 963,
	"2003/DED1C": 964,
	"2003/DED21": 965,
	"2003/DED22": 966,
	"2003/DED23": 967,
	"2003/DED24": 968,
	"2003/DED25": 969,
	"2003/DED26": 970,
	"2003/DED27": 971,
	"2003/DED28": 972,
	"2003/DED29": 973,
	"2003/DED2A": 974,
	"2003/DED2B": 975,
	"2003/DED31": 976,
	"2003/DED32": 977,
	"2003/DED33": 978,
	"2003/DED34": 979,
	"2003/DED35": 980,
	"2003/DED36": 981,
	"2003/DEE11": 982,
	"2003/DEE12": 983,
	"2003/DEE13": 984,
	"2003/DEE14": 985,
	"2003/DEE15": 986,
	"2003/DEE16": 987,
	"2003/DEE21": 988,
	"2003/DEE22": 989,
	"2003/DEE23": 990,
	"2003/DEE24": 991,
	"2003/DEE25": 992,
	"2003/DEE26": 993,
	"2003/DEE27": 994,
	"2003/DEE31": 995,
	"2003/DEE32": 996,
	"2003/DEE33": 997,
	"2003/DEE34": 998,
	"2003/DEE35": 999,
	"2003/DEE36": 1000,
	"2003/DEE37": 1001,
	"2003/DEE38": 1002,
	"2003/DEE39": 1003,
	"2003/DEE3A": 1004,
	"2003/DEE3B": 1005,
	"2003/DEF01": 1006,
	"2003/DEF02": 1007,
	"2003/DEF03": 1008,
	"2003/DEF04": 1009,
	"2003/DEF05": 1010,
	"2003/DEF06": 1011,
	"2003/DEF07": 1012,
	"2003/DEF08": 1013,
	"2003/DEF09": 1014,
	"2003/DEF0A": 1015,
	"2003/DEF0B": 1016,
	"2003/DEF0C": 1017,
	"2003/DEF0D": 1018,
	"2003/DEF0E": 1019,
	"2003/DEF0F": 1020,
	"2003/DEG01": 1021,
	"2003/DEG02": 1022,
	"2003/DEG03": 1023,
	"2003/DEG04": 1024,
	"2003/DEG05": 1025,
	"2003/DEG06": 1026,
	"2003/DEG07": 1027,
	"2003/DEG09": 1028,
	"2003/DEG0A": 1029,
	"2003/DEG0B": 1030,
	"2003/DEG0C": 1031,
	"2003/DEG0D": 1032,
	"2003/DEG0E": 1033,
	"2003/DEG0F": 1034,
	"2003/DEG0G": 1035,
	"2003/DEG0H": 1036,
	"2003/DEG0I": 1037,
	"2003/DEG0J": 1038,
	"2003/DEG0K": 1039,
	"2003/DEG0L": 1040,
	"2003/DEG0M": 1041,
	"2003/DEG0N": 1042,
	"2003/DEG0P": 1043,
	"2003/DK001": 1044,
	"2003/DK002": 1045,
	"2003/DK003": 1046,
	"2003/DK004": 1047,
	"2003/DK005": 1048,
	"2003/DK006": 1049,
	"2003/DK007": 1050,
	"2003/DK008": 1051,
	"2003/DK009": 1052,
	"2003/DK00A": 1053,
	"2003/DK00B": 1054,
	"2003/DK00C": 1055,
	"2003/DK00D": 1056,
	"2003/DK00E": 1057,
	"2003/DK00F": 1058,
	"2003/EE001": 1059,
	"2003/EE004": 1060,
	"2003/EE006": 1061,
	"2003/EE007": 1062,
	"2003/EE008": 1063,
	"2003/ES111": 1064,
	"2003/ES112": 1065,
	"2003/ES113": 1066,
	"2003/ES114": 1067,
	"2003/ES120": 1068,
	"2003/ES130": 1069,
	"2003/ES211": 1070,
	"2003/ES212": 1071,
	"2003/ES213": 1072,
	"2003/ES220": 1073,
	"2003/ES230": 1074,
	"2003/ES241": 1075,
	"2003/ES242": 1076,
	"2003/ES243": 1077,
	"2003/ES300": 1078,
	"2003/ES411": 1079,
	"2003/ES412": 1080,
	"2003/ES413": 1081,
	"2003/ES414": 1082,
	"2003/ES415": 1083,
	"2003/ES416": 1084,
	"2003/ES417": 1085,
	"2003/ES418": 1086,
	"2003/ES419": 1087,
	"2003/ES421": 1088,
	"2003/ES422": 1089,
	"2003/ES423": 1090,
	"2003/ES424": 1091,
	"2003/ES425": 1092,
	"2003/ES431": 1093,
	"2003/ES432": 1094,
	"2003/ES511": 1095,
	"2003/ES512": 1096,
	"2003/ES513": 1097,
	"2003/ES514": 1098,
	"2003/ES521": 1099,
	"2003/ES522": 1100,
	"2003/ES523": 1101,
	"2003/ES530": 1102,
	"2003/ES611": 1103,
	"2003/ES612": 1104,
	"2003/ES613": 1105,
	"2003/ES614": 1106,
	"2003/ES615": 1107,
	"2003/ES616": 1108,
	"2003/ES617": 1109,
	"2003/ES618": 1110,
	"2003/ES620": 1111,
	"2003/ES630": 1112,
	"2003/ES640": 1113,
	"2003/ES701": 1114,
	"2003/ES702": 1115,
	"2003/FI131": 1116,
	"2003/FI132": 1117,
	"2003/FI133": 1118,
	"2003/FI134": 1119,
	"2003/FI181": 1120,
	"2003/FI182": 1121,
	"2003/FI183": 1122,
	"2003/FI184": 1123,
	"2003/FI185": 1124,
	"2003/FI186": 1125,
	"2003/FI187": 1126,
	"2003/FI191": 1127,
	"2003/FI192": 1128,
	"2003/FI193": 1129,
	"2003/FI194": 1130,
	"2003/FI195": 1131,
	"2003/FI1A1": 1132,
	"2003/FI1A2": 1133,
	"2003/FI1A3": 1134,
	"2003/FI200": 1135,
	"2003/FR101": 1136,
	"2003/FR102": 1137,
	"2003/FR103": 1138,
	"2003/FR104": 1139,
	"2003/FR105": 1140,
	"2003/FR106": 1141,
	"2003/FR107": 1142,
	"2003/FR108": 1143,
	"2003/FR211": 1144,
	"2003/FR212": 1145,
	"2003/FR213": 1146,
	"2003/FR214": 1147,
	"2003/FR221": 1148,
	"2003/FR222": 1149,
	"2003/FR223": 1150,
	"2003/FR231": 1151,
	"2003/FR232": 1152,
	"2003/FR241": 1153,
	"2003/FR242": 1154,
	"2003/FR243": 1155,
	"2003/FR244": 1156,
	"2003/FR245": 1157,
	"2003/FR246": 1158,
	"2003/FR251": 1159,
	"2003/FR252": 1160,
	"2003/FR253": 1161,
	"2003/FR261": 1162,
	"2003/FR262": 1163,
	"2003/FR263": 1164,
	"2003/FR264": 1165,
	"2003/FR301": 1166,
	"2003/FR302": 1167,
	"2003/FR411": 1168,
	"2003/FR412": 1169,
	"2003/FR413": 1170,
	"2003/FR414": 1171,
	"2003/FR421": 1172,
	"2003/FR422": 1173,
	"2003/FR431": 1174,
	"2003/FR432": 1175,
	"2003/FR433": 1176,
	"2003/FR434": 1177,
	"2003/FR511": 1178,
	"2003/FR512": 1179,
	"2003/FR513": 1180,
	"2003/FR514": 1181,
	"2003/FR515": 1182,
	"2003/FR521": 1183,
	"2003/FR522": 1184,
	"2003/FR523": 1185,
	"2003/FR524": 1186,
	"2003/FR531": 1187,
	"2003/FR532": 1188,
	"2003/FR533": 1189,
	"2003/FR534": 1190,
	"2003/FR611": 1191,
	"2003/FR612": 1192,
	"2003/FR613": 1193,
	"2003/FR614": 1194,
	"2003/FR615": 1195,
	"2003/FR621": 1196,
	"2003/FR622": 1197,
	"2003/FR623": 1198,
	"2003/FR624": 1199,
	"2003/FR625": 1200,
	"2003/FR626": 1201,
	"2003/FR627": 1202,
	"2003/FR628": 1203,
	"2003/FR631": 1204,
	"2003/FR632": 1205,
	"2003/FR633": 1206,
	"2003/FR711": 1207,
	"2003/FR712": 1208,
	"2003/FR713": 1209,
	"2003/FR714": 1210,
	"2003/FR715": 1211,
	"2003/FR716": 1212,
	"2003/FR717": 1213,
	"2003/FR718": 1214,
	"2003/FR721": 1215,
	"2003/FR722": 1216,
	"2003/FR723": 1217,
	"2003/FR724": 1218,
	"2003/FR811": 1219,
	"2003/FR812": 1220,
	"2003/FR813": 1221,
	"2003/FR814": 1222,
	"2003/FR815": 1223,
	"2003/FR821": 1224,
	"2003/FR822": 1225,
	"2003/FR823": 1226,
	"2003/FR824": 1227,
	"2003/FR825": 1228,
	"2003/FR826": 1229,
	"2003/FR831": 1230,
	"2003/FR832": 1231,
	"2003/FR910": 1232,
	"2003/FR920": 1233,
	"2003/FR930": 1234,
	"2003/FR940": 1235,
	"2003/GR111": 1236,
	"2003/GR112": 1237,
	"2003/GR113": 1238,
	"2003/GR114": 1239,
	"2003/GR115": 1240,
	"2003/GR121": 1241,
	"2003/GR122": 1242,
	"2003/GR123": 1243,
	"2003/GR124": 1244,
	"2003/GR125": 1245,
	"2003/GR126": 1246,
	"2003/GR127": 1247,
	"2003/GR131": 1248,
	"2003/GR132": 1249,
	"2003/GR133": 1250,
	"2003/GR134": 1251,
	"2003/GR141": 1252,
	"2003/GR142": 1253,
	"2003/GR143": 1254,
	"2003/GR144": 1255,
	"2003/GR211": 1256,
	"2003/GR212": 1257,
	"2003/GR213": 1258,
	"2003/GR214": 1259,
	"2003/GR221": 1260,
	"2003/GR222": 1261,
	"2003/GR223": 1262,
	"2003/GR224": 1263,
	"2003/GR231": 1264,
	"2003/GR232": 1265,
	"2003/GR233": 1266,
	"2003/GR241": 1267,
	"2003/GR242": 1268,
	"2003/GR243": 1269,
	"2003/GR244": 1270,
	"2003/GR245": 1271,
	"2003/GR251": 1272,
	"2003/GR252": 1273,
	"2003/GR253": 1274,
	"2003/GR254": 1275,
	"2003/GR255": 1276,
	"2003/GR300": 1277,
	"2003/GR411": 1278,
	"2003/GR412": 1279,
	"2003/GR413": 1280,
	"2003/GR421": 1281,
	"2003/GR422": 1282,
	"2003/GR431": 1283,
	"2003/GR432": 1284,
	"2003/GR433": 1285,
	"2003/GR434": 1286,
	"2003/HR011": 1287,
	"2003/HR012": 1288,
	"2003/HR013": 1289,
	"2003/HR014": 1290,
	"2003/HR015": 1291,
	"2003/HR016": 1292,
	"2003/HR021": 1293,
	"2003/HR022": 1294,
	"2003/HR023": 1295,
	"2003/HR024": 1296,
	"2003/HR025": 1297,
	"2003/HR026": 1298,
	"2003/HR027": 1299,
	"2003/HR028": 1300,
	"2003/HR031": 1301,
	"2003/HR032": 1302,
	"2003/HR033": 1303,
	"2003/HR034": 1304,
	"2003/HR035": 1305,
	"2003/HR036": 1306,
	"2003/HR037": 1307,
	"2003/HU101": 1308,
	"2003/HU102": 1309,
	"2003/HU211": 1310,
	"2003/HU212": 1311,
	"2003/HU213": 1312,
	"2003/HU221": 1313,
	"2003/HU222": 1314,
	"2003/HU223": 1315,
	"2003/HU231": 1316,
	"2003/HU232": 1317,
	"2003/HU233": 1318,
	"2003/HU311": 1319,
	"2003/HU312": 1320,
	"2003/HU313": 1321,
	"2003/HU321": 1322,
	"2003/HU322": 1323,
	"2003/HU323": 1324,
	"2003/HU331": 1325,
	"2003/HU332": 1326,
	"2003/HU333": 1327,
	"2003/IE011": 1328,
	"2003/IE012": 1329,
	"2003/IE013": 1330,
	"2003/IE021": 1331,
	"2003/IE022": 1332,
	"2003/IE023": 1333,
	"2003/IE024": 1334,
	"2003/IE025": 1335,
	"2003/IS000": 1336,
	"2003/ITC11": 1337,
	"2003/ITC12": 1338,
	"2003/ITC13": 1339,
	"2003/ITC14": 1340,
	"2003/ITC15": 1341,
	"2003/ITC16": 1342,
	"2003/ITC17": 1343,
	"2003/ITC18": 1344,
	"2003/ITC20": 1345,
	"2003/ITC31": 1346,
	"2003/ITC32": 1347,
	"2003/ITC33": 1348,
	"2003/ITC34": 1349,
	"2003/ITC41": 1350,
	"2003/ITC42": 1351,
	"2003/ITC43": 1352,
	"2003/ITC44": 1353,
	"2003/ITC45": 1354,
	"2003/ITC46": 1355,
	"2003/ITC47": 1356,
	"2003/ITC48": 1357,
	"2003/ITC49": 1358,
	"2003/ITC4A": 1359,
	"2003/ITC4B": 1360,
	"2003/ITD10": 1361,
	"2003/ITD20": 1362,
	"2003/ITD31": 1363,
	"2003/ITD32": 1364,
	"2003/ITD33": 1365,
	"2003/ITD34": 1366,
	"2003/ITD35": 1367,
	"2003/ITD36": 1368,
	"2003/ITD37": 1369,
	"2003/ITD41": 1370,
	"2003/ITD42": 1371,
	"2003/ITD43": 1372,
	"2003/ITD44": 1373,
	"2003/ITD51": 1374,
	"2003/ITD52": 1375,
	"2003/ITD53": 1376,
	"2003/ITD54": 1377,
	"2003/ITD55": 1378,
	"2003/ITD56": 1379,
	"2003/ITD57": 1380,
	"2003/ITD58": 1381,
	"2003/ITD59": 1382,
	"2003/ITE11": 1383,
	"2003/ITE12": 1384,
	"2003/ITE13": 1385,
	"2003/ITE14": 1386,
	"2003/ITE15": 1387,
	"2003/ITE16": 1388,
	"2003/ITE17": 1389,
	"2003/ITE18": 1390,
	"2003/ITE19": 1391,
	"2003/ITE1A": 1392,
	"2003/ITE21": 1393,
	"2003/ITE22": 1394,
	"2003/ITE31": 1395,
	"2003/ITE32": 1396,
	"2003/ITE33": 1397,
	"2003/ITE34": 1398,
	"2003/ITE41": 1399,
	"2003/ITE42": 1400,
	"2003/ITE43": 1401,
	"2003/ITE44": 1402,
	"2003/ITE45": 1403,
	"2003/ITF11": 1404,
	"2003/ITF12": 1405,
	"2003/ITF13": 1406,
	"2003/ITF14": 1407,
	"2003/ITF21": 1408,
	"2003/ITF22": 1409,
	"2003/ITF31": 1410,
	"2003/ITF32": 1411,
	"2003/ITF33": 1412,
	"2003/ITF34": 1413,
	"2003/ITF35": 1414,
	"2003/ITF41": 1415,
	"2003/ITF42": 1416,
	"2003/ITF43": 1417,
	"2003/ITF44": 1418,
	"2003/ITF45": 1419,
	"2003/ITF51": 1420,
	"2003/ITF52": 1421,
	"2003/ITF61": 1422,
	"2003/ITF62": 1423,
	"2003/ITF63": 1424,
	"2003/ITF64": 1425,
	"2003/ITF65": 1426,
	"2003/ITG11": 1427,
	"2003/ITG12": 1428,
	"2003/ITG13": 1429,
	"2003/ITG14": 1430,
	"2003/ITG15": 1431,
	"2003/ITG16": 1432,
	"2003/ITG17": 1433,
	"2003/ITG18": 1434,
	"2003/ITG19": 1435,
	"2003/ITG21": 1436,
	"2003/ITG22": 1437,
	"2003/ITG23": 1438,
	"2003/ITG24": 1439,
	"2003/LI000": 1440,
	"2003/LT001": 1441,
	"2003/LT002": 1442,
	"2003/LT003": 1443,
	"2003/LT004": 1444,
	"2003/LT005": 1445,
	"2003/LT006": 1446,
	"2003/LT007": 1447,
	"2003/LT008": 1448,
	"2003/LT009": 1449,
	"2003/LT00A": 1450,
	"2003/LU000": 1451,
	"2003/LV003": 1452,
	"2003/LV005": 1453,
	"2003/LV006": 1454,
	"2003/LV007": 1455,
	"2003/LV008": 1456,
	"2003/LV009": 1457,
	"2003/MT001": 1458,
	"2003/MT002": 1459,
	"2003/NL111": 1460,
	"2003/NL112": 1461,
	"2003/NL113": 1462,
	"2003/NL121": 1463,
	"2003/NL122": 1464,
	"2003/NL123": 1465,
	"2003/NL131": 1466,
	"2003/NL132": 1467,
	"2003/NL133": 1468,
	"2003/NL211": 1469,
	"2003/NL212": 1470,
	"2003/NL213": 1471,
	"2003/NL221": 1472,
	"2003/NL222": 1473,
	"2003/NL223": 1474,
	"2003/NL224": 1475,
	"2003/NL230": 1476,
	"2003/NL310": 1477,
	"2003/NL321": 1478,
	"2003/NL322": 1479,
	"2003/NL323": 1480,
	"2003/NL324": 1481,
	"2003/NL325": 1482,
	"2003/NL326": 1483,
	"2003/NL327": 1484,
	"2003/NL331": 1485,
	"2003/NL332": 1486,
	"2003/NL333": 1487,
	"2003/NL334": 1488,
	"2003/NL335": 1489,
	"2003/NL336": 1490,
	"2003/NL341": 1491,
	"2003/NL342": 1492,
	"2003/NL411": 1493,
	"2003/NL412": 1494,
	"2003/NL413": 1495,
	"2003/NL414": 1496,
	"2003/NL421": 1497,
	"2003/NL422": 1498,
	"2003/NL423": 1499,
	"2003/NO011": 1500,
	"2003/NO012": 1501,
	"2003/NO021": 1502,
	"2003/NO022": 1503,
	"2003/NO031": 1504,
	"2003/NO032": 1505,
	"2003/NO033": 1506,
	"2003/NO034": 1507,
	"2003/NO041": 1508,
	"2003/NO042": 1509,
	"2003/NO043": 1510,
	"2003/NO051": 1511,
	"2003/NO052": 1512,
	"2003/NO053": 1513,
	"2003/NO061": 1514,
	"2003/NO062": 1515,
	"2003/NO071": 1516,
	"2003/NO072": 1517,
	"2003/NO073": 1518,
	"2003/PL111": 1519,
	"2003/PL112": 1520,
	"2003/PL113": 1521,
	"2003/PL121": 1522,
	"2003/PL122": 1523,
	"2003/PL124": 1524,
	"2003/PL126": 1525,
	"2003/PL127": 1526,
	"2003/PL211": 1527,
	"2003/PL212": 1528,
	"2003/PL213": 1529,
	"2003/PL224": 1530,
	"2003/PL225": 1531,
	"2003/PL226": 1532,
	"2003/PL227": 1533,
	"2003/PL311": 1534,
	"2003/PL312": 1535,
	"2003/PL313": 1536,
	"2003/PL321": 1537,
	"2003/PL322": 1538,
	"2003/PL330": 1539,
	"2003/PL341": 1540,
	"2003/PL342": 1541,
	"2003/PL411": 1542,
	"2003/PL412": 1543,
	"2003/PL413": 1544,
	"2003/PL414": 1545,
	"2003/PL415": 1546,
	"2003/PL421": 1547,
	"2003/PL422": 1548,
	"2003/PL431": 1549,
	"2003/PL432": 1550,
	"2003/PL511": 1551,
	"2003/PL512": 1552,
	"2003/PL513": 1553,
	"2003/PL514": 1554,
	"2003/PL520": 1555,
	"2003/PL611": 1556,
	"2003/PL612": 1557,
	"2003/PL621": 1558,
	"2003/PL622": 1559,
	"2003/PL623": 1560,
	"2003/PL631": 1561,
	"2003/PL632": 1562,
	"2003/PL633": 1563,
	"2003/PT111": 1564,
	"2003/PT112": 1565,
	"2003/PT113": 1566,
	"2003/PT114": 1567,
	"2003/PT115": 1568,
	"2003/PT116": 1569,
	"2003/PT117": 1570,
	"2003/PT118": 1571,
	"2003/PT150": 1572,
	"2003/PT161": 1573,
	"2003/PT162": 1574,
	"2003/PT163": 1575,
	"2003/PT164": 1576,
	"2003/PT165": 1577,
	"2003/PT166": 1578,
	"2003/PT167": 1579,
	"2003/PT168": 1580,
	"2003/PT169": 1581,
	"2003/PT16A": 1582,
	"2003/PT16B": 1583,
	"2003/PT16C": 1584,
	"2003/PT171": 1585,
	"2003/PT172": 1586,
	"2003/PT181": 1587,
	"2003/PT182": 1588,
	"2003/PT183": 1589,
	"2003/PT184": 1590,
	"2003/PT185": 1591,
	"2003/PT200": 1592,
	"2003/PT300": 1593,
	"2003/RO111": 1594,
	"2003/RO112": 1595,
	"2003/RO113": 1596,
	"2003/RO114": 1597,
	"2003/RO115": 1598,
	"2003/RO116": 1599,
	"2003/RO121": 1600,
	"2003/RO122": 1601,
	"2003/RO123": 1602,
	"2003/RO124": 1603,
	"2003/RO125": 1604,
	"2003/RO126": 1605,
	"2003/RO211": 1606,
	"2003/RO212": 1607,
	"2003/RO213": 1608,
	"2003/RO214": 1609,
	"2003/RO215": 1610,
	"2003/RO216": 1611,
	"2003/RO221": 1612,
	"2003/RO222": 1613,
	"2003/RO223": 1614,
	"2003/RO224": 1615,
	"2003/RO225": 1616,
	"2003/RO226": 1617,
	"2003/RO311": 1618,
	"2003/RO312": 1619,
	"2003/RO313": 1620,
	"2003/RO314": 1621,
	"2003/RO315": 1622,
	"2003/RO316": 1623,
	"2003/RO317": 1624,
	"2003/RO321": 1625,
	"2003/RO322": 1626,
	"2003/RO411": 1627,
	"2003/RO412": 1628,
	"2003/RO413": 1629,
	"2003/RO414": 1630,
	"2003/RO415": 1631,
	"2003/RO421": 1632,
	"2003/RO422": 1633,
	"2003/RO423": 1634,
	"2003/RO424": 1635,
	"2003/SE010": 1636,
	"2003/SE021": 1637,
	"2003/SE022": 1638,
	"2003/SE023": 1639,
	"2003/SE024": 1640,
	"2003/SE025": 1641,
	"2003/SE041": 1642,
	"2003/SE044": 1643,
	"2003/SE061": 1644,
	"2003/SE062": 1645,
	"2003/SE063": 1646,
	"2003/SE071": 1647,
	"2003/SE072": 1648,
	"2003/SE081": 1649,
	"2003/SE082": 1650,
	"2003/SE091": 1651,
	"2003/SE092": 1652,
	"2003/SE093": 1653,
	"2003/SE094": 1654,
	"2003/SE0A1": 1655,
	"2003/SE0A2": 1656,
	"2003/SI001": 1657,
	"2003/SI002": 1658,
	"2003/SI003": 1659,
	"2003/SI004": 1660,
	"2003/SI005": 1661,
	"2003/SI006": 1662,
	"2003/SI009": 1663,
	"2003/SI00A": 1664,
	"2003/SI00B": 1665,
	"2003/SI00C": 1666,
	"2003/SI00D": 1667,
	"2003/SI00E": 1668,
	"2003/SK010": 1669,
	"2003/SK021": 1670,
	"2003/SK022": 1671,
	"2003/SK023": 1672,
	"2003/SK031": 1673,
	"2003/SK032": 1674,
	"2003/SK041": 1675,
	"2003/SK042": 1676,
	"2003/TR100": 1677,
	"2003/TR211": 1678,
	"2003/TR212": 1679,
	"2003/TR213": 1680,
	"2003/TR221": 1681,
	"2003/TR222": 1682,
	"2003/TR310": 1683,
	"2003/TR321": 1684,
	"2003/TR322": 1685,
	"2003/TR323": 1686,
	"2003/TR331": 1687,
	"2003/TR332": 1688,
	"2003/TR333": 1689,
	"2003/TR334": 1690,
	"2003/TR411": 1691,
	"2003/TR412": 1692,
	"2003/TR413": 1693,
	"2003/TR421": 1694,
	"2003/TR422": 1695,
	"2003/TR423": 1696,
	"2003/TR424": 1697,
	"2003/TR425": 1698,
	"2003/TR510": 1699,
	"2003/TR521": 1700,
	"2003/TR522": 1701,
	"2003/TR611": 1702,
	"2003/TR612": 1703,
	"2003/TR613": 1704,
	"2003/TR621": 1705,
	"2003/TR622": 1706,
	"2003/TR631": 1707,
	"2003/TR632": 1708,
	"2003/TR633": 1709,
	"2003/TR711": 1710,
	"2003/TR712": 1711,
	"2003/TR713": 1712,
	"2003/TR714": 1713,
	"2003/TR715": 1714,
	"2003/TR721": 1715,
	"2003/TR722": 1716,
	"2003/TR723": 1717,
	"2003/TR811": 1718,
	"2003/TR812": 1719,
	"2003/TR813": 1720,
	"2003/TR821": 1721,
	"2003/TR822": 1722,
	"2003/TR823": 1723,
	"2003/TR831": 1724,
	"2003/TR832": 1725,
	"2003/TR833": 1726,
	"2003/TR834": 1727,
	"2003/TR901": 1728,
	"2003/TR902": 1729,
	"2003/TR903": 1730,
	"2003/TR904": 1731,
	"2003/TR905": 1732,
	"2003/TR906": 1733,
	"2003/TRA11": 1734,
	"2003/TRA12": 1735,
	"2003/TRA13": 1736,
	"2003/TRA21": 1737,
	"2003/TRA22": 1738,
	"2003/TRA23": 1739,
	"2003/TRA24": 1740,
	"2003/TRB11": 1741,
	"2003/TRB12": 1742,
	"2003/TRB13": 1743,
	"2003/TRB14": 1744,
	"2003/TRB21": 1745,
	"2003/TRB22": 1746,
	"2003/TRB23": 1747,
	"2003/TRB24": 1748,
	"2003/TRC11": 1749,
	"2003/TRC12": 1750,
	"2003/TRC13": 1751,
	"2003/TRC21": 1752,
	"2003/TRC22": 1753,
	"2003/TRC31": 1754,
	"2003/TRC32": 1755,
	"2003/TRC33": 1756,
	"2003/TRC34": 1757,
	"2003/UKC11": 1758,
	"2003/UKC12": 1759,
	"2003/UKC13": 1760,
	"2003/UKC14": 1761,
	"2003/UKC21": 1762,
	"2003/UKC22": 1763,
	"2003/UKC23": 1764,
	"2003/UKD11": 1765,
	"2003/UKD12": 1766,
	"2003/UKD21": 1767,
	"2003/UKD22": 1768,
	"2003/UKD31": 1769,
	"2003/UKD32": 1770,
	"2003/UKD41": 1771,
	"2003/UKD42": 1772,
	"2003/UKD43": 1773,
	"2003/UKD51": 1774,
	"2003/UKD52": 1775,
	"2003/UKD53": 1776,
	"2003/UKD54": 1777,
	"2003/UKE11": 1778,
	"2003/UKE12": 1779,
	"2003/UKE13": 1780,
	"2003/UKE21": 1781,
	"2003/UKE22": 1782,
	"2003/UKE31": 1783,
	"2003/UKE32": 1784,
	"2003/UKE41": 1785,
	"2003/UKE42": 1786,
	"2003/UKE43": 1787,
	"2003/UKF11": 1788,
	"2003/UKF12": 1789,
	"2003/UKF13": 1790,
	"2003/UKF14": 1791,
	"2003/UKF15": 1792,
	"2003/UKF16": 1793,
	"2003/UKF21": 1794,
	"2003/UKF22": 1795,
	"2003/UKF23": 1796,
	"2003/UKF30": 1797,
	"2003/UKG11": 1798,
	"2003/UKG12": 1799,
	"2003/UKG13": 1800,
	"2003/UKG21": 1801,
	"2003/UKG22": 1802,
	"2003/UKG23": 1803,
	"2003/UKG24": 1804,
	"2003/UKG31": 1805,
	"2003/UKG32": 1806,
	"2003/UKG33": 1807,
	"2003/UKG34": 1808,
	"2003/UKG35": 1809,
	"2003/UKH11": 1810,
	"2003/UKH12": 1811,
	"2003/UKH13": 1812,
	"2003/UKH14": 1813,
	"2003/UKH21": 1814,
	"2003/UKH22": 1815,
	"2003/UKH23": 1816,
	"2003/UKH31": 1817,
	"2003/UKH32": 1818,
	"2003/UKH33": 1819,
	"2003/UKI11": 1820,
	"2003/UKI12": 1821,
	"2003/UKI21": 1822,
	"2003/UKI22": 1823,
	"2003/UKI23": 1824,
	"2003/UKJ11": 1825,
	"2003/UKJ12": 1826,
	"2003/UKJ13": 1827,
	"2003/UKJ14": 1828,
	"2003/UKJ21": 1829,
	"2003/UKJ22": 1830,
	"2003/UKJ23": 1831,
	"2003/UKJ24": 1832,
	"2003/UKJ31": 1833,
	"2003/UKJ32": 1834,
	"2003/UKJ33": 1835,
	"2003/UKJ34": 1836,
	"2003/UKJ41": 1837,
	"2003/UKJ42": 1838,
	"2003/UKK11": 1839,
	"2003/UKK12": 1840,
	"2003/UKK13": 1841,
	"2003/UKK14": 1842,
	"2003/UKK15": 1843,
	"2003/UKK21": 1844,
	"2003/UKK22": 1845,
	"2003/UKK23": 1846,
	"2003/UKK30": 1847,
	"2003/UKK41": 1848,
	"2003/UKK42": 1849,
	"2003/UKK43": 1850,
	"2003/UKL11": 1851,
	"2003/UKL12": 1852,
	"2003/UKL13": 1853,
	"2003/UKL14": 1854,
	"2003/UKL15": 1855,
	"2003/UKL16": 1856,
	"2003/UKL17": 1857,
	"2003/UKL18": 1858,
	"2003/UKL21": 1859,
	"2003/UKL22": 1860,
	"2003/UKL23": 1861,
	"2003/UKL24": 1862,
	"2003/UKM10": 1863,
	"2003/UKM21": 1864,
	"2003/UKM22": 1865,
	"2003/UKM23": 1866,
	"2003/UKM24": 1867,
	"2003/UKM25": 1868,
	"2003/UKM26": 1869,
	"2003/UKM27": 1870,
	"2003/UKM28": 1871,
	"2003/UKM31": 1872,
	"2003/UKM32": 1873,
	"2003/UKM33": 1874,
	"2003/UKM34": 1875,
	"2003/UKM35": 1876,
	"2003/UKM36": 1877,
	"2003/UKM37": 1878,
	"2003/UKM38": 1879,
	"2003/UKM41": 1880,
	"2003/UKM42": 1881,
	"2003/UKM43": 1882,
	"2003/UKM44": 1883,
	"2003/UKM45": 1884,
	"2003/UKM46": 1885,
	"2003/UKN01": 1886,
	"2003/UKN02": 1887,
	"2003/UKN03": 1888,
	"2003/UKN04": 1889,
	"2003/UKN05": 1890,
	"2006/AT": 0,
	"2006/BE": 1,
	"2006/BG": 2,
	"2006/CH": 3,
	"2006/CY": 4,
	"2006/CZ": 5,
	"2006/DE": 6,
	"2006/DK": 7,
	"2006/EE": 8,
	"2006/ES": 9,
	"2006/FI": 10,
	"2006/FR": 11,
	"2006/GR": 12,
	"2006/HR": 13,
	"2006/HU": 14,
	"2006/IE": 15,
	"2006/IS": 16,
	"2006/IT": 17,
	"2006/LI": 18,
	"2006/LT": 19,
	"2006/LU": 20,
	"2006/LV": 21,
	"2006/ME": 1891,
	"2006/MK": 1892,
	"2006/MT": 22,
	"2006/NL": 23,
	"2006/NO": 24,
	"2006/PL": 25,
	"2006/PT": 26,
	"2006/RO": 27,
	"2006/SE": 28,
	"2006/SI": 29,
	"2006/SK": 30,
	"2006/TR": 31,
	"2006/UK": 32,
	"2006/AT1": 33,
	"2006/AT2": 34,
	"2006/AT3": 35,
	"2006/BE1": 36,
	"2006/BE2": 37,
	"2006/BE3": 38,
	"2006/BG3": 39,
	"2006/BG4": 40,
	"2006/CH0": 41,
	"2006/CY0": 42,
	"2006/CZ0": 43,
	"2006/DE1": 44,
	"2006/DE2": 45,
	"2006/DE3": 46,
	"2006/DE4": 47,
	"2006/DE5": 48,
	"2006/DE6": 49,
	"2006/DE7": 50,
	"2006/DE8": 51,
	"2006/DE9": 52,
	"2006/DEA": 53,
	"2006/DEB": 54,
	"2006/DEC": 55,
	"2006/DED": 56,
	"2006/DEE": 57,
	"2006/DEF": 58,
	"2006/DEG": 59,
	"2006/DK0": 60,
	"2006/EE0": 61,
	"2006/ES1": 62,
	"2006/ES2": 63,
	"2006/ES3": 64,
	"2006/ES4": 65,
	"2006/ES5": 66,
	"2006/ES6": 67,
	"2006/ES7": 68,
	"2006/FI1": 69,
	"2006/FI2": 70,
	"2006/FR1": 71,
	"2006/FR2": 72,
	"2006/FR3": 73,
	"2006/FR4": 74,
	"2006/FR5": 75,
	"2006/FR6": 76,
	"2006/FR7": 77,
	"2006/FR8": 78,
	"2006/FR9": 79,
	"2006/GR1": 80,
	"2006/GR2": 81,
	"2006/GR3": 82,
	"2006/GR4": 83,
	"2006/HR0": 84,
	"2006/HU1": 85,
	"2006/HU2": 86,
	"2006/HU3": 87,
	"2006/IE0": 88,
	"2006/IS0": 89,
	"2006/ITC": 90,
	"2006/ITD": 91,
	"2006/ITE": 92,
	"2006/ITF": 93,
	"2006/ITG": 94,
	"2006/LI0": 95,
	"2006/LT0": 96,
	"2006/LU0": 97,
	"2006/LV0": 98,
	"2006/ME0": 1893,
	"2006/MK0": 1894,
	"2006/MT0": 99,
	"2006/NL1": 100,
	"2006/NL2": 101,
	"2006/NL3": 102,
	"2006/NL4": 103,
	"2006/NO0": 104,
	"2006/PL1": 105,
	"2006/PL2": 106,
	"2006/PL3": 107,
	"2006/PL4": 108,
	"2006/PL5": 109,
	"2006/PL6": 110,
	"2006/PT1": 111,
	"2006/PT2": 112,
	"2006/PT3": 113,
	"2006/RO1": 114,
	"2006/RO2": 115,
	"2006/RO3": 116,
	"2006/RO4": 117,
	"2006/SE1": 1895,
	"2006/SE2": 1896,
	"2006/SE3": 1897,
	"2006/SI0": 119,
	"2006/SK0": 120,
	"2006/TR1": 121,
	"2006/TR2": 122,
	"2006/TR3": 123,
	"2006/TR4": 124,
	"2006/TR5": 125,
	"2006/TR6": 126,
	"2006/TR7": 127,
	"2006/TR8": 128,
	"2006/TR9": 129,
	"2006/TRA": 130,
	"2006/TRB": 131,
	"2006/TRC": 132,
	"2006/UKC": 133,
	"2006/UKD": 134,
	"2006/UKE": 135,
	"2006/UKF": 136,
	"2006/UKG": 137,
	"2006/UKH": 138,
	"2006/UKI": 139,
	"2006/UKJ": 140,
	"2006/UKK": 141,
	"2006/UKL": 142,
	"2006/UKM": 143,
	"2006/UKN": 144,
	"2006/AT11": 145,
	"2006/AT12": 146,
	"2006/AT13": 147,
	"2006/AT21": 148,
	"2006/AT22": 149,
	"2006/AT31": 150,
	"2006/AT32": 151,
	"2006/AT33": 152,
	"2006/AT34": 153,
	"2006/BE10": 154,
	"2006/BE21": 155,
	"2006/BE22": 156,
	"2006/BE23": 157,
	"2006/BE24": 158,
	"2006/BE25": 159,
	"2006/BE31": 160,
	"2006/BE32": 161,
	"2006/BE33": 162,
	"2006/BE34": 163,
	"2006/BE35": 164,
	"2006/BG31": 165,
	"2006/BG32": 166,
	"2006/BG33": 167,
	"2006/BG34": 168,
	"2006/BG41": 169,
	"2006/BG42": 170,
	"2006/CH01": 171,
	"2006/CH02": 172,
	"2006/CH03": 173,
	"2006/CH04": 174,
	"2006/CH05": 175,
	"2006/CH06": 176,
	"2006/CH07": 177,
	"2006/CY00": 178,
	"2006/CZ01": 179,
	"2006/CZ02": 180,
	"2006/CZ03": 181,
	"2006/CZ04": 182,
	"2006/CZ05": 183,
	"2006/CZ06": 184,
	"2006/CZ07": 185,
	"2006/CZ08": 186,
	"2006/DE11": 187,
	"2006/DE12": 188,
	"2006/DE13": 189,
	"2006/DE14": 190,
	"2006/DE21": 191,
	"2006/DE22": 192,
	"2006/DE23": 193,
	"2006/DE24": 194,
	"2006/DE25": 195,
	"2006/DE26": 196,
	"2006/DE27": 197,
	"2006/DE30": 198,
	"2006/DE41": 199,
	"2006/DE42": 200,
	"2006/DE50": 201,
	"2006/DE60": 202,
	"2006/DE71": 203,
	"2006/DE72": 204,
	"2006/DE73": 205,
	"2006/DE80": 206,
	"2006/DE91": 207,
	"2006/DE92": 208,
	"2006/DE93": 209,
	"2006/DE94": 210,
	"2006/DEA1": 211,
	"2006/DEA2": 212,
	"2006/DEA3": 213,
	"2006/DEA4": 214,
	"2006/DEA5": 215,
	"2006/DEB1": 216,
	"2006/DEB2": 217,
	"2006/DEB3": 218,
	"2006/DEC0": 219,
	"2006/DED1": 220,
	"2006/DED2": 221,
	"2006/DED3": 222,
	"2006/DEE0": 1898,
	"2006/DEF0": 226,
	"2006/DEG0": 227,
	"2006/DK01": 1899,
	"2006/DK02": 1900,
	"2006/DK03": 1901,
	"2006/DK04": 1902,
	"2006/DK05": 1903,
	"2006/EE00": 229,
	"2006/ES11": 230,
	"2006/ES12": 231,
	"2006/ES13": 232,
	"2006/ES21": 233,
	"2006/ES22": 234,
	"2006/ES23": 235,
	"2006/ES24": 236,
	"2006/ES30": 237,
	"2006/ES41": 238,
	"2006/ES42": 239,
	"2006/ES43": 240,
	"2006/ES51": 241,
	"2006/ES52": 242,
	"2006/ES53": 243,
	"2006/ES61": 244,
	"2006/ES62": 245,
	"2006/ES63": 246,
	"2006/ES64": 247,
	"2006/ES70": 248,
	"2006/FI13": 249,
	"2006/FI18": 250,
	"2006/FI19": 251,
	"2006/FI1A": 252,
	"2006/FI20": 253,
	"2006/FR10": 254,
	"2006/FR21": 255,
	"2006/FR22": 256,
	"2006/FR23": 257,
	"2006/FR24": 258,
	"2006/FR25": 259,
	"2006/FR26": 260,
	"2006/FR30": 261,
	"2006/FR41": 262,
	"2006/FR42": 263,
	"2006/FR43": 264,
	"2006/FR51": 265,
	"2006/FR52": 266,
	"2006/FR53": 267,
	"2006/FR61": 268,
	"2006/FR62": 269,
	"2006/FR63": 270,
	"2006/FR71": 271,
	"2006/FR72": 272,
	"2006/FR81": 273,
	"2006/FR82": 274,
	"2006/FR83": 275,
	"2006/FR91": 276,
	"2006/FR92": 277,
	"2006/FR93": 278,
	"2006/FR94": 279,
	"2006/GR11": 280,
	"2006/GR12": 281,
	"2006/GR13": 282,
	"2006/GR14": 283,
	"2006/GR21": 284,
	"2006/GR22": 285,
	"2006/GR23": 286,
	"2006/GR24": 287,
	"2006/GR25": 288,
	"2006/GR30": 289,
	"2006/GR41": 290,
	"2006/GR42": 291,
	"2006/GR43": 292,
	"2006/HR01": 293,
	"2006/HR02": 294,
	"2006/HR03": 295,
	"2006/HU10": 296,
	"2006/HU21": 297,
	"2006/HU22": 298,
	"2006/HU23": 299,
	"2006/HU31": 300,
	"2006/HU32": 301,
	"2006/HU33": 302,
	"2006/IE01": 303,
	"2006/IE02": 304,
	"2006/IS00": 305,
	"2006/ITC1": 306,
	"2006/ITC2": 307,
	"2006/ITC3": 308,
	"2006/ITC4": 309,
	"2006/ITD1": 310,
	"2006/ITD2": 311,
	"2006/ITD3": 312,
	"2006/ITD4": 313,
	"2006/ITD5": 314,
	"2006/ITE1": 315,
	"2006/ITE2": 316,
	"2006/ITE3": 317,
	"2006/ITE4": 318,
	"2006/ITF1": 319,
	"2006/ITF2": 320,
	"2006/ITF3": 321,
	"2006/ITF4": 322,
	"2006/ITF5": 323,
	"2006/ITF6": 324,
	"2006/ITG1": 325,
	"2006/ITG2": 326,
	"2006/LI00": 327,
	"2006/LT00": 328,
	"2006/LU00": 329,
	"2006/LV00": 330,
	"2006/ME00": 1904,
	"2006/MK00": 1905,
	"2006/MT00": 331,
	"2006/NL11": 332,
	"2006/NL12": 333,
	"2006/NL13": 334,
	"2006/NL21": 335,
	"2006/NL22": 336,
	"2006/NL23": 337,
	"2006/NL31": 338,
	"2006/NL32": 339,
	"2006/NL33": 340,
	"2006/NL34": 341,
	"2006/NL41": 342,
	"2006/NL42": 343,
	"2006/NO01": 344,
	"2006/NO02": 345,
	"2006/NO03": 346,
	"2006/NO04": 347,
	"2006/NO05": 348,
	"2006/NO06": 349,
	"2006/NO07": 350,
	"2006/PL11": 351,
	"2006/PL12": 352,
	"2006/PL21": 353,
	"2006/PL22": 354,
	"2006/PL31": 355,
	"2006/PL32": 356,
	"2006/PL33": 357,
	"2006/PL34": 358,
	"2006/PL41": 359,
	"2006/PL42": 360,
	"2006/PL43": 361,
	"2006/PL51": 362,
	"2006/PL52": 363,
	"2006/PL61": 364,
	"2006/PL62": 365,
	"2006/PL63": 366,
	"2006/PT11": 367,
	"2006/PT15": 368,
	"2006/PT16": 369,
	"2006/PT17": 370,
	"2006/PT18": 371,
	"2006/PT20": 372,
	"2006/PT30": 373,
	"2006/RO11": 374,
	"2006/RO12": 375,
	"2006/RO21": 376,
	"2006/RO22": 377,
	"2006/RO31": 378,
	"2006/RO32": 379,
	"2006/RO41": 380,
	"2006/RO42": 381,
	"2006/SE11": 382,
	"2006/SE12": 383,
	"2006/SE21": 388,
	"2006/SE22": 384,
	"2006/SE23": 389,
	"2006/SE31": 385,
	"2006/SE32": 386,
	"2006/SE33": 387,
	"2006/SI01": 1906,
	"2006/SI02": 1907,
	"2006/SK01": 391,
	"2006/SK02": 392,
	"2006/SK03": 393,
	"2006/SK04": 394,
	"2006/TR10": 395,
	"2006/TR21": 396,
	"2006/TR22": 397,
	"2006/TR31": 398,
	"2006/TR32": 399,
	"2006/TR33": 400,
	"2006/TR41": 401,
	"2006/TR42": 402,
	"2006/TR51": 403,
	"2006/TR52": 404,
	"2006/TR61": 405,
	"2006/TR62": 406,
	"2006/TR63": 407,
	"2006/TR71": 408,
	"2006/TR72": 409,
	"2006/TR81": 410,
	"2006/TR82": 411,
	"2006/TR83": 412,
	"2006/TR90": 413,
	"2006/TRA1": 414,
	"2006/TRA2": 415,
	"2006/TRB1": 416,
	"2006/TRB2": 417,
	"2006/TRC1": 418,
	"2006/TRC2": 419,
	"2006/TRC3": 420,
	"2006/UKC1": 421,
	"2006/UKC2": 422,
	"2006/UKD1": 423,
	"2006/UKD2": 424,
	"2006/UKD3": 425,
	"2006/UKD4": 426,
	"2006/UKD5": 427,
	"2006/UKE1": 428,
	"2006/UKE2": 429,
	"2006/UKE3": 430,
	"2006/UKE4": 431,
	"2006/UKF1": 432,
	"2006/UKF2": 433,
	"2006/UKF3": 434,
	"2006/UKG1": 435,
	"2006/UKG2": 436,
	"2006/UKG3": 437,
	"2006/UKH1": 438,
	"2006/UKH2": 439,
	"2006/UKH3": 440,
	"2006/UKI1": 441,
	"2006/UKI2": 442,
	"2006/UKJ1": 443,
	"2006/UKJ2": 444,
	"2006/UKJ3": 445,
	"2006/UKJ4": 446,
	"2006/UKK1": 447,
	"2006/UKK2": 448,
	"2006/UKK3": 449,
	"2006/UKK4": 450,
	"2006/UKL1": 451,
	"2006/UKL2": 452,
	"2006/UKM2": 454,
	"2006/UKM3": 455,
	"2006/UKM5": 1908,
	"2006/UKM6": 1909,
	"2006/UKN0": 457,
	"2006/AT111": 458,
	"2006/AT112": 459,
	"2006/AT113": 460,
	"2006/AT121": 461,
	"2006/AT122": 462,
	"2006/AT123": 463,
	"2006/AT124": 464,
	"2006/AT125": 465,
	"2006/AT126": 466,
	"2006/AT127": 467,
	"2006/AT130": 468,
	"2006/AT211": 469,
	"2006/AT212": 470,
	"2006/AT213": 471,
	"2006/AT221": 472,
	"2006/AT222": 473,
	"2006/AT223": 474,
	"2006/AT224": 475,
	"2006/AT225": 476,
	"2006/AT226": 477,
	"2006/AT311": 478,
	"2006/AT312": 479,
	"2006/AT313": 480,
	"2006/AT314": 481,
	"2006/AT315": 482,
	"2006/AT321": 483,
	"2006/AT322": 484,
	"2006/AT323": 485,
	"2006/AT331": 486,
	"2006/AT332": 487,
	"2006/AT333": 488,
	"2006/AT334": 489,
	"2006/AT335": 490,
	"2006/AT341": 491,
	"2006/AT342": 492,
	"2006/BE100": 493,
	"2006/BE211": 494,
	"2006/BE212": 495,
	"2006/BE213": 496,
	"2006/BE221": 497,
	"2006/BE222": 498,
	"2006/BE223": 499,
	"2006/BE231": 500,
	"2006/BE232": 501,
	"2006/BE233": 502,
	"2006/BE234": 503,
	"2006/BE235": 504,
	"2006/BE236": 505,
	"2006/BE241": 506,
	"2006/BE242": 507,
	"2006/BE251": 508,
	"2006/BE252": 509,
	"2006/BE253": 510,
	"2006/BE254": 511,
	"2006/BE255": 512,
	"2006/BE256": 513,
	"2006/BE257": 514,
	"2006/BE258": 515,
	"2006/BE310": 516,
	"2006/BE321": 517,
	"2006/BE322": 518,
	"2006/BE323": 519,
	"2006/BE324": 520,
	"2006/BE325": 521,
	"2006/BE326": 522,
	"2006/BE327": 523,
	"2006/BE331": 524,
	"2006/BE332": 525,
	"2006/BE334": 527,
	"2006/BE335": 1910,
	"2006/BE336": 1911,
	"2006/BE341": 528,
	"2006/BE342": 529,
	"2006/BE343": 530,
	"2006/BE344": 531,
	"2006/BE345": 532,
	"2006/BE351": 533,
	"2006/BE352": 534,
	"2006/BE353": 535,
	"2006/BG311": 536,
	"2006/BG312": 537,
	"2006/BG313": 538,
	"2006/BG314": 539,
	"2006/BG315": 540,
	"2006/BG321": 541,
	"2006/BG322": 542,
	"2006/BG323": 543,
	"2006/BG324": 544,
	"2006/BG325": 545,
	"2006/BG331": 546,
	"2006/BG332": 547,
	"2006/BG333": 548,
	"2006/BG334": 549,
	"2006/BG341": 550,
	"2006/BG342": 551,
	"2006/BG343": 552,
	"2006/BG344": 553,
	"2006/BG411": 554,
	"2006/BG412": 555,
	"2006/BG413": 556,
	"2006/BG414": 557,
	"2006/BG415": 558,
	"2006/BG421": 559,
	"2006/BG422": 560,
	"2006/BG423": 561,
	"2006/BG424": 562,
	"2006/BG425": 563,
	"2006/CH011": 564,
	"2006/CH012": 565,
	"2006/CH013": 566,
	"2006/CH021": 567,
	"2006/CH022": 568,
	"2006/CH023": 569,
	"2006/CH024": 570,
	"2006/CH025": 571,
	"2006/CH031": 572,
	"2006/CH032": 573,
	"2006/CH033": 574,
	"2006/CH040": 575,
	"2006/CH051": 576,
	"2006/CH052": 577,
	"2006/CH053": 578,
	"2006/CH054": 579,
	"2006/CH055": 580,
	"2006/CH056": 581,
	"2006/CH057": 582,
	"2006/CH061": 583,
	"2006/CH062": 584,
	"2006/CH063": 585,
	"2006/CH064": 586,
	"2006/CH065": 587,
	"2006/CH066": 588,
	"2006/CH070": 589,
	"2006/CY000": 590,
	"2006/CZ010": 591,
	"2006/CZ020": 592,
	"2006/CZ031": 593,
	"2006/CZ032": 594,
	"2006/CZ041": 595,
	"2006/CZ042": 596,
	"2006/CZ051": 597,
	"2006/CZ052": 598,
	"2006/CZ053": 599,
	"2006/CZ063": 1912,
	"2006/CZ064": 1913,
	"2006/CZ071": 602,
	"2006/CZ072": 603,
	"2006/CZ080": 604,
	"2006/DE111": 605,
	"2006/DE112": 606,
	"2006/DE113": 607,
	"2006/DE114": 608,
	"2006/DE115": 609,
	"2006/DE116": 610,
	"2006/DE117": 611,
	"2006/DE118": 612,
	"2006/DE119": 613,
	"2006/DE11A": 614,
	"2006/DE11B": 615,
	"2006/DE11C": 616,
	"2006/DE11D": 617,
	"2006/DE121": 618,
	"2006/DE122": 619,
	"2006/DE123": 620,
	"2006/DE124": 621,
	"2006/DE125": 622,
	"2006/DE126": 623,
	"2006/DE127": 624,
	"2006/DE128": 625,
	"2006/DE129": 626,
	"2006/DE12A": 627,
	"2006/DE12B": 628,
	"2006/DE12C": 629,
	"2006/DE131": 630,
	"2006/DE132": 631,
	"2006/DE133": 632,
	"2006/DE134": 633,
	"2006/DE135": 634,
	"2006/DE136": 635,
	"2006/DE137": 636,
	"2006/DE138": 637,
	"2006/DE139": 638,
	"2006/DE13A": 639,
	"2006/DE141": 640,
	"2006/DE142": 641,
	"2006/DE143": 642,
	"2006/DE144": 643,
	"2006/DE145": 644,
	"2006/DE146": 645,
	"2006/DE147": 646,
	"2006/DE148": 647,
	"2006/DE149": 648,
	"2006/DE211": 649,
	"2006/DE212": 650,
	"2006/DE213": 651,
	"2006/DE214": 652,
	"2006/DE215": 653,
	"2006/DE216": 654,
	"2006/DE217": 655,
	"2006/DE218": 656,
	"2006/DE219": 657,
	"2006/DE21A": 658,
	"2006/DE21B": 659,
	"2006/DE21C": 660,
	"2006/DE21D": 661,
	"2006/DE21E": 662,
	"2006/DE21F": 663,
	"2006/DE21G": 664,
	"2006/DE21H": 665,
	"2006/DE21I": 666,
	"2006/DE21J": 667,
	"2006/DE21K": 668,
	"2006/DE21L": 669,
	"2006/DE21M": 670,
	"2006/DE21N": 671,
	"2006/DE221": 672,
	"2006/DE222": 673,
	"2006/DE223": 674,
	"2006/DE224": 675,
	"2006/DE225": 676,
	"2006/DE226": 677,
	"2006/DE227": 678,
	"2006/DE228": 679,
	"2006/DE229": 680,
	"2006/DE22A": 681,
	"2006/DE22B": 682,
	"2006/DE22C": 683,
	"2006/DE231": 684,
	"2006/DE232": 685,
	"2006/DE233": 686,
	"2006/DE234": 687,
	"2006/DE235": 688,
	"2006/DE236": 689,
	"2006/DE237": 690,
	"2006/DE238": 691,
	"2006/DE239": 692,
	"2006/DE23A": 693,
	"2006/DE241": 694,
	"2006/DE242": 695,
	"2006/DE243": 696,
	"2006/DE244": 697,
	"2006/DE245": 698,
	"2006/DE246": 699,
	"2006/DE247": 700,
	"2006/DE248": 701,
	"2006/DE249": 702,
	"2006/DE24A": 703,
	"2006/DE24B": 704,
	"2006/DE24C": 705,
	"2006/DE24D": 706,
	"2006/DE251": 707,
	"2006/DE252": 708,
	"2006/DE253": 709,
	"2006/DE254": 710,
	"2006/DE255": 711,
	"2006/DE256": 712,
	"2006/DE257": 713,
	"2006/DE258": 714,
	"2006/DE259": 715,
	"2006/DE25A": 716,
	"2006/DE25B": 717,
	"2006/DE25C": 718,
	"2006/DE261": 719,
	"2006/DE262": 720,
	"2006/DE263": 721,
	"2006/DE264": 722,
	"2006/DE265": 723,
	"2006/DE266": 724,
	"2006/DE267": 725,
	"2006/DE268": 726,
	"2006/DE269": 727,
	"2006/DE26A": 728,
	"2006/DE26B": 729,
	"2006/DE26C": 730,
	"2006/DE271": 731,
	"2006/DE272": 732,
	"2006/DE273": 733,
	"2006/DE274": 734,
	"2006/DE275": 735,
	"2006/DE276": 736,
	"2006/DE277": 737,
	"2006/DE278": 738,
	"2006/DE279": 739,
	"2006/DE27A": 740,
	"2006/DE27B": 741,
	"2006/DE27C": 742,
	"2006/DE27D": 743,
	"2006/DE27E": 744,
	"2006/DE300": 745,
	"2006/DE411": 746,
	"2006/DE412": 747,
	"2006/DE413": 748,
	"2006/DE414": 749,
	"2006/DE415": 750,
	"2006/DE416": 751,
	"2006/DE417": 752,
	"2006/DE418": 753,
	"2006/DE421": 754,
	"2006/DE422": 755,
	"2006/DE423": 756,
	"2006/DE424": 757,
	"2006/DE425": 758,
	"2006/DE426": 759,
	"2006/DE427": 760,
	"2006/DE428": 761,
	"2006/DE429": 762,
	"2006/DE42A": 763,
	"2006/DE501": 764,
	"2006/DE502": 765,
	"2006/DE600": 766,
	"2006/DE711": 767,
	"2006/DE712": 768,
	"2006/DE713": 769,
	"2006/DE714": 770,
	"2006/DE715": 771,
	"2006/DE716": 772,
	"2006/DE717": 773,
	"2006/DE718": 774,
	"2006/DE719": 775,
	"2006/DE71A": 776,
	"2006/DE71B": 777,
	"2006/DE71C": 778,
	"2006/DE71D": 779,
	"2006/DE71E": 780,
	"2006/DE721": 781,
	"2006/DE722": 782,
	"2006/DE723": 783,
	"2006/DE724": 784,
	"2006/DE725": 785,
	"2006/DE731": 786,
	"2006/DE732": 787,
	"2006/DE733": 788,
	"2006/DE734": 789,
	"2006/DE735": 790,
	"2006/DE736": 791,
	"2006/DE737": 792,
	"2006/DE801": 793,
	"2006/DE802": 794,
	"2006/DE803": 795,
	"2006/DE804": 796,
	"2006/DE805": 797,
	"2006/DE806": 798,
	"2006/DE807": 799,
	"2006/DE808": 800,
	"2006/DE809": 801,
	"2006/DE80A": 802,
	"2006/DE80B": 803,
	"2006/DE80C": 804,
	"2006/DE80D": 805,
	"2006/DE80E": 806,
	"2006/DE80F": 807,
	"2006/DE80G": 808,
	"2006/DE80H": 809,
	"2006/DE80I": 810,
	"2006/DE911": 811,
	"2006/DE912": 812,
	"2006/DE913": 813,
	"2006/DE914": 814,
	"2006/DE915": 815,
	"2006/DE916": 816,
	"2006/DE917": 817,
	"2006/DE918": 818,
	"2006/DE919": 819,
	"2006/DE91A": 820,
	"2006/DE91B": 821,
	"2006/DE922": 822,
	"2006/DE923": 823,
	"2006/DE925": 824,
	"2006/DE926": 825,
	"2006/DE927": 826,
	"2006/DE928": 827,
	"2006/DE929": 828,
	"2006/DE931": 829,
	"2006/DE932": 830,
	"2006/DE933": 831,
	"2006/DE934": 832,
	"2006/DE935": 833,
	"2006/DE936": 834,
	"2006/DE937": 835,
	"2006/DE938": 836,
	"2006/DE939": 837,
	"2006/DE93A": 838,
	"2006/DE93B": 839,
	"2006/DE941": 840,
	"2006/DE942": 841,
	"2006/DE943": 842,
	"2006/DE944": 843,
	"2006/DE945": 844,
	"2006/DE946": 845,
	"2006/DE947": 846,
	"2006/DE948": 847,
	"2006/DE949": 848,
	"2006/DE94A": 849,
	"2006/DE94B": 850,
	"2006/DE94C": 851,
	"2006/DE94D": 852,
	"2006/DE94E": 853,
	"2006/DE94F": 854,
	"2006/DE94G": 855,
	"2006/DE94H": 856,
	"2006/DEA11": 857,
	"2006/DEA12": 858,
	"2006/DEA13": 859,
	"2006/DEA14": 860,
	"2006/DEA15": 861,
	"2006/DEA16": 862,
	"2006/DEA17": 863,
	"2006/DEA18": 864,
	"2006/DEA19": 865,
	"2006/DEA1A": 866,
	"2006/DEA1B": 867,
	"2006/DEA1C": 868,
	"2006/DEA1D": 869,
	"2006/DEA1E": 870,
	"2006/DEA1F": 871,
	"2006/DEA21": 872,
	"2006/DEA22": 873,
	"2006/DEA23": 874,
	"2006/DEA24": 875,
	"2006/DEA25": 876,
	"2006/DEA26": 877,
	"2006/DEA27": 878,
	"2006/DEA28": 879,
	"2006/DEA29": 880,
	"2006/DEA2A": 881,
	"2006/DEA2B": 882,
	"2006/DEA2C": 883,
	"2006/DEA31": 884,
	"2006/DEA32": 885,
	"2006/DEA33": 886,
	"2006/DEA34": 887,
	"2006/DEA35": 888,
	"2006/DEA36": 889,
	"2006/DEA37": 890,
	"2006/DEA38": 891,
	"2006/DEA41": 892,
	"2006/DEA42": 893,
	"2006/DEA43": 894,
	"2006/DEA44": 895,
	"2006/DEA45": 896,
	"2006/DEA46": 897,
	"2006/DEA47": 898,
	"2006/DEA51": 899,
	"2006/DEA52": 900,
	"2006/DEA53": 901,
	"2006/DEA54": 902,
	"2006/DEA55": 903,
	"2006/DEA56": 904,
	"2006/DEA57": 905,
	"2006/DEA58": 906,
	"2006/DEA59": 907,
	"2006/DEA5A": 908,
	"2006/DEA5B": 909,
	"2006/DEA5C": 910,
	"2006/DEB11": 911,
	"2006/DEB12": 912,
	"2006/DEB13": 913,
	"2006/DEB14": 914,
	"2006/DEB15": 915,
	"2006/DEB16": 916,
	"2006/DEB17": 917,
	"2006/DEB18": 918,
	"2006/DEB19": 919,
	"2006/DEB1A": 920,
	"2006/DEB1B": 921,
	"2006/DEB21": 922,
	"2006/DEB22": 923,
	"2006/DEB23": 924,
	"2006/DEB24": 925,
	"2006/DEB25": 926,
	"2006/DEB31": 927,
	"2006/DEB32": 928,
	"2006/DEB33": 929,
	"2006/DEB34": 930,
	"2006/DEB35": 931,
	"2006/DEB36": 932,
	"2006/DEB37": 933,
	"2006/DEB38": 934,
	"2006/DEB39": 935,
	"2006/DEB3A": 936,
	"2006/DEB3B": 937,
	"2006/DEB3C": 938,
	"2006/DEB3D": 939,
	"2006/DEB3E": 940,
	"2006/DEB3F": 941,
	"2006/DEB3G": 942,
	"2006/DEB3H": 943,
	"2006/DEB3I": 944,
	"2006/DEB3J": 945,
	"2006/DEB3K": 946,
	"2006/DEC01": 947,
	"2006/DEC02": 948,
	"2006/DEC03": 949,
	"2006/DEC04": 950,
	"2006/DEC05": 951,
	"2006/DEC06": 952,
	"2006/DED11": 953,
	"2006/DED12": 954,
	"2006/DED13": 955,
	"2006/DED14": 956,
	"2006/DED15": 957,
	"2006/DED16": 958,
	"2006/DED17": 959,
	"2006/DED18": 960,
	"2006/DED19": 961,
	"2006/DED1A": 962,
	"2006/DED1B": 963,
	"2006/DED1C": 964,
	"2006/DED21": 965,
	"2006/DED22": 966,
	"2006/DED23": 967,
	"2006/DED24": 968,
	"2006/DED25": 969,
	"2006/DED26": 970,
	"2006/DED27": 971,
	"2006/DED28": 972,
	"2006/DED29": 973,
	"2006/DED2A": 974,
	"2006/DED2B": 975,
	"2006/DED31": 976,
	"2006/DED32": 977,
	"2006/DED33": 978,
	"2006/DED34": 979,
	"2006/DED35": 980,
	"2006/DED36": 981,
	"2006/DEE01": 1914,
	"2006/DEE02": 988,
	"2006/DEE03": 995,
	"2006/DEE04": 1005,
	"2006/DEE05": 1915,
	"2006/DEE06": 1916,
	"2006/DEE07": 1917,
	"2006/DEE08": 1918,
	"2006/DEE09": 1919,
	"2006/DEE0A": 1920,
	"2006/DEE0B": 1921,
	"2006/DEE0C": 1922,
	"2006/DEE0D": 1001,
	"2006/DEE0E": 1923,
	"2006/DEF01": 1006,
	"2006/DEF02": 1007,
	"2006/DEF03": 1008,
	"2006/DEF04": 1009,
	"2006/DEF05": 1010,
	"2006/DEF06": 1011,
	"2006/DEF07": 1012,
	"2006/DEF08": 1013,
	"2006/DEF09": 1014,
	"2006/DEF0A": 1015,
	"2006/DEF0B": 1016,
	"2006/DEF0C": 1017,
	"2006/DEF0D": 1018,
	"2006/DEF0E": 1019,
	"2006/DEF0F": 1020,
	"2006/DEG01": 1021,
	"2006/DEG02": 1022,
	"2006/DEG03": 1023,
	"2006/DEG04": 1024,
	"2006/DEG05": 1025,
	"2006/DEG06": 1026,
	"2006/DEG07": 1027,
	"2006/DEG09": 1028,
	"2006/DEG0A": 1029,
	"2006/DEG0B": 1030,
	"2006/DEG0C": 1031,
	"2006/DEG0D": 1032,
	"2006/DEG0E": 1033,
	"2006/DEG0F": 1034,
	"2006/DEG0G": 1035,
	"2006/DEG0H": 1036,
	"2006/DEG0I": 1037,
	"2006/DEG0J": 1038,
	"2006/DEG0K": 1039,
	"2006/DEG0L": 1040,
	"2006/DEG0M": 1041,
	"2006/DEG0N": 1042,
	"2006/DEG0P": 1043,
	"2006/DK011": 1924,
	"2006/DK012": 1925,
	"2006/DK013": 1926,
	"2006/DK014": 1050,
	"2006/DK021": 1927,
	"2006/DK022": 1928,
	"2006/DK031": 1051,
	"2006/DK032": 1929,
	"2006/DK041": 1930,
	"2006/DK042": 1931,
	"2006/DK050": 1932,
	"2006/EE001": 1059,
	"2006/EE004": 1060,
	"2006/EE006": 1061,
	"2006/EE007": 1062,
	"2006/EE008": 1063,
	"2006/ES111": 1064,
	"2006/ES112": 1065,
	"2006/ES113": 1066,
	"2006/ES114": 1067,
	"2006/ES120": 1068,
	"2006/ES130": 1069,
	"2006/ES211": 1070,
	"2006/ES212": 1071,
	"2006/ES213": 1072,
	"2006/ES220": 1073,
	"2006/ES230": 1074,
	"2006/ES241": 1075,
	"2006/ES242": 1076,
	"2006/ES243": 1077,
	"2006/ES300": 1078,
	"2006/ES411": 1079,
	"2006/ES412": 1080,
	"2006/ES413": 1081,
	"2006/ES414": 1082,
	"2006/ES415": 1083,
	"2006/ES416": 1084,
	"2006/ES417": 1085,
	"2006/ES418": 1086,
	"2006/ES419": 1087,
	"2006/ES421": 1088,
	"2006/ES422": 1089,
	"2006/ES423": 1090,
	"2006/ES424": 1091,
	"2006/ES425": 1092,
	"2006/ES431": 1093,
	"2006/ES432": 1094,
	"2006/ES511": 1095,
	"2006/ES512": 1096,
	"2006/ES513": 1097,
	"2006/ES514": 1098,
	"2006/ES521": 1099,
	"2006/ES522": 1100,
	"2006/ES523": 1101,
	"2006/ES531": 1933,
	"2006/ES532": 1934,
	"2006/ES533": 1935,
	"2006/ES611": 1103,
	"2006/ES612": 1104,
	"2006/ES613": 1105,
	"2006/ES614": 1106,
	"2006/ES615": 1107,
	"2006/ES616": 1108,
	"2006/ES617": 1109,
	"2006/ES618": 1110,
	"2006/ES620": 1111,
	"2006/ES630": 1112,
	"2006/ES640": 1113,
	"2006/ES703": 1936,
	"2006/ES704": 1937,
	"2006/ES705": 1938,
	"2006/ES706": 1939,
	"2006/ES707": 1940,
	"2006/ES708": 1941,
	"2006/ES709": 1942,
	"2006/FI131": 1116,
	"2006/FI132": 1117,
	"2006/FI133": 1118,
	"2006/FI134": 1119,
	"2006/FI181": 1120,
	"2006/FI182": 1121,
	"2006/FI183": 1122,
	"2006/FI184": 1123,
	"2006/FI185": 1124,
	"2006/FI186": 1125,
	"2006/FI187": 1126,
	"2006/FI193": 1129,
	"2006/FI194": 1130,
	"2006/FI195": 1131,
	"2006/FI196": 1943,
	"2006/FI197": 1944,
	"2006/FI1A1": 1132,
	"2006/FI1A2": 1133,
	"2006/FI1A3": 1134,
	"2006/FI200": 1135,
	"2006/FR101": 1136,
	"2006/FR102": 1137,
	"2006/FR103": 1138,
	"2006/FR104": 1139,
	"2006/FR105": 1140,
	"2006/FR106": 1141,
	"2006/FR107": 1142,
	"2006/FR108": 1143,
	"2006/FR211": 1144,
	"2006/FR212": 1145,
	"2006/FR213": 1146,
	"2006/FR214": 1147,
	"2006/FR221": 1148,
	"2006/FR222": 1149,
	"2006/FR223": 1150,
	"2006/FR231": 1151,
	"2006/FR232": 1152,
	"2006/FR241": 1153,
	"2006/FR242": 1154,
	"2006/FR243": 1155,
	"2006/FR244": 1156,
	"2006/FR245": 1157,
	"2006/FR246": 1158,
	"2006/FR251": 1159,
	"2006/FR252": 1160,
	"2006/FR253": 1161,
	"2006/FR261": 1162,
	"2006/FR262": 1163,
	"2006/FR263": 1164,
	"2006/FR264": 1165,
	"2006/FR301": 1166,
	"2006/FR302": 1167,
	"2006/FR411": 1168,
	"2006/FR412": 1169,
	"2006/FR413": 1170,
	"2006/FR414": 1171,
	"2006/FR421": 1172,
	"2006/FR422": 1173,
	"2006/FR431": 1174,
	"2006/FR432": 1175,
	"2006/FR433": 1176,
	"2006/FR434": 1177,
	"2006/FR511": 1178,
	"2006/FR512": 1179,
	"2006/FR513": 1180,
	"2006/FR514": 1181,
	"2006/FR515": 1182,
	"2006/FR521": 1183,
	"2006/FR522": 1184,
	"2006/FR523": 1185,
	"2006/FR524": 1186,
	"2006/FR531": 1187,
	"2006/FR532": 1188,
	"2006/FR533": 1189,
	"2006/FR534": 1190,
	"2006/FR611": 1191,
	"2006/FR612": 1192,
	"2006/FR613": 1193,
	"2006/FR614": 1194,
	"2006/FR615": 1195,
	"2006/FR621": 1196,
	"2006/FR622": 1197,
	"2006/FR623": 1198,
	"2006/FR624": 1199,
	"2006/FR625": 1200,
	"2006/FR626": 1201,
	"2006/FR627": 1202,
	"2006/FR628": 1203,
	"2006/FR631": 1204,
	"2006/FR632": 1205,
	"2006/FR633": 1206,
	"2006/FR711": 1207,
	"2006/FR712": 1208,
	"2006/FR713": 1209,
	"2006/FR714": 1210,
	"2006/FR715": 1211,
	"2006/FR716": 1212,
	"2006/FR717": 1213,
	"2006/FR718": 1214,
	"2006/FR721": 1215,
	"2006/FR722": 1216,
	"2006/FR723": 1217,
	"2006/FR724": 1218,
	"2006/FR811": 1219,
	"2006/FR812": 1220,
	"2006/FR813": 1221,
	"2006/FR814": 1222,
	"2006/FR815": 1223,
	"2006/FR821": 1224,
	"2006/FR822": 1225,
	"2006/FR823": 1226,
	"2006/FR824": 1227,
	"2006/FR825": 1228,
	"2006/FR826": 1229,
	"2006/FR831": 1230,
	"2006/FR832": 1231,
	"2006/FR910": 1232,
	"2006/FR920": 1233,
	"2006/FR930": 1234,
	"2006/FR940": 1235,
	"2006/GR111": 1236,
	"2006/GR112": 1237,
	"2006/GR113": 1238,
	"2006/GR114": 1239,
	"2006/GR115": 1240,
	"2006/GR121": 1241,
	"2006/GR122": 1242,
	"2006/GR123": 1243,
	"2006/GR124": 1244,
	"2006/GR125": 1245,
	"2006/GR126": 1246,
	"2006/GR127": 1247,
	"2006/GR131": 1248,
	"2006/GR132": 1249,
	"2006/GR133": 1250,
	"2006/GR134": 1251,
	"2006/GR141": 1252,
	"2006/GR142": 1253,
	"2006/GR143": 1254,
	"2006/GR144": 1255,
	"2006/GR211": 1256,
	"2006/GR212": 1257,
	"2006/GR213": 1258,
	"2006/GR214": 1259,
	"2006/GR221": 1260,
	"2006/GR222": 1261,
	"2006/GR223": 1262,
	"2006/GR224": 1263,
	"2006/GR231": 1264,
	"2006/GR232": 1265,
	"2006/GR233": 1266,
	"2006/GR241": 1267,
	"2006/GR242": 1268,
	"2006/GR243": 1269,
	"2006/GR244": 1270,
	"2006/GR245": 1271,
	"2006/GR251": 1272,
	"2006/GR252": 1273,
	"2006/GR253": 1274,
	"2006/GR254": 1275,
	"2006/GR255": 1276,
	"2006/GR300": 1277,
	"2006/GR411": 1278,
	"2006/GR412": 1279,
	"2006/GR413": 1280,
	"2006/GR421": 1281,
	"2006/GR422": 1282,
	"2006/GR431": 1283,
	"2006/GR432": 1284,
	"2006/GR433": 1285,
	"2006/GR434": 1286,
	"2006/HR011": 1287,
	"2006/HR012": 1288,
	"2006/HR013": 1289,
	"2006/HR014": 1290,
	"2006/HR015": 1291,
	"2006/HR016": 1292,
	"2006/HR021": 1293,
	"2006/HR022": 1294,
	"2006/HR023": 1295,
	"2006/HR024": 1296,
	"2006/HR025": 1297,
	"2006/HR026": 1298,
	"2006/HR027": 1299,
	"2006/HR028": 1300,
	"2006/HR031": 1301,
	"2006/HR032": 1302,
	"2006/HR033": 1303,
	"2006/HR034": 1304,
	"2006/HR035": 1305,
	"2006/HR036": 1306,
	"2006/HR037": 1307,
	"2006/HU101": 1308,
	"2006/HU102": 1309,
	"2006/HU211": 1310,
	"2006/HU212": 1311,
	"2006/HU213": 1312,
	"2006/HU221": 1313,
	"2006/HU222": 1314,
	"2006/HU223": 1315,
	"2006/HU231": 1316,
	"2006/HU232": 1317,
	"2006/HU233": 1318,
	"2006/HU311": 1319,
	"2006/HU312": 1320,
	"2006/HU313": 1321,
	"2006/HU321": 1322,
	"2006/HU322": 1323,
	"2006/HU323": 1324,
	"2006/HU331": 1325,
	"2006/HU332": 1326,
	"2006/HU333": 1327,
	"2006/IE011": 1328,
	"2006/IE012": 1329,
	"2006/IE013": 1330,
	"2006/IE021": 1331,
	"2006/IE022": 1332,
	"2006/IE023": 1333,
	"2006/IE024": 1334,
	"2006/IE025": 1335,
	"2006/IS001": 1945,
	"2006/IS002": 1946,
	"2006/ITC11": 1337,
	"2006/ITC12": 1338,
	"2006/ITC13": 1339,
	"2006/ITC14": 1340,
	"2006/ITC15": 1341,
	"2006/ITC16": 1342,
	"2006/ITC17": 1343,
	"2006/ITC18": 1344,
	"2006/ITC20": 1345,
	"2006/ITC31": 1346,
	"2006/ITC32": 1347,
	"2006/ITC33": 1348,
	"2006/ITC34": 1349,
	"2006/ITC41": 1350,
	"2006/ITC42": 1351,
	"2006/ITC43": 1352,
	"2006/ITC44": 1353,
	"2006/ITC45": 1354,
	"2006/ITC46": 1355,
	"2006/ITC47": 1356,
	"2006/ITC48": 1357,
	"2006/ITC49": 1358,
	"2006/ITC4A": 1359,
	"2006/ITC4B": 1360,
	"2006/ITD10": 1361,
	"2006/ITD20": 1362,
	"2006/ITD31": 1363,
	"2006/ITD32": 1364,
	"2006/ITD33": 1365,
	"2006/ITD34": 1366,
	"2006/ITD35": 1367,
	"2006/ITD36": 1368,
	"2006/ITD37": 1369,
	"2006/ITD41": 1370,
	"2006/ITD42": 1371,
	"2006/ITD43": 1372,
	"2006/ITD44": 1373,
	"2006/ITD51": 1374,
	"2006/ITD52": 1375,
	"2006/ITD53": 1376,
	"2006/ITD54": 1377,
	"2006/ITD55": 1378,
	"2006/ITD56": 1379,
	"2006/ITD57": 1380,
	"2006/ITD58": 1381,
	"2006/ITD59": 1382,
	"2006/ITE11": 1383,
	"2006/ITE12": 1384,
	"2006/ITE13": 1385,
	"2006/ITE14": 1386,
	"2006/ITE15": 1387,
	"2006/ITE16": 1388,
	"2006/ITE17": 1389,
	"2006/ITE18": 1390,
	"2006/ITE19": 1391,
	"2006/ITE1A": 1392,
	"2006/ITE21": 1393,
	"2006/ITE22": 1394,
	"2006/ITE31": 1395,
	"2006/ITE32": 1396,
	"2006/ITE33": 1397,
	"2006/ITE34": 1398,
	"2006/ITE41": 1399,
	"2006/ITE42": 1400,
	"2006/ITE43": 1401,
	"2006/ITE44": 1402,
	"2006/ITE45": 1403,
	"2006/ITF11": 1404,
	"2006/ITF12": 1405,
	"2006/ITF13": 1406,
	"2006/ITF14": 1407,
	"2006/ITF21": 1408,
	"2006/ITF22": 1409,
	"2006/ITF31": 1410,
	"2006/ITF32": 1411,
	"2006/ITF33": 1412,
	"2006/ITF34": 1413,
	"2006/ITF35": 1414,
	"2006/ITF41": 1415,
	"2006/ITF42": 1416,
	"2006/ITF43": 1417,
	"2006/ITF44": 1418,
	"2006/ITF45": 1419,
	"2006/ITF51": 1420,
	"2006/ITF52": 1421,
	"2006/ITF61": 1422,
	"2006/ITF62": 1423,
	"2006/ITF63": 1424,
	"2006/ITF64": 1425,
	"2006/ITF65": 1426,
	"2006/ITG11": 1427,
	"2006/ITG12": 1428,
	"2006/ITG13": 1429,
	"2006/ITG14": 1430,
	"2006/ITG15": 1431,
	"2006/ITG16": 1432,
	"2006/ITG17": 1433,
	"2006/ITG18": 1434,
	"2006/ITG19": 1435,
	"2006/ITG25": 1947,
	"2006/ITG26": 1948,
	"2006/ITG27": 1949,
	"2006/ITG28": 1950,
	"2006/ITG29": 1951,
	"2006/ITG2A": 1952,
	"2006/ITG2B": 1953,
	"2006/ITG2C": 1954,
	"2006/LI000": 1440,
	"2006/LT001": 1441,
	"2006/LT002": 1442,
	"2006/LT003": 1443,
	"2006/LT004": 1444,
	"2006/LT005": 1445,
	"2006/LT006": 1446,
	"2006/LT007": 1447,
	"2006/LT008": 1448,
	"2006/LT009": 1449,
	"2006/LT00A": 1450,
	"2006/LU000": 1451,
	"2006/LV003": 1452,
	"2006/LV005": 1453,
	"2006/LV006": 1454,
	"2006/LV007": 1455,
	"2006/LV008": 1456,
	"2006/LV009": 1457,
	"2006/ME000": 1955,
	"2006/MK001": 1956,
	"2006/MK002": 1957,
	"2006/MK003": 1958,
	"2006/MK004": 1959,
	"2006/MK005": 1960,
	"2006/MK006": 1961,
	"2006/MK007": 1962,
	"2006/MK008": 1963,
	"2006/MT001": 1458,
	"2006/MT002": 1459,
	"2006/NL111": 1460,
	"2006/NL112": 1461,
	"2006/NL113": 1462,
	"2006/NL121": 1463,
	"2006/NL122": 1464,
	"2006/NL123": 1465,
	"2006/NL131": 1466,
	"2006/NL132": 1467,
	"2006/NL133": 1468,
	"2006/NL211": 1469,
	"2006/NL212": 1470,
	"2006/NL213": 1471,
	"2006/NL221": 1472,
	"2006/NL224": 1475,
	"2006/NL225": 1964,
	"2006/NL226": 1965,
	"2006/NL230": 1476,
	"2006/NL310": 1477,
	"2006/NL321": 1478,
	"2006/NL322": 1479,
	"2006/NL323": 1480,
	"2006/NL324": 1481,
	"2006/NL325": 1482,
	"2006/NL326": 1483,
	"2006/NL327": 1484,
	"2006/NL331": 1485,
	"2006/NL332": 1486,
	"2006/NL333": 1487,
	"2006/NL334": 1488,
	"2006/NL335": 1489,
	"2006/NL336": 1490,
	"2006/NL341": 1491,
	"2006/NL342": 1492,
	"2006/NL411": 1493,
	"2006/NL412": 1494,
	"2006/NL413": 1495,
	"2006/NL414": 1496,
	"2006/NL421": 1497,
	"2006/NL422": 1498,
	"2006/NL423": 1499,
	"2006/NO011": 1500,
	"2006/NO012": 1501,
	"2006/NO021": 1502,
	"2006/NO022": 1503,
	"2006/NO031": 1504,
	"2006/NO032": 1505,
	"2006/NO033": 1506,
	"2006/NO034": 1507,
	"2006/NO041": 1508,
	"2006/NO042": 1509,
	"2006/NO043": 1510,
	"2006/NO051": 1511,
	"2006/NO052": 1512,
	"2006/NO053": 1513,
	"2006/NO061": 1514,
	"2006/NO062": 1515,
	"2006/NO071": 1516,
	"2006/NO072": 1517,
	"2006/NO073": 1518,
	"2006/PL113": 1521,
	"2006/PL114": 1966,
	"2006/PL115": 1967,
	"2006/PL116": 1968,
	"2006/PL117": 1969,
	"2006/PL121": 1522,
	"2006/PL122": 1523,
	"2006/PL127": 1526,
	"2006/PL128": 1970,
	"2006/PL129": 1971,
	"2006/PL12A": 1972,
	"2006/PL213": 1529,
	"2006/PL214": 1973,
	"2006/PL215": 1974,
	"2006/PL216": 1975,
	"2006/PL217": 1976,
	"2006/PL224": 1530,
	"2006/PL225": 1531,
	"2006/PL227": 1533,
	"2006/PL228": 1977,
	"2006/PL229": 1978,
	"2006/PL22A": 1979,
	"2006/PL22B": 1980,
	"2006/PL22C": 1981,
	"2006/PL311": 1534,
	"2006/PL312": 1535,
	"2006/PL314": 1982,
	"2006/PL315": 1983,
	"2006/PL323": 1984,
	"2006/PL324": 1985,
	"2006/PL325": 1986,
	"2006/PL326": 1987,
	"2006/PL331": 1988,
	"2006/PL332": 1989,
	"2006/PL343": 1990,
	"2006/PL344": 1991,
	"2006/PL345": 1992,
	"2006/PL411": 1542,
	"2006/PL414": 1545,
	"2006/PL415": 1546,
	"2006/PL416": 1993,
	"2006/PL417": 1994,
	"2006/PL418": 1995,
	"2006/PL422": 1548,
	"2006/PL423": 1996,
	"2006/PL424": 1997,
	"2006/PL425": 1998,
	"2006/PL431": 1549,
	"2006/PL432": 1550,
	"2006/PL514": 1554,
	"2006/PL515": 1999,
	"2006/PL516": 2000,
	"2006/PL517": 2001,
	"2006/PL518": 2002,
	"2006/PL521": 2003,
	"2006/PL522": 2004,
	"2006/PL613": 2005,
	"2006/PL614": 2006,
	"2006/PL615": 2007,
	"2006/PL621": 1558,
	"2006/PL622": 1559,
	"2006/PL623": 1560,
	"2006/PL631": 1561,
	"2006/PL633": 1563,
	"2006/PL634": 2008,
	"2006/PL635": 2009,
	"2006/PT111": 1564,
	"2006/PT112": 1565,
	"2006/PT113": 1566,
	"2006/PT114": 1567,
	"2006/PT115": 1568,
	"2006/PT116": 1569,
	"2006/PT117": 1570,
	"2006/PT118": 1571,
	"2006/PT150": 1572,
	"2006/PT161": 1573,
	"2006/PT162": 1574,
	"2006/PT163": 1575,
	"2006/PT164": 1576,
	"2006/PT165": 1577,
	"2006/PT166": 1578,
	"2006/PT167": 1579,
	"2006/PT168": 1580,
	"2006/PT169": 1581,
	"2006/PT16A": 1582,
	"2006/PT16B": 1583,
	"2006/PT16C": 1584,
	"2006/PT171": 1585,
	"2006/PT172": 1586,
	"2006/PT181": 1587,
	"2006/PT182": 1588,
	"2006/PT183": 1589,
	"2006/PT184": 1590,
	"2006/PT185": 1591,
	"2006/PT200": 1592,
	"2006/PT300": 1593,
	"2006/RO111": 1594,
	"2006/RO112": 1595,
	"2006/RO113": 1596,
	"2006/RO114": 1597,
	"2006/RO115": 1598,
	"2006/RO116": 1599,
	"2006/RO121": 1600,
	"2006/RO122": 1601,
	"2006/RO123": 1602,
	"2006/RO124": 1603,
	"2006/RO125": 1604,
	"2006/RO126": 1605,
	"2006/RO211": 1606,
	"2006/RO212": 1607,
	"2006/RO213": 1608,
	"2006/RO214": 1609,
	"2006/RO215": 1610,
	"2006/RO216": 1611,
	"2006/RO221": 1612,
	"2006/RO222": 1613,
	"2006/RO223": 1614,
	"2006/RO224": 1615,
	"2006/RO225": 1616,
	"2006/RO226": 1617,
	"2006/RO311": 1618,
	"2006/RO312": 1619,
	"2006/RO313": 1620,
	"2006/RO314": 1621,
	"2006/RO315": 1622,
	"2006/RO316": 1623,
	"2006/RO317": 1624,
	"2006/RO321": 1625,
	"2006/RO322": 1626,
	"2006/RO411": 1627,
	"2006/RO412": 1628,
	"2006/RO413": 1629,
	"2006/RO414": 1630,
	"2006/RO415": 1631,
	"2006/RO421": 1632,
	"2006/RO422": 1633,
	"2006/RO423": 1634,
	"2006/RO424": 1635,
	"2006/SE110": 1636,
	"2006/SE121": 2010,
	"2006/SE122": 1638,
	"2006/SE123": 1639,
	"2006/SE124": 1640,
	"2006/SE125": 2011,
	"2006/SE211": 1651,
	"2006/SE212": 1652,
	"2006/SE213": 1653,
	"2006/SE214": 1654,
	"2006/SE221": 1642,
	"2006/SE224": 1643,
	"2006/SE231": 1655,
	"2006/SE232": 1656,
	"2006/SE311": 1644,
	"2006/SE312": 1645,
	"2006/SE313": 1646,
	"2006/SE321": 1647,
	"2006/SE322": 1648,
	"2006/SE331": 1649,
	"2006/SE332": 1650,
	"2006/SI011": 1657,
	"2006/SI012": 1658,
	"2006/SI013": 1659,
	"2006/SI014": 1660,
	"2006/SI015": 1661,
	"2006/SI016": 1662,
	"2006/SI017": 1667,
	"2006/SI018": 1664,
	"2006/SI021": 1668,
	"2006/SI022": 1663,
	"2006/SI023": 1665,
	"2006/SI024": 1666,
	"2006/SK010": 1669,
	"2006/SK021": 1670,
	"2006/SK022": 1671,
	"2006/SK023": 1672,
	"2006/SK031": 1673,
	"2006/SK032": 1674,
	"2006/SK041": 1675,
	"2006/SK042": 1676,
	"2006/TR100": 1677,
	"2006/TR211": 1678,
	"2006/TR212": 1679,
	"2006/TR213": 1680,
	"2006/TR221": 1681,
	"2006/TR222": 1682,
	"2006/TR310": 1683,
	"2006/TR321": 1684,
	"2006/TR322": 1685,
	"2006/TR323": 1686,
	"2006/TR331": 1687,
	"2006/TR332": 1688,
	"2006/TR333": 1689,
	"2006/TR334": 1690,
	"2006/TR411": 1691,
	"2006/TR412": 1692,
	"2006/TR413": 1693,
	"2006/TR421": 1694,
	"2006/TR422": 1695,
	"2006/TR423": 1696,
	"2006/TR424": 1697,
	"2006/TR425": 1698,
	"2006/TR510": 1699,
	"2006/TR521": 1700,
	"2006/TR522": 1701,
	"2006/TR611": 1702,
	"2006/TR612": 1703,
	"2006/TR613": 1704,
	"2006/TR621": 1705,
	"2006/TR622": 1706,
	"2006/TR631": 1707,
	"2006/TR632": 1708,
	"2006/TR633": 1709,
	"2006/TR711": 1710,
	"2006/TR712": 1711,
	"2006/TR713": 1712,
	"2006/TR714": 1713,
	"2006/TR715": 1714,
	"2006/TR721": 1715,
	"2006/TR722": 1716,
	"2006/TR723": 1717,
	"2006/TR811": 1718,
	"2006/TR812": 1719,
	"2006/TR813": 1720,
	"2006/TR821": 1721,
	"2006/TR822": 1722,
	"2006/TR823": 1723,
	"2006/TR831": 1724,
	"2006/TR832": 1725,
	"2006/TR833": 1726,
	"2006/TR834": 1727,
	"2006/TR901": 1728,
	"2006/TR902": 1729,
	"2006/TR903": 1730,
	"2006/TR904": 1731,
	"2006/TR905": 1732,
	"2006/TR906": 1733,
	"2006/TRA11": 1734,
	"2006/TRA12": 1735,
	"2006/TRA13": 1736,
	"2006/TRA21": 1737,
	"2006/TRA22": 1738,
	"2006/TRA23": 1739,
	"2006/TRA24": 1740,
	"2006/TRB11": 1741,
	"2006/TRB12": 1742,
	"2006/TRB13": 1743,
	"2006/TRB14": 1744,
	"2006/TRB21": 1745,
	"2006/TRB22": 1746,
	"2006/TRB23": 1747,
	"2006/TRB24": 1748,
	"2006/TRC11": 1749,
	"2006/TRC12": 1750,
	"2006/TRC13": 1751,
	"2006/TRC21": 1752,
	"2006/TRC22": 1753,
	"2006/TRC31": 1754,
	"2006/TRC32": 1755,
	"2006/TRC33": 1756,
	"2006/TRC34": 1757,
	"2006/UKC11": 1758,
	"2006/UKC12": 1759,
	"2006/UKC13": 1760,
	"2006/UKC14": 1761,
	"2006/UKC21": 1762,
	"2006/UKC22": 1763,
	"2006/UKC23": 1764,
	"2006/UKD11": 1765,
	"2006/UKD12": 1766,
	"2006/UKD21": 1767,
	"2006/UKD22": 1768,
	"2006/UKD31": 1769,
	"2006/UKD32": 1770,
	"2006/UKD41": 1771,
	"2006/UKD42": 1772,
	"2006/UKD43": 1773,
	"2006/UKD51": 1774,
	"2006/UKD52": 1775,
	"2006/UKD53": 1776,
	"2006/UKD54": 1777,
	"2006/UKE11": 1778,
	"2006/UKE12": 1779,
	"2006/UKE13": 1780,
	"2006/UKE21": 1781,
	"2006/UKE22": 1782,
	"2006/UKE31": 1783,
	"2006/UKE32": 1784,
	"2006/UKE41": 1785,
	"2006/UKE42": 1786,
	"2006/UKE43": 1787,
	"2006/UKF11": 1788,
	"2006/UKF12": 1789,
	"2006/UKF13": 1790,
	"2006/UKF14": 1791,
	"2006/UKF15": 1792,
	"2006/UKF16": 1793,
	"2006/UKF21": 1794,
	"2006/UKF22": 1795,
	"2006/UKF23": 1796,
	"2006/UKF30": 1797,
	"2006/UKG11": 1798,
	"2006/UKG12": 1799,
	"2006/UKG13": 1800,
	"2006/UKG21": 1801,
	"2006/UKG22": 1802,
	"2006/UKG23": 1803,
	"2006/UKG24": 1804,
	"2006/UKG31": 1805,
	"2006/UKG32": 1806,
	"2006/UKG33": 1807,
	"2006/UKG34": 1808,
	"2006/UKG35": 1809,
	"2006/UKH11": 1810,
	"2006/UKH12": 1811,
	"2006/UKH13": 1812,
	"2006/UKH14": 1813,
	"2006/UKH21": 1814,
	"2006/UKH22": 1815,
	"2006/UKH23": 1816,
	"2006/UKH31": 1817,
	"2006/UKH32": 1818,
	"2006/UKH33": 1819,
	"2006/UKI11": 1820,
	"2006/UKI12": 1821,
	"2006/UKI21": 1822,
	"2006/UKI22": 1823,
	"2006/UKI23": 1824,
	"2006/UKJ11": 1825,
	"2006/UKJ12": 1826,
	"2006/UKJ13": 1827,
	"2006/UKJ14": 1828,
	"2006/UKJ21": 1829,
	"2006/UKJ22": 1830,
	"2006/UKJ23": 1831,
	"2006/UKJ24": 1832,
	"2006/UKJ31": 1833,
	"2006/UKJ32": 1834,
	"2006/UKJ33": 1835,
	"2006/UKJ34": 1836,
	"2006/UKJ41": 1837,
	"2006/UKJ42": 1838,
	"2006/UKK11": 1839,
	"2006/UKK12": 1840,
	"2006/UKK13": 1841,
	"2006/UKK14": 1842,
	"2006/UKK15": 1843,
	"2006/UKK21": 1844,
	"2006/UKK22": 1845,
	"2006/UKK23": 1846,
	"2006/UKK30": 1847,
	"2006/UKK41": 1848,
	"2006/UKK42": 1849,
	"2006/UKK43": 1850,
	"2006/UKL11": 1851,
	"2006/UKL12": 1852,
	"2006/UKL13": 1853,
	"2006/UKL14": 1854,
	"2006/UKL15": 1855,
	"2006/UKL16": 1856,
	"2006/UKL17": 1857,
	"2006/UKL18": 1858,
	"2006/UKL21": 1859,
	"2006/UKL22": 1860,
	"2006/UKL23": 1861,
	"2006/UKL24": 1862,
	"2006/UKM21": 1864,
	"2006/UKM22": 1865,
	"2006/UKM23": 1866,
	"2006/UKM24": 1867,
	"2006/UKM25": 1868,
	"2006/UKM26": 1869,
	"2006/UKM27": 1870,
	"2006/UKM28": 1871,
	"2006/UKM31": 1872,
	"2006/UKM32": 1873,
	"2006/UKM33": 1874,
	"2006/UKM34": 1875,
	"2006/UKM35": 1876,
	"2006/UKM36": 1877,
	"2006/UKM37": 1878,
	"2006/UKM38": 1879,
	"2006/UKM50": 2012,
	"2006/UKM61": 1880,
	"2006/UKM62": 2013,
	"2006/UKM63": 1882,
	"2006/UKM64": 1883,
	"2006/UKM65": 1884,
	"2006/UKM66": 1885,
	"2006/UKN01": 1886,
	"2006/UKN02": 1887,
	"2006/UKN03": 1888,
	"2006/UKN04": 1889,
	"2006/UKN05": 1890,
	"2010/AT": 0,
	"2010/BE": 1,
	"2010/BG": 2,
	"2010/CH": 3,
	"2010/CY": 4,
	"2010/CZ": 5,
	"2010/DE": 6,
	"2010/DK": 7,
	"2010/EE": 8,
	"2010/EL": 12,
	"2010/ES": 9,
	"2010/FI": 10,
	"2010/FR": 11,
	"2010/HR": 13,
	"2010/HU": 14,
	"2010/IE": 15,
	"2010/IS": 16,
	"2010/IT": 17,
	"2010/LI": 18,
	"2010/LT": 19,
	"2010/LU": 20,
	"2010/LV": 21,
	"2010/ME": 1891,
	"2010/MK": 1892,
	"2010/MT": 22,
	"2010/NL": 23,
	"2010/NO": 24,
	"2010/PL": 25,
	"2010/PT": 26,
	"2010/RO": 27,
	"2010/SE": 28,
	"2010/SI": 29,
	"2010/SK": 30,
	"2010/TR": 31,
	"2010/UK": 32,
	"2010/AT1": 33,
	"2010/AT2": 34,
	"2010/AT3": 35,
	"2010/BE1": 36,
	"2010/BE2": 37,
	"2010/BE3": 38,
	"2010/BG3": 39,
	"2010/BG4": 40,
	"2010/CH0": 41,
	"2010/CY0": 42,
	"2010/CZ0": 43,
	"2010/DE1": 44,
	"2010/DE2": 45,
	"2010/DE3": 46,
	"2010/DE4": 47,
	"2010/DE5": 48,
	"2010/DE6": 49,
	"2010/DE7": 50,
	"2010/DE8": 51,
	"2010/DE9": 52,
	"2010/DEA": 53,
	"2010/DEB": 54,
	"2010/DEC": 55,
	"2010/DED": 56,
	"2010/DEE": 57,
	"2010/DEF": 58,
	"2010/DEG": 59,
	"2010/DK0": 60,
	"2010/EE0": 61,
	"2010/EL1": 80,
	"2010/EL2": 81,
	"2010/EL3": 82,
	"2010/EL4": 83,
	"2010/ES1": 62,
	"2010/ES2": 63,
	"2010/ES3": 64,
	"2010/ES4": 65,
	"2010/ES5": 66,
	"2010/ES6": 67,
	"2010/ES7": 68,
	"2010/FI1": 69,
	"2010/FI2": 70,
	"2010/FR1": 71,
	"2010/FR2": 72,
	"2010/FR3": 73,
	"2010/FR4": 74,
	"2010/FR5": 75,
	"2010/FR6": 76,
	"2010/FR7": 77,
	"2010/FR8": 78,
	"2010/FR9": 79,
	"2010/HR0": 84,
	"2010/HU1": 85,
	"2010/HU2": 86,
	"2010/HU3": 87,
	"2010/IE0": 88,
	"2010/IS0": 89,
	"2010/ITC": 90,
	"2010/ITF": 93,
	"2010/ITG": 94,
	"2010/ITH": 2014,
	"2010/ITI": 2015,
	"2010/LI0": 95,
	"2010/LT0": 96,
	"2010/LU0": 97,
	"2010/LV0": 98,
	"2010/ME0": 1893,
	"2010/MK0": 1894,
	"2010/MT0": 99,
	"2010/NL1": 100,
	"2010/NL2": 101,
	"2010/NL3": 102,
	"2010/NL4": 103,
	"2010/NO0": 104,
	"2010/N_A": 2016,
	"2010/PL1": 105,
	"2010/PL2": 106,
	"2010/PL3": 107,
	"2010/PL4": 108,
	"2010/PL5": 109,
	"2010/PL6": 110,
	"2010/PT1": 111,
	"2010/PT2": 112,
	"2010/PT3": 113,
	"2010/RO1": 114,
	"2010/RO2": 115,
	"2010/RO3": 116,
	"2010/RO4": 117,
	"2010/SE1": 1895,
	"2010/SE2": 1896,
	"2010/SE3": 1897,
	"2010/SI0": 119,
	"2010/SK0": 120,
	"2010/TR1": 121,
	"2010/TR2": 122,
	"2010/TR3": 123,
	"2010/TR4": 124,
	"2010/TR5": 125,
	"2010/TR6": 126,
	"2010/TR7": 127,
	"2010/TR8": 128,
	"2010/TR9": 129,
	"2010/TRA": 130,
	"2010/TRB": 131,
	"2010/TRC": 132,
	"2010/UKC": 133,
	"2010/UKD": 134,
	"2010/UKE": 135,
	"2010/UKF": 136,
	"2010/UKG": 137,
	"2010/UKH": 138,
	"2010/UKI": 139,
	"2010/UKJ": 140,
	"2010/UKK": 141,
	"2010/UKL": 142,
	"2010/UKM": 143,
	"2010/UKN": 144,
	"2010/AT11": 145,
	"2010/AT12": 146,
	"2010/AT13": 147,
	"2010/AT21": 148,
	"2010/AT22": 149,
	"2010/AT31": 150,
	"2010/AT32": 151,
	"2010/AT33": 152,
	"2010/AT34": 153,
	"2010/BE10": 154,
	"2010/BE21": 155,
	"2010/BE22": 156,
	"2010/BE23": 157,
	"2010/BE24": 158,
	"2010/BE25": 159,
	"2010/BE31": 160,
	"2010/BE32": 161,
	"2010/BE33": 162,
	"2010/BE34": 163,
	"2010/BE35": 164,
	"2010/BG31": 165,
	"2010/BG32": 166,
	"2010/BG33": 167,
	"2010/BG34": 168,
	"2010/BG41": 169,
	"2010/BG42": 170,
	"2010/CH01": 171,
	"2010/CH02": 172,
	"2010/CH03": 173,
	"2010/CH04": 174,
	"2010/CH05": 175,
	"2010/CH06": 176,
	"2010/CH07": 177,
	"2010/CY00": 178,
	"2010/CZ01": 179,
	"2010/CZ02": 180,
	"2010/CZ03": 181,
	"2010/CZ04": 182,
	"2010/CZ05": 183,
	"2010/CZ06": 184,
	"2010/CZ07": 185,
	"2010/CZ08": 186,
	"2010/DE11": 187,
	"2010/DE12": 188,
	"2010/DE13": 189,
	"2010/DE14": 190,
	"2010/DE21": 191,
	"2010/DE22": 192,
	"2010/DE23": 193,
	"2010/DE24": 194,
	"2010/DE25": 195,
	"2010/DE26": 196,
	"2010/DE27": 197,
	"2010/DE30": 198,
	"2010/DE40": 2017,
	"2010/DE50": 201,
	"2010/DE60": 202,
	"2010/DE71": 203,
	"2010/DE72": 204,
	"2010/DE73": 205,
	"2010/DE80": 206,
	"2010/DE91": 207,
	"2010/DE92": 208,
	"2010/DE93": 209,
	"2010/DE94": 210,
	"2010/DEA1": 211,
	"2010/DEA2": 212,
	"2010/DEA3": 213,
	"2010/DEA4": 214,
	"2010/DEA5": 215,
	"2010/DEB1": 216,
	"2010/DEB2": 217,
	"2010/DEB3": 218,
	"2010/DEC0": 219,
	"2010/DED2": 221,
	"2010/DED4": 2018,
	"2010/DED5": 2019,
	"2010/DEE0": 1898,
	"2010/DEF0": 226,
	"2010/DEG0": 227,
	"2010/DK01": 1899,
	"2010/DK02": 1900,
	"2010/DK03": 1901,
	"2010/DK04": 1902,
	"2010/DK05": 1903,
	"2010/EE00": 229,
	"2010/EL11": 280,
	"2010/EL12": 281,
	"2010/EL13": 282,
	"2010/EL14": 283,
	"2010/EL21": 284,
	"2010/EL22": 285,
	"2010/EL23": 286,
	"2010/EL24": 287,
	"2010/EL25": 288,
	"2010/EL30": 289,
	"2010/EL41": 290,
	"2010/EL42": 291,
	"2010/EL43": 292,
	"2010/ES11": 230,
	"2010/ES12": 231,
	"2010/ES13": 232,
	"2010/ES21": 233,
	"2010/ES22": 234,
	"2010/ES23": 235,
	"2010/ES24": 236,
	"2010/ES30": 237,
	"2010/ES41": 238,
	"2010/ES42": 239,
	"2010/ES43": 240,
	"2010/ES51": 241,
	"2010/ES52": 242,
	"2010/ES53": 243,
	"2010/ES61": 244,
	"2010/ES62": 245,
	"2010/ES63": 246,
	"2010/ES64": 247,
	"2010/ES70": 248,
	"2010/FI19": 251,
	"2010/FI1B": 2020,
	"2010/FI1C": 2021,
	"2010/FI1D": 2022,
	"2010/FI20": 253,
	"2010/FR10": 254,
	"2010/FR21": 255,
	"2010/FR22": 256,
	"2010/FR23": 257,
	"2010/FR24": 258,
	"2010/FR25": 259,
	"2010/FR26": 260,
	"2010/FR30": 261,
	"2010/FR41": 262,
	"2010/FR42": 263,
	"2010/FR43": 264,
	"2010/FR51": 265,
	"2010/FR52": 266,
	"2010/FR53": 267,
	"2010/FR61": 268,
	"2010/FR62": 269,
	"2010/FR63": 270,
	"2010/FR71": 271,
	"2010/FR72": 272,
	"2010/FR81": 273,
	"2010/FR82": 274,
	"2010/FR83": 275,
	"2010/FR91": 276,
	"2010/FR92": 277,
	"2010/FR93": 278,
	"2010/FR94": 279,
	"2010/HR03": 295,
	"2010/HR04": 2023,
	"2010/HU10": 296,
	"2010/HU21": 297,
	"2010/HU22": 298,
	"2010/HU23": 299,
	"2010/HU31": 300,
	"2010/HU32": 301,
	"2010/HU33": 302,
	"2010/IE01": 303,
	"2010/IE02": 304,
	"2010/IS00": 305,
	"2010/ITC1": 306,
	"2010/ITC2": 307,
	"2010/ITC3": 308,
	"2010/ITC4": 309,
	"2010/ITF1": 319,
	"2010/ITF2": 320,
	"2010/ITF3": 321,
	"2010/ITF4": 322,
	"2010/ITF5": 323,
	"2010/ITF6": 324,
	"2010/ITG1": 325,
	"2010/ITG2": 326,
	"2010/ITH1": 310,
	"2010/ITH2": 311,
	"2010/ITH3": 312,
	"2010/ITH4": 313,
	"2010/ITH5": 2024,
	"2010/ITI1": 315,
	"2010/ITI2": 316,
	"2010/ITI3": 2025,
	"2010/ITI4": 318,
	"2010/LI00": 327,
	"2010/LT00": 328,
	"2010/LU00": 329,
	"2010/LV00": 330,
	"2010/ME00": 1904,
	"2010/MK00": 1905,
	"2010/MT00": 331,
	"2010/NL11": 332,
	"2010/NL12": 333,
	"2010/NL13": 334,
	"2010/NL21": 335,
	"2010/NL22": 336,
	"2010/NL23": 337,
	"2010/NL31": 338,
	"2010/NL32": 339,
	"2010/NL33": 340,
	"2010/NL34": 341,
	"2010/NL41": 342,
	"2010/NL42": 343,
	"2010/NO01": 344,
	"2010/NO02": 345,
	"2010/NO03": 346,
	"2010/NO04": 347,
	"2010/NO05": 348,
	"2010/NO06": 349,
	"2010/NO07": 350,
	"2010/PL11": 351,
	"2010/PL12": 352,
	"2010/PL21": 353,
	"2010/PL22": 354,
	"2010/PL31": 355,
	"2010/PL32": 356,
	"2010/PL33": 357,
	"2010/PL34": 358,
	"2010/PL41": 359,
	"2010/PL42": 360,
	"2010/PL43": 361,
	"2010/PL51": 362,
	"2010/PL52": 363,
	"2010/PL61": 364,
	"2010/PL62": 365,
	"2010/PL63": 366,
	"2010/PT11": 367,
	"2010/PT15": 368,
	"2010/PT16": 369,
	"2010/PT17": 370,
	"2010/PT18": 371,
	"2010/PT20": 372,
	"2010/PT30": 373,
	"2010/RO11": 374,
	"2010/RO12": 375,
	"2010/RO21": 376,
	"2010/RO22": 377,
	"2010/RO31": 378,
	"2010/RO32": 379,
	"2010/RO41": 380,
	"2010/RO42": 381,
	"2010/SE11": 382,
	"2010/SE12": 383,
	"2010/SE21": 388,
	"2010/SE22": 384,
	"2010/SE23": 389,
	"2010/SE31": 385,
	"2010/SE32": 386,
	"2010/SE33": 387,
	"2010/SI01": 1906,
	"2010/SI02": 1907,
	"2010/SK01": 391,
	"2010/SK02": 392,
	"2010/SK03": 393,
	"2010/SK04": 394,
	"2010/TR10": 395,
	"2010/TR21": 396,
	"2010/TR22": 397,
	"2010/TR31": 398,
	"2010/TR32": 399,
	"2010/TR33": 400,
	"2010/TR41": 401,
	"2010/TR42": 402,
	"2010/TR51": 403,
	"2010/TR52": 404,
	"2010/TR61": 405,
	"2010/TR62": 406,
	"2010/TR63": 407,
	"2010/TR71": 408,
	"2010/TR72": 409,
	"2010/TR81": 410,
	"2010/TR82": 411,
	"2010/TR83": 412,
	"2010/TR90": 413,
	"2010/TRA1": 414,
	"2010/TRA2": 415,
	"2010/TRB1": 416,
	"2010/TRB2": 417,
	"2010/TRC1": 418,
	"2010/TRC2": 419,
	"2010/TRC3": 420,
	"2010/UKC1": 421,
	"2010/UKC2": 422,
	"2010/UKD1": 423,
	"2010/UKD3": 425,
	"2010/UKD4": 426,
	"2010/UKD6": 2026,
	"2010/UKD7": 2027,
	"2010/UKE1": 428,
	"2010/UKE2": 429,
	"2010/UKE3": 430,
	"2010/UKE4": 431,
	"2010/UKF1": 432,
	"2010/UKF2": 433,
	"2010/UKF3": 434,
	"2010/UKG1": 435,
	"2010/UKG2": 436,
	"2010/UKG3": 437,
	"2010/UKH1": 438,
	"2010/UKH2": 439,
	"2010/UKH3": 440,
	"2010/UKI1": 441,
	"2010/UKI2": 442,
	"2010/UKJ1": 443,
	"2010/UKJ2": 444,
	"2010/UKJ3": 445,
	"2010/UKJ4": 446,
	"2010/UKK1": 447,
	"2010/UKK2": 448,
	"2010/UKK3": 449,
	"2010/UKK4": 450,
	"2010/UKL1": 451,
	"2010/UKL2": 452,
	"2010/UKM2": 454,
	"2010/UKM3": 455,
	"2010/UKM5": 1908,
	"2010/UKM6": 1909,
	"2010/UKN0": 457,
	"2010/AT111": 458,
	"2010/AT112": 459,
	"2010/AT113": 460,
	"2010/AT121": 461,
	"2010/AT122": 462,
	"2010/AT123": 463,
	"2010/AT124": 464,
	"2010/AT125": 465,
	"2010/AT126": 466,
	"2010/AT127": 467,
	"2010/AT130": 468,
	"2010/AT211": 469,
	"2010/AT212": 470,
	"2010/AT213": 471,
	"2010/AT221": 472,
	"2010/AT222": 473,
	"2010/AT223": 474,
	"2010/AT224": 475,
	"2010/AT225": 476,
	"2010/AT226": 477,
	"2010/AT311": 478,
	"2010/AT312": 479,
	"2010/AT313": 480,
	"2010/AT314": 481,
	"2010/AT315": 482,
	"2010/AT321": 483,
	"2010/AT322": 484,
	"2010/AT323": 485,
	"2010/AT331": 486,
	"2010/AT332": 487,
	"2010/AT333": 488,
	"2010/AT334": 489,
	"2010/AT335": 490,
	"2010/AT341": 491,
	"2010/AT342": 492,
	"2010/BE100": 493,
	"2010/BE211": 494,
	"2010/BE212": 495,
	"2010/BE213": 496,
	"2010/BE221": 497,
	"2010/BE222": 498,
	"2010/BE223": 499,
	"2010/BE231": 500,
	"2010/BE232": 501,
	"2010/BE233": 502,
	"2010/BE234": 503,
	"2010/BE235": 504,
	"2010/BE236": 505,
	"2010/BE241": 506,
	"2010/BE242": 507,
	"2010/BE251": 508,
	"2010/BE252": 509,
	"2010/BE253": 510,
	"2010/BE254": 511,
	"2010/BE255": 512,
	"2010/BE256": 513,
	"2010/BE257": 514,
	"2010/BE258": 515,
	"2010/BE310": 516,
	"2010/BE321": 517,
	"2010/BE322": 518,
	"2010/BE323": 519,
	"2010/BE324": 520,
	"2010/BE325": 521,
	"2010/BE326": 522,
	"2010/BE327": 523,
	"2010/BE331": 524,
	"2010/BE332": 525,
	"2010/BE334": 527,
	"2010/BE335": 1910,
	"2010/BE336": 1911,
	"2010/BE341": 528,
	"2010/BE342": 529,
	"2010/BE343": 530,
	"2010/BE344": 531,
	"2010/BE345": 532,
	"2010/BE351": 533,
	"2010/BE352": 534,
	"2010/BE353": 535,
	"2010/BG311": 536,
	"2010/BG312": 537,
	"2010/BG313": 538,
	"2010/BG314": 539,
	"2010/BG315": 540,
	"2010/BG321": 541,
	"2010/BG322": 542,
	"2010/BG323": 543,
	"2010/BG324": 544,
	"2010/BG325": 545,
	"2010/BG331": 546,
	"2010/BG332": 547,
	"2010/BG333": 548,
	"2010/BG334": 549,
	"2010/BG341": 550,
	"2010/BG342": 551,
	"2010/BG343": 552,
	"2010/BG344": 553,
	"2010/BG411": 554,
	"2010/BG412": 555,
	"2010/BG413": 556,
	"2010/BG414": 557,
	"2010/BG415": 558,
	"2010/BG421": 559,
	"2010/BG422": 560,
	"2010/BG423": 561,
	"2010/BG424": 562,
	"2010/BG425": 563,
	"2010/CH011": 564,
	"2010/CH012": 565,
	"2010/CH013": 566,
	"2010/CH021": 567,
	"2010/CH022": 568,
	"2010/CH023": 569,
	"2010/CH024": 570,
	"2010/CH025": 571,
	"2010/CH031": 572,
	"2010/CH032": 573,
	"2010/CH033": 574,
	"2010/CH040": 575,
	"2010/CH051": 576,
	"2010/CH052": 577,
	"2010/CH053": 578,
	"2010/CH054": 579,
	"2010/CH055": 580,
	"2010/CH056": 581,
	"2010/CH057": 582,
	"2010/CH061": 583,
	"2010/CH062": 584,
	"2010/CH063": 585,
	"2010/CH064": 586,
	"2010/CH065": 587,
	"2010/CH066": 588,
	"2010/CH070": 589,
	"2010/CY000": 590,
	"2010/CZ010": 591,
	"2010/CZ020": 592,
	"2010/CZ031": 593,
	"2010/CZ032": 594,
	"2010/CZ041": 595,
	"2010/CZ042": 596,
	"2010/CZ051": 597,
	"2010/CZ052": 598,
	"2010/CZ053": 599,
	"2010/CZ063": 1912,
	"2010/CZ064": 1913,
	"2010/CZ071": 602,
	"2010/CZ072": 603,
	"2010/CZ080": 604,
	"2010/DE111": 605,
	"2010/DE112": 606,
	"2010/DE113": 607,
	"2010/DE114": 608,
	"2010/DE115": 609,
	"2010/DE116": 610,
	"2010/DE117": 611,
	"2010/DE118": 612,
	"2010/DE119": 613,
	"2010/DE11A": 614,
	"2010/DE11B": 615,
	"2010/DE11C": 616,
	"2010/DE11D": 617,
	"2010/DE121": 618,
	"2010/DE122": 619,
	"2010/DE123": 620,
	"2010/DE124": 621,
	"2010/DE125": 622,
	"2010/DE126": 623,
	"2010/DE127": 624,
	"2010/DE128": 625,
	"2010/DE129": 626,
	"2010/DE12A": 627,
	"2010/DE12B": 628,
	"2010/DE12C": 629,
	"2010/DE131": 630,
	"2010/DE132": 631,
	"2010/DE133": 632,
	"2010/DE134": 633,
	"2010/DE135": 634,
	"2010/DE136": 635,
	"2010/DE137": 636,
	"2010/DE138": 637,
	"2010/DE139": 638,
	"2010/DE13A": 639,
	"2010/DE141": 640,
	"2010/DE142": 641,
	"2010/DE143": 642,
	"2010/DE144": 643,
	"2010/DE145": 644,
	"2010/DE146": 645,
	"2010/DE147": 646,
	"2010/DE148": 647,
	"2010/DE149": 648,
	"2010/DE211": 649,
	"2010/DE212": 650,
	"2010/DE213": 651,
	"2010/DE214": 652,
	"2010/DE215": 653,
	"2010/DE216": 654,
	"2010/DE217": 655,
	"2010/DE218": 656,
	"2010/DE219": 657,
	"2010/DE21A": 658,
	"2010/DE21B": 659,
	"2010/DE21C": 660,
	"2010/DE21D": 661,
	"2010/DE21E": 662,
	"2010/DE21F": 663,
	"2010/DE21G": 664,
	"2010/DE21H": 665,
	"2010/DE21I": 666,
	"2010/DE21J": 667,
	"2010/DE21K": 668,
	"2010/DE21L": 669,
	"2010/DE21M": 670,
	"2010/DE21N": 671,
	"2010/DE221": 672,
	"2010/DE222": 673,
	"2010/DE223": 674,
	"2010/DE224": 675,
	"2010/DE225": 676,
	"2010/DE226": 677,
	"2010/DE227": 678,
	"2010/DE228": 679,
	"2010/DE229": 680,
	"2010/DE22A": 681,
	"2010/DE22B": 682,
	"2010/DE22C": 683,
	"2010/DE231": 684,
	"2010/DE232": 685,
	"2010/DE233": 686,
	"2010/DE234": 687,
	"2010/DE235": 688,
	"2010/DE236": 689,
	"2010/DE237": 690,
	"2010/DE238": 691,
	"2010/DE239": 692,
	"2010/DE23A": 693,
	"2010/DE241": 694,
	"2010/DE242": 695,
	"2010/DE243": 696,
	"2010/DE244": 697,
	"2010/DE245": 698,
	"2010/DE246": 699,
	"2010/DE247": 700,
	"2010/DE248": 701,
	"2010/DE249": 702,
	"2010/DE24A": 703,
	"2010/DE24B": 704,
	"2010/DE24C": 705,
	"2010/DE24D": 706,
	"2010/DE251": 707,
	"2010/DE252": 708,
	"2010/DE253": 709,
	"2010/DE254": 710,
	"2010/DE255": 711,
	"2010/DE256": 712,
	"2010/DE257": 713,
	"2010/DE258": 714,
	"2010/DE259": 715,
	"2010/DE25A": 716,
	"2010/DE25B": 717,
	"2010/DE25C": 718,
	"2010/DE261": 719,
	"2010/DE262": 720,
	"2010/DE263": 721,
	"2010/DE264": 722,
	"2010/DE265": 723,
	"2010/DE266": 724,
	"2010/DE267": 725,
	"2010/DE268": 726,
	"2010/DE269": 727,
	"2010/DE26A": 728,
	"2010/DE26B": 729,
	"2010/DE26C": 730,
	"2010/DE271": 731,
	"2010/DE272": 732,
	"2010/DE273": 733,
	"2010/DE274": 734,
	"2010/DE275": 735,
	"2010/DE276": 736,
	"2010/DE277": 737,
	"2010/DE278": 738,
	"2010/DE279": 739,
	"2010/DE27A": 740,
	"2010/DE27B": 741,
	"2010/DE27C": 742,
	"2010/DE27D": 743,
	"2010/DE27E": 744,
	"2010/DE300": 745,
	"2010/DE401": 754,
	"2010/DE402": 755,
	"2010/DE403": 746,
	"2010/DE404": 756,
	"2010/DE405": 747,
	"2010/DE406": 757,
	"2010/DE407": 758,
	"2010/DE408": 759,
	"2010/DE409": 748,
	"2010/DE40A": 749,
	"2010/DE40B": 760,
	"2010/DE40C": 750,
	"2010/DE40D": 751,
	"2010/DE40E": 761,
	"2010/DE40F": 752,
	"2010/DE40G": 762,
	"2010/DE40H": 763,
	"2010/DE40I": 753,
	"2010/DE501": 764,
	"2010/DE502": 765,
	"2010/DE600": 766,
	"2010/DE711": 767,
	"2010/DE712": 768,
	"2010/DE713": 769,
	"2010/DE714": 770,
	"2010/DE715": 771,
	"2010/DE716": 772,
	"2010/DE717": 773,
	"2010/DE718": 774,
	"2010/DE719": 775,
	"2010/DE71A": 776,
	"2010/DE71B": 777,
	"2010/DE71C": 778,
	"2010/DE71D": 779,
	"2010/DE71E": 780,
	"2010/DE721": 781,
	"2010/DE722": 782,
	"2010/DE723": 783,
	"2010/DE724": 784,
	"2010/DE725": 785,
	"2010/DE731": 786,
	"2010/DE732": 787,
	"2010/DE733": 788,
	"2010/DE734": 789,
	"2010/DE735": 790,
	"2010/DE736": 791,
	"2010/DE737": 792,
	"2010/DE801": 793,
	"2010/DE802": 794,
	"2010/DE803": 795,
	"2010/DE804": 796,
	"2010/DE805": 797,
	"2010/DE806": 798,
	"2010/DE807": 799,
	"2010/DE808": 800,
	"2010/DE809": 801,
	"2010/DE80A": 802,
	"2010/DE80B": 803,
	"2010/DE80C": 804,
	"2010/DE80D": 805,
	"2010/DE80E": 806,
	"2010/DE80F": 807,
	"2010/DE80G": 808,
	"2010/DE80H": 809,
	"2010/DE80I": 810,
	"2010/DE911": 811,
	"2010/DE912": 812,
	"2010/DE913": 813,
	"2010/DE914": 814,
	"2010/DE915": 815,
	"2010/DE916": 816,
	"2010/DE917": 817,
	"2010/DE918": 818,
	"2010/DE919": 819,
	"2010/DE91A": 820,
	"2010/DE91B": 821,
	"2010/DE922": 822,
	"2010/DE923": 823,
	"2010/DE925": 824,
	"2010/DE926": 825,
	"2010/DE927": 826,
	"2010/DE928": 827,
	"2010/DE929": 828,
	"2010/DE931": 829,
	"2010/DE932": 830,
	"2010/DE933": 831,
	"2010/DE934": 832,
	"2010/DE935": 833,
	"2010/DE936": 834,
	"2010/DE937": 835,
	"2010/DE938": 836,
	"2010/DE939": 837,
	"2010/DE93A": 838,
	"2010/DE93B": 839,
	"2010/DE941": 840,
	"2010/DE942": 841,
	"2010/DE943": 842,
	"2010/DE944": 843,
	"2010/DE945": 844,
	"2010/DE946": 845,
	"2010/DE947": 846,
	"2010/DE948": 847,
	"2010/DE949": 848,
	"2010/DE94A": 849,
	"2010/DE94B": 850,
	"2010/DE94C": 851,
	"2010/DE94D": 852,
	"2010/DE94E": 853,
	"2010/DE94F": 854,
	"2010/DE94G": 855,
	"2010/DE94H": 856,
	"2010/DEA11": 857,
	"2010/DEA12": 858,
	"2010/DEA13": 859,
	"2010/DEA14": 860,
	"2010/DEA15": 861,
	"2010/DEA16": 862,
	"2010/DEA17": 863,
	"2010/DEA18": 864,
	"2010/DEA19": 865,
	"2010/DEA1A": 866,
	"2010/DEA1B": 867,
	"2010/DEA1C": 868,
	"2010/DEA1D": 869,
	"2010/DEA1E": 870,
	"2010/DEA1F": 871,
	"2010/DEA22": 873,
	"2010/DEA23": 874,
	"2010/DEA24": 875,
	"2010/DEA26": 877,
	"2010/DEA27": 878,
	"2010/DEA28": 879,
	"2010/DEA29": 880,
	"2010/DEA2A": 881,
	"2010/DEA2B": 882,
	"2010/DEA2C": 883,
	"2010/DEA2D": 2028,
	"2010/DEA31": 884,
	"2010/DEA32": 885,
	"2010/DEA33": 886,
	"2010/DEA34": 887,
	"2010/DEA35": 888,
	"2010/DEA36": 889,
	"2010/DEA37": 890,
	"2010/DEA38": 891,
	"2010/DEA41": 892,
	"2010/DEA42": 893,
	"2010/DEA43": 894,
	"2010/DEA44": 895,
	"2010/DEA45": 896,
	"2010/DEA46": 897,
	"2010/DEA47": 898,
	"2010/DEA51": 899,
	"2010/DEA52": 900,
	"2010/DEA53": 901,
	"2010/DEA54": 902,
	"2010/DEA55": 903,
	"2010/DEA56": 904,
	"2010/DEA57": 905,
	"2010/DEA58": 906,
	"2010/DEA59": 907,
	"2010/DEA5A": 908,
	"2010/DEA5B": 909,
	"2010/DEA5C": 910,
	"2010/DEB11": 911,
	"2010/DEB12": 912,
	"2010/DEB13": 913,
	"2010/DEB14": 914,
	"2010/DEB15": 915,
	"2010/DEB16": 916,
	"2010/DEB17": 917,
	"2010/DEB18": 918,
	"2010/DEB19": 919,
	"2010/DEB1A": 920,
	"2010/DEB1B": 921,
	"2010/DEB21": 922,
	"2010/DEB22": 923,
	"2010/DEB23": 924,
	"2010/DEB24": 925,
	"2010/DEB25": 926,
	"2010/DEB31": 927,
	"2010/DEB32": 928,
	"2010/DEB33": 929,
	"2010/DEB34": 930,
	"2010/DEB35": 931,
	"2010/DEB36": 932,
	"2010/DEB37": 933,
	"2010/DEB38": 934,
	"2010/DEB39": 935,
	"2010/DEB3A": 936,
	"2010/DEB3B": 937,
	"2010/DEB3C": 938,
	"2010/DEB3D": 939,
	"2010/DEB3E": 940,
	"2010/DEB3F": 941,
	"2010/DEB3G": 942,
	"2010/DEB3H": 943,
	"2010/DEB3I": 944,
	"2010/DEB3J": 945,
	"2010/DEB3K": 946,
	"2010/DEC01": 947,
	"2010/DEC02": 948,
	"2010/DEC03": 949,
	"2010/DEC04": 950,
	"2010/DEC05": 951,
	"2010/DEC06": 952,
	"2010/DED21": 965,
	"2010/DED2C": 2029,
	"2010/DED2D": 2030,
	"2010/DED2E": 2031,
	"2010/DED2F": 2032,
	"2010/DED41": 953,
	"2010/DED42": 2033,
	"2010/DED43": 2034,
	"2010/DED44": 2035,
	"2010/DED45": 2036,
	"2010/DED51": 976,
	"2010/DED52": 2037,
	"2010/DED53": 2038,
	"2010/DEE01": 1914,
	"2010/DEE02": 988,
	"2010/DEE03": 995,
	"2010/DEE04": 1005,
	"2010/DEE05": 1915,
	"2010/DEE06": 1916,
	"2010/DEE07": 1917,
	"2010/DEE08": 1918,
	"2010/DEE09": 1919,
	"2010/DEE0A": 1920,
	"2010/DEE0B": 1921,
	"2010/DEE0C": 1922,
	"2010/DEE0D": 1001,
	"2010/DEE0E": 1923,
	"2010/DEF01": 1006,
	"2010/DEF02": 1007,
	"2010/DEF03": 1008,
	"2010/DEF04": 1009,
	"2010/DEF05": 1010,
	"2010/DEF06": 1011,
	"2010/DEF07": 1012,
	"2010/DEF08": 1013,
	"2010/DEF09": 1014,
	"2010/DEF0A": 1015,
	"2010/DEF0B": 1016,
	"2010/DEF0C": 1017,
	"2010/DEF0D": 1018,
	"2010/DEF0E": 1019,
	"2010/DEF0F": 1020,
	"2010/DEG01": 1021,
	"2010/DEG02": 1022,
	"2010/DEG03": 1023,
	"2010/DEG04": 1024,
	"2010/DEG05": 1025,
	"2010/DEG06": 1026,
	"2010/DEG07": 1027,
	"2010/DEG09": 1028,
	"2010/DEG0A": 1029,
	"2010/DEG0B": 1030,
	"2010/DEG0C": 1031,
	"2010/DEG0D": 1032,
	"2010/DEG0E": 1033,
	"2010/DEG0F": 1034,
	"2010/DEG0G": 1035,
	"2010/DEG0H": 1036,
	"2010/DEG0I": 1037,
	"2010/DEG0J": 1038,
	"2010/DEG0K": 1039,
	"2010/DEG0L": 1040,
	"2010/DEG0M": 1041,
	"2010/DEG0N": 1042,
	"2010/DEG0P": 1043,
	"2010/DK011": 1924,
	"2010/DK012": 1925,
	"2010/DK013": 1926,
	"2010/DK014": 1050,
	"2010/DK021": 1927,
	"2010/DK022": 1928,
	"2010/DK031": 1051,
	"2010/DK032": 1929,
	"2010/DK041": 1930,
	"2010/DK042": 1931,
	"2010/DK050": 1932,
	"2010/EE001": 1059,
	"2010/EE004": 1060,
	"2010/EE006": 1061,
	"2010/EE007": 1062,
	"2010/EE008": 1063,
	"2010/EL111": 1236,
	"2010/EL112": 1237,
	"2010/EL113": 1238,
	"2010/EL114": 1239,
	"2010/EL115": 1240,
	"2010/EL121": 1241,
	"2010/EL122": 1242,
	"2010/EL123": 1243,
	"2010/EL124": 1244,
	"2010/EL125": 1245,
	"2010/EL126": 1246,
	"2010/EL127": 1247,
	"2010/EL131": 1248,
	"2010/EL132": 1249,
	"2010/EL133": 1250,
	"2010/EL134": 1251,
	"2010/EL141": 1252,
	"2010/EL142": 1253,
	"2010/EL143": 1254,
	"2010/EL144": 1255,
	"2010/EL211": 1256,
	"2010/EL212": 1257,
	"2010/EL213": 1258,
	"2010/EL214": 1259,
	"2010/EL221": 1260,
	"2010/EL222": 1261,
	"2010/EL223": 1262,
	"2010/EL224": 1263,
	"2010/EL231": 1264,
	"2010/EL232": 1265,
	"2010/EL233": 1266,
	"2010/EL241": 1267,
	"2010/EL242": 1268,
	"2010/EL243": 1269,
	"2010/EL244": 1270,
	"2010/EL245": 1271,
	"2010/EL251": 1272,
	"2010/EL252": 1273,
	"2010/EL253": 1274,
	"2010/EL254": 1275,
	"2010/EL255": 1276,
	"2010/EL300": 1277,
	"2010/EL411": 1278,
	"2010/EL412": 1279,
	"2010/EL413": 1280,
	"2010/EL421": 1281,
	"2010/EL422": 1282,
	"2010/EL431": 1283,
	"2010/EL432": 1284,
	"2010/EL433": 1285,
	"2010/EL434": 1286,
	"2010/ES111": 1064,
	"2010/ES112": 1065,
	"2010/ES113": 1066,
	"2010/ES114": 1067,
	"2010/ES120": 1068,
	"2010/ES130": 1069,
	"2010/ES211": 1070,
	"2010/ES212": 1071,
	"2010/ES213": 1072,
	"2010/ES220": 1073,
	"2010/ES230": 1074,
	"2010/ES241": 1075,
	"2010/ES242": 1076,
	"2010/ES243": 1077,
	"2010/ES300": 1078,
	"2010/ES411": 1079,
	"2010/ES412": 1080,
	"2010/ES413": 1081,
	"2010/ES414": 1082,
	"2010/ES415": 1083,
	"2010/ES416": 1084,
	"2010/ES417": 1085,
	"2010/ES418": 1086,
	"2010/ES419": 1087,
	"2010/ES421": 1088,
	"2010/ES422": 1089,
	"2010/ES423": 1090,
	"2010/ES424": 1091,
	"2010/ES425": 1092,
	"2010/ES431": 1093,
	"2010/ES432": 1094,
	"2010/ES511": 1095,
	"2010/ES512": 1096,
	"2010/ES513": 1097,
	"2010/ES514": 1098,
	"2010/ES521": 1099,
	"2010/ES522": 1100,
	"2010/ES523": 1101,
	"2010/ES531": 1933,
	"2010/ES532": 1934,
	"2010/ES533": 1935,
	"2010/ES611": 1103,
	"2010/ES612": 1104,
	"2010/ES613": 1105,
	"2010/ES614": 1106,
	"2010/ES615": 1107,
	"2010/ES616": 1108,
	"2010/ES617": 1109,
	"2010/ES618": 1110,
	"2010/ES620": 1111,
	"2010/ES630": 1112,
	"2010/ES640": 1113,
	"2010/ES703": 1936,
	"2010/ES704": 1937,
	"2010/ES705": 1938,
	"2010/ES706": 1939,
	"2010/ES707": 1940,
	"2010/ES708": 1941,
	"2010/ES709": 1942,
	"2010/FI193": 1129,
	"2010/FI194": 1130,
	"2010/FI195": 1131,
	"2010/FI196": 1943,
	"2010/FI197": 1944,
	"2010/FI1B1": 2039,
	"2010/FI1C1": 1122,
	"2010/FI1C2": 1123,
	"2010/FI1C3": 1124,
	"2010/FI1C4": 1125,
	"2010/FI1C5": 1126,
	"2010/FI1D1": 1116,
	"2010/FI1D2": 1117,
	"2010/FI1D3": 1118,
	"2010/FI1D4": 1119,
	"2010/FI1D5": 1132,
	"2010/FI1D6": 1133,
	"2010/FI1D7": 1134,
	"2010/FI200": 1135,
	"2010/FR101": 1136,
	"2010/FR102": 1137,
	"2010/FR103": 1138,
	"2010/FR104": 1139,
	"2010/FR105": 1140,
	"2010/FR106": 1141,
	"2010/FR107": 1142,
	"2010/FR108": 1143,
	"2010/FR211": 1144,
	"2010/FR212": 1145,
	"2010/FR213": 1146,
	"2010/FR214": 1147,
	"2010/FR221": 1148,
	"2010/FR222": 1149,
	"2010/FR223": 1150,
	"2010/FR231": 1151,
	"2010/FR232": 1152,
	"2010/FR241": 1153,
	"2010/FR242": 1154,
	"2010/FR243": 1155,
	"2010/FR244": 1156,
	"2010/FR245": 1157,
	"2010/FR246": 1158,
	"2010/FR251": 1159,
	"2010/FR252": 1160,
	"2010/FR253": 1161,
	"2010/FR261": 1162,
	"2010/FR262": 1163,
	"2010/FR263": 1164,
	"2010/FR264": 1165,
	"2010/FR301": 1166,
	"2010/FR302": 1167,
	"2010/FR411": 1168,
	"2010/FR412": 1169,
	"2010/FR413": 1170,
	"2010/FR414": 1171,
	"2010/FR421": 1172,
	"2010/FR422": 1173,
	"2010/FR431": 1174,
	"2010/FR432": 1175,
	"2010/FR433": 1176,
	"2010/FR434": 1177,
	"2010/FR511": 1178,
	"2010/FR512": 1179,
	"2010/FR513": 1180,
	"2010/FR514": 1181,
	"2010/FR515": 1182,
	"2010/FR521": 1183,
	"2010/FR522": 1184,
	"2010/FR523": 1185,
	"2010/FR524": 1186,
	"2010/FR531": 1187,
	"2010/FR532": 1188,
	"2010/FR533": 1189,
	"2010/FR534": 1190,
	"2010/FR611": 1191,
	"2010/FR612": 1192,
	"2010/FR613": 1193,
	"2010/FR614": 1194,
	"2010/FR615": 1195,
	"2010/FR621": 1196,
	"2010/FR622": 1197,
	"2010/FR623": 1198,
	"2010/FR624": 1199,
	"2010/FR625": 1200,
	"2010/FR626": 1201,
	"2010/FR627": 1202,
	"2010/FR628": 1203,
	"2010/FR631": 1204,
	"2010/FR632": 1205,
	"2010/FR633": 1206,
	"2010/FR711": 1207,
	"2010/FR712": 1208,
	"2010/FR713": 1209,
	"2010/FR714": 1210,
	"2010/FR715": 1211,
	"2010/FR716": 1212,
	"2010/FR717": 1213,
	"2010/FR718": 1214,
	"2010/FR721": 1215,
	"2010/FR722": 1216,
	"2010/FR723": 1217,
	"2010/FR724": 1218,
	"2010/FR811": 1219,
	"2010/FR812": 1220,
	"2010/FR813": 1221,
	"2010/FR814": 1222,
	"2010/FR815": 1223,
	"2010/FR821": 1224,
	"2010/FR822": 1225,
	"2010/FR823": 1226,
	"2010/FR824": 1227,
	"2010/FR825": 1228,
	"2010/FR826": 1229,
	"2010/FR831": 1230,
	"2010/FR832": 1231,
	"2010/FR910": 1232,
	"2010/FR920": 1233,
	"2010/FR930": 1234,
	"2010/FR940": 1235,
	"2010/HR031": 1301,
	"2010/HR032": 1302,
	"2010/HR033": 1303,
	"2010/HR034": 1304,
	"2010/HR035": 1305,
	"2010/HR036": 1306,
	"2010/HR037": 1307,
	"2010/HR041": 2040,
	"2010/HR042": 2041,
	"2010/HR043": 2042,
	"2010/HR044": 2043,
	"2010/HR045": 2044,
	"2010/HR046": 2045,
	"2010/HR047": 2046,
	"2010/HR048": 2047,
	"2010/HR049": 2048,
	"2010/HR04A": 2049,
	"2010/HR04B": 2050,
	"2010/HR04C": 2051,
	"2010/HR04D": 2052,
	"2010/HR04E": 2053,
	"2010/HU101": 1308,
	"2010/HU102": 1309,
	"2010/HU211": 1310,
	"2010/HU212": 1311,
	"2010/HU213": 1312,
	"2010/HU221": 1313,
	"2010/HU222": 1314,
	"2010/HU223": 1315,
	"2010/HU231": 1316,
	"2010/HU232": 1317,
	"2010/HU233": 1318,
	"2010/HU311": 1319,
	"2010/HU312": 1320,
	"2010/HU313": 1321,
	"2010/HU321": 1322,
	"2010/HU322": 1323,
	"2010/HU323": 1324,
	"2010/HU331": 1325,
	"2010/HU332": 1326,
	"2010/HU333": 1327,
	"2010/IE011": 1328,
	"2010/IE012": 1329,
	"2010/IE013": 1330,
	"2010/IE021": 1331,
	"2010/IE022": 1332,
	"2010/IE023": 1333,
	"2010/IE024": 1334,
	"2010/IE025": 1335,
	"2010/IS001": 1945,
	"2010/IS002": 1946,
	"2010/ITC11": 1337,
	"2010/ITC12": 1338,
	"2010/ITC13": 1339,
	"2010/ITC14": 1340,
	"2010/ITC15": 1341,
	"2010/ITC16": 1342,
	"2010/ITC17": 1343,
	"2010/ITC18": 1344,
	"2010/ITC20": 1345,
	"2010/ITC31": 1346,
	"2010/ITC32": 1347,
	"2010/ITC33": 1348,
	"2010/ITC34": 1349,
	"2010/ITC41": 1350,
	"2010/ITC42": 1351,
	"2010/ITC43": 1352,
	"2010/ITC44": 1353,
	"2010/ITC46": 1355,
	"2010/ITC47": 1356,
	"2010/ITC48": 1357,
	"2010/ITC49": 1358,
	"2010/ITC4A": 1359,
	"2010/ITC4B": 1360,
	"2010/ITC4C": 2054,
	"2010/ITC4D": 2055,
	"2010/ITF11": 1404,
	"2010/ITF12": 1405,
	"2010/ITF13": 1406,
	"2010/ITF14": 1407,
	"2010/ITF21": 1408,
	"2010/ITF22": 1409,
	"2010/ITF31": 1410,
	"2010/ITF32": 1411,
	"2010/ITF33": 1412,
	"2010/ITF34": 1413,
	"2010/ITF35": 1414,
	"2010/ITF43": 1417,
	"2010/ITF44": 1418,
	"2010/ITF45": 1419,
	"2010/ITF46": 2056,
	"2010/ITF47": 2057,
	"2010/ITF48": 2058,
	"2010/ITF51": 1420,
	"2010/ITF52": 1421,
	"2010/ITF61": 1422,
	"2010/ITF62": 1423,
	"2010/ITF63": 1424,
	"2010/ITF64": 1425,
	"2010/ITF65": 1426,
	"2010/ITG11": 1427,
	"2010/ITG12": 1428,
	"2010/ITG13": 1429,
	"2010/ITG14": 1430,
	"2010/ITG15": 1431,
	"2010/ITG16": 1432,
	"2010/ITG17": 1433,
	"2010/ITG18": 1434,
	"2010/ITG19": 1435,
	"2010/ITG25": 1947,
	"2010/ITG26": 1948,
	"2010/ITG27": 1949,
	"2010/ITG28": 1950,
	"2010/ITG29": 1951,
	"2010/ITG2A": 1952,
	"2010/ITG2B": 1953,
	"2010/ITG2C": 1954,
	"2010/ITH10": 1361,
	"2010/ITH20": 1362,
	"2010/ITH31": 1363,
	"2010/ITH32": 1364,
	"2010/ITH33": 1365,
	"2010/ITH34": 1366,
	"2010/ITH35": 1367,
	"2010/ITH36": 1368,
	"2010/ITH37": 1369,
	"2010/ITH41": 1370,
	"2010/ITH42": 1371,
	"2010/ITH43": 1372,
	"2010/ITH44": 1373,
	"2010/ITH51": 1374,
	"2010/ITH52": 1375,
	"2010/ITH53": 1376,
	"2010/ITH54": 1377,
	"2010/ITH55": 1378,
	"2010/ITH56": 1379,
	"2010/ITH57": 1380,
	"2010/ITH58": 1381,
	"2010/ITH59": 2059,
	"2010/ITI11": 1383,
	"2010/ITI12": 1384,
	"2010/ITI13": 1385,
	"2010/ITI14": 1386,
	"2010/ITI15": 1387,
	"2010/ITI16": 1388,
	"2010/ITI17": 1389,
	"2010/ITI18": 1390,
	"2010/ITI19": 1391,
	"2010/ITI1A": 1392,
	"2010/ITI21": 1393,
	"2010/ITI22": 1394,
	"2010/ITI31": 2060,
	"2010/ITI32": 1396,
	"2010/ITI33": 1397,
	"2010/ITI34": 2061,
	"2010/ITI35": 2062,
	"2010/ITI41": 1399,
	"2010/ITI42": 1400,
	"2010/ITI43": 1401,
	"2010/ITI44": 1402,
	"2010/ITI45": 1403,
	"2010/LI000": 1440,
	"2010/LT001": 1441,
	"2010/LT002": 1442,
	"2010/LT003": 1443,
	"2010/LT004": 1444,
	"2010/LT005": 1445,
	"2010/LT006": 1446,
	"2010/LT007": 1447,
	"2010/LT008": 1448,
	"2010/LT009": 1449,
	"2010/LT00A": 1450,
	"2010/LU000": 1451,
	"2010/LV003": 1452,
	"2010/LV005": 1453,
	"2010/LV006": 1454,
	"2010/LV007": 1455,
	"2010/LV008": 1456,
	"2010/LV009": 1457,
	"2010/ME000": 1955,
	"2010/MK001": 1956,
	"2010/MK002": 1957,
	"2010/MK003": 1958,
	"2010/MK004": 1959,
	"2010/MK005": 1960,
	"2010/MK006": 1961,
	"2010/MK007": 1962,
	"2010/MK008": 1963,
	"2010/MT001": 1458,
	"2010/MT002": 1459,
	"2010/NL111": 1460,
	"2010/NL112": 1461,
	"2010/NL113": 1462,
	"2010/NL121": 1463,
	"2010/NL122": 1464,
	"2010/NL123": 1465,
	"2010/NL131": 1466,
	"2010/NL132": 1467,
	"2010/NL133": 1468,
	"2010/NL211": 1469,
	"2010/NL212": 1470,
	"2010/NL213": 1471,
	"2010/NL221": 1472,
	"2010/NL224": 1475,
	"2010/NL225": 1964,
	"2010/NL226": 1965,
	"2010/NL230": 1476,
	"2010/NL310": 1477,
	"2010/NL321": 1478,
	"2010/NL322": 1479,
	"2010/NL323": 1480,
	"2010/NL324": 1481,
	"2010/NL325": 1482,
	"2010/NL326": 1483,
	"2010/NL327": 1484,
	"2010/NL332": 1486,
	"2010/NL333": 1487,
	"2010/NL337": 2063,
	"2010/NL338": 2064,
	"2010/NL339": 2065,
	"2010/NL33A": 2066,
	"2010/NL341": 1491,
	"2010/NL342": 1492,
	"2010/NL411": 1493,
	"2010/NL412": 1494,
	"2010/NL413": 1495,
	"2010/NL414": 1496,
	"2010/NL421": 1497,
	"2010/NL422": 1498,
	"2010/NL423": 1499,
	"2010/NO011": 1500,
	"2010/NO012": 1501,
	"2010/NO021": 1502,
	"2010/NO022": 1503,
	"2010/NO031": 1504,
	"2010/NO032": 1505,
	"2010/NO033": 1506,
	"2010/NO034": 1507,
	"2010/NO041": 1508,
	"2010/NO042": 1509,
	"2010/NO043": 1510,
	"2010/NO051": 1511,
	"2010/NO052": 1512,
	"2010/NO053": 1513,
	"2010/NO061": 1514,
	"2010/NO062": 1515,
	"2010/NO071": 1516,
	"2010/NO072": 1517,
	"2010/NO073": 1518,
	"2010/PL113": 1521,
	"2010/PL114": 1966,
	"2010/PL115": 1967,
	"2010/PL116": 1968,
	"2010/PL117": 1969,
	"2010/PL121": 1522,
	"2010/PL122": 1523,
	"2010/PL127": 1526,
	"2010/PL128": 1970,
	"2010/PL129": 1971,
	"2010/PL12A": 1972,
	"2010/PL213": 1529,
	"2010/PL214": 1973,
	"2010/PL215": 1974,
	"2010/PL216": 1975,
	"2010/PL217": 1976,
	"2010/PL224": 1530,
	"2010/PL225": 1531,
	"2010/PL227": 1533,
	"2010/PL228": 1977,
	"2010/PL229": 1978,
	"2010/PL22A": 1979,
	"2010/PL22B": 1980,
	"2010/PL22C": 1981,
	"2010/PL311": 1534,
	"2010/PL312": 1535,
	"2010/PL314": 1982,
	"2010/PL315": 1983,
	"2010/PL323": 1984,
	"2010/PL324": 1985,
	"2010/PL325": 1986,
	"2010/PL326": 1987,
	"2010/PL331": 1988,
	"2010/PL332": 1989,
	"2010/PL343": 1990,
	"2010/PL344": 1991,
	"2010/PL345": 1992,
	"2010/PL411": 1542,
	"2010/PL414": 1545,
	"2010/PL415": 1546,
	"2010/PL416": 1993,
	"2010/PL417": 1994,
	"2010/PL418": 1995,
	"2010/PL422": 1548,
	"2010/PL423": 1996,
	"2010/PL424": 1997,
	"2010/PL425": 1998,
	"2010/PL431": 1549,
	"2010/PL432": 1550,
	"2010/PL514": 1554,
	"2010/PL515": 1999,
	"2010/PL516": 2000,
	"2010/PL517": 2001,
	"2010/PL518": 2002,
	"2010/PL521": 2003,
	"2010/PL522": 2004,
	"2010/PL613": 2005,
	"2010/PL614": 2006,
	"2010/PL615": 2007,
	"2010/PL621": 1558,
	"2010/PL622": 1559,
	"2010/PL623": 1560,
	"2010/PL631": 1561,
	"2010/PL633": 1563,
	"2010/PL634": 2008,
	"2010/PL635": 2009,
	"2010/PT111": 1564,
	"2010/PT112": 1565,
	"2010/PT113": 1566,
	"2010/PT114": 1567,
	"2010/PT115": 1568,
	"2010/PT116": 1569,
	"2010/PT117": 1570,
	"2010/PT118": 1571,
	"2010/PT150": 1572,
	"2010/PT161": 1573,
	"2010/PT162": 1574,
	"2010/PT163": 1575,
	"2010/PT164": 1576,
	"2010/PT165": 1577,
	"2010/PT166": 1578,
	"2010/PT167": 1579,
	"2010/PT168": 1580,
	"2010/PT169": 1581,
	"2010/PT16A": 1582,
	"2010/PT16B": 1583,
	"2010/PT16C": 1584,
	"2010/PT171": 1585,
	"2010/PT172": 1586,
	"2010/PT181": 1587,
	"2010/PT182": 1588,
	"2010/PT183": 1589,
	"2010/PT184": 1590,
	"2010/PT185": 1591,
	"2010/PT200": 1592,
	"2010/PT300": 1593,
	"2010/RO111": 1594,
	"2010/RO112": 1595,
	"2010/RO113": 1596,
	"2010/RO114": 1597,
	"2010/RO115": 1598,
	"2010/RO116": 1599,
	"2010/RO121": 1600,
	"2010/RO122": 1601,
	"2010/RO123": 1602,
	"2010/RO124": 1603,
	"2010/RO125": 1604,
	"2010/RO126": 1605,
	"2010/RO211": 1606,
	"2010/RO212": 1607,
	"2010/RO213": 1608,
	"2010/RO214": 1609,
	"2010/RO215": 1610,
	"2010/RO216": 1611,
	"2010/RO221": 1612,
	"2010/RO222": 1613,
	"2010/RO223": 1614,
	"2010/RO224": 1615,
	"2010/RO225": 1616,
	"2010/RO226": 1617,
	"2010/RO311": 1618,
	"2010/RO312": 1619,
	"2010/RO313": 1620,
	"2010/RO314": 1621,
	"2010/RO315": 1622,
	"2010/RO316": 1623,
	"2010/RO317": 1624,
	"2010/RO321": 1625,
	"2010/RO322": 1626,
	"2010/RO411": 1627,
	"2010/RO412": 1628,
	"2010/RO413": 1629,
	"2010/RO414": 1630,
	"2010/RO415": 1631,
	"2010/RO421": 1632,
	"2010/RO422": 1633,
	"2010/RO423": 1634,
	"2010/RO424": 1635,
	"2010/SE110": 1636,
	"2010/SE121": 2010,
	"2010/SE122": 1638,
	"2010/SE123": 1639,
	"2010/SE124": 1640,
	"2010/SE125": 2011,
	"2010/SE211": 1651,
	"2010/SE212": 1652,
	"2010/SE213": 1653,
	"2010/SE214": 1654,
	"2010/SE221": 1642,
	"2010/SE224": 1643,
	"2010/SE231": 1655,
	"2010/SE232": 1656,
	"2010/SE311": 1644,
	"2010/SE312": 1645,
	"2010/SE313": 1646,
	"2010/SE321": 1647,
	"2010/SE322": 1648,
	"2010/SE331": 1649,
	"2010/SE332": 1650,
	"2010/SI011": 1657,
	"2010/SI012": 1658,
	"2010/SI013": 1659,
	"2010/SI014": 1660,
	"2010/SI015": 1661,
	"2010/SI016": 1662,
	"2010/SI017": 1667,
	"2010/SI018": 1664,
	"2010/SI021": 1668,
	"2010/SI022": 1663,
	"2010/SI023": 1665,
	"2010/SI024": 1666,
	"2010/SK010": 1669,
	"2010/SK021": 1670,
	"2010/SK022": 1671,
	"2010/SK023": 1672,
	"2010/SK031": 1673,
	"2010/SK032": 1674,
	"2010/SK041": 1675,
	"2010/SK042": 1676,
	"2010/TR100": 1677,
	"2010/TR211": 1678,
	"2010/TR212": 1679,
	"2010/TR213": 1680,
	"2010/TR221": 1681,
	"2010/TR222": 1682,
	"2010/TR310": 1683,
	"2010/TR321": 1684,
	"2010/TR322": 1685,
	"2010/TR323": 1686,
	"2010/TR331": 1687,
	"2010/TR332": 1688,
	"2010/TR333": 1689,
	"2010/TR334": 1690,
	"2010/TR411": 1691,
	"2010/TR412": 1692,
	"2010/TR413": 1693,
	"2010/TR421": 1694,
	"2010/TR422": 1695,
	"2010/TR423": 1696,
	"2010/TR424": 1697,
	"2010/TR425": 1698,
	"2010/TR510": 1699,
	"2010/TR521": 1700,
	"2010/TR522": 1701,
	"2010/TR611": 1702,
	"2010/TR612": 1703,
	"2010/TR613": 1704,
	"2010/TR621": 1705,
	"2010/TR622": 1706,
	"2010/TR631": 1707,
	"2010/TR632": 1708,
	"2010/TR633": 1709,
	"2010/TR711": 1710,
	"2010/TR712": 1711,
	"2010/TR713": 1712,
	"2010/TR714": 1713,
	"2010/TR715": 1714,
	"2010/TR721": 1715,
	"2010/TR722": 1716,
	"2010/TR723": 1717,
	"2010/TR811": 1718,
	"2010/TR812": 1719,
	"2010/TR813": 1720,
	"2010/TR821": 1721,
	"2010/TR822": 1722,
	"2010/TR823": 1723,
	"2010/TR831": 1724,
	"2010/TR832": 1725,
	"2010/TR833": 1726,
	"2010/TR834": 1727,
	"2010/TR901": 1728,
	"2010/TR902": 1729,
	"2010/TR903": 1730,
	"2010/TR904": 1731,
	"2010/TR905": 1732,
	"2010/TR906": 1733,
	"2010/TRA11": 1734,
	"2010/TRA12": 1735,
	"2010/TRA13": 1736,
	"2010/TRA21": 1737,
	"2010/TRA22": 1738,
	"2010/TRA23": 1739,
	"2010/TRA24": 1740,
	"2010/TRB11": 1741,
	"2010/TRB12": 1742,
	"2010/TRB13": 1743,
	"2010/TRB14": 1744,
	"2010/TRB21": 1745,
	"2010/TRB22": 1746,
	"2010/TRB23": 1747,
	"2010/TRB24": 1748,
	"2010/TRC11": 1749,
	"2010/TRC12": 1750,
	"2010/TRC13": 1751,
	"2010/TRC21": 1752,
	"2010/TRC22": 1753,
	"2010/TRC31": 1754,
	"2010/TRC32": 1755,
	"2010/TRC33": 1756,
	"2010/TRC34": 1757,
	"2010/UKC11": 1758,
	"2010/UKC12": 1759,
	"2010/UKC13": 1760,
	"2010/UKC14": 1761,
	"2010/UKC21": 1762,
	"2010/UKC22": 1763,
	"2010/UKC23": 1764,
	"2010/UKD11": 1765,
	"2010/UKD12": 1766,
	"2010/UKD31": 1769,
	"2010/UKD32": 1770,
	"2010/UKD41": 1771,
	"2010/UKD42": 1772,
	"2010/UKD43": 1773,
	"2010/UKD61": 2067,
	"2010/UKD62": 2068,
	"2010/UKD63": 2069,
	"2010/UKD71": 2070,
	"2010/UKD72": 1775,
	"2010/UKD73": 1776,
	"2010/UKD74": 1777,
	"2010/UKE11": 1778,
	"2010/UKE12": 1779,
	"2010/UKE13": 1780,
	"2010/UKE21": 1781,
	"2010/UKE22": 1782,
	"2010/UKE31": 1783,
	"2010/UKE32": 1784,
	"2010/UKE41": 1785,
	"2010/UKE42": 1786,
	"2010/UKE44": 2071,
	"2010/UKE45": 2072,
	"2010/UKF11": 1788,
	"2010/UKF12": 1789,
	"2010/UKF13": 1790,
	"2010/UKF14": 1791,
	"2010/UKF15": 1792,
	"2010/UKF16": 1793,
	"2010/UKF21": 1794,
	"2010/UKF22": 1795,
	"2010/UKF24": 2073,
	"2010/UKF25": 2074,
	"2010/UKF30": 1797,
	"2010/UKG11": 1798,
	"2010/UKG12": 1799,
	"2010/UKG13": 1800,
	"2010/UKG21": 1801,
	"2010/UKG22": 1802,
	"2010/UKG23": 1803,
	"2010/UKG24": 1804,
	"2010/UKG31": 1805,
	"2010/UKG32": 1806,
	"2010/UKG33": 1807,
	"2010/UKG36": 2075,
	"2010/UKG37": 2076,
	"2010/UKG38": 2077,
	"2010/UKG39": 2078,
	"2010/UKH11": 1810,
	"2010/UKH12": 1811,
	"2010/UKH13": 1812,
	"2010/UKH14": 1813,
	"2010/UKH21": 1814,
	"2010/UKH23": 1816,
	"2010/UKH24": 2079,
	"2010/UKH25": 2080,
	"2010/UKH31": 1817,
	"2010/UKH32": 1818,
	"2010/UKH33": 1819,
	"2010/UKI11": 1820,
	"2010/UKI12": 1821,
	"2010/UKI21": 1822,
	"2010/UKI22": 1823,
	"2010/UKI23": 1824,
	"2010/UKJ11": 1825,
	"2010/UKJ12": 1826,
	"2010/UKJ13": 1827,
	"2010/UKJ14": 1828,
	"2010/UKJ21": 1829,
	"2010/UKJ22": 1830,
	"2010/UKJ23": 1831,
	"2010/UKJ24": 1832,
	"2010/UKJ31": 1833,
	"2010/UKJ32": 1834,
	"2010/UKJ33": 1835,
	"2010/UKJ34": 1836,
	"2010/UKJ41": 1837,
	"2010/UKJ42": 1838,
	"2010/UKK11": 1839,
	"2010/UKK12": 1840,
	"2010/UKK13": 1841,
	"2010/UKK14": 1842,
	"2010/UKK15": 1843,
	"2010/UKK21": 1844,
	"2010/UKK22": 1845,
	"2010/UKK23": 1846,
	"2010/UKK30": 1847,
	"2010/UKK41": 1848,
	"2010/UKK42": 1849,
	"2010/UKK43": 1850,
	"2010/UKL11": 1851,
	"2010/UKL12": 1852,
	"2010/UKL13": 1853,
	"2010/UKL14": 1854,
	"2010/UKL15": 1855,
	"2010/UKL16": 1856,
	"2010/UKL17": 1857,
	"2010/UKL18": 1858,
	"2010/UKL21": 1859,
	"2010/UKL22": 1860,
	"2010/UKL23": 1861,
	"2010/UKL24": 1862,
	"2010/UKM21": 1864,
	"2010/UKM22": 1865,
	"2010/UKM23": 1866,
	"2010/UKM24": 1867,
	"2010/UKM25": 1868,
	"2010/UKM26": 1869,
	"2010/UKM27": 1870,
	"2010/UKM28": 1871,
	"2010/UKM31": 1872,
	"2010/UKM32": 1873,
	"2010/UKM33": 1874,
	"2010/UKM34": 1875,
	"2010/UKM35": 1876,
	"2010/UKM36": 1877,
	"2010/UKM37": 1878,
	"2010/UKM38": 1879,
	"2010/UKM50": 2012,
	"2010/UKM61": 1880,
	"2010/UKM62": 2013,
	"2010/UKM63": 1882,
	"2010/UKM64": 1883,
	"2010/UKM65": 1884,
	"2010/UKM66": 1885,
	"2010/UKN01": 1886,
	"2010/UKN02": 1887,
	"2010/UKN03": 1888,
	"2010/UKN04": 1889,
	"2010/UKN05": 1890,
	"2013/AT": 0,
	"2013/BE": 1,
	"2013/BG": 2,
	"2013/CH": 3,
	"2013/CY": 4,
	"2013/CZ": 5,
	"2013/DE": 6,
	"2013/DK": 7,
	"2013/EE": 8,
	"2013/EL": 12,
	"2013/ES": 9,
	"2013/FI": 10,
	"2013/FR": 11,
	"2013/HR": 13,
	"2013/HU": 14,
	"2013/IE": 15,
	"2013/IS": 16,
	"2013/IT": 17,
	"2013/LI": 18,
	"2013/LT": 19,
	"2013/LU": 20,
	"2013/LV": 21,
	"2013/ME": 1891,
	"2013/MK": 1892,
	"2013/MT": 22,
	"2013/NL": 23,
	"2013/NO": 24,
	"2013/PL": 25,
	"2013/PT": 26,
	"2013/RO": 27,
	"2013/SE": 28,
	"2013/SI": 29,
	"2013/SK": 30,
	"2013/TR": 31,
	"2013/UK": 32,
	"2013/AT1": 33,
	"2013/AT2": 34,
	"2013/AT3": 35,
	"2013/BE1": 36,
	"2013/BE2": 37,
	"2013/BE3": 38,
	"2013/BG3": 39,
	"2013/BG4": 40,
	"2013/CH0": 41,
	"2013/CY0": 42,
	"2013/CZ0": 43,
	"2013/DE1": 44,
	"2013/DE2": 45,
	"2013/DE3": 46,
	"2013/DE4": 47,
	"2013/DE5": 48,
	"2013/DE6": 49,
	"2013/DE7": 50,
	"2013/DE8": 51,
	"2013/DE9": 52,
	"2013/DEA": 53,
	"2013/DEB": 54,
	"2013/DEC": 55,
	"2013/DED": 56,
	"2013/DEE": 57,
	"2013/DEF": 58,
	"2013/DEG": 59,
	"2013/DK0": 60,
	"2013/EE0": 61,
	"2013/EL3": 82,
	"2013/EL4": 83,
	"2013/EL5": 2081,
	"2013/EL6": 2082,
	"2013/ES1": 62,
	"2013/ES2": 63,
	"2013/ES3": 64,
	"2013/ES4": 65,
	"2013/ES5": 66,
	"2013/ES6": 67,
	"2013/ES7": 68,
	"2013/FI1": 69,
	"2013/FI2": 70,
	"2013/FR1": 71,
	"2013/FR2": 72,
	"2013/FR3": 73,
	"2013/FR4": 74,
	"2013/FR5": 75,
	"2013/FR6": 76,
	"2013/FR7": 77,
	"2013/FR8": 78,
	"2013/FRA": 2083,
	"2013/HR0": 84,
	"2013/HU1": 85,
	"2013/HU2": 86,
	"2013/HU3": 87,
	"2013/IE0": 88,
	"2013/IS0": 89,
	"2013/ITC": 90,
	"2013/ITF": 93,
	"2013/ITG": 94,
	"2013/ITH": 2014,
	"2013/ITI": 2015,
	"2013/LI0": 95,
	"2013/LT0": 96,
	"2013/LU0": 97,
	"2013/LV0": 98,
	"2013/ME0": 1893,
	"2013/MK0": 1894,
	"2013/MT0": 99,
	"2013/NL1": 100,
	"2013/NL2": 101,
	"2013/NL3": 102,
	"2013/NL4": 103,
	"2013/NO0": 104,
	"2013/PL1": 105,
	"2013/PL2": 106,
	"2013/PL3": 107,
	"2013/PL4": 108,
	"2013/PL5": 109,
	"2013/PL6": 110,
	"2013/PT1": 111,
	"2013/PT2": 112,
	"2013/PT3": 113,
	"2013/RO1": 114,
	"2013/RO2": 115,
	"2013/RO3": 116,
	"2013/RO4": 117,
	"2013/SE1": 1895,
	"2013/SE2": 1896,
	"2013/SE3": 1897,
	"2013/SI0": 119,
	"2013/SK0": 120,
	"2013/TR1": 121,
	"2013/TR2": 122,
	"2013/TR3": 123,
	"2013/TR4": 124,
	"2013/TR5": 125,
	"2013/TR6": 126,
	"2013/TR7": 127,
	"2013/TR8": 128,
	"2013/TR9": 129,
	"2013/TRA": 130,
	"2013/TRB": 131,
	"2013/TRC": 132,
	"2013/UKC": 133,
	"2013/UKD": 134,
	"2013/UKE": 135,
	"2013/UKF": 136,
	"2013/UKG": 137,
	"2013/UKH": 138,
	"2013/UKI": 139,
	"2013/UKJ": 140,
	"2013/UKK": 141,
	"2013/UKL": 142,
	"2013/UKM": 143,
	"2013/UKN": 144,
	"2013/AT11": 145,
	"2013/AT12": 146,
	"2013/AT13": 147,
	"2013/AT21": 148,
	"2013/AT22": 149,
	"2013/AT31": 150,
	"2013/AT32": 151,
	"2013/AT33": 152,
	"2013/AT34": 153,
	"2013/BE10": 154,
	"2013/BE21": 155,
	"2013/BE22": 156,
	"2013/BE23": 157,
	"2013/BE24": 158,
	"2013/BE25": 159,
	"2013/BE31": 160,
	"2013/BE32": 161,
	"2013/BE33": 162,
	"2013/BE34": 163,
	"2013/BE35": 164,
	"2013/BG31": 165,
	"2013/BG32": 166,
	"2013/BG33": 167,
	"2013/BG34": 168,
	"2013/BG41": 169,
	"2013/BG42": 170,
	"2013/CH01": 171,
	"2013/CH02": 172,
	"2013/CH03": 173,
	"2013/CH04": 174,
	"2013/CH05": 175,
	"2013/CH06": 176,
	"2013/CH07": 177,
	"2013/CY00": 178,
	"2013/CZ01": 179,
	"2013/CZ02": 180,
	"2013/CZ03": 181,
	"2013/CZ04": 182,
	"2013/CZ05": 183,
	"2013/CZ06": 184,
	"2013/CZ07": 185,
	"2013/CZ08": 186,
	"2013/DE11": 187,
	"2013/DE12": 188,
	"2013/DE13": 189,
	"2013/DE14": 190,
	"2013/DE21": 191,
	"2013/DE22": 192,
	"2013/DE23": 193,
	"2013/DE24": 194,
	"2013/DE25": 195,
	"2013/DE26": 196,
	"2013/DE27": 197,
	"2013/DE30": 198,
	"2013/DE40": 2017,
	"2013/DE50": 201,
	"2013/DE60": 202,
	"2013/DE71": 203,
	"2013/DE72": 204,
	"2013/DE73": 205,
	"2013/DE80": 206,
	"2013/DE91": 207,
	"2013/DE92": 208,
	"2013/DE93": 209,
	"2013/DE94": 210,
	"2013/DEA1": 211,
	"2013/DEA2": 212,
	"2013/DEA3": 213,
	"2013/DEA4": 214,
	"2013/DEA5": 215,
	"2013/DEB1": 216,
	"2013/DEB2": 217,
	"2013/DEB3": 218,
	"2013/DEC0": 219,
	"2013/DED2": 221,
	"2013/DED4": 2018,
	"2013/DED5": 2019,
	"2013/DEE0": 1898,
	"2013/DEF0": 226,
	"2013/DEG0": 227,
	"2013/DK01": 1899,
	"2013/DK02": 1900,
	"2013/DK03": 1901,
	"2013/DK04": 1902,
	"2013/DK05": 1903,
	"2013/EE00": 229,
	"2013/EL30": 289,
	"2013/EL41": 290,
	"2013/EL42": 291,
	"2013/EL43": 292,
	"2013/EL51": 280,
	"2013/EL52": 281,
	"2013/EL53": 282,
	"2013/EL54": 284,
	"2013/EL61": 283,
	"2013/EL62": 285,
	"2013/EL63": 286,
	"2013/EL64": 287,
	"2013/EL65": 288,
	"2013/ES11": 230,
	"2013/ES12": 231,
	"2013/ES13": 232,
	"2013/ES21": 233,
	"2013/ES22": 234,
	"2013/ES23": 235,
	"2013/ES24": 236,
	"2013/ES30": 237,
	"2013/ES41": 238,
	"2013/ES42": 239,
	"2013/ES43": 240,
	"2013/ES51": 241,
	"2013/ES52": 242,
	"2013/ES53": 243,
	"2013/ES61": 244,
	"2013/ES62": 245,
	"2013/ES63": 246,
	"2013/ES64": 247,
	"2013/ES70": 248,
	"2013/FI19": 251,
	"2013/FI1B": 2020,
	"2013/FI1C": 2021,
	"2013/FI1D": 2022,
	"2013/FI20": 253,
	"2013/FR10": 254,
	"2013/FR21": 255,
	"2013/FR22": 256,
	"2013/FR23": 257,
	"2013/FR24": 258,
	"2013/FR25": 259,
	"2013/FR26": 260,
	"2013/FR30": 261,
	"2013/FR41": 262,
	"2013/FR42": 263,
	"2013/FR43": 264,
	"2013/FR51": 265,
	"2013/FR52": 266,
	"2013/FR53": 267,
	"2013/FR61": 268,
	"2013/FR62": 269,
	"2013/FR63": 270,
	"2013/FR71": 271,
	"2013/FR72": 272,
	"2013/FR81": 273,
	"2013/FR82": 274,
	"2013/FR83": 275,
	"2013/FRA1": 2084,
	"2013/FRA2": 277,
	"2013/FRA3": 278,
	"2013/FRA4": 279,
	"2013/FRA5": 2085,
	"2013/HR03": 295,
	"2013/HR04": 2023,
	"2013/HU10": 296,
	"2013/HU21": 297,
	"2013/HU22": 298,
	"2013/HU23": 299,
	"2013/HU31": 300,
	"2013/HU32": 301,
	"2013/HU33": 302,
	"2013/IE01": 303,
	"2013/IE02": 304,
	"2013/IS00": 305,
	"2013/ITC1": 306,
	"2013/ITC2": 307,
	"2013/ITC3": 308,
	"2013/ITC4": 309,
	"2013/ITF1": 319,
	"2013/ITF2": 320,
	"2013/ITF3": 321,
	"2013/ITF4": 322,
	"2013/ITF5": 323,
	"2013/ITF6": 324,
	"2013/ITG1": 325,
	"2013/ITG2": 326,
	"2013/ITH1": 310,
	"2013/ITH2": 311,
	"2013/ITH3": 312,
	"2013/ITH4": 313,
	"2013/ITH5": 2024,
	"2013/ITI1": 315,
	"2013/ITI2": 316,
	"2013/ITI3": 2025,
	"2013/ITI4": 318,
	"2013/LI00": 327,
	"2013/LT00": 328,
	"2013/LU00": 329,
	"2013/LV00": 330,
	"2013/ME00": 1904,
	"2013/MK00": 1905,
	"2013/MT00": 331,
	"2013/NL11": 332,
	"2013/NL12": 333,
	"2013/NL13": 334,
	"2013/NL21": 335,
	"2013/NL22": 336,
	"2013/NL23": 337,
	"2013/NL31": 338,
	"2013/NL32": 339,
	"2013/NL33": 340,
	"2013/NL34": 341,
	"2013/NL41": 342,
	"2013/NL42": 343,
	"2013/NO01": 344,
	"2013/NO02": 345,
	"2013/NO03": 346,
	"2013/NO04": 347,
	"2013/NO05": 348,
	"2013/NO06": 349,
	"2013/NO07": 350,
	"2013/PL11": 351,
	"2013/PL12": 352,
	"2013/PL21": 353,
	"2013/PL22": 354,
	"2013/PL31": 355,
	"2013/PL32": 356,
	"2013/PL33": 357,
	"2013/PL34": 358,
	"2013/PL41": 359,
	"2013/PL42": 360,
	"2013/PL43": 361,
	"2013/PL51": 362,
	"2013/PL52": 363,
	"2013/PL61": 364,
	"2013/PL62": 365,
	"2013/PL63": 366,
	"2013/PT11": 367,
	"2013/PT15": 368,
	"2013/PT16": 369,
	"2013/PT17": 370,
	"2013/PT18": 371,
	"2013/PT20": 372,
	"2013/PT30": 373,
	"2013/RO11": 374,
	"2013/RO12": 375,
	"2013/RO21": 376,
	"2013/RO22": 377,
	"2013/RO31": 378,
	"2013/RO32": 379,
	"2013/RO41": 380,
	"2013/RO42": 381,
	"2013/SE11": 382,
	"2013/SE12": 383,
	"2013/SE21": 388,
	"2013/SE22": 384,
	"2013/SE23": 389,
	"2013/SE31": 385,
	"2013/SE32": 386,
	"2013/SE33": 387,
	"2013/SI03": 2086,
	"2013/SI04": 2087,
	"2013/SK01": 391,
	"2013/SK02": 392,
	"2013/SK03": 393,
	"2013/SK04": 394,
	"2013/TR10": 395,
	"2013/TR21": 396,
	"2013/TR22": 397,
	"2013/TR31": 398,
	"2013/TR32": 399,
	"2013/TR33": 400,
	"2013/TR41": 401,
	"2013/TR42": 402,
	"2013/TR51": 403,
	"2013/TR52": 404,
	"2013/TR61": 405,
	"2013/TR62": 406,
	"2013/TR63": 407,
	"2013/TR71": 408,
	"2013/TR72": 409,
	"2013/TR81": 410,
	"2013/TR82": 411,
	"2013/TR83": 412,
	"2013/TR90": 413,
	"2013/TRA1": 414,
	"2013/TRA2": 415,
	"2013/TRB1": 416,
	"2013/TRB2": 417,
	"2013/TRC1": 418,
	"2013/TRC2": 419,
	"2013/TRC3": 420,
	"2013/UKC1": 421,
	"2013/UKC2": 422,
	"2013/UKD1": 423,
	"2013/UKD3": 425,
	"2013/UKD4": 426,
	"2013/UKD6": 2026,
	"2013/UKD7": 2027,
	"2013/UKE1": 428,
	"2013/UKE2": 429,
	"2013/UKE3": 430,
	"2013/UKE4": 431,
	"2013/UKF1": 432,
	"2013/UKF2": 433,
	"2013/UKF3": 434,
	"2013/UKG1": 435,
	"2013/UKG2": 436,
	"2013/UKG3": 437,
	"2013/UKH1": 438,
	"2013/UKH2": 439,
	"2013/UKH3": 440,
	"2013/UKI3": 2088,
	"2013/UKI4": 2089,
	"2013/UKI5": 2090,
	"2013/UKI6": 2091,
	"2013/UKI7": 2092,
	"2013/UKJ1": 443,
	"2013/UKJ2": 444,
	"2013/UKJ3": 445,
	"2013/UKJ4": 446,
	"2013/UKK1": 447,
	"2013/UKK2": 448,
	"2013/UKK3": 449,
	"2013/UKK4": 450,
	"2013/UKL1": 451,
	"2013/UKL2": 452,
	"2013/UKM2": 454,
	"2013/UKM3": 455,
	"2013/UKM5": 1908,
	"2013/UKM6": 1909,
	"2013/UKN0": 457,
	"2013/AT111": 458,
	"2013/AT112": 459,
	"2013/AT113": 460,
	"2013/AT121": 461,
	"2013/AT122": 462,
	"2013/AT123": 463,
	"2013/AT124": 464,
	"2013/AT125": 465,
	"2013/AT126": 466,
	"2013/AT127": 467,
	"2013/AT130": 468,
	"2013/AT211": 469,
	"2013/AT212": 470,
	"2013/AT213": 471,
	"2013/AT221": 472,
	"2013/AT222": 473,
	"2013/AT223": 474,
	"2013/AT224": 475,
	"2013/AT225": 476,
	"2013/AT226": 477,
	"2013/AT311": 478,
	"2013/AT312": 479,
	"2013/AT313": 480,
	"2013/AT314": 481,
	"2013/AT315": 482,
	"2013/AT321": 483,
	"2013/AT322": 484,
	"2013/AT323": 485,
	"2013/AT331": 486,
	"2013/AT332": 487,
	"2013/AT333": 488,
	"2013/AT334": 489,
	"2013/AT335": 490,
	"2013/AT341": 491,
	"2013/AT342": 492,
	"2013/BE100": 493,
	"2013/BE211": 494,
	"2013/BE212": 495,
	"2013/BE213": 496,
	"2013/BE221": 497,
	"2013/BE222": 498,
	"2013/BE223": 499,
	"2013/BE231": 500,
	"2013/BE232": 501,
	"2013/BE233": 502,
	"2013/BE234": 503,
	"2013/BE235": 504,
	"2013/BE236": 505,
	"2013/BE241": 506,
	"2013/BE242": 507,
	"2013/BE251": 508,
	"2013/BE252": 509,
	"2013/BE253": 510,
	"2013/BE254": 511,
	"2013/BE255": 512,
	"2013/BE256": 513,
	"2013/BE257": 514,
	"2013/BE258": 515,
	"2013/BE310": 516,
	"2013/BE321": 517,
	"2013/BE322": 518,
	"2013/BE323": 519,
	"2013/BE324": 520,
	"2013/BE325": 521,
	"2013/BE326": 522,
	"2013/BE327": 523,
	"2013/BE331": 524,
	"2013/BE332": 525,
	"2013/BE334": 527,
	"2013/BE335": 1910,
	"2013/BE336": 1911,
	"2013/BE341": 528,
	"2013/BE342": 529,
	"2013/BE343": 530,
	"2013/BE344": 531,
	"2013/BE345": 532,
	"2013/BE351": 533,
	"2013/BE352": 534,
	"2013/BE353": 535,
	"2013/BG311": 536,
	"2013/BG312": 537,
	"2013/BG313": 538,
	"2013/BG314": 539,
	"2013/BG315": 540,
	"2013/BG321": 541,
	"2013/BG322": 542,
	"2013/BG323": 543,
	"2013/BG324": 544,
	"2013/BG325": 545,
	"2013/BG331": 546,
	"2013/BG332": 547,
	"2013/BG333": 548,
	"2013/BG334": 549,
	"2013/BG341": 550,
	"2013/BG342": 551,
	"2013/BG343": 552,
	"2013/BG344": 553,
	"2013/BG411": 554,
	"2013/BG412": 555,
	"2013/BG413": 556,
	"2013/BG414": 557,
	"2013/BG415": 558,
	"2013/BG421": 559,
	"2013/BG422": 560,
	"2013/BG423": 561,
	"2013/BG424": 562,
	"2013/BG425": 563,
	"2013/CH011": 564,
	"2013/CH012": 565,
	"2013/CH013": 566,
	"2013/CH021": 567,
	"2013/CH022": 568,
	"2013/CH023": 569,
	"2013/CH024": 570,
	"2013/CH025": 571,
	"2013/CH031": 572,
	"2013/CH032": 573,
	"2013/CH033": 574,
	"2013/CH040": 575,
	"2013/CH051": 576,
	"2013/CH052": 577,
	"2013/CH053": 578,
	"2013/CH054": 579,
	"2013/CH055": 580,
	"2013/CH056": 581,
	"2013/CH057": 582,
	"2013/CH061": 583,
	"2013/CH062": 584,
	"2013/CH063": 585,
	"2013/CH064": 586,
	"2013/CH065": 587,
	"2013/CH066": 588,
	"2013/CH070": 589,
	"2013/CY000": 590,
	"2013/CZ010": 591,
	"2013/CZ020": 592,
	"2013/CZ031": 593,
	"2013/CZ032": 594,
	"2013/CZ041": 595,
	"2013/CZ042": 596,
	"2013/CZ051": 597,
	"2013/CZ052": 598,
	"2013/CZ053": 599,
	"2013/CZ063": 1912,
	"2013/CZ064": 1913,
	"2013/CZ071": 602,
	"2013/CZ072": 603,
	"2013/CZ080": 604,
	"2013/DE111": 605,
	"2013/DE112": 606,
	"2013/DE113": 607,
	"2013/DE114": 608,
	"2013/DE115": 609,
	"2013/DE116": 610,
	"2013/DE117": 611,
	"2013/DE118": 612,
	"2013/DE119": 613,
	"2013/DE11A": 614,
	"2013/DE11B": 615,
	"2013/DE11C": 616,
	"2013/DE11D": 617,
	"2013/DE121": 618,
	"2013/DE122": 619,
	"2013/DE123": 620,
	"2013/DE124": 621,
	"2013/DE125": 622,
	"2013/DE126": 623,
	"2013/DE127": 624,
	"2013/DE128": 625,
	"2013/DE129": 626,
	"2013/DE12A": 627,
	"2013/DE12B": 628,
	"2013/DE12C": 629,
	"2013/DE131": 630,
	"2013/DE132": 631,
	"2013/DE133": 632,
	"2013/DE134": 633,
	"2013/DE135": 634,
	"2013/DE136": 635,
	"2013/DE137": 636,
	"2013/DE138": 637,
	"2013/DE139": 638,
	"2013/DE13A": 639,
	"2013/DE141": 640,
	"2013/DE142": 641,
	"2013/DE143": 642,
	"2013/DE144": 643,
	"2013/DE145": 644,
	"2013/DE146": 645,
	"2013/DE147": 646,
	"2013/DE148": 647,
	"2013/DE149": 648,
	"2013/DE211": 649,
	"2013/DE212": 650,
	"2013/DE213": 651,
	"2013/DE214": 652,
	"2013/DE215": 653,
	"2013/DE216": 654,
	"2013/DE217": 655,
	"2013/DE218": 656,
	"2013/DE219": 657,
	"2013/DE21A": 658,
	"2013/DE21B": 659,
	"2013/DE21C": 660,
	"2013/DE21D": 661,
	"2013/DE21E": 662,
	"2013/DE21F": 663,
	"2013/DE21G": 664,
	"2013/DE21H": 665,
	"2013/DE21I": 666,
	"2013/DE21J": 667,
	"2013/DE21K": 668,
	"2013/DE21L": 669,
	"2013/DE21M": 670,
	"2013/DE21N": 671,
	"2013/DE221": 672,
	"2013/DE222": 673,
	"2013/DE223": 674,
	"2013/DE224": 675,
	"2013/DE225": 676,
	"2013/DE226": 677,
	"2013/DE227": 678,
	"2013/DE228": 679,
	"2013/DE229": 680,
	"2013/DE22A": 681,
	"2013/DE22B": 682,
	"2013/DE22C": 683,
	"2013/DE231": 684,
	"2013/DE232": 685,
	"2013/DE233": 686,
	"2013/DE234": 687,
	"2013/DE235": 688,
	"2013/DE236": 689,
	"2013/DE237": 690,
	"2013/DE238": 691,
	"2013/DE239": 692,
	"2013/DE23A": 693,
	"2013/DE241": 694,
	"2013/DE242": 695,
	"2013/DE243": 696,
	"2013/DE244": 697,
	"2013/DE245": 698,
	"2013/DE246": 699,
	"2013/DE247": 700,
	"2013/DE248": 701,
	"2013/DE249": 702,
	"2013/DE24A": 703,
	"2013/DE24B": 704,
	"2013/DE24C": 705,
	"2013/DE24D": 706,
	"2013/DE251": 707,
	"2013/DE252": 708,
	"2013/DE253": 709,
	"2013/DE254": 710,
	"2013/DE255": 711,
	"2013/DE256": 712,
	"2013/DE257": 713,
	"2013/DE258": 714,
	"2013/DE259": 715,
	"2013/DE25A": 716,
	"2013/DE25B": 717,
	"2013/DE25C": 718,
	"2013/DE261": 719,
	"2013/DE262": 720,
	"2013/DE263": 721,
	"2013/DE264": 722,
	"2013/DE265": 723,
	"2013/DE266": 724,
	"2013/DE267": 725,
	"2013/DE268": 726,
	"2013/DE269": 727,
	"2013/DE26A": 728,
	"2013/DE26B": 729,
	"2013/DE26C": 730,
	"2013/DE271": 731,
	"2013/DE272": 732,
	"2013/DE273": 733,
	"2013/DE274": 734,
	"2013/DE275": 735,
	"2013/DE276": 736,
	"2013/DE277": 737,
	"2013/DE278": 738,
	"2013/DE279": 739,
	"2013/DE27A": 740,
	"2013/DE27B": 741,
	"2013/DE27C": 742,
	"2013/DE27D": 743,
	"2013/DE27E": 744,
	"2013/DE300": 745,
	"2013/DE401": 754,
	"2013/DE402": 755,
	"2013/DE403": 746,
	"2013/DE404": 756,
	"2013/DE405": 747,
	"2013/DE406": 757,
	"2013/DE407": 758,
	"2013/DE408": 759,
	"2013/DE409": 748,
	"2013/DE40A": 749,
	"2013/DE40B": 760,
	"2013/DE40C": 750,
	"2013/DE40D": 751,
	"2013/DE40E": 761,
	"2013/DE40F": 752,
	"2013/DE40G": 762,
	"2013/DE40H": 763,
	"2013/DE40I": 753,
	"2013/DE501": 764,
	"2013/DE502": 765,
	"2013/DE600": 766,
	"2013/DE711": 767,
	"2013/DE712": 768,
	"2013/DE713": 769,
	"2013/DE714": 770,
	"2013/DE715": 771,
	"2013/DE716": 772,
	"2013/DE717": 773,
	"2013/DE718": 774,
	"2013/DE719": 775,
	"2013/DE71A": 776,
	"2013/DE71B": 777,
	"2013/DE71C": 778,
	"2013/DE71D": 779,
	"2013/DE71E": 780,
	"2013/DE721": 781,
	"2013/DE722": 782,
	"2013/DE723": 783,
	"2013/DE724": 784,
	"2013/DE725": 785,
	"2013/DE731": 786,
	"2013/DE732": 787,
	"2013/DE733": 788,
	"2013/DE734": 789,
	"2013/DE735": 790,
	"2013/DE736": 791,
	"2013/DE737": 792,
	"2013/DE803": 795,
	"2013/DE804": 796,
	"2013/DE80J": 2093,
	"2013/DE80K": 2094,
	"2013/DE80L": 2095,
	"2013/DE80M": 2096,
	"2013/DE80N": 2097,
	"2013/DE80O": 2098,
	"2013/DE911": 811,
	"2013/DE912": 812,
	"2013/DE913": 813,
	"2013/DE914": 814,
	"2013/DE915": 815,
	"2013/DE916": 816,
	"2013/DE917": 817,
	"2013/DE918": 818,
	"2013/DE919": 819,
	"2013/DE91A": 820,
	"2013/DE91B": 821,
	"2013/DE922": 822,
	"2013/DE923": 823,
	"2013/DE925": 824,
	"2013/DE926": 825,
	"2013/DE927": 826,
	"2013/DE928": 827,
	"2013/DE929": 828,
	"2013/DE931": 829,
	"2013/DE932": 830,
	"2013/DE933": 831,
	"2013/DE934": 832,
	"2013/DE935": 833,
	"2013/DE936": 834,
	"2013/DE937": 835,
	"2013/DE938": 836,
	"2013/DE939": 837,
	"2013/DE93A": 838,
	"2013/DE93B": 839,
	"2013/DE941": 840,
	"2013/DE942": 841,
	"2013/DE943": 842,
	"2013/DE944": 843,
	"2013/DE945": 844,
	"2013/DE946": 845,
	"2013/DE947": 846,
	"2013/DE948": 847,
	"2013/DE949": 848,
	"2013/DE94A": 849,
	"2013/DE94B": 850,
	"2013/DE94C": 851,
	"2013/DE94D": 852,
	"2013/DE94E": 853,
	"2013/DE94F": 854,
	"2013/DE94G": 855,
	"2013/DE94H": 856,
	"2013/DEA11": 857,
	"2013/DEA12": 858,
	"2013/DEA13": 859,
	"2013/DEA14": 860,
	"2013/DEA15": 861,
	"2013/DEA16": 862,
	"2013/DEA17": 863,
	"2013/DEA18": 864,
	"2013/DEA19": 865,
	"2013/DEA1A": 866,
	"2013/DEA1B": 867,
	"2013/DEA1C": 868,
	"2013/DEA1D": 869,
	"2013/DEA1E": 870,
	"2013/DEA1F": 871,
	"2013/DEA22": 873,
	"2013/DEA23": 874,
	"2013/DEA24": 875,
	"2013/DEA26": 877,
	"2013/DEA27": 878,
	"2013/DEA28": 879,
	"2013/DEA29": 880,
	"2013/DEA2A": 881,
	"2013/DEA2B": 882,
	"2013/DEA2C": 883,
	"2013/DEA2D": 2028,
	"2013/DEA31": 884,
	"2013/DEA32": 885,
	"2013/DEA33": 886,
	"2013/DEA34": 887,
	"2013/DEA35": 888,
	"2013/DEA36": 889,
	"2013/DEA37": 890,
	"2013/DEA38": 891,
	"2013/DEA41": 892,
	"2013/DEA42": 893,
	"2013/DEA43": 894,
	"2013/DEA44": 895,
	"2013/DEA45": 896,
	"2013/DEA46": 897,
	"2013/DEA47": 898,
	"2013/DEA51": 899,
	"2013/DEA52": 900,
	"2013/DEA53": 901,
	"2013/DEA54": 902,
	"2013/DEA55": 903,
	"2013/DEA56": 904,
	"2013/DEA57": 905,
	"2013/DEA58": 906,
	"2013/DEA59": 907,
	"2013/DEA5A": 908,
	"2013/DEA5B": 909,
	"2013/DEA5C": 910,
	"2013/DEB11": 911,
	"2013/DEB12": 912,
	"2013/DEB13": 913,
	"2013/DEB14": 914,
	"2013/DEB15": 915,
	"2013/DEB16": 916,
	"2013/DEB17": 917,
	"2013/DEB18": 918,
	"2013/DEB19": 919,
	"2013/DEB1A": 920,
	"2013/DEB1B": 921,
	"2013/DEB21": 922,
	"2013/DEB22": 923,
	"2013/DEB23": 924,
	"2013/DEB24": 925,
	"2013/DEB25": 926,
	"2013/DEB31": 927,
	"2013/DEB32": 928,
	"2013/DEB33": 929,
	"2013/DEB34": 930,
	"2013/DEB35": 931,
	"2013/DEB36": 932,
	"2013/DEB37": 933,
	"2013/DEB38": 934,
	"2013/DEB39": 935,
	"2013/DEB3A": 936,
	"2013/DEB3B": 937,
	"2013/DEB3C": 938,
	"2013/DEB3D": 939,
	"2013/DEB3E": 940,
	"2013/DEB3F": 941,
	"2013/DEB3G": 942,
	"2013/DEB3H": 943,
	"2013/DEB3I": 944,
	"2013/DEB3J": 945,
	"2013/DEB3K": 946,
	"2013/DEC01": 947,
	"2013/DEC02": 948,
	"2013/DEC03": 949,
	"2013/DEC04": 950,
	"2013/DEC05": 951,
	"2013/DEC06": 952,
	"2013/DED21": 965,
	"2013/DED2C": 2029,
	"2013/DED2D": 2030,
	"2013/DED2E": 2031,
	"2013/DED2F": 2032,
	"2013/DED41": 953,
	"2013/DED42": 2033,
	"2013/DED43": 2034,
	"2013/DED44": 2035,
	"2013/DED45": 2036,
	"2013/DED51": 976,
	"2013/DED52": 2037,
	"2013/DED53": 2038,
	"2013/DEE01": 1914,
	"2013/DEE02": 988,
	"2013/DEE03": 995,
	"2013/DEE04": 1005,
	"2013/DEE05": 1915,
	"2013/DEE06": 1916,
	"2013/DEE07": 1917,
	"2013/DEE08": 1918,
	"2013/DEE09": 1919,
	"2013/DEE0A": 1920,
	"2013/DEE0B": 1921,
	"2013/DEE0C": 1922,
	"2013/DEE0D": 1001,
	"2013/DEE0E": 1923,
	"2013/DEF01": 1006,
	"2013/DEF02": 1007,
	"2013/DEF03": 1008,
	"2013/DEF04": 1009,
	"2013/DEF05": 1010,
	"2013/DEF06": 1011,
	"2013/DEF07": 1012,
	"2013/DEF08": 1013,
	"2013/DEF09": 1014,
	"2013/DEF0A": 1015,
	"2013/DEF0B": 1016,
	"2013/DEF0C": 1017,
	"2013/DEF0D": 1018,
	"2013/DEF0E": 1019,
	"2013/DEF0F": 1020,
	"2013/DEG01": 1021,
	"2013/DEG02": 1022,
	"2013/DEG03": 1023,
	"2013/DEG04": 1024,
	"2013/DEG05": 1025,
	"2013/DEG06": 1026,
	"2013/DEG07": 1027,
	"2013/DEG09": 1028,
	"2013/DEG0A": 1029,
	"2013/DEG0B": 1030,
	"2013/DEG0C": 1031,
	"2013/DEG0D": 1032,
	"2013/DEG0E": 1033,
	"2013/DEG0F": 1034,
	"2013/DEG0G": 1035,
	"2013/DEG0H": 1036,
	"2013/DEG0I": 1037,
	"2013/DEG0J": 1038,
	"2013/DEG0K": 1039,
	"2013/DEG0L": 1040,
	"2013/DEG0M": 1041,
	"2013/DEG0N": 1042,
	"2013/DEG0P": 1043,
	"2013/DK011": 1924,
	"2013/DK012": 1925,
	"2013/DK013": 1926,
	"2013/DK014": 1050,
	"2013/DK021": 1927,
	"2013/DK022": 1928,
	"2013/DK031": 1051,
	"2013/DK032": 1929,
	"2013/DK041": 1930,
	"2013/DK042": 1931,
	"2013/DK050": 1932,
	"2013/EE001": 1059,
	"2013/EE004": 1060,
	"2013/EE006": 1061,
	"2013/EE007": 1062,
	"2013/EE008": 1063,
	"2013/EL301": 2099,
	"2013/EL302": 2100,
	"2013/EL303": 2101,
	"2013/EL304": 2102,
	"2013/EL305": 2103,
	"2013/EL306": 2104,
	"2013/EL307": 2105,
	"2013/EL411": 1278,
	"2013/EL412": 1279,
	"2013/EL413": 1280,
	"2013/EL421": 1281,
	"2013/EL422": 1282,
	"2013/EL431": 1283,
	"2013/EL432": 1284,
	"2013/EL433": 1285,
	"2013/EL434": 1286,
	"2013/EL511": 1236,
	"2013/EL512": 1237,
	"2013/EL513": 1238,
	"2013/EL514": 1239,
	"2013/EL515": 1240,
	"2013/EL521": 1241,
	"2013/EL522": 1242,
	"2013/EL523": 1243,
	"2013/EL524": 1244,
	"2013/EL525": 1245,
	"2013/EL526": 1246,
	"2013/EL527": 1247,
	"2013/EL531": 2106,
	"2013/EL532": 1249,
	"2013/EL533": 1251,
	"2013/EL541": 2107,
	"2013/EL542": 1257,
	"2013/EL543": 1258,
	"2013/EL611": 2108,
	"2013/EL612": 1253,
	"2013/EL613": 1254,
	"2013/EL621": 1260,
	"2013/EL622": 1261,
	"2013/EL623": 1262,
	"2013/EL624": 1263,
	"2013/EL631": 1264,
	"2013/EL632": 1265,
	"2013/EL633": 1266,
	"2013/EL641": 1267,
	"2013/EL642": 1268,
	"2013/EL643": 1269,
	"2013/EL644": 1270,
	"2013/EL645": 1271,
	"2013/EL651": 2109,
	"2013/EL652": 1274,
	"2013/EL653": 2110,
	"2013/ES111": 1064,
	"2013/ES112": 1065,
	"2013/ES113": 1066,
	"2013/ES114": 1067,
	"2013/ES120": 1068,
	"2013/ES130": 1069,
	"2013/ES211": 1070,
	"2013/ES212": 1071,
	"2013/ES213": 1072,
	"2013/ES220": 1073,
	"2013/ES230": 1074,
	"2013/ES241": 1075,
	"2013/ES242": 1076,
	"2013/ES243": 1077,
	"2013/ES300": 1078,
	"2013/ES411": 1079,
	"2013/ES412": 1080,
	"2013/ES413": 1081,
	"2013/ES414": 1082,
	"2013/ES415": 1083,
	"2013/ES416": 1084,
	"2013/ES417": 1085,
	"2013/ES418": 1086,
	"2013/ES419": 1087,
	"2013/ES421": 1088,
	"2013/ES422": 1089,
	"2013/ES423": 1090,
	"2013/ES424": 1091,
	"2013/ES425": 1092,
	"2013/ES431": 1093,
	"2013/ES432": 1094,
	"2013/ES511": 1095,
	"2013/ES512": 1096,
	"2013/ES513": 1097,
	"2013/ES514": 1098,
	"2013/ES521": 1099,
	"2013/ES522": 1100,
	"2013/ES523": 1101,
	"2013/ES531": 1933,
	"2013/ES532": 1934,
	"2013/ES533": 1935,
	"2013/ES611": 1103,
	"2013/ES612": 1104,
	"2013/ES613": 1105,
	"2013/ES614": 1106,
	"2013/ES615": 1107,
	"2013/ES616": 1108,
	"2013/ES617": 1109,
	"2013/ES618": 1110,
	"2013/ES620": 1111,
	"2013/ES630": 1112,
	"2013/ES640": 1113,
	"2013/ES703": 1936,
	"2013/ES704": 1937,
	"2013/ES705": 1938,
	"2013/ES706": 1939,
	"2013/ES707": 1940,
	"2013/ES708": 1941,
	"2013/ES709": 1942,
	"2013/FI193": 1129,
	"2013/FI194": 1130,
	"2013/FI195": 1131,
	"2013/FI196": 1943,
	"2013/FI197": 1944,
	"2013/FI1B1": 2039,
	"2013/FI1C1": 1122,
	"2013/FI1C2": 1123,
	"2013/FI1C3": 1124,
	"2013/FI1C4": 1125,
	"2013/FI1C5": 1126,
	"2013/FI1D1": 1116,
	"2013/FI1D2": 1117,
	"2013/FI1D3": 1118,
	"2013/FI1D4": 1119,
	"2013/FI1D5": 1132,
	"2013/FI1D6": 1133,
	"2013/FI1D7": 1134,
	"2013/FI200": 1135,
	"2013/FR101": 1136,
	"2013/FR102": 1137,
	"2013/FR103": 1138,
	"2013/FR104": 1139,
	"2013/FR105": 1140,
	"2013/FR106": 1141,
	"2013/FR107": 1142,
	"2013/FR108": 1143,
	"2013/FR211": 1144,
	"2013/FR212": 1145,
	"2013/FR213": 1146,
	"2013/FR214": 1147,
	"2013/FR221": 1148,
	"2013/FR222": 1149,
	"2013/FR223": 1150,
	"2013/FR231": 1151,
	"2013/FR232": 1152,
	"2013/FR241": 1153,
	"2013/FR242": 1154,
	"2013/FR243": 1155,
	"2013/FR244": 1156,
	"2013/FR245": 1157,
	"2013/FR246": 1158,
	"2013/FR251": 1159,
	"2013/FR252": 1160,
	"2013/FR253": 1161,
	"2013/FR261": 1162,
	"2013/FR262": 1163,
	"2013/FR263": 1164,
	"2013/FR264": 1165,
	"2013/FR301": 1166,
	"2013/FR302": 1167,
	"2013/FR411": 1168,
	"2013/FR412": 1169,
	"2013/FR413": 1170,
	"2013/FR414": 1171,
	"2013/FR421": 1172,
	"2013/FR422": 1173,
	"2013/FR431": 1174,
	"2013/FR432": 1175,
	"2013/FR433": 1176,
	"2013/FR434": 1177,
	"2013/FR511": 1178,
	"2013/FR512": 1179,
	"2013/FR513": 1180,
	"2013/FR514": 1181,
	"2013/FR515": 1182,
	"2013/FR521": 1183,
	"2013/FR522": 1184,
	"2013/FR523": 1185,
	"2013/FR524": 1186,
	"2013/FR531": 1187,
	"2013/FR532": 1188,
	"2013/FR533": 1189,
	"2013/FR534": 1190,
	"2013/FR611": 1191,
	"2013/FR612": 1192,
	"2013/FR613": 1193,
	"2013/FR614": 1194,
	"2013/FR615": 1195,
	"2013/FR621": 1196,
	"2013/FR622": 1197,
	"2013/FR623": 1198,
	"2013/FR624": 1199,
	"2013/FR625": 1200,
	"2013/FR626": 1201,
	"2013/FR627": 1202,
	"2013/FR628": 1203,
	"2013/FR631": 1204,
	"2013/FR632": 1205,
	"2013/FR633": 1206,
	"2013/FR711": 1207,
	"2013/FR712": 1208,
	"2013/FR713": 1209,
	"2013/FR714": 1210,
	"2013/FR715": 1211,
	"2013/FR716": 1212,
	"2013/FR717": 1213,
	"2013/FR718": 1214,
	"2013/FR721": 1215,
	"2013/FR722": 1216,
	"2013/FR723": 1217,
	"2013/FR724": 1218,
	"2013/FR811": 1219,
	"2013/FR812": 1220,
	"2013/FR813": 1221,
	"2013/FR814": 1222,
	"2013/FR815": 1223,
	"2013/FR821": 1224,
	"2013/FR822": 1225,
	"2013/FR823": 1226,
	"2013/FR824": 1227,
	"2013/FR825": 1228,
	"2013/FR826": 1229,
	"2013/FR831": 1230,
	"2013/FR832": 1231,
	"2013/FRA10": 2111,
	"2013/FRA20": 1233,
	"2013/FRA30": 1234,
	"2013/FRA40": 1235,
	"2013/FRA50": 2112,
	"2013/HR031": 1301,
	"2013/HR032": 1302,
	"2013/HR033": 1303,
	"2013/HR034": 1304,
	"2013/HR035": 1305,
	"2013/HR036": 1306,
	"2013/HR037": 1307,
	"2013/HR041": 2040,
	"2013/HR042": 2041,
	"2013/HR043": 2042,
	"2013/HR044": 2043,
	"2013/HR045": 2044,
	"2013/HR046": 2045,
	"2013/HR047": 2046,
	"2013/HR048": 2047,
	"2013/HR049": 2048,
	"2013/HR04A": 2049,
	"2013/HR04B": 2050,
	"2013/HR04C": 2051,
	"2013/HR04D": 2052,
	"2013/HR04E": 2053,
	"2013/HU101": 1308,
	"2013/HU102": 1309,
	"2013/HU211": 1310,
	"2013/HU212": 1311,
	"2013/HU213": 1312,
	"2013/HU221": 1313,
	"2013/HU222": 1314,
	"2013/HU223": 1315,
	"2013/HU231": 1316,
	"2013/HU232": 1317,
	"2013/HU233": 1318,
	"2013/HU311": 1319,
	"2013/HU312": 1320,
	"2013/HU313": 1321,
	"2013/HU321": 1322,
	"2013/HU322": 1323,
	"2013/HU323": 1324,
	"2013/HU331": 1325,
	"2013/HU332": 1326,
	"2013/HU333": 1327,
	"2013/IE011": 1328,
	"2013/IE012": 1329,
	"2013/IE013": 1330,
	"2013/IE021": 1331,
	"2013/IE022": 1332,
	"2013/IE023": 1333,
	"2013/IE024": 1334,
	"2013/IE025": 1335,
	"2013/IS001": 1945,
	"2013/IS002": 1946,
	"2013/ITC11": 1337,
	"2013/ITC12": 1338,
	"2013/ITC13": 1339,
	"2013/ITC14": 1340,
	"2013/ITC15": 1341,
	"2013/ITC16": 1342,
	"2013/ITC17": 1343,
	"2013/ITC18": 1344,
	"2013/ITC20": 1345,
	"2013/ITC31": 1346,
	"2013/ITC32": 1347,
	"2013/ITC33": 1348,
	"2013/ITC34": 1349,
	"2013/ITC41": 1350,
	"2013/ITC42": 1351,
	"2013/ITC43": 1352,
	"2013/ITC44": 1353,
	"2013/ITC46": 1355,
	"2013/ITC47": 1356,
	"2013/ITC48": 1357,
	"2013/ITC49": 1358,
	"2013/ITC4A": 1359,
	"2013/ITC4B": 1360,
	"2013/ITC4C": 2054,
	"2013/ITC4D": 2055,
	"2013/ITF11": 1404,
	"2013/ITF12": 1405,
	"2013/ITF13": 1406,
	"2013/ITF14": 1407,
	"2013/ITF21": 1408,
	"2013/ITF22": 1409,
	"2013/ITF31": 1410,
	"2013/ITF32": 1411,
	"2013/ITF33": 1412,
	"2013/ITF34": 1413,
	"2013/ITF35": 1414,
	"2013/ITF43": 1417,
	"2013/ITF44": 1418,
	"2013/ITF45": 1419,
	"2013/ITF46": 2056,
	"2013/ITF47": 2057,
	"2013/ITF48": 2058,
	"2013/ITF51": 1420,
	"2013/ITF52": 1421,
	"2013/ITF61": 1422,
	"2013/ITF62": 1423,
	"2013/ITF63": 1424,
	"2013/ITF64": 1425,
	"2013/ITF65": 1426,
	"2013/ITG11": 1427,
	"2013/ITG12": 1428,
	"2013/ITG13": 1429,
	"2013/ITG14": 1430,
	"2013/ITG15": 1431,
	"2013/ITG16": 1432,
	"2013/ITG17": 1433,
	"2013/ITG18": 1434,
	"2013/ITG19": 1435,
	"2013/ITG25": 1947,
	"2013/ITG26": 1948,
	"2013/ITG27": 1949,
	"2013/ITG28": 1950,
	"2013/ITG29": 1951,
	"2013/ITG2A": 1952,
	"2013/ITG2B": 1953,
	"2013/ITG2C": 1954,
	"2013/ITH10": 1361,
	"2013/ITH20": 1362,
	"2013/ITH31": 1363,
	"2013/ITH32": 1364,
	"2013/ITH33": 1365,
	"2013/ITH34": 1366,
	"2013/ITH35": 1367,
	"2013/ITH36": 1368,
	"2013/ITH37": 1369,
	"2013/ITH41": 1370,
	"2013/ITH42": 1371,
	"2013/ITH43": 1372,
	"2013/ITH44": 1373,
	"2013/ITH51": 1374,
	"2013/ITH52": 1375,
	"2013/ITH53": 1376,
	"2013/ITH54": 1377,
	"2013/ITH55": 1378,
	"2013/ITH56": 1379,
	"2013/ITH57": 1380,
	"2013/ITH58": 1381,
	"2013/ITH59": 2059,
	"2013/ITI11": 1383,
	"2013/ITI12": 1384,
	"2013/ITI13": 1385,
	"2013/ITI14": 1386,
	"2013/ITI15": 1387,
	"2013/ITI16": 1388,
	"2013/ITI17": 1389,
	"2013/ITI18": 1390,
	"2013/ITI19": 1391,
	"2013/ITI1A": 1392,
	"2013/ITI21": 1393,
	"2013/ITI22": 1394,
	"2013/ITI31": 2060,
	"2013/ITI32": 1396,
	"2013/ITI33": 1397,
	"2013/ITI34": 2061,
	"2013/ITI35": 2062,
	"2013/ITI41": 1399,
	"2013/ITI42": 1400,
	"2013/ITI43": 1401,
	"2013/ITI44": 1402,
	"2013/ITI45": 1403,
	"2013/LI000": 1440,
	"2013/LT001": 1441,
	"2013/LT002": 1442,
	"2013/LT003": 1443,
	"2013/LT004": 1444,
	"2013/LT005": 1445,
	"2013/LT006": 1446,
	"2013/LT007": 1447,
	"2013/LT008": 1448,
	"2013/LT009": 1449,
	"2013/LT00A": 1450,
	"2013/LU000": 1451,
	"2013/LV003": 1452,
	"2013/LV005": 1453,
	"2013/LV006": 1454,
	"2013/LV007": 1455,
	"2013/LV008": 1456,
	"2013/LV009": 1457,
	"2013/ME000": 1955,
	"2013/MK001": 1956,
	"2013/MK002": 1957,
	"2013/MK003": 1958,
	"2013/MK004": 1959,
	"2013/MK005": 1960,
	"2013/MK006": 1961,
	"2013/MK007": 1962,
	"2013/MK008": 1963,
	"2013/MT001": 1458,
	"2013/MT002": 1459,
	"2013/NL111": 1460,
	"2013/NL112": 1461,
	"2013/NL113": 1462,
	"2013/NL121": 1463,
	"2013/NL122": 1464,
	"2013/NL123": 1465,
	"2013/NL131": 1466,
	"2013/NL132": 1467,
	"2013/NL133": 1468,
	"2013/NL211": 1469,
	"2013/NL212": 1470,
	"2013/NL213": 1471,
	"2013/NL221": 1472,
	"2013/NL224": 1475,
	"2013/NL225": 1964,
	"2013/NL226": 1965,
	"2013/NL230": 1476,
	"2013/NL310": 1477,
	"2013/NL321": 1478,
	"2013/NL322": 1479,
	"2013/NL323": 1480,
	"2013/NL324": 1481,
	"2013/NL325": 1482,
	"2013/NL326": 1483,
	"2013/NL327": 1484,
	"2013/NL332": 1486,
	"2013/NL333": 1487,
	"2013/NL337": 2063,
	"2013/NL338": 2064,
	"2013/NL339": 2065,
	"2013/NL33A": 2066,
	"2013/NL341": 1491,
	"2013/NL342": 1492,
	"2013/NL411": 1493,
	"2013/NL412": 1494,
	"2013/NL413": 1495,
	"2013/NL414": 1496,
	"2013/NL421": 1497,
	"2013/NL422": 1498,
	"2013/NL423": 1499,
	"2013/NO011": 1500,
	"2013/NO012": 1501,
	"2013/NO021": 1502,
	"2013/NO022": 1503,
	"2013/NO031": 1504,
	"2013/NO032": 1505,
	"2013/NO033": 1506,
	"2013/NO034": 1507,
	"2013/NO041": 1508,
	"2013/NO042": 1509,
	"2013/NO043": 1510,
	"2013/NO051": 1511,
	"2013/NO052": 1512,
	"2013/NO053": 1513,
	"2013/NO061": 1514,
	"2013/NO062": 1515,
	"2013/NO071": 1516,
	"2013/NO072": 1517,
	"2013/NO073": 1518,
	"2013/PL113": 1521,
	"2013/PL114": 1966,
	"2013/PL115": 1967,
	"2013/PL116": 1968,
	"2013/PL117": 1969,
	"2013/PL127": 1526,
	"2013/PL128": 1970,
	"2013/PL129": 1971,
	"2013/PL12A": 1972,
	"2013/PL12B": 2113,
	"2013/PL12C": 2114,
	"2013/PL12D": 2115,
	"2013/PL12E": 2116,
	"2013/PL213": 1529,
	"2013/PL214": 1973,
	"2013/PL217": 1976,
	"2013/PL218": 2117,
	"2013/PL219": 2118,
	"2013/PL21A": 2119,
	"2013/PL224": 1530,
	"2013/PL225": 1531,
	"2013/PL227": 1533,
	"2013/PL228": 1977,
	"2013/PL229": 1978,
	"2013/PL22A": 1979,
	"2013/PL22B": 1980,
	"2013/PL22C": 1981,
	"2013/PL311": 1534,
	"2013/PL312": 1535,
	"2013/PL314": 1982,
	"2013/PL315": 1983,
	"2013/PL323": 1984,
	"2013/PL324": 1985,
	"2013/PL325": 1986,
	"2013/PL326": 1987,
	"2013/PL331": 1988,
	"2013/PL332": 1989,
	"2013/PL343": 1990,
	"2013/PL344": 1991,
	"2013/PL345": 1992,
	"2013/PL411": 1542,
	"2013/PL414": 1545,
	"2013/PL415": 1546,
	"2013/PL416": 1993,
	"2013/PL417": 1994,
	"2013/PL418": 1995,
	"2013/PL424": 1997,
	"2013/PL426": 2120,
	"2013/PL427": 2121,
	"2013/PL428": 2122,
	"2013/PL431": 1549,
	"2013/PL432": 1550,
	"2013/PL514": 1554,
	"2013/PL515": 1999,
	"2013/PL516": 2000,
	"2013/PL517": 2001,
	"2013/PL518": 2002,
	"2013/PL523": 2123,
	"2013/PL524": 2124,
	"2013/PL613": 2005,
	"2013/PL616": 2125,
	"2013/PL617": 2126,
	"2013/PL618": 2127,
	"2013/PL619": 2128,
	"2013/PL621": 1558,
	"2013/PL622": 1559,
	"2013/PL623": 1560,
	"2013/PL633": 1563,
	"2013/PL634": 2008,
	"2013/PL636": 2129,
	"2013/PL637": 2130,
	"2013/PL638": 2131,
	"2013/PT111": 1564,
	"2013/PT112": 1565,
	"2013/PT119": 2132,
	"2013/PT11A": 2133,
	"2013/PT11B": 2134,
	"2013/PT11C": 2135,
	"2013/PT11D": 2136,
	"2013/PT11E": 2137,
	"2013/PT150": 1572,
	"2013/PT16B": 1583,
	"2013/PT16D": 2138,
	"2013/PT16E": 2139,
	"2013/PT16F": 2140,
	"2013/PT16G": 2141,
	"2013/PT16H": 2142,
	"2013/PT16I": 2143,
	"2013/PT16J": 2144,
	"2013/PT170": 2145,
	"2013/PT181": 1587,
	"2013/PT184": 1590,
	"2013/PT185": 1591,
	"2013/PT186": 2146,
	"2013/PT187": 2147,
	"2013/PT200": 1592,
	"2013/PT300": 1593,
	"2013/RO111": 1594,
	"2013/RO112": 1595,
	"2013/RO113": 1596,
	"2013/RO114": 1597,
	"2013/RO115": 1598,
	"2013/RO116": 1599,
	"2013/RO121": 1600,
	"2013/RO122": 1601,
	"2013/RO123": 1602,
	"2013/RO124": 1603,
	"2013/RO125": 1604,
	"2013/RO126": 1605,
	"2013/RO211": 1606,
	"2013/RO212": 1607,
	"2013/RO213": 1608,
	"2013/RO214": 1609,
	"2013/RO215": 1610,
	"2013/RO216": 1611,
	"2013/RO221": 1612,
	"2013/RO222": 1613,
	"2013/RO223": 1614,
	"2013/RO224": 1615,
	"2013/RO225": 1616,
	"2013/RO226": 1617,
	"2013/RO311": 1618,
	"2013/RO312": 1619,
	"2013/RO313": 1620,
	"2013/RO314": 1621,
	"2013/RO315": 1622,
	"2013/RO316": 1623,
	"2013/RO317": 1624,
	"2013/RO321": 1625,
	"2013/RO322": 1626,
	"2013/RO411": 1627,
	"2013/RO412": 1628,
	"2013/RO413": 1629,
	"2013/RO414": 1630,
	"2013/RO415": 1631,
	"2013/RO421": 1632,
	"2013/RO422": 1633,
	"2013/RO423": 1634,
	"2013/RO424": 1635,
	"2013/SE110": 1636,
	"2013/SE121": 2010,
	"2013/SE122": 1638,
	"2013/SE123": 1639,
	"2013/SE124": 1640,
	"2013/SE125": 2011,
	"2013/SE211": 1651,
	"2013/SE212": 1652,
	"2013/SE213": 1653,
	"2013/SE214": 1654,
	"2013/SE221": 1642,
	"2013/SE224": 1643,
	"2013/SE231": 1655,
	"2013/SE232": 1656,
	"2013/SE311": 1644,
	"2013/SE312": 1645,
	"2013/SE313": 1646,
	"2013/SE321": 1647,
	"2013/SE322": 1648,
	"2013/SE331": 1649,
	"2013/SE332": 1650,
	"2013/SI031": 1657,
	"2013/SI032": 1658,
	"2013/SI033": 1659,
	"2013/SI034": 2148,
	"2013/SI035": 2149,
	"2013/SI036": 2150,
	"2013/SI037": 1667,
	"2013/SI038": 2151,
	"2013/SI041": 2152,
	"2013/SI042": 1663,
	"2013/SI043": 1665,
	"2013/SI044": 1666,
	"2013/SK010": 1669,
	"2013/SK021": 1670,
	"2013/SK022": 1671,
	"2013/SK023": 1672,
	"2013/SK031": 1673,
	"2013/SK032": 1674,
	"2013/SK041": 1675,
	"2013/SK042": 1676,
	"2013/TR100": 1677,
	"2013/TR211": 1678,
	"2013/TR212": 1679,
	"2013/TR213": 1680,
	"2013/TR221": 1681,
	"2013/TR222": 1682,
	"2013/TR310": 1683,
	"2013/TR321": 1684,
	"2013/TR322": 1685,
	"2013/TR323": 1686,
	"2013/TR331": 1687,
	"2013/TR332": 1688,
	"2013/TR333": 1689,
	"2013/TR334": 1690,
	"2013/TR411": 1691,
	"2013/TR412": 1692,
	"2013/TR413": 1693,
	"2013/TR421": 1694,
	"2013/TR422": 1695,
	"2013/TR423": 1696,
	"2013/TR424": 1697,
	"2013/TR425": 1698,
	"2013/TR510": 1699,
	"2013/TR521": 1700,
	"2013/TR522": 1701,
	"2013/TR611": 1702,
	"2013/TR612": 1703,
	"2013/TR613": 1704,
	"2013/TR621": 1705,
	"2013/TR622": 1706,
	"2013/TR631": 1707,
	"2013/TR632": 1708,
	"2013/TR633": 1709,
	"2013/TR711": 1710,
	"2013/TR712": 1711,
	"2013/TR713": 1712,
	"2013/TR714": 1713,
	"2013/TR715": 1714,
	"2013/TR721": 1715,
	"2013/TR722": 1716,
	"2013/TR723": 1717,
	"2013/TR811": 1718,
	"2013/TR812": 1719,
	"2013/TR813": 1720,
	"2013/TR821": 1721,
	"2013/TR822": 1722,
	"2013/TR823": 1723,
	"2013/TR831": 1724,
	"2013/TR832": 1725,
	"2013/TR833": 1726,
	"2013/TR834": 1727,
	"2013/TR901": 1728,
	"2013/TR902": 1729,
	"2013/TR903": 1730,
	"2013/TR904": 1731,
	"2013/TR905": 1732,
	"2013/TR906": 1733,
	"2013/TRA11": 1734,
	"2013/TRA12": 1735,
	"2013/TRA13": 1736,
	"2013/TRA21": 1737,
	"2013/TRA22": 1738,
	"2013/TRA23": 1739,
	"2013/TRA24": 1740,
	"2013/TRB11": 1741,
	"2013/TRB12": 1742,
	"2013/TRB13": 1743,
	"2013/TRB14": 1744,
	"2013/TRB21": 1745,
	"2013/TRB22": 1746,
	"2013/TRB23": 1747,
	"2013/TRB24": 1748,
	"2013/TRC11": 1749,
	"2013/TRC12": 1750,
	"2013/TRC13": 1751,
	"2013/TRC21": 1752,
	"2013/TRC22": 1753,
	"2013/TRC31": 1754,
	"2013/TRC32": 1755,
	"2013/TRC33": 1756,
	"2013/TRC34": 1757,
	"2013/UKC11": 1758,
	"2013/UKC12": 1759,
	"2013/UKC13": 1760,
	"2013/UKC14": 1761,
	"2013/UKC21": 1762,
	"2013/UKC22": 1763,
	"2013/UKC23": 1764,
	"2013/UKD11": 1765,
	"2013/UKD12": 1766,
	"2013/UKD33": 2153,
	"2013/UKD34": 2154,
	"2013/UKD35": 2155,
	"2013/UKD36": 2156,
	"2013/UKD37": 2157,
	"2013/UKD41": 1771,
	"2013/UKD42": 1772,
	"2013/UKD44": 2158,
	"2013/UKD45": 2159,
	"2013/UKD46": 2160,
	"2013/UKD47": 2161,
	"2013/UKD61": 2067,
	"2013/UKD62": 2068,
	"2013/UKD63": 2069,
	"2013/UKD71": 2070,
	"2013/UKD72": 1775,
	"2013/UKD73": 1776,
	"2013/UKD74": 1777,
	"2013/UKE11": 1778,
	"2013/UKE12": 1779,
	"2013/UKE13": 1780,
	"2013/UKE21": 1781,
	"2013/UKE22": 1782,
	"2013/UKE31": 1783,
	"2013/UKE32": 1784,
	"2013/UKE41": 1785,
	"2013/UKE42": 1786,
	"2013/UKE44": 2071,
	"2013/UKE45": 2072,
	"2013/UKF11": 1788,
	"2013/UKF12": 1789,
	"2013/UKF13": 1790,
	"2013/UKF14": 1791,
	"2013/UKF15": 1792,
	"2013/UKF16": 1793,
	"2013/UKF21": 1794,
	"2013/UKF22": 1795,
	"2013/UKF24": 2073,
	"2013/UKF25": 2074,
	"2013/UKF30": 1797,
	"2013/UKG11": 1798,
	"2013/UKG12": 1799,
	"2013/UKG13": 1800,
	"2013/UKG21": 1801,
	"2013/UKG22": 1802,
	"2013/UKG23": 1803,
	"2013/UKG24": 1804,
	"2013/UKG31": 1805,
	"2013/UKG32": 1806,
	"2013/UKG33": 1807,
	"2013/UKG36": 2075,
	"2013/UKG37": 2076,
	"2013/UKG38": 2077,
	"2013/UKG39": 2078,
	"2013/UKH11": 1810,
	"2013/UKH12": 1811,
	"2013/UKH14": 1813,
	"2013/UKH15": 2162,
	"2013/UKH16": 2163,
	"2013/UKH17": 2164,
	"2013/UKH21": 1814,
	"2013/UKH23": 1816,
	"2013/UKH24": 2079,
	"2013/UKH25": 2080,
	"2013/UKH31": 1817,
	"2013/UKH32": 1818,
	"2013/UKH34": 2165,
	"2013/UKH35": 2166,
	"2013/UKH36": 2167,
	"2013/UKH37": 2168,
	"2013/UKI31": 2169,
	"2013/UKI32": 2170,
	"2013/UKI33": 2171,
	"2013/UKI34": 2172,
	"2013/UKI41": 2173,
	"2013/UKI42": 2174,
	"2013/UKI43": 2175,
	"2013/UKI44": 2176,
	"2013/UKI45": 2177,
	"2013/UKI51": 2178,
	"2013/UKI52": 2179,
	"2013/UKI53": 2180,
	"2013/UKI54": 2181,
	"2013/UKI61": 2182,
	"2013/UKI62": 2183,
	"2013/UKI63": 2184,
	"2013/UKI71": 2185,
	"2013/UKI72": 2186,
	"2013/UKI73": 2187,
	"2013/UKI74": 2188,
	"2013/UKI75": 2189,
	"2013/UKJ11": 1825,
	"2013/UKJ12": 1826,
	"2013/UKJ13": 1827,
	"2013/UKJ14": 1828,
	"2013/UKJ21": 1829,
	"2013/UKJ22": 1830,
	"2013/UKJ25": 2190,
	"2013/UKJ26": 2191,
	"2013/UKJ27": 2192,
	"2013/UKJ28": 2193,
	"2013/UKJ31": 1833,
	"2013/UKJ32": 1834,
	"2013/UKJ34": 1836,
	"2013/UKJ35": 2194,
	"2013/UKJ36": 2195,
	"2013/UKJ37": 2196,
	"2013/UKJ41": 1837,
	"2013/UKJ43": 2197,
	"2013/UKJ44": 2198,
	"2013/UKJ45": 2199,
	"2013/UKJ46": 2200,
	"2013/UKK11": 1839,
	"2013/UKK12": 1840,
	"2013/UKK13": 1841,
	"2013/UKK14": 1842,
	"2013/UKK15": 1843,
	"2013/UKK21": 1844,
	"2013/UKK22": 1845,
	"2013/UKK23": 1846,
	"2013/UKK30": 1847,
	"2013/UKK41": 1848,
	"2013/UKK42": 1849,
	"2013/UKK43": 1850,
	"2013/UKL11": 1851,
	"2013/UKL12": 1852,
	"2013/UKL13": 1853,
	"2013/UKL14": 1854,
	"2013/UKL15": 1855,
	"2013/UKL16": 1856,
	"2013/UKL17": 1857,
	"2013/UKL18": 1858,
	"2013/UKL21": 1859,
	"2013/UKL22": 1860,
	"2013/UKL23": 1861,
	"2013/UKL24": 1862,
	"2013/UKM21": 1864,
	"2013/UKM22": 1865,
	"2013/UKM23": 1866,
	"2013/UKM24": 1867,
	"2013/UKM25": 1868,
	"2013/UKM26": 1869,
	"2013/UKM27": 1870,
	"2013/UKM28": 1871,
	"2013/UKM31": 1872,
	"2013/UKM32": 1873,
	"2013/UKM33": 1874,
	"2013/UKM34": 1875,
	"2013/UKM35": 1876,
	"2013/UKM36": 1877,
	"2013/UKM37": 1878,
	"2013/UKM38": 1879,
	"2013/UKM50": 2012,
	"2013/UKM61": 1880,
	"2013/UKM62": 2013,
	"2013/UKM63": 1882,
	"2013/UKM64": 1883,
	"2013/UKM65": 1884,
	"2013/UKM66": 1885,
	"2013/UKN01": 1886,
	"2013/UKN02": 1887,
	"2013/UKN03": 1888,
	"2013/UKN04": 1889,
	"2013/UKN05": 1890,
	"2016/AL": 2201,
	"2016/AT": 0,
	"2016/BE": 1,
	"2016/BG": 2,
	"2016/CH": 3,
	"2016/CY": 4,
	"2016/CZ": 5,
	"2016/DE": 6,
	"2016/DK": 7,
	"2016/EE": 8,
	"2016/EL": 12,
	"2016/ES": 9,
	"2016/FI": 10,
	"2016/FR": 11,
	"2016/HR": 13,
	"2016/HU": 14,
	"2016/IE": 15,
	"2016/IS": 16,
	"2016/IT": 17,
	"2016/LI": 18,
	"2016/LT": 19,
	"2016/LU": 20,
	"2016/LV": 21,
	"2016/ME": 1891,
	"2016/MK": 1892,
	"2016/MT": 22,
	"2016/NL": 23,
	"2016/NO": 24,
	"2016/PL": 25,
	"2016/PT": 26,
	"2016/RO": 27,
	"2016/RS": 2202,
	"2016/SE": 28,
	"2016/SI": 29,
	"2016/SK": 30,
	"2016/TR": 31,
	"2016/UK": 32,
	"2016/AL0": 2203,
	"2016/AT1": 33,
	"2016/AT2": 34,
	"2016/AT3": 35,
	"2016/BE1": 36,
	"2016/BE2": 37,
	"2016/BE3": 38,
	"2016/BG3": 39,
	"2016/BG4": 40,
	"2016/CH0": 41,
	"2016/CY0": 42,
	"2016/CZ0": 43,
	"2016/DE1": 44,
	"2016/DE2": 45,
	"2016/DE3": 46,
	"2016/DE4": 47,
	"2016/DE5": 48,
	"2016/DE6": 49,
	"2016/DE7": 50,
	"2016/DE8": 51,
	"2016/DE9": 52,
	"2016/DEA": 53,
	"2016/DEB": 54,
	"2016/DEC": 55,
	"2016/DED": 56,
	"2016/DEE": 57,
	"2016/DEF": 58,
	"2016/DEG": 59,
	"2016/DK0": 60,
	"2016/EE0": 61,
	"2016/EL3": 82,
	"2016/EL4": 83,
	"2016/EL5": 2081,
	"2016/EL6": 2082,
	"2016/ES1": 62,
	"2016/ES2": 63,
	"2016/ES3": 64,
	"2016/ES4": 65,
	"2016/ES5": 66,
	"2016/ES6": 67,
	"2016/ES7": 68,
	"2016/FI1": 69,
	"2016/FI2": 70,
	"2016/FR1": 71,
	"2016/FRB": 2204,
	"2016/FRC": 2205,
	"2016/FRD": 2206,
	"2016/FRE": 2207,
	"2016/FRF": 2208,
	"2016/FRG": 2209,
	"2016/FRH": 2210,
	"2016/FRI": 2211,
	"2016/FRJ": 2212,
	"2016/FRK": 77,
	"2016/FRL": 2213,
	"2016/FRM": 2214,
	"2016/FRY": 2083,
	"2016/HR0": 84,
	"2016/HU1": 85,
	"2016/HU2": 86,
	"2016/HU3": 87,
	"2016/IE0": 88,
	"2016/IS0": 89,
	"2016/ITC": 90,
	"2016/ITF": 93,
	"2016/ITG": 94,
	"2016/ITH": 2014,
	"2016/ITI": 2015,
	"2016/LI0": 95,
	"2016/LT0": 96,
	"2016/LU0": 97,
	"2016/LV0": 98,
	"2016/ME0": 1893,
	"2016/MK0": 1894,
	"2016/MT0": 99,
	"2016/NL1": 100,
	"2016/NL2": 101,
	"2016/NL3": 102,
	"2016/NL4": 103,
	"2016/NO0": 104,
	"2016/PL2": 106,
	"2016/PL4": 108,
	"2016/PL5": 109,
	"2016/PL6": 110,
	"2016/PL7": 2215,
	"2016/PL8": 2216,
	"2016/PL9": 2217,
	"2016/PT1": 111,
	"2016/PT2": 112,
	"2016/PT3": 113,
	"2016/RO1": 114,
	"2016/RO2": 115,
	"2016/RO3": 116,
	"2016/RO4": 117,
	"2016/RS1": 2218,
	"2016/RS2": 2219,
	"2016/SE1": 1895,
	"2016/SE2": 1896,
	"2016/SE3": 1897,
	"2016/SI0": 119,
	"2016/SK0": 120,
	"2016/TR1": 121,
	"2016/TR2": 122,
	"2016/TR3": 123,
	"2016/TR4": 124,
	"2016/TR5": 125,
	"2016/TR6": 126,
	"2016/TR7": 127,
	"2016/TR8": 128,
	"2016/TR9": 129,
	"2016/TRA": 130,
	"2016/TRB": 131,
	"2016/TRC": 132,
	"2016/UKC": 133,
	"2016/UKD": 134,
	"2016/UKE": 135,
	"2016/UKF": 136,
	"2016/UKG": 137,
	"2016/UKH": 138,
	"2016/UKI": 139,
	"2016/UKJ": 140,
	"2016/UKK": 141,
	"2016/UKL": 142,
	"2016/UKM": 143,
	"2016/UKN": 144,
	"2016/AL01": 2220,
	"2016/AL02": 2221,
	"2016/AL03": 2222,
	"2016/AT11": 145,
	"2016/AT12": 146,
	"2016/AT13": 147,
	"2016/AT21": 148,
	"2016/AT22": 149,
	"2016/AT31": 150,
	"2016/AT32": 151,
	"2016/AT33": 152,
	"2016/AT34": 153,
	"2016/BE10": 154,
	"2016/BE21": 155,
	"2016/BE22": 156,
	"2016/BE23": 157,
	"2016/BE24": 158,
	"2016/BE25": 159,
	"2016/BE31": 160,
	"2016/BE32": 161,
	"2016/BE33": 162,
	"2016/BE34": 163,
	"2016/BE35": 164,
	"2016/BG31": 165,
	"2016/BG32": 166,
	"2016/BG33": 167,
	"2016/BG34": 168,
	"2016/BG41": 169,
	"2016/BG42": 170,
	"2016/CH01": 171,
	"2016/CH02": 172,
	"2016/CH03": 173,
	"2016/CH04": 174,
	"2016/CH05": 175,
	"2016/CH06": 176,
	"2016/CH07": 177,
	"2016/CY00": 178,
	"2016/CZ01": 179,
	"2016/CZ02": 180,
	"2016/CZ03": 181,
	"2016/CZ04": 182,
	"2016/CZ05": 183,
	"2016/CZ06": 184,
	"2016/CZ07": 185,
	"2016/CZ08": 186,
	"2016/DE11": 187,
	"2016/DE12": 188,
	"2016/DE13": 189,
	"2016/DE14": 190,
	"2016/DE21": 191,
	"2016/DE22": 192,
	"2016/DE23": 193,
	"2016/DE24": 194,
	"2016/DE25": 195,
	"2016/DE26": 196,
	"2016/DE27": 197,
	"2016/DE30": 198,
	"2016/DE40": 2017,
	"2016/DE50": 201,
	"2016/DE60": 202,
	"2016/DE71": 203,
	"2016/DE72": 204,
	"2016/DE73": 205,
	"2016/DE80": 206,
	"2016/DE91": 207,
	"2016/DE92": 208,
	"2016/DE93": 209,
	"2016/DE94": 210,
	"2016/DEA1": 211,
	"2016/DEA2": 212,
	"2016/DEA3": 213,
	"2016/DEA4": 214,
	"2016/DEA5": 215,
	"2016/DEB1": 216,
	"2016/DEB2": 217,
	"2016/DEB3": 218,
	"2016/DEC0": 219,
	"2016/DED2": 221,
	"2016/DED4": 2018,
	"2016/DED5": 2019,
	"2016/DEE0": 1898,
	"2016/DEF0": 226,
	"2016/DEG0": 227,
	"2016/DK01": 1899,
	"2016/DK02": 1900,
	"2016/DK03": 1901,
	"2016/DK04": 1902,
	"2016/DK05": 1903,
	"2016/EE00": 229,
	"2016/EL30": 289,
	"2016/EL41": 290,
	"2016/EL42": 291,
	"2016/EL43": 292,
	"2016/EL51": 280,
	"2016/EL52": 281,
	"2016/EL53": 282,
	"2016/EL54": 284,
	"2016/EL61": 283,
	"2016/EL62": 285,
	"2016/EL63": 286,
	"2016/EL64": 287,
	"2016/EL65": 288,
	"2016/ES11": 230,
	"2016/ES12": 231,
	"2016/ES13": 232,
	"2016/ES21": 233,
	"2016/ES22": 234,
	"2016/ES23": 235,
	"2016/ES24": 236,
	"2016/ES30": 237,
	"2016/ES41": 238,
	"2016/ES42": 239,
	"2016/ES43": 240,
	"2016/ES51": 241,
	"2016/ES52": 242,
	"2016/ES53": 243,
	"2016/ES61": 244,
	"2016/ES62": 245,
	"2016/ES63": 246,
	"2016/ES64": 247,
	"2016/ES70": 248,
	"2016/FI19": 251,
	"2016/FI1B": 2020,
	"2016/FI1C": 2021,
	"2016/FI1D": 2022,
	"2016/FI20": 253,
	"2016/FR10": 254,
	"2016/FRB0": 258,
	"2016/FRC1": 260,
	"2016/FRC2": 264,
	"2016/FRD1": 259,
	"2016/FRD2": 257,
	"2016/FRE1": 261,
	"2016/FRE2": 256,
	"2016/FRF1": 263,
	"2016/FRF2": 255,
	"2016/FRF3": 262,
	"2016/FRG0": 265,
	"2016/FRH0": 266,
	"2016/FRI1": 268,
	"2016/FRI2": 270,
	"2016/FRI3": 267,
	"2016/FRJ1": 273,
	"2016/FRJ2": 269,
	"2016/FRK1": 272,
	"2016/FRK2": 271,
	"2016/FRL0": 274,
	"2016/FRM0": 275,
	"2016/FRY1": 2084,
	"2016/FRY2": 277,
	"2016/FRY3": 278,
	"2016/FRY4": 279,
	"2016/FRY5": 2085,
	"2016/HR03": 295,
	"2016/HR04": 2023,
	"2016/HU11": 2223,
	"2016/HU12": 2224,
	"2016/HU21": 297,
	"2016/HU22": 298,
	"2016/HU23": 299,
	"2016/HU31": 300,
	"2016/HU32": 301,
	"2016/HU33": 302,
	"2016/IE04": 2225,
	"2016/IE05": 2226,
	"2016/IE06": 2227,
	"2016/IS00": 305,
	"2016/ITC1": 306,
	"2016/ITC2": 307,
	"2016/ITC3": 308,
	"2016/ITC4": 309,
	"2016/ITF1": 319,
	"2016/ITF2": 320,
	"2016/ITF3": 321,
	"2016/ITF4": 322,
	"2016/ITF5": 323,
	"2016/ITF6": 324,
	"2016/ITG1": 325,
	"2016/ITG2": 326,
	"2016/ITH1": 310,
	"2016/ITH2": 311,
	"2016/ITH3": 312,
	"2016/ITH4": 313,
	"2016/ITH5": 2024,
	"2016/ITI1": 315,
	"2016/ITI2": 316,
	"2016/ITI3": 2025,
	"2016/ITI4": 318,
	"2016/LI00": 327,
	"2016/LT01": 2228,
	"2016/LT02": 2229,
	"2016/LU00": 329,
	"2016/LV00": 330,
	"2016/ME00": 1904,
	"2016/MK00": 1905,
	"2016/MT00": 331,
	"2016/NL11": 332,
	"2016/NL12": 333,
	"2016/NL13": 334,
	"2016/NL21": 335,
	"2016/NL22": 336,
	"2016/NL23": 337,
	"2016/NL31": 338,
	"2016/NL32": 339,
	"2016/NL33": 340,
	"2016/NL34": 341,
	"2016/NL41": 342,
	"2016/NL42": 343,
	"2016/NO01": 344,
	"2016/NO02": 345,
	"2016/NO03": 346,
	"2016/NO04": 347,
	"2016/NO05": 348,
	"2016/NO06": 349,
	"2016/NO07": 350,
	"2016/PL21": 353,
	"2016/PL22": 354,
	"2016/PL41": 359,
	"2016/PL42": 360,
	"2016/PL43": 361,
	"2016/PL51": 362,
	"2016/PL52": 363,
	"2016/PL61": 364,
	"2016/PL62": 365,
	"2016/PL63": 366,
	"2016/PL71": 351,
	"2016/PL72": 357,
	"2016/PL81": 355,
	"2016/PL82": 356,
	"2016/PL84": 358,
	"2016/PL91": 2230,
	"2016/PL92": 2231,
	"2016/PT11": 367,
	"2016/PT15": 368,
	"2016/PT16": 369,
	"2016/PT17": 370,
	"2016/PT18": 371,
	"2016/PT20": 372,
	"2016/PT30": 373,
	"2016/RO11": 374,
	"2016/RO12": 375,
	"2016/RO21": 376,
	"2016/RO22": 377,
	"2016/RO31": 378,
	"2016/RO32": 379,
	"2016/RO41": 380,
	"2016/RO42": 381,
	"2016/RS11": 2232,
	"2016/RS12": 2233,
	"2016/RS21": 2234,
	"2016/RS22": 2235,
	"2016/SE11": 382,
	"2016/SE12": 383,
	"2016/SE21": 388,
	"2016/SE22": 384,
	"2016/SE23": 389,
	"2016/SE31": 385,
	"2016/SE32": 386,
	"2016/SE33": 387,
	"2016/SI03": 2086,
	"2016/SI04": 2087,
	"2016/SK01": 391,
	"2016/SK02": 392,
	"2016/SK03": 393,
	"2016/SK04": 394,
	"2016/TR10": 395,
	"2016/TR21": 396,
	"2016/TR22": 397,
	"2016/TR31": 398,
	"2016/TR32": 399,
	"2016/TR33": 400,
	"2016/TR41": 401,
	"2016/TR42": 402,
	"2016/TR51": 403,
	"2016/TR52": 404,
	"2016/TR61": 405,
	"2016/TR62": 406,
	"2016/TR63": 407,
	"2016/TR71": 408,
	"2016/TR72": 409,
	"2016/TR81": 410,
	"2016/TR82": 411,
	"2016/TR83": 412,
	"2016/TR90": 413,
	"2016/TRA1": 414,
	"2016/TRA2": 415,
	"2016/TRB1": 416,
	"2016/TRB2": 417,
	"2016/TRC1": 418,
	"2016/TRC2": 419,
	"2016/TRC3": 420,
	"2016/UKC1": 421,
	"2016/UKC2": 422,
	"2016/UKD1": 423,
	"2016/UKD3": 425,
	"2016/UKD4": 426,
	"2016/UKD6": 2026,
	"2016/UKD7": 2027,
	"2016/UKE1": 428,
	"2016/UKE2": 429,
	"2016/UKE3": 430,
	"2016/UKE4": 431,
	"2016/UKF1": 432,
	"2016/UKF2": 433,
	"2016/UKF3": 434,
	"2016/UKG1": 435,
	"2016/UKG2": 436,
	"2016/UKG3": 437,
	"2016/UKH1": 438,
	"2016/UKH2": 439,
	"2016/UKH3": 440,
	"2016/UKI3": 2088,
	"2016/UKI4": 2089,
	"2016/UKI5": 2090,
	"2016/UKI6": 2091,
	"2016/UKI7": 2092,
	"2016/UKJ1": 443,
	"2016/UKJ2": 444,
	"2016/UKJ3": 445,
	"2016/UKJ4": 446,
	"2016/UKK1": 447,
	"2016/UKK2": 448,
	"2016/UKK3": 449,
	"2016/UKK4": 450,
	"2016/UKL1": 451,
	"2016/UKL2": 452,
	"2016/UKM5": 1908,
	"2016/UKM6": 1909,
	"2016/UKM7": 454,
	"2016/UKM8": 2236,
	"2016/UKM9": 2237,
	"2016/UKN0": 457,
	"2016/AL011": 2238,
	"2016/AL012": 2239,
	"2016/AL013": 2240,
	"2016/AL014": 2241,
	"2016/AL015": 2242,
	"2016/AL021": 2243,
	"2016/AL022": 2244,
	"2016/AL031": 2245,
	"2016/AL032": 2246,
	"2016/AL033": 2247,
	"2016/AL034": 2248,
	"2016/AL035": 2249,
	"2016/AT111": 458,
	"2016/AT112": 459,
	"2016/AT113": 460,
	"2016/AT121": 461,
	"2016/AT122": 462,
	"2016/AT123": 463,
	"2016/AT124": 464,
	"2016/AT125": 465,
	"2016/AT126": 466,
	"2016/AT127": 467,
	"2016/AT130": 468,
	"2016/AT211": 469,
	"2016/AT212": 470,
	"2016/AT213": 471,
	"2016/AT221": 472,
	"2016/AT222": 473,
	"2016/AT223": 474,
	"2016/AT224": 475,
	"2016/AT225": 476,
	"2016/AT226": 477,
	"2016/AT311": 478,
	"2016/AT312": 479,
	"2016/AT313": 480,
	"2016/AT314": 481,
	"2016/AT315": 482,
	"2016/AT321": 483,
	"2016/AT322": 484,
	"2016/AT323": 485,
	"2016/AT331": 486,
	"2016/AT332": 487,
	"2016/AT333": 488,
	"2016/AT334": 489,
	"2016/AT335": 490,
	"2016/AT341": 491,
	"2016/AT342": 492,
	"2016/BE100": 493,
	"2016/BE211": 494,
	"2016/BE212": 495,
	"2016/BE213": 496,
	"2016/BE221": 497,
	"2016/BE222": 498,
	"2016/BE223": 499,
	"2016/BE231": 500,
	"2016/BE232": 501,
	"2016/BE233": 502,
	"2016/BE234": 503,
	"2016/BE235": 504,
	"2016/BE236": 505,
	"2016/BE241": 506,
	"2016/BE242": 507,
	"2016/BE251": 508,
	"2016/BE252": 509,
	"2016/BE253": 510,
	"2016/BE254": 511,
	"2016/BE255": 512,
	"2016/BE256": 513,
	"2016/BE257": 514,
	"2016/BE258": 515,
	"2016/BE310": 516,
	"2016/BE321": 517,
	"2016/BE322": 518,
	"2016/BE323": 519,
	"2016/BE324": 520,
	"2016/BE325": 521,
	"2016/BE326": 522,
	"2016/BE327": 523,
	"2016/BE331": 524,
	"2016/BE332": 525,
	"2016/BE334": 527,
	"2016/BE335": 1910,
	"2016/BE336": 1911,
	"2016/BE341": 528,
	"2016/BE342": 529,
	"2016/BE343": 530,
	"2016/BE344": 531,
	"2016/BE345": 532,
	"2016/BE351": 533,
	"2016/BE352": 534,
	"2016/BE353": 535,
	"2016/BG311": 536,
	"2016/BG312": 537,
	"2016/BG313": 538,
	"2016/BG314": 539,
	"2016/BG315": 540,
	"2016/BG321": 541,
	"2016/BG322": 542,
	"2016/BG323": 543,
	"2016/BG324": 544,
	"2016/BG325": 545,
	"2016/BG331": 546,
	"2016/BG332": 547,
	"2016/BG333": 548,
	"2016/BG334": 549,
	"2016/BG341": 550,
	"2016/BG342": 551,
	"2016/BG343": 552,
	"2016/BG344": 553,
	"2016/BG411": 554,
	"2016/BG412": 555,
	"2016/BG413": 556,
	"2016/BG414": 557,
	"2016/BG415": 558,
	"2016/BG421": 559,
	"2016/BG422": 560,
	"2016/BG423": 561,
	"2016/BG424": 562,
	"2016/BG425": 563,
	"2016/CH011": 564,
	"2016/CH012": 565,
	"2016/CH013": 566,
	"2016/CH021": 567,
	"2016/CH022": 568,
	"2016/CH023": 569,
	"2016/CH024": 570,
	"2016/CH025": 571,
	"2016/CH031": 572,
	"2016/CH032": 573,
	"2016/CH033": 574,
	"2016/CH040": 575,
	"2016/CH051": 576,
	"2016/CH052": 577,
	"2016/CH053": 578,
	"2016/CH054": 579,
	"2016/CH055": 580,
	"2016/CH056": 581,
	"2016/CH057": 582,
	"2016/CH061": 583,
	"2016/CH062": 584,
	"2016/CH063": 585,
	"2016/CH064": 586,
	"2016/CH065": 587,
	"2016/CH066": 588,
	"2016/CH070": 589,
	"2016/CY000": 590,
	"2016/CZ010": 591,
	"2016/CZ020": 592,
	"2016/CZ031": 593,
	"2016/CZ032": 594,
	"2016/CZ041": 595,
	"2016/CZ042": 596,
	"2016/CZ051": 597,
	"2016/CZ052": 598,
	"2016/CZ053": 599,
	"2016/CZ063": 1912,
	"2016/CZ064": 1913,
	"2016/CZ071": 602,
	"2016/CZ072": 603,
	"2016/CZ080": 604,
	"2016/DE111": 605,
	"2016/DE112": 606,
	"2016/DE113": 607,
	"2016/DE114": 608,
	"2016/DE115": 609,
	"2016/DE116": 610,
	"2016/DE117": 611,
	"2016/DE118": 612,
	"2016/DE119": 613,
	"2016/DE11A": 614,
	"2016/DE11B": 615,
	"2016/DE11C": 616,
	"2016/DE11D": 617,
	"2016/DE121": 618,
	"2016/DE122": 619,
	"2016/DE123": 620,
	"2016/DE124": 621,
	"2016/DE125": 622,
	"2016/DE126": 623,
	"2016/DE127": 624,
	"2016/DE128": 625,
	"2016/DE129": 626,
	"2016/DE12A": 627,
	"2016/DE12B": 628,
	"2016/DE12C": 629,
	"2016/DE131": 630,
	"2016/DE132": 631,
	"2016/DE133": 632,
	"2016/DE134": 633,
	"2016/DE135": 634,
	"2016/DE136": 635,
	"2016/DE137": 636,
	"2016/DE138": 637,
	"2016/DE139": 638,
	"2016/DE13A": 639,
	"2016/DE141": 640,
	"2016/DE142": 641,
	"2016/DE143": 642,
	"2016/DE144": 643,
	"2016/DE145": 644,
	"2016/DE146": 645,
	"2016/DE147": 646,
	"2016/DE148": 647,
	"2016/DE149": 648,
	"2016/DE211": 649,
	"2016/DE212": 650,
	"2016/DE213": 651,
	"2016/DE214": 652,
	"2016/DE215": 653,
	"2016/DE216": 654,
	"2016/DE217": 655,
	"2016/DE218": 656,
	"2016/DE219": 657,
	"2016/DE21A": 658,
	"2016/DE21B": 659,
	"2016/DE21C": 660,
	"2016/DE21D": 661,
	"2016/DE21E": 662,
	"2016/DE21F": 663,
	"2016/DE21G": 664,
	"2016/DE21H": 665,
	"2016/DE21I": 666,
	"2016/DE21J": 667,
	"2016/DE21K": 668,
	"2016/DE21L": 669,
	"2016/DE21M": 670,
	"2016/DE21N": 671,
	"2016/DE221": 672,
	"2016/DE222": 673,
	"2016/DE223": 674,
	"2016/DE224": 675,
	"2016/DE225": 676,
	"2016/DE226": 677,
	"2016/DE227": 678,
	"2016/DE228": 679,
	"2016/DE229": 680,
	"2016/DE22A": 681,
	"2016/DE22B": 682,
	"2016/DE22C": 683,
	"2016/DE231": 684,
	"2016/DE232": 685,
	"2016/DE233": 686,
	"2016/DE234": 687,
	"2016/DE235": 688,
	"2016/DE236": 689,
	"2016/DE237": 690,
	"2016/DE238": 691,
	"2016/DE239": 692,
	"2016/DE23A": 693,
	"2016/DE241": 694,
	"2016/DE242": 695,
	"2016/DE243": 696,
	"2016/DE244": 697,
	"2016/DE245": 698,
	"2016/DE246": 699,
	"2016/DE247": 700,
	"2016/DE248": 701,
	"2016/DE249": 702,
	"2016/DE24A": 703,
	"2016/DE24B": 704,
	"2016/DE24C": 705,
	"2016/DE24D": 706,
	"2016/DE251": 707,
	"2016/DE252": 708,
	"2016/DE253": 709,
	"2016/DE254": 710,
	"2016/DE255": 711,
	"2016/DE256": 712,
	"2016/DE257": 713,
	"2016/DE258": 714,
	"2016/DE259": 715,
	"2016/DE25A": 716,
	"2016/DE25B": 717,
	"2016/DE25C": 718,
	"2016/DE261": 719,
	"2016/DE262": 720,
	"2016/DE263": 721,
	"2016/DE264": 722,
	"2016/DE265": 723,
	"2016/DE266": 724,
	"2016/DE267": 725,
	"2016/DE268": 726,
	"2016/DE269": 727,
	"2016/DE26A": 728,
	"2016/DE26B": 729,
	"2016/DE26C": 730,
	"2016/DE271": 731,
	"2016/DE272": 732,
	"2016/DE273": 733,
	"2016/DE274": 734,
	"2016/DE275": 735,
	"2016/DE276": 736,
	"2016/DE277": 737,
	"2016/DE278": 738,
	"2016/DE279": 739,
	"2016/DE27A": 740,
	"2016/DE27B": 741,
	"2016/DE27C": 742,
	"2016/DE27D": 743,
	"2016/DE27E": 744,
	"2016/DE300": 745,
	"2016/DE401": 754,
	"2016/DE402": 755,
	"2016/DE403": 746,
	"2016/DE404": 756,
	"2016/DE405": 747,
	"2016/DE406": 757,
	"2016/DE407": 758,
	"2016/DE408": 759,
	"2016/DE409": 748,
	"2016/DE40A": 749,
	"2016/DE40B": 760,
	"2016/DE40C": 750,
	"2016/DE40D": 751,
	"2016/DE40E": 761,
	"2016/DE40F": 752,
	"2016/DE40G": 762,
	"2016/DE40H": 763,
	"2016/DE40I": 753,
	"2016/DE501": 764,
	"2016/DE502": 765,
	"2016/DE600": 766,
	"2016/DE711": 767,
	"2016/DE712": 768,
	"2016/DE713": 769,
	"2016/DE714": 770,
	"2016/DE715": 771,
	"2016/DE716": 772,
	"2016/DE717": 773,
	"2016/DE718": 774,
	"2016/DE719": 775,
	"2016/DE71A": 776,
	"2016/DE71B": 777,
	"2016/DE71C": 778,
	"2016/DE71D": 779,
	"2016/DE71E": 780,
	"2016/DE721": 781,
	"2016/DE722": 782,
	"2016/DE723": 783,
	"2016/DE724": 784,
	"2016/DE725": 785,
	"2016/DE731": 786,
	"2016/DE732": 787,
	"2016/DE733": 788,
	"2016/DE734": 789,
	"2016/DE735": 790,
	"2016/DE736": 791,
	"2016/DE737": 792,
	"2016/DE803": 795,
	"2016/DE804": 796,
	"2016/DE80J": 2093,
	"2016/DE80K": 2094,
	"2016/DE80L": 2095,
	"2016/DE80M": 2096,
	"2016/DE80N": 2097,
	"2016/DE80O": 2098,
	"2016/DE911": 811,
	"2016/DE912": 812,
	"2016/DE913": 813,
	"2016/DE914": 814,
	"2016/DE916": 816,
	"2016/DE917": 817,
	"2016/DE918": 818,
	"2016/DE91A": 820,
	"2016/DE91B": 821,
	"2016/DE91C": 2250,
	"2016/DE922": 822,
	"2016/DE923": 823,
	"2016/DE925": 824,
	"2016/DE926": 825,
	"2016/DE927": 826,
	"2016/DE928": 827,
	"2016/DE929": 828,
	"2016/DE931": 829,
	"2016/DE932": 830,
	"2016/DE933": 831,
	"2016/DE934": 832,
	"2016/DE935": 833,
	"2016/DE936": 834,
	"2016/DE937": 835,
	"2016/DE938": 836,
	"2016/DE939": 837,
	"2016/DE93A": 838,
	"2016/DE93B": 839,
	"2016/DE941": 840,
	"2016/DE942": 841,
	"2016/DE943": 842,
	"2016/DE944": 843,
	"2016/DE945": 844,
	"2016/DE946": 845,
	"2016/DE947": 846,
	"2016/DE948": 847,
	"2016/DE949": 848,
	"2016/DE94A": 849,
	"2016/DE94B": 850,
	"2016/DE94C": 851,
	"2016/DE94D": 852,
	"2016/DE94E": 853,
	"2016/DE94F": 854,
	"2016/DE94G": 855,
	"2016/DE94H": 856,
	"2016/DEA11": 857,
	"2016/DEA12": 858,
	"2016/DEA13": 859,
	"2016/DEA14": 860,
	"2016/DEA15": 861,
	"2016/DEA16": 862,
	"2016/DEA17": 863,
	"2016/DEA18": 864,
	"2016/DEA19": 865,
	"2016/DEA1A": 866,
	"2016/DEA1B": 867,
	"2016/DEA1C": 868,
	"2016/DEA1D": 869,
	"2016/DEA1E": 870,
	"2016/DEA1F": 871,
	"2016/DEA22": 873,
	"2016/DEA23": 874,
	"2016/DEA24": 875,
	"2016/DEA26": 877,
	"2016/DEA27": 878,
	"2016/DEA28": 879,
	"2016/DEA29": 880,
	"2016/DEA2A": 881,
	"2016/DEA2B": 882,
	"2016/DEA2C": 883,
	"2016/DEA2D": 2028,
	"2016/DEA31": 884,
	"2016/DEA32": 885,
	"2016/DEA33": 886,
	"2016/DEA34": 887,
	"2016/DEA35": 888,
	"2016/DEA36": 889,
	"2016/DEA37": 890,
	"2016/DEA38": 891,
	"2016/DEA41": 892,
	"2016/DEA42": 893,
	"2016/DEA43": 894,
	"2016/DEA44": 895,
	"2016/DEA45": 896,
	"2016/DEA46": 897,
	"2016/DEA47": 898,
	"2016/DEA51": 899,
	"2016/DEA52": 900,
	"2016/DEA53": 901,
	"2016/DEA54": 902,
	"2016/DEA55": 903,
	"2016/DEA56": 904,
	"2016/DEA57": 905,
	"2016/DEA58": 906,
	"2016/DEA59": 907,
	"2016/DEA5A": 908,
	"2016/DEA5B": 909,
	"2016/DEA5C": 910,
	"2016/DEB11": 911,
	"2016/DEB12": 912,
	"2016/DEB13": 913,
	"2016/DEB14": 914,
	"2016/DEB15": 915,
	"2016/DEB17": 917,
	"2016/DEB18": 918,
	"2016/DEB1A": 920,
	"2016/DEB1B": 921,
	"2016/DEB1C": 916,
	"2016/DEB1D": 919,
	"2016/DEB21": 922,
	"2016/DEB22": 923,
	"2016/DEB23": 924,
	"2016/DEB24": 925,
	"2016/DEB25": 926,
	"2016/DEB31": 927,
	"2016/DEB32": 928,
	"2016/DEB33": 929,
	"2016/DEB34": 930,
	"2016/DEB35": 931,
	"2016/DEB36": 932,
	"2016/DEB37": 933,
	"2016/DEB38": 934,
	"2016/DEB39": 935,
	"2016/DEB3A": 936,
	"2016/DEB3B": 937,
	"2016/DEB3C": 938,
	"2016/DEB3D": 939,
	"2016/DEB3E": 940,
	"2016/DEB3F": 941,
	"2016/DEB3G": 942,
	"2016/DEB3H": 943,
	"2016/DEB3I": 944,
	"2016/DEB3J": 945,
	"2016/DEB3K": 946,
	"2016/DEC01": 947,
	"2016/DEC02": 948,
	"2016/DEC03": 949,
	"2016/DEC04": 950,
	"2016/DEC05": 951,
	"2016/DEC06": 952,
	"2016/DED21": 965,
	"2016/DED2C": 2029,
	"2016/DED2D": 2030,
	"2016/DED2E": 2031,
	"2016/DED2F": 2032,
	"2016/DED41": 953,
	"2016/DED42": 2033,
	"2016/DED43": 2034,
	"2016/DED44": 2035,
	"2016/DED45": 2036,
	"2016/DED51": 976,
	"2016/DED52": 2037,
	"2016/DED53": 2038,
	"2016/DEE01": 1914,
	"2016/DEE02": 988,
	"2016/DEE03": 995,
	"2016/DEE04": 1005,
	"2016/DEE05": 1915,
	"2016/DEE06": 1916,
	"2016/DEE07": 1917,
	"2016/DEE08": 1918,
	"2016/DEE09": 1919,
	"2016/DEE0A": 1920,
	"2016/DEE0B": 1921,
	"2016/DEE0C": 1922,
	"2016/DEE0D": 1001,
	"2016/DEE0E": 1923,
	"2016/DEF01": 1006,
	"2016/DEF02": 1007,
	"2016/DEF03": 1008,
	"2016/DEF04": 1009,
	"2016/DEF05": 1010,
	"2016/DEF06": 1011,
	"2016/DEF07": 1012,
	"2016/DEF08": 1013,
	"2016/DEF09": 1014,
	"2016/DEF0A": 1015,
	"2016/DEF0B": 1016,
	"2016/DEF0C": 1017,
	"2016/DEF0D": 1018,
	"2016/DEF0E": 1019,
	"2016/DEF0F": 1020,
	"2016/DEG01": 1021,
	"2016/DEG02": 1022,
	"2016/DEG03": 1023,
	"2016/DEG04": 1024,
	"2016/DEG05": 1025,
	"2016/DEG06": 1026,
	"2016/DEG07": 1027,
	"2016/DEG09": 1028,
	"2016/DEG0A": 1029,
	"2016/DEG0B": 1030,
	"2016/DEG0C": 1031,
	"2016/DEG0D": 1032,
	"2016/DEG0E": 1033,
	"2016/DEG0F": 1034,
	"2016/DEG0G": 1035,
	"2016/DEG0H": 1036,
	"2016/DEG0I": 1037,
	"2016/DEG0J": 1038,
	"2016/DEG0K": 1039,
	"2016/DEG0L": 1040,
	"2016/DEG0M": 1041,
	"2016/DEG0N": 1042,
	"2016/DEG0P": 1043,
	"2016/DK011": 1924,
	"2016/DK012": 1925,
	"2016/DK013": 1926,
	"2016/DK014": 1050,
	"2016/DK021": 1927,
	"2016/DK022": 1928,
	"2016/DK031": 1051,
	"2016/DK032": 1929,
	"2016/DK041": 1930,
	"2016/DK042": 1931,
	"2016/DK050": 1932,
	"2016/EE001": 1059,
	"2016/EE004": 1060,
	"2016/EE006": 1061,
	"2016/EE007": 1062,
	"2016/EE008": 1063,
	"2016/EL301": 2099,
	"2016/EL302": 2100,
	"2016/EL303": 2101,
	"2016/EL304": 2102,
	"2016/EL305": 2103,
	"2016/EL306": 2104,
	"2016/EL307": 2105,
	"2016/EL411": 1278,
	"2016/EL412": 1279,
	"2016/EL413": 1280,
	"2016/EL421": 1281,
	"2016/EL422": 1282,
	"2016/EL431": 1283,
	"2016/EL432": 1284,
	"2016/EL433": 1285,
	"2016/EL434": 1286,
	"2016/EL511": 1236,
	"2016/EL512": 1237,
	"2016/EL513": 1238,
	"2016/EL514": 1239,
	"2016/EL515": 1240,
	"2016/EL521": 1241,
	"2016/EL522": 1242,
	"2016/EL523": 1243,
	"2016/EL524": 1244,
	"2016/EL525": 1245,
	"2016/EL526": 1246,
	"2016/EL527": 1247,
	"2016/EL531": 2106,
	"2016/EL532": 1249,
	"2016/EL533": 1251,
	"2016/EL541": 2107,
	"2016/EL542": 1257,
	"2016/EL543": 1258,
	"2016/EL611": 2108,
	"2016/EL612": 1253,
	"2016/EL613": 1254,
	"2016/EL621": 1260,
	"2016/EL622": 1261,
	"2016/EL623": 1262,
	"2016/EL624": 1263,
	"2016/EL631": 1264,
	"2016/EL632": 1265,
	"2016/EL633": 1266,
	"2016/EL641": 1267,
	"2016/EL642": 1268,
	"2016/EL643": 1269,
	"2016/EL644": 1270,
	"2016/EL645": 1271,
	"2016/EL651": 2109,
	"2016/EL652": 1274,
	"2016/EL653": 2110,
	"2016/ES111": 1064,
	"2016/ES112": 1065,
	"2016/ES113": 1066,
	"2016/ES114": 1067,
	"2016/ES120": 1068,
	"2016/ES130": 1069,
	"2016/ES211": 1070,
	"2016/ES212": 1071,
	"2016/ES213": 1072,
	"2016/ES220": 1073,
	"2016/ES230": 1074,
	"2016/ES241": 1075,
	"2016/ES242": 1076,
	"2016/ES243": 1077,
	"2016/ES300": 1078,
	"2016/ES411": 1079,
	"2016/ES412": 1080,
	"2016/ES413": 1081,
	"2016/ES414": 1082,
	"2016/ES415": 1083,
	"2016/ES416": 1084,
	"2016/ES417": 1085,
	"2016/ES418": 1086,
	"2016/ES419": 1087,
	"2016/ES421": 1088,
	"2016/ES422": 1089,
	"2016/ES423": 1090,
	"2016/ES424": 1091,
	"2016/ES425": 1092,
	"2016/ES431": 1093,
	"2016/ES432": 1094,
	"2016/ES511": 1095,
	"2016/ES512": 1096,
	"2016/ES513": 1097,
	"2016/ES514": 1098,
	"2016/ES521": 1099,
	"2016/ES522": 1100,
	"2016/ES523": 1101,
	"2016/ES531": 1933,
	"2016/ES532": 1934,
	"2016/ES533": 1935,
	"2016/ES611": 1103,
	"2016/ES612": 1104,
	"2016/ES613": 1105,
	"2016/ES614": 1106,
	"2016/ES615": 1107,
	"2016/ES616": 1108,
	"2016/ES617": 1109,
	"2016/ES618": 1110,
	"2016/ES620": 1111,
	"2016/ES630": 1112,
	"2016/ES640": 1113,
	"2016/ES703": 1936,
	"2016/ES704": 1937,
	"2016/ES705": 1938,
	"2016/ES706": 1939,
	"2016/ES707": 1940,
	"2016/ES708": 1941,
	"2016/ES709": 1942,
	"2016/FI193": 1129,
	"2016/FI194": 1130,
	"2016/FI195": 1131,
	"2016/FI196": 1943,
	"2016/FI197": 1944,
	"2016/FI1B1": 2039,
	"2016/FI1C1": 1122,
	"2016/FI1C2": 1123,
	"2016/FI1C3": 1124,
	"2016/FI1C4": 1125,
	"2016/FI1C5": 1126,
	"2016/FI1D1": 1116,
	"2016/FI1D2": 1117,
	"2016/FI1D3": 1118,
	"2016/FI1D5": 1132,
	"2016/FI1D7": 1134,
	"2016/FI1D8": 1119,
	"2016/FI1D9": 1133,
	"2016/FI200": 1135,
	"2016/FR101": 1136,
	"2016/FR102": 1137,
	"2016/FR103": 1138,
	"2016/FR104": 1139,
	"2016/FR105": 1140,
	"2016/FR106": 1141,
	"2016/FR107": 1142,
	"2016/FR108": 1143,
	"2016/FRB01": 1153,
	"2016/FRB02": 1154,
	"2016/FRB03": 1155,
	"2016/FRB04": 1156,
	"2016/FRB05": 1157,
	"2016/FRB06": 1158,
	"2016/FRC11": 1162,
	"2016/FRC12": 1163,
	"2016/FRC13": 1164,
	"2016/FRC14": 1165,
	"2016/FRC21": 1174,
	"2016/FRC22": 1175,
	"2016/FRC23": 1176,
	"2016/FRC24": 1177,
	"2016/FRD11": 1159,
	"2016/FRD12": 1160,
	"2016/FRD13": 1161,
	"2016/FRD21": 1151,
	"2016/FRD22": 1152,
	"2016/FRE11": 1166,
	"2016/FRE12": 1167,
	"2016/FRE21": 1148,
	"2016/FRE22": 1149,
	"2016/FRE23": 1150,
	"2016/FRF11": 1172,
	"2016/FRF12": 1173,
	"2016/FRF21": 1144,
	"2016/FRF22": 1145,
	"2016/FRF23": 1146,
	"2016/FRF24": 1147,
	"2016/FRF31": 1168,
	"2016/FRF32": 1169,
	"2016/FRF33": 1170,
	"2016/FRF34": 1171,
	"2016/FRG01": 1178,
	"2016/FRG02": 1179,
	"2016/FRG03": 1180,
	"2016/FRG04": 1181,
	"2016/FRG05": 1182,
	"2016/FRH01": 1183,
	"2016/FRH02": 1184,
	"2016/FRH03": 1185,
	"2016/FRH04": 1186,
	"2016/FRI11": 1191,
	"2016/FRI12": 1192,
	"2016/FRI13": 1193,
	"2016/FRI14": 1194,
	"2016/FRI15": 1195,
	"2016/FRI21": 1204,
	"2016/FRI22": 1205,
	"2016/FRI23": 1206,
	"2016/FRI31": 1187,
	"2016/FRI32": 1188,
	"2016/FRI33": 1189,
	"2016/FRI34": 1190,
	"2016/FRJ11": 1219,
	"2016/FRJ12": 1220,
	"2016/FRJ13": 1221,
	"2016/FRJ14": 1222,
	"2016/FRJ15": 1223,
	"2016/FRJ21": 1196,
	"2016/FRJ22": 1197,
	"2016/FRJ23": 1198,
	"2016/FRJ24": 1199,
	"2016/FRJ25": 1200,
	"2016/FRJ26": 1201,
	"2016/FRJ27": 1202,
	"2016/FRJ28": 1203,
	"2016/FRK11": 1215,
	"2016/FRK12": 1216,
	"2016/FRK13": 1217,
	"2016/FRK14": 1218,
	"2016/FRK21": 1207,
	"2016/FRK22": 1208,
	"2016/FRK23": 1209,
	"2016/FRK24": 1210,
	"2016/FRK25": 1211,
	"2016/FRK26": 1212,
	"2016/FRK27": 1213,
	"2016/FRK28": 1214,
	"2016/FRL01": 1224,
	"2016/FRL02": 1225,
	"2016/FRL03": 1226,
	"2016/FRL04": 1227,
	"2016/FRL05": 1228,
	"2016/FRL06": 1229,
	"2016/FRM01": 1230,
	"2016/FRM02": 1231,
	"2016/FRY10": 2111,
	"2016/FRY20": 1233,
	"2016/FRY30": 1234,
	"2016/FRY40": 1235,
	"2016/FRY50": 2112,
	"2016/HR031": 1301,
	"2016/HR032": 1302,
	"2016/HR033": 1303,
	"2016/HR034": 1304,
	"2016/HR035": 1305,
	"2016/HR036": 1306,
	"2016/HR037": 1307,
	"2016/HR041": 2040,
	"2016/HR042": 2041,
	"2016/HR043": 2042,
	"2016/HR044": 2043,
	"2016/HR045": 2044,
	"2016/HR046": 2045,
	"2016/HR047": 2046,
	"2016/HR048": 2047,
	"2016/HR049": 2048,
	"2016/HR04A": 2049,
	"2016/HR04B": 2050,
	"2016/HR04C": 2051,
	"2016/HR04D": 2052,
	"2016/HR04E": 2053,
	"2016/HU110": 1308,
	"2016/HU120": 1309,
	"2016/HU211": 1310,
	"2016/HU212": 1311,
	"2016/HU213": 1312,
	"2016/HU221": 1313,
	"2016/HU222": 1314,
	"2016/HU223": 1315,
	"2016/HU231": 1316,
	"2016/HU232": 1317,
	"2016/HU233": 1318,
	"2016/HU311": 1319,
	"2016/HU312": 1320,
	"2016/HU313": 1321,
	"2016/HU321": 1322,
	"2016/HU322": 1323,
	"2016/HU323": 1324,
	"2016/HU331": 1325,
	"2016/HU332": 1326,
	"2016/HU333": 1327,
	"2016/IE041": 1328,
	"2016/IE042": 1330,
	"2016/IE051": 1333,
	"2016/IE052": 1334,
	"2016/IE053": 1335,
	"2016/IE061": 1331,
	"2016/IE062": 1332,
	"2016/IE063": 1329,
	"2016/IS001": 1945,
	"2016/IS002": 1946,
	"2016/ITC11": 1337,
	"2016/ITC12": 1338,
	"2016/ITC13": 1339,
	"2016/ITC14": 1340,
	"2016/ITC15": 1341,
	"2016/ITC16": 1342,
	"2016/ITC17": 1343,
	"2016/ITC18": 1344,
	"2016/ITC20": 1345,
	"2016/ITC31": 1346,
	"2016/ITC32": 1347,
	"2016/ITC33": 1348,
	"2016/ITC34": 1349,
	"2016/ITC41": 1350,
	"2016/ITC42": 1351,
	"2016/ITC43": 1352,
	"2016/ITC44": 1353,
	"2016/ITC46": 1355,
	"2016/ITC47": 1356,
	"2016/ITC48": 1357,
	"2016/ITC49": 1358,
	"2016/ITC4A": 1359,
	"2016/ITC4B": 1360,
	"2016/ITC4C": 2054,
	"2016/ITC4D": 2055,
	"2016/ITF11": 1404,
	"2016/ITF12": 1405,
	"2016/ITF13": 1406,
	"2016/ITF14": 1407,
	"2016/ITF21": 1408,
	"2016/ITF22": 1409,
	"2016/ITF31": 1410,
	"2016/ITF32": 1411,
	"2016/ITF33": 1412,
	"2016/ITF34": 1413,
	"2016/ITF35": 1414,
	"2016/ITF43": 1417,
	"2016/ITF44": 1418,
	"2016/ITF45": 1419,
	"2016/ITF46": 2056,
	"2016/ITF47": 2057,
	"2016/ITF48": 2058,
	"2016/ITF51": 1420,
	"2016/ITF52": 1421,
	"2016/ITF61": 1422,
	"2016/ITF62": 1423,
	"2016/ITF63": 1424,
	"2016/ITF64": 1425,
	"2016/ITF65": 1426,
	"2016/ITG11": 1427,
	"2016/ITG12": 1428,
	"2016/ITG13": 1429,
	"2016/ITG14": 1430,
	"2016/ITG15": 1431,
	"2016/ITG16": 1432,
	"2016/ITG17": 1433,
	"2016/ITG18": 1434,
	"2016/ITG19": 1435,
	"2016/ITG25": 1947,
	"2016/ITG26": 1948,
	"2016/ITG27": 1949,
	"2016/ITG28": 1950,
	"2016/ITG29": 1951,
	"2016/ITG2A": 1952,
	"2016/ITG2B": 1953,
	"2016/ITG2C": 1954,
	"2016/ITH10": 1361,
	"2016/ITH20": 1362,
	"2016/ITH31": 1363,
	"2016/ITH32": 1364,
	"2016/ITH33": 1365,
	"2016/ITH34": 1366,
	"2016/ITH35": 1367,
	"2016/ITH36": 1368,
	"2016/ITH37": 1369,
	"2016/ITH41": 1370,
	"2016/ITH42": 1371,
	"2016/ITH43": 1372,
	"2016/ITH44": 1373,
	"2016/ITH51": 1374,
	"2016/ITH52": 1375,
	"2016/ITH53": 1376,
	"2016/ITH54": 1377,
	"2016/ITH55": 1378,
	"2016/ITH56": 1379,
	"2016/ITH57": 1380,
	"2016/ITH58": 1381,
	"2016/ITH59": 2059,
	"2016/ITI11": 1383,
	"2016/ITI12": 1384,
	"2016/ITI13": 1385,
	"2016/ITI14": 1386,
	"2016/ITI15": 1387,
	"2016/ITI16": 1388,
	"2016/ITI17": 1389,
	"2016/ITI18": 1390,
	"2016/ITI19": 1391,
	"2016/ITI1A": 1392,
	"2016/ITI21": 1393,
	"2016/ITI22": 1394,
	"2016/ITI31": 2060,
	"2016/ITI32": 1396,
	"2016/ITI33": 1397,
	"2016/ITI34": 2061,
	"2016/ITI35": 2062,
	"2016/ITI41": 1399,
	"2016/ITI42": 1400,
	"2016/ITI43": 1401,
	"2016/ITI44": 1402,
	"2016/ITI45": 1403,
	"2016/LI000": 1440,
	"2016/LT011": 1450,
	"2016/LT021": 1441,
	"2016/LT022": 1442,
	"2016/LT023": 1443,
	"2016/LT024": 1444,
	"2016/LT025": 1445,
	"2016/LT026": 1446,
	"2016/LT027": 1447,
	"2016/LT028": 1448,
	"2016/LT029": 1449,
	"2016/LU000": 1451,
	"2016/LV003": 1452,
	"2016/LV005": 1453,
	"2016/LV006": 1454,
	"2016/LV007": 1455,
	"2016/LV008": 1456,
	"2016/LV009": 1457,
	"2016/ME000": 1955,
	"2016/MK001": 1956,
	"2016/MK002": 1957,
	"2016/MK003": 1958,
	"2016/MK004": 1959,
	"2016/MK005": 1960,
	"2016/MK006": 1961,
	"2016/MK007": 1962,
	"2016/MK008": 1963,
	"2016/MT001": 1458,
	"2016/MT002": 1459,
	"2016/NL111": 1460,
	"2016/NL112": 1461,
	"2016/NL113": 1462,
	"2016/NL124": 1463,
	"2016/NL125": 1464,
	"2016/NL126": 1465,
	"2016/NL131": 1466,
	"2016/NL132": 1467,
	"2016/NL133": 1468,
	"2016/NL211": 1469,
	"2016/NL212": 1470,
	"2016/NL213": 1471,
	"2016/NL221": 1472,
	"2016/NL224": 1475,
	"2016/NL225": 1964,
	"2016/NL226": 1965,
	"2016/NL230": 1476,
	"2016/NL310": 1477,
	"2016/NL321": 1478,
	"2016/NL323": 1480,
	"2016/NL324": 1481,
	"2016/NL325": 1482,
	"2016/NL327": 1484,
	"2016/NL328": 1479,
	"2016/NL329": 1483,
	"2016/NL332": 1486,
	"2016/NL333": 1487,
	"2016/NL337": 2063,
	"2016/NL33A": 2066,
	"2016/NL33B": 2064,
	"2016/NL33C": 2065,
	"2016/NL341": 1491,
	"2016/NL342": 1492,
	"2016/NL411": 1493,
	"2016/NL412": 1494,
	"2016/NL413": 1495,
	"2016/NL414": 1496,
	"2016/NL421": 1497,
	"2016/NL422": 1498,
	"2016/NL423": 1499,
	"2016/NO011": 1500,
	"2016/NO012": 1501,
	"2016/NO021": 1502,
	"2016/NO022": 1503,
	"2016/NO031": 1504,
	"2016/NO032": 1505,
	"2016/NO033": 1506,
	"2016/NO034": 1507,
	"2016/NO041": 1508,
	"2016/NO042": 1509,
	"2016/NO043": 1510,
	"2016/NO051": 1511,
	"2016/NO052": 1512,
	"2016/NO053": 1513,
	"2016/NO060": 2251,
	"2016/NO071": 1516,
	"2016/NO072": 1517,
	"2016/NO073": 1518,
	"2016/PL213": 1529,
	"2016/PL214": 1973,
	"2016/PL217": 1976,
	"2016/PL218": 2117,
	"2016/PL219": 2118,
	"2016/PL21A": 2119,
	"2016/PL224": 1530,
	"2016/PL225": 1531,
	"2016/PL227": 1533,
	"2016/PL228": 1977,
	"2016/PL229": 1978,
	"2016/PL22A": 1979,
	"2016/PL22B": 1980,
	"2016/PL22C": 1981,
	"2016/PL411": 1542,
	"2016/PL414": 1545,
	"2016/PL415": 1546,
	"2016/PL416": 1993,
	"2016/PL417": 1994,
	"2016/PL418": 1995,
	"2016/PL424": 1997,
	"2016/PL426": 2120,
	"2016/PL427": 2121,
	"2016/PL428": 2122,
	"2016/PL431": 1549,
	"2016/PL432": 1550,
	"2016/PL514": 1554,
	"2016/PL515": 1999,
	"2016/PL516": 2000,
	"2016/PL517": 2001,
	"2016/PL518": 2002,
	"2016/PL523": 2123,
	"2016/PL524": 2124,
	"2016/PL613": 2005,
	"2016/PL616": 2125,
	"2016/PL617": 2126,
	"2016/PL618": 2127,
	"2016/PL619": 2128,
	"2016/PL621": 1558,
	"2016/PL622": 1559,
	"2016/PL623": 1560,
	"2016/PL633": 1563,
	"2016/PL634": 2008,
	"2016/PL636": 2129,
	"2016/PL637": 2130,
	"2016/PL638": 2131,
	"2016/PL711": 1521,
	"2016/PL712": 1966,
	"2016/PL713": 1967,
	"2016/PL714": 1968,
	"2016/PL715": 1969,
	"2016/PL721": 1988,
	"2016/PL722": 1989,
	"2016/PL811": 1534,
	"2016/PL812": 1535,
	"2016/PL814": 1982,
	"2016/PL815": 1983,
	"2016/PL821": 1984,
	"2016/PL822": 1985,
	"2016/PL823": 1986,
	"2016/PL824": 1987,
	"2016/PL841": 1990,
	"2016/PL842": 1991,
	"2016/PL843": 1992,
	"2016/PL911": 1526,
	"2016/PL912": 1971,
	"2016/PL913": 1972,
	"2016/PL921": 1970,
	"2016/PL922": 2113,
	"2016/PL923": 2114,
	"2016/PL924": 2115,
	"2016/PL925": 2116,
	"2016/PL926": 2252,
	"2016/PT111": 1564,
	"2016/PT112": 1565,
	"2016/PT119": 2132,
	"2016/PT11A": 2133,
	"2016/PT11B": 2134,
	"2016/PT11C": 2135,
	"2016/PT11D": 2136,
	"2016/PT11E": 2137,
	"2016/PT150": 1572,
	"2016/PT16B": 1583,
	"2016/PT16D": 2138,
	"2016/PT16E": 2139,
	"2016/PT16F": 2140,
	"2016/PT16G": 2141,
	"2016/PT16H": 2142,
	"2016/PT16I": 2143,
	"2016/PT16J": 2144,
	"2016/PT170": 2145,
	"2016/PT181": 1587,
	"2016/PT184": 1590,
	"2016/PT185": 1591,
	"2016/PT186": 2146,
	"2016/PT187": 2147,
	"2016/PT200": 1592,
	"2016/PT300": 1593,
	"2016/RO111": 1594,
	"2016/RO112": 1595,
	"2016/RO113": 1596,
	"2016/RO114": 1597,
	"2016/RO115": 1598,
	"2016/RO116": 1599,
	"2016/RO121": 1600,
	"2016/RO122": 1601,
	"2016/RO123": 1602,
	"2016/RO124": 1603,
	"2016/RO125": 1604,
	"2016/RO126": 1605,
	"2016/RO211": 1606,
	"2016/RO212": 1607,
	"2016/RO213": 1608,
	"2016/RO214": 1609,
	"2016/RO215": 1610,
	"2016/RO216": 1611,
	"2016/RO221": 1612,
	"2016/RO222": 1613,
	"2016/RO223": 1614,
	"2016/RO224": 1615,
	"2016/RO225": 1616,
	"2016/RO226": 1617,
	"2016/RO311": 1618,
	"2016/RO312": 1619,
	"2016/RO313": 1620,
	"2016/RO314": 1621,
	"2016/RO315": 1622,
	"2016/RO316": 1623,
	"2016/RO317": 1624,
	"2016/RO321": 1625,
	"2016/RO322": 1626,
	"2016/RO411": 1627,
	"2016/RO412": 1628,
	"2016/RO413": 1629,
	"2016/RO414": 1630,
	"2016/RO415": 1631,
	"2016/RO421": 1632,
	"2016/RO422": 1633,
	"2016/RO423": 1634,
	"2016/RO424": 1635,
	"2016/RS110": 2253,
	"2016/RS121": 2254,
	"2016/RS122": 2255,
	"2016/RS123": 2256,
	"2016/RS124": 2257,
	"2016/RS125": 2258,
	"2016/RS126": 2259,
	"2016/RS127": 2260,
	"2016/RS211": 2261,
	"2016/RS212": 2262,
	"2016/RS213": 2263,
	"2016/RS214": 2264,
	"2016/RS215": 2265,
	"2016/RS216": 2266,
	"2016/RS217": 2267,
	"2016/RS218": 2268,
	"2016/RS221": 2269,
	"2016/RS222": 2270,
	"2016/RS223": 2271,
	"2016/RS224": 2272,
	"2016/RS225": 2273,
	"2016/RS226": 2274,
	"2016/RS227": 2275,
	"2016/RS228": 2276,
	"2016/RS229": 2277,
	"2016/SE110": 1636,
	"2016/SE121": 2010,
	"2016/SE122": 1638,
	"2016/SE123": 1639,
	"2016/SE124": 1640,
	"2016/SE125": 2011,
	"2016/SE211": 1651,
	"2016/SE212": 1652,
	"2016/SE213": 1653,
	"2016/SE214": 1654,
	"2016/SE221": 1642,
	"2016/SE224": 1643,
	"2016/SE231": 1655,
	"2016/SE232": 1656,
	"2016/SE311": 1644,
	"2016/SE312": 1645,
	"2016/SE313": 1646,
	"2016/SE321": 1647,
	"2016/SE322": 1648,
	"2016/SE331": 1649,
	"2016/SE332": 1650,
	"2016/SI031": 1657,
	"2016/SI032": 1658,
	"2016/SI033": 1659,
	"2016/SI034": 2148,
	"2016/SI035": 2149,
	"2016/SI036": 2150,
	"2016/SI037": 1667,
	"2016/SI038": 2151,
	"2016/SI041": 2152,
	"2016/SI042": 1663,
	"2016/SI043": 1665,
	"2016/SI044": 1666,
	"2016/SK010": 1669,
	"2016/SK021": 1670,
	"2016/SK022": 1671,
	"2016/SK023": 1672,
	"2016/SK031": 1673,
	"2016/SK032": 1674,
	"2016/SK041": 1675,
	"2016/SK042": 1676,
	"2016/TR100": 1677,
	"2016/TR211": 1678,
	"2016/TR212": 1679,
	"2016/TR213": 1680,
	"2016/TR221": 1681,
	"2016/TR222": 1682,
	"2016/TR310": 1683,
	"2016/TR321": 1684,
	"2016/TR322": 1685,
	"2016/TR323": 1686,
	"2016/TR331": 1687,
	"2016/TR332": 1688,
	"2016/TR333": 1689,
	"2016/TR334": 1690,
	"2016/TR411": 1691,
	"2016/TR412": 1692,
	"2016/TR413": 1693,
	"2016/TR421": 1694,
	"2016/TR422": 1695,
	"2016/TR423": 1696,
	"2016/TR424": 1697,
	"2016/TR425": 1698,
	"2016/TR510": 1699,
	"2016/TR521": 1700,
	"2016/TR522": 1701,
	"2016/TR611": 1702,
	"2016/TR612": 1703,
	"2016/TR613": 1704,
	"2016/TR621": 1705,
	"2016/TR622": 1706,
	"2016/TR631": 1707,
	"2016/TR632": 1708,
	"2016/TR633": 1709,
	"2016/TR711": 1710,
	"2016/TR712": 1711,
	"2016/TR713": 1712,
	"2016/TR714": 1713,
	"2016/TR715": 1714,
	"2016/TR721": 1715,
	"2016/TR722": 1716,
	"2016/TR723": 1717,
	"2016/TR811": 1718,
	"2016/TR812": 1719,
	"2016/TR813": 1720,
	"2016/TR821": 1721,
	"2016/TR822": 1722,
	"2016/TR823": 1723,
	"2016/TR831": 1724,
	"2016/TR832": 1725,
	"2016/TR833": 1726,
	"2016/TR834": 1727,
	"2016/TR901": 1728,
	"2016/TR902": 1729,
	"2016/TR903": 1730,
	"2016/TR904": 1731,
	"2016/TR905": 1732,
	"2016/TR906": 1733,
	"2016/TRA11": 1734,
	"2016/TRA12": 1735,
	"2016/TRA13": 1736,
	"2016/TRA21": 1737,
	"2016/TRA22": 1738,
	"2016/TRA23": 1739,
	"2016/TRA24": 1740,
	"2016/TRB11": 1741,
	"2016/TRB12": 1742,
	"2016/TRB13": 1743,
	"2016/TRB14": 1744,
	"2016/TRB21": 1745,
	"2016/TRB22": 1746,
	"2016/TRB23": 1747,
	"2016/TRB24": 1748,
	"2016/TRC11": 1749,
	"2016/TRC12": 1750,
	"2016/TRC13": 1751,
	"2016/TRC21": 1752,
	"2016/TRC22": 1753,
	"2016/TRC31": 1754,
	"2016/TRC32": 1755,
	"2016/TRC33": 1756,
	"2016/TRC34": 1757,
	"2016/UKC11": 1758,
	"2016/UKC12": 1759,
	"2016/UKC13": 1760,
	"2016/UKC14": 1761,
	"2016/UKC21": 1762,
	"2016/UKC22": 1763,
	"2016/UKC23": 1764,
	"2016/UKD11": 1765,
	"2016/UKD12": 1766,
	"2016/UKD33": 2153,
	"2016/UKD34": 2154,
	"2016/UKD35": 2155,
	"2016/UKD36": 2156,
	"2016/UKD37": 2157,
	"2016/UKD41": 1771,
	"2016/UKD42": 1772,
	"2016/UKD44": 2158,
	"2016/UKD45": 2159,
	"2016/UKD46": 2160,
	"2016/UKD47": 2161,
	"2016/UKD61": 2067,
	"2016/UKD62": 2068,
	"2016/UKD63": 2069,
	"2016/UKD71": 2070,
	"2016/UKD72": 1775,
	"2016/UKD73": 1776,
	"2016/UKD74": 1777,
	"2016/UKE11": 1778,
	"2016/UKE12": 1779,
	"2016/UKE13": 1780,
	"2016/UKE21": 1781,
	"2016/UKE22": 1782,
	"2016/UKE31": 1783,
	"2016/UKE32": 1784,
	"2016/UKE41": 1785,
	"2016/UKE42": 1786,
	"2016/UKE44": 2071,
	"2016/UKE45": 2072,
	"2016/UKF11": 1788,
	"2016/UKF12": 1789,
	"2016/UKF13": 1790,
	"2016/UKF14": 1791,
	"2016/UKF15": 1792,
	"2016/UKF16": 1793,
	"2016/UKF21": 1794,
	"2016/UKF22": 1795,
	"2016/UKF24": 2073,
	"2016/UKF25": 2074,
	"2016/UKF30": 1797,
	"2016/UKG11": 1798,
	"2016/UKG12": 1799,
	"2016/UKG13": 1800,
	"2016/UKG21": 1801,
	"2016/UKG22": 1802,
	"2016/UKG23": 1803,
	"2016/UKG24": 1804,
	"2016/UKG31": 1805,
	"2016/UKG32": 1806,
	"2016/UKG33": 1807,
	"2016/UKG36": 2075,
	"2016/UKG37": 2076,
	"2016/UKG38": 2077,
	"2016/UKG39": 2078,
	"2016/UKH11": 1810,
	"2016/UKH12": 1811,
	"2016/UKH14": 1813,
	"2016/UKH15": 2162,
	"2016/UKH16": 2163,
	"2016/UKH17": 2164,
	"2016/UKH21": 1814,
	"2016/UKH23": 1816,
	"2016/UKH24": 2079,
	"2016/UKH25": 2080,
	"2016/UKH31": 1817,
	"2016/UKH32": 1818,
	"2016/UKH34": 2165,
	"2016/UKH35": 2166,
	"2016/UKH36": 2167,
	"2016/UKH37": 2168,
	"2016/UKI31": 2169,
	"2016/UKI32": 2170,
	"2016/UKI33": 2171,
	"2016/UKI34": 2172,
	"2016/UKI41": 2173,
	"2016/UKI42": 2174,
	"2016/UKI43": 2175,
	"2016/UKI44": 2176,
	"2016/UKI45": 2177,
	"2016/UKI51": 2178,
	"2016/UKI52": 2179,
	"2016/UKI53": 2180,
	"2016/UKI54": 2181,
	"2016/UKI61": 2182,
	"2016/UKI62": 2183,
	"2016/UKI63": 2184,
	"2016/UKI71": 2185,
	"2016/UKI72": 2186,
	"2016/UKI73": 2187,
	"2016/UKI74": 2188,
	"2016/UKI75": 2189,
	"2016/UKJ11": 1825,
	"2016/UKJ12": 1826,
	"2016/UKJ13": 1827,
	"2016/UKJ14": 1828,
	"2016/UKJ21": 1829,
	"2016/UKJ22": 1830,
	"2016/UKJ25": 2190,
	"2016/UKJ26": 2191,
	"2016/UKJ27": 2192,
	"2016/UKJ28": 2193,
	"2016/UKJ31": 1833,
	"2016/UKJ32": 1834,
	"2016/UKJ34": 1836,
	"2016/UKJ35": 2194,
	"2016/UKJ36": 2195,
	"2016/UKJ37": 2196,
	"2016/UKJ41": 1837,
	"2016/UKJ43": 2197,
	"2016/UKJ44": 2198,
	"2016/UKJ45": 2199,
	"2016/UKJ46": 2200,
	"2016/UKK11": 1839,
	"2016/UKK12": 1840,
	"2016/UKK13": 1841,
	"2016/UKK14": 1842,
	"2016/UKK15": 1843,
	"2016/UKK21": 1844,
	"2016/UKK22": 1845,
	"2016/UKK23": 1846,
	"2016/UKK30": 1847,
	"2016/UKK41": 1848,
	"2016/UKK42": 1849,
	"2016/UKK43": 1850,
	"2016/UKL11": 1851,
	"2016/UKL12": 1852,
	"2016/UKL13": 1853,
	"2016/UKL14": 1854,
	"2016/UKL15": 1855,
	"2016/UKL16": 1856,
	"2016/UKL17": 1857,
	"2016/UKL18": 1858,
	"2016/UKL21": 1859,
	"2016/UKL22": 1860,
	"2016/UKL23": 1861,
	"2016/UKL24": 1862,
	"2016/UKM50": 2012,
	"2016/UKM61": 1880,
	"2016/UKM62": 2013,
	"2016/UKM63": 1882,
	"2016/UKM64": 1883,
	"2016/UKM65": 1884,
	"2016/UKM66": 1885,
	"2016/UKM71": 1864,
	"2016/UKM72": 1865,
	"2016/UKM73": 1866,
	"2016/UKM75": 1868,
	"2016/UKM76": 1869,
	"2016/UKM77": 1870,
	"2016/UKM78": 1871,
	"2016/UKM81": 1872,
	"2016/UKM82": 1875,
	"2016/UKM83": 1876,
	"2016/UKM84": 1877,
	"2016/UKM91": 1867,
	"2016/UKM92": 1873,
	"2016/UKM93": 1874,
	"2016/UKM94": 1878,
	"2016/UKM95": 1879,
	"2016/UKN06": 1886,
	"2016/UKN07": 2278,
	"2016/UKN08": 2279,
	"2016/UKN09": 2280,
	"2016/UKN10": 2281,
	"2016/UKN11": 2282,
	"2016/UKN12": 2283,
	"2016/UKN13": 2284,
	"2016/UKN14": 2285,
	"2016/UKN15": 2286,
	"2016/UKN16": 2287,
	"2021/AL": 2201,
	"2021/AT": 0,
	"2021/BE": 1,
	"2021/BG": 2,
	"2021/CH": 3,
	"2021/CY": 4,
	"2021/CZ": 5,
	"2021/DE": 6,
	"2021/DK": 7,
	"2021/EE": 8,
	"2021/EL": 12,
	"2021/ES": 9,
	"2021/FI": 10,
	"2021/FR": 11,
	"2021/HR": 13,
	"2021/HU": 14,
	"2021/IE": 15,
	"2021/IS": 16,
	"2021/IT": 17,
	"2021/LI": 18,
	"2021/LT": 19,
	"2021/LU": 20,
	"2021/LV": 21,
	"2021/ME": 1891,
	"2021/MK": 1892,
	"2021/MT": 22,
	"2021/NL": 23,
	"2021/NO": 24,
	"2021/PL": 25,
	"2021/PT": 26,
	"2021/RO": 27,
	"2021/RS": 2202,
	"2021/SE": 28,
	"2021/SI": 29,
	"2021/SK": 30,
	"2021/TR": 31,
	"2021/UK": 32,
	"2021/AL0": 2203,
	"2021/AT1": 33,
	"2021/AT2": 34,
	"2021/AT3": 35,
	"2021/BE1": 36,
	"2021/BE2": 37,
	"2021/BE3": 38,
	"2021/BG3": 39,
	"2021/BG4": 40,
	"2021/CH0": 41,
	"2021/CY0": 42,
	"2021/CZ0": 43,
	"2021/DE1": 44,
	"2021/DE2": 45,
	"2021/DE3": 46,
	"2021/DE4": 47,
	"2021/DE5": 48,
	"2021/DE6": 49,
	"2021/DE7": 50,
	"2021/DE8": 51,
	"2021/DE9": 52,
	"2021/DEA": 53,
	"2021/DEB": 54,
	"2021/DEC": 55,
	"2021/DED": 56,
	"2021/DEE": 57,
	"2021/DEF": 58,
	"2021/DEG": 59,
	"2021/DK0": 60,
	"2021/EE0": 61,
	"2021/EL3": 82,
	"2021/EL4": 83,
	"2021/EL5": 2081,
	"2021/EL6": 2082,
	"2021/ES1": 62,
	"2021/ES2": 63,
	"2021/ES3": 64,
	"2021/ES4": 65,
	"2021/ES5": 66,
	"2021/ES6": 67,
	"2021/ES7": 68,
	"2021/FI1": 69,
	"2021/FI2": 70,
	"2021/FR1": 71,
	"2021/FRB": 2204,
	"2021/FRC": 2205,
	"2021/FRD": 2206,
	"2021/FRE": 2207,
	"2021/FRF": 2208,
	"2021/FRG": 2209,
	"2021/FRH": 2210,
	"2021/FRI": 2211,
	"2021/FRJ": 2212,
	"2021/FRK": 77,
	"2021/FRL": 2213,
	"2021/FRM": 2214,
	"2021/FRY": 2083,
	"2021/HR0": 84,
	"2021/HU1": 85,
	"2021/HU2": 86,
	"2021/HU3": 87,
	"2021/IE0": 88,
	"2021/IS0": 89,
	"2021/ITC": 90,
	"2021/ITF": 93,
	"2021/ITG": 94,
	"2021/ITH": 2014,
	"2021/ITI": 2015,
	"2021/LI0": 95,
	"2021/LT0": 96,
	"2021/LU0": 97,
	"2021/LV0": 98,
	"2021/ME0": 1893,
	"2021/MK0": 1894,
	"2021/MT0": 99,
	"2021/NL1": 100,
	"2021/NL2": 101,
	"2021/NL3": 102,
	"2021/NL4": 103,
	"2021/NO0": 104,
	"2021/PL2": 106,
	"2021/PL4": 108,
	"2021/PL5": 109,
	"2021/PL6": 110,
	"2021/PL7": 2215,
	"2021/PL8": 2216,
	"2021/PL9": 2217,
	"2021/PT1": 111,
	"2021/PT2": 112,
	"2021/PT3": 113,
	"2021/RO1": 114,
	"2021/RO2": 115,
	"2021/RO3": 116,
	"2021/RO4": 117,
	"2021/RS1": 2218,
	"2021/RS2": 2219,
	"2021/SE1": 1895,
	"2021/SE2": 1896,
	"2021/SE3": 1897,
	"2021/SI0": 119,
	"2021/SK0": 120,
	"2021/TR1": 121,
	"2021/TR2": 122,
	"2021/TR3": 123,
	"2021/TR4": 124,
	"2021/TR5": 125,
	"2021/TR6": 126,
	"2021/TR7": 127,
	"2021/TR8": 128,
	"2021/TR9": 129,
	"2021/TRA": 130,
	"2021/TRB": 131,
	"2021/TRC": 132,
	"2021/UKC": 133,
	"2021/UKD": 134,
	"2021/UKE": 135,
	"2021/UKF": 136,
	"2021/UKG": 137,
	"2021/UKH": 138,
	"2021/UKI": 139,
	"2021/UKJ": 140,
	"2021/UKK": 141,
	"2021/UKL": 142,
	"2021/UKM": 143,
	"2021/UKN": 144,
	"2021/AL01": 2220,
	"2021/AL02": 2221,
	"2021/AL03": 2222,
	"2021/AT11": 145,
	"2021/AT12": 146,
	"2021/AT13": 147,
	"2021/AT21": 148,
	"2021/AT22": 149,
	"2021/AT31": 150,
	"2021/AT32": 151,
	"2021/AT33": 152,
	"2021/AT34": 153,
	"2021/BE10": 154,
	"2021/BE21": 155,
	"2021/BE22": 156,
	"2021/BE23": 157,
	"2021/BE24": 158,
	"2021/BE25": 159,
	"2021/BE31": 160,
	"2021/BE32": 161,
	"2021/BE33": 162,
	"2021/BE34": 163,
	"2021/BE35": 164,
	"2021/BG31": 165,
	"2021/BG32": 166,
	"2021/BG33": 167,
	"2021/BG34": 168,
	"2021/BG41": 169,
	"2021/BG42": 170,
	"2021/CH01": 171,
	"2021/CH02": 172,
	"2021/CH03": 173,
	"2021/CH04": 174,
	"2021/CH05": 175,
	"2021/CH06": 176,
	"2021/CH07": 177,
	"2021/CY00": 178,
	"2021/CZ01": 179,
	"2021/CZ02": 180,
	"2021/CZ03": 181,
	"2021/CZ04": 182,
	"2021/CZ05": 183,
	"2021/CZ06": 184,
	"2021/CZ07": 185,
	"2021/CZ08": 186,
	"2021/DE11": 187,
	"2021/DE12": 188,
	"2021/DE13": 189,
	"2021/DE14": 190,
	"2021/DE21": 191,
	"2021/DE22": 192,
	"2021/DE23": 193,
	"2021/DE24": 194,
	"2021/DE25": 195,
	"2021/DE26": 196,
	"2021/DE27": 197,
	"2021/DE30": 198,
	"2021/DE40": 2017,
	"2021/DE50": 201,
	"2021/DE60": 202,
	"2021/DE71": 203,
	"2021/DE72": 204,
	"2021/DE73": 205,
	"2021/DE80": 206,
	"2021/DE91": 207,
	"2021/DE92": 208,
	"2021/DE93": 209,
	"2021/DE94": 210,
	"2021/DEA1": 211,
	"2021/DEA2": 212,
	"2021/DEA3": 213,
	"2021/DEA4": 214,
	"2021/DEA5": 215,
	"2021/DEB1": 216,
	"2021/DEB2": 217,
	"2021/DEB3": 218,
	"2021/DEC0": 219,
	"2021/DED2": 221,
	"2021/DED4": 2018,
	"2021/DED5": 2019,
	"2021/DEE0": 1898,
	"2021/DEF0": 226,
	"2021/DEG0": 227,
	"2021/DK01": 1899,
	"2021/DK02": 1900,
	"2021/DK03": 1901,
	"2021/DK04": 1902,
	"2021/DK05": 1903,
	"2021/EE00": 229,
	"2021/EL30": 289,
	"2021/EL41": 290,
	"2021/EL42": 291,
	"2021/EL43": 292,
	"2021/EL51": 280,
	"2021/EL52": 281,
	"2021/EL53": 282,
	"2021/EL54": 284,
	"2021/EL61": 283,
	"2021/EL62": 285,
	"2021/EL63": 286,
	"2021/EL64": 287,
	"2021/EL65": 288,
	"2021/ES11": 230,
	"2021/ES12": 231,
	"2021/ES13": 232,
	"2021/ES21": 233,
	"2021/ES22": 234,
	"2021/ES23": 235,
	"2021/ES24": 236,
	"2021/ES30": 237,
	"2021/ES41": 238,
	"2021/ES42": 239,
	"2021/ES43": 240,
	"2021/ES51": 241,
	"2021/ES52": 242,
	"2021/ES53": 243,
	"2021/ES61": 244,
	"2021/ES62": 245,
	"2021/ES63": 246,
	"2021/ES64": 247,
	"2021/ES70": 248,
	"2021/FI19": 251,
	"2021/FI1B": 2020,
	"2021/FI1C": 2021,
	"2021/FI1D": 2022,
	"2021/FI20": 253,
	"2021/FR10": 254,
	"2021/FRB0": 258,
	"2021/FRC1": 260,
	"2021/FRC2": 264,
	"2021/FRD1": 259,
	"2021/FRD2": 257,
	"2021/FRE1": 261,
	"2021/FRE2": 256,
	"2021/FRF1": 263,
	"2021/FRF2": 255,
	"2021/FRF3": 262,
	"2021/FRG0": 265,
	"2021/FRH0": 266,
	"2021/FRI1": 268,
	"2021/FRI2": 270,
	"2021/FRI3": 267,
	"2021/FRJ1": 273,
	"2021/FRJ2": 269,
	"2021/FRK1": 272,
	"2021/FRK2": 271,
	"2021/FRL0": 274,
	"2021/FRM0": 275,
	"2021/FRY1": 2084,
	"2021/FRY2": 277,
	"2021/FRY3": 278,
	"2021/FRY4": 279,
	"2021/FRY5": 2085,
	"2021/HR02": 2288,
	"2021/HR03": 295,
	"2021/HR05": 2289,
	"2021/HR06": 2290,
	"2021/HU11": 2223,
	"2021/HU12": 2224,
	"2021/HU21": 297,
	"2021/HU22": 298,
	"2021/HU23": 299,
	"2021/HU31": 300,
	"2021/HU32": 301,
	"2021/HU33": 302,
	"2021/IE04": 2225,
	"2021/IE05": 2226,
	"2021/IE06": 2227,
	"2021/IS00": 305,
	"2021/ITC1": 306,
	"2021/ITC2": 307,
	"2021/ITC3": 308,
	"2021/ITC4": 309,
	"2021/ITF1": 319,
	"2021/ITF2": 320,
	"2021/ITF3": 321,
	"2021/ITF4": 322,
	"2021/ITF5": 323,
	"2021/ITF6": 324,
	"2021/ITG1": 325,
	"2021/ITG2": 326,
	"2021/ITH1": 310,
	"2021/ITH2": 311,
	"2021/ITH3": 312,
	"2021/ITH4": 313,
	"2021/ITH5": 2024,
	"2021/ITI1": 315,
	"2021/ITI2": 316,
	"2021/ITI3": 2025,
	"2021/ITI4": 318,
	"2021/LI00": 327,
	"2021/LT01": 2228,
	"2021/LT02": 2229,
	"2021/LU00": 329,
	"2021/LV00": 330,
	"2021/ME00": 1904,
	"2021/MK00": 1905,
	"2021/MT00": 331,
	"2021/NL11": 332,
	"2021/NL12": 333,
	"2021/NL13": 334,
	"2021/NL21": 335,
	"2021/NL22": 336,
	"2021/NL23": 337,
	"2021/NL31": 338,
	"2021/NL32": 339,
	"2021/NL33": 340,
	"2021/NL34": 341,
	"2021/NL41": 342,
	"2021/NL42": 343,
	"2021/NO02": 345,
	"2021/NO06": 349,
	"2021/NO07": 350,
	"2021/NO08": 2291,
	"2021/NO09": 2292,
	"2021/NO0A": 348,
	"2021/NO0B": 2293,
	"2021/PL21": 353,
	"2021/PL22": 354,
	"2021/PL41": 359,
	"2021/PL42": 360,
	"2021/PL43": 361,
	"2021/PL51": 362,
	"2021/PL52": 363,
	"2021/PL61": 364,
	"2021/PL62": 365,
	"2021/PL63": 366,
	"2021/PL71": 351,
	"2021/PL72": 357,
	"2021/PL81": 355,
	"2021/PL82": 356,
	"2021/PL84": 358,
	"2021/PL91": 2230,
	"2021/PL92": 2231,
	"2021/PT11": 367,
	"2021/PT15": 368,
	"2021/PT16": 369,
	"2021/PT17": 370,
	"2021/PT18": 371,
	"2021/PT20": 372,
	"2021/PT30": 373,
	"2021/RO11": 374,
	"2021/RO12": 375,
	"2021/RO21": 376,
	"2021/RO22": 377,
	"2021/RO31": 378,
	"2021/RO32": 379,
	"2021/RO41": 380,
	"2021/RO42": 381,
	"2021/RS11": 2232,
	"2021/RS12": 2233,
	"2021/RS21": 2234,
	"2021/RS22": 2235,
	"2021/SE11": 382,
	"2021/SE12": 383,
	"2021/SE21": 388,
	"2021/SE22": 384,
	"2021/SE23": 389,
	"2021/SE31": 385,
	"2021/SE32": 386,
	"2021/SE33": 387,
	"2021/SI03": 2086,
	"2021/SI04": 2087,
	"2021/SK01": 391,
	"2021/SK02": 392,
	"2021/SK03": 393,
	"2021/SK04": 394,
	"2021/TR10": 395,
	"2021/TR21": 396,
	"2021/TR22": 397,
	"2021/TR31": 398,
	"2021/TR32": 399,
	"2021/TR33": 400,
	"2021/TR41": 401,
	"2021/TR42": 402,
	"2021/TR51": 403,
	"2021/TR52": 404,
	"2021/TR61": 405,
	"2021/TR62": 406,
	"2021/TR63": 407,
	"2021/TR71": 408,
	"2021/TR72": 409,
	"2021/TR81": 410,
	"2021/TR82": 411,
	"2021/TR83": 412,
	"2021/TR90": 413,
	"2021/TRA1": 414,
	"2021/TRA2": 415,
	"2021/TRB1": 416,
	"2021/TRB2": 417,
	"2021/TRC1": 418,
	"2021/TRC2": 419,
	"2021/TRC3": 420,
	"2021/UKC1": 421,
	"2021/UKC2": 422,
	"2021/UKD1": 423,
	"2021/UKD3": 425,
	"2021/UKD4": 426,
	"2021/UKD6": 2026,
	"2021/UKD7": 2027,
	"2021/UKE1": 428,
	"2021/UKE2": 429,
	"2021/UKE3": 430,
	"2021/UKE4": 431,
	"2021/UKF1": 432,
	"2021/UKF2": 433,
	"2021/UKF3": 434,
	"2021/UKG1": 435,
	"2021/UKG2": 436,
	"2021/UKG3": 437,
	"2021/UKH1": 438,
	"2021/UKH2": 439,
	"2021/UKH3": 440,
	"2021/UKI3": 2088,
	"2021/UKI4": 2089,
	"2021/UKI5": 2090,
	"2021/UKI6": 2091,
	"2021/UKI7": 2092,
	"2021/UKJ1": 443,
	"2021/UKJ2": 444,
	"2021/UKJ3": 445,
	"2021/UKJ4": 446,
	"2021/UKK1": 447,
	"2021/UKK2": 448,
	"2021/UKK3": 449,
	"2021/UKK4": 450,
	"2021/UKL1": 451,
	"2021/UKL2": 452,
	"2021/UKM5": 1908,
	"2021/UKM6": 1909,
	"2021/UKM7": 454,
	"2021/UKM8": 2236,
	"2021/UKM9": 2237,
	"2021/UKN0": 457,
	"2021/AL011": 2238,
	"2021/AL012": 2239,
	"2021/AL013": 2240,
	"2021/AL014": 2241,
	"2021/AL015": 2242,
	"2021/AL021": 2243,
	"2021/AL022": 2244,
	"2021/AL031": 2245,
	"2021/AL032": 2246,
	"2021/AL033": 2247,
	"2021/AL034": 2248,
	"2021/AL035": 2249,
	"2021/AT111": 458,
	"2021/AT112": 459,
	"2021/AT113": 460,
	"2021/AT121": 461,
	"2021/AT122": 462,
	"2021/AT123": 463,
	"2021/AT124": 464,
	"2021/AT125": 465,
	"2021/AT126": 466,
	"2021/AT127": 467,
	"2021/AT130": 468,
	"2021/AT211": 469,
	"2021/AT212": 470,
	"2021/AT213": 471,
	"2021/AT221": 472,
	"2021/AT222": 473,
	"2021/AT223": 474,
	"2021/AT224": 475,
	"2021/AT225": 476,
	"2021/AT226": 477,
	"2021/AT311": 478,
	"2021/AT312": 479,
	"2021/AT313": 480,
	"2021/AT314": 481,
	"2021/AT315": 482,
	"2021/AT321": 483,
	"2021/AT322": 484,
	"2021/AT323": 485,
	"2021/AT331": 486,
	"2021/AT332": 487,
	"2021/AT333": 488,
	"2021/AT334": 489,
	"2021/AT335": 490,
	"2021/AT341": 491,
	"2021/AT342": 492,
	"2021/BE100": 493,
	"2021/BE211": 494,
	"2021/BE212": 495,
	"2021/BE213": 496,
	"2021/BE223": 499,
	"2021/BE224": 497,
	"2021/BE225": 498,
	"2021/BE231": 500,
	"2021/BE232": 501,
	"2021/BE233": 502,
	"2021/BE234": 503,
	"2021/BE235": 504,
	"2021/BE236": 505,
	"2021/BE241": 506,
	"2021/BE242": 507,
	"2021/BE251": 508,
	"2021/BE252": 509,
	"2021/BE253": 510,
	"2021/BE254": 511,
	"2021/BE255": 512,
	"2021/BE256": 513,
	"2021/BE257": 514,
	"2021/BE258": 515,
	"2021/BE310": 516,
	"2021/BE323": 519,
	"2021/BE328": 2294,
	"2021/BE329": 2295,
	"2021/BE32A": 517,
	"2021/BE32B": 518,
	"2021/BE32C": 521,
	"2021/BE32D": 522,
	"2021/BE331": 524,
	"2021/BE332": 525,
	"2021/BE334": 527,
	"2021/BE335": 1910,
	"2021/BE336": 1911,
	"2021/BE341": 528,
	"2021/BE342": 529,
	"2021/BE343": 530,
	"2021/BE344": 531,
	"2021/BE345": 532,
	"2021/BE351": 533,
	"2021/BE352": 534,
	"2021/BE353": 535,
	"2021/BG311": 536,
	"2021/BG312": 537,
	"2021/BG313": 538,
	"2021/BG314": 539,
	"2021/BG315": 540,
	"2021/BG321": 541,
	"2021/BG322": 542,
	"2021/BG323": 543,
	"2021/BG324": 544,
	"2021/BG325": 545,
	"2021/BG331": 546,
	"2021/BG332": 547,
	"2021/BG333": 548,
	"2021/BG334": 549,
	"2021/BG341": 550,
	"2021/BG342": 551,
	"2021/BG343": 552,
	"2021/BG344": 553,
	"2021/BG411": 554,
	"2021/BG412": 555,
	"2021/BG413": 556,
	"2021/BG414": 557,
	"2021/BG415": 558,
	"2021/BG421": 559,
	"2021/BG422": 560,
	"2021/BG423": 561,
	"2021/BG424": 562,
	"2021/BG425": 563,
	"2021/CH011": 564,
	"2021/CH012": 565,
	"2021/CH013": 566,
	"2021/CH021": 567,
	"2021/CH022": 568,
	"2021/CH023": 569,
	"2021/CH024": 570,
	"2021/CH025": 571,
	"2021/CH031": 572,
	"2021/CH032": 573,
	"2021/CH033": 574,
	"2021/CH040": 575,
	"2021/CH051": 576,
	"2021/CH052": 577,
	"2021/CH053": 578,
	"2021/CH054": 579,
	"2021/CH055": 580,
	"2021/CH056": 581,
	"2021/CH057": 582,
	"2021/CH061": 583,
	"2021/CH062": 584,
	"2021/CH063": 585,
	"2021/CH064": 586,
	"2021/CH065": 587,
	"2021/CH066": 588,
	"2021/CH070": 589,
	"2021/CY000": 590,
	"2021/CZ010": 591,
	"2021/CZ020": 592,
	"2021/CZ031": 593,
	"2021/CZ032": 594,
	"2021/CZ041": 595,
	"2021/CZ042": 596,
	"2021/CZ051": 597,
	"2021/CZ052": 598,
	"2021/CZ053": 599,
	"2021/CZ063": 1912,
	"2021/CZ064": 1913,
	"2021/CZ071": 602,
	"2021/CZ072": 603,
	"2021/CZ080": 604,
	"2021/DE111": 605,
	"2021/DE112": 606,
	"2021/DE113": 607,
	"2021/DE114": 608,
	"2021/DE115": 609,
	"2021/DE116": 610,
	"2021/DE117": 611,
	"2021/DE118": 612,
	"2021/DE119": 613,
	"2021/DE11A": 614,
	"2021/DE11B": 615,
	"2021/DE11C": 616,
	"2021/DE11D": 617,
	"2021/DE121": 618,
	"2021/DE122": 619,
	"2021/DE123": 620,
	"2021/DE124": 621,
	"2021/DE125": 622,
	"2021/DE126": 623,
	"2021/DE127": 624,
	"2021/DE128": 625,
	"2021/DE129": 626,
	"2021/DE12A": 627,
	"2021/DE12B": 628,
	"2021/DE12C": 629,
	"2021/DE131": 630,
	"2021/DE132": 631,
	"2021/DE133": 632,
	"2021/DE134": 633,
	"2021/DE135": 634,
	"2021/DE136": 635,
	"2021/DE137": 636,
	"2021/DE138": 637,
	"2021/DE139": 638,
	"2021/DE13A": 639,
	"2021/DE141": 640,
	"2021/DE142": 641,
	"2021/DE143": 642,
	"2021/DE144": 643,
	"2021/DE145": 644,
	"2021/DE146": 645,
	"2021/DE147": 646,
	"2021/DE148": 647,
	"2021/DE149": 648,
	"2021/DE211": 649,
	"2021/DE212": 650,
	"2021/DE213": 651,
	"2021/DE214": 652,
	"2021/DE215": 653,
	"2021/DE216": 654,
	"2021/DE217": 655,
	"2021/DE218": 656,
	"2021/DE219": 657,
	"2021/DE21A": 658,
	"2021/DE21B": 659,
	"2021/DE21C": 660,
	"2021/DE21D": 661,
	"2021/DE21E": 662,
	"2021/DE21F": 663,
	"2021/DE21G": 664,
	"2021/DE21H": 665,
	"2021/DE21I": 666,
	"2021/DE21J": 667,
	"2021/DE21K": 668,
	"2021/DE21L": 669,
	"2021/DE21M": 670,
	"2021/DE21N": 671,
	"2021/DE221": 672,
	"2021/DE222": 673,
	"2021/DE223": 674,
	"2021/DE224": 675,
	"2021/DE225": 676,
	"2021/DE226": 677,
	"2021/DE227": 678,
	"2021/DE228": 679,
	"2021/DE229": 680,
	"2021/DE22A": 681,
	"2021/DE22B": 682,
	"2021/DE22C": 683,
	"2021/DE231": 684,
	"2021/DE232": 685,
	"2021/DE233": 686,
	"2021/DE234": 687,
	"2021/DE235": 688,
	"2021/DE236": 689,
	"2021/DE237": 690,
	"2021/DE238": 691,
	"2021/DE239": 692,
	"2021/DE23A": 693,
	"2021/DE241": 694,
	"2021/DE242": 695,
	"2021/DE243": 696,
	"2021/DE244": 697,
	"2021/DE245": 698,
	"2021/DE246": 699,
	"2021/DE247": 700,
	"2021/DE248": 701,
	"2021/DE249": 702,
	"2021/DE24A": 703,
	"2021/DE24B": 704,
	"2021/DE24C": 705,
	"2021/DE24D": 706,
	"2021/DE251": 707,
	"2021/DE252": 708,
	"2021/DE253": 709,
	"2021/DE254": 710,
	"2021/DE255": 711,
	"2021/DE256": 712,
	"2021/DE257": 713,
	"2021/DE258": 714,
	"2021/DE259": 715,
	"2021/DE25A": 716,
	"2021/DE25B": 717,
	"2021/DE25C": 718,
	"2021/DE261": 719,
	"2021/DE262": 720,
	"2021/DE263": 721,
	"2021/DE264": 722,
	"2021/DE265": 723,
	"2021/DE266": 724,
	"2021/DE267": 725,
	"2021/DE268": 726,
	"2021/DE269": 727,
	"2021/DE26A": 728,
	"2021/DE26B": 729,
	"2021/DE26C": 730,
	"2021/DE271": 731,
	"2021/DE272": 732,
	"2021/DE273": 733,
	"2021/DE274": 734,
	"2021/DE275": 735,
	"2021/DE276": 736,
	"2021/DE277": 737,
	"2021/DE278": 738,
	"2021/DE279": 739,
	"2021/DE27A": 740,
	"2021/DE27B": 741,
	"2021/DE27C": 742,
	"2021/DE27D": 743,
	"2021/DE27E": 744,
	"2021/DE300": 745,
	"2021/DE401": 754,
	"2021/DE402": 755,
	"2021/DE403": 746,
	"2021/DE404": 756,
	"2021/DE405": 747,
	"2021/DE406": 757,
	"2021/DE407": 758,
	"2021/DE408": 759,
	"2021/DE409": 748,
	"2021/DE40A": 749,
	"2021/DE40B": 760,
	"2021/DE40C": 750,
	"2021/DE40D": 751,
	"2021/DE40E": 761,
	"2021/DE40F": 752,
	"2021/DE40G": 762,
	"2021/DE40H": 763,
	"2021/DE40I": 753,
	"2021/DE501": 764,
	"2021/DE502": 765,
	"2021/DE600": 766,
	"2021/DE711": 767,
	"2021/DE712": 768,
	"2021/DE713": 769,
	"2021/DE714": 770,
	"2021/DE715": 771,
	"2021/DE716": 772,
	"2021/DE717": 773,
	"2021/DE718": 774,
	"2021/DE719": 775,
	"2021/DE71A": 776,
	"2021/DE71B": 777,
	"2021/DE71C": 778,
	"2021/DE71D": 779,
	"2021/DE71E": 780,
	"2021/DE721": 781,
	"2021/DE722": 782,
	"2021/DE723": 783,
	"2021/DE724": 784,
	"2021/DE725": 785,
	"2021/DE731": 786,
	"2021/DE732": 787,
	"2021/DE733": 788,
	"2021/DE734": 789,
	"2021/DE735": 790,
	"2021/DE736": 791,
	"2021/DE737": 792,
	"2021/DE803": 795,
	"2021/DE804": 796,
	"2021/DE80J": 2093,
	"2021/DE80K": 2094,
	"2021/DE80L": 2095,
	"2021/DE80M": 2096,
	"2021/DE80N": 2097,
	"2021/DE80O": 2098,
	"2021/DE911": 811,
	"2021/DE912": 812,
	"2021/DE913": 813,
	"2021/DE914": 814,
	"2021/DE916": 816,
	"2021/DE917": 817,
	"2021/DE918": 818,
	"2021/DE91A": 820,
	"2021/DE91B": 821,
	"2021/DE91C": 2250,
	"2021/DE922": 822,
	"2021/DE923": 823,
	"2021/DE925": 824,
	"2021/DE926": 825,
	"2021/DE927": 826,
	"2021/DE928": 827,
	"2021/DE929": 828,
	"2021/DE931": 829,
	"2021/DE932": 830,
	"2021/DE933": 831,
	"2021/DE934": 832,
	"2021/DE935": 833,
	"2021/DE936": 834,
	"2021/DE937": 835,
	"2021/DE938": 836,
	"2021/DE939": 837,
	"2021/DE93A": 838,
	"2021/DE93B": 839,
	"2021/DE941": 840,
	"2021/DE942": 841,
	"2021/DE943": 842,
	"2021/DE944": 843,
	"2021/DE945": 844,
	"2021/DE946": 845,
	"2021/DE947": 846,
	"2021/DE948": 847,
	"2021/DE949": 848,
	"2021/DE94A": 849,
	"2021/DE94B": 850,
	"2021/DE94C": 851,
	"2021/DE94D": 852,
	"2021/DE94E": 853,
	"2021/DE94F": 854,
	"2021/DE94G": 855,
	"2021/DE94H": 856,
	"2021/DEA11": 857,
	"2021/DEA12": 858,
	"2021/DEA13": 859,
	"2021/DEA14": 860,
	"2021/DEA15": 861,
	"2021/DEA16": 862,
	"2021/DEA17": 863,
	"2021/DEA18": 864,
	"2021/DEA19": 865,
	"2021/DEA1A": 866,
	"2021/DEA1B": 867,
	"2021/DEA1C": 868,
	"2021/DEA1D": 869,
	"2021/DEA1E": 870,
	"2021/DEA1F": 871,
	"2021/DEA22": 873,
	"2021/DEA23": 874,
	"2021/DEA24": 875,
	"2021/DEA26": 877,
	"2021/DEA27": 878,
	"2021/DEA28": 879,
	"2021/DEA29": 880,
	"2021/DEA2A": 881,
	"2021/DEA2B": 882,
	"2021/DEA2C": 883,
	"2021/DEA2D": 2028,
	"2021/DEA31": 884,
	"2021/DEA32": 885,
	"2021/DEA33": 886,
	"2021/DEA34": 887,
	"2021/DEA35": 888,
	"2021/DEA36": 889,
	"2021/DEA37": 890,
	"2021/DEA38": 891,
	"2021/DEA41": 892,
	"2021/DEA42": 893,
	"2021/DEA43": 894,
	"2021/DEA44": 895,
	"2021/DEA45": 896,
	"2021/DEA46": 897,
	"2021/DEA47": 898,
	"2021/DEA51": 899,
	"2021/DEA52": 900,
	"2021/DEA53": 901,
	"2021/DEA54": 902,
	"2021/DEA55": 903,
	"2021/DEA56": 904,
	"2021/DEA57": 905,
	"2021/DEA58": 906,
	"2021/DEA59": 907,
	"2021/DEA5A": 908,
	"2021/DEA5B": 909,
	"2021/DEA5C": 910,
	"2021/DEB11": 911,
	"2021/DEB12": 912,
	"2021/DEB13": 913,
	"2021/DEB14": 914,
	"2021/DEB15": 915,
	"2021/DEB17": 917,
	"2021/DEB18": 918,
	"2021/DEB1A": 920,
	"2021/DEB1B": 921,
	"2021/DEB1C": 916,
	"2021/DEB1D": 919,
	"2021/DEB21": 922,
	"2021/DEB22": 923,
	"2021/DEB23": 924,
	"2021/DEB24": 925,
	"2021/DEB25": 926,
	"2021/DEB31": 927,
	"2021/DEB32": 928,
	"2021/DEB33": 929,
	"2021/DEB34": 930,
	"2021/DEB35": 931,
	"2021/DEB36": 932,
	"2021/DEB37": 933,
	"2021/DEB38": 934,
	"2021/DEB39": 935,
	"2021/DEB3A": 936,
	"2021/DEB3B": 937,
	"2021/DEB3C": 938,
	"2021/DEB3D": 939,
	"2021/DEB3E": 940,
	"2021/DEB3F": 941,
	"2021/DEB3G": 942,
	"2021/DEB3H": 943,
	"2021/DEB3I": 944,
	"2021/DEB3J": 945,
	"2021/DEB3K": 946,
	"2021/DEC01": 947,
	"2021/DEC02": 948,
	"2021/DEC03": 949,
	"2021/DEC04": 950,
	"2021/DEC05": 951,
	"2021/DEC06": 952,
	"2021/DED21": 965,
	"2021/DED2C": 2029,
	"2021/DED2D": 2030,
	"2021/DED2E": 2031,
	"2021/DED2F": 2032,
	"2021/DED41": 953,
	"2021/DED42": 2033,
	"2021/DED43": 2034,
	"2021/DED44": 2035,
	"2021/DED45": 2036,
	"2021/DED51": 976,
	"2021/DED52": 2037,
	"2021/DED53": 2038,
	"2021/DEE01": 1914,
	"2021/DEE02": 988,
	"2021/DEE03": 995,
	"2021/DEE04": 1005,
	"2021/DEE05": 1915,
	"2021/DEE06": 1916,
	"2021/DEE07": 1917,
	"2021/DEE08": 1918,
	"2021/DEE09": 1919,
	"2021/DEE0A": 1920,
	"2021/DEE0B": 1921,
	"2021/DEE0C": 1922,
	"2021/DEE0D": 1001,
	"2021/DEE0E": 1923,
	"2021/DEF01": 1006,
	"2021/DEF02": 1007,
	"2021/DEF03": 1008,
	"2021/DEF04": 1009,
	"2021/DEF05": 1010,
	"2021/DEF06": 1011,
	"2021/DEF07": 1012,
	"2021/DEF08": 1013,
	"2021/DEF09": 1014,
	"2021/DEF0A": 1015,
	"2021/DEF0B": 1016,
	"2021/DEF0C": 1017,
	"2021/DEF0D": 1018,
	"2021/DEF0E": 1019,
	"2021/DEF0F": 1020,
	"2021/DEG01": 1021,
	"2021/DEG02": 1022,
	"2021/DEG03": 1023,
	"2021/DEG04": 1024,
	"2021/DEG05": 1025,
	"2021/DEG06": 1026,
	"2021/DEG07": 1027,
	"2021/DEG09": 1028,
	"2021/DEG0A": 1029,
	"2021/DEG0B": 1030,
	"2021/DEG0C": 1031,
	"2021/DEG0D": 1032,
	"2021/DEG0E": 1033,
	"2021/DEG0F": 1034,
	"2021/DEG0G": 1035,
	"2021/DEG0H": 1036,
	"2021/DEG0I": 1037,
	"2021/DEG0J": 1038,
	"2021/DEG0K": 1039,
	"2021/DEG0L": 1040,
	"2021/DEG0M": 1041,
	"2021/DEG0N": 1042,
	"2021/DEG0P": 1043,
	"2021/DK011": 1924,
	"2021/DK012": 1925,
	"2021/DK013": 1926,
	"2021/DK014": 1050,
	"2021/DK021": 1927,
	"2021/DK022": 1928,
	"2021/DK031": 1051,
	"2021/DK032": 1929,
	"2021/DK041": 1930,
	"2021/DK042": 1931,
	"2021/DK050": 1932,
	"2021/EE001": 1059,
	"2021/EE004": 1060,
	"2021/EE008": 1063,
	"2021/EE009": 1061,
	"2021/EE00A": 1062,
	"2021/EL301": 2099,
	"2021/EL302": 2100,
	"2021/EL303": 2101,
	"2021/EL304": 2102,
	"2021/EL305": 2103,
	"2021/EL306": 2104,
	"2021/EL307": 2105,
	"2021/EL411": 1278,
	"2021/EL412": 1279,
	"2021/EL413": 1280,
	"2021/EL421": 1281,
	"2021/EL422": 1282,
	"2021/EL431": 1283,
	"2021/EL432": 1284,
	"2021/EL433": 1285,
	"2021/EL434": 1286,
	"2021/EL511": 1236,
	"2021/EL512": 1237,
	"2021/EL513": 1238,
	"2021/EL514": 1239,
	"2021/EL515": 1240,
	"2021/EL521": 1241,
	"2021/EL522": 1242,
	"2021/EL523": 1243,
	"2021/EL524": 1244,
	"2021/EL525": 1245,
	"2021/EL526": 1246,
	"2021/EL527": 1247,
	"2021/EL531": 2106,
	"2021/EL532": 1249,
	"2021/EL533": 1251,
	"2021/EL541": 2107,
	"2021/EL542": 1257,
	"2021/EL543": 1258,
	"2021/EL611": 2108,
	"2021/EL612": 1253,
	"2021/EL613": 1254,
	"2021/EL621": 1260,
	"2021/EL622": 1261,
	"2021/EL623": 1262,
	"2021/EL624": 1263,
	"2021/EL631": 1264,
	"2021/EL632": 1265,
	"2021/EL633": 1266,
	"2021/EL641": 1267,
	"2021/EL642": 1268,
	"2021/EL643": 1269,
	"2021/EL644": 1270,
	"2021/EL645": 1271,
	"2021/EL651": 2109,
	"2021/EL652": 1274,
	"2021/EL653": 2110,
	"2021/ES111": 1064,
	"2021/ES112": 1065,
	"2021/ES113": 1066,
	"2021/ES114": 1067,
	"2021/ES120": 1068,
	"2021/ES130": 1069,
	"2021/ES211": 1070,
	"2021/ES212": 1071,
	"2021/ES213": 1072,
	"2021/ES220": 1073,
	"2021/ES230": 1074,
	"2021/ES241": 1075,
	"2021/ES242": 1076,
	"2021/ES243": 1077,
	"2021/ES300": 1078,
	"2021/ES411": 1079,
	"2021/ES412": 1080,
	"2021/ES413": 1081,
	"2021/ES414": 1082,
	"2021/ES415": 1083,
	"2021/ES416": 1084,
	"2021/ES417": 1085,
	"2021/ES418": 1086,
	"2021/ES419": 1087,
	"2021/ES421": 1088,
	"2021/ES422": 1089,
	"2021/ES423": 1090,
	"2021/ES424": 1091,
	"2021/ES425": 1092,
	"2021/ES431": 1093,
	"2021/ES432": 1094,
	"2021/ES511": 1095,
	"2021/ES512": 1096,
	"2021/ES513": 1097,
	"2021/ES514": 1098,
	"2021/ES521": 1099,
	"2021/ES522": 1100,
	"2021/ES523": 1101,
	"2021/ES531": 1933,
	"2021/ES532": 1934,
	"2021/ES533": 1935,
	"2021/ES611": 1103,
	"2021/ES612": 1104,
	"2021/ES613": 1105,
	"2021/ES614": 1106,
	"2021/ES615": 1107,
	"2021/ES616": 1108,
	"2021/ES617": 1109,
	"2021/ES618": 1110,
	"2021/ES620": 1111,
	"2021/ES630": 1112,
	"2021/ES640": 1113,
	"2021/ES703": 1936,
	"2021/ES704": 1937,
	"2021/ES705": 1938,
	"2021/ES706": 1939,
	"2021/ES707": 1940,
	"2021/ES708": 1941,
	"2021/ES709": 1942,
	"2021/FI193": 1129,
	"2021/FI194": 1130,
	"2021/FI195": 1131,
	"2021/FI196": 1943,
	"2021/FI197": 1944,
	"2021/FI1B1": 2039,
	"2021/FI1C1": 1122,
	"2021/FI1C2": 1123,
	"2021/FI1C3": 1124,
	"2021/FI1C4": 1125,
	"2021/FI1C5": 1126,
	"2021/FI1D1": 1116,
	"2021/FI1D2": 1117,
	"2021/FI1D3": 1118,
	"2021/FI1D5": 1132,
	"2021/FI1D7": 1134,
	"2021/FI1D8": 1119,
	"2021/FI1D9": 1133,
	"2021/FI200": 1135,
	"2021/FR101": 1136,
	"2021/FR102": 1137,
	"2021/FR103": 1138,
	"2021/FR104": 1139,
	"2021/FR105": 1140,
	"2021/FR106": 1141,
	"2021/FR107": 1142,
	"2021/FR108": 1143,
	"2021/FRB01": 1153,
	"2021/FRB02": 1154,
	"2021/FRB03": 1155,
	"2021/FRB04": 1156,
	"2021/FRB05": 1157,
	"2021/FRB06": 1158,
	"2021/FRC11": 1162,
	"2021/FRC12": 1163,
	"2021/FRC13": 1164,
	"2021/FRC14": 1165,
	"2021/FRC21": 1174,
	"2021/FRC22": 1175,
	"2021/FRC23": 1176,
	"2021/FRC24": 1177,
	"2021/FRD11": 1159,
	"2021/FRD12": 1160,
	"2021/FRD13": 1161,
	"2021/FRD21": 1151,
	"2021/FRD22": 1152,
	"2021/FRE11": 1166,
	"2021/FRE12": 1167,
	"2021/FRE21": 1148,
	"2021/FRE22": 1149,
	"2021/FRE23": 1150,
	"2021/FRF11": 1172,
	"2021/FRF12": 1173,
	"2021/FRF21": 1144,
	"2021/FRF22": 1145,
	"2021/FRF23": 1146,
	"2021/FRF24": 1147,
	"2021/FRF31": 1168,
	"2021/FRF32": 1169,
	"2021/FRF33": 1170,
	"2021/FRF34": 1171,
	"2021/FRG01": 1178,
	"2021/FRG02": 1179,
	"2021/FRG03": 1180,
	"2021/FRG04": 1181,
	"2021/FRG05": 1182,
	"2021/FRH01": 1183,
	"2021/FRH02": 1184,
	"2021/FRH03": 1185,
	"2021/FRH04": 1186,
	"2021/FRI11": 1191,
	"2021/FRI12": 1192,
	"2021/FRI13": 1193,
	"2021/FRI14": 1194,
	"2021/FRI15": 1195,
	"2021/FRI21": 1204,
	"2021/FRI22": 1205,
	"2021/FRI23": 1206,
	"2021/FRI31": 1187,
	"2021/FRI32": 1188,
	"2021/FRI33": 1189,
	"2021/FRI34": 1190,
	"2021/FRJ11": 1219,
	"2021/FRJ12": 1220,
	"2021/FRJ13": 1221,
	"2021/FRJ14": 1222,
	"2021/FRJ15": 1223,
	"2021/FRJ21": 1196,
	"2021/FRJ22": 1197,
	"2021/FRJ23": 1198,
	"2021/FRJ24": 1199,
	"2021/FRJ25": 1200,
	"2021/FRJ26": 1201,
	"2021/FRJ27": 1202,
	"2021/FRJ28": 1203,
	"2021/FRK11": 1215,
	"2021/FRK12": 1216,
	"2021/FRK13": 1217,
	"2021/FRK14": 1218,
	"2021/FRK21": 1207,
	"2021/FRK22": 1208,
	"2021/FRK23": 1209,
	"2021/FRK24": 1210,
	"2021/FRK25": 1211,
	"2021/FRK26": 1212,
	"2021/FRK27": 1213,
	"2021/FRK28": 1214,
	"2021/FRL01": 1224,
	"2021/FRL02": 1225,
	"2021/FRL03": 1226,
	"2021/FRL04": 1227,
	"2021/FRL05": 1228,
	"2021/FRL06": 1229,
	"2021/FRM01": 1230,
	"2021/FRM02": 1231,
	"2021/FRY10": 2111,
	"2021/FRY20": 1233,
	"2021/FRY30": 1234,
	"2021/FRY40": 1235,
	"2021/FRY50": 2112,
	"2021/HR021": 2046,
	"2021/HR022": 2047,
	"2021/HR023": 2048,
	"2021/HR024": 2049,
	"2021/HR025": 2050,
	"2021/HR026": 2051,
	"2021/HR027": 2052,
	"2021/HR028": 2053,
	"2021/HR031": 1301,
	"2021/HR032": 1302,
	"2021/HR033": 1303,
	"2021/HR034": 1304,
	"2021/HR035": 1305,
	"2021/HR036": 1306,
	"2021/HR037": 1307,
	"2021/HR050": 2040,
	"2021/HR061": 2045,
	"2021/HR062": 2043,
	"2021/HR063": 2044,
	"2021/HR064": 2042,
	"2021/HR065": 2041,
	"2021/HU110": 1308,
	"2021/HU120": 1309,
	"2021/HU211": 1310,
	"2021/HU212": 1311,
	"2021/HU213": 1312,
	"2021/HU221": 1313,
	"2021/HU222": 1314,
	"2021/HU223": 1315,
	"2021/HU231": 1316,
	"2021/HU232": 1317,
	"2021/HU233": 1318,
	"2021/HU311": 1319,
	"2021/HU312": 1320,
	"2021/HU313": 1321,
	"2021/HU321": 1322,
	"2021/HU322": 1323,
	"2021/HU323": 1324,
	"2021/HU331": 1325,
	"2021/HU332": 1326,
	"2021/HU333": 1327,
	"2021/IE041": 1328,
	"2021/IE042": 1330,
	"2021/IE051": 1333,
	"2021/IE052": 1334,
	"2021/IE053": 1335,
	"2021/IE061": 1331,
	"2021/IE062": 1332,
	"2021/IE063": 1329,
	"2021/IS001": 1945,
	"2021/IS002": 1946,
	"2021/ITC11": 1337,
	"2021/ITC12": 1338,
	"2021/ITC13": 1339,
	"2021/ITC14": 1340,
	"2021/ITC15": 1341,
	"2021/ITC16": 1342,
	"2021/ITC17": 1343,
	"2021/ITC18": 1344,
	"2021/ITC20": 1345,
	"2021/ITC31": 1346,
	"2021/ITC32": 1347,
	"2021/ITC33": 1348,
	"2021/ITC34": 1349,
	"2021/ITC41": 1350,
	"2021/ITC42": 1351,
	"2021/ITC43": 1352,
	"2021/ITC44": 1353,
	"2021/ITC46": 1355,
	"2021/ITC47": 1356,
	"2021/ITC48": 1357,
	"2021/ITC49": 1358,
	"2021/ITC4A": 1359,
	"2021/ITC4B": 1360,
	"2021/ITC4C": 2054,
	"2021/ITC4D": 2055,
	"2021/ITF11": 1404,
	"2021/ITF12": 1405,
	"2021/ITF13": 1406,
	"2021/ITF14": 1407,
	"2021/ITF21": 1408,
	"2021/ITF22": 1409,
	"2021/ITF31": 1410,
	"2021/ITF32": 1411,
	"2021/ITF33": 1412,
	"2021/ITF34": 1413,
	"2021/ITF35": 1414,
	"2021/ITF43": 1417,
	"2021/ITF44": 1418,
	"2021/ITF45": 1419,
	"2021/ITF46": 2056,
	"2021/ITF47": 2057,
	"2021/ITF48": 2058,
	"2021/ITF51": 1420,
	"2021/ITF52": 1421,
	"2021/ITF61": 1422,
	"2021/ITF62": 1423,
	"2021/ITF63": 1424,
	"2021/ITF64": 1425,
	"2021/ITF65": 1426,
	"2021/ITG11": 1427,
	"2021/ITG12": 1428,
	"2021/ITG13": 1429,
	"2021/ITG14": 1430,
	"2021/ITG15": 1431,
	"2021/ITG16": 1432,
	"2021/ITG17": 1433,
	"2021/ITG18": 1434,
	"2021/ITG19": 1435,
	"2021/ITG2D": 1947,
	"2021/ITG2E": 1948,
	"2021/ITG2F": 1949,
	"2021/ITG2G": 1950,
	"2021/ITG2H": 2296,
	"2021/ITH10": 1361,
	"2021/ITH20": 1362,
	"2021/ITH31": 1363,
	"2021/ITH32": 1364,
	"2021/ITH33": 1365,
	"2021/ITH34": 1366,
	"2021/ITH35": 1367,
	"2021/ITH36": 1368,
	"2021/ITH37": 1369,
	"2021/ITH41": 1370,
	"2021/ITH42": 1371,
	"2021/ITH43": 1372,
	"2021/ITH44": 1373,
	"2021/ITH51": 1374,
	"2021/ITH52": 1375,
	"2021/ITH53": 1376,
	"2021/ITH54": 1377,
	"2021/ITH55": 1378,
	"2021/ITH56": 1379,
	"2021/ITH57": 1380,
	"2021/ITH58": 1381,
	"2021/ITH59": 2059,
	"2021/ITI11": 1383,
	"2021/ITI12": 1384,
	"2021/ITI13": 1385,
	"2021/ITI14": 1386,
	"2021/ITI15": 1387,
	"2021/ITI16": 1388,
	"2021/ITI17": 1389,
	"2021/ITI18": 1390,
	"2021/ITI19": 1391,
	"2021/ITI1A": 1392,
	"2021/ITI21": 1393,
	"2021/ITI22": 1394,
	"2021/ITI31": 2060,
	"2021/ITI32": 1396,
	"2021/ITI33": 1397,
	"2021/ITI34": 2061,
	"2021/ITI35": 2062,
	"2021/ITI41": 1399,
	"2021/ITI42": 1400,
	"2021/ITI43": 1401,
	"2021/ITI44": 1402,
	"2021/ITI45": 1403,
	"2021/LI000": 1440,
	"2021/LT011": 1450,
	"2021/LT021": 1441,
	"2021/LT022": 1442,
	"2021/LT023": 1443,
	"2021/LT024": 1444,
	"2021/LT025": 1445,
	"2021/LT026": 1446,
	"2021/LT027": 1447,
	"2021/LT028": 1448,
	"2021/LT029": 1449,
	"2021/LU000": 1451,
	"2021/LV003": 1452,
	"2021/LV005": 1453,
	"2021/LV006": 1454,
	"2021/LV007": 1455,
	"2021/LV008": 1456,
	"2021/LV009": 1457,
	"2021/ME000": 1955,
	"2021/MK001": 1956,
	"2021/MK002": 1957,
	"2021/MK003": 1958,
	"2021/MK004": 1959,
	"2021/MK005": 1960,
	"2021/MK006": 1961,
	"2021/MK007": 1962,
	"2021/MK008": 1963,
	"2021/MT001": 1458,
	"2021/MT002": 1459,
	"2021/NL111": 1460,
	"2021/NL112": 1461,
	"2021/NL113": 1462,
	"2021/NL124": 1463,
	"2021/NL125": 1464,
	"2021/NL126": 1465,
	"2021/NL131": 1466,
	"2021/NL132": 1467,
	"2021/NL133": 1468,
	"2021/NL211": 1469,
	"2021/NL212": 1470,
	"2021/NL213": 1471,
	"2021/NL221": 1472,
	"2021/NL224": 1475,
	"2021/NL225": 1964,
	"2021/NL226": 1965,
	"2021/NL230": 1476,
	"2021/NL310": 1477,
	"2021/NL321": 1478,
	"2021/NL323": 1480,
	"2021/NL324": 1481,
	"2021/NL325": 1482,
	"2021/NL327": 1484,
	"2021/NL328": 1479,
	"2021/NL329": 1483,
	"2021/NL332": 1486,
	"2021/NL333": 1487,
	"2021/NL337": 2063,
	"2021/NL33A": 2066,
	"2021/NL33B": 2064,
	"2021/NL33C": 2065,
	"2021/NL341": 1491,
	"2021/NL342": 1492,
	"2021/NL411": 1493,
	"2021/NL412": 1494,
	"2021/NL413": 1495,
	"2021/NL414": 1496,
	"2021/NL421": 1497,
	"2021/NL422": 1498,
	"2021/NL423": 1499,
	"2021/NO020": 2297,
	"2021/NO060": 2251,
	"2021/NO071": 1516,
	"2021/NO074": 2298,
	"2021/NO081": 1500,
	"2021/NO082": 2299,
	"2021/NO091": 2300,
	"2021/NO092": 2301,
	"2021/NO0A1": 1510,
	"2021/NO0A2": 2302,
	"2021/NO0A3": 1513,
	"2021/NO0B1": 2303,
	"2021/NO0B2": 2304,
	"2021/PL213": 1529,
	"2021/PL214": 1973,
	"2021/PL217": 1976,
	"2021/PL218": 2117,
	"2021/PL219": 2118,
	"2021/PL21A": 2119,
	"2021/PL224": 1530,
	"2021/PL225": 1531,
	"2021/PL227": 1533,
	"2021/PL228": 1977,
	"2021/PL229": 1978,
	"2021/PL22A": 1979,
	"2021/PL22B": 1980,
	"2021/PL22C": 1981,
	"2021/PL411": 1542,
	"2021/PL414": 1545,
	"2021/PL415": 1546,
	"2021/PL416": 1993,
	"2021/PL417": 1994,
	"2021/PL418": 1995,
	"2021/PL424": 1997,
	"2021/PL426": 2120,
	"2021/PL427": 2121,
	"2021/PL428": 2122,
	"2021/PL431": 1549,
	"2021/PL432": 1550,
	"2021/PL514": 1554,
	"2021/PL515": 1999,
	"2021/PL516": 2000,
	"2021/PL517": 2001,
	"2021/PL518": 2002,
	"2021/PL523": 2123,
	"2021/PL524": 2124,
	"2021/PL613": 2005,
	"2021/PL616": 2125,
	"2021/PL617": 2126,
	"2021/PL618": 2127,
	"2021/PL619": 2128,
	"2021/PL621": 1558,
	"2021/PL622": 1559,
	"2021/PL623": 1560,
	"2021/PL633": 1563,
	"2021/PL634": 2008,
	"2021/PL636": 2129,
	"2021/PL637": 2130,
	"2021/PL638": 2131,
	"2021/PL711": 1521,
	"2021/PL712": 1966,
	"2021/PL713": 1967,
	"2021/PL714": 1968,
	"2021/PL715": 1969,
	"2021/PL721": 1988,
	"2021/PL722": 1989,
	"2021/PL811": 1534,
	"2021/PL812": 1535,
	"2021/PL814": 1982,
	"2021/PL815": 1983,
	"2021/PL821": 1984,
	"2021/PL822": 1985,
	"2021/PL823": 1986,
	"2021/PL824": 1987,
	"2021/PL841": 1990,
	"2021/PL842": 1991,
	"2021/PL843": 1992,
	"2021/PL911": 1526,
	"2021/PL912": 1971,
	"2021/PL913": 1972,
	"2021/PL921": 1970,
	"2021/PL922": 2113,
	"2021/PL923": 2114,
	"2021/PL924": 2115,
	"2021/PL925": 2116,
	"2021/PL926": 2252,
	"2021/PT111": 1564,
	"2021/PT112": 1565,
	"2021/PT119": 2132,
	"2021/PT11A": 2133,
	"2021/PT11B": 2134,
	"2021/PT11C": 2135,
	"2021/PT11D": 2136,
	"2021/PT11E": 2137,
	"2021/PT150": 1572,
	"2021/PT16B": 1583,
	"2021/PT16D": 2138,
	"2021/PT16E": 2139,
	"2021/PT16F": 2140,
	"2021/PT16G": 2141,
	"2021/PT16H": 2142,
	"2021/PT16I": 2143,
	"2021/PT16J": 2144,
	"2021/PT170": 2145,
	"2021/PT181": 1587,
	"2021/PT184": 1590,
	"2021/PT185": 1591,
	"2021/PT186": 2146,
	"2021/PT187": 2147,
	"2021/PT200": 1592,
	"2021/PT300": 1593,
	"2021/RO111": 1594,
	"2021/RO112": 1595,
	"2021/RO113": 1596,
	"2021/RO114": 1597,
	"2021/RO115": 1598,
	"2021/RO116": 1599,
	"2021/RO121": 1600,
	"2021/RO122": 1601,
	"2021/RO123": 1602,
	"2021/RO124": 1603,
	"2021/RO125": 1604,
	"2021/RO126": 1605,
	"2021/RO211": 1606,
	"2021/RO212": 1607,
	"2021/RO213": 1608,
	"2021/RO214": 1609,
	"2021/RO215": 1610,
	"2021/RO216": 1611,
	"2021/RO221": 1612,
	"2021/RO222": 1613,
	"2021/RO223": 1614,
	"2021/RO224": 1615,
	"2021/RO225": 1616,
	"2021/RO226": 1617,
	"2021/RO311": 1618,
	"2021/RO312": 1619,
	"2021/RO313": 1620,
	"2021/RO314": 1621,
	"2021/RO315": 1622,
	"2021/RO316": 1623,
	"2021/RO317": 1624,
	"2021/RO321": 1625,
	"2021/RO322": 1626,
	"2021/RO411": 1627,
	"2021/RO412": 1628,
	"2021/RO413": 1629,
	"2021/RO414": 1630,
	"2021/RO415": 1631,
	"2021/RO421": 1632,
	"2021/RO422": 1633,
	"2021/RO423": 1634,
	"2021/RO424": 1635,
	"2021/RS110": 2253,
	"2021/RS121": 2254,
	"2021/RS122": 2255,
	"2021/RS123": 2256,
	"2021/RS124": 2257,
	"2021/RS125": 2258,
	"2021/RS126": 2259,
	"2021/RS127": 2260,
	"2021/RS211": 2261,
	"2021/RS212": 2262,
	"2021/RS213": 2263,
	"2021/RS214": 2264,
	"2021/RS215": 2265,
	"2021/RS216": 2266,
	"2021/RS217": 2267,
	"2021/RS218": 2268,
	"2021/RS221": 2269,
	"2021/RS222": 2270,
	"2021/RS223": 2271,
	"2021/RS224": 2272,
	"2021/RS225": 2273,
	"2021/RS226": 2274,
	"2021/RS227": 2275,
	"2021/RS228": 2276,
	"2021/RS229": 2277,
	"2021/SE110": 1636,
	"2021/SE121": 2010,
	"2021/SE122": 1638,
	"2021/SE123": 1639,
	"2021/SE124": 1640,
	"2021/SE125": 2011,
	"2021/SE211": 1651,
	"2021/SE212": 1652,
	"2021/SE213": 1653,
	"2021/SE214": 1654,
	"2021/SE221": 1642,
	"2021/SE224": 1643,
	"2021/SE231": 1655,
	"2021/SE232": 1656,
	"2021/SE311": 1644,
	"2021/SE312": 1645,
	"2021/SE313": 1646,
	"2021/SE321": 1647,
	"2021/SE322": 1648,
	"2021/SE331": 1649,
	"2021/SE332": 1650,
	"2021/SI031": 1657,
	"2021/SI032": 1658,
	"2021/SI033": 1659,
	"2021/SI034": 2148,
	"2021/SI035": 2149,
	"2021/SI036": 2150,
	"2021/SI037": 1667,
	"2021/SI038": 2151,
	"2021/SI041": 2152,
	"2021/SI042": 1663,
	"2021/SI043": 1665,
	"2021/SI044": 1666,
	"2021/SK010": 1669,
	"2021/SK021": 1670,
	"2021/SK022": 1671,
	"2021/SK023": 1672,
	"2021/SK031": 1673,
	"2021/SK032": 1674,
	"2021/SK041": 1675,
	"2021/SK042": 1676,
	"2021/TR100": 1677,
	"2021/TR211": 1678,
	"2021/TR212": 1679,
	"2021/TR213": 1680,
	"2021/TR221": 1681,
	"2021/TR222": 1682,
	"2021/TR310": 1683,
	"2021/TR321": 1684,
	"2021/TR322": 1685,
	"2021/TR323": 1686,
	"2021/TR331": 1687,
	"2021/TR332": 1688,
	"2021/TR333": 1689,
	"2021/TR334": 1690,
	"2021/TR411": 1691,
	"2021/TR412": 1692,
	"2021/TR413": 1693,
	"2021/TR421": 1694,
	"2021/TR422": 1695,
	"2021/TR423": 1696,
	"2021/TR424": 1697,
	"2021/TR425": 1698,
	"2021/TR510": 1699,
	"2021/TR521": 1700,
	"2021/TR522": 1701,
	"2021/TR611": 1702,
	"2021/TR612": 1703,
	"2021/TR613": 1704,
	"2021/TR621": 1705,
	"2021/TR622": 1706,
	"2021/TR631": 1707,
	"2021/TR632": 1708,
	"2021/TR633": 1709,
	"2021/TR711": 1710,
	"2021/TR712": 1711,
	"2021/TR713": 1712,
	"2021/TR714": 1713,
	"2021/TR715": 1714,
	"2021/TR721": 1715,
	"2021/TR722": 1716,
	"2021/TR723": 1717,
	"2021/TR811": 1718,
	"2021/TR812": 1719,
	"2021/TR813": 1720,
	"2021/TR821": 1721,
	"2021/TR822": 1722,
	"2021/TR823": 1723,
	"2021/TR831": 1724,
	"2021/TR832": 1725,
	"2021/TR833": 1726,
	"2021/TR834": 1727,
	"2021/TR901": 1728,
	"2021/TR902": 1729,
	"2021/TR903": 1730,
	"2021/TR904": 1731,
	"2021/TR905": 1732,
	"2021/TR906": 1733,
	"2021/TRA11": 1734,
	"2021/TRA12": 1735,
	"2021/TRA13": 1736,
	"2021/TRA21": 1737,
	"2021/TRA22": 1738,
	"2021/TRA23": 1739,
	"2021/TRA24": 1740,
	"2021/TRB11": 1741,
	"2021/TRB12": 1742,
	"2021/TRB13": 1743,
	"2021/TRB14": 1744,
	"2021/TRB21": 1745,
	"2021/TRB22": 1746,
	"2021/TRB23": 1747,
	"2021/TRB24": 1748,
	"2021/TRC11": 1749,
	"2021/TRC12": 1750,
	"2021/TRC13": 1751,
	"2021/TRC21": 1752,
	"2021/TRC22": 1753,
	"2021/TRC31": 1754,
	"2021/TRC32": 1755,
	"2021/TRC33": 1756,
	"2021/TRC34": 1757,
	"2021/UKC11": 1758,
	"2021/UKC12": 1759,
	"2021/UKC13": 1760,
	"2021/UKC14": 1761,
	"2021/UKC21": 1762,
	"2021/UKC22": 1763,
	"2021/UKC23": 1764,
	"2021/UKD11": 1765,
	"2021/UKD12": 1766,
	"2021/UKD33": 2153,
	"2021/UKD34": 2154,
	"2021/UKD35": 2155,
	"2021/UKD36": 2156,
	"2021/UKD37": 2157,
	"2021/UKD41": 1771,
	"2021/UKD42": 1772,
	"2021/UKD44": 2158,
	"2021/UKD45": 2159,
	"2021/UKD46": 2160,
	"2021/UKD47": 2161,
	"2021/UKD61": 2067,
	"2021/UKD62": 2068,
	"2021/UKD63": 2069,
	"2021/UKD71": 2070,
	"2021/UKD72": 1775,
	"2021/UKD73": 1776,
	"2021/UKD74": 1777,
	"2021/UKE11": 1778,
	"2021/UKE12": 1779,
	"2021/UKE13": 1780,
	"2021/UKE21": 1781,
	"2021/UKE22": 1782,
	"2021/UKE31": 1783,
	"2021/UKE32": 1784,
	"2021/UKE41": 1785,
	"2021/UKE42": 1786,
	"2021/UKE44": 2071,
	"2021/UKE45": 2072,
	"2021/UKF11": 1788,
	"2021/UKF12": 1789,
	"2021/UKF13": 1790,
	"2021/UKF14": 1791,
	"2021/UKF15": 1792,
	"2021/UKF16": 1793,
	"2021/UKF21": 1794,
	"2021/UKF22": 1795,
	"2021/UKF24": 2073,
	"2021/UKF25": 2074,
	"2021/UKF30": 1797,
	"2021/UKG11": 1798,
	"2021/UKG12": 1799,
	"2021/UKG13": 1800,
	"2021/UKG21": 1801,
	"2021/UKG22": 1802,
	"2021/UKG23": 1803,
	"2021/UKG24": 1804,
	"2021/UKG31": 1805,
	"2021/UKG32": 1806,
	"2021/UKG33": 1807,
	"2021/UKG36": 2075,
	"2021/UKG37": 2076,
	"2021/UKG38": 2077,
	"2021/UKG39": 2078,
	"2021/UKH11": 1810,
	"2021/UKH12": 1811,
	"2021/UKH14": 1813,
	"2021/UKH15": 2162,
	"2021/UKH16": 2163,
	"2021/UKH17": 2164,
	"2021/UKH21": 1814,
	"2021/UKH23": 1816,
	"2021/UKH24": 2079,
	"2021/UKH25": 2080,
	"2021/UKH31": 1817,
	"2021/UKH32": 1818,
	"2021/UKH34": 2165,
	"2021/UKH35": 2166,
	"2021/UKH36": 2167,
	"2021/UKH37": 2168,
	"2021/UKI31": 2169,
	"2021/UKI32": 2170,
	"2021/UKI33": 2171,
	"2021/UKI34": 2172,
	"2021/UKI41": 2173,
	"2021/UKI42": 2174,
	"2021/UKI43": 2175,
	"2021/UKI44": 2176,
	"2021/UKI45": 2177,
	"2021/UKI51": 2178,
	"2021/UKI52": 2179,
	"2021/UKI53": 2180,
	"2021/UKI54": 2181,
	"2021/UKI61": 2182,
	"2021/UKI62": 2183,
	"2021/UKI63": 2184,
	"2021/UKI71": 2185,
	"2021/UKI72": 2186,
	"2021/UKI73": 2187,
	"2021/UKI74": 2188,
	"2021/UKI75": 2189,
	"2021/UKJ11": 1825,
	"2021/UKJ12": 1826,
	"2021/UKJ13": 1827,
	"2021/UKJ14": 1828,
	"2021/UKJ21": 1829,
	"2021/UKJ22": 1830,
	"2021/UKJ25": 2190,
	"2021/UKJ26": 2191,
	"2021/UKJ27": 2192,
	"2021/UKJ28": 2193,
	"2021/UKJ31": 1833,
	"2021/UKJ32": 1834,
	"2021/UKJ34": 1836,
	"2021/UKJ35": 2194,
	"2021/UKJ36": 2195,
	"2021/UKJ37": 2196,
	"2021/UKJ41": 1837,
	"2021/UKJ43": 2197,
	"2021/UKJ44": 2198,
	"2021/UKJ45": 2199,
	"2021/UKJ46": 2200,
	"2021/UKK11": 1839,
	"2021/UKK12": 1840,
	"2021/UKK13": 1841,
	"2021/UKK14": 1842,
	"2021/UKK15": 1843,
	"2021/UKK23": 1846,
	"2021/UKK24": 1844,
	"2021/UKK25": 1845,
	"2021/UKK30": 1847,
	"2021/UKK41": 1848,
	"2021/UKK42": 1849,
	"2021/UKK43": 1850,
	"2021/UKL11": 1851,
	"2021/UKL12": 1852,
	"2021/UKL13": 1853,
	"2021/UKL14": 1854,
	"2021/UKL15": 1855,
	"2021/UKL16": 1856,
	"2021/UKL17": 1857,
	"2021/UKL18": 1858,
	"2021/UKL21": 1859,
	"2021/UKL22": 1860,
	"2021/UKL23": 1861,
	"2021/UKL24": 1862,
	"2021/UKM50": 2012,
	"2021/UKM61": 1880,
	"2021/UKM62": 2013,
	"2021/UKM63": 1882,
	"2021/UKM64": 1883,
	"2021/UKM65": 1884,
	"2021/UKM66": 1885,
	"2021/UKM71": 1864,
	"2021/UKM72": 1865,
	"2021/UKM73": 1866,
	"2021/UKM75": 1868,
	"2021/UKM76": 1869,
	"2021/UKM77": 1870,
	"2021/UKM78": 1871,
	"2021/UKM81": 1872,
	"2021/UKM82": 1875,
	"2021/UKM83": 1876,
	"2021/UKM84": 1877,
	"2021/UKM91": 1867,
	"2021/UKM92": 1873,
	"2021/UKM93": 1874,
	"2021/UKM94": 1878,
	"2021/UKM95": 1879,
	"2021/UKN06": 1886,
	"2021/UKN07": 2278,
	"2021/UKN08": 2279,
	"2021/UKN09": 2280,
	"2021/UKN0A": 2281,
	"2021/UKN0B": 2282,
	"2021/UKN0C": 2283,
	"2021/UKN0D": 2284,
	"2021/UKN0E": 2285,
	"2021/UKN0F": 2286,
	"2021/UKN0G": 2287
};

const _regionSettings = writable({});

/* levels */

const _availableLevels = derived(_regionSettings, getKey('levels'));
const _firstAvailableLevel = derived(_availableLevels, getAt(0));

var EOL = {},
    EOF = {},
    QUOTE = 34,
    NEWLINE = 10,
    RETURN = 13;

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "] || \"\"";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

function pad(value, width) {
  var s = value + "", length = s.length;
  return length < width ? new Array(width - length + 1).join(0) + s : s;
}

function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6)
    : year > 9999 ? "+" + pad(year, 6)
    : pad(year, 4);
}

function formatDate(date) {
  var hours = date.getUTCHours(),
      minutes = date.getUTCMinutes(),
      seconds = date.getUTCSeconds(),
      milliseconds = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date"
      : formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
      + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
      : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
      : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
      : "");
}

function dsvFormat(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // current line number
        t, // current token
        eof = N <= 0, // current token followed by EOF?
        eol = false; // current token followed by EOL?

    // Strip the trailing newline.
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;

      // Unescape quotes.
      var i, j = I, c;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
        if ((i = I) >= N) eof = true;
        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
      }

      // Find next delimiter or newline.
      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }

      // Return last token before EOF.
      return eof = true, text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), t = token();
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }

    return rows;
  }

  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }

  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(value) {
    return value == null ? ""
        : value instanceof Date ? formatDate(value)
        : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
        : value;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatBody: formatBody,
    formatRows: formatRows,
    formatRow: formatRow,
    formatValue: formatValue
  };
}

var csv = dsvFormat(",");

var csvParse = csv.parse;

/* accessors */

// spec
const getOrder = getKey('order');
const getYear = getKey('year');

// regions
const getLevel = getKey('level');
const getName = getKey('name');
const getRootId = getKey('rootId');
const getRegionAtlasId = getPath('region.id');

/* region labels */

const regionIdToName = mapValues(hierarchy, getName);

/* sorting */

const sortAscByYear = sortWith([sorter(getYear)]);

/* rest */

const sanitizeValue = id => transformValues({
	[id]: Number,
	region_level: Number,
	region_year_spec: Number,
	year: Number,
});
const parseCSV = id =>
	t => csvParse(t, sanitizeValue(id));

/* filtering */

// selection mode

const _doFilterRegions = writable(false);

// level

/* TBD
we need `_currentLevel` not to be a `derived` but to depend on the settings
so that if we pass new settings we reset to the the new initialLevel
*/

let initialLevel = get_store_value(_regionSettings)?.initialLevel || 0;
const _currentLevel = writable(initialLevel);

_regionSettings.subscribe(({initialLevel}) => {
	initialLevel && _currentLevel.set(initialLevel);
});

/* selected regions */

const makeInitialSelection = pipe([
	values,
	groupBy(getLevel),
	mapValuesWith(pipe([
		groupBy(getRootId),
		mapValuesWith(pipe([
			indexBy(getId),
			mapValuesWith(setKey('status', 1))
		]))
	]))
]);
const initialSelection = makeInitialSelection(hierarchy);

const _regionsSelection = writable(initialSelection);

// roots ids

const getRootIds = pipe([getKey(0), keys]);
getRootIds(initialSelection);

/* utils */

// updaters

const makeSetStatusTo = value => setKey('status', value);
const setStatusTo0 = makeSetStatusTo(0);
const setStatusTo1 = makeSetStatusTo(1);

// levels

const getLevelRegions = pipe([
	values,
	flatMapWith(values),
]);

/* menu */

// focused root id

const getRoots = pipe([getKey(0), getLevelRegions]);
const makeFirstRootId = pipe([
	getRoots,
	sortWith([getName]),
	getPath('0.id')
]);
const firstFocusedRootId = makeFirstRootId(initialSelection);
const _focusedRootId = writable(firstFocusedRootId);

const focusRoot = rootId => _focusedRootId.set(rootId);

// focused root

const _focusedRoot = derived(
	[_focusedRootId, _regionsSelection],
	([focusedRootId, regionsSelection]) =>
		regionsSelection[0][focusedRootId][focusedRootId]
);

// layout

const _isMenuExpanded = derived(_currentLevel, isGT(0));

/* menu: roots */

// roots

const _roots = derived(_regionsSelection, getRoots);

// update all roots

const updateAllRootsWith = updater => () => _regionsSelection.update(
	mapValuesWith(
		mapValuesWith(
			mapValuesWith(updater)
		)
	)
);
const selectAllRoots = updateAllRootsWith(setStatusTo1);
const deselectAllRoots = updateAllRootsWith(setStatusTo0);

// update a root and all its descendents

const toggleRoot = rootId => _regionsSelection.update(
	selection => {
		const rootStatus = selection[0][rootId][rootId].status;
		const newStatus = rootStatus !== 1 ? 1 : 0;
		const newSelection = mapValues(
			selection,
			updateKey(rootId, mapValuesWith(makeSetStatusTo(newStatus)))
		);

		return newSelection;
	}
);

/* menu: descendants */

// focused root descendants

const _focusedRootChildren = derived(
	[_currentLevel, _focusedRootId, _regionsSelection],
	([currentLevel, focusedRootId, regionsSelection]) =>
		values(regionsSelection[currentLevel][focusedRootId])
);

// update all descendants of the focused root at the current level

const updateAllFocusedRootChildrenWith = statusUpdater => () => {
	const availableLevels = get_store_value(_availableLevels);
	const focusedRootId = get_store_value(_focusedRootId);

	// e.g. selecting all descendants of FR at level 2
	// should select FR and all of the regions in that branch
	const updateFn = updateKeys({
		keys: availableLevels,
		updater: updateKey(
			focusedRootId,
			mapValuesWith(statusUpdater)
		),
	});

	_regionsSelection.update(updateFn);
};

const selectAllFocusedRootChildren =
	updateAllFocusedRootChildrenWith(setStatusTo1);

const deselectAllFocusedRootChildren =
	updateAllFocusedRootChildrenWith(setStatusTo0);

// update a specific child of the focused root at the current level

const toggleFocusedRootDescendant = regionId => {
	const currentLevel = get_store_value(_currentLevel);
	const firstAvailableLevel = get_store_value(_firstAvailableLevel);
	const focusedRootId = get_store_value(_focusedRootId);
	const selection = get_store_value(_regionsSelection);

	const region = selection[currentLevel][focusedRootId][regionId];
	const newStatus = (region.status !== 1) ? 1 : 0;

	// region & descendants:
	// descendants take same status as toggled region

	let regions = [region];
	while (regions.length > 0) {
		const {children, id, level} = regions.shift();

		selection[level][focusedRootId][id].status = newStatus;

		if (children) {
			regions = regions.concat(map(children, cid => hierarchy[cid]));
		}
	}

	// region & ancestors:
	// - if all its children have same status, give that status to their parent
	// - else set the parent to partially selected (-1)

	regions = [region];
	while (regions.length > 0) {
		const {pid, level} = regions.shift();

		if (isNotNil(pid)) {
			const siblingsStatuses = uniques(map(
				hierarchy[pid].children,
				id => selection[level][focusedRootId][id].status
			));

			const parentLevel = level - 1;

			if (parentLevel >= firstAvailableLevel) {
				selection[parentLevel][focusedRootId][pid].status =
				siblingsStatuses.length === 1
					?	siblingsStatuses[0]
					: -1;
			}

			regions.push(hierarchy[pid]);
		}
	}

	// update
	_regionsSelection.set(selection);
};

// dirty selection? (= not all regions are selected)

const _isRegionsSelectionDirty = derived(
	_regionsSelection,
	regionsSelection => {
		const currentLevel = get_store_value(_currentLevel);
		const currentLevelSelection = regionsSelection[currentLevel];

		let isDirty = false;
		let rootIds = keys(currentLevelSelection);
		while (rootIds.length > 0) {
			const rootId = rootIds.shift();

			let ids = keys(currentLevelSelection[rootId]);
			while (ids.length > 0) {
				const id = ids.shift();

				if (currentLevelSelection[rootId][id].status !== 1) {
					isDirty = true;
					break
				}
			}

			if (isDirty === true) {
				break
			}
		}

		return isDirty;
	}
);

// level updates

const setCurrentLevel = newLevel => {
	const previousLevel = get_store_value(_currentLevel);
	const didSelectLowerLevel = newLevel < previousLevel;

	if (didSelectLowerLevel) {
		const selection = get_store_value(_regionsSelection);

		// region & descendants:
		// for all regions at new level:
		// 	if region is partial:
		// 		- set status to 1
		// 		- set all descendants to 1

		let regions = map(
			getLevelRegions(selection[newLevel]),
			item => ({item}) // newLevel regions, don't pass a `status`
		);

		while (regions.length > 0) {
			const {item, status} = regions.shift();
			const {children, id, level, rootId} = item;

			const region = selection[level][rootId][id];

			// get the new status

			let newStatus;
			if (level === newLevel) {
				if (region.status === -1) {
					newStatus = 1;
				}
			} else if (status) {
				newStatus = status;
			}

			// if the status has changed (`newStatus` is defined):
			// - assign new status
			// - collect descendants to assign them the their parent status

			if (newStatus) {
				region.status = newStatus;

				if (children) {
					regions = regions.concat(map(children, cid => {
						const {id, level, rootId} = hierarchy[cid];

						return ({
							item: selection[level][rootId][id],
							status: newStatus
						})
					}));
				}
			}
		}

		// for all ancestors:
		// in reverse order, set parents status based on childrens'

		const firstAvailableLevel = get_store_value(_firstAvailableLevel);

		let parentLevel = newLevel - 1;
		while (parentLevel >= firstAvailableLevel) {
			let regions = getLevelRegions(selection[parentLevel]);
			while (regions.length > 0) {
				const {children, level, rootId, id} = regions.shift();

				if (isNotNil(children)) {
					const childrenStatuses = uniques(
						map(children, cid => selection[level + 1][rootId][cid].status)
					);

					selection[level][rootId][id].status =
						childrenStatuses.length === 1
							?	childrenStatuses[0]
							: -1;
				}
			}

			parentLevel--;
		}

		// update
		_regionsSelection.set(selection);
	}

	// update
	_currentLevel.set(newLevel);
};

/* current indicator data */

const _indicator = writable({
	data: [],
	id: undefined,
});

const _reconciledIndicator = derived(_indicator, ({data, id}) => {
	const reconciledData = map(data, datapoint => {
		const {region_id, region_year_spec} = datapoint;
		const yearlyNutsId = `${region_year_spec}/${region_id}`;
		const atlasId = yearlyNutsIdToId[yearlyNutsId];
		const region = hierarchy[atlasId];

		if (!region) {
			console.log('no region for: ', atlasId); // FIXME, log in production?
		}

		return ({...datapoint, region});
	});

	return ({data: reconciledData, id});
});

const _availableYears = derived(
	[_indicator, _lookup],
	([{id}, lookup]) => id ? lookup[id].availableYears : []
);

/* current indicator utils */

const _formatFn = derived(
	[_indicator, _lookup],
	([{id}, lookup]) => {
		const getIndicatorFormat = makeGetIndicatorFormatOf(id);
		const formatFn = getIndicatorFormat(lookup);

		return formatFn
});

const _getIndicatorValue = derived(_indicator, ({id}) => getKey(id));

const makeSetOrderWith = accessor => pipe([
	groupBy(getYear),
	mapValuesWith(pipe([
		sortWith([sorterDesc(accessor)]),
		setIndexAsKey('order'),
	])),
	values,
	flatten,
]);
const _setOrder = derived(_getIndicatorValue, makeSetOrderWith);

/* data */

const _levelData = derived(
	[_currentLevel, _reconciledIndicator],
	([currentLevel, {id, data}]) =>
		(id && filter(data, ({region_level}) => region_level === currentLevel))
		|| []
);

const _rankedData = derived(
	[_levelData, _setOrder],
	([levelData, setOrder]) => setOrder(levelData)
);

const _selectedData = derived(
	[_doFilterRegions, _rankedData, _regionsSelection],
	([doFilterRegions, rankedData, selection]) => reduce(
		rankedData,
		(acc, datapoint) => {
			const {region: {id, level, rootId}} = datapoint;
			const isSelected = selection[level][rootId][id].status === 1;

			if (!doFilterRegions || isSelected) {
				acc.push({...datapoint, isSelected});
			}

			return acc;
		},
		[]
	)
);

const _noData = derived(_selectedData, isIterableEmpty);

const _yearSelectedData = derived(
	[_selectedData, _selectedYear],
	([selectedData, selectedYear]) => (
		selectedYear &&
		filter(selectedData, ({year}) => year === selectedYear)
	) || []
);

// assuming all datapoints in a year have same `region_year_spec`
const _regionsYearSpec = derived(
	_yearSelectedData,
	yearSelectedData => yearSelectedData[0]?.region_year_spec
);

const _selectedRegionAtlasIds = derived(
	_yearSelectedData,
	yearSelectedData => reduce(
		yearSelectedData,
		(acc, datapoint) => {
			if (datapoint.isSelected) {
				acc.push(datapoint.region.id);
			}

			return acc;
		},
		[]
	)
);

/*
FIXME hopefully we won't need this after we'll have added `atlasId` to topojsons
<ChoroplethG> internally looks for key & key_alt
$: getPayload =
		feature => feature.properties[key] || feature.properties[key_alt];
*/
const _selectedRegionIds = derived(
	_yearSelectedData,
	yearSelectedData => reduce(
		yearSelectedData,
		(acc, datapoint) => {
			if (datapoint.isSelected) {
				acc.push(datapoint.region_id);
			}

			return acc;
		},
		[]
	)
);

/* extent */

const _valueExtext = derived(
	[_getIndicatorValue, _selectedData],
	([getIndicatorValue, selectedData]) => extent(selectedData, getIndicatorValue)
);

/* color scale, legend */

const _colorScale = derived(
	[_makeColorScale, _valueExtext],
	([makeColorScale, valueExtext]) => makeColorScale(valueExtext)
);

const _colorBins = derived(
	[_colorScale, _makeColorBins],
	([colorScale, makeColorBins]) => makeColorBins(colorScale)
);

export { _currentLevel as A, deselectAllFocusedRootChildren as B, focusRoot as C, selectAllFocusedRootChildren as D, toggleFocusedRootDescendant as E, toggleRoot as F, toggleColorScheme as G, _availableLevels as H, _colorSchemeLabel as I, _colorSchemeLabels as J, yearlyNutsIdToId as K, getRegionAtlasId as L, _yearSelectedData as M, _regionsYearSpec as N, _selectedRegionAtlasIds as O, _selectedRegionIds as P, regionIdToName as Q, _theme as _, _style as a, _availableYears as b, _regionSettings as c, customizeTheme as d, _selectedData as e, _doFilterRegions as f, getOrder as g, _valueExtext as h, _rankedData as i, _noData as j, _colorBins as k, _formatFn as l, _colorScale as m, _getIndicatorValue as n, _isRegionsSelectionDirty as o, _indicator as p, setCurrentLevel as q, parseCSV as r, sortAscByYear as s, deselectAllRoots as t, selectAllRoots as u, _isMenuExpanded as v, _focusedRootId as w, _roots as x, _focusedRootChildren as y, _focusedRoot as z };
