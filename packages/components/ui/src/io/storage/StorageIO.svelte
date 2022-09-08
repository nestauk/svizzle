<script context='module'>
	let dbFactories;
	let bind;
</script>

<script>
	import isEqual from 'just-compare';
	import {onMount} from 'svelte';
	import {writable} from 'svelte/store';

	import {isClientSide} from '../../utils/env.js';

	export let _store = writable();
	export let defaultValue = null;
	export let isReactive = false;
	export let key = null;
	export let type = 'noop';

	let isLoaded = false;
	let unbind;

	onMount(async () => {
		const {
			createCookieStorage,
			createIndexedDBStorage,
			createLocalStorage,
			createNoopStorage,
			createSessionStorage,
		} = await import('@macfja/svelte-persistent-store');

		if (!dbFactories) {
			dbFactories = {
				cookie: () => createCookieStorage(),
				indexedDB: () => createIndexedDBStorage(),
				localStorage: pIsReactive => createLocalStorage(pIsReactive),
				noop: () => createNoopStorage(),
				sessionStorage: pIsReactive => createSessionStorage(pIsReactive),
			};
		}

		if (!bind) {
			bind = ({_store, defaultValue, isReactive, key, type}) => {
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

		}
		isLoaded = true;
	});

	$: if (isLoaded && !(type in dbFactories)) {
		type = 'noop';
	}
	$: if (isLoaded && isClientSide && key && type && _store) {
		unbind?.();
		unbind = bind({_store, defaultValue, isReactive, key, type});
	}
</script>
