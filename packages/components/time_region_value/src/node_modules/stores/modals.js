import {writable} from 'svelte/store';
import {negate, transformValues} from '@svizzle/utils';

// modal utils

const hidden = {isVisible: false};
const toggleIsVisible = transformValues({isVisible: negate});

/* geo modal */

export const _geoModal = writable(hidden);
export const hideGeoModal = () => _geoModal.set(hidden);
export const toggleGeoModal = () => _geoModal.update(toggleIsVisible);

// selection mode

export const _doFilterRegions = writable(false);

/* info modal */

export const _infoModal = writable(hidden);
export const hideInfoModal = () => _infoModal.set(hidden);
export const toggleInfoModal = () => _infoModal.update(toggleIsVisible);
