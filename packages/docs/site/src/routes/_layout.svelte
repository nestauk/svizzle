<script>
	import A11yMenu
		from '@svizzle/ui/src/a11y/menu/A11yMenu.svelte';
	import A11yMenuDriver
		from '@svizzle/ui/src/a11y/menu/A11yMenuDriver.svelte';
	import {_isA11yDirty} from '@svizzle/ui/src/a11y/menu/settings';
	import ScreenSensor, {_screen}
		from '@svizzle/ui/src/sensors/screen/ScreenSensor.svelte';

	import Nav from 'app/components/Nav.svelte';

	export let segment;

	let showA11yMenu;
</script>

<ScreenSensor />
<A11yMenuDriver
	defaults={{
		typeface: {
			defaultValue: 'Avenir Next Variable',
			values: [
				'Avenir Next Variable',
				'Archivo',
				'Noboto Flex',
				'Courier New',
				'Open Dyslexia'
			],
		}
	}}
/>

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
