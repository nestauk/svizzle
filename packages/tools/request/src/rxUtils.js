import {combineLatest} from 'rxjs';
import {map, debounceTime} from 'rxjs/operators';

export const derive = (observables, fn) => combineLatest(...observables)
.pipe(
	debounceTime(0),
	map(fn)
);

/*
const derive2 = (main, observables, fn) => main
.pipe(
	combineLatestWith(...observables),
	debounceTime(0),
	map(fn)
)
*/
