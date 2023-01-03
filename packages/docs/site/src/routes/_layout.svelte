<script>
	import {
		_a11ySettings,
		_isA11yDirty,
		_screen,
		A11yMenu,
		A11yMenuDriver,
		FontsLoader,
		NoScript,
		ScreenSensor,
	} from '@svizzle/ui';

	import Nav from '$lib/components/Nav.svelte';
	import {a11yFontFamilies, fontsInfo} from '$lib/config.js';

	export let segment;

	let fontLoadStatus;
	let showA11yMenu;
</script>

<NoScript />
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
	<slot/>
</main>
{#if showA11yMenu}
	<!-- svelte-ignore a11y-no-redundant-roles -->
	<section role='region'>
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
		z-index: 10000;
	}
</style>
