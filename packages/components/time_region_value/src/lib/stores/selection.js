import {writable} from 'svelte/store';

export const _selectedYear = writable();
export const resetSelectedYear = () => _selectedYear.set();

export const _availableYears = writable([]);

export const resetSelection = () => {
	_availableYears.set([]);
	resetSelectedYear();
};
