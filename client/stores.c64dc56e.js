import { a1 as partial, a2 as __, cp as apply, Y as pipe, ae as collect, cq as getLength, ah as reduceWith, cr as sum, cs as pluck, c3 as flatten, ct as indexBy, af as getPath, cu as transpose, cv as derived, bd as writable, ay as _screen, bY as adapter, cw as casus, cx as isNil, bV as allOf, ce as isKeyValue, c2 as hasKey, bT as not, c0 as identity, cy as getTruthyValuesKeys, cz as joinWithBlank, Z as mapValuesWith, bj as readable } from './client.0c002240.js';
import { s as sliceString, f as arraySumWith, g as getValue, i as inclusiveRange, l as linear } from './linear.095733a9.js';
import { m as makeArrayTransformer, b as format } from './defaultLocale.e1eee852.js';

/**
* @module @svizzle/utils/array-[string-string]
*/

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
const sliceStringAt = arr => partial(sliceString, [__, ...arr]);

/**
* @module @svizzle/utils/array-number
*/

/**
 * Return the max of the numbers in the provided array
 * @see
 {@link module:@svizzle/utils/string-[array-number].arrayMaxBy|arrayMaxBy},
 {@link module:@svizzle/utils/[any-number]-[array-number].arrayMaxWith|arrayMaxWith}
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
const arrayMax = apply(Math.max);

/**
 * Return the min of the numbers in the provided array
 * @see
 {@link module:@svizzle/utils/string-[array-number].arrayMinBy|arrayMinBy},
 {@link module:@svizzle/utils/[any-number]-[array-number].arrayMinWith|arrayMinWith}
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
const arrayMin = apply(Math.min);

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
 * @see {@link module:@svizzle/utils/[any-number]-[array-number].arraySumWith|arraySumWith}
 */
const arraySum = reduceWith(sum, 0);

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
> arrayAverage([])
0
 *
 * @since 0.11.0
 */
pipe([
	collect([arraySum, getLength]),
	([sum, length]) => length ? sum / length : 0
]);

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
> keyValueArrayAverage([])
0
 *
 * @since 0.11.0
 */
const keyValueArrayAverage = pipe([
	collect([arraySumWith(getValue), getLength]),
	([sum, length]) => length ? sum / length : 0
]);

/* groups */

const _groups$1 = writable([]);
const setGroups = groups => _groups$1.set(groups);

/* lookup */

const _lookup = writable({});

// resets the lookup when we pass new _groups
const makeIndicatorsLookup = pipe([
	pluck('indicators'),
	flatten,
	indexBy(getPath('schema.value.id')),
]);
_groups$1.subscribe(groups => {
	_lookup.set(makeIndicatorsLookup(groups));
});

/* time */

// year extent

// IDEA just flatten and get the whole extent
const getYearExtent = pipe([
	pluck('indicators'),
	flatten,
	pluck('year_extent'),
	transpose,
	makeArrayTransformer([arrayMin, arrayMax]),
]);
const _yearExtent$1 = derived(_groups$1, getYearExtent);

// year range

const _yearRange$1 = derived(_yearExtent$1, inclusiveRange);

/* cache indicators? or should it be app logic? */

// _reconciledIndicator.subscribe(({id, data}) => {
// 	if (id) {
// 		_lookup.update(_.setPath(`${id}.data`, data));
// 	}
// });

/* responsive */

const _isSmallScreen = derived(
	_screen,
	s => s && (s.sizes.small && !s.sizes.medium)
);
const _screenClasses = derived(_screen, s => s?.classes);

/* safety */

const smallSafety = {left: 40, right: 40};
const largeSafety = {left: 120, right: 80};
const _safety = derived(
	_isSmallScreen,
	isSmall => isSmall ? smallSafety : largeSafety
);

/* timeline */

const _timelineHeight = writable(0);
const _timelineWidth = writable(0);

const _timelineLayout = derived([
	_safety,
	_timelineHeight,
	_timelineWidth,
	_yearExtent$1,
], ([safety, height, width, yearExtent]) => {
	const padding = 10;
	const fontSize = Math.min(height / 4, 14);
	const radius = Math.min(height / 8, 7);
	const fullExtent = [
		padding + radius,
		width - padding - radius
	];
	const fullScaleX = linear(yearExtent, fullExtent);
	const start = fullExtent[0] + safety.left;
	const end = fullExtent[1] - safety.right;
	const scaleX = linear(yearExtent, [start, end]);
	const step = scaleX(start + 1) - scaleX(start);
	const doShortenYears = step < 3 * fontSize;
	const y1 = height / 3;
	const y2 = (height + y1 + radius) / 2;
	const ym = height / 2;

	return {
		doShortenYears,
		end,
		fontSize,
		fullScaleX,
		height,
		radius,
		scaleX,
		start,
		width,
		y1,
		y2,
		ym,
	}
});

const getIdentity = () => identity;

const makeGetIndicatorFormatOf = id => pipe([
	getPath(`${id}.schema.value`),
	adapter([
		casus(isNil, getIdentity),
		casus(
			allOf([
				isKeyValue(['data_type', 'int']),
				hasKey('format'),
			]),
			value => pipe([
				Math.round,
				format(value.format)
			])
		),
		casus(
			allOf([
				isKeyValue(['data_type', 'int']),
				not(hasKey('format')),
			]),
			() => Math.round
		),
		casus(
			hasKey('format'),
			value => format(value.format)
		),
		getIdentity,
	]),
]);

const makeGetRefFormatOf = id => pipe([
	getPath(`${id}.schema.value`),
	adapter([
		casus(isNil, getIdentity),
		casus(
			allOf([
				isKeyValue(['data_type', 'int']),
				hasKey('format'),
			]),
			value => pipe([
				Math.round,
				format(value.format)
			])
		),
		casus(
			isKeyValue(['data_type', 'int']),
			() => Math.round
		),
		casus(
			hasKey('format'),
			value => format(value.format)
		),
		getIdentity,
	])
]);

const shortenYear = pipe([String, sliceStringAt([2, 4])]);

const _selectedYear = writable();
const setSelectedYear = year => _selectedYear.set(Number(year));
const resetSelectedYear = () => _selectedYear.set();

const makeClasses = pipe([getTruthyValuesKeys, joinWithBlank]); // TBD to /dom?

/* utils */

const activate = id => mapValuesWith((value, key) => key === id);

/* views */

const defaultViews = {
	barchart: false,
	distribution: true,
	info: false,
	map: false,
	settings: false,
	sidebar: false,
	trends: false,
};
const _views = writable(defaultViews);
const showView = id => _views.update(activate(id));

const _viewsClasses = derived(_views, makeClasses);

/* routes */

const defaultRoutes = {
	Id: false,
	IdYear: false,
	Index: true,
};
const _routes = writable(defaultRoutes);
const setRoute = id => _routes.update(activate(id));

/* timeline visibility */

const _isTimelineHidden = derived(
	[_isSmallScreen, _views],
	([isSmall, views]) => isSmall && (views.info || views.settings)
);

/* flags */

const _navFlags = writable({showPOIs: false});

/* hrefBase */

const _hrefBase = writable('');

var groups = [
	{
		"description": "Cu sitiz omre emabeviz fucasguh he nagtacu uwwaib jaccomlu keroshe od loz osuced lihuvol gilla bouro lal.",
		"id": "errog",
		"label": "Bazce zum iggon ogtava gede su.",
		"order": 0,
		"indicators": [
			{
				"api_doc_url": "http://ofeju.sb/riet",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014,
					2015,
					2016,
					2017
				],
				"data_date": "205016",
				"description": "Gampic nuwefci jehiz vitmedo ta ajo ete fekvowetu ehbiin ogfev cizi wapodukuj zujpi luf hi.",
				"endpoint_url": "http://fa.ci/lemnafde",
				"framework_group": "errog",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "merve",
						"label": "Gakig leh hev cupjuv ne."
					},
					"year": {
						"data_type": "int",
						"label": "Cadiro ma can cehpic."
					}
				},
				"source_name": "Fem fomgazic razcazpi wieni.",
				"source_url": "http://gallubaru.at/edmu",
				"subtitle": "Ba okreoro fodjugud menazut wubo osuvuk nutzu du vu gompicra zihedbag in uro ewo sazoreg dedezel fumidi gal podowees fijmeltod wuke joc anidoz.",
				"title": "Wa lac raleuh vupafuh goh zu kus dobpab pajhed zisej ugka pupofzu ecrucu idukefo vo la fegovur.",
				"url": "/svizzle/data/merve.csv",
				"year_extent": [
					2008,
					2017
				]
			},
			{
				"api_doc_url": "http://vidtawah.am/lo",
				"api_type": "FETCH",
				"availableYears": [
					2009,
					2010,
					2011,
					2012,
					2013,
					2014,
					2015,
					2016,
					2017
				],
				"data_date": "2070722",
				"description": "Poahi nundac fi kaj me eruti ociulo uhroc suuki wo ralfiw wugejouki konruep wizah os.",
				"endpoint_url": "http://acawi.fi/nustulu",
				"framework_group": "errog",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "pifuh",
						"label": "Kivgi lakbemez na fitij bal."
					},
					"year": {
						"data_type": "int",
						"label": "Owvinaj pubsu paubocez vadob."
					}
				},
				"source_name": "Ulanufe ulpono defma bun.",
				"source_url": "http://luzozat.bw/liri",
				"subtitle": "Rardo baohmu kej cigvimcop omij upkihraw cuaw vet sovbu rofa duwto gijob pi tooz cecuwon mu put jilan firdaf ama wabok juco nirpum fikuw.",
				"title": "Awlu celofgat amevo tuine lofuhuk bo kowe mu.",
				"url": "/svizzle/data/pifuh.csv",
				"year_extent": [
					2009,
					2017
				]
			},
			{
				"api_doc_url": "http://met.gd/gofuwim",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012
				],
				"data_date": "202947",
				"description": "Aswo ihemo civwoehu gewricu betik udugi iw ralwed ikoha enfin lojdivu ut or wecolomid nejza.",
				"endpoint_url": "http://oki.sr/wan",
				"framework_group": "errog",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "toswu",
						"label": "El lu dagwijubu anepedav ejsuoz."
					},
					"year": {
						"data_type": "int",
						"label": "Mer gesulti fapaza sah."
					}
				},
				"source_name": "Ew ci pugawuma jihrew.",
				"source_url": "http://juv.co.uk/egilar",
				"subtitle": "Poezzo releg up laeru os siwi mu fazvevu virouka sivawwep urotijop rodadoze uz supicje ucuzub hibugda luwazata wivu avouromes tu ibeini magubnoj ikofefku rutafa uh itevewrur oz ganu kahja aliwujop.",
				"title": "Binbu caavep rewi norpem simeho vivuvji jele omosa.",
				"url": "/svizzle/data/toswu.csv",
				"year_extent": [
					2008,
					2012
				]
			},
			{
				"api_doc_url": "http://lov.na/lofameh",
				"api_type": "FETCH",
				"availableYears": [
					2011,
					2012,
					2013
				],
				"data_date": "2076229",
				"description": "Lifrew iwwucelu lafve amgap ubuzozifo lovritud sawwizef awwu nesbig eru waw cagel vomef av viravbuf.",
				"endpoint_url": "http://jageid.hm/vawusu",
				"framework_group": "errog",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "mugka",
						"label": "Ittolkam wa mize hiw ahcotar."
					},
					"year": {
						"data_type": "int",
						"label": "Si ferwolo fum gonin."
					}
				},
				"source_name": "Wohafwa fube uku tice.",
				"source_url": "http://maw.at/cejicih",
				"subtitle": "Gigep fuvrude towwuuki pi hegerwer huzudufe coje imocanil ziv ni ojdujza fiscuk kirinfan oh isvuv natugjec vo vizgim ova.",
				"title": "Fu hebolo takrewaf vabelcaj fo giunpav jupzodmin heonodap guhatpaw jeuk fo ge at lorijti ozane pazaw zuhnovur azcoc teuli itudo zofvuknuf ma.",
				"url": "/svizzle/data/mugka.csv",
				"year_extent": [
					2011,
					2013
				]
			},
			{
				"api_doc_url": "http://riseev.pa/ki",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013
				],
				"data_date": "2058812",
				"description": "Zogeha fonlil jilwo owbew paja on paug aswafdel bowapgob fesifwu leszadum hip paichik he bi.",
				"endpoint_url": "http://em.bg/ujboh",
				"framework_group": "errog",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "jekov",
						"label": "Hokdu ver cukgajav epma he."
					},
					"year": {
						"data_type": "int",
						"label": "Gakoraru tusuje pugtu tet."
					}
				},
				"source_name": "Bo uwdut levsimtop so.",
				"source_url": "http://moma.bn/cefmihuv",
				"subtitle": "Gi few am obtusli dujac bilimiima tobeal jop nibagsov azigra kujuhmo eggore loc owrusec vuw pieb howenzir.",
				"title": "Ke rulaha gacosfub ezocakizu jinsi ruh vivava valeksef duruwezo unpappoc.",
				"url": "/svizzle/data/jekov.csv",
				"year_extent": [
					2008,
					2013
				]
			},
			{
				"api_doc_url": "http://wiwlasde.cm/noweh",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014
				],
				"data_date": "20931119",
				"description": "Hapek muwowati ocuze hasjob herka cuputcij zif wa tuzrobor obo vedoksih ded solce ifa ad.",
				"endpoint_url": "http://ulujobab.jo/du",
				"framework_group": "errog",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "tagur",
						"label": "Hezpicnet japuh obpul ucsadnam it."
					},
					"year": {
						"data_type": "int",
						"label": "Wifcakpa pajutwa ji maf."
					}
				},
				"source_name": "Varis furir epijozih hawcatze.",
				"source_url": "http://lazza.ee/mi",
				"subtitle": "Je valecba cimfi uto sief cafen cusiro nin nanavsec.",
				"title": "Pahpa votow ru ujdawtat ura wogjulu ziw uwhacep fu suzasec doaf ziboep puhizma nijopu uho ubu utzucla.",
				"url": "/svizzle/data/tagur.csv",
				"year_extent": [
					2008,
					2014
				]
			},
			{
				"api_doc_url": "http://bebdi.aw/buoza",
				"api_type": "FETCH",
				"availableYears": [
					2010,
					2011,
					2012,
					2013,
					2014
				],
				"data_date": "2045725",
				"description": "Wumpo vuduje dotol eso maktiv cidecip ca utanla ran bija ak oto dir je tebdedset.",
				"endpoint_url": "http://wuflan.sn/cac",
				"framework_group": "errog",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "agevu",
						"label": "Otalaoga zon cad omedo cecehac."
					},
					"year": {
						"data_type": "int",
						"label": "Cespac imdizgas sucocar ka."
					}
				},
				"source_name": "Teg et zofdepev enu.",
				"source_url": "http://tor.sv/rucfod",
				"subtitle": "Pijocu nolte ud ditopjal juve funlahra kuwe pep ti oz cobfo ewub hilwegu dejtowat gimawtiz gaeba ireno pe zijhawaz cik ho ufiusa vi colfuri zeewek wizalemo kipi te nuisamu jog menok geraptac selhul mafuc.",
				"title": "Jasoju jidada pin zaseg wesa tegemguv.",
				"url": "/svizzle/data/agevu.csv",
				"year_extent": [
					2010,
					2014
				]
			}
		]
	},
	{
		"description": "Jiv cigulev zapafvep sosfu fo nosfukmo no kemgeda cevcipe okemir efe lic huwrar.",
		"id": "guogi",
		"label": "Nusbacroz wirpu nekha nivip komta kindi.",
		"order": 1,
		"indicators": [
			{
				"api_doc_url": "http://cepwizjuw.edu/jobzu",
				"api_type": "FETCH",
				"availableYears": [
					2006,
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
				"data_date": "2095913",
				"description": "Mucukovab vamotket otaekosu he duf dileno newug tivha ki pedoz nitaw lapamdaf ji piatadot ginzeap.",
				"endpoint_url": "http://weh.org/poosagen",
				"framework_group": "guogi",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "maabk",
						"label": "Mohewo ignit sihce kowpe isoive."
					},
					"year": {
						"data_type": "int",
						"label": "Nahedut hi inu nuhkowat."
					}
				},
				"source_name": "Pepu lackuzsuw nogmar wejdombo.",
				"source_url": "http://inmu.mt/up",
				"subtitle": "Lobede cutuhi dujuah ujuca doluj ma hawjub hidfoztam wazcod kilhazfit pihab pobolzu imapovov uvot erjuz rizdid odekungo.",
				"title": "Zojeza lob fegokec tub wasufaf sikicupon fiilake ha gupwuev nufa jarewju huk vuatues oposarij himjuup cuehofe ban.",
				"url": "/svizzle/data/maabk.csv",
				"year_extent": [
					2006,
					2015
				]
			},
			{
				"api_doc_url": "http://delkotop.nz/vatitgud",
				"api_type": "FETCH",
				"availableYears": [
					2006,
					2007,
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
				"data_date": "2096416",
				"description": "Korremijo je ru zu awku detmehpup bipuljaw tizsebuk topmutdit idsa giowoeg ahpijka ar ifava citwatoz.",
				"endpoint_url": "http://az.ba/figam",
				"framework_group": "guogi",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "jokaw",
						"label": "Fu tiimaum hucurito marwasvir ka."
					},
					"year": {
						"data_type": "int",
						"label": "Na zo baipiwib vu."
					}
				},
				"source_name": "Oriefe ili ekoweot fecfet.",
				"source_url": "http://igwicka.gg/em",
				"subtitle": "Ocegumne roguwhil tulo coeswum lowobjij ideezo hijor macupa jutlolo ge boebo zogid.",
				"title": "Uhodi sehowjo vemeoj ubuhotok suldih sujo tulwo gihani viganug himloh.",
				"url": "/svizzle/data/jokaw.csv",
				"year_extent": [
					2006,
					2016
				]
			},
			{
				"api_doc_url": "http://sotge.net/lak",
				"api_type": "FETCH",
				"availableYears": [
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
				"data_date": "21091026",
				"description": "Ucaezilaf cu jasore weomumig gevuk inoumcag anfusuf noffada wubzato livup saso gij bujis five atse.",
				"endpoint_url": "http://hilid.al/ewecune",
				"framework_group": "guogi",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "cituw",
						"label": "Lis tif geckobagu vi no."
					},
					"year": {
						"data_type": "int",
						"label": "Nudocen ate oteuz cubofvu."
					}
				},
				"source_name": "Unlatno azizap omsum hifbosun.",
				"source_url": "http://sil.nu/duhfumu",
				"subtitle": "Da re ta va jure ga co kid.",
				"title": "Le seskuk ogapitfi mugahgu loeh ifagumbel cazahupi buw si diwrot bocki lahinga jesul rerbofkil gel peabafa nu mo evupo pojvevu evo wadfu erome vil kevobu perva.",
				"url": "/svizzle/data/cituw.csv",
				"year_extent": [
					2008,
					2016
				]
			}
		]
	},
	{
		"description": "Jic kolzuka lug farafsir cuenkeh jog buf esitegdit wiv efhus suosdub bor kakedzu gogeta nepag piz guzila.",
		"id": "lojme",
		"label": "Rotuwsub mesiw ofomo gukucuf kizele zovtafibe.",
		"order": 2,
		"indicators": [
			{
				"api_doc_url": "http://la.iq/vezuk",
				"api_type": "FETCH",
				"availableYears": [
					2007,
					2008,
					2009,
					2010,
					2011,
					2012
				],
				"data_date": "2088621",
				"description": "Lojih vijus cabih warijok guropaj nabi we putkutis felipgiw wuz lalton ciz dev rumudgot at.",
				"endpoint_url": "http://ahujumo.dj/wecit",
				"framework_group": "lojme",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "urvig",
						"label": "Pevi bugduza neelouj kosren nafdif."
					},
					"year": {
						"data_type": "int",
						"label": "Pihhapma vak renok demom."
					}
				},
				"source_name": "Pufke acege puf dejfef.",
				"source_url": "http://puw.am/mocsubaz",
				"subtitle": "Nonci kutpizag risuje gicame avo rezlan teofu pa bokum ge og os ido perdekpa ajoezi val kiwledduz zefca ro.",
				"title": "Om jud mesuuru bucbicaj nenuc voip afdez asafego evi powmirim wa ke ifjuf ubajofof fohwijno uzubo ipin mivbit hukarowa binowi.",
				"url": "/svizzle/data/urvig.csv",
				"year_extent": [
					2007,
					2012
				]
			},
			{
				"api_doc_url": "http://ugnezra.tz/og",
				"api_type": "FETCH",
				"availableYears": [
					2006,
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
				"data_date": "2028917",
				"description": "Nosre oknin gemfucsi azce jitpo janbe zepawsuv murligi rosbasobu dacod mu mam kozes tiwke dofe.",
				"endpoint_url": "http://museddi.ke/kemvajkez",
				"framework_group": "lojme",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "awwol",
						"label": "Nuncofmup waceki udema vuhur zafgiscer."
					},
					"year": {
						"data_type": "int",
						"label": "Alni za vuzsi sih."
					}
				},
				"source_name": "Osiheohe fagem iculiruna zac.",
				"source_url": "http://wipigu.ht/ezfibalo",
				"subtitle": "Hi ajoeso vijon kat sej gilwazvob lo itjuas momujo ducujaowa patimsi cole az cuhfotev gerubmi halu jarka sizpuzub.",
				"title": "Mun uc ta lampios fuhwofge uh la azpebfo ijamubeg dum emo podo pufun gihekva ugu onu nabbuswij wuem pimrez soib.",
				"url": "/svizzle/data/awwol.csv",
				"year_extent": [
					2006,
					2015
				]
			},
			{
				"api_doc_url": "http://muirefod.bn/kapfe",
				"api_type": "FETCH",
				"availableYears": [
					2010,
					2011,
					2012,
					2013,
					2014,
					2015
				],
				"data_date": "2038820",
				"description": "Ep hemra vat mejgalo emzi woho dombakfog uklivdip vecno huce rezlapeco upgit mineut ic miwej.",
				"endpoint_url": "http://mek.tk/fi",
				"framework_group": "lojme",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "vufit",
						"label": "Adowahdub evu agofogzil dusul dim."
					},
					"year": {
						"data_type": "int",
						"label": "Gifsuude umi hoh ru."
					}
				},
				"source_name": "Hipwe acgaoj abe weag.",
				"source_url": "http://rirwepce.do/woeme",
				"subtitle": "Lalnabgo episo uvas mocuz ohu zusracom cej ehilis madu me ju otidateku geti gaune jauslec matcizu ewilug kuvib pikez ezo sewus.",
				"title": "Fece re ri dagipka.",
				"url": "/svizzle/data/vufit.csv",
				"year_extent": [
					2010,
					2015
				]
			},
			{
				"api_doc_url": "http://enu.sz/dem",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012
				],
				"data_date": "2064530",
				"description": "Altubaf turfu boesuhap mojofad asomel anatu woderok husownu gudfuz jiji sarnew medov pepap sero tugmi.",
				"endpoint_url": "http://megmikpa.gov/un",
				"framework_group": "lojme",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "solit",
						"label": "Rafnozfa mashoepa kafam ahi mubwejhik."
					},
					"year": {
						"data_type": "int",
						"label": "To satfumdem reagoeba uci."
					}
				},
				"source_name": "Ede go ohehi cojezeed.",
				"source_url": "http://pocgir.ls/hin",
				"subtitle": "Rotkagug pisu sulotfo abuwata vuckahi vibwuus bif idbunwa jobte uwlejah safewi reih muv ah jicessa gokuv dongepop ulo ocohi muswuriz puglipida wege woahzin sip usezoki nop moziloko cideh baj cuswufis latatobo.",
				"title": "Icaduwi degatuc orizle azeez pidot jines um gatalba ekcillos re sibnegbo.",
				"url": "/svizzle/data/solit.csv",
				"year_extent": [
					2008,
					2012
				]
			}
		]
	},
	{
		"description": "Ovuinina cu ibguhgut vuzvi uwisiobu bi fi ertasov re zonsili vafim ne iko midka motuhti pod ne.",
		"id": "barog",
		"label": "Lad ho dinnoj jetekpu efiponid micjiv.",
		"order": 3,
		"indicators": [
			{
				"api_doc_url": "http://vosev.sn/ipo",
				"api_type": "FETCH",
				"availableYears": [
					2010,
					2011,
					2012,
					2013,
					2014,
					2015,
					2016,
					2017
				],
				"data_date": "2116124",
				"description": "Novsimcu gut du apazuw papdojbac ubafit rokun tirvi pivuf imakejdop guhofdab uji dasicto fuap ubepocu.",
				"endpoint_url": "http://sabociwic.il/sit",
				"framework_group": "barog",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "mubef",
						"label": "Kewipab ke li cerizuap giz."
					},
					"year": {
						"data_type": "int",
						"label": "Migoviv ijubirva kihpa igi."
					}
				},
				"source_name": "La wuzbavi pe kiiv.",
				"source_url": "http://woh.vc/bel",
				"subtitle": "Alluga si cigfo uz cim mumno ivapa sej fumata ilcurof onsifdu muglo uzu notdil fuj ufoagat wowhif fapvid orceamo nifko nifuzmad pulsod vapo or vucutpeg.",
				"title": "Guocur fu po peznupkeb nol vobleke keuh kufev obrihog cod ko ti cu sub nimfab sose egelaju mikotev lazwika ded kukruc zafomrow is kusvujlij.",
				"url": "/svizzle/data/mubef.csv",
				"year_extent": [
					2010,
					2017
				]
			},
			{
				"api_doc_url": "http://liuzdi.sz/jihi",
				"api_type": "FETCH",
				"availableYears": [
					2010,
					2011,
					2012
				],
				"data_date": "206916",
				"description": "Semof fouji set popfes baluzag hop cuf cu unebe wi jek nepmu muwulgu ari ikado.",
				"endpoint_url": "http://cej.lc/zif",
				"framework_group": "barog",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "vacic",
						"label": "No ji koos cemuzfi do."
					},
					"year": {
						"data_type": "int",
						"label": "Uwunehemu hinped baaboge upco."
					}
				},
				"source_name": "Mam vizirfuw atco zuarara.",
				"source_url": "http://ka.ac/lu",
				"subtitle": "Cawkonduh ima vokcus zolob ef diwu do pon tefivij.",
				"title": "Nourosun welberis man zijtu sepo.",
				"url": "/svizzle/data/vacic.csv",
				"year_extent": [
					2010,
					2012
				]
			},
			{
				"api_doc_url": "http://sa.ba/eco",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014,
					2015
				],
				"data_date": "21081231",
				"description": "Bitikofo hobi us soduc ow difil rifni alaz tetuw julmuru eb vurbinpo woku cuvino vukzuw.",
				"endpoint_url": "http://holroktow.ph/carobdiw",
				"framework_group": "barog",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "suwhe",
						"label": "Caseju hur bigmi housa ureguhog."
					},
					"year": {
						"data_type": "int",
						"label": "Wivu kiseg omrovmil booti."
					}
				},
				"source_name": "Ne rum cichah jaraken.",
				"source_url": "http://izeda.ac/zefwo",
				"subtitle": "Ov eh loruju ohefka niz si lok wuk moftisut kasdi so tip anonorim nilum moma wuvjugot ema muov ferbe odmu sezatpif ubumazli ic ceed go.",
				"title": "Hozu gekob fiwataw ipwaaji em sesene van jurgor.",
				"url": "/svizzle/data/suwhe.csv",
				"year_extent": [
					2008,
					2015
				]
			},
			{
				"api_doc_url": "http://wuf.mp/zonob",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012
				],
				"data_date": "2040325",
				"description": "Onleji tewcum fazgap borop he wohimoir pafit fa re wosavug bof pamavtec opariki pikomon sevebo.",
				"endpoint_url": "http://sa.hn/midzovo",
				"framework_group": "barog",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "zehok",
						"label": "Ginte powog gu de va."
					},
					"year": {
						"data_type": "int",
						"label": "Pad jog ejeowavu calinko."
					}
				},
				"source_name": "Secozeso naldefi ovizemug rad.",
				"source_url": "http://podme.br/fov",
				"subtitle": "Venac dinka enwaf fitif pe ojepag te uw emi tik nov kicagkaw isauziju witwikar wupcummo cefa hetev vemho tidriv ukca lagpeji zelo zevsifdiv lural re kohempef da uf inek zuc no vukba.",
				"title": "Ju hoksi po orsaejo ti gov naj duajha gomin cujam bizadba mub zogha sejnakoc hifukoge ijcuzut revfid sen ukjuz publuhig me.",
				"url": "/svizzle/data/zehok.csv",
				"year_extent": [
					2008,
					2012
				]
			},
			{
				"api_doc_url": "http://iplifi.aw/rosroc",
				"api_type": "FETCH",
				"availableYears": [
					2007,
					2008,
					2009,
					2010,
					2011,
					2012,
					2013
				],
				"data_date": "2066313",
				"description": "Mu vepra voopedis jivnudu ce fa if hotof ivecuv muhatvun dof nuz ke iwnifu zujaipo.",
				"endpoint_url": "http://cocot.eh/gakuh",
				"framework_group": "barog",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "gafet",
						"label": "Onbur wevub rezkef puphe rebahba."
					},
					"year": {
						"data_type": "int",
						"label": "Babug jin dunoeja am."
					}
				},
				"source_name": "Ilvadcu jiag koto ga.",
				"source_url": "http://ro.re/se",
				"subtitle": "Ziv gap pom boazu nu foopaoz ta ule wabhiac ijezuti husterhug ruhek hit ecnoan lokoj capsop ufivi cupgapo mobip.",
				"title": "Av gar jivamuv tekavwok duzare un tazi weheoju nip roshapvaw ilizuga naudno legjodfud wi gumuz ero zekdu lavvabor ilubimon efoto fu li ebuvuj lapuc serpud micezuk cikuzot fonrit hogzepaz tum.",
				"url": "/svizzle/data/gafet.csv",
				"year_extent": [
					2007,
					2013
				]
			},
			{
				"api_doc_url": "http://litfoma.is/wocpezkav",
				"api_type": "FETCH",
				"availableYears": [
					2011,
					2012,
					2013,
					2014,
					2015
				],
				"data_date": "20231023",
				"description": "Ni lavebi biwecoge gitolof sotiuc ricgab voziri dujlevone bapga hamfet iwo gehumezi lobazjof jiv ojhic.",
				"endpoint_url": "http://tak.cr/wat",
				"framework_group": "barog",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "sopim",
						"label": "Nor wapne pa wojam gopguv."
					},
					"year": {
						"data_type": "int",
						"label": "Acefaj docdo ezpi napir."
					}
				},
				"source_name": "Hiji esavi ipsup makascug.",
				"source_url": "http://atu.cx/la",
				"subtitle": "Diub tal orojel vuplitti sol kisgo gulmefpe nobut hoow oz ki po hobu kata te ra sivib na vunit opped keg wab nifa kiduvbul.",
				"title": "Coj kuh ih ki gijpu raivjog bopdeir cahof oj ew ijopin le pu zihbol nanaib peknan zaot fotdo.",
				"url": "/svizzle/data/sopim.csv",
				"year_extent": [
					2011,
					2015
				]
			},
			{
				"api_doc_url": "http://gi.ax/ito",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012
				],
				"data_date": "21181224",
				"description": "Nerzembuv bidi fibos nibvome op dano irfu gapob bejgodna gol ahojim puusu resgobi voczossi hutowa.",
				"endpoint_url": "http://cat.ge/eze",
				"framework_group": "barog",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "iwsaz",
						"label": "Jifigife tewecuwe azculiti rida cagajeh."
					},
					"year": {
						"data_type": "int",
						"label": "Geutub vazihe ko daawnu."
					}
				},
				"source_name": "Dewnufe dow dif du.",
				"source_url": "http://vekanjiv.vu/sa",
				"subtitle": "Vu ha linatzim godtulon jinrelte la.",
				"title": "Vabimdi efjo do bemena.",
				"url": "/svizzle/data/iwsaz.csv",
				"year_extent": [
					2008,
					2012
				]
			},
			{
				"api_doc_url": "http://coz.com/lenrifja",
				"api_type": "FETCH",
				"availableYears": [
					2006,
					2007,
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014
				],
				"data_date": "208918",
				"description": "Bitbo uvdebrul uvosumure po to owoweho fukulnu zalwi bel cekokda hordim tibapa be vuwjepi edeolelor.",
				"endpoint_url": "http://wufigo.tr/ig",
				"framework_group": "barog",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "dumat",
						"label": "Sokah gob wen iseradem zaj."
					},
					"year": {
						"data_type": "int",
						"label": "Jimhaino jug gazba ozopaj."
					}
				},
				"source_name": "Ni zi je ne.",
				"source_url": "http://ovazgar.ar/giasa",
				"subtitle": "Kob ifnuzju gabokjig gife iwejod purucgut tonfomfuv kat foiciviw fe ejiga abiakolu golkob coco.",
				"title": "Vinon boihru ho menpipo hag fi lutri lappin luc cuelame we hum bujuspaz avvi koipefe mirri heahooc suow fenfaevi ko zuc hadjo bebawe zenmiiz zura so pegpem cojcipo acu ucuagi.",
				"url": "/svizzle/data/dumat.csv",
				"year_extent": [
					2006,
					2014
				]
			},
			{
				"api_doc_url": "http://wereghuf.ee/senjubife",
				"api_type": "FETCH",
				"availableYears": [
					2006,
					2007,
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014
				],
				"data_date": "2098911",
				"description": "Zechit maelsi hajefvu wa fooviwa oda dud gi mivpalu afi cano jordit ris lohralfe pa.",
				"endpoint_url": "http://le.aw/imbopha",
				"framework_group": "barog",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "kabco",
						"label": "Jar pecrusdi haseg kaflecta vov."
					},
					"year": {
						"data_type": "int",
						"label": "Zumtoduc mokauha conab disip."
					}
				},
				"source_name": "Cic ovalepun zuz ah.",
				"source_url": "http://cehial.cd/joedogaj",
				"subtitle": "Afjimeh ikcog awu hokoge boc etihuri tu isu ir be fu nihcek kud cugum.",
				"title": "Meri bewat zososho bufduga.",
				"url": "/svizzle/data/kabco.csv",
				"year_extent": [
					2006,
					2014
				]
			}
		]
	},
	{
		"description": "Kil agona waes si kozte zoha bin jovvu vakevjo halla ijparug abma.",
		"id": "botum",
		"label": "Me musegonuh uto uwugi nah bejdi.",
		"order": 4,
		"indicators": [
			{
				"api_doc_url": "http://jiaboap.fr/vam",
				"api_type": "FETCH",
				"availableYears": [
					2007,
					2008,
					2009,
					2010,
					2011,
					2012
				],
				"data_date": "20611220",
				"description": "Fijov fejet jagma la rawsir evira jobujagi hos nina le naju obrigne oj di jemwel.",
				"endpoint_url": "http://dejberlu.dk/an",
				"framework_group": "botum",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "uvpak",
						"label": "Se keh kup hog rohcuciw."
					},
					"year": {
						"data_type": "int",
						"label": "Bar kepicruj rokcutam ig."
					}
				},
				"source_name": "Lijokoni rajmileb suvdil tucgek.",
				"source_url": "http://igiru.in/ocral",
				"subtitle": "Iveleegu vita rel azbis tuz vow apu girjacmeh jad.",
				"title": "Iz fenge etmof nalcudteh gazi levpav voujemu dieptez fej octagu jiw nadoz ruce vibanizum jobaw mowmavu ilotes cifdiz fud wiwaf nuf lahcoh egu neuggo wup valuwozac otakuctam afemolo.",
				"url": "/svizzle/data/uvpak.csv",
				"year_extent": [
					2007,
					2012
				]
			},
			{
				"api_doc_url": "http://hu.bw/uduik",
				"api_type": "FETCH",
				"availableYears": [
					2011,
					2012,
					2013,
					2014
				],
				"data_date": "207627",
				"description": "Uvapcem evlooh tum zekilibu vij zepniroje hezodi cor ici eno ruztacuf atbikne zece obu nos.",
				"endpoint_url": "http://wegde.pk/kehbej",
				"framework_group": "botum",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "ruzko",
						"label": "Jotsumja simozu dafut vebwef tez."
					},
					"year": {
						"data_type": "int",
						"label": "Ocufil eca uckaw mezo."
					}
				},
				"source_name": "Remebpa hijobcew nep cofikwug.",
				"source_url": "http://afoujku.ht/muma",
				"subtitle": "Nebunusut ku gizum zewpojsej poj tupab lihkuwep isufuuju cifwipbuf imcogjum avu ugarop huor ugronun bapgo uja mif weragbo ka vok dar mecwupet va lanence feffa liphij pikuk guguvi.",
				"title": "Napin ifevarip sucum boomo.",
				"url": "/svizzle/data/ruzko.csv",
				"year_extent": [
					2011,
					2014
				]
			},
			{
				"api_doc_url": "http://zistiuce.bo/sizameg",
				"api_type": "FETCH",
				"availableYears": [
					2010,
					2011,
					2012,
					2013
				],
				"data_date": "2032513",
				"description": "Vulzo necuasi ro to mezogrub ozadug wikecfis mikon ufkun busek kawrav ufi giveduv kuzco ze.",
				"endpoint_url": "http://pumvow.bd/pacuk",
				"framework_group": "botum",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "utota",
						"label": "Pigpuzku fihetaw ejnebwu evjiof melifa."
					},
					"year": {
						"data_type": "int",
						"label": "Deama miuztu roziwa vi."
					}
				},
				"source_name": "Sainto os tuhicis evlin.",
				"source_url": "http://koc.co.uk/lil",
				"subtitle": "Zovobjo igufe gok ezuurota zejak jiucco laseda ivuiha vogu zidkuvoz ecadbef fi nu ej imacuit zu zogip goce ni ho.",
				"title": "Liti kizsa ivedub vizewtuk vi vek bopabu bajjabid pa eta tas tez zejsu nenek poh goh nodijzu sile ehdeb fevpikro nelezhuj do lilo sun izucuwdo.",
				"url": "/svizzle/data/utota.csv",
				"year_extent": [
					2010,
					2013
				]
			},
			{
				"api_doc_url": "http://fir.md/cervi",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014,
					2015
				],
				"data_date": "210626",
				"description": "Defwob fobfire vajgi vi upro pehzinic dumi obhino ace cetewul itufag sav bitun mil doku.",
				"endpoint_url": "http://obe.ga/hepzocu",
				"framework_group": "botum",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "jasui",
						"label": "Verit peh tufu rihecoh puzizime."
					},
					"year": {
						"data_type": "int",
						"label": "Men cicujoj nefis fajlagzas."
					}
				},
				"source_name": "Wa do sali om.",
				"source_url": "http://gektucis.hk/caj",
				"subtitle": "Cokko miosavez tasovfe iduohri megla diraw bu uzopju kedupjow jagzire lomsec kivivda os ka.",
				"title": "Oku obaara ti goz cop cenudlok dag hubaam him.",
				"url": "/svizzle/data/jasui.csv",
				"year_extent": [
					2008,
					2015
				]
			},
			{
				"api_doc_url": "http://efaka.pw/seren",
				"api_type": "FETCH",
				"availableYears": [
					2006,
					2007,
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
				"data_date": "2102812",
				"description": "Is et guc caw upeahfu gohtacgoc up loffed illi dezmub dibod zeguun ba leg ez.",
				"endpoint_url": "http://zap.si/ornaz",
				"framework_group": "botum",
				"is_experimental": true,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "inaca",
						"label": "Ho wu oruiwu nukbogi iwi."
					},
					"year": {
						"data_type": "int",
						"label": "Wagzejci huukodi jejegfuz jazukma."
					}
				},
				"source_name": "Roblezwob go gozmo pohavo.",
				"source_url": "http://ti.ci/nadoce",
				"subtitle": "Zo sobmoj bohagik hannowsa koz gadsetu mug niwaz kajuzhif huot vu koazro coheb mazoka badibjo jurjorar cobruf ivimim imo imova du emce gahoka cazhois bovdob pewpotav optir va solin bichopec mismu taoneug lif vovermog tagiba.",
				"title": "Faktebvuz zi ate hehfu nowmor zudbiv can jinate nulti ire zemserpok limolesa tat gotazmen anije dafmicuz nofiz ajuvohe kafma aku bah foc birje.",
				"url": "/svizzle/data/inaca.csv",
				"year_extent": [
					2006,
					2016
				]
			},
			{
				"api_doc_url": "http://bezon.gn/avarisev",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013
				],
				"data_date": "210385",
				"description": "Owsu oco zonziw luzifoev sap gahdudlic lo hisaciop ufi masbe zelu bokeg wozuw tekso begub.",
				"endpoint_url": "http://goni.am/ke",
				"framework_group": "botum",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "nidah",
						"label": "Jas wupsiwra ugodamu fej hofoztor."
					},
					"year": {
						"data_type": "int",
						"label": "Waunhom uh mowwa wuvu."
					}
				},
				"source_name": "Keik dammat fan ufi.",
				"source_url": "http://umobu.cy/hobjonor",
				"subtitle": "Fog gevuhho tabduloha fesig kere uncuge jehobi.",
				"title": "Ca hihaet fabip vovezke guvroac hi pedam fo ojhuwi siumeani lahib muk powacdib legbibzur isuvu ogecek hekdozes taad va iciro jutgen.",
				"url": "/svizzle/data/nidah.csv",
				"year_extent": [
					2008,
					2013
				]
			},
			{
				"api_doc_url": "http://hoki.sz/patat",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014,
					2015,
					2016,
					2017
				],
				"data_date": "206497",
				"description": "Ogu bot kuobi viriwric ab kaphi supsu tofculom utmec wo ug idwiwvij sinanic wucabvo ok.",
				"endpoint_url": "http://huc.ir/zim",
				"framework_group": "botum",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "ukfin",
						"label": "Sacujva en hum oz ce."
					},
					"year": {
						"data_type": "int",
						"label": "Uhpinjam fu bariem awufi."
					}
				},
				"source_name": "Ji ubaum ediulesa nogolta.",
				"source_url": "http://agu.co/zorojof",
				"subtitle": "Kuw jirucdez ro uv docukonab dorug beupi awanudfo zudvih magikir gabcodheg heheilo se sewevcat daahsem cojat at du afmil sabahuc funtatjiv ejkufbi nacubi ihuruv opemoral he cove ale zutfi ho.",
				"title": "Onowfe jahihkat vectupe go zudojmul feb.",
				"url": "/svizzle/data/ukfin.csv",
				"year_extent": [
					2008,
					2017
				]
			},
			{
				"api_doc_url": "http://kugce.ws/tu",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012
				],
				"data_date": "2060217",
				"description": "Sap uvuba feobefos ne dathiero paumutow biavsov tezjosil vago ihikikal savrawduz gonsul da cut se.",
				"endpoint_url": "http://cizzif.kn/luge",
				"framework_group": "botum",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "dizoz",
						"label": "Nibeh lojosehus izu pecuci ilifa."
					},
					"year": {
						"data_type": "int",
						"label": "Nifec rogcomuc fezoviz oc."
					}
				},
				"source_name": "Raraz fametju mu mopfa.",
				"source_url": "http://jut.jm/hetujibi",
				"subtitle": "Izu uginuena wapji ono ajiwofi gasopis hefaf zoc ragid wa kijmobag imnin za besub bovis semfezidu emo putzis holkehuk seh om gaz to gietesu het raav adbuke.",
				"title": "Pubufhag ki opu pagpelas mo waoz se.",
				"url": "/svizzle/data/dizoz.csv",
				"year_extent": [
					2008,
					2012
				]
			},
			{
				"api_doc_url": "http://ih.es/uficefaz",
				"api_type": "FETCH",
				"availableYears": [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013
				],
				"data_date": "2066126",
				"description": "Atgu ihunij cuse absi mal monzuvep acaabu fireze jezum fi puggunha geho vab pewvazvo parsecrit.",
				"endpoint_url": "http://met.pl/ripuaz",
				"framework_group": "botum",
				"is_experimental": false,
				"order": [
					"year",
					"region_type",
					"region_year_spec",
					"region_id",
					"region_level",
					"value.id"
				],
				"region_types": [
					"NUTS"
				],
				"schema": {
					"region_id": "string",
					"region_level": "int",
					"region_type": "string",
					"region_year_spec": "int",
					"value": {
						"data_type": "int",
						"format": ".1f",
						"id": "podli",
						"label": "Mako peduppa magom nuecegav raribun."
					},
					"year": {
						"data_type": "int",
						"label": "Nottiwuv tel okmi huuc."
					}
				},
				"source_name": "Owalu pongo zub soonam.",
				"source_url": "http://mid.am/vupko",
				"subtitle": "Beg cubwof duwu omimesfub poceru ozu bega tianivar ula mototuz su taffoj lehe mow azofokisi gije fu dejto fuivaaz wewnoh ezufotpud lacuha kupu wojolu vup zij.",
				"title": "Zelu dogvokhej veawavi kulimhi fegi.",
				"url": "/svizzle/data/podli.csv",
				"year_extent": [
					2008,
					2013
				]
			}
		]
	}
];

const lookup = makeIndicatorsLookup(groups);

/* data */

const _groups = readable(groups);
const _yearExtent = derived(_groups, getYearExtent);
const _yearRange = derived(_yearExtent, inclusiveRange);

export { _hrefBase as _, _timelineLayout as a, _yearRange$1 as b, shortenYear as c, _routes as d, _isSmallScreen as e, _screenClasses as f, _viewsClasses as g, _isTimelineHidden as h, _timelineWidth as i, _timelineHeight as j, _selectedYear as k, _navFlags as l, _views as m, showView as n, _groups as o, _lookup as p, makeGetIndicatorFormatOf as q, resetSelectedYear as r, setGroups as s, setRoute as t, _yearRange as u, lookup as v, makeGetRefFormatOf as w, keyValueArrayAverage as x, setSelectedYear as y };
