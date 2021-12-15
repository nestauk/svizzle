import { b9 as reduceWith, bB as isNumber, a4 as partial, a5 as __, b2 as _toConsumableArray, bC as apply, a0 as pipe, bl as collect, bD as getLength, bE as divide, bF as sum, bG as pluck, bk as flatten, bH as indexBy, b6 as getPath, bI as transpose, bJ as derived, am as writable, ay as _screen, E as _slicedToArray, bK as getTruthyValuesKeys, bL as joinWithBlank, a1 as mapValuesWith, bd as adapter, bM as casus, ba as allOf, bN as isKeyValue, bj as hasKey, b7 as not, bO as isNil, bq as identity, bP as readable } from './client.50a99e71.js';
import { s as sliceString, g as getValue, i as inclusiveRange, l as linear } from './yootils.es.ac6ee4e8.js';
import { m as makeArrayTransformer, b as format } from './defaultLocale.3f1280a0.js';

/**
* @module @svizzle/utils/[any-number]-[array-number]
*/
/**
 * Return a function expecting an array and summing the numbers obtained
 * from applying the provided accessor to the array items.
 * Note that it skips items where the accessor does not return a number.
 *
 * @function
 * @arg {function} accessor - Any -> Number
 * @return {function} - Array -> Number
 *
 * @example
> sumValues = arraySumWith(_.getKey('a'))
> sumValues([{a: 1}, {a: 2}, {a: 3}])
6
> sumValues([{a: 1}, {a: 2}, {a: 'hey'}])
3
> sumValues([{a: 1}, {a: 2}, {notA: 3}])
3
> sumValues([{a: 'hey'}, {notA: 'b'}, {notA: 3}])
0
 *
 * @since 0.16.0
 */

var arraySumWith = function arraySumWith(accessor) {
  return reduceWith(function (acc, item) {
    var value = accessor(item);
    return acc + (isNumber(value) ? value : 0);
  }, 0);
};

/**
 * Return a function extracting the portion of a string between the provided indices (first included, second excluded).
 * Note that indices can be negative.
 * @see {@link module:@svizzle/utils/string_proto-string.sliceString|sliceString}
 *
 * @function
 * @arg {number[]} range - [beginIndex, endIndex]
 * @arg {number} range.0 - The zero-based index at which to begin extraction
 * @arg {number} [range.1] - Optional. The zero-based index before which to end extraction. If negative, starts counting from the end.
 * @return {function} - Function - String -> Boolean
 *
 * @example
> slicerPosPos = sliceStringAt([3, 5])
> slicerPosPos('0123456789')
'34'

> slicerPosImplicit = sliceStringAt([3])
> slicerPosImplicit('0123456789')
'3456789'

> slicerPosNeg = sliceStringAt([1, -3])
> slicerPosNeg('0123456789')
'123456'

> slicerNegPos = sliceStringAt([-6, 6])
> slicerNeg3('0123456789')
'45'
 *
 * @since 0.5.0
 */

var sliceStringAt = function sliceStringAt(arr) {
  return partial(sliceString, [__].concat(_toConsumableArray(arr)));
};

/**
 * Return the max of the numbers in the provided array
 * @see
 {@link module:@svizzle/utils/string-[array-number].arrayMaxBy|arrayMaxBy},
 {@link module:@svizzle/utils/[any-number]:accumcb-[array-number].arrayMaxWith|arrayMaxWith}
 *
 * @function
 * @arg {array} array
 * @return {number} max
 *
 * @example
> arrayMax([-1, -2, 0, 1, 2])
2
 *
 * @since 0.1.0
 */

var arrayMax = apply(Math.max);
/**
 * Return the min of the numbers in the provided array
 * @see
 {@link module:@svizzle/utils/string-[array-number].arrayMinBy|arrayMinBy},
 {@link module:@svizzle/utils/[any-number]:accumcb-[array-number].arrayMinWith|arrayMinWith}
 *
 * @function
 * @arg {array} array
 * @return {number} min
 *
 * @example
> arrayMin([-1, -2, 0, 1, 2])
-2
 *
 * @since 0.1.0
 */

var arrayMin = apply(Math.min);
/**
 * Return the sum of the numbers in the provided array
 *
 * @function
 * @arg {array} array
 * @return {number} sum
 *
 * @example
> arraySum([1, -2, 3, -4, 5])
3
> arraySum([])
0
 *
 * @since 0.3.0
 */

var arraySum = reduceWith(sum, 0);
/**
 * Return the average of the numbers in the provided array
 *
 * @function
 * @arg {array} – number[]
 * @return {number}
 *
 * @example
> arrayAverage([1, 23, 6])
10
 *
 * @since 0.11.0
 */

pipe([collect([arraySum, getLength]), apply(divide)]);
/**
 * Return the average of values of a {key, value}[] array
 *
 * @function
 * @arg {array} - {key, value}[]
 * @return {number}
 *
 * @example
> keyValueArrayAverage([
	{key: 'a', value: 1},
	{key: 'b', value: 23},
	{key: 'c', value: 6},
])
10
 *
 * @since 0.11.0
 */

var keyValueArrayAverage = pipe([collect([arraySumWith(getValue), getLength]), apply(divide)]);

/* groups */

var _groups$1 = writable([]);
var setGroups = function setGroups(groups) {
  return _groups$1.set(groups);
};
/* lookup */

var _lookup = writable({}); // resets the lookup when we pass new _groups

var makeIndicatorsLookup = pipe([pluck('indicators'), flatten, indexBy(getPath('schema.value.id'))]);

_groups$1.subscribe(function (groups) {
  _lookup.set(makeIndicatorsLookup(groups));
});
/* time */
// year extent
// IDEA just flatten and get the whole extent


var getYearExtent = pipe([pluck('indicators'), flatten, pluck('year_extent'), transpose, makeArrayTransformer([arrayMin, arrayMax])]);
var _yearExtent$1 = derived(_groups$1, getYearExtent); // year range

var _yearRange$1 = derived(_yearExtent$1, inclusiveRange);
/* cache indicators? or should it be app logic? */
// _reconciledIndicator.subscribe(({id, data}) => {
// 	if (id) {
// 		_lookup.update(_.setPath(`${id}.data`, data));
// 	}
// });

/* responsive */

var _isSmallScreen = derived(_screen, function (s) {
  return s && s.sizes.small && !s.sizes.medium;
});
var _screenClasses = derived(_screen, function (s) {
  return s === null || s === void 0 ? void 0 : s.classes;
});
/* safety */

var smallSafety = {
  left: 40,
  right: 40
};
var largeSafety = {
  left: 120,
  right: 80
};
var _safety = derived(_isSmallScreen, function (isSmall) {
  return isSmall ? smallSafety : largeSafety;
});
/* timeline */

var _timelineHeight = writable(0);
var _timelineWidth = writable(0);
var _timelineLayout = derived([_safety, _timelineHeight, _timelineWidth, _yearExtent$1], function (_ref) {
  var _ref2 = _slicedToArray(_ref, 4),
      safety = _ref2[0],
      height = _ref2[1],
      width = _ref2[2],
      yearExtent = _ref2[3];

  var padding = 10;
  var fontSize = Math.min(height / 4, 14);
  var radius = Math.min(height / 8, 7);
  var fullExtent = [padding + radius, width - padding - radius];
  var fullScaleX = linear(yearExtent, fullExtent);
  var start = fullExtent[0] + safety.left;
  var end = fullExtent[1] - safety.right;
  var scaleX = linear(yearExtent, [start, end]);
  var step = scaleX(start + 1) - scaleX(start);
  var doShortenYears = step < 3 * fontSize;
  var y1 = height / 3;
  var y2 = (height + y1 + radius) / 2;
  var ym = height / 2;
  return {
    doShortenYears: doShortenYears,
    end: end,
    fontSize: fontSize,
    fullScaleX: fullScaleX,
    height: height,
    radius: radius,
    scaleX: scaleX,
    start: start,
    width: width,
    y1: y1,
    y2: y2,
    ym: ym
  };
});

var makeClasses = pipe([getTruthyValuesKeys, joinWithBlank]);

var activate = function activate(id) {
  return mapValuesWith(function (value, key) {
    return key === id;
  });
}; // views


var defaultViews = {
  barchart: false,
  distribution: true,
  info: false,
  map: false,
  settings: false,
  sidebar: false,
  trends: false
};
var _views = writable(defaultViews);
var showView = function showView(id) {
  return _views.update(activate(id));
};
var _viewsClasses = derived(_views, makeClasses); // routes

var defaultRoutes = {
  Id: false,
  IdYear: false,
  Index: true
};
var _routes = writable(defaultRoutes);
var setRoute = function setRoute(id) {
  return _routes.update(activate(id));
}; // timeline visibility

var _isTimelineHidden = derived([_isSmallScreen, _views], function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      isSmall = _ref2[0],
      views = _ref2[1];

  return isSmall && (views.info || views.settings);
}); // flags

var _navFlags = writable({
  showPOIs: false
}); // hrefBase

var _hrefBase = writable('');

var getIdentity = function getIdentity() {
  return identity;
};

var makeGetIndicatorFormatOf = function makeGetIndicatorFormatOf(id) {
  return pipe([getPath("".concat(id, ".schema.value")), adapter([casus(isNil, getIdentity), casus(allOf([isKeyValue(['data_type', 'int']), hasKey('format')]), function (value) {
    return pipe([Math.round, format(value.format)]);
  }), casus(allOf([isKeyValue(['data_type', 'int']), not(hasKey('format'))]), function () {
    return Math.round;
  }), casus(hasKey('format'), function (value) {
    return format(value.format);
  }), getIdentity])]);
};
var makeGetRefFormatOf = function makeGetRefFormatOf(id) {
  return pipe([getPath("".concat(id, ".schema.value")), adapter([casus(isNil, getIdentity), casus(allOf([isKeyValue(['data_type', 'int']), hasKey('format')]), function (value) {
    return pipe([Math.round, format(value.format)]);
  }), casus(isKeyValue(['data_type', 'int']), function () {
    return Math.round;
  }), casus(hasKey('format'), function (value) {
    return format(value.format);
  }), getIdentity])]);
};
var shortenYear = pipe([String, sliceStringAt([2, 4])]);

var _selectedYear = writable();
var setSelectedYear = function setSelectedYear(year) {
  return _selectedYear.set(Number(year));
};
var resetSelectedYear = function resetSelectedYear() {
  return _selectedYear.set();
};

var groups = [
	{
		description: "Cohfafef po raro mapco cuboku tidob cakar peikfa odabo algajti zi nu bo tal coc nizjavdeg.",
		id: "onepo",
		label: "Po mahibonit lum wuwechoj wobuva kalave.",
		order: 0,
		indicators: [
			{
				api_doc_url: "http://teiv.edu/te",
				api_type: "FETCH",
				availableYears: [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014,
					2015,
					2016
				],
				data_date: "2097930",
				description: "Zetoep horani woobufim wejuzub ic jav veujhav azi bu rared jekohde izekuje go vuv ri.",
				endpoint_url: "http://cinhi.er/ane",
				framework_group: "onepo",
				is_experimental: true,
				order: [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				region_types: [
					"NUTS"
				],
				schema: {
					region_id: "string",
					region_level: "int",
					region_type: "string",
					region_year_spec: "int",
					value: {
						data_type: "int",
						format: ".1f",
						id: "cecei",
						label: "Dalrul zevubpov tuhonjah kubo du."
					},
					year: {
						data_type: "int",
						label: "Fa vanrirku mena cigzanop."
					}
				},
				source_name: "Nalba mo angub boik.",
				source_url: "http://wascu.gn/dijowa",
				subtitle: "Udoni notuz efoid jevak mesadodo mirozwe.",
				title: "Cioca ejeva lebcer willumsu.",
				url: "/svizzle/data/cecei.csv",
				year_extent: [
					2008,
					2016
				]
			},
			{
				api_doc_url: "http://ekeram.vc/ufsab",
				api_type: "FETCH",
				availableYears: [
					2011,
					2012,
					2013,
					2014,
					2015,
					2016
				],
				data_date: "2079725",
				description: "Wap oveujedev paasapi satubuka lojco abbo culih ezcig wisotoh po noho siw riptaleko timfuk wolvoh.",
				endpoint_url: "http://goc.my/sapbetiw",
				framework_group: "onepo",
				is_experimental: false,
				order: [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				region_types: [
					"NUTS"
				],
				schema: {
					region_id: "string",
					region_level: "int",
					region_type: "string",
					region_year_spec: "int",
					value: {
						data_type: "int",
						format: ".1f",
						id: "cozeb",
						label: "Mus gotov cevihifaw gamvu ga."
					},
					year: {
						data_type: "int",
						label: "Pumwigo modsipnol ba fuwsijru."
					}
				},
				source_name: "Mannec velazuc foderiba alo.",
				source_url: "http://logazjuk.no/sakejo",
				subtitle: "Fonammo kaz wujmusco zuha vujpid mi.",
				title: "Bu el ihwezdi wugeblej.",
				url: "/svizzle/data/cozeb.csv",
				year_extent: [
					2011,
					2016
				]
			},
			{
				api_doc_url: "http://afu.ni/pezu",
				api_type: "FETCH",
				availableYears: [
					2007,
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014,
					2015
				],
				data_date: "2079119",
				description: "Jujrip vu mew tifile vubesilu meiguoto tawgu kapu cebla de vopsabo lopmidun ser juwibali zobteb.",
				endpoint_url: "http://ewoner.sa/umozise",
				framework_group: "onepo",
				is_experimental: false,
				order: [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				region_types: [
					"NUTS"
				],
				schema: {
					region_id: "string",
					region_level: "int",
					region_type: "string",
					region_year_spec: "int",
					value: {
						data_type: "int",
						format: ".1f",
						id: "novsa",
						label: "Lok ojupacpeh togju nebagiri su."
					},
					year: {
						data_type: "int",
						label: "Zu tasda lufruip doca."
					}
				},
				source_name: "Di gekuvusu veko wuepairi.",
				source_url: "http://pehabbew.cr/sinetlij",
				subtitle: "Bo jivhakhi cucfo lubebeze on henacot.",
				title: "Dijog cutde tindam hac.",
				url: "/svizzle/data/novsa.csv",
				year_extent: [
					2007,
					2015
				]
			}
		]
	},
	{
		description: "Fud ma lolerojo capcabmol ila oharuw eh ra upce tu vu joppo bewozves mozu.",
		id: "iruso",
		label: "Evaluvidu haapo hefodufo iwro enilu rees.",
		order: 1,
		indicators: [
			{
				api_doc_url: "http://fuvukanig.dm/genwij",
				api_type: "FETCH",
				availableYears: [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014,
					2015
				],
				data_date: "21061121",
				description: "Umeefu fafkeoju pufismer satbusig dujtasto idocav gediseb gaji kezja ewe dezemcap cuwu vomagbu vafafeb lekbi.",
				endpoint_url: "http://ocudilmur.mv/cimil",
				framework_group: "iruso",
				is_experimental: false,
				order: [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				region_types: [
					"NUTS"
				],
				schema: {
					region_id: "string",
					region_level: "int",
					region_type: "string",
					region_year_spec: "int",
					value: {
						data_type: "int",
						format: ".1f",
						id: "woffa",
						label: "Lesmur muwremsi em eviluhak at."
					},
					year: {
						data_type: "int",
						label: "Sow ugu lusolakeh sic."
					}
				},
				source_name: "Witezsej mipoap samu da.",
				source_url: "http://zoskomfu.gs/wu",
				subtitle: "Wunuhekub suvar idoguw miwuwsen ihoufeni ceza.",
				title: "Kun nolev lipebu anafogew.",
				url: "/svizzle/data/woffa.csv",
				year_extent: [
					2008,
					2015
				]
			},
			{
				api_doc_url: "http://zez.hr/rimmovo",
				api_type: "FETCH",
				availableYears: [
					2010,
					2011,
					2012,
					2013,
					2014,
					2015,
					2016
				],
				data_date: "2061514",
				description: "Im fimuhvib logewza vomop rotjuvdat jab ob lazozi hivebit puzektu cononhi pihvacihi ewedelkop fugwugwol tefnonrum.",
				endpoint_url: "http://giozemu.bd/pu",
				framework_group: "iruso",
				is_experimental: true,
				order: [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				region_types: [
					"NUTS"
				],
				schema: {
					region_id: "string",
					region_level: "int",
					region_type: "string",
					region_year_spec: "int",
					value: {
						data_type: "int",
						format: ".1f",
						id: "kafgi",
						label: "Iga muozosa co pilcicviv ru."
					},
					year: {
						data_type: "int",
						label: "Hef jifevaven do volku."
					}
				},
				source_name: "Jolhotpe muzir okse ha.",
				source_url: "http://piojfi.np/mekostas",
				subtitle: "Mel necrov po muk kan aslu.",
				title: "Ifdegzan abo voim iscez.",
				url: "/svizzle/data/kafgi.csv",
				year_extent: [
					2010,
					2016
				]
			},
			{
				api_doc_url: "http://caspasot.mc/lede",
				api_type: "FETCH",
				availableYears: [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014,
					2015
				],
				data_date: "2065821",
				description: "Ki serdelve baznege vosu zog dewif domispup uh lusij na zakoce ogi gu mi itcopi.",
				endpoint_url: "http://wossuote.bo/dom",
				framework_group: "iruso",
				is_experimental: true,
				order: [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				region_types: [
					"NUTS"
				],
				schema: {
					region_id: "string",
					region_level: "int",
					region_type: "string",
					region_year_spec: "int",
					value: {
						data_type: "int",
						format: ".1f",
						id: "ranie",
						label: "Uboralfi pekaf sunjo doma kagharo."
					},
					year: {
						data_type: "int",
						label: "Rejvi vaczaemo at ka."
					}
				},
				source_name: "Eni sijipaci vimvi ir.",
				source_url: "http://wiju.gf/pi",
				subtitle: "Pa tusupuk ej ca nukowluj inatuwu.",
				title: "Ojkeutu sod wi tiv.",
				url: "/svizzle/data/ranie.csv",
				year_extent: [
					2008,
					2015
				]
			},
			{
				api_doc_url: "http://rev.kp/fozin",
				api_type: "FETCH",
				availableYears: [
					2010,
					2011,
					2012,
					2013,
					2014,
					2015
				],
				data_date: "2112625",
				description: "Ip suhpu mud foztejar uzhebo saziiha cadeh nifzem sogje adve ehonobe duba rehbukiz mib hutbe.",
				endpoint_url: "http://ku.ve/ujne",
				framework_group: "iruso",
				is_experimental: false,
				order: [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				region_types: [
					"NUTS"
				],
				schema: {
					region_id: "string",
					region_level: "int",
					region_type: "string",
					region_year_spec: "int",
					value: {
						data_type: "int",
						format: ".1f",
						id: "dokha",
						label: "Hub gaobicoh vetaj jo fawjeh."
					},
					year: {
						data_type: "int",
						label: "Zeife repbom ruvigrow govnu."
					}
				},
				source_name: "Uhauwiku ufa nenlu seni.",
				source_url: "http://ab.tr/ze",
				subtitle: "Kegow det huspas ri buk vi.",
				title: "Vo mas umosob vutah.",
				url: "/svizzle/data/dokha.csv",
				year_extent: [
					2010,
					2015
				]
			}
		]
	},
	{
		description: "Loecuer kil up silove neclop ipadomig kemcolra hu gulnarle pem meriszar weno ap eguheba.",
		id: "govru",
		label: "Vaija akefopuz cota oj bezu amjek.",
		order: 2,
		indicators: [
			{
				api_doc_url: "http://fo.ao/tajmekmed",
				api_type: "FETCH",
				availableYears: [
					2010,
					2011,
					2012,
					2013,
					2014,
					2015
				],
				data_date: "20791031",
				description: "Nigdi vefharsu po nor cigta ef tiedte dusril rec imaleug febi sagol suefo wejipol fooma.",
				endpoint_url: "http://movuzaga.sg/orufit",
				framework_group: "govru",
				is_experimental: true,
				order: [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				region_types: [
					"NUTS"
				],
				schema: {
					region_id: "string",
					region_level: "int",
					region_type: "string",
					region_year_spec: "int",
					value: {
						data_type: "int",
						format: ".1f",
						id: "laodo",
						label: "Sa muwugu pi odnunhor pim."
					},
					year: {
						data_type: "int",
						label: "Wucjak duckawecu cuhifla cosuhod."
					}
				},
				source_name: "Gour wizisa hodiw si.",
				source_url: "http://mergitfa.edu/teic",
				subtitle: "Lebpilik lo zet ihfije lot vu.",
				title: "Cu miza eh gub.",
				url: "/svizzle/data/laodo.csv",
				year_extent: [
					2010,
					2015
				]
			},
			{
				api_doc_url: "http://wieha.tt/derlana",
				api_type: "FETCH",
				availableYears: [
					2007,
					2008,
					2009,
					2010,
					2011,
					2012,
					2013
				],
				data_date: "2105730",
				description: "Pa jugludtac rivnibop cohbac hashe ijekah sij fozgu ten hegzis gi cizuid del tehaeso kevjoz.",
				endpoint_url: "http://tefiljar.eu/co",
				framework_group: "govru",
				is_experimental: true,
				order: [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				region_types: [
					"NUTS"
				],
				schema: {
					region_id: "string",
					region_level: "int",
					region_type: "string",
					region_year_spec: "int",
					value: {
						data_type: "int",
						format: ".1f",
						id: "zigef",
						label: "Robbim vigvoja zemun wopgikzuj wenoh."
					},
					year: {
						data_type: "int",
						label: "Wupdow ron cagogdo novo."
					}
				},
				source_name: "Puko feb sifric kun.",
				source_url: "http://nunwiuv.bt/ruv",
				subtitle: "Ji esafu nefibim kufkad peza nov.",
				title: "Wuk vi mow pacaevu.",
				url: "/svizzle/data/zigef.csv",
				year_extent: [
					2007,
					2013
				]
			}
		]
	},
	{
		description: "Bih ju zadbol mogfo wig futfiwfaw li ze tabepe pohbolsi uppepu dibelkup dabsud hel dejelni dowajefez zawika aju.",
		id: "kuliw",
		label: "Sugno tuteci nivezbo zus epromwa ju.",
		order: 3,
		indicators: [
			{
				api_doc_url: "http://zecoko.ly/ferjel",
				api_type: "FETCH",
				availableYears: [
					2008,
					2009,
					2010,
					2011,
					2012
				],
				data_date: "2074811",
				description: "Kivpicu ufubow nig korapusa efa pemu igi cirmekes zom ujpugeco pise acwidil kadbodep hibrawini bohof.",
				endpoint_url: "http://hadla.mw/jawa",
				framework_group: "kuliw",
				is_experimental: false,
				order: [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				region_types: [
					"NUTS"
				],
				schema: {
					region_id: "string",
					region_level: "int",
					region_type: "string",
					region_year_spec: "int",
					value: {
						data_type: "int",
						format: ".1f",
						id: "awala",
						label: "Kuc uvi safum nior garaw."
					},
					year: {
						data_type: "int",
						label: "Je wuotagu kaw vim."
					}
				},
				source_name: "Atdiem jadepke aksi dolo.",
				source_url: "http://sa.mv/ram",
				subtitle: "Hen subzu vek zil rec ew.",
				title: "Hased por juvimdul kicko.",
				url: "/svizzle/data/awala.csv",
				year_extent: [
					2008,
					2012
				]
			}
		]
	},
	{
		description: "Kiltid waulamo etuova alamu vuwufu lenho ga pow vawiima appa rimzecad tovizcip fe.",
		id: "ejuca",
		label: "Sojum hijwa ac ridbur usu owa.",
		order: 4,
		indicators: [
			{
				api_doc_url: "http://alanemu.ni/havunre",
				api_type: "FETCH",
				availableYears: [
					2006,
					2007,
					2008,
					2009,
					2010,
					2011,
					2012,
					2013
				],
				data_date: "2088121",
				description: "Fij iv asgutuw hef uzafe rusezef efa taaze zesjej coitiuni isa oljocuk ih ze acineb.",
				endpoint_url: "http://hew.cn/of",
				framework_group: "ejuca",
				is_experimental: false,
				order: [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				region_types: [
					"NUTS"
				],
				schema: {
					region_id: "string",
					region_level: "int",
					region_type: "string",
					region_year_spec: "int",
					value: {
						data_type: "int",
						format: ".1f",
						id: "zaanf",
						label: "Suppenu geek ok epa aheli."
					},
					year: {
						data_type: "int",
						label: "Ra kafmozraf fivkat tiuki."
					}
				},
				source_name: "Sitab tagje izena si.",
				source_url: "http://ju.bi/li",
				subtitle: "Arivek ciic ilapos ocufok hisazu wuwri.",
				title: "Ehgejih mi hes togpoov.",
				url: "/svizzle/data/zaanf.csv",
				year_extent: [
					2006,
					2013
				]
			},
			{
				api_doc_url: "http://het.lk/wasug",
				api_type: "FETCH",
				availableYears: [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014
				],
				data_date: "2041227",
				description: "Arehifod ic hut mi zozi otasi onafe re viuz lo ledu fejodve ejepuw bihab sus.",
				endpoint_url: "http://ka.mn/pu",
				framework_group: "ejuca",
				is_experimental: true,
				order: [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				region_types: [
					"NUTS"
				],
				schema: {
					region_id: "string",
					region_level: "int",
					region_type: "string",
					region_year_spec: "int",
					value: {
						data_type: "int",
						format: ".1f",
						id: "apnif",
						label: "Co bomwof luhiszi pim kosucdib."
					},
					year: {
						data_type: "int",
						label: "Wevi wakju nibid keibuze."
					}
				},
				source_name: "Babeki vezbaet gafek gotibat.",
				source_url: "http://sa.mo/bewu",
				subtitle: "Jise noveb dofela peptow vovzew saz.",
				title: "Sela tamsahner ovla nitamvub.",
				url: "/svizzle/data/apnif.csv",
				year_extent: [
					2008,
					2014
				]
			}
		]
	}
];

var lookup = makeIndicatorsLookup(groups);
/* data */

var _groups = readable(groups);
var _yearExtent = derived(_groups, getYearExtent);
var _yearRange = derived(_yearExtent, inclusiveRange);

export { _hrefBase as _, _timelineLayout as a, _yearRange$1 as b, shortenYear as c, _routes as d, _isSmallScreen as e, _screenClasses as f, _viewsClasses as g, _isTimelineHidden as h, _timelineWidth as i, _timelineHeight as j, _selectedYear as k, _navFlags as l, _views as m, showView as n, _groups as o, _lookup as p, makeGetIndicatorFormatOf as q, setRoute as r, setGroups as s, resetSelectedYear as t, _yearRange as u, lookup as v, makeGetRefFormatOf as w, keyValueArrayAverage as x, setSelectedYear as y };
