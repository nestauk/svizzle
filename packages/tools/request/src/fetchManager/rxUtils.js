import {combineLatestWith} from 'rxjs';
import {map, debounceTime, share} from 'rxjs/operators';

export const derive = ([first, ...rest], fn) =>
	first.pipe(
		combineLatestWith(...rest),
		debounceTime(0),
		map(fn),
		share()
	);
