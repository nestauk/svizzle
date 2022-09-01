import * as _ from 'lamb';
import {derived, get, writable} from 'svelte/store';

import {
	createFontFaces,
	isFamilyEqualTo,
	loadFontFaces
} from './utils.js';

// main stores
export const _firstFamilyToLoad = writable();
export const _fontsInfo = writable([]);
export const _status = writable({
	isFirstLoaded: false,
	isDone: false
});

// deriveds
export const _runtimeFonts = derived(
	[_firstFamilyToLoad, _fontsInfo],
	([firstFamilyToLoad, fontsInfo]) => {
		const isFirstFamily = isFamilyEqualTo(firstFamilyToLoad);

		const createFonts = _.pipe([
			_.partitionWith(isFirstFamily),
			_.mapWith(_.mapWith(createFontFaces))
		]);

		return createFonts(fontsInfo)
	}
);

// functions with side effects
export const loadFonts = async ([firstFonts, otherFonts]) => {
	if (!get(_status).isDone) {
		await Promise.all(firstFonts.map(loadFontFaces));
		_status.set({
			isFirstLoaded: true,
			isDone: false
		});

		await Promise.all(otherFonts.map(loadFontFaces));
		_status.set({
			isFirstLoaded: true,
			isDone: true
		});
	}
};
