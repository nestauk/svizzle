import {writable} from 'svelte/store';

export const _selectedYear = writable();
export const setSelectedYear = year => _selectedYear.set(Number(year));
export const resetSelectedYear = () => _selectedYear.set();
