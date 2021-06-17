import { a as apply, p as pipe, F as collect, ai as getLength, aj as divide, m as mapWith, $ as reduceWith, ak as sum, g as getKey, ah as is, f as partial, _ as __, al as pluck, a9 as flatten, am as transpose, an as makeArrayTransformer, i as indexBy, Z as getPath, a3 as adapter, ao as casus, w as format, a0 as allOf, a8 as hasKey, ap as not, M as identity, aq as pickIf, k as keys, b as mapValuesWith } from './defaultLocale.f3c5fc93.js';
import { g as getValue, s as sliceString, i as inclusiveRange, _ as _screen, l as linear, e as joinWithBlank } from './ScreenGauge.8c0d1ef1.js';
import { a9 as derived, U as writable, aa as readable, ab as get_store_value } from './client.ed49fe48.js';

/**
* @module @svizzle/utils/array-number
*/

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
const arrayMax = apply(Math.max);

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
 *
 * @since 0.11.0
 */
pipe([
	collect([arraySum, getLength]),
	apply(divide),
]);

/**
 * Return the average of values of a {key, value}[] array
 *
 * @function
 * @arg {array} – {key, value}[]
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
const keyValueArrayAverage = pipe([
	collect([
		pipe([mapWith(getValue), arraySum]),
		getLength
	]),
	apply(divide),
]);

/**
* @module @svizzle/utils/array-[object-boolean]
*/

/**
 * Return a predicate expecting an object and returning `true` if the value at the provided `key` is the [same]{@link https://ascartabelli.github.io/lamb/module-lamb.html#areSame} as the provided `value`
 *
 * @function
 * @arg {array} pair - [key, value]
 * @return {function} predicate - Object -> Boolean
 *
 * @example
> isUSA = isKeyValue(['country_id', 'US'])
> isUSA({country_id: 'GB', id: 123})
false
> isUSA({country_id: 'US', id: 456})
true
 *
 * @since 0.3.0
 */
const isKeyValue = ([key, value]) => pipe([getKey(key), is(value)]);

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

/* year extent */

// IDEA just flatten and get the whole extent
const getYearExtent = pipe([
	pluck('indicators'),
	flatten,
	pluck('year_extent'),
	transpose,
	makeArrayTransformer([arrayMin, arrayMax]),
]);

/* lookup */

const makeIndicatorsLookup = pipe([
	pluck('indicators'),
	flatten,
	indexBy(getPath('schema.value.id')),
]);

/* groups */

const _groups$1 = writable([]);
const setGroups = groups => _groups$1.set(groups);

/* lookup */

derived(_groups$1, makeIndicatorsLookup);

/* year extent */

const _yearExtent$1 = derived(_groups$1, getYearExtent);

/* year range */

const _yearRange$1 = derived(_yearExtent$1, inclusiveRange);

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

const makeGetIndicatorFormatOf = id => pipe([
	getPath(`${id}.schema.value`),
	adapter([
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
		() => identity,
	])
]);

const makeGetRefFormatOf = id => pipe([
	getPath(`${id}.schema.value`),
	adapter([
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
		() => identity,
	])
]);

const shortenYear = pipe([String, sliceStringAt([2, 4])]);

const makeClasses = pipe([
	pickIf(identity),
	keys,
	joinWithBlank
]);

// utils

const activate = id => mapValuesWith((value, key) => key === id);

// views

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

// routes

const defaultRoutes = {
	Id: false,
	IdYear: false,
	Index: true,
};
const _routes = writable(defaultRoutes);
const setRoute = id => _routes.update(activate(id));

// timeline visibility

const _isTimelineHidden = derived(
	[_isSmallScreen, _views],
	([isSmall, views]) => isSmall && (views.info || views.settings)
);

const _selectedYear = writable();
const resetSelectedYear = () => _selectedYear.set();

const _availableYears = writable([]);

const resetSelection = () => {
	_availableYears.set([]);
	resetSelectedYear();
};

var groups = [
	{
		description: "Ra wapjoci gi ma tartac biehiezo hoif mifvawlu evacuhwi tin irdod itvovwut.",
		id: "uvowt",
		label: "Edzum ne sev en ko gofi.",
		order: 0,
		indicators: [
			{
				api_doc_url: "http://suwevzek.st/simled",
				api_type: "FETCH",
				data_date: "2099720",
				title: "Hezodfec estive giw wil.",
				subtitle: "Ko lulgerca gekburite meba eze fuzwo.",
				endpoint_url: "http://hatvit.iq/sowgas",
				framework_group: "uvowt",
				is_experimental: false,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "himuk",
						label: "Rijigej fi jepmijzi jivcole bilootu.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Lipku wid navovuv avwomu."
					}
				},
				source_name: "Runcil budagadu gabih idaruc.",
				source_url: "http://peg.so/ulopejuni",
				url: "/svizzle/data/himuk.csv",
				year_extent: [
					2008,
					2014
				],
				availableYears: [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014
				]
			},
			{
				api_doc_url: "http://eligu.wf/tecgu",
				api_type: "FETCH",
				data_date: "2065722",
				title: "Wokfemos ulip epuwacfim ewuwi.",
				subtitle: "Gavis undo farimij wev bahaciv vebniw.",
				endpoint_url: "http://robni.cf/hiewuuta",
				framework_group: "uvowt",
				is_experimental: true,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "milow",
						label: "Seterew zu kugab itaun zu.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Efuhekem mobubpis jannulcup muwjecrit."
					}
				},
				source_name: "Doha duzbasun hogsab ogi.",
				source_url: "http://mufwebwaf.bw/pos",
				url: "/svizzle/data/milow.csv",
				year_extent: [
					2008,
					2013
				],
				availableYears: [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013
				]
			},
			{
				api_doc_url: "http://gug.gy/ajvi",
				api_type: "FETCH",
				data_date: "2078931",
				title: "Cuemodag hagcur citni ji.",
				subtitle: "Tisegeza wassevuf pu tiabera dazihet af.",
				endpoint_url: "http://temgafzaz.ax/tohza",
				framework_group: "uvowt",
				is_experimental: true,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "cibro",
						label: "Bipletcup legiv igi ziisi iptikni.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Co cuak jukiwfo vi."
					}
				},
				source_name: "Tumivowu zihdig za zekuvnur.",
				source_url: "http://mor.sd/ucovot",
				url: "/svizzle/data/cibro.csv",
				year_extent: [
					2007,
					2013
				],
				availableYears: [
					2007,
					2008,
					2009,
					2010,
					2011,
					2012,
					2013
				]
			},
			{
				api_doc_url: "http://teriga.bm/kavoviizo",
				api_type: "FETCH",
				data_date: "2103930",
				title: "Meja fahpaj hidpuk fadeb.",
				subtitle: "Otduzez rara defowda so fo ha.",
				endpoint_url: "http://lih.mq/sujmihgif",
				framework_group: "uvowt",
				is_experimental: false,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "fukag",
						label: "Ojme dofehman loeduh tihavde uzbozo.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Niwlaj manci sim ta."
					}
				},
				source_name: "Wintuk po dioke pa.",
				source_url: "http://du.cf/donhuj",
				url: "/svizzle/data/fukag.csv",
				year_extent: [
					2010,
					2014
				],
				availableYears: [
					2010,
					2011,
					2012,
					2013,
					2014
				]
			}
		]
	},
	{
		description: "Dien ij cibetcob zu pog lir wawa goham lesjafman movupa vocewup baevke ewe tiz dep.",
		id: "dajca",
		label: "Mubujro icooro ujata ziehuj luopsov wernefas.",
		order: 1,
		indicators: [
			{
				api_doc_url: "http://kamgof.aw/rodcirfe",
				api_type: "FETCH",
				data_date: "205198",
				title: "Folof fago ked toc.",
				subtitle: "Upacaise fe tig soiwsol junpowoh zulfag.",
				endpoint_url: "http://nenel.sl/hanlicet",
				framework_group: "dajca",
				is_experimental: false,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "howpo",
						label: "Asran li ihjof bekgulrol oza.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Diodno guz fo adlejsi."
					}
				},
				source_name: "Ostu dimur lad riwdet.",
				source_url: "http://esi.gn/jiwi",
				url: "/svizzle/data/howpo.csv",
				year_extent: [
					2008,
					2015
				],
				availableYears: [
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014,
					2015
				]
			},
			{
				api_doc_url: "http://fi.sn/rasatig",
				api_type: "FETCH",
				data_date: "2052912",
				title: "Ditmifnuj toswera tew cet.",
				subtitle: "Le cen wenose ezajavroj fiwate hophukro.",
				endpoint_url: "http://muv.tt/fo",
				framework_group: "dajca",
				is_experimental: true,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "imudg",
						label: "Depeij daal mupzike elpugib rarjofet.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Nuj wuk gido te."
					}
				},
				source_name: "Hetog sofis gohibuw mamdew.",
				source_url: "http://ejeedhup.lk/jovap",
				url: "/svizzle/data/imudg.csv",
				year_extent: [
					2008,
					2017
				],
				availableYears: [
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
				]
			},
			{
				api_doc_url: "http://edahe.kg/giru",
				api_type: "FETCH",
				data_date: "208773",
				title: "Vewaw loswienu ser luce.",
				subtitle: "Paazut wedcub gobkufu viw zavpoljiz ebuciih.",
				endpoint_url: "http://em.ga/inure",
				framework_group: "dajca",
				is_experimental: true,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "acpuf",
						label: "Jucav jabwo jicoh obimaubu suc.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Unworu jawkem gibgozcuh rup."
					}
				},
				source_name: "Nerabo bi vej it.",
				source_url: "http://puckaof.mg/obekiga",
				url: "/svizzle/data/acpuf.csv",
				year_extent: [
					2009,
					2012
				],
				availableYears: [
					2009,
					2010,
					2011,
					2012
				]
			},
			{
				api_doc_url: "http://mi.gl/ravod",
				api_type: "FETCH",
				data_date: "20971210",
				title: "Ujavuc hidosce nog cud.",
				subtitle: "Kawrota owogihe zajis biw lutipi calomsug.",
				endpoint_url: "http://emvoju.dm/sikjimvad",
				framework_group: "dajca",
				is_experimental: true,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "jatit",
						label: "Jize du ud lew repec.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Kuwuf une kaantek ecuogde."
					}
				},
				source_name: "Ihzusesi surevvuk ad dilisvam.",
				source_url: "http://ahaaje.ma/boag",
				url: "/svizzle/data/jatit.csv",
				year_extent: [
					2009,
					2013
				],
				availableYears: [
					2009,
					2010,
					2011,
					2012,
					2013
				]
			}
		]
	},
	{
		description: "Elgighel he bakgud efedar oro ho hidoufo tan zumozibu keraskot ostirem ijeru seawa delrilil in izamac wipa celegwut.",
		id: "jigek",
		label: "Bot fanogu bod zos ru gozop.",
		order: 2,
		indicators: [
			{
				api_doc_url: "http://lag.bi/aska",
				api_type: "FETCH",
				data_date: "2044524",
				title: "Sobzufek ca jico tiznidceg.",
				subtitle: "Pel wunpah law eza jab cabido.",
				endpoint_url: "http://ta.me/ninbe",
				framework_group: "jigek",
				is_experimental: true,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "jiduh",
						label: "Dosiffa rezeho gepu jo iwe.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Cikpa nudokpi cofbifit osu."
					}
				},
				source_name: "Net rocekom zo tu.",
				source_url: "http://mar.fi/futeh",
				url: "/svizzle/data/jiduh.csv",
				year_extent: [
					2009,
					2012
				],
				availableYears: [
					2009,
					2010,
					2011,
					2012
				]
			},
			{
				api_doc_url: "http://calipini.ai/lirginfim",
				api_type: "FETCH",
				data_date: "2050101",
				title: "Gebirug gim pipid la.",
				subtitle: "Zem kifdek ci longoj gudo nas.",
				endpoint_url: "http://afbu.hn/wa",
				framework_group: "jigek",
				is_experimental: false,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "ulvef",
						label: "Afgo ow wublekuc zoppap buvacaz.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Veifmu pepiid gupzatad wif."
					}
				},
				source_name: "Cografu pemwino gurko leto.",
				source_url: "http://likoat.mg/hadtef",
				url: "/svizzle/data/ulvef.csv",
				year_extent: [
					2010,
					2017
				],
				availableYears: [
					2010,
					2011,
					2012,
					2013,
					2014,
					2015,
					2016,
					2017
				]
			},
			{
				api_doc_url: "http://weplow.tr/rorip",
				api_type: "FETCH",
				data_date: "2054611",
				title: "Oje jorwotdoc holi rawe.",
				subtitle: "Res gud punsin cesop obkas wogatak.",
				endpoint_url: "http://juf.lk/enhurjem",
				framework_group: "jigek",
				is_experimental: true,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "uvoug",
						label: "Sac da jevah zonug tipehu.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Ev ju ricek vapgaufa."
					}
				},
				source_name: "Zohutad lermel da ja.",
				source_url: "http://begukmif.ci/ure",
				url: "/svizzle/data/uvoug.csv",
				year_extent: [
					2006,
					2016
				],
				availableYears: [
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
				]
			},
			{
				api_doc_url: "http://mogul.np/liw",
				api_type: "FETCH",
				data_date: "2101428",
				title: "Atzucco hecbi wepajom pi.",
				subtitle: "Wukuja gekgon nukila cebej den eg.",
				endpoint_url: "http://vocep.fk/hoata",
				framework_group: "jigek",
				is_experimental: false,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "kojze",
						label: "Tolisvok uj wabudsen inetulu gufinu.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Gicuovo gudmujnuh ebisikav pus."
					}
				},
				source_name: "Po zovenno verujzic lipfep.",
				source_url: "http://lema.ec/tif",
				url: "/svizzle/data/kojze.csv",
				year_extent: [
					2010,
					2015
				],
				availableYears: [
					2010,
					2011,
					2012,
					2013,
					2014,
					2015
				]
			},
			{
				api_doc_url: "http://opo.eu/ubne",
				api_type: "FETCH",
				data_date: "2064130",
				title: "Tibajviv mes zinuwo ipihovef.",
				subtitle: "Ebi eka jekge suvjigmam icfitsa di.",
				endpoint_url: "http://po.zm/simtem",
				framework_group: "jigek",
				is_experimental: false,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "zehim",
						label: "Hapfo pe vo fa ze.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Jimnasdi vovi uvuizel kagenpob."
					}
				},
				source_name: "Wuh vassivku urlofib wo.",
				source_url: "http://edojo.sn/eb",
				url: "/svizzle/data/zehim.csv",
				year_extent: [
					2006,
					2014
				],
				availableYears: [
					2006,
					2007,
					2008,
					2009,
					2010,
					2011,
					2012,
					2013,
					2014
				]
			},
			{
				api_doc_url: "http://hah.af/fewuga",
				api_type: "FETCH",
				data_date: "205625",
				title: "Bezopad doaka co tem.",
				subtitle: "Libu josiso gem bizvomiw epo ekcegcaz.",
				endpoint_url: "http://va.pa/gu",
				framework_group: "jigek",
				is_experimental: false,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "revbi",
						label: "Amirala suwfa oko muztijlo sul.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Kik hapid laso wetco."
					}
				},
				source_name: "Bupve but pi dofkifhi.",
				source_url: "http://jaskotaci.rw/dekuk",
				url: "/svizzle/data/revbi.csv",
				year_extent: [
					2008,
					2016
				],
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
				]
			}
		]
	},
	{
		description: "Pu uf jigjudu fajun teguvlek puc jaow ja bav wimliji isco eljud guk puzumiole ci cinva lopzonwur su.",
		id: "ucaku",
		label: "Jojwij rugineh lekebtut epanudif lebok pi.",
		order: 3,
		indicators: [
			{
				api_doc_url: "http://wav.tw/avder",
				api_type: "FETCH",
				data_date: "2057921",
				title: "Gozobeb etkuco poliro idhotlaf.",
				subtitle: "Akuhaenu wucizlim uma uvbowte hemigivo folkamte.",
				endpoint_url: "http://sitrufuw.sj/aka",
				framework_group: "ucaku",
				is_experimental: false,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "wemeh",
						label: "Budde nuh ca nofe ag.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Rih azjozzo lun ukepugsu."
					}
				},
				source_name: "Vices dam ded wadnez.",
				source_url: "http://juotoap.nl/bukji",
				url: "/svizzle/data/wemeh.csv",
				year_extent: [
					2006,
					2016
				],
				availableYears: [
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
				]
			},
			{
				api_doc_url: "http://juczamozo.bj/jofaj",
				api_type: "FETCH",
				data_date: "210092",
				title: "Te hi wucewo hi.",
				subtitle: "Baakaeto behnupa belohju cucoc daljetbep cusdunu.",
				endpoint_url: "http://sa.ws/escamfew",
				framework_group: "ucaku",
				is_experimental: false,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "muhbi",
						label: "Mezipoeja hotogo agitatkuv zoer bag.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Boddu jeij dago refhitoc."
					}
				},
				source_name: "Zap ezwazfam oduhot zu.",
				source_url: "http://ikabidar.pk/umupep",
				url: "/svizzle/data/muhbi.csv",
				year_extent: [
					2007,
					2015
				],
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
				]
			}
		]
	},
	{
		description: "Padenoj ica tuon ciubelu nuhejem ezecuti kenmooj tuuz vovojfat efo atotip vivo vohazob ekamoep wi nabihve.",
		id: "supge",
		label: "Esinukzi ticguca sonapoz situn iro hecmiha.",
		order: 4,
		indicators: [
			{
				api_doc_url: "http://vefkag.hr/uwikajif",
				api_type: "FETCH",
				data_date: "211935",
				title: "Di ziuvo iwbu pa.",
				subtitle: "Afazi resajo ecmobu sikefe kobrejwa tohsuhcub.",
				endpoint_url: "http://pavik.ch/pid",
				framework_group: "supge",
				is_experimental: false,
				order: [
					"year",
					"nuts_id",
					"nuts_year_spec",
					"value.id"
				],
				region: {
					type: "NutsRegion",
					level: 2,
					source_url: "http://geoportal1-ons.opendata.arcgis.com/datasets/48b6b85bb7ea43699ee85f4ecd12fd36_0.zip?outSR=%7B%22latestWkid%22:27700,%22wkid%22:27700%7D"
				},
				schema: {
					nuts_id: {
						type: "NutsRegion.id"
					},
					nuts_year_spec: {
						type: "NutsRegion.year_spec"
					},
					value: {
						id: "aroda",
						label: "Akboj af wiri kabca le.",
						type: "int"
					},
					year: {
						data_type: "int",
						label: "Ji wiolacup viji iza."
					}
				},
				source_name: "Bug oma luncume gaznabaw.",
				source_url: "http://detitri.kn/rabefgi",
				url: "/svizzle/data/aroda.csv",
				year_extent: [
					2010,
					2014
				],
				availableYears: [
					2010,
					2011,
					2012,
					2013,
					2014
				]
			}
		]
	}
];

// import * as _ from 'lamb';

/* data */

const _groups = readable(groups);
const _lookup = derived(_groups, makeIndicatorsLookup);
const lookup = get_store_value(_lookup);
const _yearExtent = derived(_groups, getYearExtent);
const _yearRange = derived(_yearExtent, inclusiveRange);

export { _timelineLayout as _, _yearRange$1 as a, shortenYear as b, _isSmallScreen as c, _screenClasses as d, _timelineHeight as e, _timelineWidth as f, _isTimelineHidden as g, _routes as h, _views as i, _viewsClasses as j, showView as k, _availableYears as l, _selectedYear as m, _groups as n, setRoute as o, _yearRange as p, resetSelectedYear as q, resetSelection as r, setGroups as s, makeGetIndicatorFormatOf as t, lookup as u, _lookup as v, keyValueArrayAverage as w, makeGetRefFormatOf as x };
