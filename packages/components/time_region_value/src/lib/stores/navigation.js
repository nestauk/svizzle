import * as _ from 'lamb';
import {derived, writable} from 'svelte/store';

import {_isSmallScreen} from '../stores/layout';
import {makeClasses} from '../utils/style';

// utils

const activate = id => _.mapValuesWith((value, key) => key === id);

// views

export const defaultViews = {
	barchart: false,
	distribution: true,
	info: false,
	map: false,
	settings: false,
	sidebar: false,
	trends: false,
}
export const _views = writable(defaultViews);
export const showView = id => _views.update(activate(id));

export const _viewsClasses = derived(_views, makeClasses);

// routes

export const defaultRoutes = {
	Id: false,
	IdYear: false,
	Index: true,
}
export const _routes = writable(defaultRoutes);
export const setRoute = id => _routes.update(activate(id));

// timeline visibility

export const _isTimelineHidden = derived(
	[_isSmallScreen, _views],
	([isSmall, views]) => isSmall && (views.info || views.settings)
);

// flags

export const defaultFlags = {
	showPOIs: false,
}
export const _navFlags = writable(defaultFlags);
export const setNavFlags = flags => _navFlags.set(flags);

// hrefBase

export const _hrefBase = writable('');
export const setHrefBase = href => _hrefBase.set(href);
