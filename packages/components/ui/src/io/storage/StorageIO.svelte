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

		const updateStore = newValue => {
			// Current value in storage may be newer than value from event.
			newValue = database.getValue(key) || defaultValue;
			_store.set(newValue);
		};
		const updateDb = newValue => {
			if (isEqual(defaultValue, newValue)) {
				database.deleteValue(key);
			} else {
				database.setValue(key, newValue);
			}
		}

		// No infinite loops as both `storage` and `_store`
		// don't fire if the new and old values are the same.
		database.addListener?.(key, updateStore);
		_store.subscribe(updateDb);

		return () => {
			database.removeListener?.(key, setValue);
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
