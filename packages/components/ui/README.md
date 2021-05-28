# UI

A set of UI components for Svelte.

## Icons

We can pass a Svelte component to the [`Icon`](./src/icons/Icon.svelte) component in order to render the desired icon, like this:

```svelte
<script>
	import {default as Icon} from '@svizzle/ui/src/icons/Icon.svelte';
	import {default as Download} from '@svizzle/ui/src/icons/feather/Download.svelte';
</script>

<Icon
	glyph={Download}
	size=30
	strokeWidth=1.5
/>
```

`Icon` props:
- `glyph`
	- description: the svelte component of the icon to be rendered (of course you can provide your own)
	- type: `svelte component`
	- default: `null`
- `size`:
	- description: icon size
	- type: `number`
	- default: `24`
- style:
	- `fill`:
		- description: the color to be used to fill closed shapes
		- type: `string`
		- default: `'none'`
	- `stroke`:
		- description: lines color
		- type: `string`
		- default: `'currentColor'`
	- `strokeWidth`:
		- description: lines thickness
		- type: `number`
		- default: `2`

As a commodity, icons from https://github.com/feathericons/feather/tree/master/icons are automatically turned into Svelte components and provided in `./src/icons/feather` for ease of use.

Note that the `makeFeatherIcons` npm script assumes the `feather` directory in the root of the Svizzle repository because Lerna is set up to hoist packages in the root `node_modules` dir.

## Link

Props:
- `href`: `string`, defaults to `null`
- `hreflang`: string, defaults to `null`
- `iconSize`: number, defaults to `14`
- `isDownload`: boolean, defaults to `false`
- `isExternal`: boolean, defaults to `false`
- `rel`: string, defaults to `'noopener'`
- `target`: string, defaults to `null`
- `text`: string, defaults to '' (if `href` isn't provided it turns into `<Link.svelte>: PLEASE PROVIDE A `href` PROP'`)
- `theme`: `object`, the default being merged to the passed object being:
	```
	{
		iconStroke: 'rgb(16, 174, 249)',
		iconStrokeWidth: 2,
		textColor: 'black',
	}
	```
- `type`: `string`, defaults to `null`

## LoadingView

An empty view with a rotating icon at its center, with the same props of `Icon` so that you can control the displayed icon.

Props:
- `fill`: string, defaults to `null`
- `glyph`: Svelte component, defaults to `Loader` (Feather's `loader`)
- `size`: number, defaults to `50`
- `stroke`: string, defaults to `null`
- `strokeWidth`: number, defaults to `0.75`

## MessageView

An empty view with a text at its center.

Props:
- `backgroundColor` (string, default: 'white')
- `color` (string, default: 'black')
- `fontSize` (string, default: '14px')
- `text` (string, default: 'Please provide a message')

## Switch

A simple toggle between 2 values.

## Gauge components

These are components that we instantiate to measure some feature of the device/browser.

### Screen Gauge

Measures screen features reactively, see [here](src/gauges/screen).

## Breakpoints

```
import {breakpoints} from '@svizzle/ui/src/defaults';
```

A set of breakpoints for responsiveness, expressed in amount of chars fitting the screen width for responsive layouts (`[45, 90, 135, 180]`), see [here](https://github.com/nestauk/eurito_indicators_ui/issues/7#issuecomment-790848997).

The bands among breakpoints can be thought as T-shirt sizes:
```
       45      90      135     180
xSmall | small | medium | large | xLarge
```

![breakpoints and bands](./doc/breakpoints.png)
