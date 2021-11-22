<script context='module'>
	import {
		cookieStorage,
		indexedDBStorage,
		localStorage,
		noopStorage,
		sessionStorage,
	} from "@macfja/svelte-persistent-store";
	import isEqual from 'just-compare';

	const dbFactories = {
		cookie: () => cookieStorage(),
		indexedDB: () => indexedDBStorage(),
		localStorage: isReactive => localStorage(isReactive),
		noop: () => noopStorage(),
		sessionStorage: isReactive => sessionStorage(isReactive),
	};

	const bind = ({_store, defaultValue, isReactive, key, type}) => {
		const database = dbFactories[type](isReactive);
		const initialValue = database.getValue(key) || defaultValue;
		_store.set(initialValue);

		const syncStore = () => {
			const currentValue = database.getValue(key) || defaultValue;
			_store.set(currentValue);
		};
		const updateDb = newValue => {
			if (isEqual(defaultValue, newValue)) {
				database.deleteValue(key);
			} else {
				database.setValue(key, newValue);
			}
		}

		// When we update the store, we also update the database
		_store.subscribe(updateDb);

		// When the database changes, we sync the store
		// e.g. you can edit `localStorage` in dev tools and expect the UI to
		// update because it's bound to the store.
		database.addListener?.(key, syncStore);

		return () => {
			database.removeListener?.(key, syncStore);
		};
	};
</script>

<script>
	export let _store = writable();
	export let defaultValue = null;
	export let isReactive = false;
	export let key = null;
	export let type = 'noop';

	let unbind;

	$: if (!(type in dbFactories)) type = 'noop';
	$: if (key && type && _store) {
		unbind?.();
		unbind = bind({_store, defaultValue, isReactive, key, type});
	} 
</script>
