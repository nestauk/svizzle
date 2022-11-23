<script>
	import Banner from './Banner.svelte';
	import LayoutHMF from './LayoutHMF.svelte';
	import Scroller from './Scroller.svelte';

	const defaultFooterText = 'Click on background to dismiss';

	export let _screen;
	export let components;
	export let footerText = defaultFooterText;
	export let theme; // see `Banner.svelte`

	let currentIndex = 0;
	let isActive = false;

	function init () {
		currentIndex = 0;
		isActive = true;
	}

	function next () {
		currentIndex++;
		if (currentIndex >= components.length) {
			isActive = false;
		}
	}

	$: footerText = footerText || defaultFooterText;
	$: components?.length > 0 && init();
	$: if (!components || components?.length === 0) {
		isActive = false;
	}
</script>

{#if isActive}
	<Banner
		{_screen}
		{theme}
		on:close={next}
	>
		<LayoutHMF>
			<div slot='main'>
				<Scroller>
					<svelte:component this={components?.[currentIndex]} />
				</Scroller>
			</div>
			<p slot='footer'>{footerText}</p>
		</LayoutHMF>
	</Banner>
{/if}

<style>
	div {
		height: 100%;
		padding: 1.0em;
		position: relative;
	}
</style>
