# Screen Gauge Component

You can use this component to measure screen features reactively.

## `screen` store

This component exports a store like the below:

```js
{
	classes: 'small medium large xLarge',
	display: {
		aspectRatio: 1.1550632911392404,
		height: 948,
		orientation: {
			angle: 0,
			onchange: null,
			type: 'landscape-primary'
			__proto__: ScreenOrientation
		},
		pixelRatio: 2,
		width: 1095,
	},
	glyph: {
		height: 24,
		width: 8.865384615384615,
	},
	orientationFlags: {
		landscape: true,
		portrait: false,
	},
	sizeFlags: {
		large: true,
		medium: true,
		small: true,
		xLarge: true,
		xSmall: false,
	},
	text: {
		height: 39.5,
		width: 123.51409978308027
	}
}
```

In particular, `sizeFlags` and `classes` allow for progressive enhancements starting from `small` as default.

## Usage

### Render `<ScreenGauge/>`

In a component of your app, instantiate this gauge.
In a Sapper app this would usually be a `_layout.svelte` file.

```svelte
<script>
	import ScreenGauge from '@svizzle/ui/src/gauges/ScreenGauge.svelte';

	const isDev = process.env.NODE_ENV === 'development';
</script>

<ScreenGauge
	{isDev}
	bands={[60, 82, 100, 120]}
/>
```

Props:
- `breakpoints`: an array of 4 numbers defining as the amount of chars filling the width of a device at a specific breakpoint. E.g.:
```
       60     82       100     120
xsmall | small | medium | large | xLarge
```
- `fontSize`: passing a string accepted by `font-size` sets the font size of the sample text;
- `isDev`: if this is `true`, render a fixed `div` with some display features:
	- Classes: the valid class names among `xsmall`, `small`, `medium`, `large`, `xLarge`
	- Display size: display width by display height
	- DPPR: the display pixel ratio
	- Orientation: one of `landscape` or `portrait`
	- Text: max amount of chars by max amount of lines we can fit in the current display with the current font and font size;
- `sampleText`: this component renders a hidden text to measure the average width or the current font; by default this text is the English alphabet (lowercase and upppercase) but you can pass a string of your choice, especially useful for other languages;


### Use `screen`

In other components of your app, `import` the `screen` store from `ScreenGauge.svelte` and use as you see fit.

```svelte
<script>
	import {screen} from '@svizzle/ui/src/gauges/ScreenGauge.svelte';

	console.log($screen);
</script>

{#if $screen.size.medium && $screen.orientation.landscape}
	<p>Medium (landscape)</p>
{/if}
/>
```
