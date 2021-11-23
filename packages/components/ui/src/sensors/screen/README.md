# ScreenSensor Component

You can use this component to measure screen features reactively.

## `_screen` store

This component exports a store like the below:

```js
{
	classes: 'small medium large xLarge portrait',
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
	orientations: {
		landscape: true,
		portrait: false,
	},
	sizes: {
		large: true,
		medium: true,
		small: true,
		xLarge: true,
		xSmall: false,
	},
	text: {
		maxChars: 123,
		maxLines: 39,
	}
}
```

In particular, `sizes` and `classes` allow for progressive enhancements starting from `small` as default.

## Usage

### Render `<ScreenSensor />`

In a component of your app, instantiate this sensor.
In a Sapper app this would usually be a `_layout.svelte` file.

```svelte
<script>
	import ScreenSensor from '@svizzle/ui/src/sensors/ScreenSensor.svelte';

	const isDev = process.env.NODE_ENV === 'development';
	const fontSize = '16px';
</script>

<ScreenSensor
	{fontSize}
	{isDev}
	breakpoints={[60, 82, 100, 120]}
/>
```

Props:
- `breakpoints`: an array of 4 numbers defining the amount of chars filling the width of a device at a specific breakpoint. If you don't pass it, it will use the default breakpoints, `[45, 90, 135, 180]`;
- `fontSize`: passing a string accepted by `font-size` sets the font size of the sample text;
- `isDev`: if this is `true`, render a fixed `div` with some display features:
	- Classes: the valid class names among `xsmall`, `small`, `medium`, `large`, `xLarge`
	- Display size: display width by display height
	- DPPR: the display pixel ratio
	- Orientation: one of `landscape` or `portrait`
	- Text: max amount of chars by max amount of lines we can fit in the current display with the current font and font size;
- `sampleText`: this component renders a hidden text to measure the average width of the current font; by default this text is the English alphabet (lowercase and uppercase) but you can pass a string of your choice, especially useful for other languages.

### Caveats

Note that this is a singleton component, meaning that only the first instance
will work. Properties passed to instances created later will be ignored. On a
Sapper app this would be typically the component instantiated in
`_layout.svelte`.

### Use `_screen`

In other components of your app, `import` the `_screen` store from `ScreenSensor.svelte` and use as you see fit.

```svelte
<script>
	import {_screen, breakpoints} from '@svizzle/ui/src/sensors/screen/ScreenSensor.svelte';

	$: console.log($_screen, breakpoints);
</script>

<main class={$_screen?.classes}>
	{#if $_screen?.sizes.medium && $_screen?.orientations.landscape}
		<p>Medium (landscape)</p>
	{/if}
</main>
```
