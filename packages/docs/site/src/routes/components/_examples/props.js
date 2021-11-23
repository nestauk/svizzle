import * as _ from 'lamb';
import {scaleLinear, scaleOrdinal} from 'd3-scale';
import {hsl} from 'd3-color';

export const countryKeyValuePositive = [
	{key: 'AL', value: 112},
	{key: 'AD', value: 234},
	{key: 'AM', value: 36},
	{key: 'AT', value: 357},
	{key: 'AZ', value: 123},
	{key: 'BY', value: 56},
	{key: 'BE', value: 15},
	{key: 'BA', value: 12},
	{key: 'BG', value: 568},
	{key: 'HR', value: 213},
	{key: 'CY', value: 456},
	{key: 'CZ', value: 21},
	{key: 'DK', value: 345},
	{key: 'EE', value: 37},
	{key: 'FI', value: 376},
	{key: 'FR', value: 346},
	{key: 'GE', value: 17},
	{key: 'DE', value: 567},
	{key: 'GR', value: 47},
	{key: 'HU', value: 23},
	{key: 'IS', value: 578},
	{key: 'IE', value: 24},
	{key: 'IT', value: 6},
	{key: 'KZ', value: 5},
	{key: 'LV', value: 58},
	{key: 'LI', value: 5},
	{key: 'LT', value: 69},
	{key: 'LU', value: 23},
	{key: 'MT', value: 36},
	{key: 'MD', value: 57},
	{key: 'MC', value: 69},
	{key: 'ME', value: 223},
	{key: 'NL', value: 35},
	{key: 'MK', value: 57},
	{key: 'NO', value: 79},
	{key: 'PL', value: 12},
	{key: 'PT', value: 46},
	{key: 'RO', value: 37},
	{key: 'RU', value: 678},
	{key: 'SM', value: 345},
	{key: 'RS', value: 67},
	{key: 'SK', value: 23},
	{key: 'SI', value: 567},
	{key: 'ES', value: 23},
	{key: 'SE', value: 768},
	{key: 'CH', value: 56},
	{key: 'TR', value: 78},
	{key: 'UA', value: 2},
	{key: 'GB', value: 56}
].sort((a, b) => b.value - a.value);

export const countryKeyValuePositiveWithZeroes = [
	{key: 'AL', value: 112},
	{key: 'AD', value: 234},
	{key: 'AM', value: 36},
	{key: 'AT', value: 357},
	{key: 'AZ', value: 123},
	{key: 'BY', value: 0},
	{key: 'BE', value: 15},
	{key: 'BA', value: 12},
	{key: 'BG', value: 568},
	{key: 'HR', value: 213},
	{key: 'CY', value: 0},
	{key: 'CZ', value: 21},
	{key: 'DK', value: 0},
	{key: 'EE', value: 37},
	{key: 'FI', value: 376},
	{key: 'FR', value: 0},
	{key: 'GE', value: 17},
	{key: 'DE', value: 567},
	{key: 'GR', value: 47},
	{key: 'HU', value: 23},
	{key: 'IS', value: 0},
	{key: 'IE', value: 24},
	{key: 'IT', value: 6},
	{key: 'KZ', value: 5},
	{key: 'LV', value: 58},
	{key: 'LI', value: 0},
	{key: 'LT', value: 69},
	{key: 'LU', value: 23},
	{key: 'MT', value: 0},
	{key: 'MD', value: 57},
	{key: 'MC', value: 69},
	{key: 'ME', value: 223},
	{key: 'NL', value: 35},
	{key: 'MK', value: 57},
	{key: 'NO', value: 0},
	{key: 'PL', value: 12},
	{key: 'PT', value: 46},
	{key: 'RO', value: 37},
	{key: 'RU', value: 678},
	{key: 'SM', value: 345},
	{key: 'RS', value: 0},
	{key: 'SK', value: 23},
	{key: 'SI', value: 567},
	{key: 'ES', value: 0},
	{key: 'SE', value: 0},
	{key: 'CH', value: 56},
	{key: 'TR', value: 78},
	{key: 'UA', value: 2},
	{key: 'GB', value: 56}
].sort((a, b) => b.value - a.value);

export const countryKeyValueNegatives = [
	{key: 'AL', value: -112},
	{key: 'AD', value: -234},
	{key: 'AM', value: -36},
	{key: 'AT', value: -357},
	{key: 'AZ', value: -123},
	{key: 'BY', value: -56},
	{key: 'BE', value: -15},
	{key: 'BA', value: -12},
	{key: 'BG', value: -568},
	{key: 'HR', value: -213},
	{key: 'CY', value: -456},
	{key: 'CZ', value: -21},
	{key: 'DK', value: -345},
	{key: 'EE', value: -37},
	{key: 'FI', value: -376},
	{key: 'FR', value: -346},
	{key: 'GE', value: -17},
	{key: 'DE', value: -567},
	{key: 'GR', value: -47},
	{key: 'HU', value: -23},
	{key: 'IS', value: -578},
	{key: 'IE', value: -24},
	{key: 'IT', value: -6},
	{key: 'KZ', value: -5},
	{key: 'LV', value: -58},
	{key: 'LI', value: -5},
	{key: 'LT', value: -69},
	{key: 'LU', value: -23},
	{key: 'MT', value: -36},
	{key: 'MD', value: -57},
	{key: 'MC', value: -69},
	{key: 'ME', value: -223},
	{key: 'NL', value: -35},
	{key: 'MK', value: -57},
	{key: 'NO', value: -79},
	{key: 'PL', value: -12},
	{key: 'PT', value: -46},
	{key: 'RO', value: -37},
	{key: 'RU', value: -678},
	{key: 'SM', value: -345},
	{key: 'RS', value: -67},
	{key: 'SK', value: -23},
	{key: 'SI', value: -567},
	{key: 'ES', value: -23},
	{key: 'SE', value: -768},
	{key: 'CH', value: -56},
	{key: 'TR', value: -78},
	{key: 'UA', value: -2},
	{key: 'GB', value: -56}
].sort((a, b) => a.value - b.value);

export const countryKeyValueMixedWithZeroes = [
	{key: 'AL', value: 112},
	{key: 'AD', value: -234},
	{key: 'AM', value: 36},
	{key: 'AT', value: 357},
	{key: 'AZ', value: -123},
	{key: 'BY', value: 56},
	{key: 'BE', value: 15},
	{key: 'BA', value: 0},
	{key: 'BG', value: 568},
	{key: 'HR', value: -213},
	{key: 'CY', value: 456},
	{key: 'CZ', value: 21},
	{key: 'DK', value: -345},
	{key: 'EE', value: 37},
	{key: 'FI', value: 376},
	{key: 'FR', value: 346},
	{key: 'GE', value: 17},
	{key: 'DE', value: 567},
	{key: 'GR', value: 47},
	{key: 'HU', value: -23},
	{key: 'IS', value: 578},
	{key: 'IE', value: 24},
	{key: 'IT', value: 6},
	{key: 'KZ', value: 0},
	{key: 'LV', value: -58},
	{key: 'LI', value: 5},
	{key: 'LT', value: 69},
	{key: 'LU', value: 23},
	{key: 'MT', value: 36},
	{key: 'MD', value: -57},
	{key: 'MC', value: 69},
	{key: 'ME', value: 223},
	{key: 'NL', value: 35},
	{key: 'MK', value: -57},
	{key: 'NO', value: 79},
	{key: 'PL', value: 12},
	{key: 'PT', value: -46},
	{key: 'RO', value: 37},
	{key: 'RU', value: 678},
	{key: 'SM', value: -345},
	{key: 'RS', value: 67},
	{key: 'SK', value: 23},
	{key: 'SI', value: 567},
	{key: 'ES', value: 23},
	{key: 'SE', value: 768},
	{key: 'CH', value: 56},
	{key: 'TR', value: 78},
	{key: 'UA', value: 2},
	{key: 'GB', value: 56}
].sort((a, b) => b.value - a.value);

export const countryKeyValueNegativesWithZeroes = [
	{key: 'AL', value: -112},
	{key: 'AD', value: -234},
	{key: 'AM', value: -36},
	{key: 'AT', value: -357},
	{key: 'AZ', value: -123},
	{key: 'BY', value: -56},
	{key: 'BE', value: -15},
	{key: 'BA', value: -12},
	{key: 'BG', value: -568},
	{key: 'HR', value: -213},
	{key: 'CY', value: -456},
	{key: 'CZ', value: -21},
	{key: 'DK', value: -345},
	{key: 'EE', value: -37},
	{key: 'FI', value: -376},
	{key: 'FR', value: -346},
	{key: 'GE', value: -17},
	{key: 'DE', value: -567},
	{key: 'GR', value: -47},
	{key: 'HU', value: -23},
	{key: 'IS', value: -578},
	{key: 'IE', value: -24},
	{key: 'IT', value: -6},
	{key: 'KZ', value: 0},
	{key: 'LV', value: -58},
	{key: 'LI', value: -5},
	{key: 'LT', value: -69},
	{key: 'LU', value: -23},
	{key: 'MT', value: -36},
	{key: 'MD', value: -57},
	{key: 'MC', value: -69},
	{key: 'ME', value: -223},
	{key: 'NL', value: -35},
	{key: 'MK', value: -57},
	{key: 'NO', value: -79},
	{key: 'PL', value: -12},
	{key: 'PT', value: -46},
	{key: 'RO', value: -37},
	{key: 'RU', value: -678},
	{key: 'SM', value: -345},
	{key: 'RS', value: -67},
	{key: 'SK', value: -23},
	{key: 'SI', value: -567},
	{key: 'ES', value: -23},
	{key: 'SE', value: -768},
	{key: 'CH', value: -56},
	{key: 'TR', value: -78},
	{key: 'UA', value: 0},
	{key: 'GB', value: -56}
].sort((a, b) => a.value - b.value);

export const countryKeyValueAlt = [
	{key: 'AL', value: 113},
	{key: 'AD', value: 193},
	{key: 'AM', value: 66},
	{key: 'AT', value: 923},
	{key: 'AZ', value: 8},
	{key: 'BY', value: 122},
	{key: 'BE', value: 6},
	{key: 'BA', value: 29},
	{key: 'BG', value: 272},
	{key: 'HR', value: 300},
	{key: 'CY', value: 585},
	{key: 'CZ', value: 31},
	{key: 'DK', value: 406},
	{key: 'EE', value: 46},
	{key: 'FI', value: 1097},
	{key: 'FR', value: 611},
	{key: 'GE', value: 48},
	{key: 'DE', value: 30},
	{key: 'GR', value: 37},
	{key: 'HU', value: 11},
	{key: 'IS', value: 432},
	{key: 'IE', value: 52},
	{key: 'IT', value: 11},
	{key: 'KZ', value: 12},
	{key: 'LV', value: 128},
	{key: 'LI', value: 2},
	{key: 'LT', value: 129},
	{key: 'LU', value: 26},
	{key: 'MT', value: 61},
	{key: 'MD', value: 18},
	{key: 'MC', value: 84},
	{key: 'ME', value: 188},
	{key: 'NL', value: 18},
	{key: 'MK', value: 100},
	{key: 'NO', value: 50},
	{key: 'PL', value: 32},
	{key: 'PT', value: 89},
	{key: 'RO', value: 31},
	{key: 'RU', value: 303},
	{key: 'SM', value: 907},
	{key: 'RS', value: 113},
	{key: 'SK', value: 48},
	{key: 'SI', value: 1272},
	{key: 'ES', value: 6},
	{key: 'SE', value: 291},
	{key: 'CH', value: 16},
	{key: 'TR', value: 16},
	{key: 'UA', value: 1},
	// {key: 'GB', value: 92}
];

export const countryKeyRawValue = [
	{key: 'AL', rawValue: 112},
	{key: 'AD', rawValue: 234},
	{key: 'AM', rawValue: 36},
	{key: 'AT', rawValue: 357},
	{key: 'AZ', rawValue: 123},
	{key: 'BY', rawValue: 56},
	{key: 'BE', rawValue: 15},
	{key: 'BA', rawValue: 12},
	{key: 'BG', rawValue: 568},
	{key: 'HR', rawValue: 213},
	{key: 'CY', rawValue: 456},
	{key: 'CZ', rawValue: 21},
	{key: 'DK', rawValue: 345},
	{key: 'EE', rawValue: 37},
	{key: 'FI', rawValue: 376},
	{key: 'FR', rawValue: 346},
	{key: 'GE', rawValue: 17},
	{key: 'DE', rawValue: 567},
	{key: 'GR', rawValue: 47},
	{key: 'HU', rawValue: 23},
	{key: 'IS', rawValue: 578},
	{key: 'IE', rawValue: 24},
	{key: 'IT', rawValue: 6},
	{key: 'KZ', rawValue: 5},
	{key: 'LV', rawValue: 58},
	{key: 'LI', rawValue: 5},
	{key: 'LT', rawValue: 69},
	{key: 'LU', rawValue: 23},
	{key: 'MT', rawValue: 36},
	{key: 'MD', rawValue: 57},
	{key: 'MC', rawValue: 69},
	{key: 'ME', rawValue: 223},
	{key: 'NL', rawValue: 35},
	{key: 'MK', rawValue: 57},
	{key: 'NO', rawValue: 79},
	{key: 'PL', rawValue: 12},
	{key: 'PT', rawValue: 46},
	{key: 'RO', rawValue: 37},
	{key: 'RU', rawValue: 678},
	{key: 'SM', rawValue: 345},
	{key: 'RS', rawValue: 67},
	{key: 'SK', rawValue: 23},
	{key: 'SI', rawValue: 567},
	{key: 'ES', rawValue: 23},
	{key: 'SE', rawValue: 768},
	{key: 'CH', rawValue: 56},
	{key: 'TR', rawValue: 78},
	{key: 'UA', rawValue: 2},
	{key: 'GB', rawValue: 56}
];

const keyToColorWorldFull = {
	AL: 'antiquewhite',
	AD: 'aqua',
	AM: 'blue',
	AT: 'blueviolet',
	AZ: 'chartreuse',
	BY: 'rgb(255, 69, 0)',
	BE: 'brown',
	BA: 'aquamarine',
	BG: 'rgb(128, 128, 0)',
	HR: 'cadetblue',
	CY: 'deepskyblue',
	CZ: 'gold',
	DK: 'chocolate',
	EE: 'cornflowerblue',
	FI: 'dimgray',
	FR: 'firebrick',
	GE: 'rgb( 65, 105, 225)',
	DE: 'greenyellow',
	GR: 'darkgoldenrod',
	HU: 'darkmagenta',
	IS: 'dodgerblue',
	IE: 'crimson',
	IT: 'darkcyan',
	KZ: 'darkblue',
	LV: 'darkturquoise',
	LI: 'coral',
	LT: 'darkkhaki',
	LU: 'lightsalmon',
	MT: 'darkorchid',
	MD: 'darkolivegreen',
	MC: 'darkslategray',
	ME: 'darkslateblue',
	NL: 'rgb(216, 191, 216)',
	MK: 'tomato',
	NO: 'darksalmon',
	PL: 'rgb(238, 130, 238)',
	PT: 'darkred',
	RO: 'red',
	RU: 'green',
	SM: 'rgb(188, 143, 143)',
	RS: 'darkorange',
	SK: 'rgb( 0, 0, 128)',
	SI: 'darkseagreen',
	ES: 'lightblue',
	SE: 'mediumseagreen',
	CH: 'rgb(255, 255, 0)',
	TR: 'yellowgreen',
	UA: 'rgb(152, 251, 152)',
	GB: 'rgb(128, 0, 128)'
}

// keep these 2 commented for the `keyToColorWorld` example to show 2 black bars.
export const keyToColorWorld = _.skipIn(keyToColorWorldFull, ['AL', 'AD']);

export const keyToColorWorldShort = {
	AM: 'blue',
	AT: 'blueviolet',
	AZ: 'chartreuse',
	BY: 'rgb(255, 69, 0)',
	BE: 'brown',
	BA: 'aquamarine',
	BG: 'rgb(128, 128, 0)',
}

const keyToColorWorldFullKeys = _.keys(keyToColorWorldFull);

const hueScale =
	scaleLinear()
	.domain([0, keyToColorWorldFullKeys.length])
	.range([0, 300]);

export const keyToColorWorldFn =
	scaleOrdinal()
	.domain(keyToColorWorldFullKeys)
	.range(keyToColorWorldFullKeys.map((k, i) => hsl(hueScale(i), 0.5, 0.5).toString()));

export const keyToColorUK2016 = {
	UK: 'cornsilk',
	UKC: 'antiquewhite',
	UKC1: 'aqua',
	UKC11: 'aquamarine',
	UKC12: 'azure',
	UKC13: 'beige',
	UKC14: 'bisque',
	UKC2: 'black',
	UKC21: 'blanchedalmond',
	UKC22: 'blue',
	UKC23: 'blueviolet',
	UKD: 'brown',
	UKD1: 'burlywood',
	UKD11: 'cadetblue',
	UKD12: 'chartreuse',
	UKD3: 'chocolate',
	UKD33: 'coral',
	UKD34: 'cornflowerblue',
	UKD35: 'cornsilk',
	UKD36: 'crimson',
	UKD37: 'cyan',
	UKD4: 'darkblue',
	UKD41: 'darkcyan',
	UKD42: 'darkgoldenrod',
	UKD44: 'darkgray',
	UKD45: 'darkgreen',
	UKD46: 'darkgrey',
	UKD47: 'darkkhaki',
	UKD6: 'darkmagenta',
	UKD61: 'darkolivegreen',
	UKD62: 'darkorange',
	UKD63: 'darkorchid',
	UKD7: 'darkred',
	UKD71: 'darksalmon',
	UKD72: 'darkseagreen',
	UKD73: 'darkslateblue',
	UKD74: 'darkslategray',
	UKE: 'darkslategrey',
	UKE1: 'darkturquoise',
	UKE11: 'darkviolet',
	UKE12: 'deeppink',
	UKE13: 'deepskyblue',
	UKE2: 'dimgray',
	UKE21: 'dimgrey',
	UKE22: 'dodgerblue',
	UKE3: 'firebrick',
	UKE31: 'floralwhite',
	UKE32: 'forestgreen',
	UKE4: 'fuchsia',
	UKE41: 'gainsboro',
	UKE42: 'ghostwhite',
	UKE44: 'gold',
	UKE45: 'goldenrod',
	UKF: 'gray',
	UKF1: 'grey',
	UKF11: 'green',
	UKF12: 'greenyellow',
	UKF13: 'honeydew',
	UKF14: 'hotpink',
	UKF15: 'indianred',
	UKF16: 'indigo',
	UKF2: 'ivory',
	UKF21: 'khaki',
	UKF22: 'lavender',
	UKF24: 'lavenderblush',
	UKF25: 'lawngreen',
	UKF3: 'lemonchiffon',
	UKF30: 'lightblue',
	UKG: 'lightcoral',
	UKG1: 'lightcyan',
	UKG11: 'lightgoldenrodyellow',
	UKG12: 'lightgray',
	UKG13: 'lightgreen',
	UKG2: 'lightgrey',
	UKG21: 'lightpink',
	UKG22: 'lightsalmon',
	UKG23: 'lightseagreen',
	UKG24: 'lightskyblue',
	UKG3: 'lightslategray',
	UKG31: 'lightslategrey',
	UKG32: 'lightsteelblue',
	UKG33: 'lightyellow',
	UKG36: 'lime',
	UKG37: 'limegreen',
	UKG38: 'linen',
	UKG39: 'magenta',
	UKH: 'maroon',
	UKH1: 'mediumaquamarine',
	UKH11: 'mediumblue',
	UKH12: 'mediumorchid',
	UKH14: 'mediumpurple',
	UKH15: 'mediumseagreen',
	UKH16: 'mediumslateblue',
	UKH17: 'mediumspringgreen',
	UKH2: 'mediumturquoise',
	UKH21: 'mediumvioletred',
	UKH23: 'midnightblue',
	UKH24: 'mintcream',
	UKH25: 'mistyrose',
	UKH3: 'moccasin',
	UKH31: 'navajowhite',
	UKH32: 'navy',
	UKH34: 'oldlace',
	UKH35: 'olive',
	UKH36: 'olivedrab',
	UKH37: 'orange',
	UKI: 'orangered',
	UKI3: 'orchid',
	UKI31: 'palegoldenrod',
	UKI32: 'palegreen',
	UKI33: 'paleturquoise',
	UKI34: 'palevioletred',
	UKI4: 'papayawhip',
	UKI41: 'peachpuff',
	UKI42: 'peru',
	UKI43: 'pink',
	UKI44: 'plum',
	UKI45: 'powderblue',
	UKI5: 'purple',
	UKI51: 'red',
	UKI52: 'rosybrown',
	UKI53: 'royalblue',
	UKI54: 'saddlebrown',
	UKI6: 'salmon',
	UKI61: 'sandybrown',
	UKI62: 'seagreen',
	UKI63: 'seashell',
	UKI7: 'sienna',
	UKI71: 'silver',
	UKI72: 'skyblue',
	UKI73: 'slateblue',
	UKI74: 'slategray',
	UKI75: 'slategrey',
	UKJ: 'snow',
	UKJ1: 'springgreen',
	UKJ11: 'steelblue',
	UKJ12: 'tan',
	UKJ13: 'teal',
	UKJ14: 'thistle',
	UKJ2: 'tomato',
	UKJ21: 'turquoise',
	UKJ22: 'violet',
	UKJ25: 'wheat',
	UKJ26: 'white',
	UKJ27: 'whitesmoke',
	UKJ28: 'yellow',
	UKJ3: 'yellowgreen',
	UKJ31: 'aliceblue',
	UKJ32: 'antiquewhite',
	UKJ34: 'aqua',
	UKJ35: 'aquamarine',
	UKJ36: 'azure',
	UKJ37: 'beige',
	UKJ4: 'bisque',
	UKJ41: 'black',
	UKJ43: 'blanchedalmond',
	UKJ44: 'blue',
	UKJ45: 'blueviolet',
	UKJ46: 'brown',
	UKK: 'burlywood',
	UKK1: 'cadetblue',
	UKK11: 'chartreuse',
	UKK12: 'chocolate',
	UKK13: 'coral',
	UKK14: 'cornflowerblue',
	UKK15: 'cornsilk',
	UKK2: 'crimson',
	UKK21: 'cyan',
	UKK22: 'darkblue',
	UKK23: 'darkcyan',
	UKK3: 'darkgoldenrod',
	UKK30: 'darkgray',
	UKK4: 'darkgreen',
	UKK41: 'darkgrey',
	UKK42: 'darkkhaki',
	UKK43: 'darkmagenta',
	UKL: 'darkolivegreen',
	UKL1: 'darkorange',
	UKL11: 'darkorchid',
	UKL12: 'darkred',
	UKL13: 'darksalmon',
	UKL14: 'darkseagreen',
	UKL15: 'darkslateblue',
	UKL16: 'darkslategray',
	UKL17: 'darkslategrey',
	UKL18: 'darkturquoise',
	UKL2: 'darkviolet',
	UKL21: 'deeppink',
	UKL22: 'deepskyblue',
	UKL23: 'dimgray',
	UKL24: 'dimgrey',
	UKM: 'dodgerblue',
	UKM5: 'firebrick',
	UKM50: 'floralwhite',
	UKM6: 'forestgreen',
	UKM61: 'fuchsia',
	UKM62: 'gainsboro',
	UKM63: 'ghostwhite',
	UKM64: 'gold',
	UKM65: 'goldenrod',
	UKM66: 'gray',
	UKM7: 'grey',
	UKM71: 'green',
	UKM72: 'greenyellow',
	UKM73: 'honeydew',
	UKM75: 'hotpink',
	UKM76: 'indianred',
	UKM77: 'indigo',
	UKM78: 'ivory',
	UKM8: 'khaki',
	UKM81: 'lavender',
	UKM82: 'lavenderblush',
	UKM83: 'lawngreen',
	UKM84: 'lemonchiffon',
	UKM9: 'lightblue',
	UKM91: 'lightcoral',
	UKM92: 'lightcyan',
	UKM93: 'lightgoldenrodyellow',
	UKM94: 'lightgray',
	UKM95: 'lightgreen',
	UKN: 'lightgrey',
	UKN0: 'lightpink',
	UKN06: 'lightsalmon',
	UKN07: 'lightseagreen',
	UKN08: 'lightskyblue',
	UKN09: 'lightslategray',
	UKN10: 'lightslategrey',
	UKN11: 'lightsteelblue',
	UKN12: 'lightyellow',
	UKN13: 'lime',
	UKN14: 'limegreen',
	UKN15: 'linen',
	UKN16: 'magenta'
}

export const keyToLabel = {
	AL: 'Albania',
	AD: 'Andorra',
	AM: 'Armenia',
	AT: 'Austria',
	AZ: 'Azerbaijan',
	BY: 'Belarus',
	BE: 'Belgium',
	BA: 'Bosnia and Herzegovina',
	BG: 'Bulgaria',
	HR: 'Croatia',
	CY: 'Cyprus',
	CZ: 'Czechia',
	DK: 'Denmark',
	EE: 'Estonia',
	FI: 'Finland',
	FR: 'France',
	GE: 'Georgia',
	DE: 'Germany',
	GR: 'Greece',
	HU: 'Hungary',
	IS: 'Iceland',
	IE: 'Ireland',
	IT: 'Italy',
	KZ: 'Kazakhstan',
	LV: 'Latvia',
	LI: 'Liechtenstein',
	LT: 'Lithuania',
	LU: 'Luxembourg',
	MT: 'Malta',
	MD: 'Moldova',
	MC: 'Monaco',
	ME: 'Montenegro',
	NL: 'Netherlands',
	MK: 'North Macedonia (formerly Macedonia)',
	NO: 'Norway',
	PL: 'Poland',
	PT: 'Portugal',
	RO: 'Romania',
	RU: 'Russian Federation',
	SM: 'San Marino',
	RS: 'Serbia',
	SK: 'Slovakia',
	SI: 'Slovenia',
	ES: 'Spain',
	SE: 'Sweden',
	CH: 'Switzerland',
	TR: 'Turkey',
	UA: 'Ukraine',
	GB: 'United Kingdom (UK)',
}
