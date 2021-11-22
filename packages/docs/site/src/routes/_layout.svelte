<script>
	import A11yMenu
		from '@svizzle/ui/src/a11y/menu/A11yMenu.svelte';
	import A11yMenuDriver
		from '@svizzle/ui/src/a11y/menu/A11yMenuDriver.svelte';
	import {
		_a11ySettings,
		_isA11yDirty
	} from '@svizzle/ui/src/a11y/menu/settings';
	import ScreenSensor, {_screen}
		from '@svizzle/ui/src/sensors/screen/ScreenSensor.svelte';
	import FontsLoader from '@svizzle/ui/src/drivers/fonts/FontsLoader.svelte';

	import Nav from 'app/components/Nav.svelte';
	import {a11yFontFamilies, fontsInfo} from 'app/config';

	export let segment;

	let fontLoadStatus;
	let showA11yMenu;
</script>

<A11yMenuDriver
	defaults={{
		typeface: {
			defaultValue: a11yFontFamilies[0],
			values: a11yFontFamilies,
		}
	}}
/>
<FontsLoader
	bind:status={fontLoadStatus}
	firstFamilyToLoad={$_a11ySettings.typeface.value}
	{fontsInfo}
/>

{#if fontLoadStatus?.isFirstLoaded}
	<ScreenSensor />
{/if}

<header>
	<Nav
		{segment}
		bind:showA11yMenu
		isA11yDirty={$_isA11yDirty}
	/>
</header>

<main>
	<slot></slot>
</main>
{#if showA11yMenu}
	<section
		role='region'
	>
		<A11yMenu {_screen} />
	</section>
{/if}

<style>
	header {
		height: var(--dim-header-height);
		width: 100%;
		padding: 0 var(--dim-padding);

		background-color: var(--color-main);
		color: var(--color-font-light);
	}

	main {
		height: var(--dim-main-height);
		width: 100%;
	}
	section {
		bottom: 150px;
		left: 50%;
		margin-left: -240px;
		position: fixed;
		width: 480px;
	}
</style>
