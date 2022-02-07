import {combineLatest} from 'rxjs';
import {map, debounceTime, share} from 'rxjs/operators';

export const derive = (observables, fn) =>
	combineLatest(...observables)
	.pipe(
		debounceTime(0),
		map(fn),
		share()
	);

/*
const derive2 = (main, observables, fn) => main
.pipe(
	combineLatestWith(...observables),
	debounceTime(0),
	map(fn)
)
*/
