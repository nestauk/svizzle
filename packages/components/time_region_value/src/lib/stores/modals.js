import {negate, transformValues} from '@svizzle/utils';
import {writable} from 'svelte/store';

// modal utils

const hidden = {isVisible: false};
const toggleIsVisible = transformValues({isVisible: negate});

/* geo modal */

export const _geoModal = writable(hidden);
export const hideGeoModal = () => _geoModal.set(hidden);
export const toggleGeoModal = () => _geoModal.update(toggleIsVisible);

/* info modal */

export const _infoModal = writable(hidden);
export const hideInfoModal = () => _infoModal.set(hidden);
export const toggleInfoModal = () => _infoModal.update(toggleIsVisible);
