import * as _ from 'lamb';
import {derived, writable} from 'svelte/store';

// lib/utils
import {makeClasses} from '../utils/style.js';

// lib/stores
import {_isSmallScreen} from './layout.js';

/* utils */

const activate = id => _.mapValuesWith((value, key) => key === id);

/* views */

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

/* routes */

export const defaultRoutes = {
	Id: false,
	IdYear: false,
	Index: true,
}
export const _routes = writable(defaultRoutes);
export const setRoute = id => _routes.update(activate(id));

/* timeline visibility */

export const _isTimelineHidden = derived(
	[_isSmallScreen, _views],
	([isSmall, views]) => isSmall && (views.info || views.settings)
);

/* flags */

export const _navFlags = writable({showPOIs: false});

/* hrefBase */

export const _hrefBase = writable('');
