# StorageIO component

This component enables data storage on the client in a declarative way. It
supports storing data in cookies, `localStorage`, `sessionStorage` and
`indexedDB`.

## Usage

Instantiate the component 

### Render `<StorageIO/>`

```svelte
<script>
	import {writable} from 'svelte/store';
	import StorageIO from '@svizzle/ui/src/io/storage/StorageIO.svelte';

	const _someStore = writable();
</script>

<StorageIO
	_store={_someStore}
	defaultValue={'default value'}
	isReactive={true}
	key='someKey'
	type='localStorage'
/>
```

Props:

- `_store`: the store to bind to the chosen client storage mechanism. Default value is an empty store.
- `defaultValue`: The default value to use if nothing is stored. Default value is `null`.
- `isReactive`: If `true` update the store when the underlying storage method changes. Doesn't work with cookies. Default value is `false`.
- `key`: The lookup key for the value. Required.
- `type`: One of the following: `cookie`, `indexedDB`, `localStorage`, `noop` or `sessionStorage`. Default value is `noop`.
