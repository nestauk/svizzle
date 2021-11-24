# Svelte actions

## resizeObserver

This action can track an element's dimensions more reliably than Svelte's
`innerHeight`/`innerWidth` binding mechanisms which sometimes fail due to
unfixed bugs and implementation differences in browsers and operating systems.

### Usage

```svelte
<script>
	import {setupResizeObserver} from '../../actions/resizeObserver';
   	const {_writable: _elementSize, resizeObserver} = setupResizeObserver();

	$: console.log($_elementSize);
</script>

<p use:resizeObserver>
	Some text content.
</p>
```

The action can also receive a configuration string with values `borderBoxSize`
or `contentBoxSize` to specify which dimensions to retrieve. The default value
is `borderBoxSize`.

```svelte
<p use:resizeObserver='contentBoxSize'>
	Some text content.
</p>
```
