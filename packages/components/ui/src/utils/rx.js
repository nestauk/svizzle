import {get, readable, writable} from 'svelte/store';

export const rxStreamToSvReadable = rxStream => readable(
	rxStream.getValue?.(),
	set => {
		const subscription = rxStream.subscribe(value => set(value));

		return () => subscription.unsubscribe();
	}
);

export const rxStreamToSvWritable = rxStream => {
	const store = writable(
		rxStream.getValue?.(),
		set => {
			const subscription = rxStream.subscribe(
				value => value !== get(store) && set(value)
			);

			return () => subscription.unsubscribe();
		}
	);
	store.subscribe(value => rxStream.next(value));

	return store;
}
