import {regionSpecs} from '@svizzle/atlas';

/* navigation */

export const hrefBase = '/svizzle/compounds/time_region_value';

/* flags */

export const flags = {
	showPOIs: false
}

/* regional selection */

const regionType = 'NUTS';
const {levels, years} = regionSpecs[regionType];
const [rootLevel] = levels;

export const regionSettings = {
	atlasBase: '/svizzle/atlas',
	canSelectLevels: true,
	filterableLevel: 0,
	ignoredRegions: [

		// IDEA: use atlas sub-type instead (`overseas`, etc)
		// IDEA: define these in atlas' dist/

		/* ES */

		// Canarias
		68,		// ES7
		248,	// ES70
		1114,	// ES701
		1115,	// ES702
		1936,	// ES703
		1937,	// ES704
		1938,	// ES705
		1939,	// ES706
		1940,	// ES707
		1941,	// ES708
		1942,	// ES709

		/* FR */

		// French Guyene
		79,		// FR9
		278,	// FR93
		1234, // FR930, FRY30

		// Guadeloupe

		2111,	// FRA10, FRY10
		2084,	// FRY1
		1232,	// FR910
		276,	// FR91

		// Guyane

		1234,	// FRA30, FRY30
		278,	// FRY3

		// La Réunion

		1235,	// FRA40, FRY40
		279,	// FRY4

		// Martinique

		1233,	// FRA20, FRY20
		277,	// FRY2

		// Mayotte

		2112,	// FRA50, FRY50
		2085,	// FRY5

		// RÉGIONS ULTRAPÉRIPHÉRIQUES FRANÇAISES

		2083,	// FRY

		/* PT */

		112,	// PT2
		372,	// PT20
		1592,	// PT200

		113,	// PT3
		373,	// PT30
		1593,	// PT300

		/* IS */

		// 16,	// IS
		// 89,	// IS0
		// 305,	// IS00
		// 1336,	// IS000
		// 1945,	// IS001
		// 1946,	// IS002
	],
	initialLevel: rootLevel,
	key: 'NUTS_ID',
	levels,
	objectId: 'NUTS',
	resolution: '10M',
	rootIds: undefined, // all roots
	type: regionType,
	years,
}
