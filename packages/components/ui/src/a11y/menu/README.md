# Accessibility Menu Component

You can use this component to add accessibility tools to a website.

## Demo

You can visit the [doc site](https://nestauk.github.io/svizzle/) to see it in
action.

## Usage

The accessibility menu depends on measurements made by the `<ScreenSensor/>` 
component so it must be instantiated as well. For the options selected in the
menu to have effect, an instance of the `<A11yMenuDriver/>` component must also
be present. This component can be configured with customized default settings,
such as a website specific list of typefaces. You'll find the default settings
in `packages/components/ui/src/a11y/menu/settings.js`.

In a Sapper app these components would usually be instanced the main
`_layout.svelte` file.

```svelte
<script>
	import A11yMenuDriver
		from '@svizzle/ui/src/a11y/menu/A11yMenuDriver.svelte';
	import ScreenSensor, {_screen}
		from '@svizzle/ui/src/sensors/screen/ScreenSensor.svelte';
</script>

<ScreenSensor/>
<A11yMenuDriver/>
```

To display the menu itself `<A11yMenu/>` can be instantiated in the same file or
elsewhere. Positioning of the component is left up to the developer and can be
achieved by wrapping the component in a `<div>` or other element.

```svelte
<script>
	import A11yMenu
		from '@svizzle/ui/src/a11y/menu/A11yMenuDriver.svelte';
</script>

<section role='region'>
	<A11yMenu {_screen} />
</section>

<style>
	section {
		bottom: 150px;
		left: 50%;
		margin-left: -240px;
		position: fixed;
		width: 480px;
	}
</style>
```

For a full implementation example please refer to
`packages/docs/site/src/routes/_layout.svelte`.

Props:
- `A11yMenuDriver`
	- `defaults`: Will be merged with factory-default settings. See `settings.js`.
	- `useLocalStorage`: When true, settings are stored in browser's local storage and loaded on landing.
- `A11yMenu`
	- `_screen`: Receives the `_screen` store from `<ScreenSensor/>`.

## Caveats

`A11yMenuDriver` defines font families and sizes in the body element. If you
specify font families and absolute font sizes in your components then these
will not be affected by the driver. Please see 
[packages/components/README.md](packages/components/README.md).

