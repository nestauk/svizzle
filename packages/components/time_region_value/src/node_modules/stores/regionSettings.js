import * as _ from 'lamb';
import {derived, writable} from 'svelte/store';

export const _regionSettings = writable({});

/* levels */

export const _availableLevels = derived(_regionSettings, _.getKey('levels'));
export const _firstAvailableLevel = derived(_availableLevels, _.getAt(0));
