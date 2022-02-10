import {get, readable, writable} from 'svelte/store';

export const rxToReadable = observable => readable(
	observable.getValue?.(),
	set => {
		const subscription = observable.subscribe(value => set(value));

		return () => subscription.unsubscribe();
	}
);

export const rxToWritable = observable => {
	const store = writable(
		observable.getValue?.(),
		set => {
			const subscription = observable.subscribe(
				value => value !== get(store) && set(value)
			);

			return () => subscription.unsubscribe();
		}
	);
	store.subscribe(value => observable.next(value));

	return store;
}
