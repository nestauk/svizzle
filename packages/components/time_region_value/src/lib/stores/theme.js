import {makeStyleVars} from '@svizzle/dom';
import {mergeObj} from '@svizzle/utils';
import {schemeGnBu, schemeRdYlBu} from 'd3-scale-chromatic';
import * as _ from 'lamb';
import {derived, writable} from 'svelte/store';

const colorLightgrey = 'lightgrey';

export const defaultTheme = {
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
		colors: schemeRdYlBu[8],
		label: 'Red-Blue',
	}, {
		colors: _.tail(schemeGnBu[9]),
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
}

export const _theme = writable(defaultTheme);

export const customizeTheme = theme => _theme.update(mergeObj(theme));

export const _style = derived(_theme, _.pipe([
	_.skip(['colorSchemes']),
	makeStyleVars
]));
